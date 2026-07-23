import Hero from '@/components/Hero';
import FeaturedStories from '@/components/FeaturedStories';
import AthleteProfiles from '@/components/AthleteProfiles';
import Documentaries from '@/components/Documentaries';
import LatestWriting from '@/components/LatestWriting';
import { getContent } from '@/lib/content';
import { resolveCoverStory } from '@/lib/sections';

export default async function HomePage() {
  const content = await getContent();
  const coverStory = resolveCoverStory(content);

  return (
    <>
      {coverStory && <Hero hero={content.hero} story={coverStory} />}
      <FeaturedStories items={content.featuredStories} label={content.sectionLabels.featuredStories} />
      <AthleteProfiles items={content.athleteProfiles} label={content.sectionLabels.athleteProfiles} />
      <Documentaries items={content.documentaries} label={content.sectionLabels.documentaries} />
      <LatestWriting items={content.latestWriting} label={content.sectionLabels.latestWriting} />
    </>
  );
}
