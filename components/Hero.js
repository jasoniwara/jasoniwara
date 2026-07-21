export default function Hero({ hero }) {
  return (
    <section className="max-w-content mx-auto px-6 md:px-10 pt-16">
      <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-stretch border-b border-rule pb-14">
        <div className="flex flex-col justify-center order-2 md:order-1">
          <p className="kicker text-press mb-4">{hero.kicker}</p>
          <h1 className="font-serif text-4xl sm:text-5xl leading-[1.08] text-ink mb-6">
            {hero.headline}
          </h1>
          <p className="text-soft text-lg leading-relaxed mb-8 max-w-md">
            {hero.description}
          </p>
          <div className="flex items-center gap-4 kicker text-soft">
            <span>{hero.date}</span>
            <span aria-hidden="true">&mdash;</span>
            <span>{hero.readTime}</span>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative aspect-[4/3] w-full bg-panel border border-rule flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_30%_20%,#1A1A18_1px,transparent_1px)] bg-[length:14px_14px]" />
            <span className="kicker text-soft z-10">Featured Image / Video</span>
            <span className="stamp absolute bottom-4 right-4 text-[0.65rem] px-2 py-1 kicker">
              Filed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
