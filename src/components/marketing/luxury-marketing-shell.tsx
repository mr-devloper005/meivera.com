import type { ReactNode } from 'react'
import { Fraunces, Manrope } from 'next/font/google'

import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-luxury-display',
})

const sans = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-luxury-sans',
})

export const luxuryBtnPrimary =
  'rounded-full bg-gradient-to-r from-[#b76e79] to-[#8f4f5c] px-6 text-white shadow-md transition hover:opacity-95 hover:shadow-lg'

export const luxuryBtnOutline =
  'rounded-full border border-[#d4b8b0] bg-white/90 text-[#4a3538] shadow-sm transition hover:border-[#b76e79]/50 hover:bg-[#fdf8f6]'

export function LuxuryMarketingShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-screen bg-[#fdfbf8] text-[#2c2624] ${sans.className}`}
    >
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-[#ead9d3] bg-gradient-to-b from-[#fdfbf8] via-[#faf5f1] to-[#f4ebe5]">
          <div className="pointer-events-none absolute -right-20 top-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(183,110,121,0.14),transparent_68%)]" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(196,165,116,0.16),transparent_70%)]" />
          <div className="pointer-events-none absolute left-1/2 top-8 h-px w-[min(100%,32rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#c4a574]/40 to-transparent" />
          <div className="relative mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                {eyebrow ? (
                  <p
                    className={`${display.className} text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8f6f72]`}
                  >
                    {eyebrow}
                  </p>
                ) : null}
                <h1
                  className={`${display.className} mt-3 text-[2.15rem] font-medium leading-[1.15] tracking-tight text-[#1a1615] sm:text-5xl sm:leading-[1.1]`}
                >
                  {title}
                </h1>
                {description ? (
                  <p className="mt-5 max-w-xl text-[15px] leading-[1.75] text-[#4a403e]">{description}</p>
                ) : null}
              </div>
              {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
            </div>
          </div>
        </section>
        <section className="relative mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-14">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
