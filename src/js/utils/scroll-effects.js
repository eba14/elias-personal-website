// Scroll-related utility functions
class ScrollEffects {
    constructor() {
        this.scrollProgress = document.getElementById('scroll-progress');
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.header = document.querySelector('header');
    }

    updateScrollProgress() {
        if (!this.scrollProgress) return;
        
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        this.scrollProgress.style.transform = `scaleX(${scrollPercent})`;
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