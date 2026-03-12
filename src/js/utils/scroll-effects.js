// Scroll-related utility functions
class ScrollEffects {
    constructor() {
        this.scrollProgress = document.getElementById('scroll-progress');
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.header = document.querySelector('header');
        this.isUpdating = false;
    }

    updateScrollProgress() {
        if (!this.scrollProgress) return;
        
        // Throttle updates for smoother performance
        if (this.isUpdating) return;
        this.isUpdating = true;
        
        requestAnimationFrame(() => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.max(0, Math.min(1, scrollTop / docHeight));
            
            this.scrollProgress.style.transform = `scaleX(${scrollPercent})`;
            this.isUpdating = false;
        });
    }

    updateActiveNav() {
        const scrollPos = window.pageYOffset + 150;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    updateHeaderState() {
        if (!this.header) return;
        
        if (window.scrollY > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }

    init() {
        window.addEventListener('scroll', () => {
            this.updateScrollProgress();
            this.updateActiveNav();
            this.updateHeaderState();
        });

        // Initial calls
        this.updateScrollProgress();
        this.updateActiveNav();
        this.updateHeaderState();
    }
}