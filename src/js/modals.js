// Modal and popup functionality

// Closes the "About Me" modal when close button is clicked
function closeAboutMeModal() {
  const modal = document.getElementById("about-me-modal");
  if (!modal) return;
  // play fade-out animation then hide
  // clear any inline animation so CSS class animation can run
  modal.style.animation = '';
  modal.classList.add('fade-out');
  setTimeout(() => {
    modal.style.display = 'none';
    modal.classList.remove('fade-out');
  }, 240);
}

// Close the email popup when close button is clicked
function closePopup() {
  const popup = document.getElementById("email-popup");
  if (!popup) return;
  // clear inline animation so class animation takes effect
  popup.style.animation = '';
  popup.classList.add('fade-out');
  setTimeout(() => {
    popup.style.display = 'none';
    popup.classList.remove('fade-out');
  }, 240);
}

// Close project modals
function closeProjectModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.style.animation = '';
  modal.classList.add('fade-out');
  setTimeout(() => {
    modal.style.display = 'none';
    modal.classList.remove('fade-out');
  }, 240);
}