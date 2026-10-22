import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { CONFIG } from './config'
import { Reveal, SplitText, Magnetic, Tilt, Counter } from './ui'
import Game from './Game'
import { Trooper, Sage, Droid, DarkLord, Elder, Walker } from './Chibi'

export function Saber({ color = 'var(--blue)' }) {
  return (
    <div className="saber" style={{ '--c': color }}>
      <span className="hilt" />
      <motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }} />
    </div>
  )
}

export function Section({ id, eyebrow, title, color, children }) {
  return (
    <section id={id} className="sec">
      <div className="sec-head">
        <span className="eyebrow">{eyebrow}</span>
        <h2><SplitText text={title} /></h2>
        <Saber color={color} />
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
            <span className="l1"><SplitText text="STAR" immediate delay={d + 0.2} stagger={0.07} /></span>
            <span className="l2"><SplitText text="FORGE" immediate delay={d + 0.5} stagger={0.07} /></span>
            <motion.em {...fade(d + 1.1)}>Hackathon 2026</motion.em>
          </h1>
          <motion.p className="tagline" {...fade(d + 1.2)}>24 hours. Two sides. One mission: forge the future across the galaxy.</motion.p>
          <motion.ul className="facts" {...fade(d + 1.35)}>
            <li>12 &amp; 13 December</li>
            <li>24 hours</li>
            <li>BMSIT&amp;M, Bengaluru</li>
            <li className="free">Free registration</li>
          </motion.ul>
          <motion.div className="statrow" {...fade(d + 1.5)}>
            <div className="prize-banner">
              <small>Total prize pool</small>
              <strong>{CONFIG.prizeTotal}</strong>
            </div>
            <Countdown />
          </motion.div>
          <motion.div className="cta" {...fade(d + 1.8)}>
            <Magnetic><a className="btn" href={CONFIG.registerUrl} target="_blank" rel="noopener">Register on Unstop →</a></Magnetic>
            <Magnetic><a className="btn btn-ghost" href={CONFIG.brochureUrl} download>Download brochure</a></Magnetic>
          </motion.div>
          <div className="walkers">
            <motion.div {...fade(d + 2.2)}>
              <Walker size={112} duration={26}><Sage size={112} className="walking" /></Walker>
              <Walker size={112} duration={26} delay={-13}><DarkLord size={112} className="walking" /></Walker>
            </motion.div>
          </div>
          <motion.div className="mouse" {...fade(d + 2.2)}><i /></motion.div>
        </>
      )}
    </section>
  )
}

export function Marquee() {
  const items = ['MAY THE FORGE BE WITH YOU', 'FREE REGISTRATION', '24 HOURS', 'LIGHT SIDE: HARDWARE', 'DARK SIDE: SOFTWARE', '12–13 DECEMBER', 'BMSIT&M', 'THE BOUNTY AWAITS']
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{[0, 1].map(k => <div key={k}>{row.map((t, i) => <span key={i}>{t} <b>✦</b></span>)}</div>)}</div>
    </div>
  )
}

/* ---------- ABOUT (opening crawl) ---------- */
export function Crawl() {
  const ref = useRef(), plane = useRef(), txt = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const y = useTransform(scrollYProgress, p => {
    const ph = plane.current?.offsetHeight || 900, th = txt.current?.offsetHeight || 1200
    const from = ph * 0.97, to = -th + ph * 0.12
    return from + (to - from) * p + 'px'
  })
  return (
    <section id="about" className="crawl-sec" ref={ref}>
      <div className="crawl-stage">
        <div className="crawl-plane" ref={plane}>
          <motion.div className="crawl" ref={txt} style={{ y }}>
            <p className="ep">Episode 2026</p>
            <h2>The Forge Begins</h2>
            <p>It is a period of intense innovation. Student teams from colleges across the galaxy are gathering at BMSIT&amp;M for a 24-hour intercollege hackathon on the 12th and 13th of December.</p>
            <p>Two sides stand before them: HARDWARE, where circuits and machines spring to life, and SOFTWARE, where code bends the galaxy to its will. Six problem statements, three for each side, will be revealed.</p>
            <p>Entry is free, and a great bounty awaits those who build the boldest solution. Gather your squad, choose your side, and register on Unstop&hellip;</p>
          </motion.div>
        </div>
        <div className="crawl-fade" />
      </div>
    </section>
  )
}

export function Facts() {
  return (
    <Section id="facts" eyebrow="01 · Mission data" title="By the Numbers">
      <div className="stats four">
        {[[24, 'hours of building'], [6, 'problem statements'], [2, 'sides to choose'], [0, 'registration fee', '₹']].map(([n, l, p], i) => (
          <Reveal key={l} delay={i * 0.1}>
            <Tilt className="glass stat"><b><Counter to={n} prefix={p || ''} /></b><span>{l}</span></Tilt>
          </Reveal>
        ))}
      </div>
      <Reveal><div className="note"><b>6 problem statements</b> will be released: 3 for the Hardware track and 3 for the Software track. Pick one and build it.</div></Reveal>
    </Section>
  )
}

