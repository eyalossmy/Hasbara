import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CLAIM_CATS, CLAIMS, type ClaimCat } from '../data/claims'
import Pic from '../components/Pic'
import { PageHero, SourceLinks, StatusBadge, copyText, shareUrl, useReveal } from '../components/ui'

export default function Myths() {
  const { hash } = useLocation()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<ClaimCat | 'all'>('all')
  const [open, setOpen] = useState<string | null>(hash ? hash.slice(1) : null)
  useReveal()

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    setOpen(id)
    const t = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 84 })
    }, 120)
    return () => clearTimeout(t)
  }, [hash])

  const list = useMemo(() => {
    const s = q.trim()
    return CLAIMS.filter((c) => (cat === 'all' || c.cat === cat) &&
      (!s || [c.claim, c.oneLiner, c.who, ...c.facts].some((t) => t.includes(s))))
  }, [q, cat])

  return (
    <>
      <PageHero eyebrow="מיתוס מול מציאות" title="מה אומרים, ומה נכון"
        lead="הטענות הנפוצות נגד ישראל, והעובדות, עם מקורות ורמת ודאות." />

      <section className="section-tight" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="photo-grid">
            <div className="reveal"><Pic k="tunnel" alt="מנהרת טרור של חמאס, מתחת לשכונות בעזה" /><p className="photo-cap">מנהרת טרור של חמאס, מתחת לשכונות בעזה</p></div>
            <div className="reveal"><Pic k="rocketsGaza" alt="רקטות משוגרות מאזורים מאוכלסים בעזה" /><p className="photo-cap">רקטות משוגרות מאזורים מאוכלסים בעזה</p></div>
            <div className="reveal"><Pic k="gushKatif" alt="2005: ישראל מפנה את כל היישובים בעזה" /><p className="photo-cap">2005: ישראל מפנה את כל היישובים בעזה</p></div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 940 }}>
          <label className="search">
            <span className="ic">🔎</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש: רצח עם, אפרטהייד, כיבוש…" aria-label="חיפוש טענה" />
            {q && <button onClick={() => setQ('')} aria-label="נקה">✕</button>}
          </label>
          <div className="chips" style={{ marginTop: 16 }}>
            <button className={`chip ${cat === 'all' ? 'on' : ''}`} onClick={() => setCat('all')}>הכל ({CLAIMS.length})</button>
            {CLAIM_CATS.map((c) => (
              <button key={c.id} className={`chip ${cat === c.id ? 'on' : ''}`} onClick={() => setCat(c.id)}>{c.label}</button>
            ))}
          </div>

          <div className="claim-list">
            {list.length === 0 && (
              <div className="empty"><div className="em">🤷</div><p>עוד לא כתבנו על זה. <a href="https://github.com/eyalossmy/Hasbara/issues/new" target="_blank" rel="noopener noreferrer">הציעו לנו טענה</a></p></div>
            )}
            {list.map((c) => {
              const isOpen = open === c.id
              const n = CLAIMS.indexOf(c) + 1
              return (
                <article key={c.id} id={c.id} className={`claim reveal ${isOpen ? 'open' : ''}`} style={{ scrollMarginTop: 90 }}>
                  <button className="claim-head" onClick={() => setOpen(isOpen ? null : c.id)} aria-expanded={isOpen}>
                    <span className="num">{n}</span>
                    <span className="body">
                      <span className="tag">{CLAIM_CATS.find((x) => x.id === c.cat)?.label}</span>
                      <h3>{c.claim}</h3>
                      <span style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                        <StatusBadge status={c.status} />
                        <span className="who">מי טוען: {c.who}</span>
                      </span>
                    </span>
                    <span className="plus" aria-hidden />
                  </button>
                  <div className="claim-body">
                    <div>
                      <div className="claim-inner">
                        <div className="oneliner">
                          <div className="k">התשובה בשורה אחת</div>
                          <p>{c.oneLiner}</p>
                          <div className="actions">
                            <button onClick={() => copyText(c.oneLiner)}>העתקה</button>
                            <a href={shareUrl(`${c.claim}\n${c.oneLiner}`)} target="_blank" rel="noopener noreferrer">וואטסאפ</a>
                          </div>
                        </div>
                        <div>
                          <div className="label-sm" style={{ marginBottom: 10 }}>העובדות</div>
                          <ul className="facts-list">{c.facts.map((f) => <li key={f}>{f}</li>)}</ul>
                        </div>
                        {c.legal && <div className="box law"><h4>ההקשר המשפטי</h4>{c.legal}</div>}
                        {c.honest && <div className="box honest"><h4>מה שנוי במחלוקת</h4>{c.honest}</div>}
                        <div>
                          <div className="label-sm" style={{ marginBottom: 10 }}>מקורות</div>
                          <SourceLinks sources={c.sources} />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
