import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Curate · Save · Discover people',
    locationLabel: 'Jaipur, India',
  },
  footer: {
    tagline: 'Bookmarks, collections, and profile-led discovery',
    discoverHeading: 'Discover',
    moreHeading: 'Also available',
  },
  hero: {
    badge: 'Social bookmarking & profiles',
    discoverEyebrow: 'Discover curated resources and the people behind them.',
    title: ['Collect and organize', 'the links worth keeping.'],
    description:
      'Save trusted resources into collections, polish your public profile, and explore what other curators bookmark—without losing the calm, library-like rhythm of browsing.',
    primaryCta: {
      label: 'Explore bookmarks',
      href: '/sbm',
    },
    secondaryCta: {
      label: 'Browse profiles',
      href: '/profile',
    },
    searchPlaceholder: 'Search bookmarks, profiles, collections, and more',
    focusLabel: 'Jump to',
    filterChips: [
      { label: 'Bookmarks', href: '/sbm' },
      { label: 'Profiles', href: '/profile' },
      { label: 'Collections', href: '/sbm/collections' },
    ],
    featureCardBadge: 'From the feed',
    featureCardTitle: 'Fresh saves and identity-rich profiles in rotation.',
    featureCardDescription:
      'A live preview of what the community is bookmarking—compact cards, clear metadata, and room for your own avatar-led presence.',
  },
  home: {
    metadata: {
      title: 'Curated bookmarks, collections, and profile discovery',
      description:
        'Discover saved links, public collections, and profile-led curation—a calm space to collect, revisit, and explore trusted resources.',
      openGraphTitle: 'Curated bookmarks and profile discovery',
      openGraphDescription:
        'Save and organize links, browse collections, and meet the curators behind every bookmark.',
      keywords: [
        'social bookmarking',
        'link curation',
        'saved resources',
        'collections',
        'profile discovery',
      ],
    },
    introBadge: 'Why bookmark here',
    introTitle: 'Discover curated resources and the people behind them.',
    introParagraphs: [
      'This home is tuned for social bookmarking: saved links, organized collections, and profiles that show who is curating what—so discovery feels personal as well as practical.',
      'Collections and tags keep resources easy to revisit, while profile imagery and headers put identity at the center of trust.',
      'Search still reaches the full platform when you need it; the experience you see first is built around saves, shelves, and the humans recommending them.',
    ],
    sideBadge: 'Start curating',
    sidePoints: [
      'Create a profile and add a strong avatar or logo.',
      'Save links into themed collections you can share.',
      'Explore bookmarks from other curators and follow threads of trust.',
      'Search across bookmarks, profiles, and the wider catalog when you need depth.',
    ],
    primaryLink: {
      label: 'Open bookmarks',
      href: '/sbm',
    },
    secondaryLink: {
      label: 'View collections',
      href: '/sbm/collections',
    },
  },
  cta: {
    badge: 'Join the shelf',
    title: 'Create your profile, save your first link, and start a collection.',
    description:
      'Upload a profile image, bookmark what you trust, and give others a clear view of how you think—premium, calm, and built for revisiting.',
    primaryCta: {
      label: 'Sign up free',
      href: '/register',
    },
    secondaryCta: {
      label: 'Explore bookmarks',
      href: '/sbm',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
  profileSuggestedReadingTitle: 'Related reading',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Read articles, stories, guides, and long-form posts across topics and interests.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'Explore listings, services, brands, and structured pages organized for easier browsing.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse classifieds, offers, notices, and time-sensitive posts across categories.',
  },
  image: {
    title: 'Image sharing and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories from across the platform.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Discover public profiles, brand pages, and identity-focused posts in one place.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Browse useful links, saved references, and curated resources organized for discovery.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open reports, documents, and downloadable resources shared across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings connect naturally with articles, images, resources, and other content types so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    links: [
      { label: 'Explore bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Browse collections', href: '/sbm/collections' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [
      { label: 'Explore bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Browse collections', href: '/sbm/collections' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Explore bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Browse collections', href: '/sbm/collections' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Image sharing highlights visual posts, galleries, and story-led content where imagery plays the lead role.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Explore bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Browse collections', href: '/sbm/collections' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with stories, listings, documents, and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Explore bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Browse collections', href: '/sbm/collections' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Explore bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Browse collections', href: '/sbm/collections' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Explore bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Browse collections', href: '/sbm/collections' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Explore bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Browse collections', href: '/sbm/collections' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Browse collections', href: '/sbm/collections' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Explore bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Browse collections', href: '/sbm/collections' },
    ],
  },
}
