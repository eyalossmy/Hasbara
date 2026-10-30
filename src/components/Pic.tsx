import { PICS, type PicKey } from '../data/images'

/** A real photo or logo, always credited with a link to where it comes from. */
export default function Pic({ k, alt, className = '' }: { k: PicKey | string; alt: string; className?: string }) {
  const p = (PICS as Record<string, (typeof PICS)[PicKey]>)[k]
  if (!p) return null
  return (
    <figure className={`pic ${p.logo ? 'logo' : ''} ${className}`}>
      <div className="pic-frame"><img src={p.src} alt={alt} loading="lazy" decoding="async" /></div>
      <figcaption>
        <a href={p.credit} target="_blank" rel="noopener noreferrer">
          {p.logo ? 'לוגו' : 'צילום'}{p.artist && !p.logo ? `: ${p.artist}` : ''}{p.license ? ` · ${p.license}` : ''}
        </a>
      </figcaption>
    </figure>
  )
}
