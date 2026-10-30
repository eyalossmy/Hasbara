import { Link } from 'react-router-dom'
import { SRC } from '../data/sources'
import type { PicKey } from '../data/images'
import Pic from '../components/Pic'
import Scale from '../components/Scale'
import { Videos } from '../components/Video'
import { VIDEOS } from '../data/videos'
import { I } from '../data/intl'

const GALLERY: { k: PicKey; cap: string }[] = [
  { k: 'o7Beeri1', cap: 'בארי, ימים אחרי הטבח' },
  { k: 'o7Gpo02', cap: 'בית שרוף בעוטף, אוקטובר 2023' },
  { k: 'o7NirOz', cap: 'ניר עוז, ״השבת השחורה״' },
  { k: 'o7Gpo05', cap: 'סימני ירי על קיר בית בעוטף' },
  { k: 'o7Cars', cap: 'קיר המכוניות בתקומה: רכבים מהמסיבה ומהכבישים' },
  { k: 'o7Sderot', cap: 'פגיעות ירי במקלט ליד תחנת המשטרה בשדרות' },
]
import { CountUp, SourceLinks, Split, StatusBadge, useReveal } from '../components/ui'

const HOURS = [
  { t: '06:29', title: 'מטח הרקטות', text: 'חמאס פותח במטח מסיבי על דרום ומרכז ישראל. לפי צה״ל, כ־3,000 רקטות בשעות הראשונות. שבת, שמחת תורה, ואזעקות בכל הארץ.' },
  { t: '06:30+', title: 'פריצת הגדר', text: 'אלפי מחבלים פורצים את גדר הגבול בעשרות נקודות, ברגל, בטנדרים, באופנועים ובמצנחי רחיפה. חלק מהמצלמות ועמדות התצפית מושבתות ברחפנים.' },
  { t: 'בוקר', title: 'מסיבת נובה', text: 'מחבלים מגיעים למסיבה ליד רעים. יותר מ־360 צעירים נרצחים, הטבח הגדול ביותר באותו יום, ורבים נחטפים.' },
  { t: 'בוקר–צהריים', title: 'הקיבוצים והעיירות', text: 'בארי, כפר עזה, ניר עוז, נחל עוז, כיסופים, נתיב העשרה, שדרות, אופקים ועוד. משפחות נרצחות בבתיהן, בתים נשרפים, ילדים וקשישים נחטפים.' },
  { t: 'כל היום', title: 'הלוחמים הראשונים', text: 'כיתות כוננות, שוטרים, חיילים ואזרחים נלחמים לבדם שעות ארוכות עד הגעת כוחות. רבים נופלים בקרב.' },
  { t: 'ימים הבאים', title: 'השבת השליטה', text: 'לוקח ימים לטהר את כל היישובים. ישראל מגייסת כ־360,000 מילואימניקים, הגיוס הגדול בתולדותיה, ויוצאת למלחמה.' },
]

const PLACES = [
  { n: 'בארי', img: 'beeri' as PicKey, d: 'כ־100 תושבים נרצחו ועשרות נחטפו, כמעט עשירית מהקיבוץ.' },
  { n: 'כפר עזה', img: 'kfarAza' as PicKey, d: 'עשרות תושבים נרצחו, רבים מהם בשכונת הצעירים.' },
  { n: 'ניר עוז', img: 'nirOz' as PicKey, d: 'כרבע מהתושבים נרצחו או נחטפו.' },
  { n: 'נובה', img: 'nova' as PicKey, d: 'יותר מ־360 צעירים נרצחו במסיבה.' },
  { n: 'שדרות', d: 'מחבלים השתלטו על תחנת המשטרה ורצחו ברחובות.' },
  { n: 'אופקים', d: 'מחבלים חדרו לעיר, כ־25 קילומטר מהגבול.' },
  { n: 'נחל עוז', d: 'מוצב שהותקף; לוחמים ותצפיתניות נהרגו ונחטפו.' },
  { n: 'ועוד', d: 'כיסופים, נתיב העשרה, ניר יצחק, חולית, עין השלושה, זיקים, יכיני ועוד.' },
]

