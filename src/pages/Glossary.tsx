import { useState } from 'react'
import { GLOSSARY } from '../data/glossary'
import { PageHero } from '../components/ui'

export default function Glossary() {
  const [q, setQ] = useState('')
  const s = q.trim().toLowerCase()
  const list = GLOSSARY.filter((t) => !s || [t.he, t.en.toLowerCase(), t.def].some((x) => x.includes(s)))

  return (
    <>
      <PageHero eyebrow="📖 מילון" emoji="🔤" title="המילים שכולם זורקים."
        lead="מה זה בעצם ״ציונות״? מה ההבדל בין ״כיבוש״ ל״שטח במחלוקת״? מילון קצר שיעזור לכם לדבר בשפה מדויקת — ולזהות כשמישהו משתמש במילים לא נכון." />
      <section className="section-tight">
        <div className="container">
          <label className="search">
            <span className="ic">🔎</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חפשו מונח בעברית או באנגלית" aria-label="חיפוש מונח" />
          </label>
          <div className="gl-grid">
            {list.map((t) => (
              <div key={t.en} className="gl">
                <div className="en">{t.en}</div>
                <h3>{t.he}</h3>
                <p>{t.def}</p>
                {t.tip && <div className="tip">💡 {t.tip}</div>}
              </div>
            ))}
          </div>
          {list.length === 0 && <div className="empty"><div className="em">📭</div><p>לא מצאנו את המונח הזה. עדיין.</p></div>}
        </div>
      </section>
    </>
  )
}
