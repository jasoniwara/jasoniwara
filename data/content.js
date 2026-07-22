// ─────────────────────────────────────────────────────────────────────────
// ALL EDITABLE TEXT ON THE SITE LIVES IN THIS FILE.
// Change a name, headline, date, or description here and it updates
// everywhere that piece of content appears — homepage teasers and the
// full "see all" pages both read from these same arrays. You never need
// to touch a component file just to update copy.
//
// Swap in real photos by dropping files into /public/images and adding an
// `image: '/images/filename.jpg'` field to the relevant item (featuredStories,
// hero, photography, about.photo). Add `videoUrl: 'https://youtube.com/...'`
// to a documentaries item to embed a YouTube/Vimeo video via lib/embed.js.
//
// Add `featured: true` to items in featuredStories, athleteProfiles, or
// documentaries to control what shows on the homepage. If nothing in a list
// is marked featured, the homepage falls back to the first 3 items in array order.
//
// `body` holds the full text of a story as an array of paragraph strings —
// each entry in the array becomes one <p> on the story's own page (e.g.
// /featured-stories/fourth-quarter-kid, /writing/sixth-grade-cuts). This is
// separate from `description`, which stays a short teaser used on cards and
// list rows. Replace the placeholder paragraph below with the real story.
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  name: 'jordan reese',
  tagline: 'sports & human-interest reporting',
  dateline: 'chapel hill, nc',
  established: 'est. 2024',
  email: 'jordan.reese@example.com',
  socials: [
    { label: 'Twitter / X', handle: '@jordanreports', href: 'https://twitter.com' },
    { label: 'Instagram', handle: '@jordanreports', href: 'https://instagram.com' },
  ],
};

// Every sidebar item now points at a real page in the /app directory.
export const nav = [
  { label: 'Athlete Profiles', href: '/athlete-profiles', page: '01' },
  { label: 'Mini Documentaries', href: '/documentaries', page: '02' },
  { label: 'School Newspaper', href: '/school-newspaper', page: '03' },
  { label: 'Writing', href: '/writing', page: '04' },
  { label: 'Investigations', href: '/investigations', page: '05' },
  { label: 'Photography', href: '/photography', page: '06' },
  { label: 'About', href: '/about', page: '07' },
  { label: 'Contact', href: '/contact', page: '08' },
];

export const hero = {
  kicker: 'Cover Story',
  headline: 'Beyond the Scoreboard: the habits behind elite high school athletes',
  description:
    'A season embedded with three varsity programs reveals what separates the athletes who last from the ones who burn out — long before scholarship offers ever arrive.',
  date: 'July 18, 2026',
  readTime: '12 min read',
  body: [
    'Full story text goes here — replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Hero section in /admin.',
  ],
};

// Full list — homepage shows the first 3, /featured-stories shows all of them.
export const featuredStories = [
  {
    slug: 'fourth-quarter-kid',
    title: 'The Fourth-Quarter Kid',
    category: 'Athlete Profile',
    date: 'June 30, 2026',
    description:
      'A point guard who never starts, and the coach who insists she is the most important player on the roster.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Featured Stories section in /admin.',
    ],
  },
  {
    slug: 'what-the-trainers-know',
    title: 'What the Trainers Know',
    category: 'Investigation',
    date: 'June 12, 2026',
    description:
      'Inside the quiet epidemic of overuse injuries in youth sports, and the athletic trainers fighting to be heard.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Featured Stories section in /admin.',
    ],
  },
  {
    slug: 'two-miles-before-sunrise',
    title: 'Two Miles Before Sunrise',
    category: 'Human Interest',
    date: 'May 24, 2026',
    description:
      'Before school even opens, a cross-country team is already three miles into a routine built on more than mileage.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Featured Stories section in /admin.',
    ],
  },
  {
    slug: 'the-scout-in-section-c',
    title: 'The Scout in Section C',
    category: 'Feature',
    date: 'May 3, 2026',
    description:
      'A regular in the stands has quietly shaped a decade of college recruiting — and never once introduced himself.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Featured Stories section in /admin.',
    ],
  },
  {
    slug: 'the-equipment-room',
    title: 'The Equipment Room',
    category: 'Human Interest',
    date: 'April 19, 2026',
    description:
      'The man who has re-strung, re-laced, and repaired every team in the building for eleven years, unpaid.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Featured Stories section in /admin.',
    ],
  },
  {
    slug: 'benched-by-choice',
    title: 'Benched by Choice',
    category: 'Athlete Profile',
    date: 'April 2, 2026',
    description:
      'A star freshman asked to be moved down a level. What happened next surprised everyone, including her coach.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Featured Stories section in /admin.',
    ],
  },
];

