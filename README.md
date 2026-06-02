# 🦊 FOX DASH

A cheerful cartoon-style side-scrolling endless runner built with **Three.js**.

Play as a cute low-poly fox dashing through vibrant landscapes, collecting shiny gold coins while dodging logs, rocks, branches, and puddles. The world gets faster and more challenging as you run farther!

## Features
- **Fully 3D low-poly cartoon models** made from Three.js primitives (no external model files)
  - Expressive running/jumping fox with squash & stretch + leg cycle animations
  - Spinning glowing coins
  - Logs, rocks, hanging branches, reflective puddles
- **Parallax scrolling backgrounds**: sky, clouds, distant mountains, rolling hills, trees, flowers & grass tufts at different speeds
- **Simple but fun physics**: jump with gravity, optional slide (duck) under obstacles
- **Coin collection** with satisfying sparkle particle bursts
- **Increasing difficulty**: world speed ramps up over time + denser obstacle patterns
- **Score**: distance traveled + coins collected
- **Mobile friendly**: tap anywhere to jump, swipe down to slide
- **Pure client-side**, single HTML file for easy deployment

Visual style inspired by bright, flat-color cartoon illustrations (big eyes, saturated greens & oranges, clean shapes).

## Quick Start (Development)

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production / Publishing

The game is **100% static** — no backend required at runtime.

### 1. Build

```bash
npm run build
```

Creates `dist/` with a standalone `index.html`.

### 2. Deploy

Upload `dist/` (or just the index.html) to:
- Netlify / Vercel (drag & drop or git)
- GitHub Pages
- Cloudflare Pages, Surge, Render, S3, etc.

You can even double-click `dist/index.html` directly in your browser.

## Controls
- **Desktop**: SPACE / ↑ / Click or Tap canvas → Jump
- **Desktop**: ↓ (hold) → Slide / Duck
- **Mobile**: Tap screen → Jump | Swipe down → Slide
- **P** : Pause (in game)
- **R** : Restart after game over

## Tech
- Three.js r0.184 (loaded via CDN importmap for zero-build simplicity)
- Tailwind CSS + Font Awesome via CDN
- All 3D models, animations, particles, and game logic in vanilla JS inside one HTML file
- Procedural endless world with object pooling / recycling

## Credits
- Concept & code generated with help from Grok
- Reference art style from runner.jpg (included in repo)

Enjoy the run! 🦊✨
