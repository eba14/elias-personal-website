// Typewriter utility functions
class TypewriterEffect {
    constructor(element, text, options = {}) {
        this.element = element;
        this.text = text;
        this.options = {
            speed: 80,
            pauseAfterComma: 600,
            cursorRemoveDelay: 1500,
            ...options
        };
        this.currentIndex = 0;
    }

    start(delay = 0) {
        setTimeout(() => {
            this.element.textContent = '';
            this.type();
        }, delay);
    }

    type() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentIndex);
            this.currentIndex++;
            
            const delay = this.text.charAt(this.currentIndex - 1) === ',' 
                ? this.options.pauseAfterComma 
                : this.options.speed;
            
            setTimeout(() => this.type(), delay);
        } else {
            this.removeCursor();
        }
    }

    removeCursor() {
        setTimeout(() => {
            const style = document.createElement('style');
            style.textContent = '#typewriter-text::after { display: none; }';
            document.head.appendChild(style);
        }, this.options.cursorRemoveDelay);
    }
}