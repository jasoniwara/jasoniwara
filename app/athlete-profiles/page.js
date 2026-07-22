import Link from 'next/link';
import PageIntro from '@/components/PageIntro';
import { getContent } from '@/lib/content';

export const metadata = { title: 'Athlete Profiles — jordan reese' };

export default async function AthleteProfilesPage() {
  const { athleteProfiles } = await getContent();
  return (
    <>
      <PageIntro
        kicker="Section Two"
        title="Athlete Profiles"
        description="Long-form, human-interest stories built around a single athlete — not just their season, but their story."
      />
      <section className="max-w-content mx-auto px-6 md:px-10 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {athleteProfiles.map((profile) => (
            <Link key={profile.slug} href={`/athlete-profiles/${profile.slug}`} className="group block border-t border-rule pt-6">
              <p className="kicker text-soft mb-3">{profile.sport}</p>
              <h3 className="font-serif text-xl text-ink mb-3 leading-snug group-hover:text-press transition-colors duration-200">
                {profile.title}
              </h3>
              <p className="text-soft text-[0.95rem] leading-relaxed">{profile.description}</p>
              <p className="kicker text-ink mt-4">{profile.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
