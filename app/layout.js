import './globals.css';
import SiteChrome from '@/components/SiteChrome';
import { getContent } from '@/lib/content';

// Content can change at any time via /admin, so every page renders fresh
// per request rather than being cached as static HTML at build time.
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const { site } = await getContent();
  return {
    title: `${site.name} — ${site.tagline}`,
    description:
      'Portfolio of sports journalism, athlete profiles, documentaries, and investigative reporting.',
  };
}

function resolveNavLabel(item, content) {
  if (item.key === 'about') return content.about.heading || item.label;
  if (item.key === 'contact') return content.contact.heading || item.label;
  return content.sectionLabels[item.key] || item.label;
}

export default async function RootLayout({ children }) {
  const content = await getContent();
  const nav = content.nav.map((item) => ({ ...item, label: resolveNavLabel(item, content) }));

  return (
    <html lang="en">
      <body>
        <SiteChrome site={content.site} nav={nav}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
