import { useState } from 'react'
import { ERAS, TIMELINE, type Era } from '../data/timeline'
import { PageHero, SourceLinks, useReveal } from '../components/ui'

export default function Timeline() {
  const [era, setEra] = useState<Era | 'all' | 'key'>('all')
  const [open, setOpen] = useState<number | null>(null)
  useReveal()

  const items = TIMELINE.map((e, i) => ({ ...e, i })).filter((e) => era === 'all' || (era === 'key' ? e.key : e.era === era))
  const eraLabel = (id: Era) => ERAS.find((x) => x.id === id)!

  return (
    <>
      <PageHero eyebrow="⏳ ציר זמן" emoji="📜" title="3,000 שנה. 5 דקות קריאה."
        lead="מדוד המלך ועד חרבות ברזל — האירועים שחייבים להכיר כדי להבין את הסכסוך. לחצו על אירוע כדי לגלות למה הוא חשוב לוויכוח הבא שלכם." />

      <div className="tl-filters">
        <div className="container">
          <div className="chips" role="tablist">
            <button className={`chip ${era === 'all' ? 'on' : ''}`} onClick={() => setEra('all')}>הכל</button>
            <button className={`chip ${era === 'key' ? 'on' : ''}`} onClick={() => setEra('key')}>⭐ רק החשובים</button>
            {ERAS.map((e) => (
              <button key={e.id} className={`chip ${era === e.id ? 'on' : ''}`} onClick={() => setEra(e.id)}>{e.emoji} {e.label}</button>
            ))}
          </div>
        </div>
      </div>

      <section className="container" style={{ maxWidth: 900 }}>
        <div className="timeline">
          {items.map((e) => {
            const isOpen = open === e.i
            return (
              <div key={e.i} className={`tl-item reveal ${e.key ? 'key' : ''}`}>
                <div className="tl-year">{e.year}</div>
                <button className={`tl-card ${isOpen ? 'open' : ''}`} onClick={() => setOpen(isOpen ? null : e.i)} aria-expanded={isOpen}>
                  <div className="top"><span className="era">{eraLabel(e.era).emoji} {eraLabel(e.era).label}</span>{e.key && <span className="badge disputed" style={{ background: 'var(--gold-soft)' }}>אירוע מפתח</span>}</div>
                  <h3><span className="em">{e.emoji}</span>{e.title}</h3>
                  <p>{e.text}</p>
                  <div className="tl-more">
                    <div>
                      <div className="why"><b>💡 למה זה חשוב: </b>{e.why}</div>
                      {e.sources && <div style={{ marginTop: 12 }} onClick={(ev) => ev.stopPropagation()}><SourceLinks sources={e.sources} /></div>}
                    </div>
                  </div>
                  <div className="tl-toggle">{isOpen ? 'סגור ↑' : 'למה זה חשוב? ↓'}</div>
                </button>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
