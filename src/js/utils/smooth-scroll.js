// Smooth scrolling utility
class SmoothScroll {
    constructor(offset = 100) {
        this.offset = offset;
    }

    init() {
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });

        const logo = document.getElementById('logo-home');
        if (logo) {
            logo.addEventListener('click', () => {
                this.scrollToTop();
            });
        }
    }

    scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;

        const header = document.querySelector('header');
        const headerHeight = header ? header.getBoundingClientRect().height : 80;

        const sectionTitle = targetSection.querySelector('.section-title');
        let target;
        if (sectionTitle) {
            target = window.pageYOffset + sectionTitle.getBoundingClientRect().top - headerHeight - 10;
        } else {
            target = targetSection.offsetTop - headerHeight - 10;
        }

        this._animateScroll(Math.max(0, target), 380);
    }

    scrollToTop() {
        this._animateScroll(0, 380);
    }

    _animateScroll(target, duration) {
        const start = window.pageYOffset;
        const distance = target - start;
        if (distance === 0) return;
        const startTime = performance.now();

        const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            window.scrollTo(0, start + distance * ease(progress));
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }
}
