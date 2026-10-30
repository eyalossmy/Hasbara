import type { Article } from '../article'
import { SRC, src, wiki } from '../sources'

export const ACHIEVEMENTS: Article = {
  eyebrow: 'ההישגים',
  title: 'מביצות למדינת הייטק.',
  lead: 'מדינה קטנה מניו ג׳רזי, בלי נפט ועם מעט מים, תחת איום מתמיד — ומה היא נתנה לעולם.',
  blocks: [
    {
      type: 'stats',
      items: [
        { n: '806,000', t: 'תושבים בהקמת המדינה, 1948' },
        { n: '~10,000,000', t: 'תושבים היום' },
        { n: '13', t: 'זוכי פרס נובל ישראלים' },
        { n: '#1', t: 'בעולם במחזור מי שפכים לחקלאות' },
      ],
      sources: [SRC.cbs, wiki('en', 'List of Israeli Nobel laureates'), wiki('en', 'Water supply and sanitation in Israel')],
    },
    {
      type: 'cards',
      head: { eyebrow: 'לבנות עם מאפס', title: 'מדינה שנבנתה מכלום', text: 'עם שחזר מ־100 ארצות, דיבר עשרות שפות והגיע בלי כלום — והפך תוך דור אחד לחברה מתפקדת.' },
      items: [
        { k: '1881–1922', title: 'שפה שקמה לתחייה', text: 'עברית לא הייתה שפת דיבור כמעט 2,000 שנה. אליעזר בן־יהודה ואחרים החיו אותה — המקרה המוצלח היחיד בהיסטוריה של שפה שחזרה לשמש שפת אם.', status: 'verified', sources: [wiki('en', 'Revival of the Hebrew language')] },
        { k: '1948–1951', title: 'האוכלוסייה הוכפלה בשלוש שנים', text: 'ניצולי שואה ופליטים ממדינות ערב הגיעו בגלים. ישראל, מדינה ענייה במלחמה, קלטה את כולם — במעברות, באוהלים, ואחר כך בערים חדשות.', status: 'verified', sources: [SRC.jewishExodus, wiki('en', 'Ma\'abarot')] },
        { k: '1984 · 1991', title: 'מבצעי משה ושלמה', text: 'ישראל הטיסה אלפי יהודים מאתיופיה. במבצע שלמה הוטסו כ־14,000 איש ב־36 שעות.', status: 'verified', sources: [wiki('en', 'Operation Solomon')] },
        { k: '1990s', title: 'מיליון עולים מברית המועצות', text: 'תוך עשור הגיעו כמיליון עולים — כ־20% מהאוכלוסייה. ביניהם אלפי מדענים, מהנדסים ורופאים.', status: 'verified', sources: [wiki('en', '1990s post-Soviet aliyah')] },
        { title: 'הפרחת השממה', text: 'ייבוש ביצות החולה ועמק יזרעאל, ונטיעת מאות מיליוני עצים. ישראל היא אחת המדינות היחידות שנכנסו למאה ה־21 עם **יותר** עצים משהיו לה בתחילת המאה ה־20.', status: 'claim', sources: [wiki('en', 'Jewish National Fund'), wiki('en', 'Yatir Forest')] },
      ],
    },
    {
      type: 'cards',
      head: { eyebrow: 'מים ואוכל', title: 'איך מגדלים במדבר' },
      items: [
        { k: '1965', title: 'השקיה בטפטוף', text: 'שמחה בלאס וקיבוץ חצרים הקימו את נטפים. הטפטפת חוסכת עד מחצית מהמים — וחקלאים בכל העולם משתמשים בה היום.', status: 'verified', sources: [wiki('en', 'Netafim'), wiki('en', 'Drip irrigation')] },
        { k: '1970s–1980s', title: 'עגבניות שרי', text: 'עגבניות קטנות היו קיימות קודם. החוקרים נחום קדר וחיים רבינוביץ׳ פיתחו זנים שמחזיקים הרבה יותר זמן ומתאימים לשיווק — וכך הפכו את השרי ללהיט עולמי.', status: 'disputed', sources: [wiki('en', 'Cherry tomato')] },
        { k: '2005–היום', title: 'התפלה', text: 'מתקני התפלה לאורך החוף מספקים את רוב מי השתייה של ישראל. מדינה שסבלה מבצורת קבועה הפכה לבעלת עודף מים.', status: 'verified', sources: [wiki('en', 'Water supply and sanitation in Israel'), wiki('en', 'Sorek desalination plant')] },
        { title: 'מחזור מים', text: 'כ־90% ממי השפכים בישראל מטוהרים ומשמשים להשקיה — הרבה יותר מכל מדינה אחרת בעולם.', status: 'verified', sources: [wiki('en', 'Water supply and sanitation in Israel')] },
      ],
    },
    {
      type: 'cards',
      head: { eyebrow: 'הייטק', title: 'יש סיכוי שיש לכם את זה בכיס', text: 'ישראל מכונה ״אומת הסטארט־אפ״ — יותר חברות הזנק לנפש מכמעט כל מדינה אחרת.' },
      items: [
        { k: '2006', title: 'Waze', text: 'אפליקציית הניווט שנולדה בישראל ונמכרה לגוגל ב־2013 בכמיליארד דולר. מאות מיליוני משתמשים בעולם.', status: 'verified', sources: [wiki('en', 'Waze')] },
        { k: '1999', title: 'Mobileye', text: 'מערכות ראייה ממוחשבת למכוניות, שמונעות תאונות ומובילות לנהיגה אוטונומית. אינטל קנתה אותה ב־2017 ב־15.3 מיליארד דולר.', status: 'verified', sources: [wiki('en', 'Mobileye')] },
        { k: '1996', title: 'ICQ', text: 'תוכנת המסרים המיידיים הראשונה לקהל הרחב — נכתבה בידי ארבעה צעירים ישראלים.', status: 'verified', sources: [wiki('en', 'ICQ')] },
        { k: '1993', title: 'חומת האש', text: 'צ׳ק פוינט פיתחה את אחד מחומות האש המסחריות הראשונות. ישראל היא עד היום מעצמת סייבר.', status: 'verified', sources: [wiki('en', 'Check Point')] },
        { k: '2000', title: 'הדיסק־און־קי', text: 'M-Systems הישראלית הייתה מהראשונות שפיתחו ומכרו כונן USB נייד. יש עוד חברות שטוענות לראשוניות.', status: 'disputed', sources: [wiki('en', 'USB flash drive')] },
        { k: '2001', title: 'הגלולה המצלמת', text: 'PillCam של גיוון אימג׳ינג: מצלמה בגודל גלולה שבולעים, ומצלמת את מערכת העיכול מבפנים.', status: 'verified', sources: [wiki('en', 'Capsule endoscopy')] },
        { title: 'תרופות', text: 'קופקסון לטרשת נפוצה פותחה במכון ויצמן. אקסלון לאלצהיימר פותחה באוניברסיטה העברית. טבע הייתה יצרנית התרופות הגנריות הגדולה בעולם.', status: 'verified', sources: [wiki('en', 'Glatiramer acetate'), wiki('en', 'Rivastigmine'), wiki('en', 'Teva Pharmaceuticals')] },
        { title: 'אינטל ישראל', text: 'מעבדים מרכזיים של אינטל — כמו Centrino ו־Core — תוכננו בחיפה.', status: 'verified', sources: [wiki('en', 'Intel Israel')] },
      ],
    },
    {
      type: 'cards',
      head: { eyebrow: 'התנדבות', title: 'הראשונים להגיע', text: 'ישראל שולחת עזרה גם למדינות שאין לה איתן יחסים.' },
      items: [
        { k: '2010', title: 'רעידת האדמה בהאיטי', text: 'צה״ל הקים בית חולים שדה מהראשונים שפעלו במקום, וביצע ניתוחים ולידות כבר בימים הראשונים.', status: 'verified', sources: [wiki('en', 'Humanitarian response to the 2010 Haiti earthquake')] },
        { k: '2023', title: 'רעידת האדמה בטורקיה', text: 'משלחת חילוץ של פיקוד העורף חילצה ניצולים מההריסות, ובית חולים שדה טיפל באלפים — חודשים אחרי שיחסי ישראל–טורקיה היו בשפל.', status: 'verified', sources: [wiki('en', 'Humanitarian response to the 2023 Turkey–Syria earthquakes')] },
        { k: '2001–היום', title: 'IsraAID', text: 'ארגון סיוע ישראלי שפעל ביותר מ־60 מדינות: אסונות טבע, פליטים, מים ושיקום.', status: 'verified', sources: [wiki('en', 'IsraAID'), src('IsraAID', 'https://www.israaid.org/')] },
        { k: '1995–היום', title: 'הצילו את ליבו של ילד', text: 'רופאים ישראלים ניתחו בחינם אלפי ילדים עם מומי לב מעשרות מדינות — כולל ילדים רבים מהרשות הפלסטינית ומעזה.', status: 'verified', sources: [wiki('en', 'Save a Child\'s Heart')] },
        { title: 'איחוד הצלה וזק״א', text: 'אלפי מתנדבים אזרחיים — דתיים, חילונים, יהודים וערבים — שמגיעים לכל אירוע תוך דקות. המודל הועתק לערים בעולם.', status: 'verified', sources: [wiki('en', 'United Hatzalah')] },
      ],
    },
    {
      type: 'cards',
      head: { eyebrow: 'תעשייה ביטחונית', title: 'הגנה שהעולם קונה', text: 'מדינה שהותקפה מכל עבר פיתחה כמה ממערכות ההגנה המתקדמות בעולם.' },
      items: [
        { k: '2011', title: 'כיפת ברזל', text: 'מערכת שמיירטת רקטות לטווח קצר. יירטה אלפי רקטות שנורו על ערים ישראליות — והצילה חיים משני צדי הגבול, כי ישראל לא נאלצה להגיב בכל פעם.', status: 'verified', sources: [wiki('en', 'Iron Dome')] },
        { k: '2017', title: 'חץ 3', text: 'מיירט טילים בליסטיים מחוץ לאטמוספרה. גרמניה רכשה אותו ב־2023 — העסקה הביטחונית הגדולה בתולדות ישראל.', status: 'verified', sources: [wiki('en', 'Arrow 3')] },
        { k: '1970s–היום', title: 'מל״טים', text: 'ישראל הייתה מהחלוצות של הכטב״מים המודרניים. צבא ארה״ב השתמש במל״ט ישראלי במלחמת המפרץ.', status: 'verified', sources: [wiki('en', 'IAI Scout'), wiki('en', 'AAI RQ-2 Pioneer')] },
        { title: 'מעיל רוח', text: 'מערכת הגנה אקטיבית לטנקים שמיירטת טילים נגד־טנקים. צבא ארה״ב התקין אותה על טנקי אברמס.', status: 'verified', sources: [wiki('en', 'Trophy (countermeasure)')] },
        { k: '2025', title: 'אור איתן', text: 'מערכת יירוט בלייזר — מהראשונות בעולם שנכנסו לשירות מבצעי. עלות יירוט: דולרים בודדים, במקום עשרות אלפי דולרים לטיל מיירט.', status: 'developing', sources: [wiki('en', 'Iron Beam')] },
      ],
    },
    {
      type: 'honest',
      title: 'בכנות',
      text: 'ההישגים לא מוכיחים שמדיניות מסוימת צודקת, וגם לא מבטלים ביקורת. הם מוכיחים משהו אחר: שהעם הזה בנה כאן חיים — לא רק לעצמו. כשמישהו אומר ״ישראל היא רק כיבוש״, שאלו אותו על איזה טלפון הוא כותב את זה.',
    },
  ],
  think: [
    'מה ההבדל בין ״המצאה ישראלית״ לבין ״פיתוח ישראלי שהפך משהו קיים להצלחה״? (רמז: עגבניות שרי)',
    'למה מדינה שנאלצת להשקיע כל כך הרבה בביטחון מצליחה גם בחדשנות אזרחית?',
    'האם מי שקורא לחרם על ישראל מוכן לוותר גם על Waze, על המעבד במחשב ועל הטפטפות שמאכילות את העולם?',
  ],
  next: [{ to: '/timeline', label: 'להיסטוריה של ישראל' }, { to: '/israel', label: 'חזרה למי היא ישראל?' }],
}
