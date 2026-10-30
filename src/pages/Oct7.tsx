import { Link } from 'react-router-dom'
import { SRC } from '../data/sources'
import { CountUp, SourceLinks, StatusBadge, useReveal } from '../components/ui'

const HOURS = [
  { t: '06:29', title: 'מטח הרקטות', text: 'חמאס פותח במטח מסיבי על דרום ומרכז ישראל. לפי צה״ל — כ־3,000 רקטות בשעות הראשונות. שבת, שמחת תורה, ואזעקות בכל הארץ.' },
  { t: '06:30+', title: 'פריצת הגדר', text: 'אלפי מחבלים פורצים את גדר הגבול בעשרות נקודות — ברגל, בטנדרים, באופנועים ובמצנחי רחיפה. חלק מהמצלמות ועמדות התצפית מושבתות ברחפנים.' },
  { t: 'בוקר', title: 'מסיבת נובה', text: 'מחבלים מגיעים למסיבה ליד רעים. יותר מ־360 צעירים נרצחים — הטבח הגדול ביותר באותו יום — ורבים נחטפים.' },
  { t: 'בוקר–צהריים', title: 'הקיבוצים והעיירות', text: 'בארי, כפר עזה, ניר עוז, נחל עוז, כיסופים, נתיב העשרה, שדרות, אופקים ועוד. משפחות נרצחות בבתיהן, בתים נשרפים, ילדים וקשישים נחטפים.' },
  { t: 'כל היום', title: 'הלוחמים הראשונים', text: 'כיתות כוננות, שוטרים, חיילים ואזרחים נלחמים לבדם שעות ארוכות עד הגעת כוחות. רבים נופלים בקרב.' },
  { t: 'ימים הבאים', title: 'השבת השליטה', text: 'לוקח ימים לטהר את כל היישובים. ישראל מגייסת כ־360,000 מילואימניקים — הגיוס הגדול בתולדותיה — ויוצאת למלחמה.' },
]

const PLACES = [
  { n: 'בארי', d: 'כ־100 תושבים נרצחו ועשרות נחטפו — כמעט עשירית מהקיבוץ.' },
  { n: 'כפר עזה', d: 'עשרות תושבים נרצחו, רבים מהם בשכונת הצעירים.' },
  { n: 'ניר עוז', d: 'כרבע מהתושבים נרצחו או נחטפו.' },
  { n: 'נובה', d: 'יותר מ־360 צעירים נרצחו במסיבה.' },
  { n: 'שדרות', d: 'מחבלים השתלטו על תחנת המשטרה ורצחו ברחובות.' },
  { n: 'אופקים', d: 'מחבלים חדרו לעיר — כ־25 קילומטר מהגבול.' },
  { n: 'נחל עוז', d: 'מוצב שהותקף; לוחמים ותצפיתניות נהרגו ונחטפו.' },
  { n: 'ועוד', d: 'כיסופים, נתיב העשרה, ניר יצחק, חולית, עין השלושה, זיקים, יכיני ועוד.' },
]

const HOSTAGE_STEPS = [
  { d: 'נובמבר 2023', h: 'העסקה הראשונה', p: '105 חטופים — רובם נשים, ילדים ועובדים זרים — שוחררו בהפסקת אש של שבוע.' },
  { d: '2024', h: 'מבצעי חילוץ', p: 'צה״ל חילץ חטופים במבצעים נועזים, כמו מבצע ארנון ביוני 2024 שבו חולצו ארבעה מנוסייראת.' },
  { d: 'ינואר–מרץ 2025', h: 'העסקה השנייה', p: 'חטופים חיים וחללים הוחזרו בשלבים במסגרת הפסקת אש.' },
  { d: 'אוקטובר 2025', h: 'כולם הביתה', p: '20 החטופים החיים האחרונים שוחררו במסגרת הסכם הפסקת האש, וגופות החללים הוחזרו בהדרגה לאחר מכן.' },
]

