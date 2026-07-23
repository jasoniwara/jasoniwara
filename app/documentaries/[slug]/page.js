import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getEmbedUrl } from '@/lib/embed';
import { getContent } from '@/lib/content';

export async function generateMetadata({ params }) {
  const { documentaries } = await getContent();
  const doc = documentaries.find((d) => d.slug === params.slug);
  return { title: doc ? `${doc.title} — jordan reese` : 'Mini Documentaries — jordan reese' };
}

export default async function DocumentaryPage({ params }) {
  const { documentaries } = await getContent();
  const doc = documentaries.find((d) => d.slug === params.slug);
  if (!doc) notFound();

  const embedUrl = getEmbedUrl(doc.videoUrl);

  return (
    <article className="max-w-content mx-auto px-6 md:px-10 py-16">
      <Link href="/documentaries" className="kicker text-soft hover:text-press transition-colors duration-200">
        &larr; Mini Documentaries
      </Link>

      <div className="max-w-2xl mx-auto mt-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-ink leading-[1.1] mb-4">{doc.title}</h1>
        {doc.duration && <p className="kicker text-soft mb-10">{doc.duration}</p>}
      </div>

      <div className="relative aspect-video max-w-3xl mx-auto bg-ink border border-rule overflow-hidden mb-10">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={doc.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="kicker text-paper/80">No video linked yet</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 max-w-2xl mx-auto">
        {(doc.body && doc.body.length > 0 ? doc.body : ['This documentary has no write-up yet.']).map((p, i) => (
          <p key={i} className={`text-soft text-lg leading-relaxed ${i === 0 ? 'drop-cap' : ''}`}>
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}
