// Edge-compatible auth using Web Crypto API (works in both Node.js and Edge runtimes)

export const SESSION_COOKIE = 'zsc_admin_session';
const TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 gün

function getSecret(): string {
  return process.env.ADMIN_PASSWORD ?? 'admin123';
}

async function hmacSign(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function createToken(): Promise<string> {
  const ts = Date.now().toString(16);
  const sig = await hmacSign(ts, getSecret());
  return `${ts}.${sig}`;
}

export async function verifyToken(token: string): Promise<boolean> {
  if (!token) return false;
  const dotIdx = token.indexOf('.');
  if (dotIdx === -1) return false;
  const ts = token.slice(0, dotIdx);
  const sig = token.slice(dotIdx + 1);
  const timestamp = parseInt(ts, 16);
  if (isNaN(timestamp) || Date.now() - timestamp > TOKEN_MAX_AGE) return false;
  const expectedSig = await hmacSign(ts, getSecret());
  return sig === expectedSig;
}

export function validatePassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123';
  return password === adminPassword;
}
