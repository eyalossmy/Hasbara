import { Link } from 'react-router-dom'
import { MISSIONS, SECTIONS, type Section } from '../data/sections'
import { PageHero, useReveal } from '../components/ui'
import { Think } from '../components/Article'
import Pic from '../components/Pic'

export default function Hub({ id }: { id: Section['id'] }) {
  useReveal()
  const s = SECTIONS.find((x) => x.id === id)!
  const m = MISSIONS[s.mission]
  return (
    <>
      <PageHero eyebrow={`משימה ${m.n} · ${m.title}`} title={s.title} lead={s.lead} />
      <section className="section">
        <div className="container">
          <nav className="plist" aria-label={s.title}>
            {s.pages.map((p, i) => (
              <Link key={p.to} to={p.to} className={`prow reveal ${p.img ? 'prow-pic' : ''}`}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.label}</h3>
                <p>{p.text}</p>
                {p.img && <Pic k={p.img} alt={p.label} />}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <section className="section-tight">
        <div className="container" style={{ maxWidth: 880 }}><Think questions={s.think} /></div>
      </section>
      <section className="section-tight">
        <div className="container">
          <div className="missions">
            {MISSIONS.map((x, i) => {
              const to = SECTIONS.find((y) => y.mission === i)!.to
              return (
                <Link key={x.n} to={to} className={`mission reveal ${i === s.mission ? 'on' : ''}`}>
                  <span className="n">{x.n}</span>
                  <h3>{x.title}</h3>
                  <p>{x.text}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
