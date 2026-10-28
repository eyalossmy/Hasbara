import 'flag-icons/css/flag-icons.min.css'
import type { Actor } from '../data/conflicts'

// Flags flag-icons doesn't ship, drawn at its 4:3 ratio.
const CUSTOM = {
  somaliland: (
    <svg viewBox="0 0 24 18" aria-hidden>
      <rect width="24" height="6" fill="#00813d" /><rect y="6" width="24" height="6" fill="#fff" /><rect y="12" width="24" height="6" fill="#d21034" />
      <path d="M12 7.1l.7 2.1h2.2l-1.8 1.3.7 2.1-1.8-1.3-1.8 1.3.7-2.1-1.8-1.3h2.2z" fill="#000" />
    </svg>
  ),
  yugoslavia: (
    <svg viewBox="0 0 24 18" aria-hidden>
      <rect width="24" height="6" fill="#0c4076" /><rect y="6" width="24" height="6" fill="#fff" /><rect y="12" width="24" height="6" fill="#c6363c" />
      <path d="M12 5.2l1.1 3.3h3.5l-2.8 2.1 1.1 3.3-2.9-2.1-2.9 2.1 1.1-3.3-2.8-2.1h3.5z" fill="#c6363c" stroke="#fcd116" strokeWidth=".5" />
    </svg>
  ),
  ussr: (
    <svg viewBox="0 0 24 18" aria-hidden>
      <rect width="24" height="18" fill="#cc0000" />
      <path d="M4.5 2.2l.4 1.1h1.2l-1 .7.4 1.1-1-.7-1 .7.4-1.1-1-.7h1.2z" fill="#ffd700" />
      <path d="M3.2 8.6l3.4-3.1.6.6-3.4 3.1zM5.4 5.4a2.6 2.6 0 1 1-1.7 4.3l.5-.5a1.9 1.9 0 1 0 1.2-3.1z" fill="#ffd700" />
    </svg>
  ),
  southvietnam: (
    <svg viewBox="0 0 24 18" aria-hidden>
      <rect width="24" height="18" fill="#ffcd00" /><rect y="6.2" width="24" height="1.2" fill="#da251d" /><rect y="8.4" width="24" height="1.2" fill="#da251d" /><rect y="10.6" width="24" height="1.2" fill="#da251d" />
    </svg>
  ),
  biafra: (
    <svg viewBox="0 0 24 18" aria-hidden>
      <rect width="24" height="6" fill="#d21034" /><rect y="6" width="24" height="6" fill="#000" /><rect y="12" width="24" height="6" fill="#00813d" />
      <path d="M8 12a4 4 0 0 1 8 0z" fill="#fcd116" />
    </svg>
  ),
  oldsa: (
    <svg viewBox="0 0 24 18" aria-hidden>
      <rect width="24" height="6" fill="#ff7f00" /><rect y="6" width="24" height="6" fill="#fff" /><rect y="12" width="24" height="6" fill="#002395" />
    </svg>
  ),
}

function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 > 160
}

export default function Flag({ actor, size = 'md' }: { actor: Actor; size?: 'sm' | 'md' }) {
  const cls = `flag flag-${size}`
  if (actor.flag) return <span className={`${cls} fi fi-${actor.flag}`} role="img" aria-label={actor.name} />
  if (actor.svg) return <span className={cls} role="img" aria-label={actor.name}>{CUSTOM[actor.svg]}</span>
  return (
    <span className={`${cls} flag-badge`} style={{ background: actor.badge!.color, color: isLight(actor.badge!.color) ? '#111827' : '#fff' }} role="img" aria-label={actor.name}>
      {actor.badge!.text}
    </span>
  )
}
