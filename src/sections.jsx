import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { CONFIG } from './config'
import { Reveal, SplitText, Magnetic, Tilt, Counter } from './ui'
import Game from './Game'

export function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="sec">
      <div className="sec-head">
        <span className="eyebrow">{eyebrow}</span>
        <h2><SplitText text={title} /></h2>
      </div>
      {children}
    </section>
  )
}

/* ---------- HERO ---------- */
const pad = n => String(n).padStart(2, '0')
function Digit({ v, label }) {
  return (
    <div className="cd">
      <div className="cd-num">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.b key={v} initial={{ y: '-70%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '70%', opacity: 0 }} transition={{ duration: 0.3 }}>{v}</motion.b>
        </AnimatePresence>
      </div>
      <span>{label}</span>
    </div>
  )
}
function Countdown() {
  const [t, setT] = useState(() => Math.max(0, new Date(CONFIG.eventStart) - Date.now()))
  useEffect(() => { const id = setInterval(() => setT(Math.max(0, new Date(CONFIG.eventStart) - Date.now())), 1000); return () => clearInterval(id) }, [])
  return (
    <div className="countdown">
      <Digit v={pad(Math.floor(t / 864e5))} label="Days" />
      <Digit v={pad(Math.floor(t / 36e5) % 24)} label="Hours" />
      <Digit v={pad(Math.floor(t / 6e4) % 60)} label="Mins" />
      <Digit v={pad(Math.floor(t / 1e3) % 60)} label="Secs" />
    </div>
  )
}

const fade = (d) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: [0.2, 0.7, 0.2, 1] } })

export function Hero({ ready }) {
  const d = 0.1
  return (
    <section id="home" className="hero">
      {ready && (
        <>
          <motion.p className="eyebrow" {...fade(d)}>BMSIT&amp;M presents · Intercollege hackathon</motion.p>
          <h1>
            <SplitText text="STAR" immediate delay={d + 0.2} stagger={0.07} />
            <SplitText className="accent" text="FORGE" immediate delay={d + 0.5} stagger={0.07} />
            <motion.em {...fade(d + 1.1)}>2026</motion.em>
          </h1>
          <motion.p className="tagline" {...fade(d + 1.2)}>24 hours. Two tracks. One mission: forge the future beyond Earth.</motion.p>
          <motion.ul className="facts" {...fade(d + 1.35)}>
            <li>12 &amp; 13 December</li>
            <li>24 hours</li>
            <li>BMSIT&amp;M, Bengaluru</li>
            <li className="free">Free registration</li>
          </motion.ul>
          <motion.div className="prize-banner" {...fade(d + 1.5)}>
            <small>Total prize pool</small>
            <strong>{CONFIG.prizeTotal}</strong>
          </motion.div>
          <motion.div {...fade(d + 1.65)}><Countdown /></motion.div>
          <motion.div className="cta" {...fade(d + 1.8)}>
            <Magnetic><a className="btn" href={CONFIG.registerUrl} target="_blank" rel="noopener">Register on Unstop →</a></Magnetic>
            <Magnetic><a className="btn btn-ghost" href={CONFIG.brochureUrl} download>Download brochure</a></Magnetic>
          </motion.div>
          <motion.div className="mouse" {...fade(d + 2.2)}><i /></motion.div>
        </>
      )}
    </section>
  )
}

export function Marquee() {
  const items = ['FREE REGISTRATION', '24 HOURS', 'HARDWARE + SOFTWARE', '12–13 DECEMBER', 'BMSIT&M', 'PRIZE POOL', '6 PROBLEM STATEMENTS']
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{[0, 1].map(k => <div key={k}>{row.map((t, i) => <span key={i}>{t} <b>✦</b></span>)}</div>)}</div>
    </div>
  )
}

