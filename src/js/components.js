// Component loading and interaction functionality

// Load all component content
function loadComponents() {
  const compBase = 'src/components/';
  return Promise.all([
    fetch(compBase + 'header.html').then(r => r.text()),
    fetch(compBase + 'left-profile.html').then(r => r.text()),
    fetch(compBase + 'footer.html').then(r => r.text()),
    fetch(compBase + 'email-popup.html').then(r => r.text()),
    fetch(compBase + 'project-modals.html').then(r => r.text())
  ]).then(([headerHtml, leftHtml, footerHtml, emailHtml, projectModalsHtml]) => {
    // Fix image paths for all components
    leftHtml = leftHtml.replace(/src="images\//g, 'src="src/images/');
    headerHtml = headerHtml.replace(/src="images\//g, 'src="src/images/');
    footerHtml = footerHtml.replace(/src="images\//g, 'src="src/images/');
    emailHtml = emailHtml.replace(/src="images\//g, 'src="src/images/');
    projectModalsHtml = projectModalsHtml.replace(/src="images\//g, 'src="src/images/');
    
    document.getElementById('header-container').innerHTML = headerHtml;
    document.getElementById('left-profile-container').innerHTML = leftHtml;
    document.getElementById('footer-container').innerHTML = footerHtml;
    document.getElementById('email-popup-container').innerHTML = emailHtml;
    document.getElementById('project-modals-container').innerHTML = projectModalsHtml;
  });
}

function loadContentComponents() {
  // About Me
  fetch('src/components/content-components/about-me.html')
    .then(response => response.text())
    .then(data => {
      data = data.replace(/src="images\//g, 'src="src/images/');
      document.getElementById('about-me-container').innerHTML = data;
      animateBoxedSections();
    });

  // Work history (fix image paths)
  fetch('src/components/content-components/work-history.html')
    .then(response => response.text())
    .then(data => {
      data = data.replace(/src="\.\.\/\.\.\/images\//g, 'src="src/images/');
      data = data.replace(/src="images\//g, 'src="src/images/');
      document.getElementById('work-history-container').innerHTML = data;
      animateBoxedSections();
      setupAwsInternshipTabs();
    });

  // Leadership
  fetch('src/components/content-components/leadership.html')
    .then(response => response.text())
    .then(data => {
      data = data.replace(/src="images\//g, 'src="src/images/');
      document.getElementById('leadership-container').innerHTML = data;
      animateBoxedSections();
    });

  // Coursework
  fetch('src/components/content-components/coursework.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('coursework-container').innerHTML = data;
      setupCourseworkAccordion();
      animateBoxedSections();
    });

  // Personal projects
  fetch('src/components/content-components/projects.html')
    .then(response => response.text())
    .then(data => {
      data = data.replace(/src="images\//g, 'src="src/images/');
      document.getElementById('projects-container').innerHTML = data;
      setupProjectsTabs();
      animateBoxedSections();
      setupProjectModals();
    });

  // Hackathons (fix image paths)
  fetch('src/components/content-components/hackathons.html')
    .then(response => response.text())
    .then(data => {
      data = data.replace(/src="\.\.\/\.\.\/images\//g, 'src="src/images/');
      data = data.replace(/src="images\//g, 'src="src/images/');
      document.getElementById('hackathons-container').innerHTML = data;
      animateBoxedSections();
    });

  // Organizations (fix image paths)
  fetch('src/components/content-components/organizations.html')
    .then(response => response.text())
    .then(data => {
      data = data.replace(/src="\.\.\/\.\.\/images\//g, 'src="src/images/');
      data = data.replace(/src="images\//g, 'src="src/images/');
      document.getElementById('organizations-container').innerHTML = data;
      animateBoxedSections();
    });
}

// After components and content are injected, attach interactions
function setupInteractions() {
  // Profile image -> About Me modal
  const profileImg = document.getElementById('profile-img-click');
  if (profileImg) {
    profileImg.addEventListener('click', function (event) {
      event.preventDefault();
      const modal = document.getElementById('about-me-modal');
      if (modal) {
        modal.classList.remove('fade-out');
        modal.style.display = 'flex';
        modal.style.animation = 'fadeIn 0.3s ease';
      }
    });
  }

  // Email link -> show email popup
  const emailLink = document.getElementById('email-link');
  if (emailLink) {
    emailLink.addEventListener('click', function (event) {
      event.preventDefault();
      const popup = document.getElementById('email-popup');
      if (popup) {
        popup.classList.remove('fade-out');
        popup.style.display = 'flex';
        popup.style.animation = 'fadeIn 0.3s ease';
      }
    });
  }

  // Navbar links are handled by SmoothScroll utility
}

// Setup project modal functionality
function setupProjectModals() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      const modal = document.getElementById(projectId + '-modal');
      if (modal) {
        modal.classList.remove('fade-out');
        modal.style.display = 'flex';
        modal.style.animation = 'fadeIn 0.3s ease';
      }
    });
  });
}

// Update scroll progress bar based on current scroll position
function updateScrollProgress() {
  const scrollProgress = document.getElementById('scroll-progress');
  if (!scrollProgress) return;
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = Math.max(0, Math.min(1, scrollTop / docHeight));
  scrollProgress.style.transform = `scaleX(${scrollPercent})`;
}

// Watch for any height changes in the page and immediately resync the progress bar
function initProgressBarResizeObserver() {
  const target = document.querySelector('.right-side') || document.body;
  const observer = new ResizeObserver(() => {
    updateScrollProgress();
  });
  observer.observe(target);
}

// Setup coursework accordion functionality
function setupCourseworkAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const item = this.parentElement;
      item.classList.toggle('open');
    });
  });

  // Watch each accordion-item: when it re-enters the viewport while open,
  // reset inline styles and re-trigger animate — same logic as projects tabs
  const accordionItems = document.querySelectorAll('.accordion-item');
  const reentryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.classList.contains('open')) {
        const el = entry.target;
        // Disable transition temporarily so the class cycle doesn't cause a flash
        el.style.transition = 'none';
        el.style.opacity = '';
        el.style.transform = '';
        el.classList.remove('animate');
        void el.offsetWidth;
        el.style.transition = '';
        // Use same stagger timing as main scroll observer (dataset.index * 20)
        setTimeout(() => {
          el.classList.add('animate');
        }, el.dataset.index * 20);
      }
    });
  }, { threshold: 0.05 });

  accordionItems.forEach(item => reentryObserver.observe(item));
}

