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
        if (section) section.classList.add('animate');
      } else {
        // On tablet/mobile (single-column layout) sections re-enter the
        // viewport constantly while scrolling — don't reset their animation
        // or every section flashes on every scroll pass.
        if (window.innerWidth <= 992) return;
        // Protect elements *inside* an open accordion from resetting,
        // but let the accordion container itself reset so it re-animates on scroll-back.
        const isInsideOpen = entry.target.parentElement &&
          entry.target.parentElement.closest(
            '.accordion-item.open, .projects-accordion-item.open, .projects-tab-content.active'
          );
        if (isInsideOpen) return;
        entry.target.classList.remove('animate');
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(20px)';
      }
    });
  }, { threshold: 0.05 });

  const boxes = document.querySelectorAll('.boxed-section, .project-card, .timeline-item, .academic-timeline-item, .org-card, .accordion-item, .projects-accordion-item');
  boxes.forEach((box, index) => {
    box.dataset.index = index;
    observer.observe(box);
  });
}

