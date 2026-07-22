import { getEmbedUrl } from '@/lib/embed';

export default function ProjectCard({ title, duration, description, videoUrl }) {
  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <article className="group border border-rule bg-paper hover:border-ink transition-colors duration-300">
      <div className="relative aspect-video bg-ink flex items-center justify-center overflow-hidden">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className="w-14 h-14 rounded-full border border-paper/60 flex items-center justify-center group-hover:border-paper transition-colors duration-300"
            aria-hidden="true"
          >
            <div
              className="w-0 h-0 ml-1
                border-t-[9px] border-t-transparent
                border-l-[14px] border-l-paper/80
                border-b-[9px] border-b-transparent
                group-hover:border-l-paper transition-colors duration-300"
            />
          </div>
        )}
        {duration && (
          <span className="absolute bottom-3 right-3 kicker text-paper/80">{duration}</span>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl text-ink leading-snug mb-2 group-hover:text-press transition-colors duration-200">
          {title}
        </h3>
        <p className="text-soft text-[0.95rem] leading-relaxed">{description}</p>
      </div>
    </article>
  );
}
