import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { LAST_UPDATED, REPO_URL } from '../data/types'
import { SECTIONS } from '../data/sections'

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="הסברה, דף הבית">
      <img src="/logo-mark.svg" className="logo-mark" alt="" />
      <span>הסברה<span className="logo-dot">.</span></span>
    </Link>
  )
}

export default function Layout() {
  const { pathname, hash } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => { if (!hash) window.scrollTo(0, 0); setOpen(false) }, [pathname])
  useEffect(() => {
    let frame = 0
    const paint = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > 8)
      bar.current?.style.setProperty('transform', `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`)
    }
    const on = () => { frame ||= requestAnimationFrame(paint) }
    paint()
    window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(frame) }
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  return (
    <>
      <div className="scroll-progress" ref={bar} aria-hidden />
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <Logo />
          <div className="nav-links">
            {SECTIONS.map((s) => (
              <div key={s.id} className={`nav-group ${s.pages.some((p) => p.to === pathname) ? 'here' : ''}`}>
                <NavLink to={s.to}>{s.label}</NavLink>
                <div className="nav-menu">
                  {s.pages.map((p) => <NavLink key={p.to} to={p.to}><b>{p.label}</b><span>{p.text}</span></NavLink>)}
                </div>
              </div>
            ))}
            <NavLink to="/glossary">מילון</NavLink>
          </div>
          <Link to="/quiz" className="btn btn-primary btn-sm nav-cta">חידון</Link>
          <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="תפריט" aria-expanded={open}>
            <span />
          </button>
        </div>
      </nav>
      <div className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        {SECTIONS.map((s, i) => (
          <div key={s.id} className="drawer-group">
            <NavLink to={s.to} tabIndex={open ? 0 : -1}><span className="em">{String(i + 1).padStart(2, '0')}</span>{s.label}</NavLink>
            <div className="drawer-sub">
              {s.pages.map((p) => <NavLink key={p.to} to={p.to} tabIndex={open ? 0 : -1}>{p.label}</NavLink>)}
            </div>
          </div>
        ))}
        {[{ to: '/glossary', label: 'מילון' }, { to: '/quiz', label: 'חידון' }, { to: '/about', label: 'שקיפות ומקורות' }].map((n, i) => (
          <NavLink key={n.to} to={n.to} tabIndex={open ? 0 : -1}><span className="em">{String(i + 4).padStart(2, '0')}</span>{n.label}</NavLink>
        ))}
      </div>

      <main><div key={pathname} className="route"><Outlet /></div></main>

      {pathname !== '/map' && <footer className="footer">
        <div className="container">
          <div className="cols">
            <div>
              <Logo />
              <p>להבין את ישראל, להסביר את הסכסוך ולחשוב ביקורתית, עם מקור לכל עובדה.</p>
            </div>
            {SECTIONS.map((sec) => (
              <div key={sec.id}>
                <h4><Link to={sec.to} style={{ color: 'inherit' }}>{sec.label}</Link></h4>
                {sec.pages.map((p) => <Link key={p.to} to={p.to}>{p.label}</Link>)}
              </div>
            ))}
            <div>
              <h4>עוד</h4>
              <Link to="/glossary">מילון</Link>
              <Link to="/quiz">חידון</Link>
              <Link to="/about">המשימה, שקיפות ומקורות</Link>
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
