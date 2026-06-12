// Custom circular cursor — mouse/trackpad devices only
(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const ring = document.getElementById('cursor-ring');
  const dot  = document.getElementById('cursor-dot');
  if (!ring || !dot) return;

  document.documentElement.classList.add('cursor-active');

  let tx = -200, ty = -200, rx = -200, ry = -200, started = false, inIframe = false;

  document.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    dot.style.left = tx + 'px';
    dot.style.top  = ty + 'px';
    if (!started) {
      started = true; rx = tx; ry = ty;
      showCursor();
    } else if (inIframe) {
      inIframe = false;
      showCursor();
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

  // Named/purposeful UI elements → blue. Section backgrounds/panels stay white.
  const CONTENT =
    'a, button, input, select, textarea, label, ' +
    '.nav-link, .nav-divider, .elias-a, .mobile-menu-toggle, .mobile-nav-link, ' +
    '.profile-img, .profile-name, .profile-tagline, .profile-location, .social-btn, ' +
    '.section-title, ' +
    '.timeline-item, .boxed-section, .org-card, .course-card, ' +
    '.project-card, .academic-timeline-item, ' +
    '.accordion-header, .hackathon-header, .projects-tab-header, ' +
    '.carousel-btn, .carousel-counter-badge, .skill-tag, ' +
    '.hero-section, ' +
    '.footer-content, .popup-content, .scroll-progress, ' +
    '.gallery-modal-content, .gallery-thumb, .gallery-main-img, .gallery-main-iframe, ' +
    '#back-to-top, .copy-email-btn, .gallery-drive-link';

  // Transitions to remove opacity animation (used when hiding instantly)
  const RING_TRANSITION_NO_OPACITY = 'width 0.18s ease, height 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, transform 0.1s ease';
  const DOT_TRANSITION_NO_OPACITY  = 'background 0.18s ease';

  function hideCursorInstant() {
    ring.style.transition = RING_TRANSITION_NO_OPACITY;
    dot.style.transition  = DOT_TRANSITION_NO_OPACITY;
    ring.style.opacity = '0';
    dot.style.opacity  = '0';
  }

  function showCursor() {
    ring.style.transition = '';
    dot.style.transition  = '';
    ring.style.opacity = '1';
    dot.style.opacity  = '1';
  }

  document.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'IFRAME') {
      inIframe = true;
      hideCursorInstant();
      return;
    }
    inIframe = false;
    const hit = !!e.target.closest(CONTENT);
    dot.style.background   = hit ? 'rgba(110,181,255,0.9)'  : 'rgba(255,255,255,0.9)';
    ring.style.borderColor = hit ? 'rgba(110,181,255,0.85)' : 'rgba(255,255,255,0.5)';
    ring.style.width       = hit ? '38px' : '26px';
    ring.style.height      = hit ? '38px' : '26px';
    ring.style.boxShadow   = hit ? '0 0 12px rgba(110,181,255,0.3)' : 'none';
  });

  document.addEventListener('mousedown', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(0.72)';
  });
  document.addEventListener('mouseup', () => {
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
  });
  document.addEventListener('mouseleave', () => {
    hideCursorInstant();
  });
  document.addEventListener('mouseenter', () => {
    if (started) showCursor();
  });
})();
