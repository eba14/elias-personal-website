// Tile-grid background — RIGHT panel only.
// Faint 60-px grid lines; small blue circles travel along the paths,
// choosing random turns at intersections (full RNG).
//
// Bug avoided: after snapping to an intersection we record it as
// `lastSnapX/Y` and skip any snap that would land on the same node,
// so circles are never frozen in place by oscillation.
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx  = canvas.getContext('2d');
  const CELL = 60;
  const DIRS = [
    { dx:  1, dy:  0 },
    { dx: -1, dy:  0 },
    { dx:  0, dy:  1 },
    { dx:  0, dy: -1 },
  ];

  let circles = [];
  let SPLIT   = 0;

  // Mirrors layout.css: left-side is width:25% + 30px padding each side = 25%+60px
  function calcSplit() {
    return canvas.width > 992 ? Math.round(canvas.width * 0.25) + 60 : 0;
  }

  function gridStart() {
    return Math.ceil(SPLIT / CELL) * CELL;
  }

  /* ── Resize ─────────────────────────────────────────────── */
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    SPLIT = calcSplit();
    seedCircles();
  }

  /* ── Seed circles ───────────────────────────────────────── */
  function seedCircles() {
    const w     = canvas.width - SPLIT;
    const count = Math.min(30, Math.max(8, Math.floor((w * canvas.height) / 36000)));
    circles = Array.from({ length: count }, () => spawnCircle(true));
  }

  function spawnCircle(anywhere) {
    const xStart = gridStart();
    const cols   = Math.max(0, Math.floor((canvas.width  - xStart) / CELL));
    const rows   = Math.floor(canvas.height / CELL);

    const gx  = Math.floor(Math.random() * (cols + 1));
    const gy  = anywhere
      ? Math.floor(Math.random() * (rows + 1))
      : (Math.random() < 0.5 ? -1 : rows + 1);

    const sx  = xStart + gx * CELL;
    const sy  = gy     * CELL;
    const dir = DIRS[Math.floor(Math.random() * DIRS.length)];

    return {
      x:  sx,   y:  sy,
      dx: dir.dx, dy: dir.dy,
      speed: 0.6 + Math.random() * 1.1,
      alpha: 0.45 + Math.random() * 0.35,
      // Record spawn node so the very first intersection check doesn't
      // immediately snap back to where we started.
      lastSnapX: sx,
      lastSnapY: sy,
    };
  }

  /* ── Draw grid ──────────────────────────────────────────── */
  function drawGrid() {
    const xStart = gridStart();
    ctx.lineWidth   = 0.7;
    ctx.strokeStyle = 'rgba(110,181,255,0.055)';
    ctx.beginPath();
    for (let x = xStart; x <= canvas.width + CELL; x += CELL) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }
    for (let y = 0; y <= canvas.height + CELL; y += CELL) {
      ctx.moveTo(xStart, y);
      ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();
  }

  /* ── Step one circle ─────────────────────────────────────── */
  function stepCircle(c) {
    c.x += c.dx * c.speed;
    c.y += c.dy * c.speed;

    // Intersection detection
    const tol  = c.speed + 0.8;
    const modX = ((c.x % CELL) + CELL) % CELL;
    const modY = ((c.y % CELL) + CELL) % CELL;
    const onX  = modX < tol || modX > CELL - tol;
    const onY  = modY < tol || modY > CELL - tol;

    if (onX && onY) {
      const snapX = Math.round(c.x / CELL) * CELL;
      const snapY = Math.round(c.y / CELL) * CELL;

      // Only snap when this is a NEW intersection (prevents frozen oscillation)
      if (snapX !== c.lastSnapX || snapY !== c.lastSnapY) {
        c.x = snapX;
        c.y = snapY;
        c.lastSnapX = snapX;
        c.lastSnapY = snapY;

        // 40 % chance to turn; never reverse
        if (Math.random() < 0.40) {
          const opts   = DIRS.filter(d => !(d.dx === -c.dx && d.dy === -c.dy));
          const chosen = opts[Math.floor(Math.random() * opts.length)];
          c.dx = chosen.dx;
          c.dy = chosen.dy;
        }
      }
    }

    // Respawn when off the right panel
    if (c.x < SPLIT - CELL || c.x > canvas.width  + CELL ||
        c.y < -CELL          || c.y > canvas.height + CELL) {
      return spawnCircle(true);
    }
    return c;
  }

  /* ── Draw one circle ─────────────────────────────────────── */
  function drawCircle(c) {
    // Glow
    const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 8);
    g.addColorStop(0,   `rgba(110,181,255,${(c.alpha * 0.9 ).toFixed(2)})`);
    g.addColorStop(0.4, `rgba(110,181,255,${(c.alpha * 0.28).toFixed(2)})`);
    g.addColorStop(1,   'rgba(110,181,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
    ctx.fill();

    // Core dot
    ctx.beginPath();
    ctx.arc(c.x, c.y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(110,181,255,${c.alpha.toFixed(2)})`;
    ctx.fill();
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  /* ── Main loop ───────────────────────────────────────────── */
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Clip ALL drawing to the right panel — nothing appears on the left side
    ctx.save();
    ctx.beginPath();
    ctx.rect(SPLIT, 0, canvas.width - SPLIT, canvas.height);
    ctx.clip();

    drawGrid();
    circles = circles.map(stepCircle);
    circles.forEach(drawCircle);

    ctx.restore();

    requestAnimationFrame(loop);
  }

  loop();
})();
