import Link from 'next/link'
import { Github, Twitter, Linkedin, Search, FolderOpen, Compass, User } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

const discoverLinks = [
  { name: 'Explore bookmarks', href: '/sbm', icon: Compass },
  { name: 'Collections', href: '/sbm/collections', icon: FolderOpen },
  { name: 'Profiles', href: '/profile', icon: User },
  { name: 'Search', href: '/search', icon: Search },
]

const footerLinks = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Developers', href: '/developers' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Licenses', href: '/licenses' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-app)] bg-[linear-gradient(180deg,#ffffff_0%,var(--surface-muted)_100%)]">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_0.9fr_0.9fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-lg border border-[var(--border-app)] bg-white p-1 shadow-sm">
                <img
                  src="/favicon.png?v=20260401"
                  alt={`${SITE_CONFIG.name} logo`}
                  width="44"
                  height="44"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="block bg-gradient-to-r from-[var(--sbm-blue)] to-[var(--sbm-green)] bg-clip-text text-lg font-bold text-transparent">
                  {SITE_CONFIG.name}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--text-body)]/85">{siteContent.footer.tagline}</span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--text-body)]">{SITE_CONFIG.description}</p>
            <div className="mt-6 flex gap-2.5">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-lg border border-[var(--border-app)] bg-white p-2.5 text-[var(--text-body)] transition hover:border-[rgba(133,57,83,0.35)] hover:text-[var(--sbm-blue-dim)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-heading)]">{siteContent.footer.discoverHeading}</h3>
            <ul className="mt-5 space-y-3">
              {discoverLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="flex items-center gap-2 text-sm text-[var(--text-body)] transition hover:text-[var(--sbm-blue-dim)]">
                    <item.icon className="h-4 w-4 shrink-0 opacity-80" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-heading)]">Company</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-[var(--text-body)] transition hover:text-[var(--sbm-blue-dim)]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-heading)]">Resources & legal</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-[var(--text-body)] transition hover:text-[var(--sbm-blue-dim)]">
                    {item.name}
                  </Link>
                </li>
              ))}
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground transition hover:text-[var(--text-heading)]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--border-app)] pt-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
