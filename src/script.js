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
        initializeHeroSection(); // start typewriter only after loader is fully gone
      }, 500);
    }, Math.max(0, 1600 - elapsed));
  }

  loadComponents()
    .then(() => {
      setupInteractions();
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

// Enhanced scroll functionality
window.addEventListener('scroll', function() {
  const footer = document.getElementById('footer');
  if (footer) {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollPosition >= documentHeight - 10) {
      footer.classList.add('show');
    } else {
      footer.classList.remove('show');
    }
  }
});

function initializeHeader() {
  // Nav active state + smooth scroll handled by ScrollEffects + SmoothScroll in initializeScrollEffects()
}