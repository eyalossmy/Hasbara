import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react'
import { STATUS, type Source, type Status } from '../data/types'

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in)')
    // Siblings that enter together cascade instead of popping in at once
    els.forEach((el) => {
      const sibs = el.parentElement ? [...el.parentElement.children].filter((c) => c.classList.contains('reveal')) : []
      const i = Math.max(0, sibs.indexOf(el))
      el.style.setProperty('--rd', `${Math.min(i, 6) * 80}ms`)
    })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
}

/** Headline that rises in word by word. */
export function Split({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`split ${className ?? ''}`} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className="w" style={{ ['--i' as string]: i }} aria-hidden>{w}</span>
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
    toast('לא הצלחנו להעתיק — סמנו והעתיקו ידנית')
  }
}

export function shareUrl(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text + '\n\n' + window.location.origin)}`
}
