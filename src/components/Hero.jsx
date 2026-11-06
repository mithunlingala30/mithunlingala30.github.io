import { useState } from 'react'
import { ArrowRight, Shield, Code2, GraduationCap } from 'lucide-react'
import { profile, education, internships } from '../data/portfolio'
import { Tilt, goTo } from './ui'
import { ResumeButton, SocialLinks } from './Social'
import { motion } from 'framer-motion'

const orbit = [
  { t: 'Java', a: 20, cls: 'clay' },
  { t: 'SQL', a: 110, cls: 'clay-sand' },
  { t: 'React', a: 200, cls: 'clay clay-gold' },
  { t: 'Fast\nAPI', a: 290, cls: 'clay' },
]

const up = (i) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] } })

export default function Hero() {
  const [photoOk, setPhotoOk] = useState(true)
  const years = `${education.startYear} — ${education.endYear}`
  const [first, ...rest] = profile.name.split(' ')
  const lastTwo = rest.slice(-2).join(' ')
  const mid = rest.slice(0, -2).join(' ')

  return (
    <section id="home" className="band hero">
      <div className="blob maroon" style={{ width: 150, height: 150, top: '12%', right: '4%', animationDelay: '-2s' }} />
      <div className="blob sand" style={{ width: 90, height: 90, bottom: '9%', left: '3%', animationDuration: '11s' }} />

      <div className="wrap hero-grid">
        <div>
          <motion.div {...up(0)} className="status">
            <span className="dot" /> Available for roles <span style={{ opacity: .4 }}>•</span>
            <span style={{ color: 'var(--maroon-600)', fontWeight: 600 }}>CSE {years}</span>
          </motion.div>

          <motion.p {...up(1)} className="kicker">{profile.subtitle}</motion.p>
          <motion.h1 {...up(2)}>
            <span className="l1">{first} {mid}</span>
            <span className="l2">{lastTwo}</span>
          </motion.h1>
          <motion.p {...up(3)} className="hero-sub">Full Stack Developer &amp; Cyber Security Enthusiast</motion.p>
          <motion.p {...up(4)} className="hero-p">
            {profile.headline} at <b>{education.college}</b> ({years}). Defending systems as a <b>Cyber Security Intern at Corizo</b> and
            building modern web platforms as a <b>Full Stack Developer at Apex Planet</b>.
          </motion.p>

          <motion.div {...up(5)} className="hero-chips">
            <span className="chip clay-sand" style={{ padding: '11px 16px' }}><Shield size={14} /> Corizo · Cyber Security</span>
            <span className="chip clay-sand" style={{ padding: '11px 16px' }}><Code2 size={14} /> Apex Planet · Full Stack</span>
          </motion.div>

          <motion.div {...up(6)} className="hero-cta">
            <button className="btn clay btn-clay" onClick={() => goTo('projects')}>View Projects <ArrowRight size={18} /></button>
            <ResumeButton />
            <button className="btn btn-neu" onClick={() => goTo('contact')}>Get in touch</button>
          </motion.div>
          <motion.div {...up(7)}><SocialLinks /></motion.div>
        </div>

        {/* 3D clay stage */}
        <motion.div initial={{ opacity: 0, scale: .9, rotateY: -14 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 1.1, delay: .25, ease: [0.22, 1, 0.36, 1] }} className="stage">
          <Tilt max={9} inner="stage-inner">
            <div className="plate neu neu-border">
              <div className="plate-bar">
                <div className="lights"><i /><i /><i /></div>
                <span className="chip mono" style={{ fontSize: '.62rem', letterSpacing: '.16em' }}>LM.REDDY / PORTFOLIO</span>
              </div>
              <div className="plate-well well">
                {profile.photo && photoOk ? (
                  <img className="photo" src={profile.photo} alt={profile.name} onError={() => setPhotoOk(false)} />
                ) : (
                  <>
                    <div className="ring" /><div className="ring r2" />
                    <div className="floor-shadow" />
                    <div className="core">MR</div>
                    <div className="orbit" style={{ '--r': 'clamp(110px, 17vw, 168px)' }}>
                      {orbit.map((o) => (
                        <div key={o.t} className="orbit-item" style={{ '--a': `${o.a}deg` }}>
                          <span className={o.cls} style={{ whiteSpace: 'pre-line' }}>{o.t}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="stage-float neu-sm sf-1">
              <span className="token clay"><GraduationCap size={18} /></span>
              <div>{education.college}<small>B.Tech CSE · {education.endYear}</small></div>
            </div>
            <div className="stage-float neu-sm sf-2">
              <span className="token clay clay-gold"><Shield size={18} /></span>
              <div>{internships.length} Internships<small>Security · Full Stack</small></div>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  )
}
