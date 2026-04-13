'use client'

import { useState } from 'react'
import Image from 'next/image'
import { LuxuryMarketingShell, luxuryBtnOutline, luxuryBtnPrimary } from '@/components/marketing/luxury-marketing-shell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'
import { Mail, Newspaper } from 'lucide-react'

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <LuxuryMarketingShell
      eyebrow="Media room"
      title="Press & brand"
      description="Editorial‑grade assets, talking points, and recent coverage. We respond to press inquiries within one business day and love collaborating on thoughtful stories about the future of curated discovery."
      actions={
        <>
          <Button className={luxuryBtnOutline} asChild>
            <a href="mailto:press@meivera.com">
              <Mail className="mr-2 h-4 w-4" />
              Press inbox
            </a>
          </Button>
          <Button className={luxuryBtnPrimary} asChild>
            <a href="/favicon.png" download>
              Download mark
            </a>
          </Button>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.75rem] border border-[#ead9d3] bg-gradient-to-b from-white to-[#fdf9f6] p-8 shadow-sm">
          <div className="flex items-center gap-2 text-[#b76e79]">
            <Newspaper className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em]">Press kit</span>
          </div>
          <h2 className="mt-3 font-serif text-2xl font-medium text-[#1a1615]">Logos, product art & guidelines</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4a403e]">
            Use the full Meivera wordmark on light backgrounds; reserve the monogram for social avatars and small UI moments. Please
            maintain clear space equal to the height of the “M” on all sides.
          </p>
          <div className="mt-8 space-y-4">
            {mockPressAssets.map((asset) => (
              <div
                key={asset.id}
                className="rounded-2xl border border-[#ead9d3] bg-white/90 px-5 py-4 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-medium text-[#1a1615]">{asset.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-[#8f6f72]">{asset.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full border-0 bg-[#fdf3f0] text-[10px] uppercase tracking-[0.1em] text-[#8f4f5c]">
                      {asset.fileType}
                    </Badge>
                    <Button size="sm" variant="outline" className={luxuryBtnOutline} onClick={() => setActiveAssetId(asset.id)}>
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className={luxuryBtnPrimary}
                      onClick={() =>
                        toast({
                          title: 'Download started',
                          description: `${asset.title} is downloading.`,
                        })
                      }
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
                <p className="mt-3 text-xs text-[#8f6f72]">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl border-[#ead9d3] bg-[#fdfbf8]">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[#ead9d3] bg-[#faf5f1]">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm leading-relaxed text-[#4a403e]">{activeAsset?.description}</p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" className={luxuryBtnOutline} onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className={luxuryBtnPrimary}
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </LuxuryMarketingShell>
  )
}
