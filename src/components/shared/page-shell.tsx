'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-transparent">
      <NavbarShell />
      <main>
        <section className="border-b border-[var(--border-app)] bg-white/80 backdrop-blur-md">
          <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-[var(--text-heading)]">{title}</h1>
                {description && <p className="mt-2 max-w-2xl text-[15px] leading-7 text-[var(--text-body)]">{description}</p>}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
