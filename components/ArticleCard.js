export default function ArticleCard({ title, category, date, description, image }) {
  return (
    <article className="group border border-rule bg-paper hover:border-ink transition-colors duration-300">
      <div className="aspect-[16/10] bg-panel border-b border-rule flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="kicker text-soft">Image Placeholder</span>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="kicker text-press">{category}</span>
          <span className="kicker text-soft">{date}</span>
        </div>
        <h3 className="font-serif text-xl text-ink leading-snug mb-2 group-hover:text-press transition-colors duration-200">
          {title}
        </h3>
        <p className="text-soft text-[0.95rem] leading-relaxed">{description}</p>
      </div>
    </article>
  );
}
