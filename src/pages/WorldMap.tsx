import { useMemo, useState } from 'react'
import { geoEqualEarth, geoGraticule10, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { FeatureCollection, Geometry } from 'geojson'
import world from 'world-atlas/countries-110m.json'
import { CONFLICTS, CONF_TYPES, type ConfType } from '../data/conflicts'
import { SRC } from '../data/sources'
import { PageHero, SourceLinks, useReveal } from '../components/ui'

const W = 960
const H = 500

export default function WorldMap() {
  useReveal()
  const [type, setType] = useState<ConfType | 'all'>('all')
  const [sel, setSel] = useState('il')

  const { countries, graticule, sphere, project } = useMemo(() => {
    const topo = world as unknown as Topology<{ countries: GeometryCollection }>
    const fc = feature(topo, topo.objects.countries) as FeatureCollection<Geometry>
    const proj = geoEqualEarth().fitExtent([[8, 8], [W - 8, H - 8]], { type: 'Sphere' })
    const path = geoPath(proj)
    return {
      countries: fc.features.filter((f) => f.id !== '010').map((f, i) => ({ key: i, id: String(f.id), d: path(f) || '' })),
      graticule: path(geoGraticule10()) || '',
      sphere: path({ type: 'Sphere' }) || '',
      project: (c: [number, number]) => proj(c) as [number, number],
    }
  }, [])

  const c = CONFLICTS.find((x) => x.id === sel)!
  const visible = (t: ConfType) => type === 'all' || type === t
  // On phones the card sits above the list, so bring it into view after a pick.
  const pickFromList = (id: string) => {
    setSel(id)
    if (window.matchMedia('(max-width: 960px)').matches) {
      requestAnimationFrame(() => document.querySelector('.conf-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
    }
  }

  return (
    <>
      <PageHero eyebrow="🌍 מפת העולם" emoji="🗺️" title="העולם גדול מעזה."
        lead="סכסוכים, מלחמות וארגוני טרור ברחבי העולם. לא כדי להשוות סבל — אלא כדי לשאול למה רק סכסוך אחד מקבל את כל תשומת הלב, ואת כל הגינוי." />

      <section className="section-tight">
        <div className="container">
          <div className="chips" style={{ marginBottom: 18 }}>
            <button className={`chip ${type === 'all' ? 'on' : ''}`} onClick={() => setType('all')}>הכל ({CONFLICTS.length})</button>
            {(Object.keys(CONF_TYPES) as ConfType[]).map((t) => (
              <button key={t} className={`chip ${type === t ? 'on' : ''}`} onClick={() => setType(t)}>
                <span className="dot" style={{ background: CONF_TYPES[t].color }} />{CONF_TYPES[t].label}
              </button>
            ))}
          </div>

          <div className="map-wrap">
            <div>
              <div className="map-box reveal">
                <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="מפת סכסוכים בעולם">
                  <path d={sphere} className="sphere" />
                  <path d={graticule} className="graticule" />
                  {countries.map((k) => <path key={k.key} d={k.d} className={`country ${k.id === '376' ? 'hl' : ''}`} />)}
                  {CONFLICTS.map((x) => {
                    const [px, py] = project(x.coords)
                    const color = CONF_TYPES[x.type].color
                    return (
                      <g key={x.id} className={`pin ${sel === x.id ? 'sel' : ''} ${visible(x.type) ? '' : 'dim'}`} transform={`translate(${px},${py})`}
                        onClick={() => setSel(x.id)} role="button" tabIndex={0} aria-label={x.name}
                        onKeyDown={(e) => e.key === 'Enter' && setSel(x.id)}>
                        <circle className="pulse" r={8} fill={color} />
                        <circle className="core" r={sel === x.id ? 10 : 7} fill={color} />
                      </g>
                    )
                  })}
                </svg>
                <div className="legend">
                  {(Object.keys(CONF_TYPES) as ConfType[]).map((t) => <span key={t}><i style={{ background: CONF_TYPES[t].color }} />{CONF_TYPES[t].label}</span>)}
                </div>
              </div>
            </div>

            <aside className="conf-card" key={c.id}>
              <span className="type" style={{ background: CONF_TYPES[c.type].color + '22', color: CONF_TYPES[c.type].color }}>● {CONF_TYPES[c.type].label}</span>
              <h3>{c.name}</h3>
              <div className="yrs">{c.years}</div>
              <p className="sum">{c.summary}</p>
              <div className="kv">
                <div><b>השחקנים</b>{c.actors}</div>
                <div><b>המצב כיום</b>{c.now}</div>
              </div>
            </aside>
            <div className="conf-list">
              {CONFLICTS.filter((x) => visible(x.type)).map((x) => (
                <button key={x.id} className={sel === x.id ? 'sel' : ''} onClick={() => pickFromList(x.id)}>
                  <i style={{ background: CONF_TYPES[x.type].color }} />{x.name}
                </button>
              ))}
            </div>
          </div>

          <div className="box honest reveal" style={{ marginTop: 28, fontSize: 16 }}>
            <h4>🧭 שאלה למחשבה</h4>
            הצבעים במפה מייצגים סוג סכסוך בלבד — לא חומרה ולא חשיבות. אבל שווה לשאול: על כמה מהסכסוכים האלה ראיתם הפגנה בקמפוס? כמה מהם קיבלו החלטת גינוי באו״ם? הסטנדרט הכפול הוא חלק מהסיפור.
          </div>
          <div style={{ marginTop: 18 }}><SourceLinks sources={[SRC.cfr]} /></div>
        </div>
      </section>
    </>
  )
}
