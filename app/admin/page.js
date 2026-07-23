'use client';

import { useEffect, useState } from 'react';
import ListEditor from '@/components/admin/ListEditor';
import ImageUploadField from '@/components/admin/ImageUploadField';

const emptyContent = {
  site: {},
  hero: {},
  featuredStories: [],
  athleteProfiles: [],
  documentaries: [],
  latestWriting: [],
  investigations: [],
  schoolNewspaper: [],
  photography: [],
  about: { paragraphs: [], facts: [] },
  contact: {},
};

function Section({ title, children }) {
  return (
    <section className="border-t border-ink pt-6 mb-14">
      <h2 className="font-serif text-2xl text-ink mb-6">{title}</h2>
      {children}
    </section>
  );
}

function SaveButton({ saving, saved, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={saving}
      className="mt-5 kicker px-4 py-2 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors duration-200 disabled:opacity-50"
    >
      {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save section'}
    </button>
  );
}

export default function AdminPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [content, setContent] = useState(emptyContent);
  const [loadingContent, setLoadingContent] = useState(false);
  const [savingKey, setSavingKey] = useState(null);
  const [savedKey, setSavedKey] = useState(null);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    fetch('/api/session')
      .then((r) => r.json())
      .then((data) => {
        setAuthed(!!data.authed);
        setAuthChecked(true);
        if (data.authed) loadContent();
      })
      .catch(() => setAuthChecked(true));
  }, []);

  function loadContent() {
    setLoadingContent(true);
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setContent({ ...emptyContent, ...data });
      })
      .finally(() => setLoadingContent(false));
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    const res = await fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setLoginError(data.error || 'Could not log in.');
      return;
    }
    setAuthed(true);
    loadContent();
  }

  async function handleLogout() {
    await fetch('/api/session', { method: 'DELETE' });
    setAuthed(false);
  }

  async function saveSection(key, value) {
    setSavingKey(key);
    setSavedKey(null);
    setSaveError('');
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [key]: value }),
    });
    const data = await res.json();
    setSavingKey(null);
    if (!res.ok) {
      setSaveError(data.error || 'Could not save.');
      return;
    }
    setContent({ ...emptyContent, ...data });
    setSavedKey(key);
    setTimeout(() => setSavedKey(null), 2000);
  }

  if (!authChecked) {
    return <div className="max-w-content mx-auto px-6 py-24 text-soft kicker">Checking session…</div>;
  }

  if (!authed) {
    return (
      <div className="max-w-content mx-auto px-6 py-24">
        <div className="max-w-sm mx-auto border border-rule p-8">
          <p className="kicker text-press mb-2">Admin</p>
          <h1 className="font-serif text-2xl text-ink mb-6">Sign in to edit</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border border-rule px-3 py-2 font-serif focus:outline-none focus:border-ink"
              autoFocus
            />
            {loginError && <p className="text-press text-sm">{loginError}</p>}
            <button
              type="submit"
              className="kicker px-4 py-2 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors duration-200"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <div className="flex items-baseline justify-between mb-10 border-b border-ink pb-4">
        <div>
          <p className="kicker text-press mb-2">Admin</p>
          <h1 className="font-serif text-3xl text-ink">Edit site content</h1>
        </div>
        <button onClick={handleLogout} className="kicker text-soft hover:text-press">
          Log out
        </button>
      </div>

      {loadingContent && <p className="kicker text-soft mb-8">Loading current content…</p>}
      {saveError && <p className="text-press mb-8">{saveError}</p>}

      <Section title="Masthead">
        <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
          {['name', 'tagline', 'dateline', 'established', 'email'].map((key) => (
            <label key={key} className="flex flex-col gap-1 text-sm">
              <span className="kicker text-soft">{key}</span>
              <input
                type="text"
                value={content.site[key] || ''}
                onChange={(e) => setContent({ ...content, site: { ...content.site, [key]: e.target.value } })}
                className="border border-rule px-3 py-2 font-serif focus:outline-none focus:border-ink"
              />
            </label>
          ))}
        </div>
        <SaveButton
          saving={savingKey === 'site'}
          saved={savedKey === 'site'}
          onClick={() => saveSection('site', content.site)}
        />
      </Section>

      <Section title="Hero / Cover Story">
        <p className="text-soft text-sm mb-4 max-w-2xl">
          The cover story is always one of your Featured Stories below — its title, description,
          image, date, and full text come from there, so there's nothing to duplicate here. Pick
          which one to feature and set the kicker/read time.
        </p>
        <div className="flex flex-col gap-3 max-w-2xl">
          <label className="flex flex-col gap-1 text-sm">
            <span className="kicker text-soft">Featured story</span>
            <select
              value={content.hero.slug || ''}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, slug: e.target.value } })}
              className="border border-rule px-3 py-2 font-serif focus:outline-none focus:border-ink bg-paper"
            >
              <option value="" disabled>
                Select a story…
              </option>
              {content.featuredStories.map((story) => (
                <option key={story.slug} value={story.slug}>
                  {story.title}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="kicker text-soft">Kicker</span>
            <input
              type="text"
              value={content.hero.kicker || ''}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, kicker: e.target.value } })}
              className="border border-rule px-3 py-2 font-serif focus:outline-none focus:border-ink"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="kicker text-soft">Read time</span>
            <input
              type="text"
              value={content.hero.readTime || ''}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, readTime: e.target.value } })}
              className="border border-rule px-3 py-2 font-serif focus:outline-none focus:border-ink"
            />
          </label>
        </div>
        <SaveButton
          saving={savingKey === 'hero'}
          saved={savedKey === 'hero'}
          onClick={() => saveSection('hero', content.hero)}
        />
      </Section>

      <Section title="Featured Stories">
        <ListEditor
          items={content.featuredStories}
          onChange={(items) => setContent({ ...content, featuredStories: items })}
          addLabel="Add story"
          fields={[
            { key: 'title', label: 'Title' },
            { key: 'category', label: 'Category' },
            { key: 'date', label: 'Date' },
            { key: 'description', label: 'Description', textarea: true, wide: true },
            { key: 'image', label: 'Image', image: true, wide: true },
            { key: 'body', label: 'Full story (blank line between paragraphs)', paragraphs: true, wide: true },
            { key: 'featured', label: 'Featured on homepage', checkbox: true },
          ]}
        />
        <SaveButton
          saving={savingKey === 'featuredStories'}
          saved={savedKey === 'featuredStories'}
          onClick={() => saveSection('featuredStories', content.featuredStories)}
        />
      </Section>

      <Section title="Athlete Profiles">
        <ListEditor
          items={content.athleteProfiles}
          onChange={(items) => setContent({ ...content, athleteProfiles: items })}
          addLabel="Add profile"
          fields={[
            { key: 'name', label: 'Athlete name' },
            { key: 'sport', label: 'Sport' },
            { key: 'title', label: 'Story title' },
            { key: 'description', label: 'Description', textarea: true, wide: true },
            { key: 'body', label: 'Full story (blank line between paragraphs)', paragraphs: true, wide: true },
            { key: 'featured', label: 'Featured on homepage', checkbox: true },
          ]}
        />
        <SaveButton
          saving={savingKey === 'athleteProfiles'}
          saved={savedKey === 'athleteProfiles'}
          onClick={() => saveSection('athleteProfiles', content.athleteProfiles)}
        />
      </Section>

      <Section title="Documentaries">
        <ListEditor
          items={content.documentaries}
          onChange={(items) => setContent({ ...content, documentaries: items })}
          addLabel="Add documentary"
          fields={[
            { key: 'title', label: 'Title' },
            { key: 'duration', label: 'Duration (mm:ss)' },
            { key: 'description', label: 'Description', textarea: true, wide: true },
            { key: 'videoUrl', label: 'YouTube / Vimeo URL', wide: true },
            { key: 'body', label: 'Full write-up (blank line between paragraphs)', paragraphs: true, wide: true },
            { key: 'featured', label: 'Featured on homepage', checkbox: true },
          ]}
        />
        <SaveButton
          saving={savingKey === 'documentaries'}
          saved={savedKey === 'documentaries'}
          onClick={() => saveSection('documentaries', content.documentaries)}
        />
      </Section>

      <Section title="Writing">
        <ListEditor
          items={content.latestWriting}
          onChange={(items) => setContent({ ...content, latestWriting: items })}
          addLabel="Add piece"
          fields={[
            { key: 'title', label: 'Title' },
            { key: 'category', label: 'Category' },
            { key: 'date', label: 'Date' },
            { key: 'body', label: 'Full story (blank line between paragraphs)', paragraphs: true, wide: true },
          ]}
        />
        <SaveButton
          saving={savingKey === 'latestWriting'}
          saved={savedKey === 'latestWriting'}
          onClick={() => saveSection('latestWriting', content.latestWriting)}
        />
      </Section>

      <Section title="Investigations">
        <ListEditor
          items={content.investigations}
          onChange={(items) => setContent({ ...content, investigations: items })}
          addLabel="Add investigation"
          fields={[
            { key: 'title', label: 'Title' },
            { key: 'date', label: 'Date' },
            { key: 'description', label: 'Description', textarea: true, wide: true },
            { key: 'body', label: 'Full story (blank line between paragraphs)', paragraphs: true, wide: true },
          ]}
        />
        <SaveButton
          saving={savingKey === 'investigations'}
          saved={savedKey === 'investigations'}
          onClick={() => saveSection('investigations', content.investigations)}
        />
      </Section>

      <Section title="School Newspaper">
        <ListEditor
          items={content.schoolNewspaper}
          onChange={(items) => setContent({ ...content, schoolNewspaper: items })}
          addLabel="Add clip"
          fields={[
            { key: 'title', label: 'Title' },
            { key: 'publication', label: 'Publication' },
            { key: 'date', label: 'Date' },
            { key: 'description', label: 'Description', textarea: true, wide: true },
            { key: 'body', label: 'Full story (blank line between paragraphs)', paragraphs: true, wide: true },
          ]}
        />
        <SaveButton
          saving={savingKey === 'schoolNewspaper'}
          saved={savedKey === 'schoolNewspaper'}
          onClick={() => saveSection('schoolNewspaper', content.schoolNewspaper)}
        />
      </Section>

      <Section title="Photography">
        <ListEditor
          items={content.photography}
          onChange={(items) => setContent({ ...content, photography: items })}
          addLabel="Add photo caption"
          fields={[
            { key: 'caption', label: 'Caption' },
            { key: 'category', label: 'Category' },
            { key: 'image', label: 'Image', image: true, wide: true },
          ]}
        />
        <SaveButton
          saving={savingKey === 'photography'}
          saved={savedKey === 'photography'}
          onClick={() => saveSection('photography', content.photography)}
        />
      </Section>

      <Section title="About">
        <div className="flex flex-col gap-3 max-w-2xl mb-6">
          <label className="flex flex-col gap-1 text-sm">
            <span className="kicker text-soft">Photo caption</span>
            <input
              type="text"
              value={content.about.photoCaption || ''}
              onChange={(e) => setContent({ ...content, about: { ...content.about, photoCaption: e.target.value } })}
              className="border border-rule px-3 py-2 font-serif focus:outline-none focus:border-ink"
            />
          </label>
          <ImageUploadField
            label="Photo"
            value={content.about.photo}
            onChange={(url) => setContent({ ...content, about: { ...content.about, photo: url } })}
          />
        </div>
        <p className="kicker text-soft mb-2">Bio paragraphs</p>
        <div className="flex flex-col gap-3 mb-6">
          {(content.about.paragraphs || []).map((p, i) => (
            <div key={i} className="flex gap-2 items-start">
              <textarea
                value={p}
                onChange={(e) => {
                  const next = content.about.paragraphs.slice();
                  next[i] = e.target.value;
                  setContent({ ...content, about: { ...content.about, paragraphs: next } });
                }}
                rows={3}
                className="flex-1 border border-rule px-3 py-2 font-serif focus:outline-none focus:border-ink"
              />
              <button
                type="button"
                onClick={() => {
                  const next = content.about.paragraphs.filter((_, idx) => idx !== i);
                  setContent({ ...content, about: { ...content.about, paragraphs: next } });
                }}
                className="text-soft hover:text-press text-sm mt-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setContent({ ...content, about: { ...content.about, paragraphs: [...(content.about.paragraphs || []), ''] } })
            }
            className="self-start kicker text-press hover:underline"
          >
            + Add paragraph
          </button>
        </div>
        <p className="kicker text-soft mb-2">Facts (label / value)</p>
        <ListEditor
          items={content.about.facts || []}
          onChange={(items) => setContent({ ...content, about: { ...content.about, facts: items } })}
          addLabel="Add fact"
          fields={[
            { key: 'label', label: 'Label' },
            { key: 'value', label: 'Value' },
          ]}
        />
        <SaveButton
          saving={savingKey === 'about'}
          saved={savedKey === 'about'}
          onClick={() => saveSection('about', content.about)}
        />
      </Section>

      <Section title="Contact">
        <div className="flex flex-col gap-3 max-w-2xl">
          <label className="flex flex-col gap-1 text-sm">
            <span className="kicker text-soft">Heading</span>
            <input
              type="text"
              value={content.contact.heading || ''}
              onChange={(e) => setContent({ ...content, contact: { ...content.contact, heading: e.target.value } })}
              className="border border-rule px-3 py-2 font-serif focus:outline-none focus:border-ink"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="kicker text-soft">Intro</span>
            <textarea
              value={content.contact.intro || ''}
              onChange={(e) => setContent({ ...content, contact: { ...content.contact, intro: e.target.value } })}
              rows={2}
              className="border border-rule px-3 py-2 font-serif focus:outline-none focus:border-ink"
            />
          </label>
        </div>
        <SaveButton
          saving={savingKey === 'contact'}
          saved={savedKey === 'contact'}
          onClick={() => saveSection('contact', content.contact)}
        />
      </Section>
    </div>
  );
}
