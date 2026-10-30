// Who held the land, period by period, drives the map beside the timeline.
// Ancient borders are approximate; modern ones follow Natural Earth.

export type Period =
  | 'kingdoms' | 'judea' | 'palaestina' | 'empires' | 'ottoman' | 'mandate'
  | 'armistice' | 'sixday' | 'peace' | 'oslo' | 'disengagement' | 'today'

export type Region =
  | 'egypt' | 'sinai' | 'saudi' | 'jordan' | 'syria' | 'lebanon' | 'golan' | 'israel' | 'westbank' | 'gaza'
  | 'philistia' | 'kIsrael' | 'kJudah' | 'judea'

export const COLORS = {
  jewish: '#2456d6',
  jewishDeep: '#173c9c',
  held: '#8fa9ee',
  empire: '#9a9fa8',
  ottoman: '#5d8a84',
  british: '#7656d6',
  britishLight: '#c3b6ef',
  jordan: '#d98a1c',
  egypt: '#c49a4e',
  syria: '#a96b5b',
  pa: '#2f9e6a',
  hamas: '#14532d',
  philistines: '#c4b291',
  /** Striped: Palestinian self-rule in the cities, Israeli control around them */
  mix: 'mix',
}

/** [lon, lat] */
type At = [number, number]

export const CITIES: Record<string, { at: At; name: string }> = {
  jerusalem: { at: [35.22, 31.78], name: 'ירושלים' },
  aelia: { at: [35.22, 31.78], name: 'איליה קפיטולינה' },
  telaviv: { at: [34.78, 32.08], name: 'תל אביב' },
  jaffa: { at: [34.75, 32.05], name: 'יפו' },
  haifa: { at: [34.99, 32.79], name: 'חיפה' },
  acre: { at: [35.07, 32.93], name: 'עכו' },
  beersheba: { at: [34.79, 31.25], name: 'באר שבע' },
  eilat: { at: [34.95, 29.56], name: 'אילת' },
  gaza: { at: [34.45, 31.52], name: 'עזה' },
  hebron: { at: [35.1, 31.53], name: 'חברון' },
  safed: { at: [35.5, 32.96], name: 'צפת' },
  samaria: { at: [35.19, 32.28], name: 'שומרון' },
  caesarea: { at: [34.9, 32.5], name: 'קיסריה' },
  amman: { at: [35.93, 31.95], name: 'עמאן' },
  damascus: { at: [36.29, 33.45], name: 'דמשק' },
}

export interface PeriodInfo {
  years: string
  title: string
  fills: Partial<Record<Region, string>>
  legend: [string, string][]
  /** The answer to "was there a Palestinian state here?" in this period */
  state: { no: boolean; text: string }
  note: string
  cities: (keyof typeof CITIES)[]
  /** Names written on the land: [lon, lat, text, small?] */
  marks?: [number, number, string, boolean?][]
  /** Names on the neighbours; null hides an anachronistic one */
  labels?: Partial<Record<'egypt' | 'sinai' | 'jordan' | 'syria' | 'lebanon', string | null>>
  /** Outline Israel's 1949 lines */
  greenLine?: boolean
}

const ANCIENT = { egypt: null, sinai: null, jordan: null, syria: null, lebanon: null }
const NO_STATE = { no: true, text: 'לא הייתה' }
const MODERN: (keyof typeof CITIES)[] = ['jerusalem', 'telaviv', 'haifa', 'beersheba', 'eilat', 'gaza', 'amman']
const TERRITORIES: [number, number, string, boolean?][] = [[34.88, 30.75, 'ישראל'], [35.3, 32.22, 'יהודה ושומרון', true], [35.78, 33.05, 'הגולן', true]]

