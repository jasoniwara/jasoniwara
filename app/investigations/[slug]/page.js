import { notFound } from 'next/navigation';
import StoryPage from '@/components/StoryPage';
import { getContent } from '@/lib/content';

export async function generateMetadata({ params }) {
  const { investigations } = await getContent();
  const piece = investigations.find((p) => p.slug === params.slug);
  return { title: piece ? `${piece.title} — jordan reese` : 'Investigations — jordan reese' };
}

export default async function InvestigationStoryPage({ params }) {
  const { investigations } = await getContent();
  const piece = investigations.find((p) => p.slug === params.slug);
  if (!piece) notFound();

  return (
    <StoryPage
      kicker="Investigation"
      title={piece.title}
      meta={[piece.date].filter(Boolean)}
      body={piece.body}
      backHref="/investigations"
      backLabel="Investigations"
    />
  );
}
