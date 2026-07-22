import { notFound } from 'next/navigation';
import StoryPage from '@/components/StoryPage';
import { getContent } from '@/lib/content';

export async function generateMetadata({ params }) {
  const { featuredStories } = await getContent();
  const story = featuredStories.find((s) => s.slug === params.slug);
  return { title: story ? `${story.title} — jordan reese` : 'Featured Stories — jordan reese' };
}

export default async function FeaturedStoryPage({ params }) {
  const { featuredStories } = await getContent();
  const story = featuredStories.find((s) => s.slug === params.slug);
  if (!story) notFound();

  return (
    <StoryPage
      kicker={story.category}
      title={story.title}
      meta={[story.date].filter(Boolean)}
      image={story.image}
      body={story.body}
      backHref="/featured-stories"
      backLabel="Featured Stories"
    />
  );
}
