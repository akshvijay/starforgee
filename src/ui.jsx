import { motion, useMotionValue, useSpring, useInView, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function Reveal({ children, delay = 0, y = 40, className = '' }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}>
      {children}
    </motion.div>
  )
}

const GLYPHS = '!<>-_\\/[]{}=+*^?#01'
export function Scramble({ text, className }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true })
  const [out, setOut] = useState('')
  useEffect(() => {
    if (!inView) return
    let f = 0
    const id = setInterval(() => {
      f++
      setOut(text.split('').map((c, i) => (c === ' ' || i < (f - 4) / 1.5 ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join(''))
      if (f > text.length * 1.5 + 8) { setOut(text); clearInterval(id) }
    }, 30)
    return () => clearInterval(id)
  }, [inView, text])
  return <span ref={ref} className={className}>{out || ' '}</span>
}

export function SplitText({ text, className = '', delay = 0, stagger = 0.04, immediate = false }) {
  const parent = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }
  const child = {
    hidden: { y: '110%', rotateX: -80, opacity: 0 },
    show: { y: 0, rotateX: 0, opacity: 1, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } }
  }
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '-60px' } }
  return (
    <motion.span className={'split ' + className} variants={parent} initial="hidden" {...trigger} aria-label={text}>
      {text.split(' ').map((w, wi, arr) => (
        <span className="split-word" key={wi} aria-hidden="true">
          {w.split('').map((c, i) => <motion.span key={i} className="split-char" variants={child}>{c}</motion.span>)}
          {wi < arr.length - 1 && ' '}
        </span>
      ))}
    </motion.span>
  )
}

export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef()
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 14 }), sy = useSpring(y, { stiffness: 220, damping: 14 })
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={e => {
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}>
      {children}
    </motion.div>
  )
}

export function Tilt({ children, className = '', max = 2.5, as = 'div', ...rest }) {
  const ref = useRef()
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 180, damping: 18 }), sry = useSpring(ry, { stiffness: 180, damping: 18 })
  const M = motion[as]
  return (
    <M ref={ref} className={'tilt ' + className} style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }} {...rest}
      onMouseMove={e => {
        const r = ref.current.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
        ry.set((px - 0.5) * max * 2); rx.set(-(py - 0.5) * max * 2)
        ref.current.style.setProperty('--mx', px * 100 + '%'); ref.current.style.setProperty('--my', py * 100 + '%')
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0) }}>
      {children}
    </M>
  )
}

export function Counter({ to, prefix = '', suffix = '' }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease: 'easeOut', onUpdate: v => { ref.current.textContent = prefix + Math.round(v) + suffix } })
    return () => c.stop()
  }, [inView])
  return <span ref={ref}>{prefix}0{suffix}</span>
}

export function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 180, damping: 22 }), ry = useSpring(y, { stiffness: 180, damping: 22 })
  const [hover, setHover] = useState(false)
  useEffect(() => {
    const move = e => { x.set(e.clientX); y.set(e.clientY); setHover(!!e.target.closest?.('a,button,summary,.tilt,.tab')) }
    addEventListener('pointermove', move)
    return () => removeEventListener('pointermove', move)
  }, [])
  return (
    <>
      <motion.div className="cursor-ring" style={{ x: rx, y: ry }} animate={{ scale: hover ? 1.8 : 1 }} />
      <motion.div className="cursor-dot" style={{ x, y }} />
    </>
  )
}
