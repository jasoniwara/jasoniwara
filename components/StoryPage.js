import Link from 'next/link';

// Shared full-story layout used by /featured-stories/[slug], /writing/[slug],
// /investigations/[slug], /school-newspaper/[slug], and /cover-story.
export default function StoryPage({ kicker, title, meta, image, body, backHref, backLabel }) {
  return (
    <article className="max-w-content mx-auto px-6 md:px-10 py-16">
      <Link href={backHref} className="kicker text-soft hover:text-press transition-colors duration-200">
        &larr; {backLabel}
      </Link>

      <div className="max-w-2xl mt-6">
        {kicker && <p className="kicker text-press mb-4">{kicker}</p>}
        <h1 className="font-serif text-3xl sm:text-4xl text-ink leading-[1.1] mb-4">{title}</h1>
        {meta.length > 0 && (
          <div className="flex items-center gap-4 kicker text-soft mb-10">
            {meta.map((m, i) => (
              <span key={i} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden="true">&mdash;</span>}
                {m}
              </span>
            ))}
          </div>
        )}
      </div>

      {image && (
        <div className="aspect-[16/9] max-w-3xl bg-panel border border-rule overflow-hidden mb-10">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex flex-col gap-5 max-w-2xl">
        {(body && body.length > 0 ? body : ['This story has no text yet.']).map((p, i) => (
          <p key={i} className={`text-soft text-lg leading-relaxed ${i === 0 ? 'drop-cap' : ''}`}>
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
