import { SRC } from '../data/sources'
import { LAST_UPDATED, REPO_URL, STATUS, type Status } from '../data/types'
import { PageHero, StatusBadge, useReveal } from '../components/ui'

const PRINCIPLES = [
  { e: '🧾', t: 'כל טענה עם מקור', d: 'אם אי אפשר לבדוק את זה — זה לא נכנס. מקורות ראשוניים קודם, ותמיד מצוין מי אומר מה.' },
  { e: '🏷️', t: 'סטטוס לכל טענה', d: 'מפרידים בין עובדה מאומתת, טענה של צד, מחלוקת ומידע שעדיין מתפתח.' },
  { e: '🤝', t: 'לא מסתירים את הקשה', d: 'הסברה שמתעלמת מטענות קשות לא משכנעת אף אחד. אנחנו מציגים אותן — ומשיבים.' },
  { e: '🔢', t: 'מספרים בזהירות', d: 'כל מספר עם תאריך ומקור. ולא משווים מספרים ממקורות שסופרים דברים שונים.' },
  { e: '✏️', t: 'מתקנים בפומבי', d: 'טעינו? מתקנים, ומתעדים את התיקון בהיסטוריית השינויים של הפרויקט.' },
  { e: '⚖️', t: 'לא פוסקים במקום בתי דין', d: 'מונחים כמו ״רצח עם״ או ״פשע מלחמה״ הם קביעות משפטיות. אנחנו מסבירים מי טוען, מה נקבע ומה לא.' },
]

export default function About() {
  useReveal()
  return (
    <>
      <PageHero eyebrow="🔎 מרכז השקיפות" emoji="🪟" title="איך אנחנו עובדים"
        lead="האתר הזה מציג את הצד הישראלי — ואנחנו אומרים את זה בגלוי. דווקא בגלל זה, אנחנו מקפידים שכל מה שכתוב כאן יעמוד בבדיקה." />

      <section className="section-tight">
        <div className="container">
          <div className="grid-3">
            {PRINCIPLES.map((p) => (
              <div key={p.t} className="card reveal">
                <div style={{ fontSize: 32 }}>{p.e}</div>
                <h3 style={{ fontSize: 20, margin: '10px 0 6px' }}>{p.t}</h3>
                <p className="muted">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="section-head reveal"><span className="eyebrow">🏷️ מקרא</span><h2>סטטוסי אמינות</h2></div>
          <div className="method">
            {(Object.keys(STATUS) as Status[]).map((s) => (
              <div key={s} className="m reveal"><StatusBadge status={s} /><p><b style={{ direction: 'ltr', display: 'block', color: 'var(--ink)' }}>{STATUS[s].en}</b>{STATUS[s].desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="section-head reveal"><span className="eyebrow">📚 ספריית המקורות</span><h2>כל המקורות במקום אחד</h2></div>
          <div className="src-table">
            {Object.values(SRC).map((s) => (
              <a key={s.url} className="src-row" href={s.url} target="_blank" rel="noopener noreferrer">
                <span>🔗</span>
                <span><span className="t">{s.label}</span><br /><span className="k">{new URL(s.url).hostname.replace('www.', '')}</span></span>
                <span className="arr">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="cta-band reveal">
            <div className="glow a" style={{ opacity: .4 }} />
            <div>
              <h2>מצאתם טעות?</h2>
              <p>פתחו דיווח בגיטהאב. אנחנו בודקים כל פנייה ומתקנים בפומבי. עודכן לאחרונה: {LAST_UPDATED}</p>
            </div>
            <a className="btn btn-gold" href={`${REPO_URL}/issues/new`} target="_blank" rel="noopener noreferrer">🐞 דיווח על טעות</a>
          </div>
        </div>
      </section>
    </>
  )
}
