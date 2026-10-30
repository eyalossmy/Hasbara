import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import { ACTORS, CONFLICTS, CONF_STATUS, CONF_TYPES, startYear, type ActorId, type ConfStatus, type ConfType, type Conflict } from '../data/conflicts'
import { addBasemap } from '../components/basemap'
import Flag from '../components/Flag'
import BloodText from '../components/BloodText'
import { CountUp, Emph, Split, copyText, isKeyFact } from '../components/ui'
import { CONFLICT_WIKI } from '../data/conflict-sources'
import { SRC } from '../data/sources'
import type { Source } from '../data/types'

const WORLD = L.latLngBounds([-35, -110], [60, 140])

const ERAS = [
  { id: 'pre', label: 'לפני 1948', test: (y: number) => y < 1948 },
  { id: '48', label: '1948–1969', test: (y: number) => y >= 1948 && y < 1970 },
  { id: '70', label: '1970–1989', test: (y: number) => y >= 1970 && y < 1990 },
  { id: '90', label: '1990–2009', test: (y: number) => y >= 1990 && y < 2010 },
  { id: '10', label: '2010–היום', test: (y: number) => y >= 2010 },
] as const
type EraId = (typeof ERAS)[number]['id']

const isDesktop = () => window.innerWidth >= 960

/** Space the floating search card and side window cover, so focused signs land in the visible part. */
function padding(withPanel: boolean) {
  if (isDesktop()) return { paddingTopLeft: L.point(withPanel ? 470 : 40, 40), paddingBottomRight: L.point(420, 40) }
  return { paddingTopLeft: L.point(16, withPanel ? 90 : 150), paddingBottomRight: L.point(16, withPanel ? Math.round(window.innerHeight * 0.58) : 40) }
}

