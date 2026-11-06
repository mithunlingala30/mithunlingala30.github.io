import { useRef, useState } from 'react'
import { Check, Copy, Mail, Phone, Send } from 'lucide-react'
import { profile } from '../data/portfolio'
import { Reveal, Eyebrow } from './ui'
import { ResumeButton, SocialLinks } from './Social'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const t = useRef()
  const copy = async () => {
    let ok = false
    try { await navigator.clipboard.writeText(profile.email); ok = true } catch { ok = false }
    setStatus(ok ? 'copied' : 'failed')
    clearTimeout(t.current)
    t.current = setTimeout(() => setStatus('idle'), 2500)
  }

  return (
    <section id="contact" className="band dark section contact">
      <div className="blob sand" style={{ width: 100, height: 100, top: '8%', left: '7%', animationDuration: '12s' }} />
      <div className="blob maroon" style={{ width: 180, height: 180, bottom: '-50px', right: '-30px', opacity: .6 }} />
      <div className="wrap">
        <Reveal><Eyebrow icon={Send}>Let's connect</Eyebrow></Reveal>
        <Reveal delay={.05}><h2 className="h2">Let's build something <em>exceptional.</em></h2></Reveal>
        <Reveal delay={.1}><p className="lead">I'm open to software engineering internships and collaborative developer roles. Reach out directly — my inbox is always open.</p></Reveal>

        <Reveal delay={.15} className="contact-plate neu neu-border">
          <div className="contact-actions">
            <a className="btn clay clay-sand" href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email}</a>
            <button className="btn btn-neu" onClick={copy} aria-live="polite">
              {status === 'copied' ? <><Check size={17} /> Email copied</> : <><Copy size={17} /> {status === 'failed' ? 'Select manually' : 'Copy email'}</>}
            </button>
            {profile.phone && <a className="btn btn-neu" href={`tel:${profile.phone}`}><Phone size={17} /> {profile.phone}</a>}
          </div>
          <div className="contact-sep" />
          <SocialLinks showPhoneEmail={false} variant="sand" />
          <div style={{ marginTop: 30 }}><ResumeButton className="btn clay clay-gold" /></div>
        </Reveal>
      </div>
    </section>
  )
}
