import PageIntro from '@/components/PageIntro';
import ArticleCard from '@/components/ArticleCard';
import { getContent } from '@/lib/content';

export async function generateMetadata() {
  const { site, sectionLabels } = await getContent();
  return { title: `${sectionLabels.featuredStories} — ${site.name}` };
}

export default async function FeaturedStoriesPage() {
  const { featuredStories, sectionLabels } = await getContent();
  return (
    <>
      <PageIntro
        kicker="Section One"
        title={sectionLabels.featuredStories}
        description="The major reporting and human-interest work I'm most proud of, in one place."
      />
      <section className="max-w-content mx-auto px-6 md:px-10 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStories.map((story) => (
            <ArticleCard key={story.slug} {...story} />
          ))}
        </div>
      </section>
    </>
  );
}
