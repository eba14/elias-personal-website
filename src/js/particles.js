// ECE-themed background: circuit board traces with data pulses + floating binary
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  if (!window.matchMedia('(pointer: fine)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let nodes = [], traces = [], bits = [];

  /* ── Build circuit layout ──────────────────────────────── */
  function init() {
    nodes = []; traces = []; bits = [];

    const cellW = Math.max(70, canvas.width  / 14);
    const cellH = Math.max(65, canvas.height / 10);
    const cols  = Math.ceil(canvas.width  / cellW) + 1;
    const rows  = Math.ceil(canvas.height / cellH) + 1;

    // Place nodes on a denser grid for full-canvas coverage
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (Math.random() < 0.62) {
          nodes.push({
            x: c * cellW + (0.2 + Math.random() * 0.6) * cellW,
            y: r * cellH + (0.2 + Math.random() * 0.6) * cellH,
            r:   Math.random() * 0.7 + 0.4,
            a:   Math.random() * 0.22 + 0.10,
            glow: Math.random() > 0.60,
          });
        }
      }
    }

    // Connect nearby nodes with right-angle PCB traces
    const maxDist = Math.min(canvas.width, canvas.height) * 0.30;
    for (let i = 0; i < nodes.length; i++) {
      let conns = 0;
      for (let j = i + 1; j < nodes.length && conns < 4; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        if (dx * dx + dy * dy < maxDist * maxDist && Math.random() < 0.52) {
          traces.push({
            from: i, to: j,
            p:     Math.random(),
            speed: 0.0007 + Math.random() * 0.0013,
            on:    Math.random() > 0.38,  // whether a pulse is currently active
          });
          conns++;
        }
      }
    }

    // Floating binary digits
    for (let i = 0; i < 40; i++) bits.push(spawnBit(true));
  }

  function spawnBit(anywhere) {
    return {
      x:    Math.random() * canvas.width,
      y:    anywhere ? Math.random() * canvas.height : canvas.height + 12,
      ch:   Math.random() > 0.5 ? '1' : '0',
      vy:   0.18 + Math.random() * 0.32,
      a:    Math.random() * 0.08 + 0.03,
      size: Math.random() * 2 + 7,
    };
  }

  /* ── Draw a single trace + its travelling pulse ────────── */
  function drawTrace(tr) {
    const a = nodes[tr.from], b = nodes[tr.to];
    // Right-angle path: horizontal leg first, then vertical
    const mx = b.x, my = a.y;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(mx,  my);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = 'rgba(110,181,255,0.09)';
    ctx.lineWidth   = 0.9;
    ctx.stroke();

    if (!tr.on) return;

    // Compute pulse position along the two-segment path
    const seg1  = Math.abs(mx - a.x);
    const seg2  = Math.abs(b.y - my);
    const total = seg1 + seg2;
    if (total < 2) return;

    const dist = tr.p * total;
    let px, py;
    if (dist <= seg1) {
      px = a.x + (mx - a.x) * (dist / seg1);
      py = a.y;
    } else {
      const t = (dist - seg1) / seg2;
      px = mx;
      py = my + (b.y - my) * t;
    }

    // Glowing pulse dot (small)
    const g = ctx.createRadialGradient(px, py, 0, px, py, 3);
    g.addColorStop(0,   'rgba(110,181,255,0.92)');
    g.addColorStop(0.5, 'rgba(110,181,255,0.3)');
    g.addColorStop(1,   'rgba(110,181,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  /* ── Resize & re-init ───────────────────────────────────── */
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  /* ── Main animation loop ────────────────────────────────── */
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Traces + pulses
    for (const tr of traces) {
      drawTrace(tr);
      if (tr.on) {
        tr.p += tr.speed;
        if (tr.p > 1) { tr.p = 0; tr.on = Math.random() > 0.25; }
      } else {
        if (Math.random() < 0.0025) tr.on = true;
      }
    }

    // Circuit nodes
    for (const n of nodes) {
      if (n.glow) {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.8);
        g.addColorStop(0, `rgba(110,181,255,${n.a * 1.4})`);
        g.addColorStop(1, 'rgba(110,181,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 2.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(110,181,255,${n.a})`;
      ctx.fill();
    }

    // Floating binary (0s and 1s)
    ctx.textAlign = 'center';
    for (const b of bits) {
      ctx.font      = `${b.size}px "JetBrains Mono", monospace`;
      ctx.fillStyle = `rgba(110,181,255,${b.a})`;
      ctx.fillText(b.ch, b.x, b.y);
      b.y -= b.vy;
      if (b.y < -16) {
        Object.assign(b, spawnBit(false));
      }
    }

    requestAnimationFrame(loop);
  }

  loop();
})();
