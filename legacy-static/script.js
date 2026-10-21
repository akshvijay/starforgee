/* ===== EDIT ME: all event details live here ===== */
const CONFIG = {
  eventStart: '2026-12-12T09:00:00+05:30',   // countdown target (confirm start time)
  registerUrl: '#',                           // Unstop link
  brochureUrl: '#',                           // e.g. 'assets/brochure.pdf'
  pptTemplateUrl: '#',                        // e.g. 'assets/template.pptx'
  instagramUrl: '#',
  phone1: '+91XXXXXXXXXX',
  phone2: '+91XXXXXXXXXX',
  prizeTotal: '₹XX,XXX',
  prizes: [
    { place: '1st', medal: '🥇', amount: '₹XX,XXX', first: true },
    { place: '2nd', medal: '🥈', amount: '₹XX,XXX' },
    { place: '3rd', medal: '🥉', amount: '₹XX,XXX' }
  ],
  problems: {
    hw: [
      { title: 'Hardware Problem 1', desc: 'To be announced.' },
      { title: 'Hardware Problem 2', desc: 'To be announced.' },
      { title: 'Hardware Problem 3', desc: 'To be announced.' }
    ],
    sw: [
      { title: 'Software Problem 1', desc: 'To be announced.' },
      { title: 'Software Problem 2', desc: 'To be announced.' },
      { title: 'Software Problem 3', desc: 'To be announced.' }
    ]
  },
  timeline: [
    { when: 'TBA', title: 'Registrations open', desc: 'Register for free on Unstop.' },
    { when: 'TBA', title: 'Problem statements released', desc: '3 hardware + 3 software.' },
    { when: 'TBA', title: 'PPT submission deadline', desc: 'Online screening round.' },
    { when: 'TBA', title: 'Shortlist announced', desc: 'Selected teams invited to campus.' },
    { when: '12 Dec', title: 'Hackathon begins', desc: 'Check-in, opening ceremony, 24-hour build starts.' },
    { when: '13 Dec', title: 'Final presentations & judging', desc: 'Demos to the jury.' },
    { when: '13 Dec', title: 'Prize distribution & closing', desc: 'Winners announced.' }
  ]
};

/* ===== links ===== */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
$$('[data-register]').forEach(a => a.href = CONFIG.registerUrl);
$$('[data-brochure]').forEach(a => a.href = CONFIG.brochureUrl);
$$('[data-ppt]').forEach(a => a.href = CONFIG.pptTemplateUrl);
$$('[data-instagram]').forEach(a => a.href = CONFIG.instagramUrl);
$$('[data-phone1]').forEach(a => { a.href = 'tel:' + CONFIG.phone1; a.textContent = CONFIG.phone1; });
$$('[data-phone2]').forEach(a => { a.href = 'tel:' + CONFIG.phone2; a.textContent = CONFIG.phone2; });
$$('[data-prize-total]').forEach(e => e.textContent = CONFIG.prizeTotal);

/* ===== nav ===== */
const burger = $('.burger'), nav = $('.nav nav');
burger.onclick = () => burger.setAttribute('aria-expanded', nav.classList.toggle('open'));
nav.onclick = e => { if (e.target.tagName === 'A') nav.classList.remove('open'); };

/* ===== countdown ===== */
const pad = n => String(n).padStart(2, '0');
function tick() {
  const d = Math.max(0, new Date(CONFIG.eventStart) - Date.now());
  $('#cd-d').textContent = pad(Math.floor(d / 864e5));
  $('#cd-h').textContent = pad(Math.floor(d / 36e5) % 24);
  $('#cd-m').textContent = pad(Math.floor(d / 6e4) % 60);
  $('#cd-s').textContent = pad(Math.floor(d / 1e3) % 60);
}
tick(); setInterval(tick, 1000);

/* ===== problems ===== */
function renderProblems(k) {
  $('#problem-grid').innerHTML = CONFIG.problems[k].map((p, i) =>
    `<article class="card ps"><div class="num">${k === 'hw' ? 'HW' : 'SW'}-0${i + 1}</div>
     <h3>${p.title}</h3><p>${p.desc}</p><span class="tag">${k === 'hw' ? 'Hardware' : 'Software'}</span></article>`).join('');
}
$$('.tab').forEach(t => t.onclick = () => {
  $$('.tab').forEach(x => x.classList.toggle('active', x === t));
  renderProblems(t.dataset.tab);
});
renderProblems('hw');

/* ===== prizes & timeline ===== */
$('#prize-grid').innerHTML = CONFIG.prizes.map(p =>
  `<article class="card ${p.first ? 'first' : ''}"><div class="medal">${p.medal}</div><h3>${p.place} Place</h3><div class="amt">${p.amount}</div></article>`).join('');
