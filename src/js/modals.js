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

// ─── Shared project gallery lightbox ────────────────────────────────────────

const ROBOT_GALLERY = [
    { src: 'src/images/LineFollowingRobot1.webp', caption: '' },
    { src: 'src/images/LineFollowingRobot2.png',  caption: '' },
    { src: 'https://drive.google.com/file/d/1OHkB4vs5yseRZV7F8Z8k-tFbP-PNSEqO/preview', caption: 'Robot competition course run', type: 'gdrive' },
];

const FPGA_GALLERY = [
    { src: 'src/images/FPGAConnect4_1.PNG',     caption: '' },
    { src: 'https://drive.google.com/file/d/1N5apfk54jVyQX7ps_Fiwr2bFVogu38_g/preview', caption: 'Live gameplay demo', type: 'gdrive' },
];

let currentGallery   = [];
let galleryIndex     = 0;
let galleryNavLocked = false;

function initGalleryModal() {
    const modal    = document.getElementById('robot-gallery-modal');
    const closeBtn = document.getElementById('gallery-close-btn');
    const prevBtn  = document.getElementById('gallery-prev-btn');
    const nextBtn  = document.getElementById('gallery-next-btn');
    if (!modal) return;
    modal.addEventListener('click', (e) => { if (e.target === modal) closeGallery(); });
    if (closeBtn) closeBtn.addEventListener('click', closeGallery);
    if (prevBtn)  prevBtn.addEventListener('click',  () => galleryNav(-1));
    if (nextBtn)  nextBtn.addEventListener('click',  () => galleryNav(1));
}

function openGallery(items, title) {
    const modal   = document.getElementById('robot-gallery-modal');
    const titleEl = document.querySelector('#robot-gallery-modal .gallery-modal-title');
    if (!modal) return;
    currentGallery   = items;
    galleryIndex     = 0;
    galleryNavLocked = false;
    if (titleEl) titleEl.textContent = title;
    renderGallery();
    modal.style.animation = 'fadeIn 0.25s ease';
    modal.style.display   = 'flex';
    document.addEventListener('keydown', galleryKeyHandler);
}

function openRobotGallery() { openGallery(ROBOT_GALLERY, 'Line-Following Robot Car'); }
function openFpgaGallery()  { openGallery(FPGA_GALLERY,  'FPGA Connect 4'); }
function closeRobotGallery() { closeGallery(); }

function closeGallery() {
    const modal = document.getElementById('robot-gallery-modal');
    if (!modal) return;
    pauseGalleryVideo();
    modal.style.animation = '';
    modal.classList.add('fade-out');
    document.removeEventListener('keydown', galleryKeyHandler);
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('fade-out');
    }, 240);
}

function pauseGalleryVideo() {
    const v = document.getElementById('gallery-main-video');
    if (v && !v.paused) v.pause();
    const iframe = document.getElementById('gallery-main-iframe');
    if (iframe) iframe.src = '';
}

function galleryNavWithFade(newIndex) {
    if (galleryNavLocked) return;
    galleryNavLocked = true;
    pauseGalleryVideo();
    const wrap = document.querySelector('.gallery-main-img-wrap');
    if (wrap) {
        wrap.style.opacity = '0';
        setTimeout(() => {
            galleryIndex = newIndex;
            renderGallery();
            requestAnimationFrame(() => requestAnimationFrame(() => {
                wrap.style.opacity = '1';
                galleryNavLocked = false;
            }));
        }, 180);
    } else {
        galleryIndex = newIndex;
        renderGallery();
        galleryNavLocked = false;
    }
}

function galleryNav(dir) {
    if (!currentGallery.length || galleryNavLocked) return;
    galleryNavWithFade((galleryIndex + dir + currentGallery.length) % currentGallery.length);
}

function renderGallery() {
    const mainImg    = document.getElementById('gallery-main-img');
    const mainVideo  = document.getElementById('gallery-main-video');
    const mainIframe = document.getElementById('gallery-main-iframe');
    const driveLink  = document.getElementById('gallery-drive-link');
    const caption    = document.getElementById('gallery-main-caption');
    const counter    = document.getElementById('gallery-counter');
    const thumbsEl   = document.getElementById('gallery-thumbnails');

    const item     = currentGallery[galleryIndex];
    const isVideo  = item && item.type === 'video';
    const isGdrive = item && item.type === 'gdrive';

    if (mainImg) {
        mainImg.style.display = (!isVideo && !isGdrive) ? '' : 'none';
        if (!isVideo && !isGdrive && item) { mainImg.src = item.src; mainImg.alt = item.caption || ''; }
    }
    if (mainVideo) {
        mainVideo.style.display = isVideo ? '' : 'none';
        if (isVideo && item) { mainVideo.src = item.src; mainVideo.load(); }
        else mainVideo.src = '';
    }
    if (mainIframe) {
        mainIframe.style.display = isGdrive ? '' : 'none';
        if (isGdrive && item) mainIframe.src = item.src;
        else mainIframe.src = '';
    }
    if (driveLink) {
        driveLink.style.display = isGdrive ? '' : 'none';
        if (isGdrive && item) driveLink.href = item.src.replace('/preview', '/view');
        else driveLink.href = '';
    }

    if (caption) caption.textContent = (item && item.caption) || '';
    if (counter) { counter.style.visibility = ''; counter.textContent = `${galleryIndex + 1} / ${currentGallery.length}`; }

    if (thumbsEl) {
        thumbsEl.innerHTML = currentGallery.map((it, i) => {
            const active = i === galleryIndex ? ' active' : '';
            if (it.type === 'video' || it.type === 'gdrive') {
                return `<div class="gallery-thumb gallery-thumb-video${active}" data-index="${i}" role="button" tabindex="0" aria-label="Video clip">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>`;
            }
            return `<img src="${it.src}" alt="${it.caption || ''}" class="gallery-thumb${active}" data-index="${i}">`;
        }).join('');
        thumbsEl.querySelectorAll('[data-index]').forEach(el => {
            el.addEventListener('click', () => {
                const idx = parseInt(el.dataset.index, 10);
                if (idx === galleryIndex || galleryNavLocked) return;
                galleryNavWithFade(idx);
            });
        });
    }
}

function galleryKeyHandler(e) {
    if (e.key === 'ArrowLeft')  galleryNav(-1);
    else if (e.key === 'ArrowRight') galleryNav(1);
    else if (e.key === 'Escape') closeGallery();
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

