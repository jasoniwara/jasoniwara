import Link from 'next/link';
import PageIntro from '@/components/PageIntro';
import { getContent } from '@/lib/content';

export async function generateMetadata() {
  const { site, sectionLabels } = await getContent();
  return { title: `${sectionLabels.schoolNewspaper} — ${site.name}` };
}

export default async function SchoolNewspaperPage() {
  const { schoolNewspaper, sectionLabels } = await getContent();
  return (
    <>
      <PageIntro
        title={sectionLabels.schoolNewspaper}
        description="Clips published in the student paper — game stories, news reporting, and features."
      />
      <section className="max-w-content mx-auto px-6 md:px-10 py-16">
        <ul>
          {schoolNewspaper.map((clip) => (
            <li key={clip.slug} className="border-b border-rule py-6">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <Link href={`/school-newspaper/${clip.slug}`} className="group">
                  <h3 className="font-serif text-xl text-ink leading-snug group-hover:text-press transition-colors duration-200">
                    {clip.title}
                  </h3>
                </Link>
                <span className="kicker text-soft shrink-0">{clip.date}</span>
              </div>
              <p className="kicker text-press mb-2">{clip.publication}</p>
              <p className="text-soft text-[0.95rem] leading-relaxed">{clip.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
