import Link from 'next/link';

export default function Hero({ hero, story }) {
  const href = `/featured-stories/${story.slug}`;

  return (
    <section className="max-w-content mx-auto px-6 md:px-10 pt-16">
      <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-stretch border-b border-rule pb-14">
        <div className="flex flex-col justify-center order-2 md:order-1">
          <p className="kicker text-press mb-4">{hero.kicker}</p>
          <Link href={href} className="group">
            <h1 className="font-serif text-4xl sm:text-5xl leading-[1.08] text-ink mb-6 group-hover:text-press transition-colors duration-200">
              {story.title}
            </h1>
          </Link>
          <p className="text-soft text-lg leading-relaxed mb-8 max-w-md">
            {story.description}
          </p>
          <div className="flex items-center gap-4 kicker text-soft">
            <span>{story.date}</span>
            {hero.readTime && (
              <>
                <span aria-hidden="true">&mdash;</span>
                <span>{hero.readTime}</span>
              </>
            )}
            <span aria-hidden="true">&mdash;</span>
            <Link href={href} className="text-press hover:underline">
              Read the full story
            </Link>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <Link href={href} className="relative aspect-[4/3] w-full bg-panel border border-rule flex items-center justify-center overflow-hidden block">
            {story.image ? (
              <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
            ) : (
              <>
                <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_30%_20%,#1A1A18_1px,transparent_1px)] bg-[length:14px_14px]" />
                <span className="kicker text-soft z-10">Featured Image / Video</span>
              </>
            )}
            <span className="stamp absolute bottom-4 right-4 text-[0.65rem] px-2 py-1 kicker">
              Filed
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
