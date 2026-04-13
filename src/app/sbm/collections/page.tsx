'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FolderPlus, Layers, Link2, Share2 } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BookmarkCollectionCard } from '@/components/sbm/bookmark-collection-card'
import type { BookmarkCollection } from '@/types'
import { loadFromStorage, storageKeys } from '@/lib/local-storage'

const highlights = [
  {
    icon: Layers,
    title: 'Layered organization',
    body: 'Nest research, client work, and personal inspiration without messy folders—each collection gets its own moodboard layout.',
  },
  {
    icon: Share2,
    title: 'Share with intent',
    body: 'Publish a read-only link for stakeholders or keep everything private until you are ready to unveil.',
  },
  {
    icon: Link2,
    title: 'Deep links',
    body: 'Every saved URL retains notes, tags, and source context so nothing feels anonymous six months later.',
  },
]

export default function BookmarkCollectionsPage() {
  const [storedCollections, setStoredCollections] = useState<BookmarkCollection[]>([])
  const collections = useMemo(() => storedCollections, [storedCollections])

  useEffect(() => {
    setStoredCollections(loadFromStorage<BookmarkCollection[]>(storageKeys.bookmarkCollections, []))
  }, [])

  return (
    <div className="min-h-screen bg-[#fdfbf8]">
      <NavbarShell />

      <main>
        <section className="relative overflow-hidden border-b border-[#ead9d3] bg-gradient-to-b from-[#fdfbf8] via-[#faf5f1] to-[#f4ebe5]">
          <div className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(183,110,121,0.12),transparent_70%)]" />
          <div className="relative mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8f6f72]">Collections</p>
            <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h1 className="font-serif text-4xl font-medium tracking-tight text-[#1a1615] sm:text-5xl">
                  Curated shelves for every chapter
                </h1>
                <p className="mt-5 text-[15px] leading-[1.75] text-[#4a403e]">
                  Shape bookmark sets like a gallery wall—soft neutrals, rose accents, and typography that keeps long lists legible.
                  Create a collection for each brief, trip, or rabbit hole; we will handle the rest.
                </p>
              </div>
              <Button
                className="h-12 rounded-full bg-gradient-to-r from-[#b76e79] to-[#8f4f5c] px-7 font-semibold text-white shadow-md hover:opacity-95"
                asChild
              >
                <Link href="/sbm/collections/new" className="gap-2">
                  <FolderPlus className="h-4 w-4" />
                  New collection
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-[1.5rem] border border-[#ead9d3] bg-white/90 p-6 shadow-sm"
              >
                <h.icon className="h-5 w-5 text-[#b76e79]" strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-lg font-medium text-[#1a1615]">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a403e]">{h.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <h2 className="font-serif text-2xl font-medium text-[#1a1615]">Your collections</h2>
            <p className="mt-2 text-sm text-[#4a403e]">Stored locally in this browser—export or sync options arrive later this season.</p>
          </div>

          <div className="mt-8">
            {collections.length ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {collections.map((collection) => (
                  <BookmarkCollectionCard key={collection.id} collection={collection} />
                ))}
              </motion.div>
            ) : (
              <div className="rounded-[1.75rem] border border-dashed border-[#d4b8b0] bg-gradient-to-b from-white to-[#fdf9f6] p-12 text-center text-[#4a403e]">
                <p className="font-serif text-xl font-medium text-[#1a1615]">No collections yet</p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed">
                  Start with a mood—travel, research, recipes—and drop links as you find them. Collections stay editable forever.
                </p>
                <Button
                  className="mt-6 rounded-full border border-[#d4b8b0] bg-white text-[#4a3538] shadow-sm hover:bg-[#fdf8f6]"
                  asChild
                >
                  <Link href="/sbm/collections/new">Create your first shelf</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
