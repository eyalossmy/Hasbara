import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { QUIZ, RANKS } from '../data/quiz'
import { copyText, shareUrl } from '../components/ui'

const LETTERS = ['א', 'ב', 'ג', 'ד']
const COLORS = ['#1446f5', '#ffb020', '#0fb47e', '#ff5a5f', '#7c4dff']

function Confetti() {
  const bits = useMemo(() => Array.from({ length: 70 }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
    color: COLORS[i % COLORS.length],
    rot: Math.random() * 360,
  })), [])
  return (
    <div className="confetti" aria-hidden>
      {bits.map((b, i) => <i key={i} style={{ left: `${b.left}%`, background: b.color, animationDelay: `${b.delay}s`, transform: `rotate(${b.rot}deg)` }} />)}
    </div>
  )
}

export default function Quiz() {
  const [i, setI] = useState(0)
  const [pick, setPick] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const done = i >= QUIZ.length
  const q = QUIZ[Math.min(i, QUIZ.length - 1)]

  const choose = (k: number) => {
    if (pick !== null) return
    setPick(k)
    if (k === q.answer) setScore((s) => s + 1)
  }
  const next = () => { setI(i + 1); setPick(null) }
  const restart = () => { setI(0); setPick(null); setScore(0) }

  const rank = [...RANKS].reverse().find((r) => score >= r.min)!
  const shareText = `קיבלתי ${score}/${QUIZ.length} בחידון ההסברה — דרגה: ${rank.title} ${rank.emoji}. בואו לראות אם אתם יודעים יותר:`

  return (
    <section className="section" style={{ background: 'radial-gradient(60% 50% at 50% 0%, #eef0ff, var(--bg) 70%)', minHeight: '80vh' }}>
      <div className="container quiz-shell">
        <div className="center" style={{ marginBottom: 28 }}>
          <span className="eyebrow">🧠 החידון</span>
          <h1 style={{ fontSize: 'clamp(32px,5vw,50px)', fontWeight: 800, marginTop: 8 }}>כמה אתם באמת יודעים?</h1>
        </div>

        <div className="quiz-card">
          {done ? (
            <div className="result">
              {score >= 8 && <Confetti />}
              <div className="big">{rank.emoji}</div>
              <div className="score">{score}/{QUIZ.length}</div>
              <h2 style={{ fontSize: 30, fontWeight: 800 }}>{rank.title}</h2>
              <p className="muted" style={{ maxWidth: 460, margin: '0 auto', fontSize: 18 }}>{rank.text}</p>
              <div className="row">
                <a className="btn btn-primary" href={shareUrl(shareText)} target="_blank" rel="noopener noreferrer">💬 לאתגר חברים</a>
                <button className="btn btn-soft" onClick={() => copyText(`${shareText} ${window.location.href}`)}>📋 העתקת תוצאה</button>
                <button className="btn btn-soft" onClick={restart}>↺ עוד פעם</button>
              </div>
              <div style={{ marginTop: 22 }}><Link to="/myths">רוצים להשתפר? למיתוס מול מציאות ←</Link></div>
            </div>
          ) : (
            <>
              <div className="q-top">
                <span>שאלה {i + 1} מתוך {QUIZ.length}</span>
                <span className="q-score">⭐ {score}</span>
              </div>
              <div className="progress"><i style={{ width: `${((i + (pick !== null ? 1 : 0)) / QUIZ.length) * 100}%` }} /></div>
              <h2>{q.q}</h2>
              <div className="opts">
                {q.options.map((o, k) => {
                  const cls = pick === null ? '' : k === q.answer ? 'right' : k === pick ? 'wrong' : ''
                  return (
                    <button key={o} className={`opt ${cls}`} onClick={() => choose(k)} disabled={pick !== null}>
                      <span className="l">{cls === 'right' ? '✓' : cls === 'wrong' ? '✕' : LETTERS[k]}</span>{o}
                    </button>
                  )
                })}
              </div>
              {pick !== null && (
                <>
                  <div className="explain">
                    <div className="quip">{pick === q.answer ? '🎉 ' + q.right : '🙈 ' + q.wrong}</div>
                    <div className="muted">{q.explain}</div>
                  </div>
                  <div className="quiz-next">
                    <button className="btn btn-primary" onClick={next}>{i === QUIZ.length - 1 ? 'לתוצאה שלי 🏁' : 'לשאלה הבאה ←'}</button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
