import ProjectCard from './ProjectCard';
import SectionHeading from './SectionHeading';

export default function Documentaries({ items, label = 'Mini Documentaries' }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="max-w-content mx-auto px-6 md:px-10 py-16 border-b border-rule">
      <SectionHeading
        eyebrow="Section Three"
        title={label}
        seeAllHref="/documentaries"
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(items.some((doc) => doc.featured) ? items.filter((doc) => doc.featured) : items)
          .slice(0, 3)
          .map((doc) => (
            <ProjectCard key={doc.slug} {...doc} />
          ))}
      </div>
    </section>
  );
}
