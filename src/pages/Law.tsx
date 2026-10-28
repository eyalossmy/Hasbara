import { useState } from 'react'
import { COURTS, LAW, SIM } from '../data/law'
import { SRC } from '../data/sources'
import { PageHero, SourceLinks, useReveal } from '../components/ui'

function Simulator() {
  const [step, setStep] = useState(0)
  const [pick, setPick] = useState<number | null>(null)
  const done = step >= SIM.length
  const s = SIM[Math.min(step, SIM.length - 1)]

  return (
    <div className="sim reveal">
      <div className="glow a" style={{ opacity: .35 }} />
      <div className="bar">{SIM.map((_, i) => <i key={i} className={i <= step ? 'on' : ''} />)}</div>
      {done ? (
        <>
          <div className="step-n">🎓 סיימתם</div>
          <h3>זהו. עכשיו אתם יודעים יותר מרוב הפרשנים בטלוויזיה.</h3>
          <p>הנקודה החשובה: המשפט הבינלאומי לא אוסר על ישראל להילחם בחמאס. הוא קובע איך. וכשחמאס מסתתר מאחורי אזרחים — האחריות לפגיעה בהם רובצת במידה רבה עליו.</p>
          <div className="opts"><button onClick={() => { setStep(0); setPick(null) }}>↺ שוב מההתחלה</button></div>
        </>
      ) : (
        <>
          <div className="step-n">סימולטור · משגר ליד בית ספר</div>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          <div className="opts">
            {s.options.map((o, i) => (
              <button key={o.label} onClick={() => setPick(i)} style={pick === i ? { background: o.ok ? 'rgba(15,180,126,.3)' : 'rgba(255,90,95,.3)', borderColor: o.ok ? '#0fb47e' : '#ff5a5f' } : undefined}>
                {pick === i ? (o.ok ? '✅ ' : '❌ ') : ''}{o.label}
              </button>
            ))}
          </div>
          {pick !== null && (
            <div className="fb" key={`${step}-${pick}`}>
              {s.options[pick].fb}
              <div style={{ marginTop: 12 }}>
                <button className="btn btn-gold btn-sm" onClick={() => { setStep(step + 1); setPick(null) }}>{step === SIM.length - 1 ? 'לסיכום' : 'לשלב הבא'} ←</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function Law() {
  useReveal()
  return (
    <>
      <PageHero eyebrow="⚖️ משפט בינלאומי" emoji="🏛️" title="דיני המלחמה, בלי דוקטורט."
        lead="״מידתיות״, ״מגן אנושי״, ״רצח עם״ — מילים שכולם זורקים ומעטים מבינים. הנה מה שהן באמת אומרות, ומה העמדה הישראלית." />

      <section className="section-tight">
        <div className="container"><Simulator /></div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">📚 המושגים</span>
            <h2>שישה מושגים שחייבים להכיר</h2>
          </div>
          <div className="grid-3">
            {LAW.map((l) => (
              <div key={l.title} className="law-card reveal">
                <span className="em">{l.emoji}</span>
                <h3>{l.title}</h3>
                <p className="def">{l.def}</p>
                <div className="il"><b>🇮🇱 העמדה הישראלית: </b>{l.israel}</div>
                <p className="dp"><b>🤔 איפה הוויכוח: </b>{l.disputed}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">🏛️ ICJ מול ICC</span>
            <h2>שני בתי דין בהאג. ממש לא אותו דבר.</h2>
            <p>הבלבול הכי נפוץ בכותרות. הנה ההבדל, ומה באמת נקבע.</p>
          </div>
          <div className="table-wrap reveal">
            <table className="compare">
              <thead><tr><th></th><th>ICJ — בית הדין לצדק</th><th>ICC — בית הדין הפלילי</th></tr></thead>
              <tbody>
                {COURTS.map((r) => <tr key={r.k}><td>{r.k}</td><td>{r.icj}</td><td>{r.icc}</td></tr>)}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 20 }} className="reveal">
            <SourceLinks sources={[SRC.icjGenocide, SRC.icjAdvisory, SRC.icc, SRC.romeStatute, SRC.genocideConv, SRC.ihl]} />
          </div>
        </div>
      </section>
    </>
  )
}
