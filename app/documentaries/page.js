import PageIntro from '@/components/PageIntro';
import ProjectCard from '@/components/ProjectCard';
import { getContent } from '@/lib/content';

export async function generateMetadata() {
  const { site, sectionLabels } = await getContent();
  return { title: `${sectionLabels.documentaries} — ${site.name}` };
}

export default async function DocumentariesPage() {
  const { documentaries, sectionLabels } = await getContent();
  return (
    <>
      <PageIntro
        title={sectionLabels.documentaries}
        description="Short-form video work — profiles, season-long follows, and behind-the-scenes reporting."
      />
      <section className="max-w-content mx-auto px-6 md:px-10 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentaries.map((doc) => (
            <ProjectCard key={doc.slug} {...doc} />
          ))}
        </div>
      </section>
    </>
  );
}
