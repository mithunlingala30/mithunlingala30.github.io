import { ArrowUp, Heart } from 'lucide-react'
import { profile, navLinks } from '../data/portfolio'
import { goTo } from './ui'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="band footer">
      <div className="wrap footer-wrap">
        <div className="footer-card neu neu-border">
          <div className="footer-main">
            <div className="footer-info">
              <div className="footer-brand">
                <span className="footer-logo clay">MR</span>
                <div>
                  <h3 className="footer-name">{profile.name}</h3>
                  <p className="footer-role">Computer Science Engineer · Full Stack &amp; Cybersecurity</p>
                </div>
              </div>
              <p className="footer-bio">
                Building practical technology solutions, secure web architectures, and intuitive interactive experiences. Open for software engineering internships and collaborative developer roles.
              </p>
            </div>

            <div className="footer-nav-col">
              <span className="footer-col-title">Quick Links</span>
              <ul className="footer-nav-list">
                {navLinks.map(([label, id]) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        goTo(id)
                      }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-cta-col">
              <span className="footer-col-title">Connect</span>
              <p className="footer-email-text">
                Have an internship, project, or opportunity? Let's connect and build something impactful.
              </p>
              <a href={`mailto:${profile.email}`} className="btn btn-sm clay">
                {profile.email}
              </a>
              <button
                type="button"
                className="btn btn-sm btn-neu footer-top-btn"
                onClick={() => goTo('home')}
                aria-label="Scroll back to top"
              >
                Back to top <ArrowUp size={15} />
              </button>
            </div>
          </div>

          <div className="footer-divider" />

          <div className="footer-bottom-row">
            <p>© {currentYear} {profile.name}. All rights reserved.</p>

          </div>
        </div>
      </div>
    </footer>
  )
}
