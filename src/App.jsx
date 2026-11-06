import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

function Preloader({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 1300); return () => clearTimeout(t) }, [onDone])
  return (
    <motion.div className="preloader" exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: .6 }}>
      <div>
        <motion.div className="ball" initial={{ y: -60, scale: .8 }} animate={{ y: [-60, 0, -18, 0], scale: [.8, 1, 1, 1] }} transition={{ duration: 1.1, times: [0, .45, .75, 1] }}>MR</motion.div>
        <div className="shadow" />
        <div className="bar"><motion.i initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.2, ease: 'easeInOut' }} /></div>
      </div>
    </motion.div>
  )
}

export default function App() {
  const [intro, setIntro] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !location.search.includes('nointro'))
  useEffect(() => { document.body.classList.toggle('locked', intro) }, [intro])
  return (
    <>
      <Cursor />
      <a href="#about" className="skip">Skip to content</a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <AnimatePresence>{intro && <Preloader key="p" onDone={() => setIntro(false)} />}</AnimatePresence>
    </>
  )
}
