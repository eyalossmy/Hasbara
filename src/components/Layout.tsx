import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { LAST_UPDATED, REPO_URL } from '../data/types'

export const NAV = [
  { to: '/timeline', label: 'ציר זמן' },
  { to: '/oct7', label: '7 באוקטובר' },
  { to: '/myths', label: 'מיתוסים' },
  { to: '/toolkit', label: 'ארגז כלים' },
  { to: '/law', label: 'משפט' },
  { to: '/map', label: 'מפת העולם' },
  { to: '/glossary', label: 'מילון' },
]

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
  const [progress, setProgress] = useState(0)

  useEffect(() => { if (!hash) window.scrollTo(0, 0); setOpen(false) }, [pathname])
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > 8)
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress * 100}%` }} aria-hidden />
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <Logo />
          <div className="nav-links">
            {NAV.map((n) => <NavLink key={n.to} to={n.to}>{n.label}</NavLink>)}
          </div>
          <Link to="/quiz" className="btn btn-primary btn-sm nav-cta">חידון</Link>
          <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="תפריט" aria-expanded={open}>
            <span />
          </button>
        </div>
      </nav>
      <div className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        {[...NAV, { to: '/quiz', label: 'חידון' }, { to: '/gaza-or-not', label: 'עזה או לא?' }, { to: '/about', label: 'שקיפות' }].map((n, i) => (
          <NavLink key={n.to} to={n.to} tabIndex={open ? 0 : -1}><span className="em">{String(i + 1).padStart(2, '0')}</span>{n.label}</NavLink>
        ))}
      </div>

      <main><div key={pathname} className="route"><Outlet /></div></main>

      {pathname !== '/map' && <footer className="footer">
        <div className="container">
          <div className="cols">
            <div>
              <Logo />
              <p>העובדות על ישראל — קצרות, מדויקות ועם מקורות.</p>
            </div>
            <div>
              <h4>ללמוד</h4>
              <Link to="/timeline">ציר זמן</Link>
              <Link to="/oct7">7 באוקטובר</Link>
              <Link to="/law">משפט בינלאומי</Link>
              <Link to="/map">מפת העולם</Link>
              <Link to="/glossary">מילון</Link>
            </div>
            <div>
              <h4>להסביר</h4>
              <Link to="/myths">מיתוס מול מציאות</Link>
              <Link to="/toolkit">ארגז כלים</Link>
              <Link to="/quiz">חידון</Link>
              <Link to="/gaza-or-not">עזה או לא?</Link>
              <Link to="/about">שקיפות ומקורות</Link>
            </div>
          </div>
          <div className="fine">
            <span>עודכן {LAST_UPDATED}</span>
            <span>מצאתם טעות? <a href={`${REPO_URL}/issues/new`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline', color: 'var(--accent)' }}>דווחו לנו</a></span>
          </div>
        </div>
      </footer>}
    </>
  )
}