export const PERIODS: Record<Period, PeriodInfo> = {
  kingdoms: {
    years: '~1000–586 לפנה״ס',
    title: 'ממלכות ישראל ויהודה',
    fills: { kIsrael: COLORS.jewish, kJudah: COLORS.jewishDeep, philistia: COLORS.philistines },
    legend: [[COLORS.jewish, 'ממלכת ישראל, ובירתה שומרון'], [COLORS.jewishDeep, 'ממלכת יהודה, ובירתה ירושלים'], [COLORS.philistines, 'הפלשתים, עם ים־תיכוני שנעלם']],
    state: NO_STATE,
    note: 'כאן נולד העם היהודי, וכאן קמו ממלכותיו. הפלשתים, שעל שמם תיקרא הארץ מאות שנים אחר כך, נעלמו מההיסטוריה במאה ה־6 לפנה״ס, ואין להם שום קשר לפלסטינים של היום.',
    cities: ['jerusalem', 'samaria', 'gaza'],
    marks: [[35.42, 32.55, 'ישראל'], [35.08, 31.42, 'יהודה'], [34.36, 31.62, 'פלשת', true]],
    labels: ANCIENT,
  },
  judea: {
    years: '~538 לפנה״ס–135 לספירה',
    title: 'ארץ יהודה',
    fills: { judea: COLORS.jewish },
    legend: [[COLORS.jewish, 'יהודה בשיא התפשטותה, בימי החשמונאים והורדוס']],
    state: NO_STATE,
    note: 'אחרי שיבת ציון היהודים שוב ריבונים בארצם: מדינה עצמאית בימי החשמונאים, ואחר כך ממלכה תחת חסות רומא. שם הארץ, יהודה.',
    cities: ['jerusalem', 'caesarea', 'gaza'],
    marks: [[35.12, 31.42, 'יהודה'], [35.38, 32.82, 'הגליל', true]],
    labels: ANCIENT,
  },
  palaestina: {
    years: '135–636',
    title: 'רומא מוחקת את השם ״יהודה״',
    fills: { judea: COLORS.empire },
    legend: [[COLORS.empire, 'הפרובינציה הרומית ״סוריה פלשתינה״, ואחריה ביזנטיון']],
    state: NO_STATE,
    note: 'אחרי מרד בר כוכבא רומא קראה לארץ ״סוריה פלשתינה״, על שם אויבי היהודים הקדומים, ולירושלים ״איליה קפיטולינה״. לפי רוב ההיסטוריונים, המטרה הייתה לנתק את היהודים מארצם.',
    cities: ['aelia', 'caesarea'],
    marks: [[35.05, 31.2, 'סוריה פלשתינה']],
    labels: ANCIENT,
  },
  empires: {
    years: '636–1517',
    title: 'ח׳ליפים, צלבנים וממלוכים',
    fills: { israel: COLORS.empire, westbank: COLORS.empire, gaza: COLORS.empire, golan: COLORS.empire, jordan: COLORS.empire, syria: COLORS.empire, lebanon: COLORS.empire },
    legend: [[COLORS.empire, 'ח׳ליפויות ערביות, צלבנים וממלוכים, שליטים זרים שהתחלפו']],
    state: NO_STATE,
    note: 'אחרי הכיבוש המוסלמי הארץ עברה מיד ליד: ח׳ליפים מדמשק, מבגדד ומקהיר, צלבנים מאירופה וממלוכים ממצרים. אף שליט מוסלמי לא הפך את ירושלים לבירתו, את זה עשו רק היהודים, ולזמן קצר הצלבנים.',
    cities: ['jerusalem', 'acre', 'gaza', 'damascus'],
    labels: { egypt: 'מצרים', sinai: null, jordan: null, syria: null, lebanon: null },
  },
  ottoman: {
    years: '1517–1917',
    title: '400 שנה עות׳מאניות',
    fills: { israel: COLORS.ottoman, westbank: COLORS.ottoman, gaza: COLORS.ottoman, golan: COLORS.ottoman, jordan: COLORS.ottoman, syria: COLORS.ottoman, lebanon: COLORS.ottoman },
    legend: [[COLORS.ottoman, 'האימפריה העות׳מאנית, נשלטה מאיסטנבול']],
    state: NO_STATE,
    note: 'הארץ הייתה פינה נידחת של אימפריה טורקית, מחולקת בין כמה מחוזות. לא היה בה מחוז בשם ״פלסטין״ ולא קם בה שום שלטון מקומי, ועוד ב־1919 ראו בה מנהיגי הערבים המקומיים ״סוריה הדרומית״.',
    cities: ['jerusalem', 'jaffa', 'acre', 'safed', 'hebron', 'gaza', 'damascus'],
    marks: [[34.95, 31.05, 'סנג׳ק ירושלים', true], [35.32, 32.62, 'וילאיט ביירות', true]],
    labels: { egypt: 'מצרים', sinai: null, jordan: null, syria: null, lebanon: null },
  },
  mandate: {
    years: '1920–1948',
    title: 'המנדט הבריטי',
    fills: { israel: COLORS.british, westbank: COLORS.british, gaza: COLORS.british, jordan: COLORS.britishLight },
    legend: [[COLORS.british, 'ארץ ישראל המנדטורית, ״פלשתינה (א״י)״'], [COLORS.britishLight, 'עבר הירדן, הוצא ב־1922 מתחום הבית הלאומי היהודי, וב־1946 הפך לממלכת ירדן']],
    state: NO_STATE,
    note: 'בימי המנדט ״פלסטיני״ היה כל תושב הארץ, גם היהודים: ה״פלסטיין פוסט״ (היום ״ג׳רוזלם פוסט״) והתזמורת הפלסטינית (היום הפילהרמונית הישראלית) היו מוסדות יהודיים. ההנהגה הערבית דחתה את החלוקה ב־1937 וב־1947.',
    cities: ['jerusalem', 'telaviv', 'haifa', 'gaza', 'beersheba', 'amman'],
    marks: [[34.85, 30.65, 'פלשתינה (א״י)']],
    labels: { jordan: 'עבר הירדן', syria: 'סוריה (צרפת)', lebanon: 'לבנון (צרפת)' },
  },
  armistice: {
    years: '1949–1967',
    title: 'ישראל קמה, ירדן ומצרים כובשות',
    fills: { israel: COLORS.jewish, westbank: COLORS.jordan, jordan: COLORS.jordan, gaza: COLORS.egypt, sinai: COLORS.egypt, egypt: COLORS.egypt, golan: COLORS.syria, syria: COLORS.syria },
    legend: [[COLORS.jewish, 'ישראל, בקווי שביתת הנשק (״הקו הירוק״)'], [COLORS.jordan, 'ירדן, כבשה וסיפחה את יהודה ושומרון ומזרח ירושלים'], [COLORS.egypt, 'מצרים, כבשה את רצועת עזה'], [COLORS.syria, 'סוריה, רמת הגולן']],
    state: NO_STATE,
    note: '19 שנה השטחים היו בידי ירדן ומצרים, ואיש לא הקים בהם מדינה פלסטינית, וגם לא דרש. אמנת אש״ף מ־1964 אף קבעה במפורש שהארגון אינו תובע ריבונות על הגדה ועל עזה.',
    cities: MODERN,
    marks: [[34.88, 30.75, 'ישראל'], [35.3, 32.22, 'הגדה (ירדן)', true]],
  },
  sixday: {
    years: '1967–1982',
    title: 'אחרי ששת הימים',
    fills: { israel: COLORS.jewish, westbank: COLORS.held, gaza: COLORS.held, sinai: COLORS.held, golan: COLORS.held },
    legend: [[COLORS.jewish, 'ישראל'], [COLORS.held, 'בשליטת ישראל, נלקחו מירדן, ממצרים ומסוריה']],
    state: NO_STATE,
    note: 'השטחים לא נלקחו מ״פלסטין״. הם נלקחו מירדן, ממצרים ומסוריה, שיצאו למלחמה נגד ישראל, ומדינה פלסטינית לא הייתה בהם אף פעם.',
    cities: MODERN,
    marks: [...TERRITORIES, [33.75, 30.2, 'סיני']],
    labels: { sinai: null },
    greenLine: true,
  },
  peace: {
    years: '1982–1994',
    title: 'שלום עם מצרים',
    fills: { israel: COLORS.jewish, westbank: COLORS.held, gaza: COLORS.held, golan: COLORS.jewish },
    legend: [[COLORS.jewish, 'ישראל, כולל רמת הגולן (מ־1981)'], [COLORS.held, 'בשליטת ישראל, יהודה ושומרון ועזה']],
    state: NO_STATE,
    note: 'תמורת שלום ישראל החזירה את כל חצי האי סיני, שטח גדול פי שלושה משטחה. כשיש פרטנר, יש שלום.',
    cities: MODERN,
    marks: TERRITORIES,
    greenLine: true,
  },
  oslo: {
    years: '1994–2005',
    title: 'הסכמי אוסלו',
    fills: { israel: COLORS.jewish, golan: COLORS.jewish, westbank: COLORS.mix, gaza: COLORS.mix },
    legend: [[COLORS.pa, 'הרשות הפלסטינית, הערים (שטחי A ו־B)'], [COLORS.held, 'ישראל, שטחי C, היישובים והגבולות']],
    state: { no: false, text: 'שלטון עצמי, לא מדינה' },
    note: 'לראשונה בהיסטוריה יש לפלסטינים שלטון משלהם, וזה קרה בזכות הסכם עם ישראל. ב־2000 וב־2008 הוצעה להם מדינה, והם דחו את ההצעות.',
    cities: MODERN,
    marks: TERRITORIES,
    greenLine: true,
  },
  disengagement: {
    years: '2005–2007',
    title: 'ישראל יוצאת מעזה',
    fills: { israel: COLORS.jewish, golan: COLORS.jewish, westbank: COLORS.mix, gaza: COLORS.pa },
    legend: [[COLORS.pa, 'הרשות הפלסטינית, כל רצועת עזה'], [COLORS.mix, 'יהודה ושומרון, הרשות בערים, ישראל בשטחי C']],
    state: { no: false, text: 'שלטון עצמי, לא מדינה' },
    note: 'ישראל פינתה את כל 21 היישובים ואת כל חייליה מרצועת עזה, עד המטר האחרון. כ־8,000 ישראלים עזבו את בתיהם.',
    cities: MODERN,
    marks: TERRITORIES,
    greenLine: true,
  },
  today: {
    years: '2007–היום',
    title: 'היום',
    fills: { israel: COLORS.jewish, golan: COLORS.jewish, westbank: COLORS.mix, gaza: COLORS.hamas },
    legend: [[COLORS.hamas, 'חמאס, השתלט על עזה בכוח ב־2007'], [COLORS.mix, 'יהודה ושומרון, הרשות בערים, ישראל בשטחי C'], [COLORS.jewish, 'ישראל']],
    state: { no: false, text: 'שלטון עצמי, לא מדינה' },
    note: 'השטח שישראל יצאה ממנו לא הפך לסינגפור, הוא הפך לבסיס טרור: אלפי רקטות, מאות קילומטרים של מנהרות, ובסוף הטבח של 7 באוקטובר.',
    cities: MODERN,
    marks: TERRITORIES,
    greenLine: true,
  },
}
