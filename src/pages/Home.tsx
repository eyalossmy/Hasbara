import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CLAIMS } from '../data/claims'
import { STATUS, type Status } from '../data/types'
import { CountUp, StatusBadge, useReveal } from '../components/ui'

const PATHS = [
  { to: '/myths', emoji: '🔍', bg: 'var(--coral-soft)', title: 'מיתוס מול מציאות', text: '14 הטענות הנפוצות נגד ישראל — ומה באמת קרה. עם מקורות, סטטוס אמינות ותשובה בשורה אחת.', big: true },
  { to: '/toolkit', emoji: '🧰', bg: 'var(--gold-soft)', title: 'ארגז כלים לוויכוח', text: 'תשובה ל־10 שניות, לדקה או לחפירה עמוקה. העתיקו, שתפו, ניצחתם.' },
  { to: '/timeline', emoji: '⏳', bg: 'var(--sky)', title: '3,000 שנה ב־5 דקות', text: 'ציר זמן אינטראקטיבי מדוד המלך ועד חרבות ברזל.' },
  { to: '/oct7', emoji: '🎗️', bg: '#fff1d6', title: '7 באוקטובר', text: 'מה קרה, שעה אחר שעה. כדי שאף אחד לא יוכל להכחיש.' },
  { to: '/law', emoji: '⚖️', bg: 'var(--violet-soft)', title: 'משפט בינלאומי בגובה העיניים', text: 'מידתיות, מגן אנושי, ICJ מול ICC — בלי דוקטורט במשפטים.' },
  { to: '/map', emoji: '🌍', bg: 'var(--mint-soft)', title: 'העולם גדול מעזה', text: 'מפה אינטראקטיבית של סכסוכים בעולם — כדי לשים דברים בפרופורציה. לחצו על נקודה וגלו מה קורה שם.', wide: true },
  { to: '/quiz', emoji: '🧠', bg: 'var(--gold-soft)', title: 'החידון', text: '12 שאלות שיגלו אם אתם מוכנים לוויכוח הבא.' },
]

