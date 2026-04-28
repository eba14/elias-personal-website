// Smooth scrolling utility
class SmoothScroll {
    init() {
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToSection(link.getAttribute('href').substring(1));
            });
        });

        const logo = document.getElementById('logo-home');
        if (logo) {
            logo.addEventListener('click', () => this.scrollToTop());
        }
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        const header   = document.querySelector('header');
        const offset   = header ? header.getBoundingClientRect().height : 80;
        const top      = window.pageYOffset + section.getBoundingClientRect().top - offset - 10;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
