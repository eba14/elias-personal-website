// Static tile-grid background — RIGHT panel only.
// Draws the 60-px grid once (and redraws on resize). No animation loop.
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx  = canvas.getContext('2d');
  const CELL = 60;

  function calcSplit() {
    return canvas.width > 992 ? Math.round(canvas.width * 0.25) + 60 : 0;
  }

  function draw() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const SPLIT  = calcSplit();
    const xStart = Math.ceil(SPLIT / CELL) * CELL;

    ctx.save();
    ctx.beginPath();
    ctx.rect(SPLIT, 0, canvas.width - SPLIT, canvas.height);
    ctx.clip();

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
    ctx.restore();
  }

  window.addEventListener('resize', draw, { passive: true });
  draw();
})();
