import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { STATUS, type Source, type Status } from '../data/types'

// One observer for the whole site; pages re-render often (the timeline on every scroll step), so each pass only picks up new elements
let revealIO: IntersectionObserver | undefined
const seen = new WeakSet<Element>()

export function useReveal() {
  useEffect(() => {
    revealIO ??= new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); revealIO!.unobserve(e.target) }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach((el) => {
      if (seen.has(el)) return
      seen.add(el)
      // Siblings that enter together cascade instead of popping in at once
      let i = 0
      for (let p = el.previousElementSibling; p && i < 6; p = p.previousElementSibling) if (p.classList.contains('reveal')) i++
      el.style.setProperty('--rd', `${i * 60}ms`)
      revealIO!.observe(el)
    })
  })
}

/** Headline that rises in word by word. */
export function Split({ text, className, start = 0 }: { text: string; className?: string; start?: number }) {
  return (
    <span className={`split ${className ?? ''}`} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className="w" style={{ ['--i' as string]: i + start }} aria-hidden>{w}</span>
        </Fragment>
      ))}
    </span>
  )
}

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`badge ${status}`} title={STATUS[status].desc}>{STATUS[status].he}</span>
}

export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: ReactNode; children?: ReactNode }) {
  return (
    <header className="page-hero">
      <div className="container">
        <span className="eyebrow fade-up" style={{ ['--d' as string]: '0s' }}>{eyebrow}</span>
        <h1><Split text={title} /></h1>
        <p className="lead fade-up" style={{ ['--d' as string]: '.45s' }}>{lead}</p>
        {children}
      </div>
    </header>
  )
}

export function SourceLinks({ sources }: { sources: Source[] }) {
  return (
    <div className="sources">
      {sources.map((s) => (
        <a key={s.url} className="src" href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
      ))}
    </div>
  )
}

export function CountUp({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const dur = 1600
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur)
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{prefix}{val.toLocaleString('en-US')}{suffix}</span>
}

// A sentence that talks about killing, its numbers are the point and get bolded
const DEATH = /הרוג|נהרג|נרצח|רצח|נפל|מתו|קורבנ|טבח|להורג|חלל/
const NOUN = /\s(?:הרוגים|הרוג|בני אדם|אזרחים|ישראלים|יהודים|פלסטינים|חיילים|ילדים|איש|נפש|קורבנות|לוחמים)$/
const TOLL = /(?:(?:יותר מ|פחות מ|למעלה מ|לפחות |מעל |עד |כ)[־-]?)?(?:\d+(?:[,.]\d+)*(?:[–-]\d+(?:[,.]\d+)*)?(?:\s(?:אלף|מיליון))?|(?:מאות|עשרות)\s(?:אלפי|אלפים)|אלפי|מיליוני)(?:\s(?:הרוגים|הרוג|בני אדם|אזרחים|ישראלים|יהודים|פלסטינים|חיילים|ילדים|איש|נפש|קורבנות|לוחמים))?(?!\s(?:ימים|שנים|שעות|מושבים))/g
const YEARS = /^\d{4}(?:[–-]\d{4})?$/
/** Years, dates and other small bare numbers are not tolls */
const notToll = (m: string) => YEARS.test(m) || (!NOUN.test(m) && /^\d{1,2}$/.test(m))

function tolls(text: string, key: string) {
  return text.split(/(?<=[.!?])(\s+)/).flatMap((sentence, si) => {
    if (!DEATH.test(sentence)) return [sentence]
    const out: ReactNode[] = []
    let last = 0
    for (const m of sentence.matchAll(TOLL)) {
      if (notToll(m[0])) continue
      out.push(sentence.slice(last, m.index), <b key={`${key}-${si}-${m.index}`}>{m[0]}</b>)
      last = m.index! + m[0].length
    }
    out.push(sentence.slice(last))
    return out
  })
}

/** Text with **marked** phrases and death tolls in bold. */
export function Emph({ text }: { text: string }) {
  return <>{text.split(/\*\*(.+?)\*\*/).flatMap((part, i): ReactNode[] => (i % 2 ? [<b key={i}>{part}</b>] : tolls(part, String(i))))}</>
}

/** Whether a line carries a marked phrase or a death toll, the facts that must stay in view. */
export const isKeyFact = (text: string) => text.includes('**') || DEATH.test(text)

let toastTimer: number | undefined
export function toast(msg: string) {
  let el = document.getElementById('toast')
  if (!el) {
    el = document.createElement('div')
    el.id = 'toast'
    el.className = 'toast'
    el.setAttribute('role', 'status')
    document.body.appendChild(el)
  }
  el.textContent = msg
  el.classList.add('show')
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => el!.classList.remove('show'), 2200)
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast('הועתק')
  } catch {
    toast('לא הצלחנו להעתיק, סמנו והעתיקו ידנית')
  }
}

export function shareUrl(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text + '\n\n' + window.location.origin)}`
}

/** Switch between the two quizzes. */
export function QuizTabs() {
  return (
    <div className="quiz-tabs">
      <NavLink to="/quiz" end>חידון ידע</NavLink>
      <NavLink to="/gaza-or-not">עזה או לא?</NavLink>
    </div>
  )
}

/** The checks to run before believing or sharing anything, shown at the end of both quizzes. */
export const FAKE_CHECKS: [string, string][] = [
  ['עצרו לפני שאתם משתפים', 'פייק ניוז בנוי לעורר כעס מיד. אם פוסט גורם לכם לרתוח, זה בדיוק הרגע לבדוק.'],
  ['חיפוש תמונה הפוך', 'Google Lens או TinEye מראים בשנייה איפה ומתי תמונה הופיעה לראשונה. רוב התמונות המזויפות ״מעזה״ נחשפות כך.'],
  ['מי צילם, איפה ומתי?', 'תמונה בלי צלם, בלי תאריך ובלי מקום היא לא ראיה. היא תעמולה.'],
  ['מי המקור למספר?', '״משרד הבריאות בעזה״ הוא חמאס. ״לפי דיווחים״ זה לא מקור. חפשו מי סופר, ומה בדיוק.'],
  ['מה קרה רגע לפני?', 'סרטון חתוך מספר חצי סיפור. חפשו את הגרסה המלאה ואת ההקשר.'],
  ['גם לנו', 'גם פייק לטובת ישראל הוא פייק. מי שמשתף שקר ״בצד הנכון״ מאבד את האמינות של כולנו.'],
]

export function FakeNewsCheck({ title = 'ככה עובד פייק ניוז. ככה עוצרים אותו.' }: { title?: string }) {
  return (
    <div className="fake-check">
      <span className="think-k">לחשוב ביקורתית</span>
      <h3>{title}</h3>
      <div className="gon-tips">
        {FAKE_CHECKS.map(([t, d]) => <div key={t} className="gon-tip"><b>{t}</b><span>{d}</span></div>)}
      </div>
      <SourceLinks sources={[
        { label: 'Google Lens: חיפוש לפי תמונה', url: 'https://lens.google/' },
        { label: 'TinEye: חיפוש תמונה הפוך', url: 'https://tineye.com/' },
        { label: 'אל־אהלי: איך כותרת שקרית הקיפה את העולם (HRW)', url: 'https://www.hrw.org/news/2023/11/26/gaza-findings-october-17-al-ahli-hospital-explosion' },
      ]} />
    </div>
  )
}
