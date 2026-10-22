import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { bindInput } from './scroll'
import { Flybys } from './Chibi'
import { Nav, Hud, Hero, Marquee, Crawl, Facts, Tracks, Screening, Problems, GameSection, Prizes, Timeline, Organisers, FAQ, Footer } from './sections'

const Scene = lazy(() => import('./Scene'))

function Warp() {
  const ref = useRef()
  useEffect(() => {
    const c = ref.current, g = c.getContext('2d')
    c.width = innerWidth; c.height = innerHeight
    const cx = c.width / 2, cy = c.height / 2, max = Math.hypot(cx, cy)
    const st = Array.from({ length: 260 }, () => ({ a: Math.random() * 6.283, r: Math.random() * 40 + 5, s: Math.random() * 8 + 2 }))
    const t0 = performance.now()
    let raf
    const loop = t => {
      const k = Math.min(1, (t - t0) / 1000)
      g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(0, 0, c.width, c.height)
      g.lineWidth = 1 + k * 1.5; g.strokeStyle = `rgba(190,215,255,${0.4 + k * 0.6})`
      st.forEach(o => {
        const r2 = o.r + o.s * (1 + k * k * 14)
        g.beginPath(); g.moveTo(cx + Math.cos(o.a) * o.r, cy + Math.sin(o.a) * o.r); g.lineTo(cx + Math.cos(o.a) * r2, cy + Math.sin(o.a) * r2); g.stroke()
        o.r = r2
        if (r2 > max) { o.r = Math.random() * 30 + 5; o.a = Math.random() * 6.283 }
      })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={ref} className="warp" />
}

function Loader({ onDone }) {
  const [stage, setStage] = useState(0)
  useEffect(() => {
    const a = setTimeout(() => setStage(1), 2300), b = setTimeout(() => setStage(2), 4300), c = setTimeout(onDone, 5300)
    return () => { clearTimeout(a); clearTimeout(b); clearTimeout(c) }
  }, [])
  return (
    <motion.div className="loader" exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
      {stage === 2 && <Warp />}
      <AnimatePresence mode="wait">
        {stage === 0 && <motion.p key="a" className="intro-blue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>A long time ago, in a college not so far away&hellip;</motion.p>}
        {stage === 1 && <motion.div key="b" className="intro-title" initial={{ scale: 2.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.2, opacity: 0 }} transition={{ duration: 2, ease: [0.2, 0.7, 0.2, 1] }}>STAR<br />FORGE</motion.div>}
      </AnimatePresence>
      <button className="skip" onClick={onDone}>Skip intro</button>
    </motion.div>
  )
}

export default function App() {
  const [ready, setReady] = useState(() => location.search.includes('skip'))
  useEffect(bindInput, [])
  useEffect(() => { if (ready && location.hash) setTimeout(() => document.querySelector(location.hash)?.scrollIntoView(), 100) }, [ready])
  useEffect(() => { document.body.style.overflow = ready ? '' : 'hidden' }, [ready])
  return (
    <>
      {!location.search.includes('nogl') && <Suspense fallback={null}><Scene /></Suspense>}
      <div className="scrim" />
      <Flybys />
      <AnimatePresence>{!ready && <Loader onDone={() => setReady(true)} />}</AnimatePresence>
      <Nav ready={ready} />
      <Hud />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Crawl />
        <Facts />
        <Tracks />
        <Screening />
        <Problems />
        <GameSection />
        <Prizes />
        <Timeline />
        <Organisers />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
