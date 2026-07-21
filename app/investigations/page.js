import PageIntro from '@/components/PageIntro';
import { getContent } from '@/lib/content';

export const metadata = { title: 'Investigations — jordan reese' };

export default async function InvestigationsPage() {
  const { investigations } = await getContent();
  return (
    <>
      <PageIntro
        kicker="Section Five"
        title="Investigations"
        description="Deeper, multi-source reporting on the systems and decisions behind high school athletics."
      />
      <section className="max-w-content mx-auto px-6 md:px-10 py-16">
        <div className="flex flex-col gap-12 max-w-3xl">
          {investigations.map((piece) => (
            <article key={piece.slug} className="border-t border-rule pt-6">
              <p className="kicker text-soft mb-2">{piece.date}</p>
              <h3 className="font-serif text-2xl text-ink mb-3 leading-snug">{piece.title}</h3>
              <p className="text-soft leading-relaxed">{piece.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
