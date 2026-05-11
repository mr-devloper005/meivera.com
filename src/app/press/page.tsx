'use client'

import { LuxuryMarketingShell, luxuryBtnPrimary } from '@/components/marketing/luxury-marketing-shell'
import { Button } from '@/components/ui/button'
import { mockPressCoverage } from '@/data/mock-data'

export default function PressPage() {

  return (
    <LuxuryMarketingShell
      eyebrow="Media room"
      title="Press & brand"
      description="Editorial‑grade assets, talking points, and recent coverage. We respond to press inquiries within one business day and love collaborating on thoughtful stories about the future of curated discovery."
      actions={
        <>
          <Button className={luxuryBtnPrimary} asChild>
            <a href="/favicon.png" download>
              Download mark
            </a>
          </Button>
        </>
      }
    >
      <div>
        <div>
          <h2 className="font-serif text-2xl font-medium text-[#1a1615]">Recent coverage</h2>
          <p className="mt-2 text-sm text-[#4a403e]">Highlights from partners who explored our approach to calm discovery.</p>
          <div className="mt-8 space-y-4">
            {mockPressCoverage.map((item) => (
              <div
                key={item.id}
                className="rounded-[1.5rem] border border-[#ead9d3] bg-white/85 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b76e79]">{item.outlet}</div>
                <p className="mt-2 font-serif text-lg font-medium leading-snug text-[#1a1615]">{item.headline}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LuxuryMarketingShell>
  )
}
