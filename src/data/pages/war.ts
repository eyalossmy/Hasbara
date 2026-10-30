import type { Article } from '../article'
import { I } from '../intl'
import { VIDEOS } from '../videos'
import { SRC, wiki } from '../sources'
import { CONFLICT_WIKI } from '../conflict-sources'

const GAZA_WAR = wiki('en', 'Gaza war')

export const WAR: Article = {
  eyebrow: 'ציר הזמן הנוכחי',
  title: 'מ־7 באוקטובר ועד היום.',
  lead: 'שבע חזיתות, 251 חטופים ומלחמה ישירה עם איראן. האירועים המרכזיים לפי הסדר, כל אחד עם מקור.',
  blocks: [
    {
      type: 'stats',
      items: [
        { n: '~1,200', t: 'נרצחו ב־7 באוקטובר' },
        { n: '251', t: 'נחטפו לעזה' },
        { n: '7', t: 'חזיתות: עזה, לבנון, יהודה ושומרון, תימן, עיראק, סוריה ואיראן' },
        { n: '0', t: 'חטופים שנותרו בעזה, מינואר 2026' },
      ],
      sources: [SRC.oct7, SRC.hostages, GAZA_WAR, I.britOct7, I.cnnHostages, I.nprLastHostage],
    },
    {
      type: 'steps',
      head: { eyebrow: '2023', title: 'הטבח והתגובה' },
      items: [
        { k: '7.10.2023', title: 'הטבח', img: 'o7Beeri1', text: 'חמאס וארגונים נוספים פורצים לישראל, רוצחים כ־1,200 בני אדם, רובם אזרחים, וחוטפים 251.', status: 'verified', sources: [SRC.oct7, I.britOct7, I.nprNova] },
        { k: '8.10.2023', title: 'חיזבאללה מצטרף', text: 'חיזבאללה פותח באש על הצפון ״בסולידריות עם עזה״. כ־60,000 ישראלים מפונים מבתיהם בצפון.', status: 'verified', sources: [...CONFLICT_WIKI.lebanon, I.britHezbollahWar, I.cfrHezbollah] },
        { k: '19.10.2023', title: 'החות׳ים מצטרפים', text: 'החות׳ים בתימן משגרים טילים ורחפנים לעבר אילת, ומתחילים לתקוף ספינות בים האדום.', status: 'verified', sources: [...CONFLICT_WIKI.redsea, I.britHouthis] },
        { k: '27.10.2023', title: 'התמרון הקרקעי', text: 'צה״ל נכנס לרצועה. לפני כן קרא לתושבי צפון הרצועה לעבור דרומה.', status: 'verified', sources: [GAZA_WAR, I.britWar, I.cfrConflict] },
        { k: '24.11–1.12.2023', title: 'העסקה הראשונה', img: 'hostagesSquare', text: '105 חטופים, רובם נשים, ילדים ועובדים זרים, שוחררו בהפסקת אש של שבוע, תמורת אסירים פלסטינים.', status: 'verified', sources: [wiki('en', '2023 Israel–Hamas war ceasefire'), I.cnnHostages, I.britWar] },
      ],
    },
    {
      type: 'steps',
      head: { eyebrow: '2024', title: 'המלחמה מתרחבת' },
      items: [
        { k: '26.1.2024', title: 'צווי ביניים ב־ICJ', text: 'בית הדין בהאג **לא** קבע שישראל מבצעת רצח עם, ו**לא** הורה להפסיק את המלחמה. הוא הורה למנוע פגיעה ולאפשר סיוע. התיק עדיין פתוח.', status: 'verified', sources: [SRC.icjGenocide, I.unIcjOrder, I.nprIcj, I.lawfareIcj] },
        { k: '13–14.4.2024', title: 'איראן תוקפת ישירות', text: 'לראשונה, איראן משגרת מאדמתה כ־300 טילים ורחפנים לעבר ישראל. כמעט כולם יורטו, בעזרת ארה״ב ובעלות ברית.', status: 'verified', sources: [wiki('en', 'April 2024 Iranian strikes on Israel'), I.britAxis, I.britWarFronts] },
        { k: '8.6.2024', title: 'מבצע ארנון', text: 'ארבעה חטופים חולצו חיים מנוסייראת, בהם נועה ארגמני.', status: 'verified', sources: [wiki('en', '2024 Nuseirat rescue operation'), I.cnnNuseirat, I.cnnNuseiratToll] },
        { k: '27.7.2024', title: 'מג׳דל שמס', img: 'majdal', text: 'רקטה של חיזבאללה פוגעת במגרש כדורגל בכפר הדרוזי. 12 ילדים ובני נוער נהרגו.', status: 'verified', sources: [wiki('en', 'Majdal Shams attack'), I.cnnMajdal, I.nprMajdal] },
        { k: '9.2024', title: 'הביפרים ונסראללה', img: 'nasrallah', text: 'אלפי מכשירי קשר של אנשי חיזבאללה מתפוצצים (17–18 בספטמבר). ב־27 בספטמבר חוסל חסן נסראללה בביירות.', status: 'verified', sources: [wiki('en', '2024 Lebanon electronic device attacks'), wiki('en', 'Assassination of Hassan Nasrallah'), I.britWarFronts, I.britHezbollahWar] },
        { k: '1.10.2024', title: 'מתקפה איראנית שנייה', text: 'כ־180 טילים בליסטיים נורים על ישראל. ב־26 באוקטובר ישראל תוקפת מטרות צבאיות באיראן.', status: 'verified', sources: [wiki('en', 'October 2024 Iranian strikes on Israel'), I.britWarFronts] },
        { k: '16.10.2024', title: 'סינוואר חוסל', text: 'מתכנן 7 באוקטובר נהרג ברפיח במפגש מקרי עם כוח של צה״ל.', status: 'verified', sources: [wiki('en', 'Killing of Yahya Sinwar'), I.britSinwar, I.nprSinwar, I.cnnSinwar] },
        { k: '27.11.2024', title: 'הפסקת אש בלבנון', text: 'הסכם בתיווך ארה״ב וצרפת. חיזבאללה נדרש לסגת מדרום לליטני.', status: 'verified', sources: [wiki('en', '2024 Israel–Hezbollah ceasefire agreement'), I.britHezbollahWar] },
        { k: '8.12.2024', title: 'נפילת אסד', text: 'משטר אסד בסוריה קורס אחרי 13 שנות מלחמת אזרחים, ו״ציר ההתנגדות״ של איראן מאבד חוליה מרכזית.', status: 'verified', sources: [wiki('en', 'Fall of the Assad regime'), I.britSyria, I.britAxis] },
      ],
    },
    {
      type: 'steps',
      head: { eyebrow: '2025', title: 'איראן, החטופים וההסכם' },
      items: [
        { k: '19.1.2025', title: 'הפסקת אש ועסקה שנייה', text: 'חטופים חיים וחללים הוחזרו בשלבים. בפברואר הוחזרו גופות שירי, אריאל וכפיר ביבס.', status: 'verified', sources: [wiki('en', '2025 Gaza war ceasefire'), I.britWarCeasefire, I.cnnHostages] },
        { k: '18.3.2025', title: 'חידוש הלחימה', text: 'אחרי שחמאס סירב להאריך את ההסכם בתנאים שהוצעו, ישראל חידשה את הלחימה.', status: 'claim', sources: [GAZA_WAR, I.britWarCeasefire] },
        { k: '13–24.6.2025', title: 'מלחמת 12 הימים', text: 'ישראל תוקפת את תוכנית הגרעין ואת הצבא של איראן. ב־22 ביוני ארה״ב מפציצה את פורדו, נתנז ואיספהאן. איראן משגרת מאות טילים; 28 בני אדם נהרגו בישראל.', status: 'verified', sources: [wiki('en', 'Twelve-Day War'), I.brit12Day] },
        { k: '29.9.2025', title: 'תוכנית טראמפ', text: 'תוכנית 20 הנקודות: שחרור כל החטופים, פירוק חמאס מנשקו ושלטון זמני בינלאומי בעזה.', status: 'verified', sources: [wiki('en', 'Gaza peace plan'), I.nprLastHostage] },
        { k: '10–13.10.2025', title: 'כולם הביתה', text: 'הפסקת אש נכנסת לתוקף. 20 החטופים החיים האחרונים שוחררו. גופות החללים הוחזרו בהדרגה.', status: 'verified', sources: [SRC.hostages, wiki('en', 'Gaza peace plan'), I.cnnHostages, I.britWar] },
      ],
    },
    {
      type: 'steps',
      head: { eyebrow: '2026', title: 'עכשיו', text: 'אירועים שעדיין מתפתחים. המידע עשוי להשתנות.' },
      items: [
        { k: '1.2026', title: 'החטוף האחרון חזר', img: 'bringHome', text: 'גופתו של רן גבילי, החטוף האחרון שנותר בעזה, הוחזרה לישראל.', status: 'verified', sources: [SRC.hostages, I.cnnLastHostage, I.nprLastHostage] },
        { k: '28.2.2026', title: 'המלחמה באיראן', text: 'ישראל וארה״ב פותחות במלחמה באיראן, והמנהיג העליון חמינאי חוסל. חיזבאללה מצטרף, וישראל נכנסת לדרום לבנון.', status: 'developing', sources: [...CONFLICT_WIKI.iran, I.britIran2026, I.nprKhamenei, I.cnnKhamenei] },
      ],
    },
    {
      type: 'photos',
      head: { eyebrow: 'תמונות', title: 'החזיתות', text: 'רקטות מעזה, פגיעות בצפון והמאבק להחזרת החטופים.' },
      items: [
        { img: 'rocketsGaza', caption: 'רקטות משוגרות מעזה לעבר ישראל' },
        { img: 'rocketDamage', caption: 'נזק מרקטה שנורתה מעזה' },
        { img: 'kiryatShmona', caption: 'פגיעת רקטה ברחוב בקריית שמונה' },
        { img: 'majdal', caption: 'האנדרטה ל־12 הילדים במג׳דל שמס' },
        { img: 'bringHome', caption: '״Bring Them Home Now״ בירושלים' },
        { img: 'tunnel', caption: 'מנהרת טרור של חמאס בעזה' },
      ],
    },
    {
      type: 'analysis',
      title: 'המחיר בעזה',
      critics: 'עשרות אלפים נהרגו בעזה, רבים מהם נשים וילדים. ועדת חקירה של האו״ם האשימה את ישראל בפגיעה מכוונת בילדים, והוכרז רעב בחלקים מהרצועה.',
      reading: 'כל אזרח שנהרג הוא טרגדיה. אבל המספרים מגיעים ממשרד שבשליטת חמאס ולא מפרידים בין לוחמים לאזרחים. חמאס בנה את המלחמה שלו מתחת לבתי ספר ולבתי חולים, וסירב לשחרר את החטופים. כשהסכים, המלחמה נעצרה.',
      open: 'הבדיקה של מקרים ספציפיים עוד לא הסתיימה, והתיק בהאג פתוח. ישראל צריכה לחקור כל חשד בעצמה, וזה גם האינטרס שלה: החקירה שלה היא התשובה הטובה ביותר להאשמות.',
      sources: [I.nprUnChildren, SRC.ipc, SRC.gazaMoh, I.nprIcj, I.cfrHamas],
    },
    {
      type: 'honest',
      title: 'בכנות',
      text: 'המלחמה גבתה מחיר כבד מאוד גם מאזרחי עזה, וזה כואב. אבל המספרים של ״משרד הבריאות בעזה״ מגיעים מחמאס, לא מפרידים בין לוחמים לאזרחים, ושונו כמה פעמים. זה לא אומר להתעלם מהם, זה אומר לשאול מה הם סופרים. ואת המלחמה פתח מי שבחר ב־7 באוקטובר, ויכול היה לסיים אותה בכל יום בשחרור החטופים.',
      sources: [SRC.gazaMoh, I.nprUnChildren, I.nprIcj, I.britWar],
    },
  ],
  think: [
    'כשכותרת אומרת ״ישראל תקפה״, האם היא מזכירה מה קרה יום קודם?',
    'מי היה יכול לעצור את המלחמה בכל רגע, ובאיזה תנאי?',
    'כמה מהחזיתות האלה מובלות על ידי אותו משטר, ומה זה אומר על ״סכסוך מקומי״?',
  ],
  videos: VIDEOS.war,
  next: [{ to: '/oct7', label: 'ל־7 באוקטובר' }, { to: '/myths', label: 'למיתוסים על המלחמה' }],
}
