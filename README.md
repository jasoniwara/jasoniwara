# sports-desk-portfolio

An editorial-style personal journalism portfolio, built with Next.js (App Router) and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/page.js` — homepage, composes all sections
- `app/layout.js` — root layout; renders `SiteChrome` (header, sidebar, footer) around every page
- `app/globals.css` — design tokens (colors, type, editorial utility classes)
- `app/<section>/page.js` — one real page per sidebar item (`athlete-profiles`,
  `documentaries`, `school-newspaper`, `writing`, `investigations`, `photography`,
  `about`, `contact`) plus `featured-stories` for the homepage's "See all" link
- `components/` — reusable pieces:
  - `SiteChrome.js` — holds the sidebar open/close state and wraps every page in Header + Sidebar + Footer
  - `Header.js` — fixed header with masthead name + hamburger toggle
  - `Sidebar.js` — slide-out navigation styled as a magazine table of contents; every link routes to a real page
  - `Hero.js` — front-page featured story
  - `ArticleCard.js` — card for Featured Stories
  - `ProjectCard.js` — card for Documentary Work (video-style thumbnail)
  - `PageIntro.js` — shared header for sub-pages (kicker + title + description)
  - `SectionHeading.js` — homepage section header with an optional "See all →" link
  - `AthleteProfiles.js`, `Documentaries.js`, `FeaturedStories.js`, `LatestWriting.js` — homepage teaser sections (show the first few items; their matching pages show everything)
  - `Footer.js`
- `data/content.js` — **all placeholder text and site config lives here.** Swap in your
  real name, stories, dates, and copy without touching any component markup. Each
  content array (e.g. `athleteProfiles`) is the single source of truth for both the
  homepage teaser and its full "see all" page — edit it once.

## Customizing

1. Open `data/content.js` and replace the placeholder `site`, `nav`, `hero`, and every
   content array with your own. This is the only file you need to touch to change text.
2. Add real photos/thumbnails to `public/images/` and swap the placeholder blocks in
   `ArticleCard.js`, `ProjectCard.js`, and `Hero.js` for `<img>` or `next/image` tags.
3. Homepage sections show a preview slice (e.g. `featuredStories.slice(0, 3)`) — adjust
   the slice count in each component if you want to show more or fewer on the homepage.
4. Colors and type live as CSS custom classes in `tailwind.config.js` (`paper`, `panel`,
   `ink`, `soft`, `rule`, `press`) — change the hex values there to retint the whole site.

## Pulling in content from WordPress

If you already publish clips on a WordPress site (e.g. the school newspaper), you have
two options instead of copy-pasting text by hand:

- **Manual embed**: for a single post, WordPress can give you an oEmbed link — paste the
  post URL into a page and it renders as a preview card. Fine for occasional cross-links,
  but it looks like an embedded widget, not a native part of this site, and it won't
  match the editorial styling here.
- **Headless WordPress (recommended if you want this to stay in sync)**: WordPress
  exposes a free REST API (`/wp-json/wp/v2/posts`) on any self-hosted or WordPress.com
  site. This project could fetch from that API at build time and drop the results
  straight into the `schoolNewspaper` (or any) array shape above — so editing a post in
  WordPress updates this site automatically, no manual re-typing. This isn't wired up
  in this starter, but it's a relatively small addition if you want it.

## Live editing at /admin

There's a password-protected page at `/admin` where you can edit every piece of text
on the site — no code, no redeploying. Changes save to a small database and show up
on the live site right away. To turn this on, you need two things set as environment
variables on whatever you deploy to (Vercel, in the instructions below):

- `ADMIN_PASSWORD` — whatever password you want to use to log into `/admin`. Pick
  something you wouldn't mind a stranger guessing being a real problem — this is the
  only thing standing between the public and your content.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` — credentials for a small,
  free database that stores your edits. See the deploy steps below for exactly how to
  get these.

Without those two Redis variables set, the site still works fine — it just always
shows the default placeholder content from `data/content.js`, and `/admin` will tell
you saving isn't available yet rather than silently failing.

## Deploying (Vercel)

1. **Push this folder to GitHub.** Create a new repo and push the `portfolio` folder
   to it (e.g. via GitHub Desktop, or `git init && git add . && git commit -m "init"`
   then follow GitHub's instructions to push).
2. **Import it into Vercel.** Go to vercel.com, sign in, "Add New Project," and pick
   that GitHub repo. Vercel auto-detects Next.js — no config needed. Don't deploy yet;
   go to the project's Environment Variables settings first.
3. **Add a database.** In your Vercel project, go to the Storage tab → Create Database
   → choose the Upstash "Redis" option (it's free at this scale) → Connect it to your
   project. Vercel will automatically add `UPSTASH_REDIS_REST_URL` and
   `UPSTASH_REDIS_REST_TOKEN` (or similarly-named variables — connecting the
   integration wires them up for you, you don't need to copy/paste anything).
4. **Add your admin password.** Still in Environment Variables, add `ADMIN_PASSWORD`
   with a value you choose.
5. **Deploy.** Trigger a deploy (or it may auto-deploy after step 3–4). You'll get a
   live `.vercel.app` URL.
6. **Log in.** Visit `your-site.vercel.app/admin`, enter your password, and start
   editing. Each section has its own "Save section" button.

To edit locally with the same live database, run `vercel env pull .env.local` in the
project folder after step 3–4 above (requires the Vercel CLI: `npm i -g vercel`, then
`vercel link`) — this downloads the same environment variables so `npm run dev`
connects to the same database as production.