// Setup projects tab functionality
function setupProjectsTabs() {
  const tabHeaders = document.querySelectorAll('.projects-tab-header');
  tabHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const targetContent = this.nextElementSibling;
      const isOpening = !this.classList.contains('active');
      this.classList.toggle('active');
      if (targetContent) {
        targetContent.classList.toggle('active');
        if (isOpening) {
          const tab = this.getAttribute('data-tab');
          if (tab === 'personal') {
            // Carousel handles its own animation
            setupPersonalProjectsCarousel();
          } else {
            // Stagger academic timeline items
            const items = targetContent.querySelectorAll('.academic-timeline-item');
            items.forEach((item, i) => {
              item.classList.remove('animate');
              item.style.opacity = '0';
              item.style.transform = 'translateY(20px)';
              setTimeout(() => {
                item.style.opacity = '';
                item.style.transform = '';
                item.classList.add('animate');
              }, i * 90 + 30);
            });
          }
        }
      }
    });
  });
}

// Personal projects carousel
function setupPersonalProjectsCarousel() {
  const viewport = document.querySelector('#personal-projects .carousel-viewport');
  const track    = document.querySelector('#personal-projects .carousel-track');
  const slides   = Array.from(document.querySelectorAll('#personal-projects .carousel-slide'));
  const prevBtn  = document.querySelector('#personal-projects .carousel-prev'); // ← left arrow
  const nextBtn  = document.querySelector('#personal-projects .carousel-next'); // → right arrow
  const counter  = document.querySelector('#personal-projects .carousel-counter-badge');

  if (!viewport || !track || slides.length === 0) return;

  let current = 0;
  const total = slides.length;

  // CSS Grid handles slide widths; we only need pixel translate for positioning.
  function goTo(index) {
    current = ((index % total) + total) % total;
    track.style.transform = `translateX(-${current * viewport.offsetWidth}px)`;
    if (counter) counter.textContent = `${current + 1} / ${total}`;

    // Re-trigger entrance animation on incoming slide
    const slide = slides[current];
    slide.classList.remove('animate');
    slide.style.opacity = '';
    void slide.offsetWidth;
    setTimeout(() => slide.classList.add('animate'), 20);
  }

  // LEFT arrow (←) swipes LEFT → advance to next slide
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); });
  // RIGHT arrow (→) swipes RIGHT → go back to previous slide
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); });

  // Touch / swipe support for mobile
  let touchX = 0;
  track.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  // Reposition on resize without animation
  window.addEventListener('resize', () => {
    track.style.transition = 'none';
    track.style.transform = `translateX(-${current * viewport.offsetWidth}px)`;
    requestAnimationFrame(() => { track.style.transition = ''; });
  }, { passive: true });

  // Double RAF: wait for the accordion's CSS transition to push the viewport
  // to its real width before computing the initial pixel offset.
  requestAnimationFrame(() => requestAnimationFrame(() => goTo(0)));
}

// Animate academic timeline items
function animateAcademicTimelineItems() {
  const items = document.querySelectorAll('.academic-timeline-item');
  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('animate');
    }, index * 100);
  });
}

// Animate personal project cards
function animatePersonalProjectCards() {
  const cards = document.querySelectorAll('#personal-projects .project-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate');
    }, index * 100);
  });
}

// Setup AWS internship tabs
function setupAwsInternshipTabs() {
  const tabButtons = document.querySelectorAll('.internship-tab-btn');
  const tabContents = document.querySelectorAll('.internship-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const year = this.getAttribute('data-year');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      const targetContent = document.getElementById('internship-' + year);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}