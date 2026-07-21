import { Redis } from '@upstash/redis';
import * as defaults from '@/data/content';

// Configured via UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
// (Vercel's Upstash integration sets these automatically once connected).
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

// All live edits are stored under this single key as one JSON object.
const KEY = 'site-content-v1';

export function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'item';
}

function withUniqueSlugs(items) {
  const seen = new Map();
  return items.map((item) => {
    let base = item.slug ? slugify(item.slug) : slugify(item.title || item.name || item.caption);
    let slug = base;
    let n = 2;
    while (seen.has(slug)) {
      slug = `${base}-${n++}`;
    }
    seen.set(slug, true);
    return { ...item, slug };
  });
}

// Reads live overrides from KV (if configured) and layers them over the
// defaults from data/content.js. If KV isn't reachable (e.g. local dev
// without env vars pulled), this quietly falls back to defaults only.
export async function getContent() {
  let overrides = {};
  if (redis) {
    try {
      overrides = (await redis.get(KEY)) || {};
    } catch (err) {
      overrides = {};
    }
  }

  return {
    site: { ...defaults.site, ...overrides.site },
    nav: defaults.nav,
    hero: { ...defaults.hero, ...overrides.hero },
    featuredStories: overrides.featuredStories || defaults.featuredStories,
    athleteProfiles: overrides.athleteProfiles || defaults.athleteProfiles,
    documentaries: overrides.documentaries || defaults.documentaries,
    latestWriting: overrides.latestWriting || defaults.latestWriting,
    investigations: overrides.investigations || defaults.investigations,
    schoolNewspaper: overrides.schoolNewspaper || defaults.schoolNewspaper,
    photography: overrides.photography || defaults.photography,
    about: { ...defaults.about, ...overrides.about },
    contact: { ...defaults.contact, ...overrides.contact },
  };
}

// Saves a partial update (one or more top-level sections) into KV, merged
// on top of whatever is already stored there.
export async function saveContent(partial) {
  if (!redis) {
    throw new Error(
      'No database is connected yet. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.'
    );
  }
  const current = (await redis.get(KEY)) || {};
  const updated = { ...current };

  for (const [key, value] of Object.entries(partial)) {
    if (Array.isArray(value)) {
      updated[key] = withUniqueSlugs(value);
    } else if (value && typeof value === 'object') {
      updated[key] = { ...(current[key] || {}), ...value };
    } else {
      updated[key] = value;
    }
  }

  await redis.set(KEY, updated);
  return updated;
}
