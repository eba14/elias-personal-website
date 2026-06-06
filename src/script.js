// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  window.scrollTo(0, 0);

  const loadStart = Date.now();

  function dismissLoader() {
    const ls = document.getElementById('loading-screen');
    if (!ls) return;
    const elapsed = Date.now() - loadStart;
    setTimeout(() => {
      ls.classList.add('fade-out');
      setTimeout(() => {
        ls.remove();
        // Correct footer state now that the full document height is known
        const footer = document.getElementById('footer');
        if (footer) {
          const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10;
          footer.classList.toggle('show', atBottom);
        }
        initializeHeroSection(); // start typewriter only after loader is fully gone
      }, 500);
    }, Math.max(0, 2200 - elapsed)); // 2 × 1.1 s bar iterations
  }

  loadComponents()
    .then(() => {
      setupInteractions();
      initGalleryModal();
      initializeHeader();
      initializeMobileNavigation();
      initializeScrollEffects();
      loadContentComponents();
      setTimeout(initProgressBarResizeObserver, 100);
      dismissLoader();
    })
    .catch(err => {
      console.error('Error loading components:', err);
      dismissLoader();
    });
});

// Footer show/hide — skipped while loading screen is present
// (document height is unreliable until all sections have injected their HTML)
window.addEventListener('scroll', function() {
  if (document.getElementById('loading-screen')) return;
  const footer = document.getElementById('footer');
  if (footer) {
    const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10;
    footer.classList.toggle('show', atBottom);
  }
});

function initializeHeader() {
  // Nav active state + smooth scroll handled by ScrollEffects + SmoothScroll in initializeScrollEffects()
}