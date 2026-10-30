export type Status = 'verified' | 'claim' | 'disputed' | 'unknown' | 'developing'

export const STATUS: Record<Status, { he: string; en: string; desc: string }> = {
  verified: { he: 'עובדה מאומתת', en: 'VERIFIED', desc: 'נתמכת היטב במקורות אמינים ועצמאיים.' },
  claim: { he: 'טענה', en: 'CLAIM', desc: 'טענה של צד מסוים או של מקור מסוים, אנחנו מציינים מי.' },
  disputed: { he: 'במחלוקת', en: 'DISPUTED', desc: 'יש מחלוקת אמיתית בין מקורות או מומחים. נציג את שני הצדדים.' },
  unknown: { he: 'לא ידוע', en: 'UNKNOWN', desc: 'אין כרגע מספיק מידע כדי לקבוע.' },
  developing: { he: 'מתפתח', en: 'DEVELOPING', desc: 'אירוע שעדיין מתפתח, המידע עשוי להשתנות.' },
}

export interface Source {
  label: string
  url: string
}

export const LAST_UPDATED = '30.10.2026'
export const REPO_URL = 'https://github.com/eyalossmy/Hasbara'
