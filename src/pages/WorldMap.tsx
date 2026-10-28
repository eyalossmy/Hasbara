import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import { ACTORS, CONFLICTS, CONF_STATUS, CONF_TYPES, startYear, type ConfStatus, type ConfType, type Conflict } from '../data/conflicts'
import { addBasemap } from '../components/basemap'
import Flag from '../components/Flag'
import { CountUp, copyText } from '../components/ui'

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

function signIcon(c: Conflict, selected: boolean) {
  const t = CONF_TYPES[c.type]
  return L.divIcon({
    className: '',
    html: `<div class="sign${selected ? ' sel' : ''}${c.status === 'active' ? ' live' : ''}" style="--c:${t.color}"><span class="sg-ic">${t.icon}</span><span class="sg-lb">${c.short}</span></div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  })
}

function clusterIcon(cluster: L.MarkerCluster) {
  const n = cluster.getChildCount()
  const colors = cluster.getAllChildMarkers().map((m) => CONF_TYPES[(m.options as unknown as { conflict: Conflict }).conflict.type].color)
  const dots = [...new Set(colors)].slice(0, 4).map((c) => `<i style="background:${c}"></i>`).join('')
  return L.divIcon({ className: '', html: `<div class="sg-cluster"><b>${n}</b><span>${dots}</span></div>`, iconSize: [0, 0], iconAnchor: [0, 0] })
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

/** Two rows of conflict names drifting past — "all the others" at a glance. */
function Marquee() {
  const rows = [CONFLICTS.filter((_, i) => i % 2 === 0), CONFLICTS.filter((_, i) => i % 2 === 1)]
  return (
    <div className="mq" aria-hidden>
      {rows.map((row, r) => (
        <div key={r} className={`mq-track ${r ? 'rev' : ''}`}>
          {[...row, ...row].map((c, i) => (
            <span key={i} className="mq-chip"><i style={{ background: CONF_TYPES[c.type].color }} />{c.short}</span>
          ))}
        </div>
      ))}
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

    const cluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 70,
      spiderfyOnMaxZoom: true,
      iconCreateFunction: clusterIcon,
    })
    map.addLayer(cluster)
    mapRef.current = map
    clusterRef.current = cluster
    const zoomClass = () => el.current?.classList.toggle('wm-far', map.getZoom() < 3.5)
    map.on('zoomend', zoomClass)
    zoomClass()
    addBasemap(map).finally(() => setReady(true))

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
      io.disconnect()
      map.remove()
      mapRef.current = null
      clusterRef.current = null
      markers.current.clear()
    }
  }, [])

  // Signs for the conflicts that match the search and filters.
  useEffect(() => {
    const cluster = clusterRef.current
    if (!cluster) return
    cluster.clearLayers()
    markers.current.clear()
    const list = visible.map((c) => {
      const m = L.marker(c.coords, { icon: signIcon(c, c.id === selRef.current), conflict: c, riseOnHover: true, keyboard: true, title: c.name } as L.MarkerOptions)
      m.on('click', () => selectRef.current(c.id))
      markers.current.set(c.id, m)
      return m
    })
    cluster.addLayers(list)
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
      m.setIcon(signIcon(c, id === selId))
      m.setZIndexOffset(id === selId ? 1000 : 0)
    })
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
      if (e.key !== 'Escape') return
      if (filterOpen) setFilterOpen(false)
      else selectRef.current(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [filterOpen])

  const idx = sel ? CONFLICTS.indexOf(sel) : -1
  const step = (d: number) => select(CONFLICTS[(idx + d + CONFLICTS.length) % CONFLICTS.length].id)
  const showList = (listOpen || !!q) && !filterOpen
  const isAtrocity = sel?.type === 'atrocity'
  const activeCount = types.size + statuses.size + eras.size

  return (
    <>
      <section className="wm-hero">
        <div className="grid-bg" />
        <div className="glow a" /><div className="glow b" />
        <div className="container wm-hero-in">
          <span className="eyebrow">🌍 מפת הסכסוכים בעולם</span>
          <h1>מפגינים ונלחמים למען עזה?<br /><span className="hl">ומה עם כל האחרים?</span></h1>
          <p className="lead">מאז 1948 העולם ידע מאות מלחמות, רציחות עם וכיבושים — רבים מהם קטלניים פי כמה. אבל רק סכסוך אחד מקבל הפגנות בכל קמפוס, גינויים בכל עצרת וכותרות בכל יום. גללו למטה ותראו בעצמכם.</p>
          <div className="wm-hero-stats">
            <div><b><CountUp to={stats.total} /></b><span>סכסוכים על המפה</span></div>
            <div><b><CountUp to={stats.active} /></b><span>פעילים ממש עכשיו</span></div>
            <div><b><CountUp to={stats.atrocities} /></b><span>רציחות עם ומעשי זוועה</span></div>
          </div>
          <button className="btn btn-gold wm-hero-cta" onClick={toMap}>לגלות את המפה <span className="bounce">↓</span></button>
        </div>
        <Marquee />
      </section>

      <div ref={wrap} id="map" className={`wm ${sel ? 'has-sel' : ''}`}>
        <div ref={el} className="wm-map" dir="ltr" />
        {!ready && <div className="wm-loading"><span />טוען מפה…</div>}

        <section className="wm-search" aria-label="חיפוש סכסוך">
          <div className="wm-title">
            <div>
              <span className="eyebrow">🌍 {visible.length} מתוך {CONFLICTS.length} סכסוכים</span>
              <h1>חפשו סכסוך</h1>
            </div>
            <button className="wm-toggle" onClick={() => { setListOpen(!listOpen); setFilterOpen(false) }} aria-expanded={showList}>{showList ? 'הסתר' : `רשימה (${visible.length})`}</button>
          </div>
          <div className="wm-searchrow">
            <label className="search wm-input">
              <span className="ic">🔎</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חפשו: סודאן, פוקלנד, וייטנאם…" aria-label="חיפוש סכסוך" />
              {q && <button onClick={() => setQ('')} aria-label="נקה">✕</button>}
            </label>
            <button className={`wm-filter-btn ${filterOpen || activeCount ? 'on' : ''}`} onClick={() => setFilterOpen(!filterOpen)} aria-expanded={filterOpen} aria-label="סינון" title="סינון">
              <FilterIcon />
              {activeCount > 0 && <span className="wm-filter-count">{activeCount}</span>}
            </button>
          </div>

          {!filterOpen && filtered && (
            <div className="wm-active">
              {[...types].map((t) => <button key={t} onClick={() => setTypes(toggle(types, t))}><i style={{ background: CONF_TYPES[t].color }} />{CONF_TYPES[t].label} ✕</button>)}
              {[...statuses].map((s) => <button key={s} onClick={() => setStatuses(toggle(statuses, s))}>{CONF_STATUS[s].label} ✕</button>)}
              {[...eras].map((e) => <button key={e} onClick={() => setEras(toggle(eras, e))}>{ERAS.find((x) => x.id === e)!.label} ✕</button>)}
              <button className="clear" onClick={clearFilters}>נקה הכל</button>
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
                <div className="label-sm">תקופה (שנת פתיחה)</div>
                <div className="wm-fopts row">
                  {ERAS.map((e) => (
                    <button key={e.id} className={`wm-fopt ${eras.has(e.id) ? 'on' : ''}`} onClick={() => setEras(toggle(eras, e.id))} aria-pressed={eras.has(e.id)}>{e.label}</button>
                  ))}
                </div>
              </div>
              <div className="wm-factions">
                <button className="btn btn-soft btn-sm" onClick={clearFilters} disabled={!filtered}>נקה</button>
                <button className="btn btn-primary btn-sm" onClick={() => setFilterOpen(false)}>הצג {visible.length} סכסוכים</button>
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

        <button className="wm-up" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="חזרה למעלה">↑</button>

        <aside className={`wm-panel ${sel ? 'open' : ''}`} aria-hidden={!sel} aria-label="פרטי הסכסוך">
          {sel && (
            <div className="wm-panel-in" key={sel.id}>
              <div className="wm-panel-top">
                <span className="wm-pill" style={{ background: CONF_TYPES[sel.type].color }}>{CONF_TYPES[sel.type].icon} {CONF_TYPES[sel.type].label}</span>
                <span className="wm-pill ghost"><i style={{ background: CONF_STATUS[sel.status].color }} />{CONF_STATUS[sel.status].label}</span>
                <button className="wm-x" onClick={() => select(null)} aria-label="סגירה">✕</button>
              </div>
              <h2>{sel.name}</h2>
              <div className="wm-years">{sel.years}</div>

              <div className={`vs ${isAtrocity ? 'atrocity' : ''}`}>
                <div className="vs-side">
                  {isAtrocity && <div className="vs-cap">המבצעים</div>}
                  {sel.sides[0].map((a) => <div key={a} className="vs-actor"><Flag actor={ACTORS[a]} /><span>{ACTORS[a].name}</span></div>)}
                </div>
                <div className="vs-mid">{isAtrocity ? '←' : 'VS'}</div>
                <div className="vs-side">
                  {isAtrocity && <div className="vs-cap">הקורבנות</div>}
                  {sel.sides[1].map((a) => <div key={a} className="vs-actor"><Flag actor={ACTORS[a]} /><span>{ACTORS[a].name}</span></div>)}
                </div>
              </div>

              <p className="wm-sum">{sel.summary}</p>
              <div className="label-sm" style={{ margin: '18px 0 10px' }}>עובדות מפתח</div>
              <ul className="facts-list">{sel.facts.map((f) => <li key={f}>{f}</li>)}</ul>
              <div className="wm-now"><b>📍 המצב היום</b>{sel.now}</div>
              {sel.angle && <div className="box honest" style={{ marginTop: 12 }}><h4>💡 זווית הסברתית</h4>{sel.angle}</div>}

              <div className="wm-nav">
                <button className="btn btn-soft btn-sm" onClick={() => step(-1)}>→ הקודם</button>
                <button className="btn btn-soft btn-sm" onClick={() => copyText(window.location.href)}>🔗 קישור</button>
                <button className="btn btn-soft btn-sm" onClick={() => step(1)}>הבא ←</button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </>
  )
}
