import { useEffect, useRef, useState } from 'react'

// Original chibi characters (hand-drawn SVG), space-opera inspired.
// Every part that moves has a class hook (see "alive" section in styles.css).
const INK = '#161a26'
const SKIN = '#f3cfa8'

/* ---- characters look toward the pointer ---- */
const watchers = new Set()
let ticking = false, lastEv = null
function onMove(e) {
  lastEv = e
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    ticking = false
    watchers.forEach(el => {
      const r = el.getBoundingClientRect()
      const dx = (lastEv.clientX - (r.left + r.width / 2)) / 320
      const dy = (lastEv.clientY - (r.top + r.height * 0.4)) / 320
      el.style.setProperty('--lx', Math.max(-1, Math.min(1, dx)).toFixed(2))
      el.style.setProperty('--ly', Math.max(-1, Math.min(1, dy)).toFixed(2))
    })
  })
}
function useLook() {
  const ref = useRef()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!watchers.size) addEventListener('pointermove', onMove, { passive: true })
    watchers.add(el)
    return () => { watchers.delete(el); if (!watchers.size) removeEventListener('pointermove', onMove) }
  }, [])
  return ref
}

const Shadow = () => <ellipse className="shadow" cx="60" cy="134" rx="30" ry="5" fill="#000" opacity=".35" />

function Saber({ blade, grip = SKIN, hilt = '#b9bfd0' }) {
  return (
    <g className="swing">
      <g transform="translate(101 112) rotate(8)">
        <rect x="-6" y="-72" width="12" height="64" rx="6" fill={blade} opacity=".45" className="halo" />
        <rect x="-3" y="-72" width="6" height="64" rx="3" fill="#fff" stroke={blade} strokeWidth="1.5" className="blade" style={{ color: blade }} />
        <rect x="-4.5" y="-10" width="9" height="20" rx="2" fill={hilt} stroke={INK} strokeWidth="2" />
        <circle cy="2" r="7" fill={grip} stroke={INK} strokeWidth="2.5" />
      </g>
    </g>
  )
}

export function Trooper({ size = 140, className = '' }) {
  const ref = useLook()
  const w = { fill: '#f4f6fa', stroke: INK, strokeWidth: 3 }
  const eye = (
    <>
      <path d="M30 40c0-8 14-10 22-2 4 6 0 18-10 20-10 0-12-10-12-18Z" fill="#12141d" />
      <circle className="shine" cx="42" cy="44" r="3.2" fill="#fff" />
    </>
  )
  return (
    <svg ref={ref} className={'chibi ' + className} viewBox="0 0 120 140" width={size} role="img" aria-label="Chibi trooper">
      <Shadow />
      <g className="body">
        <rect className="leg l" x="40" y="112" width="17" height="20" rx="7" {...w} />
        <rect className="leg r" x="63" y="112" width="17" height="20" rx="7" {...w} />
        <g className="wave"><rect x="22" y="86" width="16" height="26" rx="8" {...w} /></g>
        <g className="recoil">
          <rect x="82" y="86" width="16" height="26" rx="8" {...w} />
          <rect x="92" y="98" width="22" height="9" rx="3" fill="#2a2f40" stroke={INK} strokeWidth="2" />
        </g>
        <rect x="34" y="82" width="52" height="38" rx="14" {...w} />
        <rect x="35" y="102" width="50" height="7" fill="#232838" />
        <rect x="52" y="88" width="16" height="9" rx="2" fill="#232838" />
      </g>
      <g className="head-look"><g className="head">
        <path d="M18 56C18 24 38 10 60 10s42 14 42 46c0 22-12 34-42 34S18 78 18 56Z" {...w} strokeWidth="3.5" />
        <ellipse cx="38" cy="24" rx="11" ry="5" fill="#fff" opacity=".85" transform="rotate(-25 38 24)" />
        <g className="blink look">{eye}</g>
        <g transform="translate(120 0) scale(-1 1)"><g className="blink look">{eye}</g></g>
        <path className="talk" d="M54 70v8M60 70v10M66 70v8" stroke="#12141d" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="30" cy="66" rx="6" ry="3" fill="#ff9aa8" opacity=".55" />
        <ellipse cx="90" cy="66" rx="6" ry="3" fill="#ff9aa8" opacity=".55" />
      </g></g>
    </svg>
  )
}

