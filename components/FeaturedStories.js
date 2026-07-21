import ArticleCard from './ArticleCard';
import SectionHeading from './SectionHeading';

export default function FeaturedStories({ items }) {
  return (
    <section className="max-w-content mx-auto px-6 md:px-10 py-16 border-b border-rule">
      <SectionHeading
        eyebrow="Section One"
        title="Featured Stories"
        seeAllHref="/featured-stories"
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.slice(0, 3).map((story) => (
          <ArticleCard key={story.slug} {...story} />
        ))}
      </div>
    </section>
  );
}
