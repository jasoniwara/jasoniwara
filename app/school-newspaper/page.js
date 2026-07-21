import PageIntro from '@/components/PageIntro';
import { getContent } from '@/lib/content';

export const metadata = { title: 'School Newspaper — jordan reese' };

export default async function SchoolNewspaperPage() {
  const { schoolNewspaper } = await getContent();
  return (
    <>
      <PageIntro
        kicker="Section Six"
        title="School Newspaper"
        description="Clips published in the student paper — game stories, news reporting, and features."
      />
      <section className="max-w-content mx-auto px-6 md:px-10 py-16">
        <ul>
          {schoolNewspaper.map((clip) => (
            <li key={clip.slug} className="border-b border-rule py-6">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h3 className="font-serif text-xl text-ink leading-snug">{clip.title}</h3>
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
