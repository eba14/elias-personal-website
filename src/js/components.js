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
      this.parentElement.classList.toggle('open');
    });
  });
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
        // When opening, ensure inner animated items get their animate class
        // without relying on the scroll observer (which can flicker)
        if (isOpening) {
          const items = targetContent.querySelectorAll(
            '.academic-timeline-item, .project-card'
          );
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add('animate'), i * 80);
          });
        }
      }
    });
  });
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