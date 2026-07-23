'use client';

import { useEffect, useState } from 'react';
import ListEditor from '@/components/admin/ListEditor';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { STORY_SECTIONS, ARCHIVABLE_SECTIONS } from '@/lib/sections';

const SECTION_LABEL_META = [
  { key: 'featuredStories', hint: 'Homepage heading + /featured-stories page title' },
  { key: 'athleteProfiles', hint: 'Sidebar + /athlete-profiles page title' },
  { key: 'documentaries', hint: 'Sidebar + /documentaries page title' },
  { key: 'latestWriting', hint: 'Sidebar + /writing page title' },
  { key: 'investigations', hint: 'Sidebar + /investigations page title' },
  { key: 'schoolNewspaper', hint: 'Sidebar + /school-newspaper page title' },
  { key: 'photography', hint: 'Sidebar + /photography page title' },
];

function itemLabel(item) {
  return item.title || item.caption || item.name || 'Untitled';
}

const emptyContent = {
  site: {},
  nav: [],
  sectionLabels: {},
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
  archive: Object.fromEntries(ARCHIVABLE_SECTIONS.map((k) => [k, []])),
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

  // Low-level: PUT a partial content object, tagging the request/response
  // with `savingLabel` so the right button can show its saving/saved state.
  async function persist(savingLabel, partial) {
    setSavingKey(savingLabel);
    setSavedKey(null);
    setSaveError('');
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partial),
    });
    const data = await res.json();
    setSavingKey(null);
    if (!res.ok) {
      setSaveError(data.error || 'Could not save.');
      return;
    }
    setContent({ ...emptyContent, ...data });
    setSavedKey(savingLabel);
    setTimeout(() => setSavedKey(null), 2000);
  }

  // Used by simple single-key sections (site, hero, sectionLabels, about, contact).
  function saveSection(key, value) {
    return persist(key, { [key]: value });
  }

  // Used by the 7 archivable list sections — saves the edited list *and*
  // whatever's currently staged in local archive state together, since
  // removing an item moves it into content.archive locally first.
  function saveListSection(key) {
    return persist(key, { [key]: content[key], archive: content.archive });
  }

  // Moves an item out of a list and into content.archive, locally only —
  // still requires pressing that section's Save button to persist, same
  // as any other edit.
  function archiveItem(key, index) {
    const items = content[key];
    const item = items[index];
    const nextItems = items.filter((_, i) => i !== index);
    const nextArchive = { ...content.archive, [key]: [...(content.archive[key] || []), item] };
    setContent({ ...content, [key]: nextItems, archive: nextArchive });
  }

  // Restore/delete-permanently act immediately (no separate Save step) —
  // they're deliberate, one-off maintenance actions on the archive itself.
  async function restoreItem(key, index) {
    const archived = content.archive[key];
    const item = archived[index];
    const nextArchive = { ...content.archive, [key]: archived.filter((_, i) => i !== index) };
    const nextItems = [...content[key], item];
    setContent({ ...content, [key]: nextItems, archive: nextArchive });
    await persist(`archive-${key}`, { [key]: nextItems, archive: nextArchive });
  }

  async function purgeItem(key, index) {
    const item = content.archive[key][index];
    if (!window.confirm(`Permanently delete "${itemLabel(item)}"? This can't be undone.`)) return;
    const nextArchive = { ...content.archive, [key]: content.archive[key].filter((_, i) => i !== index) };
    setContent({ ...content, archive: nextArchive });
    await persist(`archive-${key}`, { archive: nextArchive });
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

  const totalArchived = ARCHIVABLE_SECTIONS.reduce((n, key) => n + (content.archive[key] || []).length, 0);

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

      <Section title="Category Names">
        <p className="text-soft text-sm mb-4 max-w-2xl">
          Rename how each section is labeled across the site — sidebar, homepage headings, and
          page titles all update together. The stories/items inside each section don't change.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
          {SECTION_LABEL_META.map(({ key, hint }) => (
            <label key={key} className="flex flex-col gap-1 text-sm">
              <span className="kicker text-soft">{key}</span>
              <input
                type="text"
                value={content.sectionLabels[key] || ''}
                onChange={(e) =>
                  setContent({ ...content, sectionLabels: { ...content.sectionLabels, [key]: e.target.value } })
                }
                className="border border-rule px-3 py-2 font-serif focus:outline-none focus:border-ink"
              />
              <span className="text-soft text-xs">{hint}</span>
            </label>
          ))}
        </div>
        <p className="text-soft text-sm mt-4 max-w-2xl">
          About and Contact are renamed from their own sections below (Heading field).
        </p>
        <SaveButton
          saving={savingKey === 'sectionLabels'}
          saved={savedKey === 'sectionLabels'}
          onClick={() => saveSection('sectionLabels', content.sectionLabels)}
        />
      </Section>

      <Section title="Hero / Cover Story">
        <p className="text-soft text-sm mb-4 max-w-2xl">
          The cover story is always pulled from an existing item in one of the sections below —
          its title, description, image, date, and full text come from there, so there's nothing
          to duplicate here. Pick a category, then a specific story.
        </p>
        <div className="flex flex-col gap-3 max-w-2xl">
          <label className="flex flex-col gap-1 text-sm">
            <span className="kicker text-soft">Category</span>
            <select
              value={content.hero.source || ''}
              onChange={(e) => {
                const nextSource = e.target.value;
                const nextItems = content[nextSource] || [];
                setContent({
                  ...content,
                  hero: { ...content.hero, source: nextSource, slug: nextItems[0]?.slug || '' },
                });
              }}
              className="border border-rule px-3 py-2 font-serif focus:outline-none focus:border-ink bg-paper"
            >
              {STORY_SECTIONS.map(({ key }) => (
                <option key={key} value={key}>
                  {content.sectionLabels[key] || key}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="kicker text-soft">Story</span>
            <select
              value={content.hero.slug || ''}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, slug: e.target.value } })}
              className="border border-rule px-3 py-2 font-serif focus:outline-none focus:border-ink bg-paper"
            >
              <option value="" disabled>
                Select a story…
              </option>
              {(content[content.hero.source] || []).map((item) => (
                <option key={item.slug} value={item.slug}>
                  {itemLabel(item)}
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

      <Section title={content.sectionLabels.featuredStories || 'Featured Stories'}>
        <ListEditor
          items={content.featuredStories}
          onChange={(items) => setContent({ ...content, featuredStories: items })}
          onRemove={(i) => archiveItem('featuredStories', i)}
          removeLabel="Archive"
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
          onClick={() => saveListSection('featuredStories')}
        />
      </Section>

      <Section title={content.sectionLabels.athleteProfiles || 'Athlete Profiles'}>
        <ListEditor
          items={content.athleteProfiles}
          onChange={(items) => setContent({ ...content, athleteProfiles: items })}
          onRemove={(i) => archiveItem('athleteProfiles', i)}
          removeLabel="Archive"
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
          onClick={() => saveListSection('athleteProfiles')}
        />
      </Section>

      <Section title={content.sectionLabels.documentaries || 'Documentaries'}>
        <ListEditor
          items={content.documentaries}
          onChange={(items) => setContent({ ...content, documentaries: items })}
          onRemove={(i) => archiveItem('documentaries', i)}
          removeLabel="Archive"
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
          onClick={() => saveListSection('documentaries')}
        />
      </Section>

      <Section title={content.sectionLabels.latestWriting || 'Writing'}>
        <ListEditor
          items={content.latestWriting}
          onChange={(items) => setContent({ ...content, latestWriting: items })}
          onRemove={(i) => archiveItem('latestWriting', i)}
          removeLabel="Archive"
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
          onClick={() => saveListSection('latestWriting')}
        />
      </Section>

      <Section title={content.sectionLabels.investigations || 'Investigations'}>
        <ListEditor
          items={content.investigations}
          onChange={(items) => setContent({ ...content, investigations: items })}
          onRemove={(i) => archiveItem('investigations', i)}
          removeLabel="Archive"
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
          onClick={() => saveListSection('investigations')}
        />
      </Section>

      <Section title={content.sectionLabels.schoolNewspaper || 'School Newspaper'}>
        <ListEditor
          items={content.schoolNewspaper}
          onChange={(items) => setContent({ ...content, schoolNewspaper: items })}
          onRemove={(i) => archiveItem('schoolNewspaper', i)}
          removeLabel="Archive"
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
          onClick={() => saveListSection('schoolNewspaper')}
        />
      </Section>

      <Section title={content.sectionLabels.photography || 'Photography'}>
        <ListEditor
          items={content.photography}
          onChange={(items) => setContent({ ...content, photography: items })}
          onRemove={(i) => archiveItem('photography', i)}
          removeLabel="Archive"
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
          onClick={() => saveListSection('photography')}
        />
      </Section>

      <Section title="About">
        <div className="flex flex-col gap-3 max-w-2xl mb-6">
          <label className="flex flex-col gap-1 text-sm">
            <span className="kicker text-soft">Heading</span>
            <input
              type="text"
              value={content.about.heading || ''}
              onChange={(e) => setContent({ ...content, about: { ...content.about, heading: e.target.value } })}
              className="border border-rule px-3 py-2 font-serif focus:outline-none focus:border-ink"
            />
          </label>
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

      <Section title={`Archive${totalArchived ? ` (${totalArchived})` : ''}`}>
        <p className="text-soft text-sm mb-4 max-w-2xl">
          Items removed from a section above land here instead of disappearing. Restore one back
          into its section, or delete it permanently.
        </p>
        {totalArchived === 0 ? (
          <p className="text-soft text-sm">Nothing archived.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {ARCHIVABLE_SECTIONS.filter((key) => (content.archive[key] || []).length > 0).map((key) => (
              <div key={key}>
                <p className="kicker text-press mb-2">{content.sectionLabels[key] || key}</p>
                <div className="flex flex-col gap-2">
                  {content.archive[key].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-4 border border-rule px-4 py-3"
                    >
                      <span className="font-serif text-ink">{itemLabel(item)}</span>
                      <div className="flex items-center gap-4 shrink-0">
                        <button
                          type="button"
                          onClick={() => restoreItem(key, i)}
                          className="kicker text-press hover:underline"
                        >
                          Restore
                        </button>
                        <button
                          type="button"
                          onClick={() => purgeItem(key, i)}
                          className="kicker text-soft hover:text-press"
                        >
                          Delete permanently
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
