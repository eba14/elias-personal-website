// Emoji rotation utility
class EmojiRotator {
    constructor(element, emojis, options = {}) {
        this.element = element;
        this.emojis = emojis;
        this.options = {
            rotationSpeed: 2800,
            fadeDuration: 220,   // ms — must match CSS transition duration
            ...options
        };
        this.currentIndex = 0;
        this.intervalId = null;
    }

    start(delay = 0) {
        setTimeout(() => {
            // Spring pop-in entrance animation
            this.element.classList.add('emoji-pop-in');
            this.element.addEventListener('animationend', () => {
                this.element.classList.remove('emoji-pop-in');
                // emoji-active enables opacity:1 + the CSS transition for future fades
                this.element.classList.add('emoji-active');
                this.intervalId = setInterval(() => this._rotate(), this.options.rotationSpeed);
            }, { once: true });
        }, delay);
    }

    _rotate() {
        // Fade out
        this.element.classList.add('emoji-fade-out');

        setTimeout(() => {
            // Swap while invisible
            this.currentIndex = (this.currentIndex + 1) % this.emojis.length;
            this.element.textContent = this.emojis[this.currentIndex];
            // Fade back in (removing the class triggers the CSS transition)
            this.element.classList.remove('emoji-fade-out');
        }, this.options.fadeDuration);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
