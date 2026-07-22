import StoryPage from '@/components/StoryPage';
import { getContent } from '@/lib/content';

export async function generateMetadata() {
  const { hero } = await getContent();
  return { title: `${hero.headline} — jordan reese` };
}

export default async function CoverStoryPage() {
  const { hero } = await getContent();

  return (
    <StoryPage
      kicker={hero.kicker}
      title={hero.headline}
      meta={[hero.date, hero.readTime].filter(Boolean)}
      image={hero.image}
      body={hero.body}
      backHref="/"
      backLabel="Home"
    />
  );
}
