import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, normalize, resolve, sep } from 'node:path';

const MAX_BODY_BYTES = 1024 * 1024;

const PORT = Number(process.env.PORT || process.env.CONTACT_API_PORT || 8787);
const DIST_DIR = resolve(process.cwd(), 'dist');
const INDEX_FILE = resolve(DIST_DIR, 'index.html');
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const CONTACT_TO = process.env.CONTACT_TO || '';
const CONTACT_FROM = process.env.CONTACT_FROM || '';

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp'
};

function sendJson(res, statusCode, payload) {
  const data = JSON.stringify(payload);

  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(data);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function parseJsonBody(req) {
  return new Promise((resolveBody, rejectBody) => {
    const chunks = [];
    let bytes = 0;

    req.on('data', (chunk) => {
      bytes += chunk.length;

      if (bytes > MAX_BODY_BYTES) {
        rejectBody(new Error('Payload too large'));
        req.destroy();
        return;
      }

      chunks.push(chunk);
    });

    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8') || '{}';
        const parsed = JSON.parse(raw);
        resolveBody(parsed);
      } catch {
        rejectBody(new Error('Invalid JSON'));
      }
    });

    req.on('error', rejectBody);
  });
}

async function sendViaResend({ name, email, message }) {
  const subject = `Home of Sapiens inquiry from ${name}`;
  const html = [
    '<h2>New contact request</h2>',
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    `<p><strong>Message:</strong></p>`,
    `<p>${escapeHtml(message).replaceAll('\n', '<br />')}</p>`
  ].join('');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      subject,
      html,
      reply_to: email
    })
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const messageText = typeof body?.message === 'string' ? body.message : 'Resend request failed';
    throw new Error(messageText);
  }

  return body;
}

function sendFile(res, filePath) {
  const extension = extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extension] || 'application/octet-stream';
  const cacheControl =
    extension === '.html' ? 'no-cache' : extension ? 'public, max-age=31536000, immutable' : 'no-cache';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': cacheControl
  });

  createReadStream(filePath).pipe(res);
}

function resolveDistPath(pathname) {
  const normalized = normalize(pathname).replace(/\\/g, '/');
  const target = normalized.startsWith('/') ? normalized : `/${normalized}`;
  const absolute = resolve(DIST_DIR, `.${target}`);
  const distPrefix = `${DIST_DIR}${sep}`;

  if (absolute !== DIST_DIR && !absolute.startsWith(distPrefix)) {
    return null;
  }

  return absolute;
}

function serveFrontend(req, res, pathname) {
  if (!existsSync(INDEX_FILE)) {
    sendJson(res, 503, { error: 'Frontend build not found. Run npm run build first.' });
    return;
  }

  const requestedPath = resolveDistPath(pathname);
  if (!requestedPath) {
    sendJson(res, 400, { error: 'Invalid path' });
    return;
  }

  try {
    if (existsSync(requestedPath) && statSync(requestedPath).isFile()) {
      sendFile(res, requestedPath);
      return;
    }
  } catch {
    sendJson(res, 500, { error: 'Unable to read requested file.' });
    return;
  }

  sendFile(res, INDEX_FILE);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://localhost');
  const pathname = url.pathname;

  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  if (req.method === 'GET' && pathname === '/health') {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === 'POST' && pathname === '/api/contact') {
    if (!RESEND_API_KEY) {
      sendJson(res, 500, { error: 'RESEND_API_KEY is missing' });
      return;
    }
    if (!CONTACT_TO) {
      sendJson(res, 500, { error: 'CONTACT_TO is missing' });
      return;
    }
    if (!CONTACT_FROM) {
      sendJson(res, 500, { error: 'CONTACT_FROM is missing' });
      return;
    }

    try {
      const payload = await parseJsonBody(req);
      const name = String(payload?.name || '').trim().slice(0, 120);
      const email = String(payload?.email || '').trim().slice(0, 180);
      const message = String(payload?.message || '').trim().slice(0, 5000);
      const website = String(payload?.website || '').trim();

      if (website) {
        sendJson(res, 200, { ok: true });
        return;
      }

      if (!name || !email || !message) {
        sendJson(res, 400, { error: 'Name, email, and message are required.' });
        return;
      }

      if (!isValidEmail(email)) {
        sendJson(res, 400, { error: 'Please provide a valid email.' });
        return;
      }

      const result = await sendViaResend({ name, email, message });
      sendJson(res, 200, { ok: true, id: result?.id || null });
      return;
    } catch (error) {
      sendJson(res, 500, { error: error?.message || 'Unable to send message.' });
      return;
    }
  }

  if (req.method === 'GET' || req.method === 'HEAD') {
    serveFrontend(req, res, pathname);
    return;
  }

  sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`Home of Sapiens web server running on port ${PORT}`);
});
