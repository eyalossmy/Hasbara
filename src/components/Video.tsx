import { useState } from 'react'

export interface VideoRef {
  id: string
  title: string
  /** The channel that published it, shown so readers can judge the source */
  channel: string
}

/** A YouTube video that loads only when played, from the privacy-enhanced domain. */
export function Video({ v }: { v: VideoRef }) {
  const [play, setPlay] = useState(false)
  return (
    <figure className="vid reveal">
      <div className="vid-frame">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button className="vid-poster" onClick={() => setPlay(true)} aria-label={`הפעלת הסרטון: ${v.title}`}>
            <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" />
            <span className="vid-play" aria-hidden />
          </button>
        )}
      </div>
      <figcaption>
        <b>{v.title}</b>
        <span>ערוץ: {v.channel} · <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer">לצפייה ביוטיוב</a></span>
      </figcaption>
    </figure>
  )
}

export function Videos({ list, title = 'לצפייה' }: { list: VideoRef[]; title?: string }) {
  return (
    <section className="section-tight">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">וידאו</span>
          <h2>{title}</h2>
          <p>כל סרטון מגיע מערוץ אחר, עם נקודת מבט משלו. שימו לב מי מדבר, ובדקו מול המקורות.</p>
        </div>
        <div className="vid-grid">{list.map((v) => <Video key={v.id} v={v} />)}</div>
      </div>
    </section>
  )
}
