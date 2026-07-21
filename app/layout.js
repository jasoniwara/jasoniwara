import './globals.css';
import SiteChrome from '@/components/SiteChrome';
import { getContent } from '@/lib/content';

// Content can change at any time via /admin, so every page renders fresh
// per request rather than being cached as static HTML at build time.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'jordan reese — sports & human-interest reporting',
  description:
    'Portfolio of sports journalism, athlete profiles, documentaries, and investigative reporting.',
};

export default async function RootLayout({ children }) {
  const content = await getContent();

  return (
    <html lang="en">
      <body>
        <SiteChrome site={content.site} nav={content.nav}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
