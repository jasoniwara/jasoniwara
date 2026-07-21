import Hero from '@/components/Hero';
import FeaturedStories from '@/components/FeaturedStories';
import AthleteProfiles from '@/components/AthleteProfiles';
import Documentaries from '@/components/Documentaries';
import LatestWriting from '@/components/LatestWriting';
import { getContent } from '@/lib/content';

export default async function HomePage() {
  const content = await getContent();

  return (
    <>
      <Hero hero={content.hero} />
      <FeaturedStories items={content.featuredStories} />
      <AthleteProfiles items={content.athleteProfiles} />
      <Documentaries items={content.documentaries} />
      <LatestWriting items={content.latestWriting} />
    </>
  );
}
