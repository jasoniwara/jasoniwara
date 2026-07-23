// Registry of story sections that can supply the homepage cover story and
// have their own detail pages. Photography has no per-item detail page, so
// it's deliberately excluded here (it still participates in the archive).
export const STORY_SECTIONS = [
  { key: 'featuredStories', basePath: '/featured-stories' },
  { key: 'athleteProfiles', basePath: '/athlete-profiles' },
  { key: 'documentaries', basePath: '/documentaries' },
  { key: 'latestWriting', basePath: '/writing' },
  { key: 'investigations', basePath: '/investigations' },
  { key: 'schoolNewspaper', basePath: '/school-newspaper' },
];

// All sections whose items can be removed-to-archive (and restored/purged)
// from /admin.
export const ARCHIVABLE_SECTIONS = [...STORY_SECTIONS.map((s) => s.key), 'photography'];

export function resolveCoverStory(content) {
  const section = STORY_SECTIONS.find((s) => s.key === content.hero.source);
  const items = section ? content[section.key] : content.featuredStories;
  const item = (items || []).find((i) => i.slug === content.hero.slug) || content.featuredStories[0];
  if (!item) return null;

  const basePath = (section || STORY_SECTIONS[0]).basePath;
  return {
    title: item.title,
    description: item.description || '',
    date: item.date || '',
    image: item.image || null,
    href: `${basePath}/${item.slug}`,
  };
}
