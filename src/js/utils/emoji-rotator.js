// Emoji rotation utility
class EmojiRotator {
    constructor(element, emojis, options = {}) {
        this.element = element;
        this.emojis = emojis;
        this.options = {
            rotationSpeed: 2500,
            fadeSpeed: 300,
            ...options
        };
        this.currentIndex = 0;
        this.intervalId = null;
    }

    start(delay = 0) {
        this.element.style.opacity = '0';
        
        setTimeout(() => {
            this.element.style.opacity = '1';
            this.intervalId = setInterval(() => this.rotate(), this.options.rotationSpeed);
        }, delay);
    }

    rotate() {
        this.element.style.opacity = '0';
        this.element.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            this.currentIndex = (this.currentIndex + 1) % this.emojis.length;
            this.element.textContent = this.emojis[this.currentIndex];
            this.element.style.opacity = '1';
            this.element.style.transform = 'scale(1)';
        }, this.options.fadeSpeed);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}