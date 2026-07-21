import SectionHeading from './SectionHeading';

export default function LatestWriting({ items }) {
  return (
    <section className="max-w-content mx-auto px-6 md:px-10 py-16">
      <SectionHeading
        eyebrow="Section Four"
        title="Latest Writing"
        seeAllHref="/writing"
      />
      <ul>
        {items.slice(0, 4).map((piece) => (
          <li key={piece.slug} className="border-b border-rule">
            <a
              href="#"
              className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-5"
            >
              <span className="kicker text-soft sm:w-32 shrink-0">{piece.date}</span>
              <span className="font-serif text-lg text-ink group-hover:text-press transition-colors duration-200 flex-1">
                {piece.title}
              </span>
              <span className="kicker text-press shrink-0">{piece.category}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
