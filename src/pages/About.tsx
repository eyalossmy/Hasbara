import { SRC } from '../data/sources'
import { LAST_UPDATED, REPO_URL, STATUS, type Status } from '../data/types'
import { Link } from 'react-router-dom'
import { MISSIONS, SECTIONS } from '../data/sections'
import { PageHero, StatusBadge, useReveal } from '../components/ui'

const PRINCIPLES = [
  { e: '🧾', t: 'כל טענה עם מקור', d: 'אם אי אפשר לבדוק את זה, זה לא נכנס. מקורות ראשוניים קודם, ותמיד מצוין מי אומר מה.' },
  { e: '🏷️', t: 'סטטוס לכל טענה', d: 'מפרידים בין עובדה מאומתת, טענה של צד, מחלוקת ומידע שעדיין מתפתח.' },
  { e: '🤝', t: 'לא מסתירים את הקשה', d: 'הסברה שמתעלמת מטענות קשות לא משכנעת אף אחד. אנחנו מציגים אותן, ומשיבים.' },
  { e: '🔢', t: 'מספרים בזהירות', d: 'כל מספר עם תאריך ומקור. ולא משווים מספרים ממקורות שסופרים דברים שונים.' },
  { e: '✏️', t: 'מתקנים בפומבי', d: 'טעינו? מתקנים, ומתעדים את התיקון בהיסטוריית השינויים של הפרויקט.' },
  { e: '⚖️', t: 'לא פוסקים במקום בתי דין', d: 'מונחים כמו ״רצח עם״ או ״פשע מלחמה״ הם קביעות משפטיות. אנחנו מסבירים מי טוען, מה נקבע ומה לא.' },
]

export default function About() {
  useReveal()
  return (
    <>
      <PageHero eyebrow="המשימה ושקיפות" title="למה האתר הזה קיים"
        lead="לאתר יש עמדה ישראלית ברורה. לכן כל טענה בו מגובה במקור ומסומנת לפי רמת הוודאות, כדי שכל אחד, בכל מקום בעולם, יוכל לבדוק בעצמו." />

      <section className="section-tight">
        <div className="container">
          <div className="section-head reveal"><span className="eyebrow">המשימה</span><h2>שלוש משימות</h2></div>
          <div className="missions">
            {MISSIONS.map((m, i) => (
              <Link key={m.n} to={SECTIONS.find((s) => s.mission === i)!.to} className="mission reveal">
                <span className="n">{m.n}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="grid-3">
            {PRINCIPLES.map((p) => (
              <div key={p.t} className="card reveal">
                <h3 style={{ fontSize: 26, margin: '0 0 10px' }}>{p.t}</h3>
                <p className="muted">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="section-head reveal"><span className="eyebrow">מקרא</span><h2>רמות ודאות</h2></div>
          <div className="method">
            {(Object.keys(STATUS) as Status[]).map((s) => (
              <div key={s} className="m reveal"><StatusBadge status={s} /><p><b style={{ direction: 'ltr', display: 'block', color: 'var(--ink)' }}>{STATUS[s].en}</b>{STATUS[s].desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="section-head reveal"><span className="eyebrow">מקורות</span><h2>המקורות המרכזיים</h2><p>בכל עמוד, ליד כל פריט, מופיעים המקורות שלו. כאן מרוכזים העיקריים.</p></div>
          <div className="src-table">
            {Object.values(SRC).map((s) => (
              <a key={s.url} className="src-row" href={s.url} target="_blank" rel="noopener noreferrer">
                <span>🔗</span>
                <span><span className="t">{s.label}</span><br /><span className="k">{new URL(s.url).hostname.replace('www.', '')}</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="cta-band reveal">
            <div>
              <h2>מצאתם טעות?</h2>
              <p>אנחנו בודקים כל פנייה ומתקנים בפומבי. עודכן: {LAST_UPDATED}</p>
            </div>
            <a className="btn btn-primary" href={`${REPO_URL}/issues/new`} target="_blank" rel="noopener noreferrer">דיווח על טעות</a>
          </div>
        </div>
      </section>
    </>
  )
}