const HOSTAGE_STEPS = [
  { d: 'נובמבר 2023', h: 'העסקה הראשונה', p: '105 חטופים, רובם נשים, ילדים ועובדים זרים, שוחררו בהפסקת אש של שבוע.' },
  { d: '2024', h: 'מבצעי חילוץ', p: 'צה״ל חילץ חטופים במבצעים נועזים, כמו מבצע ארנון ביוני 2024 שבו חולצו ארבעה מנוסייראת.' },
  { d: 'ינואר–מרץ 2025', h: 'העסקה השנייה', p: 'חטופים חיים וחללים הוחזרו בשלבים במסגרת הפסקת אש.' },
  { d: 'אוקטובר 2025', h: 'כולם הביתה', p: '20 החטופים החיים האחרונים שוחררו. גופות החללים הוחזרו בהדרגה, האחרונה, של רן גבילי, בינואר 2026.' },
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
          <h1><Split text="היום שבו העולם היה צריך להבין." /></h1>
          <p className="lead fade-up">עובדות, כדי לזכור, וכדי שאיש לא יוכל להכחיש.</p>
        </div>
      </header>

      <section className="section-tight">
        <div className="container">
          <div className="o7-stats reveal">
            <div><div className="n">~<CountUp to={1200} /></div><div className="t">נרצחו, רובם אזרחים</div></div>
            <div><div className="n"><CountUp to={251} /></div><div className="t">נחטפו לעזה</div></div>
            <div><div className="n">~<CountUp to={3000} /></div><div className="t">מחבלים חדרו לישראל (הערכה)</div></div>
            <div><div className="n">#1</div><div className="t">היום הקטלני ביותר ליהודים מאז השואה</div></div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">תיעוד</span>
            <h2>כך זה נראה</h2>
            <p>תמונות אמיתיות מהיישובים, ימים אחרי הטבח. חלקן קשות לצפייה, ולכן הן מוסתרות עד שתלחצו. מי שמכחיש את 7 באוקטובר צריך לראות אותן.</p>
          </div>
          <div className="photo-grid">
            {GALLERY.map((g) => <div key={g.k} className="reveal"><Pic k={g.k} alt={g.cap} /><p className="photo-cap">{g.cap}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container"><Scale /></div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 940 }}>
          <div className="section-head reveal">
            <span className="eyebrow">שעה אחר שעה</span>
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
            <span className="eyebrow">המקומות</span>
            <h2>שמות שלא נשכח</h2>
          </div>
          <div className="places">
            {PLACES.map((p) => (
              <div key={p.n} className="place reveal">{'img' in p && p.img && <Pic k={p.img} alt={p.n} />}<h4><span className="candle" style={{ width: 7, height: 12 }} />{p.n}</h4><p>{p.d}</p></div>
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
          <div className="reveal" style={{ maxWidth: 720, marginBottom: 40 }}><Pic k="hostagesSquare" alt="כיכר החטופים בתל אביב" /></div>
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
              <h3>מה מתועד היטב</h3>
              <ul>
                <li>רצח מכוון של אזרחים בבתיהם, ברחובות ובמסיבה.</li>
                <li>חטיפת 251 בני אדם, כולל תינוקות וקשישים.</li>
                <li>שריפת בתים כשמשפחות בתוכם.</li>
                <li>מצלמות הגוף והטלפונים של המחבלים עצמם תיעדו חלק מהמעשים.</li>
                <li>ממצאי נציגת האו״ם לאלימות מינית בסכסוכים (מרץ 2024): ״יסוד סביר להאמין״ שהתרחשה אלימות מינית, כולל אונס.</li>
              </ul>
            </div>
            <div className="dark-card reveal">
              <h3>מה עדיין נחקר</h3>
              <ul>
                <li>התרעות מודיעיניות שהתקבלו לפני הטבח ולמה לא טופלו, צה״ל פרסם תחקירים שהודו בכישלון.</li>
                <li>אירועים ספציפיים בבארי ובמקומות נוספים, כולל אש של כוחותינו בקרבות.</li>
                <li>חלק מהדיווחים המוקדמים תוקנו עם הזמן, וזה בדיוק למה חשוב להסתמך על תחקירים מאומתים.</li>
              </ul>
              <div style={{ marginTop: 14 }}><StatusBadge status="developing" /></div>
            </div>
          </div>
          <div style={{ marginTop: 24 }} className="reveal">
            <SourceLinks sources={[SRC.oct7, SRC.hostages, SRC.idf, I.britOct7, I.nprNova, I.cnnNova, I.cnnHostages, I.cnnHostagesDied, I.pcpsr90]} />
          </div>
          <div className="analysis reveal" style={{ marginTop: 40 }}>
            <span className="think-k">פרשנות</span>
            <h3>״זה לא קרה בחלל ריק״</h3>
            <div className="an-cols">
              <div><h4>מה אומרים המבקרים</h4><p>הטבח היה תגובה לעשרות שנות כיבוש ומצור, ולכן צריך להבין אותו בהקשר. מזכ״ל האו״ם אמר את המשפט הזה במפורש.</p></div>
              <div><h4>איך אנחנו קוראים את זה</h4><p>להקשר יש מקום בניתוח מלחמות, לא בהצדקת רצח של תינוקות במיטתם. ישראל יצאה מעזה ב־2005. המטרה של 7 באוקטובר הייתה אזרחים: מסיבה, בתים, קיבוצים. ולפי סקר פלסטיני מדצמבר 2023, כ־72% אמרו שההחלטה לתקוף הייתה ״נכונה״.</p></div>
              <div><h4>מה עדיין פתוח</h4><p>אותו סקר מצא שרק 7% האמינו שחמאס ביצע זוועות, כלומר רבים תמכו במתקפה בלי להכיר את מה שקרה בה. השאלה הפתוחה היא מה הם רואים, ולא רק מה הם חושבים.</p></div>
            </div>
            <SourceLinks sources={[I.pcpsr90, I.arabNewsPoll, I.britOct7]} />
          </div>
          <div style={{ marginTop: 40, textAlign: 'center' }} className="reveal">
            <Link to="/myths#vacuum" className="btn btn-primary">״זה לא קרה בחלל ריק״? כך עונים</Link>
          </div>
        </div>
      </section>
      <Videos list={VIDEOS.oct7} title="עדויות וסרטים" />
    </div>
  )
}
