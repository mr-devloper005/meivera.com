'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, Home, Compass, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const primaryLinks = [
  { name: 'Home', href: '/', icon: Home, match: (p: string) => p === '/' },
  { name: 'Explore', href: '/sbm', icon: Compass, match: (p: string) => p.startsWith('/sbm') },
  {
    name: 'Collections',
    href: '/sbm/collections',
    icon: FolderOpen,
    match: (p: string) => p.startsWith('/sbm/collections'),
  },
  { name: 'Profiles', href: '/profile', icon: User, match: (p: string) => p.startsWith('/profile') },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-app)] bg-[rgba(243,244,244,0.94)] backdrop-blur-xl">
      <nav className="mx-auto flex h-[4.75rem] max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6 lg:gap-5 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3 lg:gap-5">
          <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-1">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[rgba(133,57,83,0.22)] bg-white p-1 shadow-sm">
              <img
                src="/favicon.png?v=20260413"
                alt={`${SITE_CONFIG.name} logo`}
                width="44"
                height="44"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="block truncate text-xl font-black tracking-tight text-[var(--sbm-blue)]">
                {SITE_CONFIG.name}
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sbm-blue-dim)]/80 sm:block">
                {siteContent.navbar.locationLabel}
              </span>
            </div>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center lg:flex">
            <div className="flex items-center gap-1 rounded-2xl border border-[var(--border-app)] bg-white/90 p-1 shadow-[0_4px_16px_rgba(44,44,44,0.06)]">
            {primaryLinks.map((item) => {
              const Icon = item.icon
              const isActive = item.match(pathname)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors',
                    isActive
                      ? 'bg-[var(--sbm-blue)] text-white shadow-sm'
                      : 'text-[var(--text-body)] hover:bg-[rgba(97,45,83,0.1)] hover:text-[var(--text-heading)]'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 opacity-90" />
                  <span className="whitespace-nowrap">{item.name}</span>
                </Link>
              )
            })}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hidden rounded-xl border border-[var(--border-app)] bg-white text-[var(--text-body)] hover:bg-[rgba(97,45,83,0.08)] hover:text-[var(--sbm-blue-dim)] md:flex"
          >
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-xl border border-transparent px-4 font-semibold text-[var(--sbm-blue)] hover:border-[var(--border-app)] hover:bg-white hover:text-[var(--sbm-blue-dim)]">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="rounded-xl border-0 bg-[var(--sbm-blue-dim)] px-5 font-semibold text-white shadow-sm hover:bg-[var(--sbm-blue)]"
              >
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl border border-[var(--border-app)] bg-white text-[var(--text-body)] hover:bg-[rgba(97,45,83,0.08)] lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="max-h-[min(80vh,calc(100dvh-4.75rem))] overflow-y-auto border-t border-[var(--border-app)] bg-white lg:hidden">
          <div className="space-y-1 px-3 py-4">
            <Link
              href="/search"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mb-2 flex items-center gap-3 rounded-xl border border-[var(--border-app)] bg-[var(--surface-muted)] px-4 py-3 text-sm font-semibold text-[var(--text-heading)] shadow-sm"
            >
              <Search className="h-4 w-4 text-[var(--sbm-blue)]" />
              Search
            </Link>

            {primaryLinks.map((item) => {
              const Icon = item.icon
              const isActive = item.match(pathname)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
                    isActive ? 'bg-[var(--sbm-blue)] text-white' : 'text-[var(--text-body)] hover:bg-[var(--surface-muted)]'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}

            {!isAuthenticated ? (
              <div className="grid gap-2 pt-4 sm:grid-cols-2">
                <Button variant="outline" asChild className="rounded-xl border-[var(--border-app)] bg-white font-semibold text-[var(--sbm-blue)]">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="rounded-xl bg-[var(--sbm-blue-dim)] font-semibold text-white hover:bg-[var(--sbm-blue)]">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </header>
  )
}
