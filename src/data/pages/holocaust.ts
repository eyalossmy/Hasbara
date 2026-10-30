import type { Article } from '../article'
import { src, wiki } from '../sources'

const ushmm = (label: string, slug: string) => src(`USHMM: ${label}`, `https://encyclopedia.ushmm.org/content/en/article/${slug}`)
const YV = src('יד ושם, מהי השואה', 'https://www.yadvashem.org/holocaust/about.html')

export const HOLOCAUST: Article = {
  eyebrow: 'השואה',
  title: 'שישה מיליון.',
  lead: 'רצח העם המתועד ביותר בהיסטוריה, ומה הוא לימד את העם היהודי על הצורך במדינה משלו.',
  blocks: [
    {
      type: 'stats',
      items: [
        { n: '6,000,000', t: 'יהודים נרצחו, כשני שלישים מיהודי אירופה' },
        { n: '~1,500,000', t: 'מהם ילדים' },
        { n: '~1,000,000', t: 'יהודים נרצחו באושוויץ לבדו' },
        { n: '0', t: 'מדינות שהיו מוכנות לקלוט את כולם' },
      ],
      sources: [YV, ushmm('Introduction to the Holocaust', 'introduction-to-the-holocaust'), ushmm('Auschwitz', 'auschwitz')],
    },
    {
      type: 'steps',
      head: { eyebrow: 'שלב אחר שלב', title: 'איך זה קרה', text: 'השואה לא התחילה בתאי הגזים. היא התחילה במילים, אחר כך בחוקים, ורק בסוף ברצח.' },
      items: [
        { k: '1933', title: 'הנאצים עולים לשלטון', text: 'היטלר מתמנה לקנצלר. תוך חודשים: חרם על עסקים יהודיים, פיטורי יהודים מהשירות הציבורי ושריפת ספרים.', status: 'verified', sources: [wiki('en', "Adolf Hitler's rise to power")] },
        { k: '1935', title: 'חוקי נירנברג', img: 'nuremberg', text: 'יהודים מאבדים את האזרחות הגרמנית. נישואים בין יהודים ל״ארים״ נאסרים. השנאה הופכת לחוק.', status: 'verified', sources: [ushmm('Nuremberg Race Laws', 'nuremberg-laws')] },
        { k: '11.1938', title: 'ליל הבדולח', img: 'kristallnacht', text: 'פוגרום בכל גרמניה ואוסטריה: מאות בתי כנסת נשרפים, אלפי חנויות נבזזות וכ־30,000 גברים יהודים נשלחים למחנות.', status: 'verified', sources: [ushmm('Kristallnacht', 'kristallnacht')] },
        { k: '7.1938', title: 'ועידת אוויאן, העולם סוגר את הדלת', img: 'evian', text: '32 מדינות התכנסו כדי לדון בפליטים היהודים. כמעט כולן סירבו להגדיל את מכסות ההגירה.', status: 'verified', sources: [ushmm('The Evian Conference', 'the-evian-conference')] },
        { k: '9.1941', title: 'באבי יאר', img: 'babiYar', text: 'ביומיים נרצחים 33,771 יהודים בגיא ליד קייב. יחידות הרצח הניידות רוצחות כ־1.5 מיליון יהודים במזרח.', status: 'verified', sources: [ushmm('Kiev and Babi Yar', 'kiev-and-babi-yar')] },
        { k: '11.1941', title: 'המופתי נפגש עם היטלר', img: 'mufti', text: 'חאג׳ אמין אל־חוסייני, מנהיג ערביי הארץ, נפגש עם היטלר בברלין ושידר תעמולה נאצית לעולם הערבי לאורך המלחמה.', status: 'verified', sources: [ushmm('Hajj Amin al-Husayni', 'hajj-amin-al-husayni-wartime-propagandist')] },
        { k: '1.1942', title: 'ועידת ואנזה', img: 'wannsee', text: 'בכירי המשטר מתאמים את ״הפתרון הסופי״, השמדת 11 מיליון יהודי אירופה. הכוונה כתובה בפרוטוקול.', status: 'verified', sources: [ushmm('Wannsee Conference', 'wannsee-conference-and-the-final-solution')] },
        { k: '4.1943', title: 'מרד גטו ורשה', img: 'warsaw', text: 'כמה מאות לוחמים יהודים, כמעט בלי נשק, מחזיקים מול הצבא הגרמני כמעט חודש.', status: 'verified', sources: [ushmm('Warsaw Ghetto Uprising', 'warsaw-ghetto-uprising')] },
        { k: '1945', title: 'השחרור, ואין לאן לחזור', img: 'kielce', text: 'הניצולים חוזרים לבתים ריקים, ולפעמים לפוגרומים: בקיילצה שבפולין נרצחו 42 יהודים ב־1946. מאות אלפים נשארים במחנות עקורים.', status: 'verified', sources: [wiki('en', 'Kielce pogrom'), ushmm('Postwar refugee crisis', 'postwar-refugee-crisis-and-the-establishment-of-the-state-of-israel')] },
      ],
    },
    {
      type: 'cards',
      head: { eyebrow: 'הקשר לישראל', title: 'מה השואה לימדה', text: 'השואה היא לא הסיבה שישראל קיימת, אבל היא ההוכחה הכי כואבת לכך שעם בלי מדינה תלוי בחסדי אחרים.' },
      items: [
        { title: 'הציונות הייתה כאן קודם', img: 'zionistCongress', text: 'הקונגרס הציוני נערך ב־1897, תל אביב נוסדה ב־1909, והאוניברסיטה העברית נפתחה ב־1925. התשתית למדינה נבנתה עשרות שנים **לפני** השואה.', status: 'verified', sources: [wiki('he', 'הקונגרס הציוני הראשון'), wiki('he', 'האוניברסיטה העברית בירושלים')] },
        { title: 'הספר הלבן, הדלת שננעלה', img: 'whitePaper', text: 'ב־1939, ערב השואה, בריטניה הגבילה את עליית היהודים לארץ ל־75,000 בחמש שנים. אוניות פליטים הוחזרו לים.', status: 'verified', sources: [src('הספר הלבן 1939 (Yale Avalon)', 'https://avalon.law.yale.edu/20th_century/brwh1939.asp')] },
        { title: 'ניצולים שבנו מדינה', img: 'exodus1947', text: 'מאות אלפי ניצולים עלו לישראל אחרי המלחמה. רבים מהם נלחמו במלחמת העצמאות זמן קצר אחרי שהגיעו.', status: 'verified', sources: [ushmm('Postwar refugee crisis', 'postwar-refugee-crisis-and-the-establishment-of-the-state-of-israel')] },
        { title: '״לעולם לא עוד״, בפועל', img: 'yadVashem', text: 'מאז 1948 יש לעם היהודי, לראשונה מזה אלפיים שנה, צבא משלו ומקום שקולט כל יהודי שנרדף. חוק השבות (1950) הוא התשובה הישירה.', status: 'verified', sources: [wiki('en', 'Law of Return')] },
      ],
    },
    {
      type: 'cards',
      head: { eyebrow: 'היום', title: 'הכחשה והיפוך', text: 'שתי דרכים לעוות את השואה: לטעון שלא קרתה, או להפוך את הקורבנות ל״נאצים החדשים״.' },
      items: [
        { title: 'הכחשת שואה', img: 'auschwitz', text: 'הכחשה היא לא ״דעה היסטורית״, היא התעלמות ממסמכים, תצלומים, עדויות של אלפי ניצולים ומשפטי נירנברג. העצרת הכללית של האו״ם גינתה אותה ב־2022.', status: 'verified', sources: [wiki('en', 'Holocaust denial')] },
        { title: 'השוואת ישראל לנאצים', img: 'ihra', text: 'הגדרת IHRA לאנטישמיות מונה במפורש ״השוואה בין המדיניות הישראלית העכשווית לזו של הנאצים״ כדוגמה לאנטישמיות.', status: 'verified', sources: [src('הגדרת IHRA', 'https://holocaustremembrance.com/resources/working-definition-antisemitism')] },
        { title: '7 באוקטובר', img: 'beeri', text: 'כ־1,200 נרצחו ביום אחד, היום הקטלני ביותר ליהודים מאז השואה. ניצולי שואה היו בין הנרצחים והנחטפים.', status: 'verified', sources: [wiki('en', 'October 7 attacks')] },
      ],
    },
    {
      type: 'honest',
      title: 'בכנות',
      text: 'אל תשתמשו בשואה כדי לסיים ויכוח. השואה היא לא ״קלף״, היא אירוע היסטורי שיש לו מקורות, תאריכים ומספרים. מי שמכיר אותם לעומק משכנע יותר ממי שרק מזכיר אותה.',
    },
  ],
  think: [
    'איזה מקור ראשוני, מסמך, תצלום, פרוטוקול, מראה את הכוונה להשמיד, ולא רק את התוצאה?',
    'למה ״הם עשו לנו מה שהנאצים עשו להם״ היא השוואה שקורסת כשבודקים מספרים, כוונה ושיטה?',
    'אם השואה הייתה ״הסיבה״ לישראל, איך מסבירים את תל אביב של 1909?',
  ],
  next: [{ to: '/antisemitism', label: 'לאנטישמיות' }, { to: '/compare', label: 'השוואה לרציחות עם אחרות' }],
}
