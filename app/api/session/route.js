import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkPassword, isValidSession, sessionCookie, COOKIE_NAME } from '@/lib/auth';

// GET — check whether the current request already has a valid session.
export async function GET() {
  const authed = isValidSession(cookies());
  return NextResponse.json({ authed });
}

// POST — log in with a password.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const password = body?.password || '';

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: 'No ADMIN_PASSWORD is configured on the server yet.' },
      { status: 500 }
    );
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const { name, value, options } = sessionCookie();
  const res = NextResponse.json({ authed: true });
  res.cookies.set(name, value, options);
  return res;
}

// DELETE — log out.
export async function DELETE() {
  const res = NextResponse.json({ authed: false });
  res.cookies.set(COOKIE_NAME, '', { path: '/', maxAge: 0 });
  return res;
}
