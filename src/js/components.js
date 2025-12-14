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
    });

  // Leadership
  fetch('src/components/content-components/leadership.html')
    .then(response => response.text())
    .then(data => {
      data = data.replace(/src="images\//g, 'src="src/images/');
      document.getElementById('leadership-container').innerHTML = data;
      animateBoxedSections();
    });

  // Personal projects
  fetch('src/components/content-components/personal-projects.html')
    .then(response => response.text())
    .then(data => {
      data = data.replace(/src="images\//g, 'src="src/images/');
      document.getElementById('projects-container').innerHTML = data;
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