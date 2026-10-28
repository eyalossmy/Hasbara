import { useEffect, useRef, useState, type ReactNode } from 'react'
import { STATUS, type Source, type Status } from '../data/types'

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
}

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`badge ${status}`} title={STATUS[status].desc}>{STATUS[status].he}</span>
}

export function PageHero({ eyebrow, title, lead, emoji, children }: { eyebrow: string; title: ReactNode; lead: ReactNode; emoji?: string; children?: ReactNode }) {
  return (
    <header className="page-hero">
      <div className="grid-bg" />
      <div className="glow a" /><div className="glow b" />
      <div className="container">
        {emoji && <div className="hero-emoji" aria-hidden>{emoji}</div>}
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {children}
      </div>
    </header>
  )
}

export function SourceLinks({ sources }: { sources: Source[] }) {
  return (
    <div className="sources">
      {sources.map((s) => (
        <a key={s.url} className="src" href={s.url} target="_blank" rel="noopener noreferrer">🔗 {s.label}</a>
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
    toast('הועתק! עכשיו לכו להסביר 💪')
  } catch {
    toast('לא הצלחנו להעתיק — סמנו והעתיקו ידנית')
  }
}

export function shareUrl(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text + '\n\n' + window.location.origin)}`
}
