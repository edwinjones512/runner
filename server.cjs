const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function serveStatic(req, res) {
  let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);

  // Prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end('Server Error');
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  // Lightweight status endpoint (works even without local node_modules)
  if (req.url === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    let threeVersion = '0.184.0 (CDN)';
    try {
      threeVersion = require('./node_modules/three/package.json').version + ' (local)';
    } catch (_) {}

    return res.end(JSON.stringify({
      status: 'ok',
      threeVersion,
      uptime: process.uptime(),
      mode: process.env.NODE_ENV || 'development',
      game: 'Fox Dash'
    }));
  }

  // Everything else → static files from /public
  serveStatic(req, res);
});

server.listen(PORT, () => {
  const isProd = process.env.NODE_ENV === 'production';
  console.log(`\n🦊 FOX DASH ${isProd ? 'production' : 'development'} server`);
  console.log(`   Local:   http://localhost:${PORT}/`);
  console.log(`   Status:  http://localhost:${PORT}/api/status`);
  if (!isProd) {
    console.log('\n   (For production use the static dist/ folder instead — no server needed)');
  }
  console.log('   Press Ctrl+C to stop\n');
});
