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

// ─── Robot Car Gallery ──────────────────────────────────────────────────────

const ROBOT_GALLERY = [
    { src: 'src/images/LineFollowingRobot1.webp', caption: '' },
    { src: 'src/images/LineFollowingRobot2.png', caption: '' },
];

let galleryIndex = 0;

function initGalleryModal() {
    const modal   = document.getElementById('robot-gallery-modal');
    const closeBtn = document.getElementById('gallery-close-btn');
    const prevBtn  = document.getElementById('gallery-prev-btn');
    const nextBtn  = document.getElementById('gallery-next-btn');
    if (!modal) return;
    modal.addEventListener('click',   (e) => { if (e.target === modal) closeRobotGallery(); });
    if (closeBtn) closeBtn.addEventListener('click', closeRobotGallery);
    if (prevBtn)  prevBtn.addEventListener('click',  () => galleryNav(-1));
    if (nextBtn)  nextBtn.addEventListener('click',  () => galleryNav(1));
}

function openRobotGallery() {
    const modal = document.getElementById('robot-gallery-modal');
    if (!modal) return;
    galleryIndex = 0;
    renderGallery();
    modal.style.animation = 'fadeIn 0.25s ease';
    modal.style.display = 'flex';
    document.addEventListener('keydown', galleryKeyHandler);
}

function closeRobotGallery() {
    const modal = document.getElementById('robot-gallery-modal');
    if (!modal) return;
    modal.style.animation = '';
    modal.classList.add('fade-out');
    document.removeEventListener('keydown', galleryKeyHandler);
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('fade-out');
    }, 240);
}

function galleryNav(dir) {
    if (!ROBOT_GALLERY.length) return;
    const mainImg = document.getElementById('gallery-main-img');
    if (mainImg) {
        mainImg.style.opacity = '0';
        setTimeout(() => {
            galleryIndex = (galleryIndex + dir + ROBOT_GALLERY.length) % ROBOT_GALLERY.length;
            renderGallery();
            requestAnimationFrame(() => requestAnimationFrame(() => { mainImg.style.opacity = '1'; }));
        }, 180);
    } else {
        galleryIndex = (galleryIndex + dir + ROBOT_GALLERY.length) % ROBOT_GALLERY.length;
        renderGallery();
    }
}

function renderGallery() {
    const mainImg = document.getElementById('gallery-main-img');
    const caption = document.getElementById('gallery-main-caption');
    const counter = document.getElementById('gallery-counter');
    const thumbsEl = document.getElementById('gallery-thumbnails');
    const wrap = mainImg ? mainImg.closest('.gallery-main-img-wrap') : null;

    if (!ROBOT_GALLERY.length) {
        if (mainImg) mainImg.style.display = 'none';
        if (wrap && !wrap.querySelector('.gallery-placeholder')) {
            const ph = document.createElement('div');
            ph.className = 'gallery-placeholder';
            ph.innerHTML = `
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
                <span>Photos coming soon</span>`;
            wrap.appendChild(ph);
        }
        if (caption) caption.textContent = '';
        if (counter) counter.style.visibility = 'hidden';
        const modal = document.getElementById('robot-gallery-modal');
        if (modal) modal.querySelectorAll('.gallery-nav-btn').forEach(b => { b.style.opacity = '0'; b.style.pointerEvents = 'none'; });
        if (thumbsEl) thumbsEl.innerHTML = '';
        return;
    }

    if (wrap) { const ph = wrap.querySelector('.gallery-placeholder'); if (ph) ph.remove(); }
    const modal = document.getElementById('robot-gallery-modal');
    if (modal) modal.querySelectorAll('.gallery-nav-btn').forEach(b => { b.style.opacity = ''; b.style.pointerEvents = ''; });

    const item = ROBOT_GALLERY[galleryIndex];
    if (mainImg) { mainImg.src = item.src; mainImg.alt = item.caption || ''; mainImg.style.display = ''; }
    if (caption) caption.textContent = item.caption || '';
    if (counter) { counter.style.visibility = ''; counter.textContent = `${galleryIndex + 1} / ${ROBOT_GALLERY.length}`; }

    if (thumbsEl) {
        thumbsEl.innerHTML = ROBOT_GALLERY.map((img, i) =>
            `<img src="${img.src}" alt="${img.caption || ''}" class="gallery-thumb${i === galleryIndex ? ' active' : ''}" data-index="${i}">`
        ).join('');
        thumbsEl.querySelectorAll('.gallery-thumb').forEach(thumb => {
            thumb.addEventListener('click', () => {
                galleryIndex = parseInt(thumb.dataset.index, 10);
                renderGallery();
            });
        });
    }
}

function galleryKeyHandler(e) {
    if (e.key === 'ArrowLeft') galleryNav(-1);
    else if (e.key === 'ArrowRight') galleryNav(1);
    else if (e.key === 'Escape') closeRobotGallery();
}

// ─────────────────────────────────────────────────────────────────────────────

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

