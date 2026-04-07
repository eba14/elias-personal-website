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
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, entry.target.dataset.index * 20);
        
        const section = entry.target.closest('section');
        if (section) {
          section.classList.add('animate');
        }
      } else {
        // Don't remove animate from items inside an open accordion/tab —
        // that causes the flicker when the user scrolls inside a dropdown
        const insideOpenAccordion = entry.target.closest('.accordion-item.open, .projects-tab-content.active');
        if (!insideOpenAccordion) {
          entry.target.classList.remove('animate');
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(20px)';
        }
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
});