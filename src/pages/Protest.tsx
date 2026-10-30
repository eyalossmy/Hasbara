import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PROTEST_QS, type ProtestQ } from '../data/protest'
import { VIDEOS } from '../data/videos'
import { I } from '../data/intl'
import { PageHero, SourceLinks, copyText, shareUrl, useReveal } from '../components/ui'
import { Videos } from '../components/Video'

function Question({ item }: { item: ProtestQ }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="pq reveal">
      <button onClick={() => setOpen(!open)} aria-expanded={open}>
        <h3>{item.q}</h3>
        <span className="tog">{open ? 'סגירה' : 'מה כדאי לדעת'}</span>
      </button>
      {open && (
        <div className="pq-body">
          <div className="fact"><b>העובדות</b>{item.fact}</div>
          <div className="trick"><b>איפה התרמית</b>{item.trick}</div>
          <SourceLinks sources={item.sources} />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn btn-soft btn-sm" onClick={() => copyText(`${item.q}\n${item.fact}`)}>העתקה</button>
            <a className="btn btn-soft btn-sm" href={shareUrl(item.q)} target="_blank" rel="noopener noreferrer">שליחה בוואטסאפ</a>
          </div>
        </div>
      )}
    </article>
  )
}

export default function Protest() {
  useReveal()
  return (
    <>
      <PageHero eyebrow="לפני שיוצאים להפגין" title="שאלות שכדאי לשאול את עצמכם"
        lead="רוב מי שיוצא להפגין למען פלסטין עושה את זה כי אכפת לו מבני אדם. זה בסדר גמור. אלה השאלות שמוודאות שאף אחד לא משתמש בכם." />

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 940 }}>
          <div className="pq-list">{PROTEST_QS.map((q) => <Question key={q.q} item={q} />)}</div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 940 }}>
          <div className="analysis reveal">
            <span className="think-k">פרשנות</span>
            <h3>אז מותר להפגין?</h3>
            <div className="an-cols">
              <div><h4>מה אומרים המבקרים</h4><p>כל ביקורת על ההפגנות היא ניסיון להשתיק את הסבל הפלסטיני ולתייג כל מבקר כאנטישמי.</p></div>
              <div><h4>איך אנחנו קוראים את זה</h4><p>מותר ואף ראוי להפגין למען אזרחי עזה. הבעיה מתחילה כשההפגנה מצדיקה את 7 באוקטובר, קוראת לחיסול ישראל, או פוגעת ביהודים בגלל שהם יהודים.</p></div>
              <div><h4>מה עדיין פתוח</h4><p>יש מחלוקת אמיתית על סיסמאות מסוימות, ויש מפגינים שמתכוונים אליהן אחרת ממה שהן אומרות. דווקא בגלל זה, כדאי לשאול לפני שצועקים.</p></div>
            </div>
            <SourceLinks sources={[I.berkeleyRiver, I.dniIran, I.stateIhra]} />
          </div>
          <div className="ac-next reveal">
            <Link to="/myths" className="btn btn-soft">למיתוסים</Link>
            <Link to="/compare" className="btn btn-soft">איך נראה רצח עם באמת</Link>
            <Link to="/gaza-or-not" className="btn btn-soft">עזה או לא?</Link>
          </div>
        </div>
      </section>

      <Videos list={VIDEOS.protest} />
    </>
  )
}
