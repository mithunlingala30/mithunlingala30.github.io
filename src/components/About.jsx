import { User, Cpu, Database, Code2, BookOpen } from 'lucide-react'
import { profile, coreSkills, projects, internships, education } from '../data/portfolio'
import { Reveal, Eyebrow } from './ui'

const coreIcons = [Code2, Database, Cpu, BookOpen]

export default function About() {
  return (
    <section id="about" className="band beige-2 section">
      <div className="blob sand" style={{ width: 120, height: 120, top: '8%', right: '6%' }} />
      <div className="wrap">
        <Reveal><Eyebrow icon={User}>About me</Eyebrow></Reveal>
        <Reveal delay={.05}><h2 className="h2">Building practical tech, <em>one clean build</em> at a time.</h2></Reveal>

        <div className="about-grid">
          <Reveal className="neu neu-border card-pad about-text">
            <p>{profile.intro}</p>
            <p>
              I'm <b>{profile.name}</b>, a Computer Science and Engineering student at <b>{education.college}</b>.
              I move between secure application design and full-stack product work — from vulnerability assessment
              to React front-ends and FastAPI back-ends.
            </p>
            <div className="stat-row">
              <div className="stat well-sm"><strong>{projects.length}</strong><span>Projects</span></div>
              <div className="stat well-sm"><strong>{internships.length}</strong><span>Internships</span></div>
              <div className="stat well-sm"><strong>{education.endYear}</strong><span>Graduating</span></div>
            </div>
          </Reveal>

          <Reveal delay={.1} className="neu neu-border card-pad">
            <h3 className="h3-label">Core strengths</h3>
            <div className="core-list">
              {coreSkills.map((s, i) => {
                const Icon = coreIcons[i % coreIcons.length]
                return (
                  <div key={s} className="core-item well-sm">
                    <span className={`token ${i % 2 ? 'clay clay-gold' : 'clay'}`}><Icon size={20} /></span>
                    {s}
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
