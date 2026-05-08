// Typewriter utility functions
class TypewriterEffect {
    constructor(element, text, options = {}) {
        this.element = element;
        this.text = text;
        this.options = {
            speed: 75,
            pauseAfterComma: 550,
            pauseAfterPeriod: 700,
            pauseAfterExclaim: 700,
            cursorFadeDelay: 800,   // extra blinks before fading
            onComplete: null,
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
            const ch = this.text.charAt(this.currentIndex);
            if (ch === ' ') {
                // Space inside an inline-block span collapses — use a text node
                this.element.appendChild(document.createTextNode(' '));
            } else {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = ch;
                this.element.appendChild(span);
            }
            this.currentIndex++;

            let delay = this.options.speed;
            if (ch === ',')  delay = this.options.pauseAfterComma;
            if (ch === '.')  delay = this.options.pauseAfterPeriod;
            if (ch === '!')  delay = this.options.pauseAfterExclaim;
            // spaces feel snappier
            if (ch === ' ')  delay = this.options.speed * 0.6;

            setTimeout(() => this.type(), delay);
        } else {
            this._finishCursor();
        }
    }

    _finishCursor() {
        // Let cursor blink a couple more times, then fade out via CSS class
        setTimeout(() => {
            this.element.classList.add('cursor-done');
            if (typeof this.options.onComplete === 'function') {
                this.options.onComplete();
            }
        }, this.options.cursorFadeDelay);
    }
}