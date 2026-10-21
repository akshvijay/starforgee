import { useEffect, useRef, useState } from 'react'

export default function Game() {
  const canvas = useRef()
  const api = useRef({})
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => { try { return +localStorage.getItem('sfBest') || 0 } catch { return 0 } })
  const [idle, setIdle] = useState(true)
  const [label, setLabel] = useState('Launch')

  useEffect(() => {
    const c = canvas.current, g = c.getContext('2d'), W = c.width, H = c.height
    let ship, rocks, coins, sc, running = false, last = 0, spawn = 0, raf
    const keys = {}
    const reset = () => { ship = { x: W / 2, y: H - 50, r: 16 }; rocks = []; coins = []; sc = 0; spawn = 0; setScore(0) }
    const draw = () => {
      g.clearRect(0, 0, W, H)
      g.fillStyle = '#8a8fb8'; rocks.forEach(o => { g.beginPath(); g.arc(o.x, o.y, o.r, 0, 6.28); g.fill() })
      g.shadowColor = '#ffc857'; g.shadowBlur = 14; g.fillStyle = '#ffc857'
      coins.forEach(o => { g.beginPath(); g.arc(o.x, o.y, o.r, 0, 6.28); g.fill() })
      g.shadowColor = '#00d4ff'; g.fillStyle = '#00d4ff'; g.beginPath()
      g.moveTo(ship.x, ship.y - ship.r - 6); g.lineTo(ship.x + ship.r, ship.y + ship.r); g.lineTo(ship.x - ship.r, ship.y + ship.r); g.fill()
      g.shadowBlur = 0
    }
    const end = () => {
      running = false
      setBest(b => { const nb = Math.max(b, sc); try { localStorage.setItem('sfBest', nb) } catch {} return nb })
      setLabel('Play again'); setIdle(true)
    }
    const loop = t => {
      if (!running) return
      const dt = Math.min(0.05, (t - last) / 1000); last = t
      const speed = 160 + sc * 3
      if (keys.ArrowLeft || keys.a) ship.x -= 340 * dt
      if (keys.ArrowRight || keys.d) ship.x += 340 * dt
      ship.x = Math.max(ship.r, Math.min(W - ship.r, ship.x))
      spawn -= dt
      if (spawn <= 0) {
        spawn = Math.max(0.25, 0.7 - sc * 0.005)
        const r = 12 + Math.random() * 18
        rocks.push({ x: r + Math.random() * (W - 2 * r), y: -r, r, v: speed * (0.8 + Math.random() * 0.6) })
        if (Math.random() < 0.3) coins.push({ x: 20 + Math.random() * (W - 40), y: -10, r: 9, v: speed * 0.8 })
      }
      rocks.forEach(o => (o.y += o.v * dt)); coins.forEach(o => (o.y += o.v * dt))
      for (const o of rocks) if (Math.hypot(o.x - ship.x, o.y - ship.y) < o.r + ship.r - 4) { draw(); return end() }
      coins = coins.filter(o => { if (Math.hypot(o.x - ship.x, o.y - ship.y) < o.r + ship.r) { sc += 5; return false } return o.y < H + 20 })
      rocks = rocks.filter(o => { if (o.y > H + o.r) { sc++; return false } return true })
      setScore(sc); draw(); raf = requestAnimationFrame(loop)
    }
    api.current.start = () => { reset(); running = true; last = performance.now(); setIdle(false); raf = requestAnimationFrame(loop) }
    const pointer = e => { if (!running) return; const r = c.getBoundingClientRect(); ship.x = ((e.clientX - r.left) * W) / r.width }
    const kd = e => { const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; keys[k] = true; if (running && k.startsWith('Arrow')) e.preventDefault() }
    const ku = e => { keys[e.key.length === 1 ? e.key.toLowerCase() : e.key] = false }
    c.addEventListener('pointermove', pointer); c.addEventListener('pointerdown', pointer)
    addEventListener('keydown', kd); addEventListener('keyup', ku)
    reset(); draw()
    return () => { running = false; cancelAnimationFrame(raf); removeEventListener('keydown', kd); removeEventListener('keyup', ku) }
  }, [])

  return (
    <div className="game-wrap">
      <div className="game-frame">
        <canvas ref={canvas} width={480} height={560} />
        <div className="game-hud"><span>Score <b>{score}</b></span><span>Best <b>{best}</b></span></div>
        {idle && <button className="btn game-btn" onClick={() => api.current.start()}>{label}</button>}
      </div>
    </div>
  )
}
