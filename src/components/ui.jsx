import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/** Scroll-reveal wrapper */
export function Reveal({ children, delay = 0, y = 36, className = '', as = 'div', ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </M>
  )
}

/** Pointer-driven 3D tilt (fine pointers only) */
export function Tilt({ children, className = '', max = 8, style, inner = '' }) {
  const ref = useRef(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 140, damping: 16 })
  const sy = useSpring(py, { stiffness: 140, damping: 16 })
  const rotY = useTransform(sx, (v) => v * max)
  const rotX = useTransform(sy, (v) => -v * max)
  const fine = () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  const move = (e) => {
    if (!fine()) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const leave = () => { px.set(0); py.set(0) }

  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={className} style={{ perspective: 1200, ...style }}>
      <motion.div className={inner} style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  )
}

export const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export function Eyebrow({ icon: Icon, children }) {
  return (
    <span className="eyebrow">
      {Icon && <Icon size={14} />}
      {children}
    </span>
  )
}
