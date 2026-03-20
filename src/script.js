// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  // Ensure page starts at top
  window.scrollTo(0, 0);
  
  loadComponents()
    .then(() => {
      setupInteractions();
      initializeHeader();
      initializeMobileNavigation();
      initializeScrollEffects();
      loadContentComponents();
      // Start ResizeObserver after a tick so content has been injected
      setTimeout(initProgressBarResizeObserver, 100);
    })
    .then(() => {
      setTimeout(initializeHeroSection, 300);
    })
    .catch(err => console.error('Error loading components:', err));
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
  setupLogoClick();
  updateActiveNavLink();
}

function setupLogoClick() {
  const logo = document.getElementById('logo-home');
  if (logo) {
    logo.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function updateActiveNavLink() {
  const sections = ['about-me', 'work-history', 'leadership', 'coursework', 'projects', 'hackathons', 'organizations'];
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  const header = document.querySelector('header');
  const headerHeight = header ? header.getBoundingClientRect().height : 80;
  
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= headerHeight + 20 && rect.bottom >= headerHeight + 20) {
        currentSection = sectionId;
      }
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}