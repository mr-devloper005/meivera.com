import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteContent } from '@/config/site.content'

export function CTASection() {
  return (
    <section className="pb-24 pt-12 sm:pb-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border-app)] bg-[linear-gradient(135deg,#2C2C2C_0%,#612D53_52%,#853953_100%)] p-8 text-white shadow-[0_24px_70px_rgba(28,33,40,0.18)] sm:p-12 lg:p-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(133,57,83,0.42), transparent 40%), radial-gradient(circle at 80% 60%, rgba(97,45,83,0.4), transparent 42%)',
            }}
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
              <Sparkles className="h-4 w-4 text-[var(--sbm-green)]" />
              {siteContent.cta.badge}
            </div>

            <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl lg:text-[2.75rem]">{siteContent.cta.title}</h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">{siteContent.cta.description}</p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-12 rounded-lg bg-[var(--sbm-green)] px-7 text-sm font-semibold text-white shadow-lg hover:bg-[var(--sbm-green-dim)]"
              >
                <Link href={siteContent.cta.primaryCta.href}>
                  {siteContent.cta.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 rounded-lg border-white/25 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
              >
                <Link href={siteContent.cta.secondaryCta.href}>{siteContent.cta.secondaryCta.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
