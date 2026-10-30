import { Link } from 'react-router-dom'
import type { Article, Block, Head, Item } from '../data/article'
import Pic from './Pic'
import { Videos } from './Video'
import { Emph, PageHero, SourceLinks, StatusBadge, useReveal } from './ui'

function SectionHead({ head }: { head: Head }) {
  return (
    <div className="section-head reveal">
      <span className="eyebrow">{head.eyebrow}</span>
      <h2>{head.title}</h2>
      {head.text && <p>{head.text}</p>}
    </div>
  )
}

function Card({ item }: { item: Item }) {
  return (
    <article className="ac reveal">
      {item.img && <Pic k={item.img} alt={item.title} />}
      <div className="ac-top">
        {item.k && <span className="ac-k">{item.k}</span>}
        {item.status && <StatusBadge status={item.status} />}
      </div>
      <h3>{item.title}</h3>
      <p><Emph text={item.text} /></p>
      <SourceLinks sources={item.sources} />
    </article>
  )
}

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case 'stats':
      return (
        <section className="section-tight">
          <div className="container">
            <div className="o7-stats ac-stats reveal">
              {b.items.map((s) => <div key={s.t}><div className="n">{s.n}</div><div className="t">{s.t}</div></div>)}
            </div>
            <div className="reveal" style={{ marginTop: 20 }}><SourceLinks sources={b.sources} /></div>
          </div>
        </section>
      )
    case 'cards':
      return (
        <section className="section-tight">
          <div className="container">
            <SectionHead head={b.head} />
            <div className="ac-grid">{b.items.map((i) => <Card key={i.title} item={i} />)}</div>
          </div>
        </section>
      )
    case 'steps':
      return (
        <section className="section-tight">
          <div className="container" style={{ maxWidth: 980 }}>
            <SectionHead head={b.head} />
            <div className="hours">
              {b.items.map((i) => (
                <div key={i.title} className="hour reveal">
                  <div className="t">{i.k}</div>
                  <div>
                    <h3>{i.title}</h3>
                    <p><Emph text={i.text} /></p>
                    {i.img && <Pic k={i.img} alt={i.title} />}
                    <div className="ac-src">{i.status && <StatusBadge status={i.status} />}<SourceLinks sources={i.sources} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    case 'compare':
      return (
        <section className="section-tight">
          <div className="container">
            <SectionHead head={b.head} />
            <div className="table-wrap reveal">
              <table className="compare">
                <thead><tr><th /><th>{b.cols[0]}</th><th>{b.cols[1]}</th></tr></thead>
                <tbody>
                  {b.rows.map((r) => <tr key={r.label}><td>{r.label}</td><td><Emph text={r.a} /></td><td><Emph text={r.b} /></td></tr>)}
                </tbody>
              </table>
            </div>
            <div className="reveal" style={{ marginTop: 20 }}><SourceLinks sources={b.sources} /></div>
          </div>
        </section>
      )
    case 'analysis':
      return (
        <section className="section-tight">
          <div className="container">
            <div className="analysis reveal">
              <span className="think-k">פרשנות</span>
              <h3>{b.title}</h3>
              <div className="an-cols">
                <div><h4>מה אומרים המבקרים</h4><p><Emph text={b.critics} /></p></div>
                <div><h4>איך אנחנו קוראים את זה</h4><p><Emph text={b.reading} /></p></div>
                <div><h4>מה עדיין פתוח</h4><p><Emph text={b.open} /></p></div>
              </div>
              <SourceLinks sources={b.sources} />
            </div>
          </div>
        </section>
      )
    case 'photos':
      return (
        <section className="section-tight">
          <div className="container">
            <SectionHead head={b.head} />
            <div className="photo-grid">
              {b.items.map((p) => (
                <div key={p.img} className="reveal"><Pic k={p.img} alt={p.caption} /><p className="photo-cap">{p.caption}</p></div>
              ))}
            </div>
          </div>
        </section>
      )
    case 'honest':
      return (
        <section className="section-tight">
          <div className="container" style={{ maxWidth: 880 }}>
            <div className="box honest reveal">
              <h4>{b.title}</h4>
              <p><Emph text={b.text} /></p>
              {b.sources && <div style={{ marginTop: 12 }}><SourceLinks sources={b.sources} /></div>}
            </div>
          </div>
        </section>
      )
  }
}

/** Questions that hand the judgement back to the reader. */
export function Think({ questions }: { questions: string[] }) {
  return (
    <div className="think reveal">
      <span className="think-k">לחשוב ביקורתית</span>
      <h3>אל תסמכו עלינו. תשאלו:</h3>
      <ol>{questions.map((q) => <li key={q}>{q}</li>)}</ol>
      <p>בכל פריט כאן יש מקור. פתחו אותו, ובדקו אם אנחנו מדייקים.</p>
    </div>
  )
}

export default function ArticleView({ a }: { a: Article }) {
  useReveal()
  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} lead={a.lead} />
      {a.blocks.map((b, i) => <BlockView key={i} b={b} />)}
      {a.videos && <Videos list={a.videos} />}
      <section className="section-tight">
        <div className="container" style={{ maxWidth: 880 }}>
          <Think questions={a.think} />
          {a.next && (
            <div className="ac-next reveal">
              {a.next.map((n) => <Link key={n.to} to={n.to} className="btn btn-soft">{n.label}</Link>)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
