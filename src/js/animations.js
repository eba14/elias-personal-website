// Animation and scroll functionality

// Stagger animation for boxed sections
function animateBoxedSections() {
  const boxes = document.querySelectorAll('.boxed-section, .project-card, .timeline-item, .academic-timeline-item, .org-card, .accordion-item, .projects-accordion-item');
  boxes.forEach((box) => {
    box.classList.remove('animate');
    box.style.opacity = '0';
    box.style.transform = 'translateY(20px)';
  });
  observeBoxes();
}

// Intersection Observer for scroll-triggered animations
function observeBoxes() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animate the boxed element
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, entry.target.dataset.index * 20);
        
        // Also animate the parent section's divider
        const section = entry.target.closest('section');
        if (section) {
          section.classList.add('animate');
        }
      } else {
        entry.target.classList.remove('animate');
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(20px)';
      }
    });
  }, { threshold: 0.1 });

  const boxes = document.querySelectorAll('.boxed-section, .project-card, .timeline-item, .academic-timeline-item, .org-card, .accordion-item, .projects-accordion-item');
  boxes.forEach((box, index) => {
    box.dataset.index = index;
    observer.observe(box);
  });
}

// Enhanced scroll functionality
window.addEventListener('scroll', function() {
  // Footer show/hide
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
  
  // Scroll progress bar
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.max(0, Math.min(1, scrollTop / docHeight));
      scrollProgress.style.transform = `scaleX(${scrollPercent})`;
    });
  }
  
  // Header background change
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});