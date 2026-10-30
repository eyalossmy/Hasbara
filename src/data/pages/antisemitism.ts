import type { Article } from '../article'
import { SRC, src, wiki } from '../sources'

const ADL = src('ADL: Audit of Antisemitic Incidents', 'https://www.adl.org/resources/report/audit-antisemitic-incidents-2024')
const CST = src('CST: Antisemitic Incidents Report (בריטניה)', 'https://cst.org.uk/research/cst-publications')
const FBI = src('FBI: Hate Crime Statistics', 'https://cde.ucr.cjis.gov/LATEST/webapp/#/pages/explorer/crime/hate-crime')

export const ANTISEMITISM: Article = {
  eyebrow: 'אנטישמיות',
  title: 'השנאה העתיקה בעולם.',
  lead: 'היא משנה צורה כל כמה מאות שנים, דת, גזע, ועכשיו ״אנטי־ציונות״. כך מזהים אותה.',
  blocks: [
    {
      type: 'cards',
      head: { eyebrow: 'הגדרה', title: 'מה זה בדיוק', text: 'ההגדרה המקובלת בעולם היא של IHRA, הברית הבינלאומית לזיכרון השואה. עשרות מדינות אימצו אותה.' },
      items: [
        { title: 'ההגדרה', img: 'ihra', text: 'אנטישמיות היא ״תפיסה מסוימת של יהודים, שעשויה להתבטא כשנאה כלפי יהודים״, במילים, במעשים ובמוסדות.', status: 'verified', sources: [SRC.ihra] },
        { title: 'מבחן ה־3D', img: 'sharansky', text: 'נתן שרנסקי הציע שלושה סימנים לביקורת על ישראל שחצתה את הקו: **דמוניזציה**, **דה־לגיטימציה** ו**סטנדרט כפול**.', status: 'claim', sources: [wiki('en', '3D test of antisemitism')] },
        { title: 'ביקורת מותרת', text: 'גם IHRA אומרת במפורש: ביקורת על ישראל שדומה לביקורת על כל מדינה אחרת **אינה** אנטישמיות. ישראלים מבקרים את ממשלתם כל יום.', status: 'verified', sources: [SRC.ihra] },
      ],
    },
    {
      type: 'steps',
      head: { eyebrow: '2,000 שנה', title: 'אותה שנאה, בגדים חדשים' },
      items: [
        { k: '1096', title: 'מסעי הצלב', img: 'rhineland', text: 'בדרך לירושלים, הצלבנים טובחים בקהילות היהודיות של ריינלנד, וורמס, מגנצא ושפייר. אלפים נרצחו.', status: 'verified', sources: [wiki('en', 'Rhineland massacres')] },
        { k: '1144', title: 'עלילת הדם', img: 'bloodLibel', text: 'בנוריץ׳ שבאנגליה מאשימים לראשונה יהודים ברצח ילד נוצרי לצורכי פולחן. העלילה מתפשטת באירופה ומובילה לטבח במשך מאות שנים.', status: 'verified', sources: [wiki('en', 'Blood libel')] },
        { k: '1290 · 1492', title: 'גירושים', img: 'alhambra', text: 'יהודים מגורשים מאנגליה (1290), מצרפת (1306) ומספרד (1492). מי שנשאר בספרד נאלץ להתנצר.', status: 'verified', sources: [wiki('en', 'Alhambra Decree'), wiki('en', 'Edict of Expulsion')] },
        { k: '1894', title: 'פרשת דרייפוס', img: 'dreyfus', text: 'קצין יהודי בצרפת מואשם בבגידה על לא עוול. העיתונאי תאודור הרצל רואה את ההמון צועק ״מוות ליהודים״, ומסיק שהיהודים צריכים מדינה.', status: 'verified', sources: [wiki('en', 'Dreyfus affair')] },
        { k: '1903', title: 'פרוטוקולי זקני ציון', img: 'protocols', text: 'זיוף של המשטרה החשאית הרוסית שמתאר ״קנוניה יהודית לשלוט בעולם״. הוא נמכר עד היום, ומצוטט באמנת חמאס.', status: 'verified', sources: [wiki('en', 'The Protocols of the Elders of Zion'), SRC.hamasCharter] },
        { k: '1941', title: 'הפרהוד בבגדאד', img: 'farhud', text: 'פוגרום ביהודי עיראק: כ־180 יהודים נרצחו. תוך עשור כמעט כל יהודי עיראק, קהילה בת 2,600 שנה, עזבו.', status: 'verified', sources: [wiki('en', 'Farhud')] },
        { k: '1941–1945', title: 'השואה', img: 'auschwitz', text: 'שישה מיליון יהודים נרצחו.', status: 'verified', sources: [src('יד ושם', 'https://www.yadvashem.org/holocaust/about.html')] },
        { k: '1948–1970', title: 'גירוש מארצות האסלאם', text: 'כ־850,000 יהודים עוזבים או מגורשים ממדינות ערב ואיראן, אחרי פרעות, החרמת רכוש ושלילת אזרחות.', status: 'verified', sources: [SRC.jewishExodus] },
      ],
    },
    {
      type: 'stats',
      items: [
        { n: '9,354', t: 'תקריות אנטישמיות בארה״ב ב־2024, שיא מאז החלה הספירה ב־1979' },
        { n: '~2%', t: 'מאוכלוסיית ארה״ב יהודים, אבל הם יעד לרוב פשעי השנאה על רקע דתי' },
        { n: 'שיא', t: 'גם בבריטניה, צרפת, גרמניה ואוסטרליה, בשנה שאחרי 7 באוקטובר' },
      ],
      sources: [ADL, FBI, CST],
    },
    {
      type: 'cards',
      head: { eyebrow: 'דם', title: 'זה לא נשאר במילים', text: 'חלק מהפיגועים נגד יהודים מחוץ לישראל בעשורים האחרונים.' },
      items: [
        { k: 'בואנוס איירס · 1994', title: 'פיגוע בניין אמי״א', img: 'amia', text: 'מכונית תופת בבניין הקהילה היהודית. 85 נרצחו. התביעה בארגנטינה האשימה את איראן וחיזבאללה.', status: 'verified', sources: [wiki('en', 'AMIA bombing')] },
        { k: 'טולוז · 2012', title: 'בית הספר אוצר התורה', text: 'מחבל ג׳יהאדיסט רוצח מורה ושלושה ילדים בכניסה לבית ספר יהודי.', status: 'verified', sources: [wiki('en', 'Toulouse and Montauban shootings')] },
        { k: 'פריז · 2015', title: 'היפר כשר', img: 'hyper', text: 'מחבל מחזיק בני ערובה בסופרמרקט כשר ורוצח ארבעה יהודים.', status: 'verified', sources: [wiki('en', 'Hypercacher kosher supermarket siege')] },
        { k: 'פיטסבורג · 2018', title: 'בית הכנסת ״עץ החיים״', img: 'pittsburgh', text: 'קיצוני ימני רוצח 11 מתפללים בשבת, הפיגוע האנטישמי הקטלני בתולדות ארה״ב.', status: 'verified', sources: [wiki('en', 'Pittsburgh synagogue shooting')] },
        { k: 'וושינגטון · 2025', title: 'מחוץ למוזיאון היהודי', img: 'capitalMuseum', text: 'שני עובדי שגרירות ישראל, ירון לישינסקי ושרה מילגרים, נרצחו בירי. היורה צעק ״Free Palestine״.', status: 'verified', sources: [wiki('en', '2025 Capital Jewish Museum shooting')] },
        { k: 'מנצ׳סטר · 2025', title: 'יום כיפור', img: 'manchester', text: 'מחבל תוקף את בית הכנסת ״היטון פארק״ ביום הכיפורים. שני מתפללים נרצחו.', status: 'verified', sources: [wiki('en', 'Manchester synagogue attack')] },
      ],
    },
    {
      type: 'honest',
      title: 'בכנות',
      text: 'לא כל מי שמבקר את ישראל הוא אנטישמי, ולא כדאי לומר את זה על כל מבקר, זה מחליש את הטענה כשהיא באמת נכונה. השאלה היא אם יש סטנדרט כפול, אם המדינה היחידה שנשללת זכותה להתקיים היא היהודית, ואם ״ציונים״ הוא בעצם קוד ל״יהודים״.',
    },
  ],
  think: [
    'האם הביקורת הזו הייתה נשמעת על כל מדינה אחרת באותו מצב?',
    'כשמישהו אומר ״ציונים שולטים בתקשורת״, במה זה שונה מהפרוטוקולים של 1903?',
    'למה יהודים בלונדון, בפריז או בסידני צריכים ״לענות״ על מה שממשלת ישראל עושה?',
  ],
  next: [{ to: '/holocaust', label: 'לשואה' }, { to: '/glossary', label: 'למילון' }],
}
