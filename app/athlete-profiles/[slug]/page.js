import { notFound } from 'next/navigation';
import StoryPage from '@/components/StoryPage';
import { getContent } from '@/lib/content';

export async function generateMetadata({ params }) {
  const { athleteProfiles } = await getContent();
  const profile = athleteProfiles.find((p) => p.slug === params.slug);
  return { title: profile ? `${profile.title} — jordan reese` : 'Athlete Profiles — jordan reese' };
}

export default async function AthleteProfilePage({ params }) {
  const { athleteProfiles } = await getContent();
  const profile = athleteProfiles.find((p) => p.slug === params.slug);
  if (!profile) notFound();

  return (
    <StoryPage
      kicker={profile.sport}
      title={profile.title}
      meta={[profile.name].filter(Boolean)}
      image={profile.image}
      body={profile.body}
      backHref="/athlete-profiles"
      backLabel="Athlete Profiles"
    />
  );
}
