import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import { ACTORS, CONFLICTS, CONF_STATUS, CONF_TYPES, type ConfType, type Conflict } from '../data/conflicts'
import { addBasemap } from '../components/basemap'
import Flag from '../components/Flag'
import { copyText } from '../components/ui'

const WORLD = L.latLngBounds([-35, -110], [60, 140])

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

export default function WorldMap() {
  const [params, setParams] = useSearchParams()
  const selId = params.get('c')
  const sel = CONFLICTS.find((c) => c.id === selId) ?? null
  const [q, setQ] = useState('')
  const [type, setType] = useState<ConfType | 'all'>('all')
  const [listOpen, setListOpen] = useState(false)
  const [ready, setReady] = useState(false)

  const el = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null)
  const markers = useRef(new Map<string, L.Marker>())
  const selRef = useRef(selId)
  selRef.current = selId

  const visible = useMemo(() => CONFLICTS.filter((c) => (type === 'all' || c.type === type) && matches(c, q)), [q, type])

  const select = (id: string | null) => {
    const next = new URLSearchParams(params)
    if (id) next.set('c', id)
    else next.delete('c')
    setParams(next, { replace: true })
  }
  const selectRef = useRef(select)
  selectRef.current = select

  // Map, basemap and cluster layer — once.
  useEffect(() => {
    const map = L.map(el.current!, {
      zoomControl: false,
      minZoom: 2,
      maxZoom: 10,
      worldCopyJump: true,
      zoomSnap: 0.5,
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

    return () => {
      map.remove()
      mapRef.current = null
      clusterRef.current = null
      markers.current.clear()
    }
  }, [])

  // Signs for the conflicts that match the search and filter.
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
    if ((q || type !== 'all') && visible.length) {
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
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && selectRef.current(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const idx = sel ? CONFLICTS.indexOf(sel) : -1
  const step = (d: number) => select(CONFLICTS[(idx + d + CONFLICTS.length) % CONFLICTS.length].id)
  const showList = listOpen || !!q
  const isAtrocity = sel?.type === 'atrocity'

  return (
    <div className={`wm ${sel ? 'has-sel' : ''}`}>
      <div ref={el} className="wm-map" dir="ltr" />
      {!ready && <div className="wm-loading"><span />טוען מפה…</div>}

      <section className="wm-search" aria-label="חיפוש סכסוך">
        <div className="wm-title">
          <div>
            <span className="eyebrow">🌍 מפת הסכסוכים</span>
            <h1>העולם גדול מעזה.</h1>
          </div>
          <button className="wm-toggle" onClick={() => setListOpen(!listOpen)} aria-expanded={showList}>{showList ? 'הסתר' : `רשימה (${visible.length})`}</button>
        </div>
        <label className="search wm-input">
          <span className="ic">🔎</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חפשו: סודאן, רוסיה, סומלילנד…" aria-label="חיפוש סכסוך" />
          {q && <button onClick={() => setQ('')} aria-label="נקה">✕</button>}
        </label>
        <div className="wm-chips">
          <button className={`chip ${type === 'all' ? 'on' : ''}`} onClick={() => setType('all')}>הכל</button>
          {(Object.keys(CONF_TYPES) as ConfType[]).map((t) => (
            <button key={t} className={`chip ${type === t ? 'on' : ''}`} onClick={() => setType(type === t ? 'all' : t)}>
              <span className="dot" style={{ background: CONF_TYPES[t].color }} />{CONF_TYPES[t].label}
            </button>
          ))}
        </div>
        {showList && (
          <div className="wm-results">
            {visible.length === 0 && <p className="muted" style={{ padding: '10px 4px' }}>לא נמצא סכסוך כזה. נסו מילה אחרת.</p>}
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
  )
}