export function Sage({ size = 140, blade = '#4bd5ff', dark = false, className = '' }) {
  const ref = useLook()
  const robe = dark ? '#23232f' : '#8a6a47'
  const hood = dark ? '#303042' : '#9c7b55'
  const belt = dark ? '#5a5a70' : '#3d2b1a'
  return (
    <svg ref={ref} className={'chibi ' + className} viewBox="0 0 120 140" width={size} role="img" aria-label="Chibi sage">
      <Shadow />
      <g className="body">
        <ellipse className="leg l" cx="46" cy="131" rx="9" ry="5.5" fill="#3d2b1a" stroke={INK} strokeWidth="2.5" />
        <ellipse className="leg r" cx="74" cy="131" rx="9" ry="5.5" fill="#3d2b1a" stroke={INK} strokeWidth="2.5" />
        <path d="M30 130C30 100 40 84 60 84s30 16 30 46Z" fill={robe} stroke={INK} strokeWidth="3" />
        <rect x="37" y="106" width="46" height="6" fill={belt} />
        <g className="wave"><rect x="18" y="90" width="16" height="28" rx="8" fill={robe} stroke={INK} strokeWidth="3" transform="rotate(12 26 104)" /></g>
        <rect x="90" y="90" width="16" height="26" rx="8" fill={robe} stroke={INK} strokeWidth="3" />
      </g>
      <g className="head-look"><g className="head">
        <path d="M20 52C20 20 40 6 60 6s40 14 40 46c0 24-16 38-40 38S20 76 20 52Z" fill={hood} stroke={INK} strokeWidth="3.5" />
        <ellipse cx="60" cy="58" rx="28" ry="24" fill={SKIN} stroke={INK} strokeWidth="2.5" />
        <path d="M32 52c4-16 52-16 56 0-8-8-48-8-56 0Z" fill="#000" opacity=".2" />
        <g className="blink"><g className="look">
          <ellipse cx="49" cy="60" rx="4" ry="6" fill={INK} /><ellipse cx="71" cy="60" rx="4" ry="6" fill={INK} />
          <circle cx="50.5" cy="57.5" r="1.7" fill="#fff" /><circle cx="72.5" cy="57.5" r="1.7" fill="#fff" />
        </g></g>
        {dark
          ? <><path d="M42 49l14 4M78 49l-14 4" stroke={INK} strokeWidth="3" strokeLinecap="round" /><path d="M54 74q6-3 12 0" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" /></>
          : <><path className="brows" d="M43 50q6-3 11 0M66 50q6-3 11 0" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" /><path className="smile" d="M54 72q6 6 12 0" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" /></>}
        <ellipse cx="40" cy="70" rx="6" ry="3" fill="#ff9aa8" opacity=".6" />
        <ellipse cx="80" cy="70" rx="6" ry="3" fill="#ff9aa8" opacity=".6" />
      </g></g>
      <Saber blade={blade} />
    </svg>
  )
}

export function Droid({ size = 120, className = '' }) {
  const ref = useLook()
  const w = { fill: '#eef2f8', stroke: INK, strokeWidth: 3 }
  return (
    <svg ref={ref} className={'chibi ' + className} viewBox="0 0 120 140" width={size} role="img" aria-label="Chibi droid">
      <Shadow />
      <g className="body">
        <rect className="leg l" x="30" y="118" width="22" height="12" rx="6" fill="#5b6272" stroke={INK} strokeWidth="3" />
        <rect className="leg r" x="68" y="118" width="22" height="12" rx="6" fill="#5b6272" stroke={INK} strokeWidth="3" />
        <g className="wave"><rect x="12" y="84" width="16" height="24" rx="8" fill="#5b6272" stroke={INK} strokeWidth="3" /></g>
        <rect x="92" y="84" width="16" height="24" rx="8" fill="#5b6272" stroke={INK} strokeWidth="3" />
        <rect x="26" y="58" width="68" height="64" rx="26" {...w} />
        <rect x="40" y="86" width="40" height="8" rx="3" fill="#3b82ff" />
        <rect className="lt1" x="40" y="100" width="24" height="6" rx="3" fill="#8fa3c7" />
        <circle className="lt2" cx="76" cy="103" r="3.5" fill="#ffe81f" />
      </g>
      <g className="head-look"><g className="head droid-head">
        <path d="M24 66C24 34 40 18 60 18s36 16 36 48Z" {...w} strokeWidth="3.5" />
        <path d="M29 56c4-14 58-14 62 0v5c-8-10-54-10-62 0Z" fill="#3b82ff" />
        <circle cx="60" cy="40" r="11" fill="#fff" stroke={INK} strokeWidth="3" />
        <g className="look"><g className="scan"><circle cx="60" cy="40" r="6" fill="#12141d" /><circle cx="62" cy="38" r="2" fill="#5cc8ff" /></g></g>
        <g className="antenna">
          <path d="M60 18V7" stroke={INK} strokeWidth="3" strokeLinecap="round" />
          <circle className="beacon" cx="60" cy="5" r="4" fill="#ff3b3b" stroke={INK} strokeWidth="2" />
        </g>
      </g></g>
    </svg>
  )
}

