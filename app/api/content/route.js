import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isValidSession } from '@/lib/auth';
import { getContent, saveContent } from '@/lib/content';

// GET — return the full merged content (defaults + live overrides).
// Used by the admin page to populate the editor.
export async function GET() {
  if (!isValidSession(cookies())) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }
  const content = await getContent();
  return NextResponse.json(content);
}

// PUT — save one or more sections. Body is a partial content object,
// e.g. { hero: {...} } or { athleteProfiles: [...] }.
export async function PUT(request) {
  if (!isValidSession(cookies())) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  const partial = await request.json().catch(() => null);
  if (!partial || typeof partial !== 'object') {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  try {
    await saveContent(partial);
    const content = await getContent();
    return NextResponse.json(content);
  } catch (err) {
    return NextResponse.json(
      { error: 'Could not save — is the database connected? ' + (err?.message || '') },
      { status: 500 }
    );
  }
}
