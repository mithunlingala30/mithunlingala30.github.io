import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Github,
  ExternalLink,
  Shield,
  HeartPulse,
  Bot,
  Cloud,
  Terminal,
  FolderGit2,
  X,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'
import { projects } from '../data/portfolio'
import { Reveal, Tilt, Eyebrow } from './ui'

const icons = {
  'elder-shield': Shield,
  'smart-blood-connect': HeartPulse,
  'strange-ai': Bot,
  'cloud-vault': Cloud,
  cloudline: Terminal,
}

// Maroon / rose / wine / bronze / burgundy gradients — one per project
const tones = [
  ['#b02f42', '#5e0c19'],
  ['#c4455a', '#7a1424'],
  ['#8a1a2a', '#3f0710'],
  ['#c28a47', '#7a1d24'],
  ['#9c2b3a', '#4a0a14'],
]

function Project({ p, i, onOpenCaseStudy }) {
  const [imgOk, setImgOk] = useState(true)
  const Icon = icons[p.id] || FolderGit2
  const [c1, c2] = tones[i % tones.length]

  return (
    <Reveal delay={(i % 2) * 0.1}>
      <Tilt max={4} inner="">
        <article className="proj neu neu-border">
          <div
            className="proj-media well-sm"
            style={{
              background: `linear-gradient(150deg, ${c1}, ${c2})`,
              boxShadow:
                'inset 6px 7px 14px rgba(255,190,180,.3), inset -8px -10px 18px rgba(30,0,6,.5)',
            }}
          >
            {p.image && imgOk ? (
              <img
                src={p.image}
                alt={`${p.title} screenshot`}
                loading="lazy"
                onError={() => setImgOk(false)}
              />
            ) : (
              <>
                <div className="art" />
                <span className="num">0{i + 1}</span>
                <span className="token clay-sand">
                  <Icon />
                </span>
              </>
            )}
          </div>

          <span className="proj-cat">{p.category}</span>
          <h3>{p.title}</h3>
          <p className="proj-desc">{p.description}</p>
          <div className="chips">
            {p.tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>

          <div className="proj-actions">
            {p.github && (
              <a
                className="btn btn-sm clay"
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} /> Source
              </a>
            )}
            {p.live && (
              <a
                className="btn btn-sm clay clay-gold"
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} /> Live demo
              </a>
            )}
            {(p.problem || p.solution) && (
              <button
                type="button"
                className="btn btn-sm btn-neu"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onOpenCaseStudy()
                }}
                aria-haspopup="dialog"
              >
                Case study <Sparkles size={15} />
              </button>
            )}
          </div>
        </article>
      </Tilt>
    </Reveal>
  )
}

function CaseStudyModal({ project, onClose }) {
  return (
    <motion.div
      className="case-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <motion.div
        className="case-modal neu neu-border"
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        <div className="case-modal-head">
          <div>
            <span className="proj-cat" style={{ marginTop: 0 }}>
              {project.category} · Case Study
            </span>
            <h3
              id="case-study-title"
              style={{
                marginTop: 6,
                font: '600 clamp(1.4rem, 3vw, 1.9rem) var(--font-display)',
                letterSpacing: '-0.02em',
              }}
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            className="case-modal-close"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClose()
            }}
            aria-label="Close Case Study"
          >
            <X size={20} />
          </button>
        </div>

        <p className="proj-desc" style={{ marginTop: 0, fontSize: '0.98rem' }}>
          {project.description}
        </p>

        {project.problem && (
          <div
            className="case-modal-box well-sm"
            style={{ borderLeft: '4px solid var(--rose)' }}
          >
            <b>
              <AlertCircle size={15} /> The Problem
            </b>
            <p>{project.problem}</p>
          </div>
        )}

        {project.solution && (
          <div
            className="case-modal-box well-sm"
            style={{ borderLeft: '4px solid #3f9b5b' }}
          >
            <b>
              <CheckCircle2 size={15} /> Solution & Approach
            </b>
            <p>{project.solution}</p>
          </div>
        )}

        <div>
          <b
            style={{
              display: 'block',
              font: '600 0.72rem var(--font-mono)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              marginBottom: 10,
            }}
          >
            Technologies Used
          </b>
          <div className="chips">
            {project.tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="case-modal-actions">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {project.github && (
              <a
                className="btn btn-sm clay"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} /> Source Code
              </a>
            )}
            {project.live && (
              <a
                className="btn btn-sm clay clay-gold"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
          <button
            type="button"
            className="btn btn-sm btn-neu"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClose()
            }}
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(null)
  const scrollPosRef = useRef(0)

  // Prevent background scrolling while keeping the EXACT current scroll position (no jump to top)
  useEffect(() => {
    if (activeCaseStudy) {
      // Record current scroll position
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
      scrollPosRef.current = scrollY

      // Lock body scroll
      document.body.classList.add('case-study-open')

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setActiveCaseStudy(null)
      }
      window.addEventListener('keydown', handleKeyDown)

      return () => {
        document.body.classList.remove('case-study-open')
        window.removeEventListener('keydown', handleKeyDown)

        // Instantly restore exact scroll position so page never jumps
        window.scrollTo({
          top: scrollPosRef.current,
          left: 0,
          behavior: 'instant',
        })
      }
    }
  }, [activeCaseStudy])

  return (
    <section id="projects" className="band section">
      <div
        className="blob maroon"
        style={{
          width: 90,
          height: 90,
          top: '5%',
          right: '8%',
          animationDuration: '10s',
        }}
      />
      <div
        className="blob sand"
        style={{ width: 140, height: 140, bottom: '4%', left: '-30px' }}
      />
      <div className="wrap">
        <Reveal>
          <Eyebrow icon={FolderGit2}>Selected work</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h2" style={{ maxWidth: '20ch' }}>
            Projects that <em>solve real problems.</em>
          </h2>
        </Reveal>
        <div className="proj-grid">
          {projects.map((p, i) => (
            <Project
              key={p.id}
              p={p}
              i={i}
              onOpenCaseStudy={() => setActiveCaseStudy(p)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeCaseStudy && (
          <CaseStudyModal
            project={activeCaseStudy}
            onClose={() => setActiveCaseStudy(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
