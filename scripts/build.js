#!/usr/bin/env node
/**
 * Production build script for FOX DASH
 * Creates a clean, self-contained dist/ folder with the static game.
 *
 * The output (dist/index.html) is 100% static:
 * - Uses CDN for Three.js (via importmap)
 * - Uses CDN for Tailwind + Font Awesome
 * - No server or build step required at runtime
 * - Can be opened directly or deployed to any static host (Netlify, Vercel, GitHub Pages, etc.)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SOURCE = path.join(ROOT, 'public', 'index.html');

console.log('\n🚀 Building production distribution for FOX DASH...\n');

// Ensure dist exists
if (!fs.existsSync(DIST)) {
  fs.mkdirSync(DIST, { recursive: true });
}

// Copy the single production HTML file
fs.copyFileSync(SOURCE, path.join(DIST, 'index.html'));

// Copy assets (images, etc.) if they exist
const assetsDir = path.join(ROOT, 'public', 'images');
const distAssetsDir = path.join(DIST, 'images');
if (fs.existsSync(assetsDir)) {
  if (!fs.existsSync(distAssetsDir)) {
    fs.mkdirSync(distAssetsDir, { recursive: true });
  }
  const files = fs.readdirSync(assetsDir);
  files.forEach(file => {
    fs.copyFileSync(
      path.join(assetsDir, file),
      path.join(distAssetsDir, file)
    );
  });
}

// Optional: create a simple _redirects for SPA-friendly hosts
const redirects = path.join(DIST, '_redirects');
if (!fs.existsSync(redirects)) {
  fs.writeFileSync(redirects, '/*    /index.html   200\n');
}

// Create a small deployment info file
const deployInfo = `FOX DASH — Production Build
=======================================

Generated: ${new Date().toISOString()}

This is a fully static production build.

📦 Files:
  - dist/index.html   ← The complete game (single file)

🚀 Deployment options (any of these work):

  1. Netlify / Vercel (recommended)
     - Drag & drop the dist/ folder, or connect this repo
     - Set publish directory to "dist"

  2. GitHub Pages
     - Push dist/index.html as the root or use a gh-pages branch

  3. Any static host (Cloudflare Pages, Surge, Render, S3 + CloudFront, etc.)

  4. Local preview
     npx serve dist -p 4173
     # or
     npm run preview

  5. Just open dist/index.html directly in any modern browser

Notes:
- Three.js is loaded from CDN (unpkg) via importmap — no bundler needed.
- Tailwind CSS + Font Awesome loaded from CDN.
- Fully client-side. No backend required.
- Cute low-poly fox, coins, obstacles, parallax backgrounds all made with Three.js primitives.
`;

fs.writeFileSync(path.join(DIST, 'DEPLOY.txt'), deployInfo);

console.log('✅ Production build complete!');
console.log(`   Output: ${path.relative(ROOT, DIST)}/`);
console.log(`   - dist/index.html (standalone, ~${(fs.statSync(path.join(DIST, 'index.html')).size / 1024).toFixed(1)} KB)`);
console.log('\n📤 Ready to publish:');
console.log('   • Upload the entire dist/ folder to any static host');
console.log('   • Or run: npm run preview   (to test locally)\n');
