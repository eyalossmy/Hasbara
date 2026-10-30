import type { Article } from '../article'
import { I } from '../intl'
import { VIDEOS } from '../videos'
import { SRC, src, wiki } from '../sources'

const quran = (sura: number, aya: number) => src(`הקוראן ${sura}:${aya} (Quran.com)`, `https://quran.com/${sura}/${aya}`)

export const CONFLICT_HISTORY: Article = {
  eyebrow: 'ההיסטוריה של הסכסוך',
  title: 'פלסטין, האסלאם והארץ.',
  lead: 'מאיפה בא השם, איך האסלאם הגיע לכאן, איך נולדה הזהות הפלסטינית, וכל הפעמים שבהן נאמר ״לא״ לשלום.',
  blocks: [
    {
      type: 'cards',
      head: { eyebrow: 'השם', title: 'מאיפה בא ״פלסטין״', text: 'השם עתיק. העם שקרוי היום על שמו, חדש יחסית. שני הדברים נכונים בו־זמנית.' },
      items: [
        { k: '~1150 לפנה״ס', title: 'הפלשתים', text: 'עם ים־תיכוני מאזור הים האגאי שהתיישב ברצועת החוף הדרומית. הוא נעלם במאה ה־6 לפנה״ס, ואין לו קשר לערבים שהגיעו כ־1,200 שנה מאוחר יותר.', status: 'verified', sources: [wiki('en', 'Philistines'), I.britRomanPalestine] },
        { k: '135 לספירה', title: 'רומא מוחקת את ״יהודה״', img: 'titus', text: 'אחרי מרד בר כוכבא הקיסר אדריאנוס מאחד את הפרובינציה ל״סוריה פלסטינה״, כדי לנתק את היהודים מארצם.', status: 'verified', sources: [wiki('en', 'Syria Palaestina'), I.britBarKokhba, I.britHadrian] },
        { k: '1517–1917', title: 'אין פרובינציה בשם הזה', text: 'בשלטון העות׳מאני הארץ חולקה בין מחוזות (סנג׳קים) של ירושלים, שכם ועכו, תחת דמשק או ביירות. ״פלסטין״ לא הייתה יחידה מנהלית.', status: 'verified', sources: [wiki('en', 'Mutasarrifate of Jerusalem'), I.britMandate] },
        { k: '1920–1948', title: 'כשהיהודים היו ״הפלסטינים״', text: 'בימי המנדט ״פלסטיני״ היה כל תושב הארץ. העיתון היהודי נקרא ״פלסטיין פוסט״, היום ״ג׳רוזלם פוסט״.', status: 'verified', sources: [wiki('en', 'The Jerusalem Post'), I.britMandate] },
        { k: '1919', title: '״סוריה הדרומית״', text: 'הקונגרס הערבי־פלסטיני הראשון דרש לראות בארץ חלק מ״סוריה הערבית״, לא מדינה נפרדת.', status: 'verified', sources: [wiki('en', 'Palestine Arab Congress'), I.britMandate, I.britStatehood] },
      ],
    },
    {
      type: 'cards',
      head: { eyebrow: 'האסלאם והארץ', title: 'מה אומרים המקורות', text: 'ירושלים חשובה לאסלאם, זה נכון וראוי לכבד. אבל יש כמה עובדות שכדאי להכיר.' },
      items: [
        { k: '636–638', title: 'הכיבוש הערבי', text: 'כ־600 שנה אחרי חורבן בית שני, צבאות הח׳ליפות הערבית כובשים את הארץ מידי הביזנטים.', status: 'verified', sources: [wiki('en', 'Muslim conquest of the Levant'), I.britJerusalem] },
        { k: '691', title: 'כיפת הסלע', img: 'domeRock', text: 'נבנתה בידי הח׳ליף עבד אל־מלכ, על הר הבית, במקום שבו עמד בית המקדש היהודי.', status: 'verified', sources: [wiki('en', 'Dome of the Rock'), I.britDome, I.britTempleMount] },
        { title: 'ירושלים בקוראן', text: 'השם ״ירושלים״ לא מופיע בקוראן אף פעם. הפסוק על ״המסגד הרחוק״ (17:1) זוהה עם ירושלים בפרשנות מאוחרת יותר.', status: 'verified', sources: [quran(17, 1), wiki('en', 'Jerusalem in Islam'), I.britAqsa] },
        { title: 'הקוראן על בני ישראל והארץ', text: 'בסורה 5 משה אומר לבני ישראל: ״היכנסו לארץ הקדושה אשר אללה כתב לכם״. הקוראן עצמו מכיר בקשר של בני ישראל לארץ.', status: 'verified', sources: [quran(5, 21), I.britTempleMount] },
        { title: 'לא בירה מעולם', text: 'תחת שלטון מוסלמי ירושלים מעולם לא הייתה בירה. כשהאומיים הקימו בירה לפרובינציה, הם בנו את רמלה.', status: 'verified', sources: [wiki('en', 'Ramla'), wiki('en', 'Jund Filastin'), I.britJerusalem] },
        { title: 'בני חסות', text: 'תחת שלטון האסלאם יהודים ונוצרים היו ״ד׳ימים״, מוגנים, אבל נחותים בחוק, ושילמו מס מיוחד (ג׳יזיה). זה הרקע לסירוב לקבל ריבונות יהודית באזור.', status: 'verified', sources: [wiki('en', 'Dhimmi'), wiki('en', 'Jizya'), I.britAntiMedieval] },
      ],
    },
    {
      type: 'cards',
      head: { eyebrow: 'האסלאם הקיצוני', title: 'כשהסכסוך הופך דתי', text: 'רוב המוסלמים בעולם לא תומכים בחמאס. אבל האידאולוגיה שמניעה אותו היא דתית, לא רק לאומית.' },
      items: [
        { k: '1928', title: 'האחים המוסלמים', text: 'התנועה שנוסדה במצרים וחמאס הוא הסניף הפלסטיני שלה, כך כתוב באמנת חמאס עצמה.', status: 'verified', sources: [SRC.hamasCharter, wiki('en', 'Muslim Brotherhood'), I.britBrotherhood, I.cfrHamas] },
        { k: '1988', title: 'אמנת חמאס', text: 'סעיף 7 מצטט חדית׳ לפיו ״יום הדין לא יבוא עד שהמוסלמים יילחמו ביהודים ויהרגו אותם״. סעיף 13 דוחה כל פתרון מדיני.', status: 'verified', sources: [SRC.hamasCharter, I.britHamas, I.cfrHamas] },
        { k: '2017', title: 'ה״מסמך החדש״', text: 'חמאס פרסם מסמך מרוכך יותר בניסוחו, אבל לא ביטל את האמנה, ושב וקרא לשחרור ״פלסטין מהנהר ועד הים״.', status: 'verified', sources: [wiki('en', 'Hamas Charter'), I.cfrHamas, I.britHamas] },
      ],
    },
    {
      type: 'steps',
      head: { eyebrow: 'מאה שנה של ״לא״', title: 'ההצעות שנדחו', text: 'בכל פעם שהוצעה מדינה ערבית לצד מדינה יהודית, ההנהגה היהודית אמרה ״כן״ או ניהלה משא ומתן. הצד השני אמר ״לא״.' },
      items: [
        { k: '1937', title: 'ועדת פיל', img: 'peelMap', text: 'ההצעה הראשונה לחלוקה. ההנהגה הציונית הסכימה לעקרון. ההנהגה הערבית דחתה.', status: 'verified', sources: [SRC.peel, I.britArabRevolt, I.britPartition] },
        { k: '1947', title: 'תוכנית החלוקה של האו״ם', img: 'unga', text: 'היהודים קיבלו. מדינות ערב וההנהגה הערבית דחו, ופתחו במלחמה.', status: 'verified', sources: [SRC.res181, I.britRes181, I.britPartition] },
        { k: '1967', title: 'שלושת הלאווים של חרטום', text: 'אחרי ששת הימים ישראל הציעה שטחים תמורת שלום. הליגה הערבית: לא שלום, לא הכרה ולא משא ומתן.', status: 'verified', sources: [SRC.khartoum, I.britArabIsraeliWars, I.avalonMideast] },
        { k: '2000', title: 'קמפ דייוויד ומתווה קלינטון', img: 'campDavid', text: 'מדינה ברוב הגדה, בכל עזה ובירה במזרח ירושלים. ערפאת דחה בלי הצעה נגדית, וזמן קצר אחר כך פרצה האינתיפאדה השנייה.', status: 'disputed', sources: [SRC.campDavid, I.britStatehood, I.britArafat] },
        { k: '2005', title: 'ההתנתקות', img: 'gushKatif', text: 'בלי הסכם בכלל, ישראל יצאה מכל עזה. התוצאה: חמאס, רקטות ו־7 באוקטובר.', status: 'verified', sources: [SRC.disengagement, SRC.hamasTakeover, I.britHamas, I.cfrConflict] },
        { k: '2008', title: 'הצעת אולמרט', text: 'כ־94% מהגדה עם חילופי שטחים, וניהול בינלאומי של העיר העתיקה. אבו מאזן לא השיב.', status: 'claim', sources: [wiki('en', 'Ehud Olmert'), wiki('en', 'Israeli–Palestinian peace process'), I.britTwoState, I.britStatehood] },
      ],
    },
    {
      type: 'photos',
      head: { eyebrow: 'תמונות', title: 'רגעים שקבעו', text: 'מפת החלוקה הראשונה, האו״ם, קמפ דייוויד וההתנתקות.' },
      items: [
        { img: 'peelMap', caption: 'מפת ועדת פיל, 1937: ההצעה הראשונה לשתי מדינות' },
        { img: 'unga', caption: 'העצרת הכללית של האו״ם, שהצביעה על החלוקה ב־1947' },
        { img: 'arafat', caption: 'יאסר ערפאת' },
        { img: 'campDavid', caption: 'קלינטון, ברק וערפאת בקמפ דייוויד, 2000' },
        { img: 'gushKatif', caption: 'פינוי גוש קטיף, 2005' },
        { img: 'domeRock', caption: 'כיפת הסלע, על הר הבית' },
      ],
    },
    {
      type: 'analysis',
      title: 'מתיישבים קולוניאליים?',
      critics: 'הציונות היא קולוניאליזם התיישבותי: מהגרים מאירופה שהגיעו לארץ מאוכלסת ונישלו את תושביה.',
      reading: 'לקולוניאליזם יש ״מדינת אם״ ששולחת מתיישבים. ליהודים לא הייתה: הם חזרו לארץ שבה חיו ברציפות קהילות יהודיות, ושממנה גורשו. וכמחצית מהיהודים בישראל הם צאצאי יהודים ממדינות ערב ואיראן, לא מאירופה.',
      open: 'גם לערבים שחיו כאן היה קשר אמיתי לארץ, ומאות אלפים מהם איבדו את בתיהם ב־1948. שני הסיפורים נכונים. הפתרון לא יבוא מהכחשת אחד מהם, אלא מפשרה.',
      sources: [I.britProCon, I.britZionism, I.britIsraelHistory, I.cfrConflict],
    },
    {
      type: 'honest',
      title: 'בכנות',
      text: 'ערבים חיו בארץ במשך מאות שנים, והזהות הלאומית הפלסטינית אמיתית היום, אין טעם להכחיש אותה. אבל זהות אמיתית היום לא מוחקת זהות בת 3,000 שנה. השאלה היא לא ״מי היה כאן קודם״, אלא מי מוכן לחיות לצד השני.',
      sources: [wiki('en', 'Palestinians'), I.britProCon, I.cfrConflict],
    },
  ],
  think: [
    'אם הקוראן עצמו מזכיר את בני ישראל ואת הארץ, מאיפה הטענה שליהודים אין קשר אליה?',
    'למה ירדן ומצרים לא הקימו מדינה פלסטינית בשנים 1949–1967?',
    'האם מישהו שמסרב לכל הצעה, בכל תנאי, מחפש מדינה, או את סוף המדינה של השני?',
  ],
  videos: VIDEOS.conflictHistory,
  next: [{ to: '/timeline', label: 'לציר הזמן המלא' }, { to: '/myths', label: 'למיתוסים' }],
}
