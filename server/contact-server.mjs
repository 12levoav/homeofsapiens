import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = Number(process.env.CONTACT_API_PORT || 8787);
const MAX_BODY_BYTES = 1024 * 1024;

loadEnvFile('.env.resend');

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const CONTACT_TO = process.env.CONTACT_TO || 'arakelyankima@gmail.com';
const CONTACT_FROM = process.env.CONTACT_FROM || 'onboarding@resend.dev';

function loadEnvFile(fileName) {
  const absolute = resolve(process.cwd(), fileName);

  if (!existsSync(absolute)) {
    return;
  }

  const raw = readFileSync(absolute, 'utf8');
  const lines = raw.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const equalIndex = trimmed.indexOf('=');
    if (equalIndex < 1) {
      continue;
    }

    const key = trimmed.slice(0, equalIndex).trim();
    const value = trimmed.slice(equalIndex + 1).trim().replace(/^['"]|['"]$/g, '');

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

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
      } catch (error) {
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

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  if (req.method === 'GET' && req.url === '/health') {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method !== 'POST' || req.url !== '/api/contact') {
    sendJson(res, 404, { error: 'Not found' });
    return;
  }

  if (!RESEND_API_KEY) {
    sendJson(res, 500, { error: 'RESEND_API_KEY is missing' });
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
  } catch (error) {
    sendJson(res, 500, { error: error?.message || 'Unable to send message.' });
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Contact API running on http://localhost:${PORT}`);
});