export default function Home() {
  useReveal()
  const [mythIdx, setMythIdx] = useState(() => Math.floor(Math.random() * CLAIMS.length))
  const [flipped, setFlipped] = useState(false)
  const myth = CLAIMS[mythIdx]

  const nextMyth = () => {
    setFlipped(false)
    setTimeout(() => setMythIdx((i) => (i + 1) % CLAIMS.length), 250)
  }

  return (
    <>
      <section className="hero">
        <div className="grid-bg" />
        <div className="container hero-in">
          <span className="pill-live">🇮🇱 הסברה ישראלית · <b>בלי לצעוק, עם מקורות</b></span>
          <h1>האמת פשוטה יותר <span className="hl">ממה שמספרים לכם בטיקטוק.</span></h1>
          <p className="lead">ציר זמן, מיתוסים מול עובדות, משפט בינלאומי בשפה של בני אדם וארגז כלים לכל ויכוח — מהקמפוס ועד קבוצת הווטסאפ המשפחתית.</p>
          <div className="hero-actions">
            <Link to="/myths" className="btn btn-primary">מיתוס מול מציאות</Link>
            <Link to="/quiz" className="btn btn-soft">🧠 כמה אתם יודעים?</Link>
          </div>
        </div>
        <div className="container">
          <div className="bento">
            <Link to="/myths#occupied-gaza" className="bc tall lilac reveal">
              <span className="bc-k">❌ מיתוס נפוץ</span>
              <div className="bc-q"><s>״עזה הייתה כבושה עד 7 באוקטובר״</s></div>
              <p className="bc-a">ב־2005 ישראל הוציאה מעזה כל חייל וכל אזרח — 21 יישובים פונו. מ־2007 שולט בה חמאס לבדו.</p>
              <span className="bc-link">לכל 14 המיתוסים ←</span>
            </Link>
            <div className="bc sky reveal">
              <span className="bc-k">🧳 הנכבה שלא מדברים עליה</span>
              <div className="bc-n"><CountUp to={850000} /></div>
              <p className="bc-t">פליטים יהודים ממדינות ערב ואיראן. ישראל קלטה את כולם.</p>
            </div>
            <div className="bc mint reveal">
              <span className="bc-k">🗳️ ״אפרטהייד״?</span>
              <div className="bc-n"><CountUp to={21} suffix="%" /></div>
              <p className="bc-t">מאזרחי ישראל ערבים — עם זכות הצבעה, נציגים בכנסת ושופט בעליון.</p>
            </div>
            <div className="bc white reveal">
              <span className="bc-k">🎗️ 7.10.2023</span>
              <div className="bc-n"><CountUp to={251} /></div>
              <p className="bc-t">חטופים, מתינוקות ועד קשישים.</p>
            </div>
            <Link to="/timeline" className="bc wide peach reveal">
              <span className="bc-k">📜 29.11.1947</span>
              <div className="bc-q">היהודים אמרו ״כן״ לחלוקה. הצד השני פתח במלחמה.</div>
              <span className="bc-link">3,000 שנה ב־5 דקות ←</span>
              <span className="bc-ill" aria-hidden>🕊️</span>
            </Link>
            <div className="bc lemon reveal">
              <span className="bc-k">🏛️ מצבת מרנפתח</span>
              <div className="bc-n"><CountUp to={3200} /></div>
              <p className="bc-t">שנה עברו מאז ש״ישראל״ נחקק באבן במצרים.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">✦ בחרו מסלול</span>
            <h2>מאיפה מתחילים?</h2>
            <p>יש לכם 30 שניות? 5 דקות? ערב שלם? יש מסלול לכל אחד.</p>
          </div>
          <div className="paths">
            {PATHS.map((p) => (
              <Link key={p.to} to={p.to} className={`path reveal ${p.big ? 'big' : ''} ${p.wide ? 'wide' : ''}`}>
                <div className="ic" style={p.big ? undefined : { background: p.bg }}>{p.emoji}</div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <div className="go">יאללה <span>←</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)', borderBlock: '1px solid var(--line)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 48 }}>
            <div className="reveal">
              <span className="eyebrow">🎲 מיתוס אקראי</span>
              <h2 style={{ fontSize: 'clamp(30px,4.4vw,46px)', fontWeight: 800, margin: '10px 0 14px' }}>הפכו את הכרטיס.</h2>
              <p className="muted" style={{ fontSize: 18 }}>כל מיתוס מקבל תשובה קצרה שאפשר לשלוף בוויכוח — ועמוד מלא עם הראיות, ההקשר המשפטי, ומה שבאמת שנוי במחלוקת.</p>
              <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
                <button className="btn btn-soft" onClick={nextMyth}>🎲 מיתוס אחר</button>
                <Link to={`/myths#${myth.id}`} className="btn btn-primary">לכל הפרטים</Link>
              </div>
            </div>
            <div className={`flip reveal ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)} role="button" tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFlipped(!flipped)} aria-label="הפוך כרטיס">
              <div className="flip-inner">
                <div className="flip-face flip-front">
                  <span className="lbl">❌ מה אומרים</span>
                  <div className="q">{myth.claim}</div>
                  <div className="muted" style={{ fontSize: 14 }}>מי טוען: {myth.who}</div>
                  <div className="hint">👆 לחצו להפוך</div>
                </div>
                <div className="flip-face flip-back">
                  <span className="lbl">✅ מה באמת</span>
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
          <div className="section-head center center-text reveal" style={{ textAlign: 'center' }}>
            <span className="eyebrow">🔎 איך אנחנו עובדים</span>
            <h2>אל תסמכו עלינו. תבדקו.</h2>
            <p>ההסברה הכי חזקה היא זו שעומדת בבדיקה. לכן כל טענה באתר מסומנת לפי רמת הוודאות שלה — ומגיעה עם מקורות.</p>
          </div>
          <div className="method">
            {(Object.keys(STATUS) as Status[]).map((s) => (
              <div key={s} className="m reveal">
                <StatusBadge status={s} />
                <p>{STATUS[s].desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="cta-band reveal">
            <div className="glow a" style={{ opacity: .4 }} />
            <div>
              <h2>12 שאלות. 3 דקות. 0 רחמים.</h2>
              <p>בדקו אם אתם מוכנים לוויכוח הבא — ותגלו איזה דרגת הסברן אתם.</p>
            </div>
            <Link to="/quiz" className="btn btn-gold">🧠 להתחיל חידון</Link>
          </div>
        </div>
      </section>
    </>
  )
}
