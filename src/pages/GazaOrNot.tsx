import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GAZA_OR_NOT } from '../data/gazaOrNot'
import { QuizTabs, SourceLinks, copyText, shareUrl } from '../components/ui'

const TIPS = [
  ['חיפוש תמונה הפוך', 'Google Lens או TinEye מראים בשנייה איפה ומתי התמונה הופיעה לראשונה.'],
  ['מי צילם, ומתי?', 'תמונה בלי צלם, בלי תאריך ובלי מקום — היא לא ראיה, היא תעמולה.'],
  ['מי התחיל?', 'הרס במלחמה הוא נורא בכל מקום. השאלה היא מי פתח בה ומי מסתתר מאחורי אזרחים.'],
]

export default function GazaOrNot() {
  const [i, setI] = useState(0)
  const [pick, setPick] = useState<boolean | null>(null)
  const [fooled, setFooled] = useState(0)
  const done = i >= GAZA_OR_NOT.length
  const p = GAZA_OR_NOT[Math.min(i, GAZA_OR_NOT.length - 1)]

  const choose = (gaza: boolean) => {
    if (pick !== null) return
    setPick(gaza)
    if (gaza) setFooled((f) => f + 1)
  }
  const next = () => { setI(i + 1); setPick(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const restart = () => { setI(0); setPick(null); setFooled(0) }

  const total = GAZA_OR_NOT.length
  const shareText = `שיחקתי ב״עזה או לא?״ — ${total} תמונות של הרס, אף אחת מהן לא מעזה. בדקו אם אתם מזהים:`

  return (
    <section className="section gon">
      <div className="container quiz-shell">
        <div className="center" style={{ marginBottom: 28 }}>
          <QuizTabs />
          <h1 className="gon-title">עזה או לא?</h1>
          <p className="muted gon-lead">תמונות של הרס מופצות ברשת כ״עזה״. נחשו איפה הן צולמו באמת — ומי פתח במלחמה.</p>
        </div>

        {done ? (
          <div className="quiz-card gon-end">
            <div className="gon-zero">0/{total}</div>
            <h2>אף אחת מהתמונות לא הייתה מעזה.</h2>
            <p className="muted">
              {fooled === 0 ? 'זיהיתם את כולן. אתם קשים לעבוד עליכם.' : `${fooled} מתוך ${total} פעמים חשבתם שזו עזה. ככה בדיוק עובדת תעמולה.`}
              {' '}מוסול, דרזדן, מילאנו והמבורג נהרסו במלחמות שפתחו בהן דאע״ש, גרמניה הנאצית ואיטליה הפשיסטית. האחריות להרס — על מי שפתח במלחמה.
            </p>
            <div className="gon-tips">
              {TIPS.map(([t, d]) => (
                <div key={t} className="gon-tip"><b>{t}</b><span>{d}</span></div>
              ))}
            </div>
            <div className="row">
              <a className="btn btn-primary" href={shareUrl(shareText)} target="_blank" rel="noopener noreferrer">לאתגר חברים</a>
              <button className="btn btn-soft" onClick={() => copyText(`${shareText} ${window.location.href}`)}>העתקת קישור</button>
              <button className="btn btn-soft" onClick={restart}>שוב</button>
            </div>
            <div style={{ marginTop: 22 }}><Link to="/myths">עוד מיתוסים, ומה עונים עליהם</Link></div>
          </div>
        ) : (
          <div className="quiz-card gon-card">
            <div className="q-top">
              <span>תמונה {i + 1} מתוך {total}</span>
            </div>
            <div className="progress"><i style={{ width: `${((i + (pick !== null ? 1 : 0)) / total) * 100}%` }} /></div>

            <figure className={`gon-photo ${pick !== null ? 'shown' : ''}`} key={p.img}>
              <img src={p.img} alt={p.alt} />
              {pick !== null && (
                <figcaption className="gon-stamp">
                  <span className="no">לא עזה</span>
                  <b>{p.place}</b>
                  <span>{p.when}</span>
                </figcaption>
              )}
            </figure>

            {pick === null ? (
              <div className="gon-btns">
                <button className="gon-btn" onClick={() => choose(true)}>עזה</button>
                <button className="gon-btn" onClick={() => choose(false)}>לא עזה</button>
              </div>
            ) : (
              <div className="gon-reveal">
                <div className="gon-verdict">{pick ? 'נפלתם בפח. זו לא עזה.' : 'נכון. זו לא עזה.'}</div>
                <div className="gon-facts">
                  <div><span>מי פתח במלחמה</span><b>{p.started}</b></div>
                  {p.toll && <div><span>מחיר</span><b>{p.toll}</b></div>}
                </div>
                <p>{p.text}</p>
                <p className="gon-point">{p.point}</p>
                <SourceLinks sources={p.sources} />
                <div className="quiz-next">
                  <button className="btn btn-primary" onClick={next}>{i === total - 1 ? 'לתוצאה' : 'התמונה הבאה'}</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
