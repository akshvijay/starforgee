import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { CONFIG } from './config'
import { Reveal, SplitText, Magnetic, Tilt, Counter, Logo } from './ui'
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
          <motion.p className="eyebrow" {...fade(d)}>BMSIT&amp;M presents · National hackathon</motion.p>
          <h1>
            <span className="l1"><SplitText text="STAR" immediate delay={d + 0.2} stagger={0.07} /></span>
            <span className="l2"><SplitText text="FORGE" immediate delay={d + 0.5} stagger={0.07} /></span>
            <motion.em {...fade(d + 1.1)}>Hackathon 2026</motion.em>
          </h1>
          <motion.p className="tagline" {...fade(d + 1.2)}>24 hours. Two tracks. One mission: forge the future across the galaxy.</motion.p>
          <motion.ul className="facts" {...fade(d + 1.35)}>
            <li>12 &amp; 13 December</li>
            <li>BMSIT&amp;M, Bengaluru</li>
            <li>Teams of 3&ndash;4, at least 1 girl</li>
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
          <motion.p className="deadline" {...fade(d + 1.9)}>Registrations close 20 Nov, 11:59 PM IST &middot; Every team must include at least one girl</motion.p>
          <div className="walkers">
            <motion.div {...fade(d + 2.2)}>
              <Walker size={96} duration={26}><Sage size={96} className="walking" /></Walker>
              <Walker size={96} duration={26} delay={-13}><DarkLord size={96} className="walking" /></Walker>
            </motion.div>
          </div>
          <motion.div className="mouse" {...fade(d + 2.2)}><i /></motion.div>
        </>
      )}
    </section>
  )
}

export function Marquee() {
  const items = ['MAY THE FORGE BE WITH YOU', 'FREE REGISTRATION', '24 HOURS', 'HARDWARE TRACK', 'SOFTWARE TRACK', '12–13 DECEMBER', 'BMSIT&M', 'THE BOUNTY AWAITS']
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
            <p>It is a period of intense innovation. Student teams from across the country are gathering at BMSIT&amp;M for a 24-hour national hackathon on the 12th and 13th of December.</p>
            <p>Two tracks stand before them: HARDWARE, where circuits and machines spring to life, and SOFTWARE, where code bends the galaxy to its will. Each track offers five problem statements and one open challenge of its own.</p>
            <p>Entry is free, and a bounty of ₹65,000 awaits those who build the boldest solution. Gather a squad of three or four, with at least one girl on the team, choose a track, and register on Unstop&hellip;</p>
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
        {[[24, 'hours of building'], [12, 'problem statements'], [65000, 'prize pool', '₹'], [0, 'registration fee', '₹']].map(([n, l, p], i) => (
          <Reveal key={l} delay={i * 0.1}>
            <Tilt className="glass stat"><b><Counter to={n} prefix={p || ''} /></b><span>{l}</span></Tilt>
          </Reveal>
        ))}
      </div>
      <Reveal><div className="note"><b>12 problem statements:</b> 5 + 1 open innovation for the Hardware track, and 5 + 1 open innovation for the Software track. Pick one and build it.</div></Reveal>
      <Reveal delay={0.1}><div className="note"><b>Team rule (mandatory):</b> 3&ndash;4 members per team, and every team must include at least one girl to be eligible.</div></Reveal>
    </Section>
  )
}