/* ---------- TRACKS ---------- */
export function Tracks() {
  const tracks = [
    [<Droid size={104} className="d1" />, 'Hardware Track', 'Sensors, microcontrollers, robotics, embedded systems and IoT. Build working physical prototypes that could survive a mission.'],
    [<DarkLord size={108} className="d2" />, 'Software Track', 'Web, mobile, AI/ML, data and simulation. Build the software that powers missions, analyses data and keeps crews safe.']
  ]
  return (
    <Section id="tracks" eyebrow="02 · Choose your side" title="Two Tracks" color="var(--accent)">
      <div className="grid two chibi-grid">
        {tracks.map(([i, t, d], k) => (
          <Reveal key={t} delay={k * 0.15}>
            <Tilt className="glass card">
              <span className="card-chibi">{i}</span>
              <span className={'side ' + (k ? 'dark' : 'light')}>{k ? 'Dark side' : 'Light side'}</span><h3>{t}</h3><p>{d}</p><p className="muted">3 problem statements</p>
              
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
    <Section id="screening" eyebrow="03 · Round 1 · Holotransmission" title="Online Screening (PPT)">
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
    <Section id="problems" eyebrow="04 · Choose your mission" title="Problem Statements" color="var(--red)">
      <div className="tabs" role="tablist">
        {[['hw', 'Light side · Hardware'], ['sw', 'Dark side · Software']].map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} data-t={k} className={'tab' + (tab === k ? ' active' : '')} onClick={() => setTab(k)}>
            {tab === k && <motion.span layoutId="pill" className="pill" data-t={k} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span>{l}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} className="grid three" initial="h" animate="s" exit="x" variants={{ s: { transition: { staggerChildren: 0.12 } }, x: { transition: { staggerChildren: 0.05 } } }}>
          {CONFIG.problems[tab].map((p, i) => (
            <motion.div key={p.title} variants={{ h: { opacity: 0, y: 40, rotateX: -20 }, s: { opacity: 1, y: 0, rotateX: 0 }, x: { opacity: 0, y: -20 } }}>
              <Tilt className="glass card ps" data-t={tab}>
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
    <Section id="game" eyebrow="Optional · Pilot training" title="Asteroid Dodger">
      <Reveal><p className="lead center">Warm up for the hackathon. Steer the ship, dodge asteroids, grab stars. Use ← → / A D or drag/touch.</p></Reveal>
      <Reveal delay={0.15}><Game /></Reveal>
    </Section>
  )
}

/* ---------- PRIZES ---------- */
export function Prizes() {
  return (
    <Section id="prizes" eyebrow="05 · The bounty" title="Prize Pool" color="var(--accent)">
      <Reveal><p className="center big-prize">Total prize pool<b>{CONFIG.prizeTotal}</b></p></Reveal>
      <div className="grid three podium chibi-grid">
        {CONFIG.prizes.map((p, i) => (
          <Reveal key={p.place} delay={i * 0.15}>
            <Tilt className={'glass card ' + (p.first ? 'first' : '')}>
              <span className="card-chibi top">{[<Elder size={96} className="d1" />, <Droid size={88} className="d2" />, <Trooper size={88} />][i]}</span>
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
    <Section id="timeline" eyebrow="06 · Flight plan" title="Timeline">
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
    <Section id="organisers" eyebrow="07 · The council" title="Organised By" color="var(--red)">
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
    <Section id="faq" eyebrow="08 · Ask the master" title="FAQ">
      <div className="faq">
        <Elder size={130} className="faq-droid d1" />
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
      <div className="foot-crew"><Droid size={80} className="d1" /><Elder size={96} /><Trooper size={88} className="d2" /><p>May the Forge be with you.</p></div>
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
      <p className="copy">© 2026 StarForge · BMSIT&amp;M<br />Unofficial fan-made tribute. Star Wars and its characters are trademarks of Lucasfilm Ltd. / Disney. Not affiliated with or endorsed by them.</p>
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
  const { scrollYProgress, scrollY } = useScroll()
  const opacity = useTransform(scrollY, [250, 600], [0, 1])
  useMotionValueEvent(scrollYProgress, 'change', v => { if (ref.current) ref.current.textContent = Math.round(v * 12000).toLocaleString('en-IN') })
  return (
    <motion.div className="hud" style={{ opacity }} aria-hidden="true">
      <small>Parsecs travelled</small>
      <b ref={ref}>0</b>
    </motion.div>
  )
}
