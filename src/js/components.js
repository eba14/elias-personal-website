// Component loading and interaction functionality

const fixPaths = html => html
  .replace(/src="\.\.\/\.\.\/images\//g, 'src="src/images/')
  .replace(/src="images\//g, 'src="src/images/');

// Load shell components (header, profile, footer, email popup)
function loadComponents() {
  const base = 'src/components/';
  return Promise.all([
    fetch(base + 'header.html').then(r => r.text()),
    fetch(base + 'left-profile.html').then(r => r.text()),
    fetch(base + 'footer.html').then(r => r.text()),
    fetch(base + 'email-popup.html').then(r => r.text()),
  ]).then(([header, left, footer, email]) => {
    document.getElementById('header-container').innerHTML         = fixPaths(header);
    document.getElementById('left-profile-container').innerHTML   = fixPaths(left);
    document.getElementById('footer-container').innerHTML         = fixPaths(footer);
    document.getElementById('email-popup-container').innerHTML    = fixPaths(email);
  });
}

// Load all content sections, then trigger a single animation pass
function loadContentComponents() {
  const base = 'src/components/content-components/';

  const sections = [
    { id: 'about-me-container',      file: 'about-me.html' },
    { id: 'work-history-container',  file: 'work-history.html',  setup: setupAwsInternshipTabs },
    { id: 'leadership-container',    file: 'leadership.html' },
    { id: 'coursework-container',    file: 'coursework.html',    setup: setupCourseworkAccordion },
    { id: 'projects-container',      file: 'projects.html',      setup: () => { setupProjectsTabs(); setupGalleryButtons(); } },
    { id: 'hackathons-container',    file: 'hackathons.html',    setup: setupHackathonAccordion },
    { id: 'organizations-container', file: 'organizations.html' },
  ];

  const promises = sections.map(({ id, file, setup }) =>
    fetch(base + file)
      .then(r => r.text())
      .then(html => {
        document.getElementById(id).innerHTML = fixPaths(html);
        if (setup) setup();
      })
  );

  // Single animation pass after all sections are in the DOM
  Promise.allSettled(promises).then(animateBoxedSections);
}

// After components are injected, attach interactions
function setupInteractions() {
  // Profile image -> About Me modal
  const profileImg = document.getElementById('profile-img-click');
  if (profileImg) {
    profileImg.addEventListener('click', (e) => {
      e.preventDefault();
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
    emailLink.addEventListener('click', (e) => {
      e.preventDefault();
      const popup = document.getElementById('email-popup');
      if (popup) {
        popup.classList.remove('fade-out');
        popup.style.display = 'flex';
        popup.style.animation = 'fadeIn 0.3s ease';
      }
    });
  }
}

// Scroll progress bar
function updateScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const scrollTop  = window.pageYOffset;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.transform = `scaleX(${Math.max(0, Math.min(1, scrollTop / docHeight))})`;
}

function initProgressBarResizeObserver() {
  const target = document.querySelector('.right-side') || document.body;
  new ResizeObserver(updateScrollProgress).observe(target);
}

// Coursework accordion
function setupCourseworkAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function () {
      this.parentElement.classList.toggle('open');
      // Course cards appear instantly — only the tab container itself animates on scroll
    });
  });

}

// Hackathon accordion
function setupHackathonAccordion() {
  document.querySelectorAll('.hackathon-header').forEach(header => {
    header.addEventListener('click', function () {
      const item = this.parentElement;
      const opening = !item.classList.contains('open');
      item.classList.toggle('open');
      if (opening) {
        // Snap inner timeline items visible instantly — no animation, just appear
        item.querySelectorAll('.timeline-item').forEach(ti => {
          ti.style.opacity   = '1';
          ti.style.transform = 'translateY(0)';
          ti.classList.add('animate');
        });
      }
    });
  });
}

// Projects tabs
function setupProjectsTabs() {
  document.querySelectorAll('.projects-tab-header').forEach(header => {
    header.addEventListener('click', function () {
      const content   = this.nextElementSibling;
      const item      = this.closest('.projects-accordion-item');
      const isOpening = !this.classList.contains('active');
      this.classList.toggle('active');
      if (content) content.classList.toggle('active');
      if (item) item.classList.toggle('open', isOpening);

      if (isOpening) {
        const tab = this.getAttribute('data-tab');
        if (tab === 'personal') {
          setupPersonalProjectsCarousel();
        } else {
          // Snap academic timeline items visible instantly — only the tab container animates on scroll
          content.querySelectorAll('.academic-timeline-item').forEach(item => {
            item.style.opacity   = '1';
            item.style.transform = 'translateY(0)';
            item.classList.add('animate');
          });
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
  const prevBtn  = document.querySelector('#personal-projects .carousel-prev');
  const nextBtn  = document.querySelector('#personal-projects .carousel-next');
  const counter  = document.querySelector('#personal-projects .carousel-counter-badge');

  if (!viewport || !track || slides.length === 0) return;

  let current = 0;
  const total = slides.length;

  function goTo(index) {
    current = ((index % total) + total) % total;
    track.style.transform = `translateX(-${current * viewport.offsetWidth}px)`;
    if (counter) counter.textContent = `${current + 1} / ${total}`;
    const slide = slides[current];
    slide.classList.remove('animate');
    slide.style.opacity = '';
    void slide.offsetWidth;
    setTimeout(() => slide.classList.add('animate'), 20);
  }

  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); });

  let touchX = 0;
  track.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   (e) => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  window.addEventListener('resize', () => {
    track.style.transition = 'none';
    track.style.transform  = `translateX(-${current * viewport.offsetWidth}px)`;
    requestAnimationFrame(() => { track.style.transition = ''; });
  }, { passive: true });

  requestAnimationFrame(() => requestAnimationFrame(() => goTo(0)));
}

// Gallery trigger buttons
function setupGalleryButtons() {
    document.querySelectorAll('.gallery-btn[data-gallery]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (btn.dataset.gallery === 'robot') openRobotGallery();
            else if (btn.dataset.gallery === 'fpga') openFpgaGallery();
        });
    });
}

// AWS internship year tabs
function setupAwsInternshipTabs() {
  const buttons  = document.querySelectorAll('.internship-tab-btn');
  const contents = document.querySelectorAll('.internship-content');
  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      buttons.forEach(b  => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      const target = document.getElementById('internship-' + this.getAttribute('data-year'));
      if (target) target.classList.add('active');
    });
  });
}