/* ---------- TRACKS ---------- */
export function Tracks() {
  const tracks = [
    ['hw', <DarkLord size={104} className="d1" />, 'Hardware Track', 'Sensors, microcontrollers, robotics, embedded systems and IoT. Build working physical prototypes that could survive a mission.'],
    ['sw', <Sage size={108} className="d2" />, 'Software Track', 'Web, mobile, AI/ML, data and simulation. Build the software that powers missions, analyses data and keeps crews safe.']
  ]
  return (
    <Section id="tracks" eyebrow="02 · Choose a track" title="Two Tracks" color="var(--accent)">
      <div className="grid two chibi-grid">
        {tracks.map(([key, i, t, d], k) => (
          <Reveal key={t} delay={k * 0.15}>
            <Tilt className="glass card track" data-t={key} whileHover={{ scale: 1.04 }}>
              <span className="card-chibi">{i}</span>
              <span className="side" data-t={key}>{key === 'hw' ? 'Hardware' : 'Software'}</span><h3>{t}</h3><p>{d}</p><p className="muted">5 problem statements + 1 open innovation</p>
              
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
          <p className="lead">Round 1 is online. Submit your abstract and pitch deck by 20 Nov, 11:59 PM IST. The technical committee screens every entry on innovation, technical feasibility and architecture, and the top teams advance to the 24-hour offline hackathon at BMSIT&amp;M.</p>
          <ol className="steps">
            {['Form a team of 3 or 4 with at least one girl (mandatory), and register on Unstop (free).', 'Pick a problem statement, or the open innovation challenge, in the Software or Hardware track.', 'Download the official PPT template and fill it in. Say clearly which track you are entering.', 'Upload it as a PPT, PPTX or PDF on Unstop before the deadline.'].map((t, i) => (
              <motion.li key={t} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 * i, duration: 0.6 }}>
                <b>{i + 1}</b>{t}
              </motion.li>
            ))}
          </ol>
          <div className="note">Late or emailed entries are not accepted. Make sure your file is fully uploaded before the round closes.</div>
        </Reveal>
        <Reveal delay={0.2}>
          <Tilt className="glass card center">
            <span className="icon">PPT</span><h3>Official Deck Template</h3><p>Stick to the template layout. Decks that ignore it may be rejected.</p>
            <Magnetic><a className="btn" href={CONFIG.pptTemplateUrl} download>Download template</a></Magnetic>
          </Tilt>
        </Reveal>
      </div>
    </Section>
  )
}

/* ---------- PROBLEMS ---------- */
function ProblemModal({ p, side, onClose }) {
  useEffect(() => {
    const k = e => e.key === 'Escape' && onClose()
    addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [])
  return (
    <motion.div className="modal-back" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="modal glass" data-t={side} role="dialog" aria-modal="true" aria-label={p.title} onClick={e => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ duration: 0.3 }}>
        <button className="modal-x" onClick={onClose} aria-label="Close">&times;</button>
        <div className="num">{p.id}</div>
        <h3>{p.title}</h3>
        <p>{p.context}</p>
        {p.challenge && <><h4>Your challenge</h4><p>{p.challenge}</p></>}
        <h4>Expected outcomes</h4>
        <ul>{p.outcomes.map(o => <li key={o}>{o}</li>)}</ul>
        <div className="modal-cta">
          <a className="btn" href={CONFIG.registerUrl} target="_blank" rel="noopener">Register on Unstop</a>
          <a className="btn btn-ghost" href={CONFIG.psUrl} download>All problem statements (PDF)</a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Problems() {
  const [tab, setTab] = useState('hw')
  const [open, setOpen] = useState(null)
  return (
    <Section id="problems" eyebrow="04 · Choose your mission" title="Problem Statements" color="var(--red)">
      <div className="tabs" role="tablist">
        {[['hw', 'Hardware'], ['sw', 'Software']].map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} data-t={k} className={'tab' + (tab === k ? ' active' : '')} onClick={() => setTab(k)}>
            {tab === k && <motion.span layoutId="pill" className="pill" data-t={k} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span>{l}</span>
          </button>
        ))}
      </div>
      <p className="ps-note">5 problem statements + 1 open innovation. Tap a card for the full brief.</p>
      <AnimatePresence mode="wait">
        <motion.div key={tab} className="grid three ps-grid" initial="h" animate="s" exit="x" variants={{ s: { transition: { staggerChildren: 0.08 } }, x: { transition: { staggerChildren: 0.03 } } }}>
          {CONFIG.problems[tab].map(p => (
            <motion.div key={p.id} variants={{ h: { opacity: 0, y: 40 }, s: { opacity: 1, y: 0 }, x: { opacity: 0, y: -20 } }}>
              <Tilt className="glass card ps" data-t={tab} role="button" tabIndex={0} aria-label={'Open ' + p.title}
                onClick={() => setOpen(p)} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setOpen(p))}>
                <div className="num">{p.id}</div>
                <h3>{p.title}</h3>
                <p className="clamp">{p.context}</p>
                <span className="more">{p.open ? 'Open innovation' : 'View details'} &rarr;</span>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <Reveal><p className="center ps-dl"><a className="btn btn-ghost" href={CONFIG.psUrl} download>Download all problem statements (PDF)</a></p></Reveal>
      <AnimatePresence>{open && <ProblemModal p={open} side={tab} onClose={() => setOpen(null)} />}</AnimatePresence>
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
  const cast = [<Elder size={92} className="d1" />, <Droid size={84} className="d2" />, <DarkLord size={92} />, <Sage size={92} className="d1" />]
  return (
    <Section id="prizes" eyebrow="05 · The bounty" title="Prize Pool" color="var(--accent)">
      <Reveal><p className="center big-prize">Total prize pool<b>{CONFIG.prizeTotal}</b></p></Reveal>
      <div className="grid four podium chibi-grid">
        {CONFIG.prizes.map((p, i) => (
          <Reveal key={p.place} delay={i * 0.12}>
            <Tilt className={'glass card ' + (p.first ? 'first' : '')} data-t={p.track} whileHover={{ scale: 1.04 }}>
              <span className="card-chibi top">{cast[i]}</span>
              <div className="amt">{p.amount}</div>
              <h3>{p.place}</h3>
            </Tilt>
          </Reveal>
        ))}
      </div>
      <Reveal><p className="center perks">{CONFIG.perks}</p></Reveal>
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
const LOGOS = [
  ['bmsit', 'BMS Institute of Technology & Management'],
  ['ieee-sb', 'IEEE Student Branch, BMSIT&M'],
  ['aess', 'IEEE Aerospace and Electronic Systems Society'],
  ['grss', 'IEEE Geoscience and Remote Sensing Society'],
  ['wie', 'IEEE Women in Engineering'],
  ['iic', "Institution's Innovation Council (Ministry of Education initiative)"]
]

export function Organisers() {
  return (
    <Section id="organisers" eyebrow="07 · The council" title="Organised By" color="var(--red)">
      <div className="logos">
        {LOGOS.map(([f, name], i) => (
          <Reveal key={f} delay={i * 0.08} y={24}>
            <div className="logo-tile" title={name}><img src={'/logos/' + f + '.png'} alt={name} loading="lazy" /></div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}><p className="center muted org-line">BMS Institute of Technology &amp; Management, Yelahanka, Bengaluru &middot; {CONFIG.organiserClub}</p></Reveal>
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
          <Logo className="foot-logo-crop" style={{ '--S': '250px' }} />
          <p className="muted">24-hour national hackathon · 12th &amp; 13th December · BMSIT&amp;M</p>
          <Magnetic><a className="btn btn-sm" href={CONFIG.instagramUrl} target="_blank" rel="noopener">Follow on Instagram</a></Magnetic>
        </Reveal>
        <Reveal delay={0.1}>
          <h4>Contact</h4>
          {CONFIG.contacts.map(c => <p key={c.name}><b>{c.name}</b><br /><a href={'tel:' + c.phone}>{c.label || c.phone}</a></p>)}
          <p><b>Email</b><br /><a href={'mailto:' + CONFIG.contactEmail}>{CONFIG.contactEmail}</a></p>
        </Reveal>
        <Reveal delay={0.2}>
          <h4>Location</h4>
          <p>BMS Institute of Technology &amp; Management, Avalahalli, Doddaballapur Main Road, Yelahanka, Bengaluru 560119</p>
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
        <a href="#home" className="logo" aria-label="StarForge home"><Logo style={{ '--S': '92px' }} /></a>
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
