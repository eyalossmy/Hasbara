import { Fragment, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { ERAS, KEY_FACTS, TIMELINE, type Era } from '../data/timeline'
import { Emph, PageHero, SourceLinks, useReveal } from '../components/ui'
import LandMap, { MapView, PeriodText } from '../components/LandMap'
import Pic from '../components/Pic'

// Wide screens show one map beside the list; only narrow ones need a map per period inside it
const WIDE = '(min-width: 1241px)'
const subscribeWide = (cb: () => void) => { const m = matchMedia(WIDE); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) }
const isWide = () => matchMedia(WIDE).matches

export default function Timeline() {
  const wide = useSyncExternalStore(subscribeWide, isWide)
  const [era, setEra] = useState<Era | 'all' | 'key'>('all')
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const list = useRef<HTMLDivElement>(null)
  useReveal()

  const items = TIMELINE.map((e, i) => ({ ...e, i })).filter((e) => era === 'all' || (era === 'key' ? e.key : e.era === era))
  const eraLabel = (id: Era) => ERAS.find((x) => x.id === id)!
  const cur = TIMELINE[items.some((e) => e.i === active) ? active : items[0]?.i ?? 0]

  // The event crossing the middle of the screen drives the map and the explanation beside the list
  useEffect(() => {
    const els = list.current?.querySelectorAll<HTMLElement>('[data-i]') ?? []
    const io = new IntersectionObserver((entries) => {
      const hit = entries.find((e) => e.isIntersecting)
      if (hit) setActive(Number((hit.target as HTMLElement).dataset.i))
    }, { rootMargin: '-45% 0px -50% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [era])

  return (
    <>
      <PageHero eyebrow="ציר זמן" title="3,000 שנה בקצרה"
        lead="האירועים שחייבים להכיר, ולצידם מפת הארץ של אותה תקופה: מי שלט כאן, ומה לא היה כאן אף פעם." />

      <section className="container tl-facts" aria-label="שלוש עובדות לזכור">
        {KEY_FACTS.map((f, n) => (
          <div key={f.title} className="tl-fact reveal">
            <span className="n">{n + 1}</span>
            <div className="k">{f.k}</div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </section>

      <div className="tl-filters">
        <div className="container">
          <div className="chips" role="tablist">
            <button className={`chip ${era === 'all' ? 'on' : ''}`} onClick={() => setEra('all')}>הכל</button>
            <button className={`chip ${era === 'key' ? 'on' : ''}`} onClick={() => setEra('key')}>החשובים</button>
            {ERAS.map((e) => (
              <button key={e.id} className={`chip ${era === e.id ? 'on' : ''}`} onClick={() => setEra(e.id)}>{e.label}</button>
            ))}
          </div>
        </div>
      </div>

      <section className="container tl-wrap">
        <div className="timeline" ref={list}>
          {items.map((e, n) => {
            const isOpen = open === e.i
            const newPeriod = n === 0 || items[n - 1].map !== e.map
            return (
              <Fragment key={e.i}>
                {/* Small screens have no side column: each new period opens with its map */}
                {newPeriod && !wide && <div className="tl-period"><LandMap period={e.map} /></div>}
                <div data-i={e.i} className={`tl-item reveal ${e.key ? 'key' : ''} ${cur === TIMELINE[e.i] ? 'on' : ''}`}>
                  <div className="tl-year">{e.year}</div>
                  <button className={`tl-card ${isOpen ? 'open' : ''}`} onClick={() => { setActive(e.i); setOpen(isOpen ? null : e.i) }} aria-expanded={isOpen}>
                    <div className="top"><span className="era">{eraLabel(e.era).label}</span>{e.key && <span className="badge">אירוע מפתח</span>}</div>
                    <h3>{e.title}</h3>
                    <p><Emph text={e.text} /></p>
                    <div className="tl-more">
                      <div>
                        {e.img && !wide && <Pic k={e.img} alt={e.title} />}
                        <div className="why"><b>למה זה חשוב: </b><Emph text={e.why} /></div>
                        <p className="lm-note">{e.bottom}</p>
                        {e.sources && <div style={{ marginTop: 12 }} onClick={(ev) => ev.stopPropagation()}><SourceLinks sources={e.sources} /></div>}
                      </div>
                    </div>
                    <div className="tl-toggle">{isOpen ? 'סגירה' : 'למה זה חשוב'}</div>
                  </button>
                </div>
              </Fragment>
            )
          })}
        </div>

        <aside className="tl-side" aria-label="מפה והסבר">
          <div className="tl-side-text">
            <div className="tl-explain" key={cur.title}>
              {cur.img && <Pic k={cur.img} alt={cur.title} />}
              <div className="tl-explain-k">{cur.year}</div>
              <h3>{cur.title}</h3>
              <p><Emph text={cur.why} /></p>
              {cur.sources && <SourceLinks sources={cur.sources} />}
            </div>
            <p className="lm-note" key={`b-${cur.title}`}>{cur.bottom}</p>
            <PeriodText period={cur.map} />
          </div>
          <div className="tl-side-map"><MapView period={cur.map} /></div>
        </aside>
      </section>
    </>
  )
}
