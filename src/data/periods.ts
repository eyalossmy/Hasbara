// Who held the land, period by period — drives the map beside the timeline.
// Ancient borders are approximate; modern ones follow Natural Earth.

export type Period =
  | 'kingdoms' | 'judea' | 'palaestina' | 'empires' | 'mandate'
  | 'armistice' | 'sixday' | 'peace' | 'oslo' | 'disengagement' | 'today'

export type Region =
  | 'egypt' | 'sinai' | 'saudi' | 'jordan' | 'syria' | 'lebanon' | 'golan' | 'israel' | 'westbank' | 'gaza'
  | 'philistia' | 'kIsrael' | 'kJudah' | 'judea'

export const COLORS = {
  jewish: '#2456d6',
  jewishDeep: '#173c9c',
  held: '#8fa9ee',
  empire: '#9a9fa8',
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

export interface PeriodInfo {
  years: string
  title: string
  fills: Partial<Record<Region, string>>
  legend: [string, string][]
  /** The answer to "was there a Palestinian state here?" in this period */
  state: { no: boolean; text: string }
  note: string
  /** Names on the neighbours; null hides an anachronistic one */
  labels?: Partial<Record<'egypt' | 'sinai' | 'jordan' | 'syria' | 'lebanon', string | null>>
}

const ANCIENT = { egypt: null, sinai: null, jordan: null, syria: null, lebanon: null }
const NO_STATE = { no: true, text: 'לא הייתה' }

export const PERIODS: Record<Period, PeriodInfo> = {
  kingdoms: {
    years: '~1000–586 לפנה״ס',
    title: 'ממלכות ישראל ויהודה',
    fills: { kIsrael: COLORS.jewish, kJudah: COLORS.jewishDeep, philistia: COLORS.philistines },
    legend: [[COLORS.jewish, 'ממלכת ישראל'], [COLORS.jewishDeep, 'ממלכת יהודה, ובירתה ירושלים'], [COLORS.philistines, 'הפלשתים — עם ים־תיכוני שנעלם']],
    state: NO_STATE,
    note: 'הפלשתים, שעל שמם רומא קראה לארץ מאות שנים אחר כך, ישבו ברצועת החוף ונעלמו מההיסטוריה במאה ה־6 לפנה״ס. אין קשר בינם לבין הפלסטינים של היום.',
    labels: ANCIENT,
  },
  judea: {
    years: '~538 לפנה״ס–135 לספירה',
    title: 'יהודה — ארץ היהודים',
    fills: { judea: COLORS.jewish },
    legend: [[COLORS.jewish, 'יהודה בשיאה, בימי החשמונאים והורדוס']],
    state: NO_STATE,
    note: 'עצמאות בימי החשמונאים, ואחר כך ממלכה ופרובינציה תחת רומא. שם הארץ היה ״יהודה״ — ארץ היהודים.',
    labels: ANCIENT,
  },
  palaestina: {
    years: '135–636',
    title: '״סוריה פלשתינה״ — שם שרומא הדביקה',
    fills: { judea: COLORS.empire },
    legend: [[COLORS.empire, 'האימפריה הרומית, ואחריה ביזנטיון']],
    state: NO_STATE,
    note: 'אחרי מרד בר כוכבא רומא מחקה את השם ״יהודה״ וקראה לארץ על שם הפלשתים. ״פלשתינה״ היה שם של מחוז אימפריאלי — לא של עם ולא של מדינה.',
    labels: ANCIENT,
  },
  empires: {
    years: '636–1917',
    title: 'פרובינציה של אימפריות',
    fills: { israel: COLORS.empire, westbank: COLORS.empire, gaza: COLORS.empire, golan: COLORS.empire, jordan: COLORS.empire, syria: COLORS.empire, lebanon: COLORS.empire },
    legend: [[COLORS.empire, 'ערבים, צלבנים, ממלוכים ועות׳מאנים — בזה אחר זה']],
    state: NO_STATE,
    note: 'הארץ חולקה למחוזות שנוהלו מבירות רחוקות. לא קמה כאן שום מדינה ערבית או פלסטינית; עוד ב־1919 דרש הקונגרס הערבי הפלסטיני הראשון לצרף את הארץ ל״סוריה הדרומית״.',
    labels: { egypt: 'מצרים', sinai: null, jordan: null, syria: null, lebanon: null },
  },
  mandate: {
    years: '1920–1948',
    title: 'המנדט הבריטי',
    fills: { israel: COLORS.british, westbank: COLORS.british, gaza: COLORS.british, jordan: COLORS.britishLight },
    legend: [[COLORS.british, 'המנדט הבריטי על ארץ ישראל'], [COLORS.britishLight, 'עבר הירדן — הופרד ב־1922 ונמסר לאמיר עבדאללה']],
    state: NO_STATE,
    note: 'בתקופת המנדט ״פלסטינאי״ היה כל תושב הארץ, גם היהודים: ה״פלסטיין פוסט״ והתזמורת הפלסטינית היו מוסדות יהודיים. הצד הערבי דחה את הצעות החלוקה של 1937 ושל 1947.',
    labels: { jordan: 'עבר הירדן', syria: 'סוריה (צרפת)', lebanon: 'לבנון (צרפת)' },
  },
  armistice: {
    years: '1949–1967',
    title: 'קווי שביתת הנשק',
    fills: { israel: COLORS.jewish, westbank: COLORS.jordan, jordan: COLORS.jordan, gaza: COLORS.egypt, sinai: COLORS.egypt, egypt: COLORS.egypt, golan: COLORS.syria, syria: COLORS.syria },
    legend: [[COLORS.jewish, 'ישראל'], [COLORS.jordan, 'ירדן — סיפחה את יהודה ושומרון ומזרח ירושלים'], [COLORS.egypt, 'מצרים — שלטה ברצועת עזה'], [COLORS.syria, 'סוריה — רמת הגולן']],
    state: NO_STATE,
    note: '19 שנה ירדן ומצרים החזיקו בשטחים — ואף אחת מהן לא הקימה בהם מדינה פלסטינית. אמנת אש״ף מ־1964 אף קבעה שהארגון אינו תובע ריבונות על הגדה ועל עזה.',
  },
  sixday: {
    years: '1967–1982',
    title: 'אחרי מלחמת ששת הימים',
    fills: { israel: COLORS.jewish, westbank: COLORS.held, gaza: COLORS.held, sinai: COLORS.held, golan: COLORS.held },
    legend: [[COLORS.jewish, 'ישראל'], [COLORS.held, 'בשליטת ישראל — נלקחו מירדן, ממצרים ומסוריה']],
    state: NO_STATE,
    note: 'השטחים לא נלקחו מ״פלסטין״. הם נלקחו ממדינות שיצאו למלחמה נגד ישראל — ומדינה פלסטינית לא הייתה בהם מעולם.',
  },
  peace: {
    years: '1982–1994',
    title: 'סיני חוזר למצרים',
    fills: { israel: COLORS.jewish, westbank: COLORS.held, gaza: COLORS.held, golan: COLORS.jewish },
    legend: [[COLORS.jewish, 'ישראל, כולל רמת הגולן'], [COLORS.held, 'בשליטת ישראל']],
    state: NO_STATE,
    note: 'תמורת שלום החזירה ישראל את כל סיני — שטח גדול פי שלושה ממנה. אדמה תמורת שלום עבדה כשהיה פרטנר.',
  },
  oslo: {
    years: '1994–2005',
    title: 'הסכמי אוסלו',
    fills: { israel: COLORS.jewish, golan: COLORS.jewish, westbank: COLORS.mix, gaza: COLORS.mix },
    legend: [[COLORS.pa, 'הרשות הפלסטינית — שלטון עצמי בערים'], [COLORS.held, 'שליטה ישראלית — שטחי C, יישובים וגבולות']],
    state: { no: false, text: 'שלטון עצמי — לראשונה בהיסטוריה' },
    note: 'לראשונה אי־פעם קם שלטון פלסטיני — מכוח הסכם עם ישראל. ב־2000 וב־2008 הוצעה לפלסטינים מדינה, וההצעות נדחו.',
  },
  disengagement: {
    years: '2005–2007',
    title: 'ההתנתקות',
    fills: { israel: COLORS.jewish, golan: COLORS.jewish, westbank: COLORS.mix, gaza: COLORS.pa },
    legend: [[COLORS.pa, 'הרשות הפלסטינית — כל רצועת עזה'], [COLORS.held, 'שליטה ישראלית ביהודה ושומרון (שטחי C)']],
    state: { no: false, text: 'שלטון עצמי, לא מדינה' },
    note: 'ישראל יצאה מכל רצועת עזה: 21 יישובים פונו וכ־8,000 ישראלים עזבו את בתיהם. עזה נמסרה לרשות הפלסטינית.',
  },
  today: {
    years: '2007–היום',
    title: 'היום',
    fills: { israel: COLORS.jewish, golan: COLORS.jewish, westbank: COLORS.mix, gaza: COLORS.hamas },
    legend: [[COLORS.hamas, 'חמאס — השתלט על עזה בכוח ב־2007'], [COLORS.pa, 'הרשות הפלסטינית — ערי יהודה ושומרון'], [COLORS.held, 'שליטה ישראלית (שטחי C)']],
    state: { no: false, text: 'שלטון עצמי, לא מדינה' },
    note: 'השטח שישראל יצאה ממנו הפך לבסיס שיגור: אלפי רקטות, מנהרות — ובסוף הטבח של 7 באוקטובר.',
  },
}
