import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { put } from '@vercel/blob';
import { isValidSession } from '@/lib/auth';

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// POST — upload an image file to Vercel Blob storage. Used by
// components/admin/ImageUploadField.js for drag-and-drop / file-picker uploads.
export async function POST(request) {
  if (!isValidSession(cookies())) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'No image storage is connected yet. Set BLOB_READ_WRITE_TOKEN (Vercel Blob).' },
      { status: 500 }
    );
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Unsupported file type. Use JPEG, PNG, WEBP, or GIF.' }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File is too large (8MB max).' }, { status: 400 });
  }

  try {
    const blob = await put(`images/${file.name}`, file, {
      access: 'public',
      addRandomSuffix: true,
    });
    return NextResponse.json({ url: blob.url });
  } catch (err) {
    return NextResponse.json({ error: 'Upload failed. ' + (err?.message || '') }, { status: 500 });
  }
}
