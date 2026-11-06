import { useEffect, useRef } from 'react'

/**
 * Bubble Cursor & Particle Effects
 * Always renders the DOM elements so refs are valid on first effect run.
 * Visibility is controlled via CSS opacity — no conditional render.
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const bubbleRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    // Only enable on fine-pointer devices (mouse/trackpad)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!hasFinePointer || prefersReducedMotion) return

    const dot = dotRef.current
    const bubble = bubbleRef.current
    const canvas = canvasRef.current
    if (!dot || !bubble || !canvas) return

    document.body.classList.add('has-custom-cursor')
    const ctx = canvas.getContext('2d')

    // Size canvas to viewport
    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    // State
    const mouse = { x: -300, y: -300, px: -300, py: -300 }
    const follower = { x: -300, y: -300 }
    let visible = false
    let onBtn = false
    let onLink = false
    let clicking = false
    let hoveredEl = null
    let lastTrail = 0
    let lastAura = 0
    let raf = null

    // ── Particles ────────────────────────────────────────────────────────────
    const particles = []
    const MAX_P = 60

    class Bubble {
      constructor(x, y, r, opts = {}) {
        this.x = x; this.y = y; this.r = r
        this.maxR = r * (opts.expand ? 1.4 : 1)
        this.vx = opts.vx ?? (Math.random() - 0.5) * 1.5
        this.vy = opts.vy ?? -(Math.random() * 1.8 + 0.6)
        this.a = opts.a ?? 0.75
        this.decay = opts.decay ?? (Math.random() * 0.015 + 0.012)
        this.wobble = Math.random() * Math.PI * 2
        this.wobbleSpeed = Math.random() * 0.08 + 0.03
        this.gold = opts.gold ?? Math.random() > 0.5
      }

      tick() {
        this.x += this.vx + Math.sin(this.wobble) * 0.6
        this.y += this.vy
        this.wobble += this.wobbleSpeed
        this.vy -= 0.016
        this.r += (this.maxR - this.r) * 0.05
        this.a -= this.decay
        return this.a > 0.02
      }

      draw(c) {
        if (this.a <= 0) return
        c.save()
        c.globalAlpha = Math.min(1, Math.max(0, this.a))
        const g = c.createRadialGradient(
          this.x - this.r * 0.32, this.y - this.r * 0.32, this.r * 0.1,
          this.x, this.y, this.r
        )
        if (this.gold) {
          g.addColorStop(0,   'rgba(255,255,255,0.95)')
          g.addColorStop(0.35,'rgba(245,230,195,0.45)')
          g.addColorStop(0.7, 'rgba(201,154,78,0.28)')
          g.addColorStop(1,   'rgba(140,95,30,0.65)')
        } else {
          g.addColorStop(0,   'rgba(255,255,255,0.9)')
          g.addColorStop(0.35,'rgba(235,180,190,0.45)')
          g.addColorStop(0.7, 'rgba(168,42,59,0.28)')
          g.addColorStop(1,   'rgba(107,15,29,0.65)')
        }
        c.fillStyle = g
        c.beginPath()
        c.arc(this.x, this.y, Math.max(0.5, this.r), 0, Math.PI * 2)
        c.fill()
        c.strokeStyle = 'rgba(255,255,255,0.65)'
        c.lineWidth = Math.max(0.6, this.r * 0.08)
        c.stroke()
        // specular glint
        c.fillStyle = 'rgba(255,255,255,0.95)'
        c.beginPath()
        c.arc(this.x - this.r * 0.35, this.y - this.r * 0.35, Math.max(0.8, this.r * 0.22), 0, Math.PI * 2)
        c.fill()
        c.restore()
      }
    }

    const spawn = (x, y, r, opts) => {
      if (particles.length >= MAX_P) particles.shift()
      particles.push(new Bubble(x, y, r, opts))
    }

    const burst = (x, y, count = 10) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
        const speed = Math.random() * 3.5 + 1.2
        spawn(x, y, Math.random() * 5 + 3, {
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          decay: Math.random() * 0.025 + 0.02,
          expand: true,
          gold: Math.random() > 0.4,
        })
      }
    }

    // ── Hover detection ───────────────────────────────────────────────────────
    const detectHover = (target) => {
      if (!target) { onBtn = false; onLink = false; hoveredEl = null; return }
      const btn = target.closest(
        'button,.btn,.orb-btn,.burger,.nav-logo,[role="button"]'
      )
      const link = !btn && target.closest('a,.chip')
      const wasBtn = onBtn
      onBtn = !!btn
      onLink = !!link
      hoveredEl = btn || link || null
      if (!wasBtn && onBtn) burst(mouse.x, mouse.y, 6)
    }

    // ── Event listeners ───────────────────────────────────────────────────────
    const onMove = (e) => {
      if (!visible) {
        visible = true
        // Snap follower to mouse on first entry so there's no "fly-in"
        follower.x = e.clientX
        follower.y = e.clientY
      }
      mouse.px = mouse.x; mouse.py = mouse.y
      mouse.x = e.clientX; mouse.y = e.clientY

      const dist = Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py)
      const now = performance.now()
      if (dist > 8 && now - lastTrail > 65) {
        lastTrail = now
        const a = Math.random() * Math.PI * 2
        spawn(
          mouse.x + Math.cos(a) * Math.random() * 6,
          mouse.y + Math.sin(a) * Math.random() * 6,
          Math.random() * 4 + 2.5,
          { vx: (Math.random() - 0.5) * 0.8, vy: -(Math.random() * 1.2 + 0.4), decay: 0.035 }
        )
      }
      detectHover(e.target)
    }

    const onScroll = () => {
      if (mouse.x > 0 || mouse.y > 0) detectHover(document.elementFromPoint(mouse.x, mouse.y))
    }

    const onDown = (e) => { clicking = true; burst(e.clientX, e.clientY, onBtn ? 12 : 6) }
    const onUp = () => { clicking = false }
    const onLeave = () => { visible = false; onBtn = false; onLink = false; hoveredEl = null }
    const onEnter = () => { visible = true }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    // ── Render loop ───────────────────────────────────────────────────────────
    const loop = (time) => {
      // Lerp follower toward mouse (with optional magnetic snap to button center)
      let tx = mouse.x, ty = mouse.y
      if (onBtn && hoveredEl) {
        try {
          const r = hoveredEl.getBoundingClientRect()
          tx = mouse.x + (r.left + r.width / 2 - mouse.x) * 0.22
          ty = mouse.y + (r.top + r.height / 2 - mouse.y) * 0.22
        } catch { /* ignore */ }
      }
      const lerp = onBtn ? 0.22 : 0.16
      follower.x += (tx - follower.x) * lerp
      follower.y += (ty - follower.y) * lerp

      // Move DOM elements
      if (visible) {
        dot.style.opacity = '1'
        bubble.style.opacity = '1'
        dot.style.transform = `translate3d(${mouse.x}px,${mouse.y}px,0)`
        bubble.style.transform = `translate3d(${follower.x}px,${follower.y}px,0)`
      } else {
        dot.style.opacity = '0'
        bubble.style.opacity = '0'
      }

      // State classes
      bubble.classList.toggle('bubble-button-mode', onBtn)
      bubble.classList.toggle('bubble-link-mode', onLink)
      bubble.classList.toggle('bubble-clicking', clicking)
      dot.classList.toggle('dot-button-mode', onBtn)

      // Aura particles while hovering button
      if (onBtn && time - lastAura > 140) {
        lastAura = time
        const a = Math.random() * Math.PI * 2
        const r = 28 + Math.random() * 12
        spawn(
          follower.x + Math.cos(a) * r,
          follower.y + Math.sin(a) * r,
          Math.random() * 3.5 + 2,
          { vx: Math.cos(a) * 0.5, vy: -(Math.random() * 1.4 + 0.4), decay: 0.028 }
        )
      }

      // Canvas particles
      ctx.clearRect(0, 0, W, H)
      for (let i = particles.length - 1; i >= 0; i--) {
        if (!particles[i].tick()) particles.splice(i, 1)
        else particles[i].draw(ctx)
      }

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.body.classList.remove('has-custom-cursor')
    }
  }, []) // runs exactly once after mount — refs are guaranteed valid

  // Always render; CSS controls visibility.
  // Wrapped in a fragment so it renders at the top of <body> via App.jsx
  return (
    <>
      <canvas ref={canvasRef} className="cursor-particle-canvas" aria-hidden="true" />

      <div ref={bubbleRef} className="cursor-bubble" aria-hidden="true">
        <div className="bubble-sheen" />
        <div className="bubble-shine-main" />
        <div className="bubble-shine-sub" />
        <div className="bubble-rim-glow" />
      </div>

      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
