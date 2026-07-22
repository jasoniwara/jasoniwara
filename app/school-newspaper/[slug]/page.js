import { notFound } from 'next/navigation';
import StoryPage from '@/components/StoryPage';
import { getContent } from '@/lib/content';

export async function generateMetadata({ params }) {
  const { schoolNewspaper } = await getContent();
  const clip = schoolNewspaper.find((c) => c.slug === params.slug);
  return { title: clip ? `${clip.title} — jordan reese` : 'School Newspaper — jordan reese' };
}

export default async function SchoolNewspaperStoryPage({ params }) {
  const { schoolNewspaper } = await getContent();
  const clip = schoolNewspaper.find((c) => c.slug === params.slug);
  if (!clip) notFound();

  return (
    <StoryPage
      kicker={clip.publication}
      title={clip.title}
      meta={[clip.date].filter(Boolean)}
      body={clip.body}
      backHref="/school-newspaper"
      backLabel="School Newspaper"
    />
  );
}
