import Hero from '@/components/Hero';
import FeaturedStories from '@/components/FeaturedStories';
import AthleteProfiles from '@/components/AthleteProfiles';
import Documentaries from '@/components/Documentaries';
import LatestWriting from '@/components/LatestWriting';
import { getContent } from '@/lib/content';

export default async function HomePage() {
  const content = await getContent();
  const coverStory =
    content.featuredStories.find((s) => s.slug === content.hero.slug) || content.featuredStories[0];

  return (
    <>
      {coverStory && <Hero hero={content.hero} story={coverStory} />}
      <FeaturedStories items={content.featuredStories} />
      <AthleteProfiles items={content.athleteProfiles} />
      <Documentaries items={content.documentaries} />
      <LatestWriting items={content.latestWriting} />
    </>
  );
}