export default function Oct7() {
  useReveal()
  return (
    <div className="memorial">
      <header className="page-hero" style={{ paddingBottom: 64 }}>
        <div className="grid-bg" />
        <div className="glow c" style={{ opacity: .12 }} />
        <div className="container">
          <span className="eyebrow"><span className="candle" aria-hidden /> 7.10.2023 · שמחת תורה</span>
          <h1>היום שבו העולם היה צריך להבין.</h1>
          <p className="lead">בעמוד הזה אין בדיחות. יש עובדות — כדי לזכור, וכדי שאף אחד לא יוכל להכחיש.</p>
        </div>
      </header>

      <section className="section-tight">
        <div className="container">
          <div className="o7-stats reveal">
            <div><div className="n">~<CountUp to={1200} /></div><div className="t">נרצחו — רובם אזרחים</div></div>
            <div><div className="n"><CountUp to={251} /></div><div className="t">נחטפו לעזה</div></div>
            <div><div className="n">~<CountUp to={3000} /></div><div className="t">מחבלים חדרו לישראל (הערכה)</div></div>
            <div><div className="n">#1</div><div className="t">היום הקטלני ביותר ליהודים מאז השואה</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 940 }}>
          <div className="section-head reveal">
            <span className="eyebrow">🕰️ שעה אחר שעה</span>
            <h2>מה קרה</h2>
            <p>הזמנים המדויקים משתנים בין מקורות ובין יישובים. זה הקו הכללי, כפי שתועד בתחקירים ובעדויות.</p>
          </div>
          <div className="hours">
            {HOURS.map((h) => (
              <div key={h.title} className="hour reveal">
                <div className="t">{h.t}</div>
                <div><h3>{h.title}</h3><p>{h.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">📍 המקומות</span>
            <h2>שמות שלא נשכח</h2>
          </div>
          <div className="places">
            {PLACES.map((p) => (
              <div key={p.n} className="place reveal"><h4><span className="candle" style={{ width: 7, height: 12 }} />{p.n}</h4><p>{p.d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow"><span className="yellow-ribbon" aria-hidden /> החטופים</span>
            <h2>251 בני אדם. מסע של שנתיים.</h2>
            <p>תינוקות, ילדים, נשים, קשישים, חיילים ועובדים זרים מתאילנד, נפאל ומדינות נוספות. רבים נרצחו בשבי.</p>
          </div>
          <div className="h-steps">
            {HOSTAGE_STEPS.map((s) => (
              <div key={s.d} className="h-step reveal"><div className="d">{s.d}</div><h4>{s.h}</h4><p>{s.p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="grid-2">
            <div className="dark-card reveal">
              <h3>✅ מה מתועד היטב</h3>
              <ul>
                <li>רצח מכוון של אזרחים בבתיהם, ברחובות ובמסיבה.</li>
                <li>חטיפת 251 בני אדם, כולל תינוקות וקשישים.</li>
                <li>שריפת בתים כשמשפחות בתוכם.</li>
                <li>מצלמות הגוף והטלפונים של המחבלים עצמם תיעדו חלק מהמעשים.</li>
                <li>ממצאי נציגת האו״ם לאלימות מינית בסכסוכים (מרץ 2024): ״יסוד סביר להאמין״ שהתרחשה אלימות מינית, כולל אונס.</li>
              </ul>
            </div>
            <div className="dark-card reveal">
              <h3>🤝 מה עדיין נחקר</h3>
              <ul>
                <li>התרעות מודיעיניות שהתקבלו לפני הטבח ולמה לא טופלו — צה״ל פרסם תחקירים שהודו בכישלון.</li>
                <li>אירועים ספציפיים בבארי ובמקומות נוספים, כולל אש של כוחותינו בקרבות.</li>
                <li>חלק מהדיווחים המוקדמים תוקנו עם הזמן — וזה בדיוק למה חשוב להסתמך על תחקירים מאומתים.</li>
              </ul>
              <div style={{ marginTop: 14 }}><StatusBadge status="developing" /></div>
            </div>
          </div>
          <div style={{ marginTop: 24 }} className="reveal">
            <SourceLinks sources={[SRC.oct7, SRC.hostages, SRC.idf]} />
          </div>
          <div style={{ marginTop: 40, textAlign: 'center' }} className="reveal">
            <Link to="/myths#vacuum" className="btn btn-gold">״זה לא קרה בחלל ריק״? כך עונים ←</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
