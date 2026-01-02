// Hero section initialization using utility classes
function initializeHeroSection() {
  const text = "Hi, I'm Elias Assalif. :)";
  const typewriterElement = document.getElementById('typewriter-text');
  const emojiElement = document.getElementById('rotating-emoji');
  
  // Tech, robotics, and engineering emojis
  const emojis = ['👋', '⚡', '💻', '🤖', '🔧', '🧠', '⚙️', '🧩', '💡', '🔌', '📊', '🧮', '📐', '🔋', '🦾', '🔑', '🌐', '📱', '🔥', '🎓', '👑', '✅'];
  
  if (typewriterElement) {
    const typewriter = new TypewriterEffect(typewriterElement, text);
    typewriter.start(800);
    
    // Calculate when typewriter completes for emoji timing
    const typewriterDuration = 800 + (text.length * 80) + 600 + 1500;
    
    if (emojiElement) {
      const emojiRotator = new EmojiRotator(emojiElement, emojis);
      emojiRotator.start(typewriterDuration + 500);
    }
  }
}