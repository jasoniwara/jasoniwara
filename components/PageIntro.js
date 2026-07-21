export default function PageIntro({ kicker, title, description }) {
  return (
    <div className="max-w-content mx-auto px-6 md:px-10 pt-16 pb-12 border-b border-rule">
      {kicker && <p className="kicker text-press mb-4">{kicker}</p>}
      <h1 className="font-serif text-4xl text-ink mb-4">{title}</h1>
      {description && <p className="text-soft text-lg leading-relaxed max-w-2xl">{description}</p>}
    </div>
  );
}
