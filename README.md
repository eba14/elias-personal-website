# Elias Assalif — Personal Portfolio

A fully responsive personal portfolio website built from scratch with HTML, CSS, and JavaScript. It showcases my work experiences, academic projects, personal projects, hackathons, leadership, organizations, and coursework.

## Live Website

<a href="https://eba14.github.io/elias-personal-website" target="_blank">eba14.github.io/elias-personal-website</a>

## Features

- **Responsive layout** — adapts across desktop, tablet, and mobile with a fixed sidebar on desktop and stacked layout on smaller screens
- **Custom animated cursor** — smooth ring + dot cursor on pointer devices
- **Intersection Observer animations** — cards and sections fade in as they enter the viewport
- **Project gallery lightbox** — photo and video gallery modal with thumbnail navigation and video support
- **Projects carousel** — swipeable/navigable carousel for browsing personal projects
- **Tabbed content sections** — switch between multiple entries within a single card
- **Collapsible accordions** — expandable sections to organize content by category
- **Email popup** — click-to-copy email with distinct toast notifications for each address
- **Smooth scroll navigation** — header nav links scroll to sections with header offset
- **Loading screen** — animated logo bar on first load
- **Scroll progress bar** — header-bound progress indicator

## Tech Stack

| Layer | Details |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom, no frameworks) — modular files per feature |
| Scripting | JavaScript (ES6+), modular JS files |
| Hosting | GitHub Pages |
| Assets | WebP / PNG / JPG images, Google Drive embeds for video |

## Project Structure

```
personal-portfolio/
├── index.html
├── src/
│   ├── css/
│   │   ├── base.css          # Global reset, body, loading screen, toast
│   │   ├── layout.css        # Two-panel layout (fixed sidebar + scrollable content)
│   │   ├── header.css        # Fixed nav, mobile menu
│   │   ├── components.css    # Cards, footer, social buttons, org cards
│   │   ├── timeline.css      # Work/leadership timeline, skill tags
│   │   ├── projects.css      # Projects accordion, carousel, gallery lightbox
│   │   ├── animations.css    # Keyframes and scroll-driven animations
│   │   ├── hero.css          # Hero section
│   │   ├── modals.css        # About me modal, email popup
│   │   └── responsive.css    # Breakpoint overrides (992px, 768px, 480px, landscape)
│   ├── js/
│   │   ├── components.js     # Dynamic component injection, modal/popup interactions
│   │   ├── modals.js         # Gallery lightbox logic, email copy, toast
│   │   ├── cursor.js         # Custom cursor
│   │   └── utils/
│   │       └── smooth-scroll.js
│   ├── script.js             # Entry point — scroll effects, nav state, animations
│   └── components/
│       ├── header.html
│       ├── left-profile.html
│       ├── email-popup.html
│       ├── footer.html
│       └── content-components/
│           ├── about-me.html
│           ├── work-history.html
│           ├── projects.html
│           ├── hackathons.html
│           ├── leadership.html
│           ├── organizations.html
│           └── coursework.html
```

---

© 2026 Elias Assalif. All rights reserved.
