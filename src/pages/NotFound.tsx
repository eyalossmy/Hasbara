import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section center" style={{ minHeight: '60vh' }}>
      <div className="container">
        <div style={{ fontSize: 72 }}>🧐</div>
        <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, margin: '10px 0' }}>העמוד הזה לא קיים.</h1>
        <p className="muted" style={{ fontSize: 18 }}>בדקנו פעמיים, כמו שאנחנו עושים עם כל עובדה.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: 24 }}>חזרה הביתה</Link>
      </div>
    </section>
  )
}
