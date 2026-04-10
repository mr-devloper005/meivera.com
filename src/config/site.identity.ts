export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'meivera-production',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Meivera',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Curated bookmarking and profile discovery',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A social bookmarking platform focused on saved resources, curated collections, and profile-led discovery.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'meivera.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://meivera.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
