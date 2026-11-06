import { useEffect, useState } from 'react'
import { Menu, X, Send } from 'lucide-react'
import { navLinks } from '../data/portfolio'
import { goTo } from './ui'

export default function Nav() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const els = navLinks.map(([, id]) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const go = (e, id) => { e.preventDefault(); setOpen(false); goTo(id) }

  return (
    <>
      <header className="nav">
        <nav className="nav-bar" aria-label="Primary">
          <a href="#home" onClick={(e) => go(e, 'home')} className="nav-logo clay" aria-label="Home">MR</a>
          <span className="nav-name">Mithun Reddy</span>
          <div className="nav-links">
            {navLinks.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={(e) => go(e, id)} className={active === id ? 'active' : ''}>{label}</a>
            ))}
          </div>
          <a href="#contact" onClick={(e) => go(e, 'contact')} className="btn btn-sm clay nav-cta"><Send size={14} /> Hire me</a>
          <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>
      {open && (
        <div className="sheet" role="menu">
          {navLinks.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={(e) => go(e, id)} className={active === id ? 'active' : ''}>{label}</a>
          ))}
        </div>
      )}
    </>
  )
}