const norm = (s: string) => s.toLowerCase().replace(/[״"׳']/g, '')

function matches(c: Conflict, q: string) {
  if (!q) return true
  const hay = norm([c.name, c.short, c.summary, c.years, CONF_TYPES[c.type].label, ...c.sides.flat().map((a) => ACTORS[a].name)].join(' '))
  return norm(q).split(/\s+/).filter(Boolean).every((w) => hay.includes(w))
}

/** Below this zoom the map shows dots only; names appear on hover or when zoomed in. */
const LABEL_ZOOM = 4

/** A solid dot in the conflict's colour sitting exactly on the place, with its name above it. */
function pinIcon(c: Conflict, selected: boolean) {
  return L.divIcon({
    className: '',
    html: `<div class="pin${selected ? ' sel' : ''}${c.status === 'active' ? ' live' : ''}" style="--c:${CONF_TYPES[c.type].color}"><i class="pin-dot"></i><span class="pin-lb">${c.short}</span></div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  })
}

/** A count wrapped in a ring that shows the mix of conflict types inside. */
function clusterIcon(cluster: L.MarkerCluster) {
  const kids = cluster.getAllChildMarkers().map((m) => (m.options as unknown as { conflict: Conflict }).conflict.type)
  const n = kids.length
  let at = 0
  const stops = (Object.keys(CONF_TYPES) as ConfType[]).flatMap((t) => {
    const k = kids.filter((x) => x === t).length
    if (!k) return []
    const from = at
    at += (k / n) * 360
    return [`${CONF_TYPES[t].color} ${from}deg ${at}deg`]
  })
  const size = n < 5 ? 38 : n < 15 ? 46 : n < 40 ? 54 : 62
  return L.divIcon({
    className: '',
    html: `<div class="cl" style="--s:${size}px;background:conic-gradient(${stops.join(',')})"><b>${n}</b></div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  })
}

function toggle<T>(set: Set<T>, v: T) {
  const next = new Set(set)
  if (next.has(v)) next.delete(v)
  else next.add(v)
  return next
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 5h18l-7 8.5V19l-4 2v-7.5z" />
    </svg>
  )
}

// Lines that rest on a specific document cite it; everything else cites the conflict's article
const SPECIFIC: [RegExp, Source][] = [
  [/משרד הבריאות/, SRC.gazaMoh],
  [/שלושה לאווים/, SRC.khartoum],
  [/וב־2005 יצאה|ההתנתקות/, SRC.disengagement],
  [/ב־7 באוקטובר 2023/, SRC.oct7],
  [/אמנת חמאס/, SRC.hamasCharter],
]

/** Numbers every sourced line of a conflict, and the list the numbers point to. */
function citations(c: Conflict, lines: string[]) {
  const wiki = CONFLICT_WIKI[c.id] ?? []
  const refs: Source[] = []
  const num = new Map<string, number>()
  for (const t of lines) {
    const src = SPECIFIC.find(([re]) => re.test(t))?.[1] ?? wiki[0]
    if (!src) continue
    if (!refs.includes(src)) refs.push(src)
    num.set(t, refs.indexOf(src) + 1)
  }
  wiki.forEach((w) => { if (!refs.includes(w)) refs.push(w) })
  return { refs, ref: (t: string) => {
    const n = num.get(t)
    return n ? <a className="fn" href={refs[n - 1].url} target="_blank" rel="noopener noreferrer" title={refs[n - 1].label}>{n}</a> : null
  } }
}

/** One side of a conflict: its flags, overlapping, and its names in one line. */
function Side({ ids, cap }: { ids: ActorId[]; cap?: string }) {
  return (
    <div className="wp-side">
      <span className="wp-flags">{ids.map((a) => <Flag key={a} actor={ACTORS[a]} />)}</span>
      <span className="wp-names">
        {cap && <small>{cap}</small>}
        {ids.map((a) => ACTORS[a].name).join(' · ')}
      </span>
    </div>
  )
}

export default function WorldMap() {
  const [params, setParams] = useSearchParams()
  const selId = params.get('c')
  const sel = CONFLICTS.find((c) => c.id === selId) ?? null
  const [q, setQ] = useState('')
  const [types, setTypes] = useState<Set<ConfType>>(new Set())
  const [statuses, setStatuses] = useState<Set<ConfStatus>>(new Set())
  const [eras, setEras] = useState<Set<EraId>>(new Set())
  const [filterOpen, setFilterOpen] = useState(false)
  const [listOpen, setListOpen] = useState(false)
  const [ready, setReady] = useState(false)

  const wrap = useRef<HTMLDivElement>(null)
  const el = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null)
  const markers = useRef(new Map<string, L.Marker>())
  const lifted = useRef<L.Marker | null>(null)
  const selRef = useRef(selId)
  selRef.current = selId

  const filtered = types.size + statuses.size + eras.size > 0
  const visible = useMemo(() => CONFLICTS.filter((c) => {
    const y = startYear(c)
    return (!types.size || types.has(c.type)) &&
      (!statuses.size || statuses.has(c.status)) &&
      (!eras.size || ERAS.some((e) => eras.has(e.id) && e.test(y))) &&
      matches(c, q)
  }), [q, types, statuses, eras])

  const stats = useMemo(() => ({
    total: CONFLICTS.length,
    active: CONFLICTS.filter((c) => c.status === 'active').length,
    atrocities: CONFLICTS.filter((c) => c.type === 'atrocity').length,
  }), [])

  const select = (id: string | null) => {
    const next = new URLSearchParams(params)
    if (id) next.set('c', id)
    else next.delete('c')
    setParams(next, { replace: true })
  }
  const selectRef = useRef(select)
  selectRef.current = select

  const clearFilters = () => { setTypes(new Set()); setStatuses(new Set()); setEras(new Set()) }
  const toMap = () => wrap.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })

  // Map, basemap and cluster layer — once.
  useEffect(() => {
    const map = L.map(el.current!, {
      zoomControl: false,
      minZoom: 2,
      maxZoom: 10,
      worldCopyJump: true,
      zoomSnap: 0.5,
      scrollWheelZoom: false,
    })
    map.attributionControl.setPrefix(false)
    L.control.zoom({ position: 'bottomleft', zoomInTitle: 'התקרבות', zoomOutTitle: 'התרחקות' }).addTo(map)
    map.fitBounds(WORLD, { ...padding(false), animate: false })

    // Group only dots that would sit on top of each other, so most conflicts show as their own pin
    const cluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: (z: number) => (z < LABEL_ZOOM ? 26 : 56),
      disableClusteringAtZoom: 7,
      spiderfyOnMaxZoom: true,
      iconCreateFunction: clusterIcon,
    })
    map.addLayer(cluster)
    mapRef.current = map
    clusterRef.current = cluster
    const zoomClass = () => el.current?.classList.toggle('wm-far', map.getZoom() < LABEL_ZOOM)
    map.on('zoomend', zoomClass)
    zoomClass()
    // The vector basemap is the heavy part: fetch it only as the visitor heads for the map,
    // so the intro animates smoothly.
    let based = false
    const loadBase = () => {
      if (based) return
      based = true
      addBasemap(map).finally(() => setReady(true))
    }
    const near = new IntersectionObserver(([e]) => e.isIntersecting && loadBase(), { rootMargin: '0px 0px 500px 0px' })
    near.observe(wrap.current!)
    if (selRef.current) loadBase()

    // The page scrolls past the intro first: the map takes the wheel (and, on touch, the drag)
    // only once it fills the screen, so scrolling down to it never gets caught half-way.
    const touch = matchMedia('(pointer: coarse)').matches
    if (touch) map.dragging.disable()
    const io = new IntersectionObserver(([e]) => {
      const inView = e.intersectionRatio > 0.9
      if (inView) map.scrollWheelZoom.enable()
      else map.scrollWheelZoom.disable()
      if (touch) {
        if (inView) map.dragging.enable()
        else map.dragging.disable()
      }
    }, { threshold: [0, 0.9, 1] })
    io.observe(wrap.current!)
    // A shared link to one conflict skips the intro (after Layout's own scroll-to-top on navigation)
    const jump = selRef.current ? window.setTimeout(() => wrap.current?.scrollIntoView({ block: 'end' }), 60) : 0

    return () => {
      window.clearTimeout(jump)
      near.disconnect()
      io.disconnect()
      map.remove()
      mapRef.current = null
      clusterRef.current = null
      markers.current.clear()
      lifted.current = null
    }
  }, [])

  /** The open conflict's pin sits on the map itself, never folded into a cluster. */
  const lift = (id: string | null) => {
    const map = mapRef.current
    const cluster = clusterRef.current
    if (!map || !cluster) return
    const prev = lifted.current
    if (prev) {
      map.removeLayer(prev)
      if ([...markers.current.values()].includes(prev)) cluster.addLayer(prev)
      lifted.current = null
    }
    const m = id ? markers.current.get(id) : undefined
    if (!m) return
    cluster.removeLayer(m)
    m.addTo(map)
    lifted.current = m
  }

  // Signs for the conflicts that match the search and filters.
  useEffect(() => {
    const cluster = clusterRef.current
    if (!cluster) return
    if (lifted.current) mapRef.current?.removeLayer(lifted.current)
    lifted.current = null
    cluster.clearLayers()
    markers.current.clear()
    const list = visible.map((c) => {
      const m = L.marker(c.coords, { icon: pinIcon(c, c.id === selRef.current), conflict: c, riseOnHover: true, keyboard: true, title: c.name } as L.MarkerOptions)
      m.on('click', () => selectRef.current(c.id))
      markers.current.set(c.id, m)
      return m
    })
    cluster.addLayers(list)
    lift(selRef.current)
    const map = mapRef.current!
    if ((q || filtered) && visible.length) {
      const b = L.latLngBounds(visible.map((c) => c.coords))
      map.flyToBounds(b, { ...padding(!!selRef.current), maxZoom: 5, duration: 0.8 })
    }
  }, [visible])

  // Selected sign: restyle and fly to it.
  useEffect(() => {
    markers.current.forEach((m, id) => {
      const c = CONFLICTS.find((x) => x.id === id)!
      m.setIcon(pinIcon(c, id === selId))
      m.setZIndexOffset(id === selId ? 1000 : 0)
    })
    lift(selId)
    const map = mapRef.current
    if (!map || !sel) return
    const target = L.latLng(sel.coords)
    const z = Math.max(map.getZoom(), 4.5)
    const p = padding(true)
    // Offset the centre so the sign sits in the middle of the area the panels leave free
    const pt = map.project(target, z).add(L.point((p.paddingBottomRight.x - p.paddingTopLeft.x) / 2, (p.paddingBottomRight.y - p.paddingTopLeft.y) / 2))
    map.flyTo(map.unproject(pt, z), z, { duration: 0.9 })
  }, [selId])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selRef.current && (e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !(e.target instanceof HTMLInputElement)) {
        // Right-to-left: the left key moves forward
        stepRef.current(e.key === 'ArrowLeft' ? 1 : -1)
        return
      }
      if (e.key !== 'Escape') return
      if (filterOpen) setFilterOpen(false)
      else selectRef.current(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [filterOpen])

  // Next / previous walk through what the search and filters show, when the open conflict is among them
  const pool = sel && visible.includes(sel) ? visible : CONFLICTS
  const idx = sel ? pool.indexOf(sel) : -1
  const step = (d: number) => select(pool[(idx + d + pool.length) % pool.length].id)
  const stepRef = useRef(step)
  stepRef.current = step
  const showList = (listOpen || !!q) && !filterOpen
  const isAtrocity = sel?.type === 'atrocity'
  // Death tolls and the facts marked as crucial stay in view; the rest fold away
  const keyFacts = sel?.facts.filter(isKeyFact) ?? []
  const moreFacts = sel?.facts.filter((f) => !isKeyFact(f)) ?? []
  const cite = sel ? citations(sel, [sel.summary, ...keyFacts, sel.now, ...moreFacts]) : null
  const activeCount = types.size + statuses.size + eras.size

  return (
    <>
      <section className="wm-hero">
        <div className="container wm-hero-in">
          <span className="eyebrow fade-up" style={{ ['--d' as string]: '0s' }}>מפת הסכסוכים בעולם</span>
          <h1>
            <span className="wm-h-q"><Split text="מפגינים ונלחמים למען עזה?" /></span>
            <span className="wm-h-a"><BloodText text="ומה עם כל האחרים?" start={4} /></span>
          </h1>
          <p className="lead fade-up" style={{ ['--d' as string]: '.6s' }}>מאז 1948, השנה שבה נוסדה מדינת ישראל, העולם ידע מאות מלחמות, רציחות עם וכיבושים. רק סכסוך אחד מקבל את כל תשומת הלב.</p>
          <div className="wm-hero-row fade-up" style={{ ['--d' as string]: '.8s' }}>
            <div className="wm-hero-stats">
              <div><b><CountUp to={stats.total} /></b><span>סכסוכים על המפה</span></div>
              <div><b><CountUp to={stats.active} /></b><span>פעילים עכשיו</span></div>
              <div><b><CountUp to={stats.atrocities} /></b><span>רציחות עם וזוועות</span></div>
            </div>
            <button className="btn btn-primary" onClick={toMap}>למפה</button>
          </div>
        </div>
      </section>

      <div ref={wrap} id="map" className={`wm ${sel ? 'has-sel' : ''}`}>
        <div ref={el} className="wm-map" dir="ltr" />
        {!ready && <div className="wm-loading"><span />טוען מפה…</div>}

        <section className="wm-search" aria-label="חיפוש סכסוך">
          <div className="wm-title">
            <div>
              <span className="eyebrow">{visible.length} מתוך {CONFLICTS.length}</span>
              <h1>חיפוש סכסוך</h1>
            </div>
            <button className="wm-toggle" onClick={() => { setListOpen(!listOpen); setFilterOpen(false) }} aria-expanded={showList}>{showList ? 'הסתרה' : 'רשימה'}</button>
          </div>
          <div className="wm-searchrow">
            <label className="search wm-input">
              <span className="ic">🔎</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="סודאן, פוקלנד, וייטנאם…" aria-label="חיפוש סכסוך" />
              {q && <button onClick={() => setQ('')} aria-label="נקה">✕</button>}
            </label>
            <button className={`wm-filter-btn ${filterOpen || activeCount ? 'on' : ''}`} onClick={() => setFilterOpen(!filterOpen)} aria-expanded={filterOpen} aria-label="סינון" title="סינון">
              <FilterIcon />
              {activeCount > 0 && <span className="wm-filter-count">{activeCount}</span>}
            </button>
          </div>

          {!filterOpen && filtered && (
            <div className="wm-active">
              {[...types].map((t) => <button key={t} onClick={() => setTypes(toggle(types, t))}><i style={{ background: CONF_TYPES[t].color }} />{CONF_TYPES[t].label} ×</button>)}
              {[...statuses].map((s) => <button key={s} onClick={() => setStatuses(toggle(statuses, s))}>{CONF_STATUS[s].label} ×</button>)}
              {[...eras].map((e) => <button key={e} onClick={() => setEras(toggle(eras, e))}>{ERAS.find((x) => x.id === e)!.label} ×</button>)}
              <button className="clear" onClick={clearFilters}>ניקוי</button>
            </div>
          )}

          {filterOpen && (
            <div className="wm-filters">
              <div className="wm-fgroup">
                <div className="label-sm">סוג הסכסוך</div>
                <div className="wm-fopts">
                  {(Object.keys(CONF_TYPES) as ConfType[]).map((t) => (
                    <button key={t} className={`wm-fopt ${types.has(t) ? 'on' : ''}`} onClick={() => setTypes(toggle(types, t))} aria-pressed={types.has(t)}>
                      <span className="wm-fic" style={{ background: CONF_TYPES[t].color }}>{CONF_TYPES[t].icon}</span>{CONF_TYPES[t].label}
                      <small>{CONFLICTS.filter((c) => c.type === t).length}</small>
                    </button>
                  ))}
                </div>
              </div>
              <div className="wm-fgroup">
                <div className="label-sm">סטטוס</div>
                <div className="wm-fopts row">
                  {(Object.keys(CONF_STATUS) as ConfStatus[]).map((s) => (
                    <button key={s} className={`wm-fopt ${statuses.has(s) ? 'on' : ''}`} onClick={() => setStatuses(toggle(statuses, s))} aria-pressed={statuses.has(s)}>
                      <i className="wm-fdot" style={{ background: CONF_STATUS[s].color }} />{CONF_STATUS[s].label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="wm-fgroup">
                <div className="label-sm">תקופה</div>
                <div className="wm-fopts row">
                  {ERAS.map((e) => (
                    <button key={e.id} className={`wm-fopt ${eras.has(e.id) ? 'on' : ''}`} onClick={() => setEras(toggle(eras, e.id))} aria-pressed={eras.has(e.id)}>{e.label}</button>
                  ))}
                </div>
              </div>
              <div className="wm-factions">
                <button className="btn btn-soft btn-sm" onClick={clearFilters} disabled={!filtered}>ניקוי</button>
                <button className="btn btn-primary btn-sm" onClick={() => setFilterOpen(false)}>הצגת {visible.length} סכסוכים</button>
              </div>
            </div>
          )}

          {showList && (
            <div className="wm-results">
              {visible.length === 0 && <p className="muted" style={{ padding: '10px 4px' }}>לא נמצא סכסוך כזה. נסו מילה אחרת או נקו את הסינון.</p>}
              {visible.map((c) => (
                <button key={c.id} className={`wm-row ${c.id === selId ? 'on' : ''}`} onClick={() => { select(c.id); if (!isDesktop()) setListOpen(false) }}>
                  <span className="wm-row-ic" style={{ background: CONF_TYPES[c.type].color }}>{CONF_TYPES[c.type].icon}</span>
                  <span className="wm-row-t"><b>{c.name}</b><small>{c.years} · {CONF_STATUS[c.status].label}</small></span>
                  <span className="wm-row-flags">{c.sides.flat().slice(0, 3).map((a) => <Flag key={a} actor={ACTORS[a]} size="sm" />)}</span>
                </button>
              ))}
            </div>
          )}
        </section>

        <button className="wm-up" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} >חזרה למעלה</button>

        <aside className={`wm-panel ${sel ? 'open' : ''}`} aria-hidden={!sel} aria-label="פרטי הסכסוך">
          {sel && (
            <div className="wm-panel-in" key={sel.id} style={{ ['--c' as string]: CONF_TYPES[sel.type].color }}>
              <header className="wp-head">
                <span className="wp-type"><i /><span>{CONF_TYPES[sel.type].label}</span></span>
                <span className={`wp-status ${sel.status}`}>{CONF_STATUS[sel.status].label}</span>
                <button className="wp-link" onClick={() => copyText(window.location.href)}>העתקת קישור</button>
                <button className="wm-x" onClick={() => select(null)} aria-label="סגירה">✕</button>
              </header>

              <div className="wp-body">
                <h2>{sel.name}</h2>
                <div className="wp-years">{sel.years}</div>

                <div className="wp-sides">
                  <Side ids={sel.sides[0]} cap={isAtrocity ? 'המבצעים' : undefined} />
                  <div className="wp-vs">{isAtrocity ? 'נגד' : 'מול'}</div>
                  <Side ids={sel.sides[1]} cap={isAtrocity ? 'הקורבנות' : undefined} />
                </div>

                <p className="wp-sum"><Emph text={sel.summary} />{cite!.ref(sel.summary)}</p>
                {keyFacts.length > 0 && <ul className="wp-key">{keyFacts.map((f) => <li key={f}><Emph text={f} />{cite!.ref(f)}</li>)}</ul>}
                <p className="wp-now"><b>היום</b><Emph text={sel.now} />{cite!.ref(sel.now)}</p>
                {sel.angle && <p className="wp-point"><Emph text={sel.angle} /></p>}

                {moreFacts.length > 0 && (
                  <details className="wp-facts">
                    <summary><span className="plus" aria-hidden />{moreFacts.length === 1 ? 'עובדה נוספת' : `${moreFacts.length} עובדות נוספות`}</summary>
                    <ul>{moreFacts.map((f) => <li key={f}><Emph text={f} />{cite!.ref(f)}</li>)}</ul>
                  </details>
                )}

                <div className="wp-refs">
                  <div className="label-sm">מקורות</div>
                  <ol>{cite!.refs.map((r) => <li key={r.url}><a className="src" href={r.url} target="_blank" rel="noopener noreferrer">{r.label}</a></li>)}</ol>
                </div>
              </div>

              <footer className="wp-foot">
                <button onClick={() => step(-1)}>הקודם</button>
                <span>{idx + 1} מתוך {pool.length}</span>
                <button onClick={() => step(1)}>הבא</button>
              </footer>
            </div>
          )}
        </aside>
      </div>
    </>
  )
}
