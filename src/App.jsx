import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { bindInput } from './scroll'
import { Nav, Hud, Hero, Marquee, About, Tracks, Screening, Problems, GameSection, Prizes, Timeline, Organisers, FAQ, Footer } from './sections'

const Scene = lazy(() => import('./Scene'))

function Loader({ onDone }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let v = 0
    const id = setInterval(() => {
      v = Math.min(100, v + Math.random() * 9 + 3)
      setN(Math.floor(v))
      if (v >= 100) { clearInterval(id); setTimeout(onDone, 450) }
    }, 60)
    return () => clearInterval(id)
  }, [])
  return (
    <motion.div className="loader" exit={{ opacity: 0, scale: 1.15 }} transition={{ duration: 0.8, ease: 'easeInOut' }}>
      <div className="loader-word">STAR<span>FORGE</span></div>
      <p>Loading</p>
      <div className="loader-bar"><i style={{ width: n + '%' }} /></div>
      <b>{n}%</b>
    </motion.div>
  )
}

export default function App() {
  const [ready, setReady] = useState(() => location.search.includes('skip'))
  useEffect(bindInput, [])
  useEffect(() => { document.body.style.overflow = ready ? '' : 'hidden' }, [ready])
  return (
    <>
      <Suspense fallback={null}><Scene /></Suspense>
      <div className="scrim" />
      <AnimatePresence>{!ready && <Loader onDone={() => setReady(true)} />}</AnimatePresence>
      <Nav ready={ready} />
      <Hud />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
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
