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
  
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  }
  
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  updateActiveNavLink();
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
  const sections = ['about-me', 'work-history', 'leadership', 'projects', 'hackathons', 'organizations'];
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