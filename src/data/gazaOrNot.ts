import type { Source } from './types'

// "Gaza or not?" — photos that get passed around as Gaza. None of them is.
export interface GazaPhoto {
  img: string
  alt: string
  place: string
  when: string
  /** Who started the war that did this */
  started: string
  /** The one number that sticks */
  toll?: string
  text: string
  /** What to take away */
  point: string
  sources: Source[]
}

export const GAZA_OR_NOT: GazaPhoto[] = [
  {
    img: '/gaza-or-not/mosul.jpg',
    alt: 'עיר עתיקה הרוסה, ובמרכזה כיפת מסגד ירוקה מנוקבת',
    place: 'מוסול, עיראק',
    when: '2017',
    started: 'דאע״ש',
    toll: 'כ־9,000–11,000 אזרחים נהרגו',
    text: 'הקרב לשחרור מוסול מידי דאע״ש: צבא עיראק וקואליציה בהובלת ארה״ב נלחמו תשעה חודשים מבית לבית. דאע״ש החזיק אזרחים כמגן אנושי, ממש כמו חמאס — והעיר העתיקה נמחקה כמעט כולה.',
    point: 'איש לא האשים את המשחררים ב״רצח עם״. ברור לכולם שהאחריות על מי שהפך עיר לבסיס צבאי.',
    sources: [
      { label: 'הקרב על מוסול (ויקיפדיה)', url: 'https://en.wikipedia.org/wiki/Battle_of_Mosul_(2016%E2%80%932017)' },
    ],
  },
  {
    img: '/gaza-or-not/cairo.jpg',
    alt: 'צילום אוויר של עיר צפופה מאוד, בניינים צמודים זה לזה עד האופק',
    place: 'קהיר, מצרים',
    when: 'היום',
    started: 'אין כאן מלחמה',
    text: 'זו לא הריסה — זו צפיפות. ״עזה היא המקום הצפוף בעולם״ היא אחת הטענות הנפוצות, והיא פשוט לא נכונה: ברצועה כ־5,900 תושבים לקמ״ר. בתל אביב כ־8,700, ובסינגפור כ־7,800. ובשכונות של קהיר — הרבה יותר.',
    point: 'וגם: מצרים, ולא רק ישראל, שולטת במעבר הגבול של עזה — וסוגרת אותו. על המצור של קהיר כמעט אף אחד לא מפגין.',
    sources: [
      { label: 'רשימת המדינות לפי צפיפות (ויקיפדיה)', url: 'https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population_density' },
    ],
  },
  {
    img: '/gaza-or-not/dresden.jpg',
    alt: 'חשמליות צהובות ברחוב הרוס, הריסות בניינים מסביב',
    place: 'דרזדן, גרמניה',
    when: '1945',
    started: 'גרמניה הנאצית',
    toll: 'עד 25,000 הרוגים בלילה אחד',
    text: 'בפברואר 1945 הפציצו בעלות הברית את דרזדן, ולילה אחד של הפצצות הפך את מרכז העיר לעיי חורבות. גרמניה הנאצית פתחה במלחמת העולם השנייה שש שנים קודם לכן.',
    point: 'גרמניה לא בנתה זהות על ״הנכבה של דרזדן״. היא לקחה אחריות, נבנתה מחדש — והיום היא אחת המדינות העשירות בעולם.',
    sources: [
      { label: 'ההפצצה על דרזדן (ויקיפדיה)', url: 'https://en.wikipedia.org/wiki/Bombing_of_Dresden' },
    ],
  },
  {
    img: '/gaza-or-not/milan.jpg',
    alt: 'בתים הרוסים ותלי אבנים, ומאחור צריחי קתדרלה גותית',
    place: 'מילאנו, איטליה',
    when: '1943',
    started: 'איטליה הפשיסטית',
    text: 'בקיץ 1943 הפציצו בעלות הברית את מילאנו שוב ושוב. רובעים שלמים נהרסו, וגם בית האופרה לה סקאלה נפגע. איטליה של מוסוליני הצטרפה למלחמה לצד היטלר ב־1940.',
    point: 'מי שמצטרף למלחמה נושא באחריות לתוצאות שלה. איטליה הבינה את זה, החליפה את המשטר — והפכה לדמוקרטיה.',
    sources: [
      { label: 'ההפצצות על מילאנו (ויקיפדיה)', url: 'https://en.wikipedia.org/wiki/Bombing_of_Milan_in_World_War_II' },
    ],
  },
  {
    img: '/gaza-or-not/hamburg.jpg',
    alt: 'שלד של בניין רב קומות מעל ים של הריסות, בשחור לבן',
    place: 'המבורג, גרמניה',
    when: '1943',
    started: 'גרמניה הנאצית',
    toll: 'כ־37,000 הרוגים בשבוע אחד',
    text: 'במבצע ״עמורה״ ביולי 1943 הפציצו בריטניה וארה״ב את המבורג במשך שבוע, וסופת אש שרפה שכונות שלמות. זו אחת ההפצצות הקטלניות בהיסטוריה.',
    point: 'אף אחד לא אומר שבריטניה ״התחילה״ את המלחמה בגלל המבורג. מי שפותח במלחמה — אחראי לה.',
    sources: [
      { label: 'מבצע עמורה (ויקיפדיה)', url: 'https://en.wikipedia.org/wiki/Bombing_of_Hamburg_in_World_War_II' },
    ],
  },
]
