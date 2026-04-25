// Custom circular cursor — mouse devices only
(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const ring = document.getElementById('cursor-ring');
  const dot  = document.getElementById('cursor-dot');
  if (!ring || !dot) return;

  // Hide native cursor only once we know JS is running
  document.documentElement.classList.add('cursor-active');

  let tx = -200, ty = -200;
  let rx = -200, ry = -200;
  let started = false;

  document.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    dot.style.left = tx + 'px';
    dot.style.top  = ty + 'px';
    if (!started) {
      started = true;
      rx = tx;
      ry = ty;
      ring.style.opacity = '1';
      dot.style.opacity  = '1';
    }
  }, { passive: true });

  // Ring smoothly chases the cursor
  (function loop() {
    rx += (tx - rx) * 0.14;
    ry += (ty - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  // Expand + gold tint over interactive elements
  document.addEventListener('mouseover', (e) => {
    const hit = e.target.closest(
      'a, button, .social-btn, .carousel-btn, .org-card, ' +
      '.timeline-logo, .accordion-header, .projects-tab-header, ' +
      '.profile-avatar, .section-title, .course-card'
    );
    if (hit) {
      ring.style.width       = '44px';
      ring.style.height      = '44px';
      ring.style.borderColor = 'rgba(244,180,0,0.9)';
      ring.style.boxShadow   = '0 0 12px rgba(244,180,0,0.35)';
    } else {
      ring.style.width       = '28px';
      ring.style.height      = '28px';
      ring.style.borderColor = 'rgba(110,181,255,0.9)';
      ring.style.boxShadow   = '0 0 8px rgba(110,181,255,0.35)';
    }
  });

  // Squeeze on click
  document.addEventListener('mousedown', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(0.72)';
  });
  document.addEventListener('mouseup', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
  });

  document.addEventListener('mouseleave', () => {
    ring.style.opacity = '0';
    dot.style.opacity  = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (started) {
      ring.style.opacity = '1';
      dot.style.opacity  = '1';
    }
  });
})();
