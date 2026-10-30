import { useState } from 'react'
import { PICS, type PicKey } from '../data/images'

/** A real photo or logo, always credited with a link to where it comes from. Graphic photos wait behind a warning. */
/** `credit={false}` drops the credit link, for thumbnails inside a link; the same image appears credited on its own page. */
export default function Pic({ k, alt, className = '', credit = true }: { k: PicKey | string; alt: string; className?: string; credit?: boolean }) {
  const p = (PICS as Record<string, (typeof PICS)[PicKey]>)[k]
  const [shown, setShown] = useState(false)
  if (!p) return null
  const hidden = p.graphic && !shown
  return (
    <figure className={`pic ${p.logo ? 'logo' : ''} ${p.graphic ? 'graphic' : ''} ${hidden ? 'hidden' : ''} ${className}`}>
      <div className="pic-frame">
        <img src={p.src} alt={hidden ? '' : alt} loading="lazy" decoding="async" />
        {hidden && (
          <button className="pic-warn" onClick={() => setShown(true)}>
            <b>תמונה קשה לצפייה</b>
            <span>תיעוד מהטבח. לחצו כדי להציג.</span>
          </button>
        )}
      </div>
      {credit && (
        <figcaption>
          <a href={p.credit} target="_blank" rel="noopener noreferrer">
            {p.logo ? 'לוגו' : 'צילום'}{p.artist && !p.logo ? `: ${p.artist}` : ''}{p.license ? ` · ${p.license}` : ''}
          </a>
        </figcaption>
      )}
    </figure>
  )
}
