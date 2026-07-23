import Link from 'next/link';
import PageIntro from '@/components/PageIntro';
import { getContent } from '@/lib/content';

export async function generateMetadata() {
  const { site, sectionLabels } = await getContent();
  return { title: `${sectionLabels.investigations} — ${site.name}` };
}

export default async function InvestigationsPage() {
  const { investigations, sectionLabels } = await getContent();
  return (
    <>
      <PageIntro
        kicker="Section Five"
        title={sectionLabels.investigations}
        description="Deeper, multi-source reporting on the systems and decisions behind high school athletics."
      />
      <section className="max-w-content mx-auto px-6 md:px-10 py-16">
        <div className="flex flex-col gap-12 max-w-3xl">
          {investigations.map((piece) => (
            <article key={piece.slug} className="border-t border-rule pt-6">
              <p className="kicker text-soft mb-2">{piece.date}</p>
              <Link href={`/investigations/${piece.slug}`} className="group">
                <h3 className="font-serif text-2xl text-ink mb-3 leading-snug group-hover:text-press transition-colors duration-200">
                  {piece.title}
                </h3>
              </Link>
              <p className="text-soft leading-relaxed">{piece.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
