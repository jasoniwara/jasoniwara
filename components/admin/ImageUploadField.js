'use client';

import { useRef, useState } from 'react';

// Drag-and-drop / click-to-browse image upload. Uploads to /api/upload
// (Vercel Blob) and calls onChange with the resulting URL. Falls back to a
// plain text input for pasting an existing image path/URL by hand.
export default function ImageUploadField({ label, value, onChange }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  async function upload(file) {
    setError('');
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Upload failed.');
        return;
      }
      onChange(data.url);
    } catch {
      setError('Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  }

  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="kicker text-soft">{label}</span>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer border border-dashed px-4 py-6 flex flex-col items-center justify-center gap-2 text-center transition-colors duration-200 ${
          dragging ? 'border-ink bg-panel' : 'border-rule hover:border-ink'
        }`}
      >
        {value ? (
          <img src={value} alt="" className="max-h-32 object-contain" />
        ) : (
          <span className="kicker text-soft">Drag & drop an image, or click to browse</span>
        )}
        {uploading && <span className="kicker text-press">Uploading…</span>}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
            e.target.value = '';
          }}
        />
      </div>

      {error && <p className="text-press text-sm">{error}</p>}

      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="or paste an image URL / /images/filename.jpg"
        className="border border-rule bg-paper px-3 py-2 font-serif text-ink text-sm focus:outline-none focus:border-ink"
      />
    </label>
  );
}
