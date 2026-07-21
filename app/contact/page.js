import PageIntro from '@/components/PageIntro';
import { getContent } from '@/lib/content';

export const metadata = { title: 'Contact — jordan reese' };

export default async function ContactPage() {
  const { contact, site } = await getContent();
  return (
    <>
      <PageIntro kicker="Section Nine" title={contact.heading} description={contact.intro} />
      <section className="max-w-content mx-auto px-6 md:px-10 py-16">
        <div className="max-w-md">
          <div className="flex justify-between border-t border-rule py-4">
            <span className="kicker text-soft">Email</span>
            <a href={`mailto:${site.email}`} className="text-ink hover:text-press transition-colors duration-200">
              {site.email}
            </a>
          </div>
          {(site.socials || []).map((social) => (
            <div key={social.label} className="flex justify-between border-t border-rule py-4">
              <span className="kicker text-soft">{social.label}</span>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-ink hover:text-press transition-colors duration-200"
              >
                {social.handle}
              </a>
            </div>
          ))}
          <div className="border-t border-rule" />
        </div>
      </section>
    </>
  );
}
