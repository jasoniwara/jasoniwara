import PageIntro from '@/components/PageIntro';
import { getContent } from '@/lib/content';

export async function generateMetadata() {
  const { site, sectionLabels } = await getContent();
  return { title: `${sectionLabels.photography} — ${site.name}` };
}

export default async function PhotographyPage() {
  const { photography, sectionLabels } = await getContent();
  return (
    <>
      <PageIntro
        kicker="Section Seven"
        title={sectionLabels.photography}
        description="Sideline and behind-the-scenes photography from the seasons I've covered."
      />
      <section className="max-w-content mx-auto px-6 md:px-10 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photography.map((photo, i) => (
            <figure key={i} className="border border-rule">
              <div className="aspect-[4/5] bg-panel flex items-center justify-center overflow-hidden">
                {photo.image ? (
                  <img src={photo.image} alt={photo.caption} className="w-full h-full object-cover" />
                ) : (
                  <span className="kicker text-soft">Image Placeholder</span>
                )}
              </div>
              <figcaption className="p-4">
                <p className="kicker text-press mb-1">{photo.category}</p>
                <p className="text-soft text-[0.9rem] leading-relaxed">{photo.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
