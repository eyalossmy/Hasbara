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