/* ---------- ABOUT ---------- */
export function About() {
  return (
    <Section id="about" eyebrow="01 · About" title="About the Event">
      <div className="grid two">
        <Reveal>
          <p className="lead">StarForge is a 24-hour intercollege hackathon hosted at BMSIT&amp;M where student teams from across colleges build solutions inspired by space exploration, from satellites and rovers to mission-control software and life support. Come with an idea, leave with a prototype.</p>
          <div className="note"><b>6 problem statements</b> will be released: 3 for the Hardware track and 3 for the Software track. Pick one and build it.</div>
        </Reveal>
        <div className="stats">
          {[[24, 'hours of building'], [6, 'problem statements'], [2, 'tracks'], [0, 'registration fee', '₹']].map(([n, l, p], i) => (
            <Reveal key={l} delay={i * 0.1}>
              <Tilt className="glass stat"><b><Counter to={n} prefix={p || ''} /></b><span>{l}</span></Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ---------- TRACKS ---------- */
export function Tracks() {
  const tracks = [
    ['01', 'Hardware Track', 'Sensors, microcontrollers, robotics, embedded systems and IoT. Build working physical prototypes that could survive a mission.'],
    ['02', 'Software Track', 'Web, mobile, AI/ML, data and simulation. Build the software that powers missions, analyses data and keeps crews safe.']
  ]
  return (
    <Section id="tracks" eyebrow="02 · Tracks" title="Two Tracks">
      <div className="grid two">
        {tracks.map(([i, t, d], k) => (
          <Reveal key={t} delay={k * 0.15}>
            <Tilt className="glass card">
              <span className="icon">{i}</span>
              <h3>{t}</h3><p>{d}</p><p className="muted">3 problem statements</p>
              
            </Tilt>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ---------- SCREENING ---------- */
export function Screening() {
  return (
    <Section id="screening" eyebrow="03 · Round 1" title="Online Screening (PPT)">
      <div className="grid two">
        <Reveal>
          <p className="lead">Teams first submit a short presentation online. Shortlisted teams get an invite to the 24-hour on-campus finale.</p>
          <ol className="steps">
            {['Register your team on Unstop.', 'Pick a problem statement once released.', 'Download the PPT template and fill it in.', 'Submit it on Unstop before the deadline.'].map((s, i) => (
              <motion.li key={s} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 * i, duration: 0.6 }}>
                <b>{i + 1}</b>{s}
              </motion.li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.2}>
          <Tilt className="glass card center">
            <span className="icon">PPT</span><h3>PPT Template</h3><p>Use the official template for your submission.</p>
            <Magnetic><a className="btn" href={CONFIG.pptTemplateUrl} download>Download template</a></Magnetic>
          </Tilt>
        </Reveal>
      </div>
    </Section>
  )
}

/* ---------- PROBLEMS ---------- */
export function Problems() {
  const [tab, setTab] = useState('hw')
  return (
    <Section id="problems" eyebrow="04 · Problems" title="Problem Statements">
      <div className="tabs" role="tablist">
        {[['hw', 'Hardware'], ['sw', 'Software']].map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={'tab' + (tab === k ? ' active' : '')} onClick={() => setTab(k)}>
            {tab === k && <motion.span layoutId="pill" className="pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span>{l}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} className="grid three" initial="h" animate="s" exit="x" variants={{ s: { transition: { staggerChildren: 0.12 } }, x: { transition: { staggerChildren: 0.05 } } }}>
          {CONFIG.problems[tab].map((p, i) => (
            <motion.div key={p.title} variants={{ h: { opacity: 0, y: 40, rotateX: -20 }, s: { opacity: 1, y: 0, rotateX: 0 }, x: { opacity: 0, y: -20 } }}>
              <Tilt className="glass card ps">
                <div className="num">{tab === 'hw' ? 'HW' : 'SW'}-0{i + 1}</div>
                <h3>{p.title}</h3><p>{p.desc}</p>
                <span className="tag">{tab === 'hw' ? 'Hardware' : 'Software'}</span>
                
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </Section>
  )
}

/* ---------- GAME ---------- */
export function GameSection() {
  return (
    <Section id="game" eyebrow="Optional" title="Asteroid Dodger">
      <Reveal><p className="lead center">Warm up for the hackathon. Steer the ship, dodge asteroids, grab stars. Use ← → / A D or drag/touch.</p></Reveal>
      <Reveal delay={0.15}><Game /></Reveal>
    </Section>
  )
}

/* ---------- PRIZES ---------- */
export function Prizes() {
  return (
    <Section id="prizes" eyebrow="05 · Prizes" title="Prize Pool">
      <Reveal><p className="center big-prize">Total prize pool<b>{CONFIG.prizeTotal}</b></p></Reveal>
      <div className="grid three podium">
        {CONFIG.prizes.map((p, i) => (
          <Reveal key={p.place} delay={i * 0.15}>
            <Tilt className={'glass card ' + (p.first ? 'first' : '')}>
              <span className="medal">{i + 1}</span>
              <h3>{p.place} place</h3><div className="amt">{p.amount}</div>
              
            </Tilt>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ---------- TIMELINE ---------- */
export function Timeline() {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return (
    <Section id="timeline" eyebrow="06 · Schedule" title="Timeline">
      <ol className="timeline" ref={ref}>
        <div className="tl-line"><motion.i style={{ height: h }} /></div>
        {CONFIG.timeline.map((t, i) => (
          <motion.li key={i} className={i % 2 ? 'right' : 'left'}
            initial={{ opacity: 0, x: i % 2 ? 60 : -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}>
            <span className="dot" />
            <div className="glass tl-card"><time>{t.when}</time><h3>{t.title}</h3><p className="muted">{t.desc}</p></div>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}

/* ---------- ORGANISERS ---------- */
export function Organisers() {
  return (
    <Section id="organisers" eyebrow="07 · Hosts" title="Organised By">
      <div className="grid two">
        <Reveal><Tilt className="glass card center"><h3>BMS Institute of Technology &amp; Management</h3><p>Yelahanka, Bengaluru</p></Tilt></Reveal>
        <Reveal delay={0.15}><Tilt className="glass card center"><h3>{CONFIG.organiserClub}</h3><p>Student organising team</p></Tilt></Reveal>
      </div>
    </Section>
  )
}

/* ---------- FAQ ---------- */
export function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <Section id="faq" eyebrow="08 · FAQ" title="FAQ">
      <div className="faq">
        {CONFIG.faq.map(([q, a], i) => (
          <Reveal key={q} delay={i * 0.04} y={20}>
            <div className={'glass faq-item' + (open === i ? ' open' : '')}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{q}</span><motion.i animate={{ rotate: open === i ? 45 : 0 }}>+</motion.i>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                    <p>{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ---------- FOOTER ---------- */
export function Footer() {
  return (
    <footer id="contact">
      <div className="foot-mark" aria-hidden="true">STARFORGE</div>
      <div className="grid three foot">
        <Reveal>
          <h3 className="foot-logo">STAR<span>FORGE</span></h3>
          <p className="muted">24-hour intercollege hackathon · 12th &amp; 13th December · BMSIT&amp;M</p>
          <Magnetic><a className="btn btn-sm" href={CONFIG.instagramUrl} target="_blank" rel="noopener">Follow on Instagram</a></Magnetic>
        </Reveal>
        <Reveal delay={0.1}>
          <h4>Contact</h4>
          {CONFIG.contacts.map(c => <p key={c.name}><b>{c.name}</b><br /><a href={'tel:' + c.phone}>{c.phone}</a></p>)}
        </Reveal>
        <Reveal delay={0.2}>
          <h4>Location</h4>
          <p>BMS Institute of Technology &amp; Management, Avalahalli, Doddaballapur Main Road, Yelahanka, Bengaluru 560064</p>
        </Reveal>
      </div>
      <Reveal>
        <iframe className="map" title="BMSIT&M location" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=BMS+Institute+of+Technology+and+Management+Yelahanka+Bengaluru&output=embed" />
      </Reveal>
      <p className="copy">© 2026 StarForge · BMSIT&amp;M</p>
    </footer>
  )
}

/* ---------- NAV + HUD ---------- */
export function Nav({ ready }) {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  useMotionValueEvent(scrollY, 'change', v => { setHidden(v > (scrollY.getPrevious() ?? 0) && v > 200) })
  const links = ['about', 'tracks', 'problems', 'prizes', 'timeline', 'faq', 'contact']
  return (
    <>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <motion.header className="nav" initial={{ y: -80 }} animate={{ y: ready && !hidden ? 0 : -90 }} transition={{ duration: 0.4 }}>
        <a href="#home" className="logo">STAR<span>FORGE</span></a>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
        <nav className={open ? 'open' : ''} onClick={() => setOpen(false)}>
          {links.map(l => <a key={l} href={'#' + l}>{l}</a>)}
          <a className="btn btn-sm" href={CONFIG.registerUrl} target="_blank" rel="noopener">Register</a>
        </nav>
      </motion.header>
    </>
  )
}

export function Hud() {
  const ref = useRef()
  const { scrollYProgress } = useScroll()
  useMotionValueEvent(scrollYProgress, 'change', v => { if (ref.current) ref.current.textContent = Math.round(v * 384400).toLocaleString('en-IN') + ' KM' })
  return (
    <div className="hud" aria-hidden="true">
      <small>Distance from Earth</small>
      <b ref={ref}>0 KM</b>
    </div>
  )
}
