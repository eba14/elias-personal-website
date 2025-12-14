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

        // Logo click to top
        const logo = document.getElementById('logo-home');
        if (logo) {
            logo.addEventListener('click', () => {
                this.scrollToTop();
            });
        }
    }

    scrollToSection(sectionId) {
        // Wait for content to be fully loaded
        setTimeout(() => {
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.getBoundingClientRect().height : 80;
                
                // Find the section title within the section
                const sectionTitle = targetSection.querySelector('.section-title');
                if (sectionTitle) {
                    // Get the actual position of the section title
                    const titleRect = sectionTitle.getBoundingClientRect();
                    const titleTop = window.pageYOffset + titleRect.top;
                    
                    // Position title just below header with small buffer
                    const scrollPosition = titleTop - headerHeight - 10;
                    
                    window.scrollTo({
                        top: Math.max(0, scrollPosition),
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback to section top if no title found
                    const scrollPosition = targetSection.offsetTop - headerHeight - 10;
                    window.scrollTo({
                        top: Math.max(0, scrollPosition),
                        behavior: 'smooth'
                    });
                }
            }
        }, 100);
    }

    scrollToTop() {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    }
}