$('#timeline-list').innerHTML = CONFIG.timeline.map(t =>
  `<li><time>${t.when}</time><h3>${t.title}</h3><p class="muted">${t.desc}</p></li>`).join('');

/* ===== starfield ===== */
(function () {
  const c = $('#stars'), x = c.getContext('2d');
  let w, h, stars;
  const init = () => {
    w = c.width = innerWidth; h = c.height = innerHeight;
    stars = Array.from({ length: Math.min(220, w * h / 6000 | 0) }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.4 + .2, s: Math.random() * .25 + .03, p: Math.random() * 6.28
    }));
  };
  init(); addEventListener('resize', init);
  const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
  (function draw(t) {
    x.clearRect(0, 0, w, h);
    for (const s of stars) {
      if (!still) { s.y += s.s; if (s.y > h) { s.y = 0; s.x = Math.random() * w; } }
      x.globalAlpha = .5 + .5 * Math.sin(t / 700 + s.p);
      x.fillStyle = '#fff'; x.beginPath(); x.arc(s.x, s.y, s.r, 0, 6.28); x.fill();
    }
    requestAnimationFrame(draw);
  })(0);
})();

/* ===== mini game ===== */
(function () {
  const c = $('#gameCanvas'), g = c.getContext('2d'), W = c.width, H = c.height;
  let ship, rocks, coins, score, running = false, last = 0, spawn = 0, keys = {};
  let best = 0; try { best = +localStorage.getItem('sfBest') || 0; } catch (e) {}
  $('#best').textContent = best;

  function reset() { ship = { x: W / 2, y: H - 50, r: 16 }; rocks = []; coins = []; score = 0; spawn = 0; }
  function start() { reset(); running = true; last = performance.now(); $('#startGame').style.display = 'none'; requestAnimationFrame(loop); }
  function end() {
    running = false;
    if (score > best) { best = score; try { localStorage.setItem('sfBest', best); } catch (e) {} $('#best').textContent = best; }
    const b = $('#startGame'); b.textContent = 'Play again'; b.style.display = '';
  }
  function loop(t) {
    if (!running) return;
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    const speed = 160 + score * 3;
    if (keys.ArrowLeft || keys.a) ship.x -= 320 * dt;
    if (keys.ArrowRight || keys.d) ship.x += 320 * dt;
    ship.x = Math.max(ship.r, Math.min(W - ship.r, ship.x));
    spawn -= dt;
    if (spawn <= 0) {
      spawn = Math.max(.25, .7 - score * .005);
      const r = 12 + Math.random() * 18;
      rocks.push({ x: r + Math.random() * (W - 2 * r), y: -r, r, v: speed * (.8 + Math.random() * .6) });
      if (Math.random() < .3) coins.push({ x: 20 + Math.random() * (W - 40), y: -10, r: 9, v: speed * .8 });
    }
    rocks.forEach(o => o.y += o.v * dt); coins.forEach(o => o.y += o.v * dt);
    for (const o of rocks) if (Math.hypot(o.x - ship.x, o.y - ship.y) < o.r + ship.r - 4) return end();
    coins = coins.filter(o => { if (Math.hypot(o.x - ship.x, o.y - ship.y) < o.r + ship.r) { score += 5; return false; } return o.y < H + 20; });
    rocks = rocks.filter(o => { if (o.y > H + o.r) { score++; return false; } return true; });
    $('#score').textContent = score;
    draw(); requestAnimationFrame(loop);
  }
  function draw() {
    g.clearRect(0, 0, W, H);
    g.fillStyle = '#8a8fb8'; rocks.forEach(o => { g.beginPath(); g.arc(o.x, o.y, o.r, 0, 6.28); g.fill(); });
    g.fillStyle = '#ffc857'; coins.forEach(o => { g.beginPath(); g.arc(o.x, o.y, o.r, 0, 6.28); g.fill(); });
    g.fillStyle = '#00d4ff'; g.beginPath();
    g.moveTo(ship.x, ship.y - ship.r - 6); g.lineTo(ship.x + ship.r, ship.y + ship.r); g.lineTo(ship.x - ship.r, ship.y + ship.r); g.fill();
  }
  const pointer = e => { if (!running) return; const r = c.getBoundingClientRect(); ship.x = (e.clientX - r.left) * W / r.width; };
  c.addEventListener('pointermove', pointer); c.addEventListener('pointerdown', pointer);
  addEventListener('keydown', e => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; keys[k] = true;
    if (running && k.startsWith('Arrow')) e.preventDefault();
  });
  addEventListener('keyup', e => { keys[e.key.length === 1 ? e.key.toLowerCase() : e.key] = false; });
  $('#startGame').onclick = start;
  reset(); draw();
})();
