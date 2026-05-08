// Hero section initialization using utility classes
function initializeHeroSection() {
  // ":)" is removed from text — replaced by the self-drawing SVG smiley
  const text = "Hi, I'm Elias Assalif.";
  const typewriterElement = document.getElementById('typewriter-text');
  const emojiElement     = document.getElementById('rotating-emoji');
  const smileyWrapper    = document.getElementById('smiley-wrapper');

  // Tech/engineering emojis — wave first, then cycle through the rest
  const emojis = ['👋', '⚡', '💻', '🤖', '🔧', '🧠', '⚙️', '🧩', '💡', '🔌', '📊', '🧮', '📐', '🔋', '🦾', '🔑', '🌐', '📱', '🔥', '🎓', '👑', '✅'];

  if (!typewriterElement) return;

  if (emojiElement) emojiElement.textContent = emojis[0];

  const typewriter = new TypewriterEffect(typewriterElement, text, {
    onComplete: () => {
      // Step 1 — draw the SVG smiley (100ms after cursor fades)
      if (smileyWrapper) {
        setTimeout(() => smileyWrapper.classList.add('is-drawing'), 100);
      }

      // Step 2 — pop in the emoji while smiley is mid-draw (feels sequential but snappy)
      if (emojiElement) {
        const emojiRotator = new EmojiRotator(emojiElement, emojis);
        emojiRotator.start(650);
      }
    }
  });
  typewriter.start(800);
}