import type { Article } from '../article'
import { I } from '../intl'
import { VIDEOS } from '../videos'
import { SRC, src, wiki } from '../sources'

export const ACHIEVEMENTS: Article = {
  eyebrow: 'ההישגים',
  title: 'מביצות למדינת הייטק.',
  lead: 'מדינה קטנה מניו ג׳רזי, בלי נפט ועם מעט מים, תחת איום מתמיד, ומה היא נתנה לעולם.',
  blocks: [
    {
      type: 'stats',
      items: [
        { n: '806,000', t: 'תושבים בהקמת המדינה, 1948' },
        { n: '~10,000,000', t: 'תושבים היום' },
        { n: '13', t: 'זוכי פרס נובל ישראלים' },
        { n: '#1', t: 'בעולם במחזור מי שפכים לחקלאות' },
      ],
      sources: [SRC.cbs, wiki('en', 'List of Israeli Nobel laureates'), I.britIsraelHistory, I.nprRecycled],
    },
    {
      type: 'cards',
      head: { eyebrow: 'לבנות עם מאפס', title: 'מדינה שנבנתה מכלום', text: 'עם שחזר מ־100 ארצות, דיבר עשרות שפות והגיע בלי כלום, והפך תוך דור אחד לחברה מתפקדת.' },
      items: [
        { k: '1881–1922', title: 'שפה שקמה לתחייה', img: 'benYehuda', text: 'עברית לא הייתה שפת דיבור כמעט 2,000 שנה. אליעזר בן־יהודה ואחרים החיו אותה, המקרה המוצלח היחיד בהיסטוריה של שפה שחזרה לשמש שפת אם.', status: 'verified', sources: [wiki('en', 'Revival of the Hebrew language'), I.britHebrew] },
        { k: '1948–1951', title: 'האוכלוסייה הוכפלה בשלוש שנים', img: 'maabarot', text: 'ניצולי שואה ופליטים ממדינות ערב הגיעו בגלים. ישראל, מדינה ענייה במלחמה, קלטה את כולם, במעברות, באוהלים, ואחר כך בערים חדשות.', status: 'verified', sources: [SRC.jewishExodus, wiki('en', 'Ma\'abarot'), I.britAliyah] },
        { k: '1984 · 1991', title: 'מבצעי משה ושלמה', img: 'solomon', text: 'ישראל הטיסה אלפי יהודים מאתיופיה. במבצע שלמה הוטסו כ־14,000 איש ב־36 שעות.', status: 'verified', sources: [wiki('en', 'Operation Solomon'), I.britBetaIsrael] },
        { k: '1990s', title: 'מיליון עולים מברית המועצות', text: 'תוך עשור הגיעו כמיליון עולים, כ־20% מהאוכלוסייה. ביניהם אלפי מדענים, מהנדסים ורופאים.', status: 'verified', sources: [wiki('en', '1990s post-Soviet aliyah'), I.britAliyah, I.britIsraelHistory] },
        { title: 'הפרחת השממה', img: 'yatir', text: 'ייבוש ביצות החולה ועמק יזרעאל, ונטיעת מאות מיליוני עצים. ישראל היא אחת המדינות היחידות שנכנסו למאה ה־21 עם **יותר** עצים משהיו לה בתחילת המאה ה־20.', status: 'claim', sources: [wiki('en', 'Jewish National Fund'), wiki('en', 'Yatir Forest'), I.britIsraelHistory] },
      ],
    },
    {
      type: 'cards',
      head: { eyebrow: 'מים ואוכל', title: 'איך מגדלים במדבר' },
      items: [
        { k: '1965', title: 'השקיה בטפטוף', img: 'netafim', text: 'שמחה בלאס וקיבוץ חצרים הקימו את נטפים. הטפטפת חוסכת עד מחצית מהמים, וחקלאים בכל העולם משתמשים בה היום.', status: 'verified', sources: [wiki('en', 'Netafim'), wiki('en', 'Drip irrigation'), I.britIrrigation, I.cnnWater] },
        { k: '1970s–1980s', title: 'עגבניות שרי', img: 'cherry', text: 'עגבניות קטנות היו קיימות קודם. החוקרים נחום קדר וחיים רבינוביץ׳ פיתחו זנים שמחזיקים הרבה יותר זמן ומתאימים לשיווק, וכך הפכו את השרי ללהיט עולמי.', status: 'disputed', sources: [wiki('en', 'Cherry tomato'), I.britIsraelIndustry] },
        { k: '2005–היום', title: 'התפלה', img: 'sorek', text: 'מתקני התפלה לאורך החוף מספקים את רוב מי השתייה של ישראל. מדינה שסבלה מבצורת קבועה הפכה לבעלת עודף מים.', status: 'verified', sources: [wiki('en', 'Water supply and sanitation in Israel'), wiki('en', 'Sorek desalination plant'), I.sciAmDesal, I.nprRecycled] },
        { title: 'מחזור מים', text: 'כ־90% ממי השפכים בישראל מטוהרים ומשמשים להשקיה, הרבה יותר מכל מדינה אחרת בעולם.', status: 'verified', sources: [wiki('en', 'Water supply and sanitation in Israel'), I.nprRecycled, I.sciAmDesal] },
      ],
    },
    {
      type: 'cards',
      head: { eyebrow: 'הייטק', title: 'יש סיכוי שיש לכם את זה בכיס', text: 'ישראל מכונה ״אומת הסטארט־אפ״, יותר חברות הזנק לנפש מכמעט כל מדינה אחרת.' },
      items: [
        { k: '2006', title: 'Waze', img: 'waze', text: 'אפליקציית הניווט שנולדה בישראל ונמכרה לגוגל ב־2013 בכמיליארד דולר. מאות מיליוני משתמשים בעולם.', status: 'verified', sources: [wiki('en', 'Waze'), I.nprWaze, I.cnbcWaze] },
        { k: '1999', title: 'Mobileye', img: 'mobileye', text: 'מערכות ראייה ממוחשבת למכוניות, שמונעות תאונות ומובילות לנהיגה אוטונומית. אינטל קנתה אותה ב־2017 ב־15.3 מיליארד דולר.', status: 'verified', sources: [wiki('en', 'Mobileye'), I.cnbcMobileye, I.cnnMobileye] },
        { k: '1996', title: 'ICQ', img: 'icq', text: 'תוכנת המסרים המיידיים הראשונה לקהל הרחב, נכתבה בידי ארבעה צעירים ישראלים.', status: 'verified', sources: [wiki('en', 'ICQ'), I.britIcq] },
        { k: '1993', title: 'חומת האש', img: 'checkpoint', text: 'צ׳ק פוינט פיתחה את אחד מחומות האש המסחריות הראשונות. ישראל היא עד היום מעצמת סייבר.', status: 'verified', sources: [wiki('en', 'Check Point'), I.forbesStartups, I.britIsraelIndustry] },
        { k: '2000', title: 'הדיסק־און־קי', img: 'usb', text: 'M-Systems הישראלית הייתה מהראשונות שפיתחו ומכרו כונן USB נייד. יש עוד חברות שטוענות לראשוניות.', status: 'disputed', sources: [wiki('en', 'USB flash drive'), I.britIsraelIndustry] },
        { k: '2001', title: 'הגלולה המצלמת', img: 'pillcam', text: 'PillCam של גיוון אימג׳ינג: מצלמה בגודל גלולה שבולעים, ומצלמת את מערכת העיכול מבפנים.', status: 'verified', sources: [wiki('en', 'Capsule endoscopy'), I.britIsraelIndustry] },
        { title: 'תרופות', img: 'teva', text: 'קופקסון לטרשת נפוצה פותחה במכון ויצמן. אקסלון לאלצהיימר פותחה באוניברסיטה העברית. טבע הייתה יצרנית התרופות הגנריות הגדולה בעולם.', status: 'verified', sources: [wiki('en', 'Glatiramer acetate'), wiki('en', 'Rivastigmine'), wiki('en', 'Teva Pharmaceuticals'), I.britIsraelIndustry] },
        { title: 'אינטל ישראל', img: 'intel', text: 'מעבדים מרכזיים של אינטל, כמו Centrino ו־Core, תוכננו בחיפה.', status: 'verified', sources: [wiki('en', 'Intel Israel'), I.britIsraelIndustry] },
      ],
    },
    {
      type: 'cards',
      head: { eyebrow: 'התנדבות', title: 'הראשונים להגיע', text: 'ישראל שולחת עזרה גם למדינות שאין לה איתן יחסים.' },
      items: [
        { k: '2010', title: 'רעידת האדמה בהאיטי', img: 'haiti', text: 'צה״ל הקים בית חולים שדה מהראשונים שפעלו במקום, וביצע ניתוחים ולידות כבר בימים הראשונים.', status: 'verified', sources: [wiki('en', 'Humanitarian response to the 2010 Haiti earthquake'), I.cnnHaiti] },
        { k: '2023', title: 'רעידת האדמה בטורקיה', text: 'משלחת חילוץ של פיקוד העורף חילצה ניצולים מההריסות, ובית חולים שדה טיפל באלפים, חודשים אחרי שיחסי ישראל–טורקיה היו בשפל.', status: 'verified', sources: [wiki('en', 'Humanitarian response to the 2023 Turkey–Syria earthquakes'), I.nbcTurkey, I.nprTurkeyTeams] },
        { k: '2001–היום', title: 'IsraAID', img: 'israaid', text: 'ארגון סיוע ישראלי שפעל ביותר מ־60 מדינות: אסונות טבע, פליטים, מים ושיקום.', status: 'verified', sources: [wiki('en', 'IsraAID'), src('IsraAID', 'https://www.israaid.org/'), I.nprAidGroups] },
        { k: '1995–היום', title: 'הצילו את ליבו של ילד', img: 'heart', text: 'רופאים ישראלים ניתחו בחינם אלפי ילדים עם מומי לב מעשרות מדינות, כולל ילדים רבים מהרשות הפלסטינית ומעזה.', status: 'verified', sources: [wiki('en', 'Save a Child\'s Heart'), I.nprAidGroups] },
        { title: 'איחוד הצלה וזק״א', img: 'hatzalah', text: 'אלפי מתנדבים אזרחיים, דתיים, חילונים, יהודים וערבים, שמגיעים לכל אירוע תוך דקות. המודל הועתק לערים בעולם.', status: 'verified', sources: [wiki('en', 'United Hatzalah'), I.nprTurkeyTeams] },
      ],
    },
    {
      type: 'cards',
      head: { eyebrow: 'תעשייה ביטחונית', title: 'הגנה שהעולם קונה', text: 'מדינה שהותקפה מכל עבר פיתחה כמה ממערכות ההגנה המתקדמות בעולם.' },
      items: [
        { k: '2011', title: 'כיפת ברזל', img: 'ironDome', text: 'מערכת שמיירטת רקטות לטווח קצר. יירטה אלפי רקטות שנורו על ערים ישראליות, והצילה חיים משני צדי הגבול, כי ישראל לא נאלצה להגיב בכל פעם.', status: 'verified', sources: [wiki('en', 'Iron Dome'), I.britIronDome] },
        { k: '2017', title: 'חץ 3', img: 'arrow3', text: 'מיירט טילים בליסטיים מחוץ לאטמוספרה. גרמניה רכשה אותו ב־2023, העסקה הביטחונית הגדולה בתולדות ישראל.', status: 'verified', sources: [wiki('en', 'Arrow 3'), I.cnnArrow, I.bdArrow, I.dnArrowIntercept] },
        { k: '1970s–היום', title: 'מל״טים', img: 'scout', text: 'ישראל הייתה מהחלוצות של הכטב״מים המודרניים. צבא ארה״ב השתמש במל״ט ישראלי במלחמת המפרץ.', status: 'verified', sources: [wiki('en', 'IAI Scout'), wiki('en', 'AAI RQ-2 Pioneer'), I.britUav, I.britDrones] },
        { title: 'מעיל רוח', img: 'trophy', text: 'מערכת הגנה אקטיבית לטנקים שמיירטת טילים נגד־טנקים. צבא ארה״ב התקין אותה על טנקי אברמס.', status: 'verified', sources: [wiki('en', 'Trophy (countermeasure)'), I.britIsraelIndustry] },
        { k: '2025', title: 'אור איתן', img: 'ironBeam', text: 'מערכת יירוט בלייזר, מהראשונות בעולם שנכנסו לשירות מבצעי. עלות יירוט: דולרים בודדים, במקום עשרות אלפי דולרים לטיל מיירט.', status: 'developing', sources: [wiki('en', 'Iron Beam'), I.bdLaser] },
      ],
    },
    {
      type: 'analysis',
      title: 'הישגים כ״הסחת דעת״?',
      critics: 'הדגשת הייטק, מים ועגבניות היא ״מיתוג״ שנועד להסיט את תשומת הלב מהכיבוש. וחלק מהתעשייה הביטחונית מכרה טכנולוגיה למשטרים בעייתיים.',
      reading: 'ההישגים לא מוכיחים שכל מדיניות צודקת, אבל הם מפריכים את הטענה ש״ישראל היא רק כיבוש״. חברה שבנתה את עצמה מאפס, קלטה פליטים ושולחת משלחות הצלה לכל העולם היא חלק מהתמונה.',
      open: 'יצוא רוגלות כמו פגסוס של NSO עורר ביקורת בינלאומית אמיתית, גם בישראל. מדינה שמתגאה בטכנולוגיה צריכה גם לפקח על השימוש בה.',
      sources: [I.britIsraelIndustry, I.forbesStartups, { label: 'Wikipedia: NSO Group', url: 'https://en.wikipedia.org/wiki/NSO_Group' }],
    },
    {
      type: 'honest',
      title: 'בכנות',
      text: 'ההישגים לא מוכיחים שמדיניות מסוימת צודקת, וגם לא מבטלים ביקורת. הם מוכיחים משהו אחר: שהעם הזה בנה כאן חיים, לא רק לעצמו. כשמישהו אומר ״ישראל היא רק כיבוש״, שאלו אותו על איזה טלפון הוא כותב את זה.',
    },
  ],
  think: [
    'מה ההבדל בין ״המצאה ישראלית״ לבין ״פיתוח ישראלי שהפך משהו קיים להצלחה״? (רמז: עגבניות שרי)',
    'למה מדינה שנאלצת להשקיע כל כך הרבה בביטחון מצליחה גם בחדשנות אזרחית?',
    'האם מי שקורא לחרם על ישראל מוכן לוותר גם על Waze, על המעבד במחשב ועל הטפטפות שמאכילות את העולם?',
  ],
  videos: VIDEOS.achievements,
  next: [{ to: '/timeline', label: 'להיסטוריה של ישראל' }, { to: '/israel', label: 'חזרה למי היא ישראל?' }],
}