// Full list — homepage shows the first 3, /athlete-profiles shows all of them.
export const athleteProfiles = [
  {
    slug: 'maya-okafor',
    name: 'Maya Okafor',
    sport: 'Track & Field',
    title: 'The Long Way Around',
    description:
      'A district champion hurdler on rebuilding her form, and her confidence, after an injury sidelined her junior season.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Athlete Profiles section in /admin.',
    ],
  },
  {
    slug: 'diego-fuentes',
    name: 'Diego Fuentes',
    sport: 'Wrestling',
    title: 'Making Weight, Making Peace',
    description:
      'A 138-pound wrestler and his family confront the culture of cutting weight in a sport built around control.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Athlete Profiles section in /admin.',
    ],
  },
  {
    slug: 'aaliyah-chen',
    name: 'Aaliyah Chen',
    sport: 'Swimming',
    title: 'The Last Lane',
    description:
      'A senior swimmer\u2019s final season, and what it means to walk away from a pool you have called home since age six.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Athlete Profiles section in /admin.',
    ],
  },
  {
    slug: 'malik-thompson',
    name: 'Malik Thompson',
    sport: 'Football',
    title: 'The Backup Plan',
    description:
      'A third-string quarterback spends four years preparing for a moment that arrives with two minutes left in the season.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Athlete Profiles section in /admin.',
    ],
  },
  {
    slug: 'sofia-reyes',
    name: 'Sofia Reyes',
    sport: 'Soccer',
    title: 'Playing for Two Teams',
    description:
      'A midfielder splits her year between her high school squad and a club team three states away. Neither one gets all of her.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Athlete Profiles section in /admin.',
    ],
  },
  {
    slug: 'nate-park',
    name: 'Nate Park',
    sport: 'Golf',
    title: 'The Quietest Sport in the Building',
    description:
      'A state-ranked golfer on the loneliness of a sport with no bench, no teammates on the course, and no clock to beat.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Athlete Profiles section in /admin.',
    ],
  },
];

// Full list — homepage shows the first 3, /documentaries shows all of them.
export const documentaries = [
  {
    slug: 'friday-night-every-night',
    title: 'Friday Night, Every Night',
    duration: '18:42',
    description: 'A short documentary following a small-town football program through a losing season.',
    body: [
      'Full write-up goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Documentaries section in /admin.',
    ],
  },
  {
    slug: 'the-walk-on',
    title: 'The Walk-On',
    duration: '11:05',
    description: 'One player\u2019s three-year path from the practice squad to a varsity letter.',
    body: [
      'Full write-up goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Documentaries section in /admin.',
    ],
  },
  {
    slug: 'coachs-daughter',
    title: 'Coach\u2019s Daughter',
    duration: '14:30',
    description: 'A profile of a head coach\u2019s daughter, now the starting quarterback on his own team.',
    body: [
      'Full write-up goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Documentaries section in /admin.',
    ],
  },
  {
    slug: 'the-scoreboard-operator',
    title: 'The Scoreboard Operator',
    duration: '09:18',
    description: 'A retired teacher has run the scoreboard at every home game for eighteen years. He has his own rules.',
    body: [
      'Full write-up goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Documentaries section in /admin.',
    ],
  },
  {
    slug: 'two-gyms',
    title: 'Two Gyms',
    duration: '16:52',
    description: 'A look inside the daily doubleheader for athletes who play one sport in the morning and another at night.',
    body: [
      'Full write-up goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Documentaries section in /admin.',
    ],
  },
];

// Full list — homepage shows the first 4, /writing shows all of them.
export const latestWriting = [
  {
    slug: 'sixth-grade-cuts',
    title: 'Why Sixth-Grade Cuts Still Sting at Seventeen',
    category: 'Column',
    date: 'July 14, 2026',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Writing section in /admin.',
    ],
  },
  {
    slug: 'recruiting-dms',
    title: 'Inside the Recruiting DMs Coaches Never See',
    category: 'Reporting',
    date: 'July 6, 2026',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Writing section in /admin.',
    ],
  },
  {
    slug: 'assistant-coaches',
    title: 'The Assistant Coaches Who Never Get Mentioned',
    category: 'Feature',
    date: 'June 22, 2026',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Writing section in /admin.',
    ],
  },
  {
    slug: 'scorebook-1998',
    title: 'A Scorebook From 1998, Still in Use',
    category: 'Human Interest',
    date: 'June 9, 2026',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Writing section in /admin.',
    ],
  },
  {
    slug: 'jv-to-varsity',
    title: 'What Actually Changes Between JV and Varsity',
    category: 'Reporting',
    date: 'May 28, 2026',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Writing section in /admin.',
    ],
  },
  {
    slug: 'the-bus-rides',
    title: 'The Bus Rides Are Where the Team Actually Forms',
    category: 'Column',
    date: 'May 15, 2026',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Writing section in /admin.',
    ],
  },
  {
    slug: 'senior-night',
    title: 'What Senior Night Looks Like From the Press Box',
    category: 'Feature',
    date: 'April 30, 2026',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Writing section in /admin.',
    ],
  },
  {
    slug: 'the-injury-report',
    title: 'Reading Between the Lines of the Injury Report',
    category: 'Column',
    date: 'April 11, 2026',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Writing section in /admin.',
    ],
  },
];

