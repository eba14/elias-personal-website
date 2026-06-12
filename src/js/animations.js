// Animation and scroll functionality

// 3D tilt on project cards — desktop pointer devices only
(function () {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let tiltCard = null;

    document.addEventListener('mousemove', (e) => {
        const card = e.target.closest('.project-card');
        if (tiltCard && tiltCard !== card) {
            tiltCard.style.transition = '';
            tiltCard.style.transform  = '';
            tiltCard = null;
        }
        if (!card || !card.classList.contains('animate')) return;
        tiltCard = card;
        const r  = card.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
        const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
        card.style.transition = 'box-shadow 0.15s ease';
        card.style.transform  = `perspective(700px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg) translateY(-3px)`;
    });
})();

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

