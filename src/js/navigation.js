// Mobile Navigation Functionality
function initializeMobileNavigation() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileToggle && mobileMenu) {
        // Toggle mobile menu
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }
}

// Initialize scroll effects using utility class
function initializeScrollEffects() {
    const scrollEffects = new ScrollEffects();
    scrollEffects.init();
    
    const smoothScroll = new SmoothScroll();
    smoothScroll.init();
}