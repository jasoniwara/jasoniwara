export default function Footer({ site }) {
  return (
    <footer className="border-t border-ink">
      <div className="max-w-content mx-auto px-6 md:px-10 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-serif lowercase text-lg text-ink">{site.name}</p>
          <p className="kicker text-soft mt-1">{site.tagline}</p>
        </div>
        <p className="kicker text-soft">{site.established} &middot; {site.dateline}</p>
      </div>
    </footer>
  );
}