export function DarkLord({ size = 140, className = '' }) {
  const ref = useLook()
  const blk = { fill: '#171820', stroke: INK, strokeWidth: 3 }
  return (
    <svg ref={ref} className={'chibi ' + className} viewBox="0 0 120 140" width={size} role="img" aria-label="Chibi dark lord">
      <Shadow />
      <path className="cape" d="M14 134C16 96 34 80 60 80s44 16 46 54Z" fill="#0c0d13" stroke={INK} strokeWidth="3" />
      <g className="body">
        <rect className="leg l" x="40" y="112" width="15" height="20" rx="6" {...blk} />
        <rect className="leg r" x="65" y="112" width="15" height="20" rx="6" {...blk} />
        <rect x="34" y="82" width="52" height="38" rx="13" {...blk} />
        <rect x="35" y="106" width="50" height="6" fill="#7b8094" />
        <rect x="48" y="90" width="24" height="12" rx="3" fill="#2c2f3d" stroke={INK} strokeWidth="2" />
        <circle className="lt1" cx="54" cy="96" r="2" fill="#ff3b3b" /><circle className="lt2" cx="60" cy="96" r="2" fill="#4bd5ff" /><circle className="lt3" cx="66" cy="96" r="2" fill="#ffe81f" />
        <g className="wave"><rect x="20" y="88" width="15" height="26" rx="7.5" {...blk} /></g>
        <rect x="85" y="88" width="15" height="26" rx="7.5" {...blk} />
      </g>
      <g className="head-look"><g className="head">
        <path d="M20 62C20 24 38 8 60 8s40 16 40 54v6c0 16-14 26-40 26S20 84 20 68Z" fill="#1b1c25" stroke={INK} strokeWidth="3.5" />
        <path d="M12 76c8 10 22 14 48 14s40-4 48-14c-6 16-22 22-48 22S18 92 12 76Z" fill="#12131a" stroke={INK} strokeWidth="3" />
        <path d="M30 62c0-14 12-22 30-22s30 8 30 22c0 12-8 20-14 24H44c-6-4-14-12-14-24Z" fill="#262835" />
        <g className="look">
          <path d="M33 56c0-6 8-10 15-6 6 4 5 16-4 18-8 0-11-6-11-12Z" fill="#06060a" />
          <path d="M87 56c0-6-8-10-15-6-6 4-5 16 4 18 8 0 11-6 11-12Z" fill="#06060a" />
          <circle className="glint" cx="42" cy="55" r="2.6" fill="#fff" opacity=".9" /><circle className="glint" cx="78" cy="55" r="2.6" fill="#fff" opacity=".9" />
        </g>
        <path d="M56 66h8l-4 7Z" fill="#6b7086" />
        <rect x="49" y="76" width="22" height="9" rx="3" fill="#8a8fa3" stroke={INK} strokeWidth="2" />
        <path className="breath" d="M54 77v7M60 77v7M66 77v7" stroke={INK} strokeWidth="2" />
        <ellipse cx="34" cy="26" rx="10" ry="4" fill="#fff" opacity=".25" transform="rotate(-25 34 26)" />
      </g></g>
      <Saber blade="#ff3b3b" grip="#171820" hilt="#8a8fa3" />
    </svg>
  )
}

