import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, Phone, Code2, Download } from 'lucide-react'
import { profile } from '../data/portfolio'

const ext = { target: '_blank', rel: 'noopener noreferrer' }

export function SocialLinks({ showPhoneEmail = true, variant = 'clay' }) {
  const { socials, email, phone } = profile
  const items = [
    socials.linkedin && { href: socials.linkedin, label: 'LinkedIn', Icon: Linkedin, ...ext },
    socials.github && { href: socials.github, label: 'GitHub', Icon: Github, ...ext },
    socials.leetcode && { href: socials.leetcode, label: 'LeetCode', Icon: Code2, ...ext },
    showPhoneEmail && email && { href: `mailto:${email}`, label: 'Email', Icon: Mail },
    showPhoneEmail && phone && { href: `tel:${phone}`, label: 'Phone', Icon: Phone },
  ].filter(Boolean)

  return (
    <ul className="socials">
      {items.map(({ href, label, Icon, ...rest }, i) => (
        <li key={label}>
          <a href={href} aria-label={label} title={label} {...rest}
            className={`orb-btn ${variant === 'sand' ? 'clay-sand' : i % 2 ? 'clay clay-gold' : 'clay'}`}>
            <Icon size={20} />
          </a>
        </li>
      ))}
    </ul>
  )
}

export function ResumeButton({ className = 'btn btn-neu' }) {
  const [ok, setOk] = useState(null)
  useEffect(() => {
    let alive = true
    fetch(profile.resume, { method: 'HEAD' })
      .then((r) => alive && setOk(r.ok && !(r.headers.get('content-type') || '').includes('html')))
      .catch(() => alive && setOk(false))
    return () => { alive = false }
  }, [])

  if (ok) {
    return (
      <a className={className} href={profile.resume} download="Mithun_Reddy_Resume.pdf">
        <Download size={17} /> Download Resume
      </a>
    )
  }
  return (
    <a className={className} href={`mailto:${profile.email}?subject=Resume%20Request%20-%20Mithun%20Reddy`}>
      <Download size={17} /> Request Resume
    </a>
  )
}
