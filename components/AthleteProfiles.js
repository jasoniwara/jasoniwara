import SectionHeading from './SectionHeading';

export default function AthleteProfiles({ items }) {
  const featured = (
    items.some((profile) => profile.featured) ? items.filter((profile) => profile.featured) : items
  ).slice(0, 3);
  return (
    <section className="max-w-content mx-auto px-6 md:px-10 py-16 border-b border-rule">
      <SectionHeading
        eyebrow="Section Two"
        title="Athlete Profiles"
        seeAllHref="/athlete-profiles"
      />
      <div className="grid md:grid-cols-3 gap-10">
        {featured.map((profile, i) => (
          <article key={profile.slug} className={i !== 0 ? 'md:border-l md:border-rule md:pl-10' : ''}>
            <p className="kicker text-soft mb-3">{profile.sport}</p>
            <h3 className="font-serif text-xl text-ink mb-3 leading-snug">{profile.title}</h3>
            <p className={`text-soft text-[0.95rem] leading-relaxed ${i === 0 ? 'drop-cap' : ''}`}>
              {profile.description}
            </p>
            <p className="kicker text-ink mt-4">{profile.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
