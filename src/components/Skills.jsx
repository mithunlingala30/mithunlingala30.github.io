import { Code2, Database, Cpu, Globe, Server, Smartphone, Cloud, Layers } from 'lucide-react'
import { skillCategories, coreSkills } from '../data/portfolio'
import { Reveal, Eyebrow } from './ui'

const icons = { Programming: Code2, Databases: Database, 'Computer Science': Cpu, 'Web Development': Globe, Backend: Server, 'Mobile Development': Smartphone, 'Cloud & Tools': Cloud }

export default function Skills() {
  return (
    <section id="skills" className="band dark section">
      <div className="blob sand" style={{ width: 110, height: 110, top: '5%', right: '6%', animationDuration: '12s' }} />
      <div className="blob maroon" style={{ width: 200, height: 200, bottom: '-60px', right: '-40px', opacity: .55 }} />
      <div className="wrap">
        <Reveal><Eyebrow icon={Layers}>Toolkit</Eyebrow></Reveal>
        <Reveal delay={.05}><h2 className="h2">Skills &amp; <em>technologies</em> I work with.</h2></Reveal>

        <div className="skills-grid">
          {skillCategories.map((c, i) => {
            const Icon = icons[c.title] || Code2
            return (
              <Reveal key={c.title} delay={(i % 3) * .08} className="skill-card neu neu-border">
                <span className={`token ${i % 3 === 1 ? 'clay-sand' : i % 3 === 2 ? 'clay-gold' : 'clay-sand'}`}><Icon size={26} /></span>
                <h3>{c.title}</h3>
                <div className="chips">{c.items.map((s) => <span key={s} className="chip">{s}</span>)}</div>
              </Reveal>
            )
          })}
        <Reveal className="core-banner well">
          <span className="h3-label">Core</span>
          {coreSkills.map((s, i) => <span key={s} className={`chip ${i % 2 ? 'clay-sand' : 'clay clay-gold'}`} style={{ padding: '11px 18px' }}>{s}</span>)}
        </Reveal>
        </div>

      </div>
    </section>
  )
}
