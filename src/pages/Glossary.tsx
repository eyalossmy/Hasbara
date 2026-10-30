import { useState } from 'react'
import { GLOSSARY, TERM_CATS, type TermCat } from '../data/glossary'
import { PageHero, SourceLinks } from '../components/ui'

export default function Glossary() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<TermCat | 'all'>('all')
  const s = q.trim().toLowerCase()
  const list = GLOSSARY.filter((t) => (cat === 'all' || t.cat === cat) && (!s || [t.he, t.en.toLowerCase(), t.def].some((x) => x.includes(s))))
  const groups = TERM_CATS.map((c) => ({ ...c, terms: list.filter((t) => t.cat === c.id) })).filter((g) => g.terms.length)

  return (
    <>
      <PageHero eyebrow="מילון" title="המילים, בדיוק"
        lead={`${GLOSSARY.length} מונחים שחשוב להבין נכון, ולזהות כשמשתמשים בהם לא נכון.`} />
      <div className="gl-bar">
        <div className="container">
          <label className="search">
            <span className="ic">🔎</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש בעברית או באנגלית" aria-label="חיפוש מונח" />
          </label>
          <div className="gl-cats" role="tablist">
            <button className={cat === 'all' ? 'on' : ''} onClick={() => setCat('all')}>הכל <span>{GLOSSARY.length}</span></button>
            {TERM_CATS.map((c) => (
              <button key={c.id} className={`c-${c.id} ${cat === c.id ? 'on' : ''}`} onClick={() => setCat(c.id)}>
                {c.label} <span>{GLOSSARY.filter((t) => t.cat === c.id).length}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <section className="section-tight">
        <div className="container">
          {groups.map((g) => (
            <div key={g.id} className="gl-group">
              <h2 className={`gl-h c-${g.id}`}>{g.label}</h2>
              <div className="gl-grid">
                {g.terms.map((t) => (
                  <article key={t.en} className={`gl c-${t.cat}`}>
                    <div className="en">{t.en}</div>
                    <h3>{t.he}</h3>
                    <p>{t.def}</p>
                    {t.tip && <div className="tip"><b>ומה עונים?</b>{t.tip}</div>}
                    {t.sources && <div style={{ marginTop: 14 }}><SourceLinks sources={t.sources} /></div>}
                  </article>
                ))}
              </div>
            </div>
          ))}
          {list.length === 0 && <div className="empty"><div className="em">📭</div><p>לא מצאנו את המונח הזה. עדיין.</p></div>}
        </div>
      </section>
    </>
  )
}