// /investigations — deep, multi-source reporting.
export const investigations = [
  {
    slug: 'what-the-trainers-know',
    title: 'What the Trainers Know',
    date: 'June 12, 2026',
    description:
      'Inside the quiet epidemic of overuse injuries in youth sports, and the athletic trainers fighting to be heard.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Investigations section in /admin.',
    ],
  },
  {
    slug: 'the-transfer-portal-nobody-explains',
    title: 'The Transfer Portal Nobody Explains to Sixteen-Year-Olds',
    date: 'May 9, 2026',
    description:
      'A review of transfer paperwork and interviews with a dozen families reveals how little guidance exists before a decision that reshapes a season.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Investigations section in /admin.',
    ],
  },
  {
    slug: 'who-pays-for-the-bus',
    title: 'Who Pays for the Bus',
    date: 'March 21, 2026',
    description:
      'A look at the booster-club fundraising that quietly keeps several varsity programs running, and what happens the year it falls short.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the Investigations section in /admin.',
    ],
  },
];

// /school-newspaper — clips published in the student paper.
export const schoolNewspaper = [
  {
    slug: 'homecoming-upset',
    title: 'Homecoming Upset: How a Seven-Point Underdog Won the Rivalry Game',
    publication: 'The Chapel Hill Chronicle',
    date: 'October 18, 2025',
    description: 'Game story and sideline reporting from the season\u2019s most-attended home game.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the School Newspaper section in /admin.',
    ],
  },
  {
    slug: 'budget-cuts-athletics',
    title: 'Athletics Budget Cuts Force Three Programs to Fundraise Independently',
    publication: 'The Chapel Hill Chronicle',
    date: 'February 6, 2026',
    description: 'News reporting on a district budget vote and its effect on junior varsity programs.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the School Newspaper section in /admin.',
    ],
  },
  {
    slug: 'senior-athletes-college-decisions',
    title: 'Where Our Senior Athletes Are Headed Next Year',
    publication: 'The Chapel Hill Chronicle',
    date: 'April 22, 2026',
    description: 'A senior-year roundup profiling twelve athletes and their college commitments.',
    body: [
      'Full story text goes here \u2014 replace this placeholder paragraph (or add more paragraphs to the array) in data/content.js, or edit it from the School Newspaper section in /admin.',
    ],
  },
];

// /photography — placeholder gallery. Replace with real images in /public/images.
export const photography = [
  { caption: 'Pregame warmups, Chapel Hill High football', category: 'Football' },
  { caption: 'Final lap, regional track invitational', category: 'Track & Field' },
  { caption: 'Postgame huddle after a rivalry win', category: 'Football' },
  { caption: 'Senior night, girls\u2019 soccer', category: 'Soccer' },
  { caption: 'Between events, swim regionals', category: 'Swimming' },
  { caption: 'Empty gym, six a.m. practice', category: 'Wrestling' },
];

export const about = {
  heading: 'About',
  photoCaption: 'Portrait placeholder',
  paragraphs: [
    'I\u2019m a high school journalist covering sports the way I think they deserve to be covered — not just who won, but who the people on the field actually are.',
    'Most of my reporting starts in the stands or the training room, not the box score. I\u2019m drawn to the athletes who don\u2019t make the headlines: the third-string quarterback, the trainer nobody thanks, the swimmer in her last season.',
    'When I\u2019m not reporting, I\u2019m usually reading back issues of old sports magazines or re-cutting footage from a documentary that isn\u2019t finished yet.',
  ],
  facts: [
    { label: 'Based in', value: 'Chapel Hill, NC' },
    { label: 'Reporting since', value: '2024' },
    { label: 'Focus', value: 'High school athletics & human interest' },
  ],
};

export const contact = {
  heading: 'Contact',
  intro:
    'Have a story lead, a correction, or a team I should be covering? I read every message.',
};