export function Elder({ size = 130, className = '' }) {
  const ref = useLook()
  const g = '#8fc46d'
  return (
    <svg ref={ref} className={'chibi ' + className} viewBox="0 0 120 140" width={size} role="img" aria-label="Chibi elder master">
      <Shadow />
      <g className="staff"><path d="M18 138 24 66" stroke="#6a4a2a" strokeWidth="6" strokeLinecap="round" /></g>
      <g className="body">
        <path d="M26 132c0-26 14-46 34-46s34 20 34 46Z" fill="#d9c9a3" stroke={INK} strokeWidth="3" />
        <path d="M34 132c0-14 6-24 14-30l12 30Z" fill="#7a5a3a" stroke={INK} strokeWidth="2.5" />
        <rect x="40" y="108" width="40" height="6" fill="#6a4a2a" />
        <circle cx="22" cy="104" r="6.5" fill={g} stroke={INK} strokeWidth="2.5" />
        <g className="wave"><circle cx="98" cy="108" r="6.5" fill={g} stroke={INK} strokeWidth="2.5" /></g>
      </g>
      <g className="head-look"><g className="head">
        <path className="ear-l" d="M33 56 3 36l4 20 26 12Z" fill={g} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <path className="ear-r" d="M87 56 117 36l-4 20-26 12Z" fill={g} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <ellipse cx="60" cy="58" rx="31" ry="29" fill={g} stroke={INK} strokeWidth="3.5" />
        <path d="M52 30q4-8 8-2M60 28q4-10 9-2" stroke="#f1f1f1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path className="brows" d="M44 38q16-6 32 0M46 44q14-4 28 0" stroke="#6fa04f" strokeWidth="2" fill="none" strokeLinecap="round" />
        <g className="blink">
          <ellipse cx="47" cy="58" rx="7" ry="8" fill="#fff" stroke={INK} strokeWidth="2" />
          <ellipse cx="73" cy="58" rx="7" ry="8" fill="#fff" stroke={INK} strokeWidth="2" />
          <g className="look">
            <circle cx="48" cy="59" r="3.8" fill={INK} /><circle cx="72" cy="59" r="3.8" fill={INK} />
            <circle cx="49.4" cy="57.4" r="1.3" fill="#fff" /><circle cx="73.4" cy="57.4" r="1.3" fill="#fff" />
          </g>
        </g>
        <path d="M38 50 54 54M82 50 66 54" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <path d="M58 68h4" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <path className="smile" d="M52 76q8 6 16 0" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g></g>
    </svg>
  )
}

export function Fighter({ className = '', size = 90 }) {
  const wing = { fill: '#aeb7cc', stroke: INK, strokeWidth: 2.5, strokeLinejoin: 'round' }
  return (
    <svg className={className} viewBox="0 0 120 60" width={size} aria-hidden="true">
      <path d="M44 28 78 4l8 2-22 22Z" {...wing} />
      <path d="M44 32 78 56l8-2-22-22Z" {...wing} />
      <path d="M44 28 74 14l6 2-20 12Z" fill="#c9d1e4" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M44 32 74 46l6-2-20-12Z" fill="#c9d1e4" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M8 30 90 23l22 7-22 7Z" fill="#e3e8f4" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx="88" cy="30" rx="7" ry="3.2" fill="#4bd5ff" />
      <circle cx="82" cy="5" r="3" fill="#ff7a3d" /><circle cx="82" cy="55" r="3" fill="#ff7a3d" />
      <rect x="2" y="27" width="10" height="6" rx="3" fill="#ff7a3d" />
    </svg>
  )
}

export function Cruiser({ size = 300 }) {
  return (
    <svg viewBox="0 0 400 140" width={size} aria-hidden="true">
      <path d="M2 70 330 34v72Z" fill="#6b7288" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M40 70 330 44M40 70 330 96M90 70 330 56M90 70 330 84" stroke="#4a5063" strokeWidth="2" />
      <path d="M2 70 330 70" stroke="#8a92a8" strokeWidth="2" />
      <rect x="326" y="26" width="64" height="88" rx="6" fill="#565d72" stroke={INK} strokeWidth="3" />
      <rect x="344" y="8" width="30" height="24" rx="4" fill="#7b8399" stroke={INK} strokeWidth="3" />
      <rect x="352" y="2" width="14" height="8" rx="2" fill="#9aa3ba" stroke={INK} strokeWidth="2" />
      <circle cx="394" cy="46" r="7" fill="#4bd5ff" /><circle cx="394" cy="70" r="9" fill="#4bd5ff" /><circle cx="394" cy="94" r="7" fill="#4bd5ff" />
    </svg>
  )
}

/* Patrols back and forth across the viewport; turns around at each end. */
export function Walker({ children, size = 110, duration = 26, delay = 0 }) {
  return (
    <div className="walker" style={{ '--sz': size + 'px', '--dur': duration + 's', '--delay': delay + 's' }}>
      <div className="walker-flip">{children}</div>
    </div>
  )
}

/* Speech bubble. Pass `lines` to cycle through several. */
export function Bubble({ children, lines, className = '' }) {
  const arr = lines || [children]
  const [i, setI] = useState(0)
  useEffect(() => {
    if (arr.length < 2) return
    const id = setInterval(() => setI(v => (v + 1) % arr.length), 3800)
    return () => clearInterval(id)
  }, [])
  return <span key={i} className={'bubble ' + className}>{arr[i]}</span>
}

/* Ambient ships that cross the whole page behind the content. */
export function Flybys() {
  return (
    <div className="flybys" aria-hidden="true">
      <div className="fly f1"><Fighter size={70} /></div>
    </div>
  )
}
