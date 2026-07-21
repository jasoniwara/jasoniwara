import Link from 'next/link';

export default function SectionHeading({ eyebrow, title, seeAllHref, seeAllLabel = 'See all' }) {
  return (
    <div className="flex items-end justify-between border-b border-ink pb-3 mb-8">
      <div>
        {eyebrow && <p className="kicker text-press mb-2">{eyebrow}</p>}
        <h2 className="font-serif text-2xl md:text-3xl text-ink">{title}</h2>
      </div>
      {seeAllHref && (
        <Link
          href={seeAllHref}
          className="kicker text-soft hover:text-press transition-colors duration-200 whitespace-nowrap pl-4"
        >
          {seeAllLabel} &rarr;
        </Link>
      )}
    </div>
  );
}
