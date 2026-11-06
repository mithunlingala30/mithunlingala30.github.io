import { GraduationCap, Award, ExternalLink, BookOpen } from 'lucide-react'
import { certificates, education } from '../data/portfolio'
import { Reveal, Eyebrow } from './ui'

export default function Education() {
  return (
    <section id="education" className="band section">
      <div className="blob sand" style={{ width: 100, height: 100, top: '7%', right: '7%' }} />
      <div className="wrap">
        <Reveal><Eyebrow icon={GraduationCap}>Academic foundation</Eyebrow></Reveal>
        <Reveal delay={.05}><h2 className="h2" style={{ maxWidth: '20ch' }}>Degree &amp; <em>certifications.</em></h2></Reveal>

        <div className="edu-grid">
          <Reveal className="edu-card neu neu-border">
            <span className="token clay"><GraduationCap size={28} /></span>
            <h3>{education.degree}</h3>
            <p className="sch">{education.college}</p>
            <div className="edu-meta well-sm">
              <div><small>Tenure</small><b>{education.startYear} — {education.endYear}</b></div>
              {education.cgpa ? <div><small>CGPA</small><b>{education.cgpa}</b></div> : <span className="chip clay">Undergraduate</span>}
            </div>
          </Reveal>

          <Reveal delay={.1} className="neu neu-border card-pad">
            <h3 className="h3-label" style={{ display: 'flex', gap: 10, alignItems: 'center' }}><BookOpen size={15} /> Certifications</h3>
            {certificates.map((c, i) => (
              <div key={c.title} className="cert well-sm">
                <span className={`token ${i % 2 ? 'clay clay-gold' : 'clay'}`} style={{ width: 52, height: 52 }}><Award size={22} /></span>
                <div style={{ flex: 1 }}>
                  <h4>{c.title}</h4>
                  <p>{[c.issuer, c.date, c.credentialId && `ID ${c.credentialId}`].filter(Boolean).join(' · ') || 'Details to be added'}</p>
                </div>
                {c.url && <a className="orb-btn clay" style={{ width: 44, height: 44 }} href={c.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${c.title}`}><ExternalLink size={17} /></a>}
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
