import crypto from 'crypto';

const COOKIE_NAME = 'admin_session';

function expectedToken() {
  const password = process.env.ADMIN_PASSWORD || '';
  return crypto.createHash('sha256').update(`admin-session:${password}`).digest('hex');
}

export function checkPassword(password) {
  const configured = process.env.ADMIN_PASSWORD || '';
  if (!configured) return false; // refuse to "pass" if no password is configured
  return password === configured;
}

export function sessionCookie() {
  return {
    name: COOKIE_NAME,
    value: expectedToken(),
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  };
}

export function isValidSession(cookieStore) {
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie) return false;
  return cookie.value === expectedToken();
}

export { COOKIE_NAME };
