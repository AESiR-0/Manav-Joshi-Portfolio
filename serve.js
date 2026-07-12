const http = require('http');
const fs = require('fs');
const path = require('path');
const port = parseInt(process.env.PORT, 10) || 4322;

const mime = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.mp4':  'video/mp4',
  '.txt':  'text/plain',
};

const ROOT = path.join(__dirname);

function resolveFile(urlPath) {
  let p = urlPath.split('?')[0];

  // Clean-URL mapping — try exact, then .html, then directory/index.html
  const candidates = [p];
  if (!path.extname(p)) {
    candidates.push(p.replace(/\/$/, '') + '.html');
    candidates.push(p.replace(/\/$/, '') + '/index.html');
  }
  if (p === '/') candidates.unshift('/index.html');

  for (const candidate of candidates) {
    const file = path.join(ROOT, candidate);
    if (file.startsWith(ROOT) && fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  }
  return null;
}

http.createServer((req, res) => {
  const file = resolveFile(req.url);
  if (!file) { res.writeHead(404); res.end('Not found'); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, '0.0.0.0', () => {
  console.log(`Serving on http://localhost:${port}`);
});
