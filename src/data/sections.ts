// The site's three missions and the sections built on them. Nav, footer and hub pages all read from here.

export const MISSIONS = [
  { n: '01', title: 'להבין את ישראל', text: 'מי אנחנו, מאיפה באנו ומה בנינו, עובדות, היסטוריה ומקורות.' },
  { n: '02', title: 'להסביר את הסכסוך', text: 'מה באמת קרה ומה קורה עכשיו, ומה עונים לטענות הנפוצות.' },
  { n: '03', title: 'לחשוב ביקורתית', text: 'לבדוק כל טענה, להשוות לעולם ולשאול מי אומר, ולמה. גם אותנו.' },
]

export interface SectionPage { to: string; label: string; text: string; img?: string }
export interface Section {
  id: 'israel' | 'conflict' | 'world'
  to: string
  label: string
  mission: number
  title: string
  lead: string
  pages: SectionPage[]
  think: string[]
}

export const SECTIONS: Section[] = [
  {
    id: 'israel', to: '/israel', label: 'מי היא ישראל?', mission: 0,
    title: 'מי היא ישראל?',
    lead: 'עם עתיק, מדינה צעירה. מה שעבר עלינו, ומה שבנינו מאפס.',
    pages: [
      { to: '/timeline', img: 'titus', label: 'ההיסטוריה של ישראל', text: 'ציר זמן מימי התנ״ך ועד היום, עם מפה לכל תקופה.' },
      { to: '/achievements', img: 'ironDome', label: 'ההישגים', text: 'מביצות ומדבר למדינת הייטק: Waze, טפטפות, עגבניות שרי ועוד.' },
      { to: '/antisemitism', img: 'dreyfus', label: 'אנטישמיות', text: 'השנאה העתיקה בעולם, איך מזהים אותה, ומה קורה היום.' },
      { to: '/holocaust', img: 'warsaw', label: 'השואה', text: 'שישה מיליון, ומה זה אומר על הצורך במדינה.' },
      { to: '/oct7', img: 'hostagesSquare', label: '7 באוקטובר', text: 'מה קרה, שעה אחר שעה.' },
    ],
    think: [
      'האם ההיסטוריה שקראתם כאן מגובה בממצאים שאפשר לבדוק, כתובות, מסמכים, ארכיונים?',
      'מה ההבדל בין ביקורת על מדיניות של ממשלה לבין שלילת הזכות של עם שלם למדינה?',
      'אילו עמים אחרים מתבקשים להוכיח שהם ״באמת״ שייכים לארצם?',
    ],
  },
  {
    id: 'conflict', to: '/conflict', label: 'הסכסוך', mission: 1,
    title: 'הסכסוך',
    lead: 'מה קורה עכשיו, איך הגענו לכאן, ומה עונים כששואלים.',
    pages: [
      { to: '/conflict-history', img: 'domeRock', label: 'ההיסטוריה של הסכסוך', text: '״פלסטין״, האסלאם והארץ, וכל ההצעות לשלום שנדחו.' },
      { to: '/war', img: 'rocketsGaza', label: 'ציר הזמן הנוכחי', text: 'מ־7 באוקטובר ועד היום: עזה, לבנון, איראן והחטופים.' },
      { to: '/myths', img: 'tunnel', label: 'מיתוסים', text: 'הטענות הנפוצות נגד ישראל, והעובדות.' },
      { to: '/toolkit', img: 'campDavid', label: 'ארגז כלים', text: 'מה עונים, בעשר שניות, בדקה או לעומק.' },
      { to: '/protest', img: 'bringHome', label: 'לפני שיוצאים להפגין', text: 'השאלות שכל מפגין למען פלסטין צריך לשאול את עצמו.' },
    ],
    think: [
      'מי המקור של המספר הזה, ומה בדיוק הוא סופר?',
      'מה קרה רגע לפני התמונה או הסרטון שאתם רואים?',
      'אם הייתה מוצעת מדינה, מי אמר ״כן״ ומי אמר ״לא״?',
    ],
  },
  {
    id: 'world', to: '/world', label: 'מסביב לעולם', mission: 2,
    title: 'מסביב לעולם',
    lead: 'ישראל נשפטת בסטנדרט אחד. העולם, באחר. כאן משווים.',
    pages: [
      { to: '/map', label: 'מפת העולם', text: 'יותר מ־150 סכסוכים מאז 1948, במפה אחת.' },
      { to: '/compare', label: 'טבח, רצח עם ומלחמה', text: 'סוריה, ניגריה, רואנדה, השואה, ומה ההבדל מעזה.' },
      { to: '/law', label: 'משפט בינלאומי', text: 'מידתיות, מגן אנושי, ICJ ו־ICC.' },
      { to: '/gaza-or-not', label: 'עזה או לא?', text: 'תשע תמונות של הרס. אף אחת לא מעזה.' },
    ],
    think: [
      'כמה מחאות, החלטות או כותרות קיבל הסכסוך הזה, ביחס לסכסוכים שבהם נהרגו פי עשרה?',
      'האם אותו כלל משפטי מופעל באותה צורה על כל המדינות?',
      'מה הייתה עושה כל מדינה אחרת אחרי 7 באוקטובר?',
    ],
  },
]

/** Pages outside the three sections, shown beside them in the nav */
export const EXTRA = [
  { to: '/glossary', label: 'מילון' },
  { to: '/quiz', label: 'חידון' },
]
