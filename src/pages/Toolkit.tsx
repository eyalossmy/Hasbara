import { useState } from 'react'
import { TOOLKIT, type TKItem } from '../data/toolkit'
import Pic from '../components/Pic'
import { PageHero, copyText, shareUrl, useReveal } from '../components/ui'

type Len = 'short' | 'mid' | 'deep'
const LENS: { id: Len; label: string }[] = [
  { id: 'short', label: '10 שניות' },
  { id: 'mid', label: 'דקה' },
  { id: 'deep', label: 'לעומק' },
]

function Card({ item }: { item: TKItem }) {
  const [len, setLen] = useState<Len>('short')
  const text = item[len]
  return (
    <article className="tk reveal">
      <div className="q">
        <span className="em">{item.emoji}</span>
        <div>
          <h3>{item.q}</h3>
          <div className="ctx">{item.ctx}</div>
        </div>
      </div>
      <div className="seg" role="tablist">
        {LENS.map((l) => (
          <button key={l.id} role="tab" aria-selected={len === l.id} className={len === l.id ? 'on' : ''} onClick={() => setLen(l.id)}>{l.label}</button>
        ))}
      </div>
      <div key={len} className={`ans ${len === 'short' ? 'short' : ''}`}>{text}</div>
      <div className="row">
        <button className="btn btn-soft btn-sm" onClick={() => copyText(text)}>העתקה</button>
        <a className="btn btn-soft btn-sm" href={shareUrl(`${item.q}\n${text}`)} target="_blank" rel="noopener noreferrer">שליחה בוואטסאפ</a>
      </div>
    </article>
  )
}

export default function Toolkit() {
  useReveal()
  return (
    <>
      <PageHero eyebrow="ארגז כלים" title="מה עונים כש…"
        lead="תשובה לעשר שניות, לדקה או לעומק. העתיקו ושלחו." />

      <section className="section-tight" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="photo-grid">
            <div className="reveal"><Pic k="campDavid" alt="קמפ דייוויד, 2000: הוצעה מדינה, והתשובה הייתה לא" /><p className="photo-cap">קמפ דייוויד, 2000: הוצעה מדינה, והתשובה הייתה לא</p></div>
            <div className="reveal"><Pic k="bringHome" alt="251 חטופים: העובדה הראשונה בכל ויכוח" /><p className="photo-cap">251 חטופים: העובדה הראשונה בכל ויכוח</p></div>
            <div className="reveal"><Pic k="kiryatShmona" alt="רקטה של חיזבאללה בקריית שמונה" /><p className="photo-cap">רקטה של חיזבאללה בקריית שמונה</p></div>
          </div>
        </div>
      </section>
      <section className="section-tight">
        <div className="container">
          <p className="muted reveal" style={{ maxWidth: '60ch', marginBottom: 40, fontSize: 18 }}>
            המטרה היא לא לנצח בוויכוח, אלא לשכנע את מי שמקשיב מהצד. עובדה אחת חזקה עדיפה על עשר חלשות.
          </p>
          <div className="tk-grid">
            {TOOLKIT.map((t) => <Card key={t.q} item={t} />)}
          </div>
        </div>
      </section>
    </>
  )
}
