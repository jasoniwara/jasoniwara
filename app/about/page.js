import { getContent } from '@/lib/content';

export const metadata = { title: 'About — jordan reese' };

export default async function AboutPage() {
  const { about } = await getContent();
  return (
    <section className="max-w-content mx-auto px-6 md:px-10 py-16">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <div className="aspect-[4/5] bg-panel border border-rule flex items-center justify-center mb-4">
            <span className="kicker text-soft">{about.photoCaption}</span>
          </div>
          <dl>
            {(about.facts || []).map((fact) => (
              <div key={fact.label} className="flex justify-between border-t border-rule py-3">
                <dt className="kicker text-soft">{fact.label}</dt>
                <dd className="kicker text-ink text-right">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="md:col-span-2">
          <p className="kicker text-press mb-4">Section Eight</p>
          <h1 className="font-serif text-4xl text-ink mb-8">{about.heading}</h1>
          <div className="flex flex-col gap-5 max-w-xl">
            {(about.paragraphs || []).map((p, i) => (
              <p key={i} className={`text-soft text-lg leading-relaxed ${i === 0 ? 'drop-cap' : ''}`}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
