import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { LAST_UPDATED, REPO_URL } from '../data/types'

export const NAV = [
  { to: '/timeline', label: 'ציר זמן', emoji: '⏳' },
  { to: '/oct7', label: '7 באוקטובר', emoji: '🎗️' },
  { to: '/myths', label: 'מיתוס מול מציאות', emoji: '🔍' },
  { to: '/toolkit', label: 'ארגז כלים', emoji: '🧰' },
  { to: '/law', label: 'משפט בינלאומי', emoji: '⚖️' },
  { to: '/map', label: 'מפת העולם', emoji: '🌍' },
  { to: '/glossary', label: 'מילון', emoji: '📖' },
]

// Pages whose hero is dark get a dark nav bar so the top of the page reads as one surface.
const DARK_TOP = ['/', '/oct7']

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="הסברה — דף הבית">
      <img src="/favicon.svg" className="logo-mark" alt="" />
      <span>הסברה<span className="logo-dot">.</span></span>
    </Link>
  )
}

export default function Layout() {
  const { pathname, hash } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => { if (!hash) window.scrollTo(0, 0); setOpen(false) }, [pathname])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  const dark = DARK_TOP.includes(pathname) && !open

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''} ${dark ? 'dark' : ''}`}>
        <div className="container nav-inner">
          <Logo />
          <div className="nav-links">
            {NAV.map((n) => <NavLink key={n.to} to={n.to}>{n.label}</NavLink>)}
          </div>
          <Link to="/quiz" className="btn btn-gold btn-sm nav-cta">🧠 חידון</Link>
          <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="תפריט" aria-expanded={open}>
            <span />
          </button>
        </div>
      </nav>
      <div className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        {[...NAV, { to: '/quiz', label: 'חידון', emoji: '🧠' }, { to: '/about', label: 'שקיפות ומקורות', emoji: '🔎' }].map((n) => (
          <NavLink key={n.to} to={n.to} tabIndex={open ? 0 : -1}><span className="em">{n.emoji}</span>{n.label}</NavLink>
        ))}
      </div>

      <main><Outlet /></main>

      {pathname !== '/map' && <footer className="footer">
        <div className="container">
          <div className="cols">
            <div>
              <Logo />
              <p>הסברה ישראלית פשוטה, חכמה ומבוססת מקורות. בלי לצעוק, בלי לחפור — עם עובדות שאפשר לבדוק.</p>
            </div>
            <div>
              <h4>ללמוד</h4>
              <Link to="/timeline">ציר זמן</Link>
              <Link to="/oct7">7 באוקטובר</Link>
              <Link to="/law">משפט בינלאומי</Link>
              <Link to="/glossary">מילון מונחים</Link>
            </div>
            <div>
              <h4>להסביר</h4>
              <Link to="/myths">מיתוס מול מציאות</Link>
              <Link to="/toolkit">ארגז כלים לוויכוח</Link>
              <Link to="/quiz">חידון</Link>
              <Link to="/about">שקיפות ומקורות</Link>
            </div>
          </div>
          <div className="fine">
            <span>עודכן לאחרונה: {LAST_UPDATED}</span>
            <span>מצאתם טעות? <a href={`${REPO_URL}/issues/new`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline', color: 'var(--gold)' }}>דווחו לנו</a> — אנחנו מתקנים בפומבי.</span>
          </div>
        </div>
      </footer>}
    </>
  )
}
