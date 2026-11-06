import { useEffect, useRef, useState } from 'react'

/**
 * Bubble Cursor & Particle Effects
 * - Smooth trailing cursor follower that inflates into an iridescent, glossy clay bubble
 *   when hovering over any button or interactive element.
 * - Dynamic canvas particle system for floating bubble trails, button bubble aura, and click burst.
 * - Gentle magnetic pull toward button center for an organic, tactile feel.
 * - Graceful fallback on touch/mobile devices or reduced motion.
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const bubbleRef = useRef(null)
  const canvasRef = useRef(null)

  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse/trackpad), not touch screens
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!hasFinePointer || prefersReducedMotion) {
      return
    }

    setEnabled(true)
    document.body.classList.add('has-custom-cursor')

    const dot = dotRef.current
    const bubble = bubbleRef.current
    const canvas = canvasRef.current
    if (!dot || !bubble || !canvas) return

    const ctx = canvas.getContext('2d')

    // Resize canvas
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const onResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    // Cursor position tracking
    const mouse = { x: -100, y: -100, prevX: -100, prevY: -100, speed: 0 }
    const follower = { x: -100, y: -100, vx: 0, vy: 0 }

    let isVisible = false
    let isHoveringButton = false
    let isHoveringLink = false
    let isClicking = false
    let hoveredElement = null
    let lastTrailTime = 0
    let rafId = null

    // Bubble particles
    const particles = []
    const MAX_PARTICLES = 65

    class BubbleParticle {
      constructor(x, y, radius, opts = {}) {
        this.x = x
        this.y = y
        this.radius = radius
        this.maxRadius = radius * (opts.expand ? 1.4 : 1)
        this.vx = opts.vx ?? (Math.random() - 0.5) * 1.5
        this.vy = opts.vy ?? -(Math.random() * 1.8 + 0.6) // Buoyancy upward
        this.alpha = opts.alpha ?? 0.75
        this.decay = opts.decay ?? (Math.random() * 0.015 + 0.012)
        this.wobble = Math.random() * Math.PI * 2
        this.wobbleSpeed = Math.random() * 0.08 + 0.03
        this.tint = opts.tint || (Math.random() > 0.5 ? 'maroon' : 'gold')
      }

      update() {
        this.x += this.vx + Math.sin(this.wobble) * 0.65
        this.y += this.vy
        this.wobble += this.wobbleSpeed
        this.vy -= 0.018 // Upward buoyancy
        this.radius += (this.maxRadius - this.radius) * 0.05
        this.alpha -= this.decay
        return this.alpha > 0.02
      }

      draw(c) {
        if (this.alpha <= 0) return
        c.save()
        c.globalAlpha = Math.max(0, Math.min(1, this.alpha))

        // Bubble spherical gradient
        const grad = c.createRadialGradient(
          this.x - this.radius * 0.32,
          this.y - this.radius * 0.32,
          this.radius * 0.1,
          this.x,
          this.y,
          this.radius
        )

        if (this.tint === 'maroon') {
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
          grad.addColorStop(0.35, 'rgba(235, 180, 190, 0.45)')
          grad.addColorStop(0.7, 'rgba(168, 42, 59, 0.28)')
          grad.addColorStop(1, 'rgba(107, 15, 29, 0.65)')
        } else {
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)')
          grad.addColorStop(0.35, 'rgba(245, 230, 195, 0.45)')
          grad.addColorStop(0.7, 'rgba(201, 154, 78, 0.28)')
          grad.addColorStop(1, 'rgba(140, 95, 30, 0.65)')
        }

        c.fillStyle = grad
        c.beginPath()
        c.arc(this.x, this.y, Math.max(0.5, this.radius), 0, Math.PI * 2)
        c.fill()

        // Soap bubble rim outline
        c.strokeStyle = 'rgba(255, 255, 255, 0.65)'
        c.lineWidth = Math.max(0.6, this.radius * 0.08)
        c.stroke()

        // Specular highlight glint
        c.fillStyle = 'rgba(255, 255, 255, 0.95)'
        c.beginPath()
        c.arc(
          this.x - this.radius * 0.35,
          this.y - this.radius * 0.35,
          Math.max(0.8, this.radius * 0.22),
          0,
          Math.PI * 2
        )
        c.fill()

        c.restore()
      }
    }

    const spawnBubble = (x, y, radius, opts) => {
      if (particles.length >= MAX_PARTICLES) {
        particles.shift()
      }
      particles.push(new BubbleParticle(x, y, radius, opts))
    }

    const spawnBurst = (x, y, count = 10) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
        const speed = Math.random() * 3.5 + 1.2
        const rad = Math.random() * 5 + 3
        spawnBubble(x, y, rad, {
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          decay: Math.random() * 0.025 + 0.02,
          expand: true,
          tint: Math.random() > 0.4 ? 'maroon' : 'gold',
        })
      }
    }

    // Inspect hovered element
    const updateHoverTarget = (target) => {
      if (!target) {
        isHoveringButton = false
        isHoveringLink = false
        hoveredElement = null
        return
      }
      const btn = target.closest(
        'button, .btn, .orb-btn, .burger, .nav-logo, [role="button"], input[type="submit"], input[type="button"]'
      )
      const link = !btn && target.closest('a, .chip')

      const prevHoverBtn = isHoveringButton
      isHoveringButton = !!btn
      isHoveringLink = !!link
      hoveredElement = btn || link || null

      // If newly entered a button, trigger bubble spawn effect around button!
      if (!prevHoverBtn && isHoveringButton) {
        spawnBurst(mouse.x, mouse.y, 6)
      }
    }

    // Mouse events
    const onMouseMove = (e) => {
      if (!isVisible) {
        isVisible = true
        follower.x = e.clientX
        follower.y = e.clientY
      }

      mouse.prevX = mouse.x
      mouse.prevY = mouse.y
      mouse.x = e.clientX
      mouse.y = e.clientY

      const dist = Math.hypot(mouse.x - mouse.prevX, mouse.y - mouse.prevY)
      mouse.speed = dist

      // Spawn subtle trailing micro-bubble on movement
      const now = performance.now()
      if (dist > 8 && now - lastTrailTime > 65) {
        lastTrailTime = now
        const offsetAngle = Math.random() * Math.PI * 2
        const offsetDist = Math.random() * 6
        spawnBubble(
          mouse.x + Math.cos(offsetAngle) * offsetDist,
          mouse.y + Math.sin(offsetAngle) * offsetDist,
          Math.random() * 4 + 2.5,
          {
            vx: (Math.random() - 0.5) * 0.8,
            vy: -(Math.random() * 1.2 + 0.4),
            decay: 0.035,
          }
        )
      }

      updateHoverTarget(e.target)
    }

    const onScroll = () => {
      if (mouse.x >= 0 && mouse.y >= 0) {
        const el = document.elementFromPoint(mouse.x, mouse.y)
        updateHoverTarget(el)
      }
    }

    const onMouseDown = (e) => {
      isClicking = true
      spawnBurst(e.clientX, e.clientY, isHoveringButton ? 12 : 6)
    }

    const onMouseUp = () => {
      isClicking = false
    }

    const onMouseLeave = () => {
      isVisible = false
      isHoveringButton = false
      isHoveringLink = false
      hoveredElement = null
    }

    const onMouseEnter = () => {
      isVisible = true
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Main animation loop
    let lastAuraTime = 0
    const render = (time) => {
      // 1. Follower spring / lerp with magnetic pull
      let targetX = mouse.x
      let targetY = mouse.y

      if (isHoveringButton && hoveredElement) {
        try {
          const rect = hoveredElement.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          // Subtle magnetic attraction (22% pull toward center)
          targetX = mouse.x + (centerX - mouse.x) * 0.22
          targetY = mouse.y + (centerY - mouse.y) * 0.22
        } catch {
          // fallback
        }
      }

      const lerpSpeed = isHoveringButton ? 0.22 : 0.16
      follower.x += (targetX - follower.x) * lerpSpeed
      follower.y += (targetY - follower.y) * lerpSpeed

      // 2. Position inner dot directly at mouse
      if (isVisible) {
        dot.style.opacity = '1'
        bubble.style.opacity = '1'
        dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`

        // Follower bubble position
        bubble.style.transform = `translate3d(${follower.x}px, ${follower.y}px, 0)`
      } else {
        dot.style.opacity = '0'
        bubble.style.opacity = '0'
      }

      // 3. Update bubble classes & states
      bubble.classList.toggle('bubble-button-mode', isHoveringButton)
      bubble.classList.toggle('bubble-link-mode', isHoveringLink)
      bubble.classList.toggle('bubble-clicking', isClicking)
      dot.classList.toggle('dot-button-mode', isHoveringButton)

      // When hovering on a button, continuously spawn gentle tiny floating bubbles
      if (isHoveringButton && time - lastAuraTime > 140) {
        lastAuraTime = time
        const angle = Math.random() * Math.PI * 2
        const r = 28 + Math.random() * 12
        spawnBubble(
          follower.x + Math.cos(angle) * r,
          follower.y + Math.sin(angle) * r,
          Math.random() * 3.5 + 2,
          {
            vx: Math.cos(angle) * 0.5,
            vy: -(Math.random() * 1.4 + 0.4),
            decay: 0.028,
            tint: 'maroon',
          }
        )
      }

      // 4. Update and draw canvas particles
      ctx.clearRect(0, 0, width, height)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        const alive = p.update()
        if (alive) {
          p.draw(ctx)
        } else {
          particles.splice(i, 1)
        }
      }

      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      {/* Background canvas for floating bubble particle effects */}
      <canvas
        ref={canvasRef}
        className="cursor-particle-canvas"
        aria-hidden="true"
      />

      {/* Primary bubble cursor follower */}
      <div ref={bubbleRef} className="cursor-bubble" aria-hidden="true">
        {/* Iridescent bubble gloss layers */}
        <div className="bubble-sheen" />
        <div className="bubble-shine-main" />
        <div className="bubble-shine-sub" />
        <div className="bubble-rim-glow" />
      </div>

      {/* Center precision target dot */}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
