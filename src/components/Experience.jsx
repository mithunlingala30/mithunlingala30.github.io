import { Briefcase, Shield, Code2, Award } from 'lucide-react'
import { internships } from '../data/portfolio'
import { Reveal, Eyebrow } from './ui'

export default function Experience() {
  return (
    <section id="experience" className="band beige-2 section">
      <div className="blob maroon" style={{ width: 70, height: 70, top: '9%', right: '8%', animationDuration: '8s' }} />
      <div className="wrap">
        <Reveal><Eyebrow icon={Briefcase}>Experience</Eyebrow></Reveal>
        <Reveal delay={.05}><h2 className="h2" style={{ maxWidth: '20ch' }}>Internships &amp; <em>hands-on</em> experience.</h2></Reveal>

        <div className="tl">
          {internships.map((x, i) => {
            const Icon = x.domain === 'Cybersecurity' ? Shield : Code2
            return (
              <Reveal key={x.company} delay={.05} style={{ position: 'relative' }}>
                <span className={`tl-node ${i % 2 ? 'clay clay-gold' : 'clay'}`}><Icon size={22} /></span>
                <article className="exp neu neu-border">
                  <div className="exp-head">
                    <div>
                      <h3>{x.role}</h3>
                      <p className="co">{x.company} <span style={{ color: 'var(--text-3)', fontWeight: 500 }}>· {x.domain}</span></p>
                    </div>
                    <span className="date-pill well-sm">{x.startDate} — {x.endDate}</span>
                  </div>

                  <div className="exp-cols">
                    <div>
                      <h4 className="h3-label">Responsibilities</h4>
                      <ul className="bul">{x.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
                      {x.tasks?.length > 0 && (<>
                        <h4 className="h3-label" style={{ marginTop: 26 }}>Key tasks</h4>
                        <ul className="bul">{x.tasks.map((r) => <li key={r}>{r}</li>)}</ul>
                      </>)}
                    </div>
                    <div className="exp-well well">
                      <h4 className="h3-label">Technologies</h4>
                      <div className="chips">{x.technologies.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                      {x.certificateUrl && (
                        <a className="btn btn-sm clay clay-gold" style={{ marginTop: 22 }} href={x.certificateUrl} target="_blank" rel="noopener noreferrer"><Award size={16} /> View certificate</a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
