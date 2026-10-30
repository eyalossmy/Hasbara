import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CLAIMS } from '../data/claims'
import { STATUS, type Status } from '../data/types'
import { CountUp, Split, StatusBadge, useReveal } from '../components/ui'

const PATHS = [
  { to: '/myths', title: 'מיתוס מול מציאות', text: 'הטענות הנפוצות נגד ישראל, והתשובות.' },
  { to: '/toolkit', title: 'ארגז כלים', text: 'מה עונים, בעשר שניות, בדקה או לעומק.' },
  { to: '/timeline', title: 'ציר זמן', text: '3,000 שנה, מדוד המלך ועד היום.' },
  { to: '/oct7', title: '7 באוקטובר', text: 'מה קרה, שעה אחר שעה.' },
  { to: '/law', title: 'משפט בינלאומי', text: 'מידתיות, מגן אנושי, ICJ ו־ICC.' },
  { to: '/map', title: 'מפת העולם', text: '152 סכסוכים מאז 1948, במפה אחת.' },
  { to: '/quiz', title: 'חידון', text: '12 שאלות. כמה אתם באמת יודעים?' },
  { to: '/gaza-or-not', title: 'עזה או לא?', text: 'תשע תמונות של הרס. אף אחת לא מעזה.' },
]

export default function Home() {
  useReveal()
  const [mythIdx, setMythIdx] = useState(() => Math.floor(Math.random() * CLAIMS.length))
  const [flipped, setFlipped] = useState(false)
  const myth = CLAIMS[mythIdx]

  const nextMyth = () => {
    setFlipped(false)
    setTimeout(() => setMythIdx((i) => (i + 1) % CLAIMS.length), 300)
  }

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-in">
            <div>
              <span className="eyebrow fade-up" style={{ ['--d' as string]: '0s' }}>הסברה ישראלית</span>
              <h1><Split text="העובדות על ישראל." /><br /><span className="hl"><Split text="בלי רעש." /></span></h1>
            </div>
            <div className="hero-side">
              <p className="lead fade-up" style={{ ['--d' as string]: '.5s' }}>תשובות קצרות ומדויקות, עם מקורות, לשאלות שכולם שואלים.</p>
              <div className="hero-actions fade-up" style={{ ['--d' as string]: '.65s' }}>
                <Link to="/myths" className="btn btn-primary">למיתוסים</Link>
                <Link to="/quiz" className="btn btn-soft">לחידון</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="bento">
            <Link to="/myths#occupied-gaza" className="bc tall dark reveal">
              <span className="bc-k">מיתוס נפוץ</span>
              <div className="bc-q"><s>״עזה הייתה כבושה עד 7 באוקטובר״</s></div>
              <p className="bc-a">ב־2005 ישראל יצאה מעזה, כל חייל וכל אזרח. מ־2007 שולט בה חמאס לבדו.</p>
              <span className="bc-link">לכל המיתוסים</span>
            </Link>
            <div className="bc reveal">
              <span className="bc-k">פליטים יהודים ממדינות ערב</span>
              <div className="bc-n"><CountUp to={850000} /></div>
              <p className="bc-t">ישראל קלטה את כולם.</p>
            </div>
            <div className="bc reveal">
              <span className="bc-k">מאזרחי ישראל ערבים</span>
              <div className="bc-n"><CountUp to={21} suffix="%" /></div>
              <p className="bc-t">מצביעים, נבחרים, שופטים.</p>
            </div>
            <div className="bc reveal">
              <span className="bc-k">7.10.2023</span>
              <div className="bc-n"><CountUp to={251} /></div>
              <p className="bc-t">חטופים, מתינוקות ועד קשישים.</p>
            </div>
            <Link to="/timeline" className="bc wide reveal">
              <span className="bc-k">29.11.1947</span>
              <div className="bc-q">היהודים אמרו ״כן״ לחלוקה. הצד השני פתח במלחמה.</div>
              <span className="bc-link">לציר הזמן</span>
            </Link>
            <div className="bc reveal">
              <span className="bc-k">שנים מאז ש״ישראל״ נחקק באבן</span>
              <div className="bc-n"><CountUp to={3200} /></div>
              <p className="bc-t">מצבת מרנפתח, מצרים.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">התחילו כאן</span>
            <h2>שבע דרכים להבין</h2>
          </div>
          <nav className="plist" aria-label="מסלולים באתר">
            {PATHS.map((p, i) => (
              <Link key={p.to} to={p.to} className="prow reveal">
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 72 }}>
            <div className="reveal">
              <span className="eyebrow">מיתוס אקראי</span>
              <h2 style={{ fontSize: 'clamp(34px,4.6vw,56px)', margin: '18px 0 16px' }}>הפכו את הכרטיס.</h2>
              <p className="muted" style={{ fontSize: 19 }}>טענה נפוצה, ותשובה במשפט אחד.</p>
              <div style={{ display: 'flex', gap: 24, marginTop: 32, alignItems: 'center', flexWrap: 'wrap' }}>
                <Link to={`/myths#${myth.id}`} className="btn btn-primary">לפרטים המלאים</Link>
                <button className="btn btn-link" onClick={nextMyth}>מיתוס אחר</button>
              </div>
            </div>
            <div className={`flip reveal ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)} role="button" tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFlipped(!flipped)} aria-label="הפוך כרטיס">
              <div className="flip-inner">
                <div className="flip-face flip-front">
                  <span className="lbl">מה אומרים</span>
                  <div className="q">{myth.claim}</div>
                  <div className="muted" style={{ fontSize: 14 }}>{myth.who}</div>
                  <div className="hint">לחצו להפוך</div>
                </div>
                <div className="flip-face flip-back">
                  <span className="lbl">מה נכון</span>
                  <div className="a">{myth.oneLiner}</div>
                  <div style={{ marginTop: 'auto' }}><StatusBadge status={myth.status} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">שיטה</span>
            <h2>אל תסמכו עלינו. תבדקו.</h2>
            <p>כל טענה באתר מסומנת לפי רמת הוודאות שלה, ומגיעה עם מקור.</p>
          </div>
          <div className="method">
            {(Object.keys(STATUS) as Status[]).map((s) => (
              <div key={s} className="m reveal">
                <StatusBadge status={s} />
                <p>{STATUS[s].desc}</p>
              </div>
            ))}
          </div>

          <div className="cta-band reveal" style={{ marginTop: 120 }}>
            <div>
              <h2>12 שאלות.<br />שלוש דקות.</h2>
              <p>כמה אתם באמת יודעים?</p>
            </div>
            <Link to="/quiz" className="btn btn-primary">להתחיל</Link>
          </div>
        </div>
      </section>
    </>
  )
}
