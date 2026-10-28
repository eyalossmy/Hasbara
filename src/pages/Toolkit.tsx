import { useState } from 'react'
import { TOOLKIT, type TKItem } from '../data/toolkit'
import { PageHero, copyText, shareUrl, useReveal } from '../components/ui'

type Len = 'short' | 'mid' | 'deep'
const LENS: { id: Len; label: string }[] = [
  { id: 'short', label: '⚡ 10 שניות' },
  { id: 'mid', label: '☕ דקה' },
  { id: 'deep', label: '🤓 חפירה' },
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
        <button className="btn btn-soft btn-sm" onClick={() => copyText(text)}>📋 העתקה</button>
        <a className="btn btn-soft btn-sm" href={shareUrl(`${item.q}\n${text}`)} target="_blank" rel="noopener noreferrer">💬 שליחה בוואטסאפ</a>
      </div>
    </article>
  )
}

export default function Toolkit() {
  useReveal()
  return (
    <>
      <PageHero eyebrow="🧰 ארגז כלים" emoji="🎤" title="מה עונים כש..."
        lead="השאלות שתשמעו בקמפוס, ברשתות ובארוחת שישי — עם שלוש רמות תשובה: אחת לציוץ, אחת לשיחה ואחת למי שבאמת רוצה להבין. בחרו, העתיקו, שלחו." />
      <section className="section-tight">
        <div className="container">
          <div className="box honest reveal" style={{ marginBottom: 24, fontSize: 16 }}>
            <h4>💡 טיפ של מקצוענים</h4>
            הסברה טובה היא לא לנצח בוויכוח — היא לשכנע את מי שמקשיב מהצד. דברו בשקט, תנו עובדה אחת חזקה במקום עשר חלשות, ואל תפחדו להודות כשמשהו מורכב. זה מה שבונה אמינות.
          </div>
          <div className="tk-grid">
            {TOOLKIT.map((t) => <Card key={t.q} item={t} />)}
          </div>
        </div>
      </section>
    </>
  )
}
