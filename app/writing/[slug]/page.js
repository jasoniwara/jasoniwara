import { notFound } from 'next/navigation';
import StoryPage from '@/components/StoryPage';
import { getContent } from '@/lib/content';

export async function generateMetadata({ params }) {
  const { latestWriting } = await getContent();
  const piece = latestWriting.find((p) => p.slug === params.slug);
  return { title: piece ? `${piece.title} — jordan reese` : 'Writing — jordan reese' };
}

export default async function WritingStoryPage({ params }) {
  const { latestWriting } = await getContent();
  const piece = latestWriting.find((p) => p.slug === params.slug);
  if (!piece) notFound();

  return (
    <StoryPage
      kicker={piece.category}
      title={piece.title}
      meta={[piece.date].filter(Boolean)}
      body={piece.body}
      backHref="/writing"
      backLabel="Writing"
    />
  );
}
