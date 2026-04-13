import { LuxuryMarketingShell, luxuryBtnOutline } from '@/components/marketing/luxury-marketing-shell'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Activity, CheckCircle2, Radio } from 'lucide-react'

const services = [
  { name: 'Web application', detail: 'Dashboards, profiles, and bookmark tools', status: 'Operational', latency: '42 ms p95' },
  { name: 'Search & indexing', detail: 'Full-text discovery across posts', status: 'Operational', latency: 'Under SLA' },
  { name: 'Media CDN', detail: 'Images, avatars, and attachments', status: 'Operational', latency: 'Global edge' },
  { name: 'Authentication', detail: 'Sessions, OAuth, and recovery', status: 'Operational', latency: '99.99% monthly' },
]

const incidents = [
  { date: 'Mar 12, 2026', title: 'Delayed push notifications', window: '14 minutes', status: 'Resolved', note: 'Provider webhook backlog; mitigated with redundant queue.' },
  { date: 'Feb 22, 2026', title: 'Search indexing lag', window: '36 minutes', status: 'Resolved', note: 'Rebalanced workers; added automatic scale-up triggers.' },
  { date: 'Jan 8, 2026', title: 'Scheduled database maintenance', window: 'Planned', status: 'Completed', note: 'Zero downtime failover verified post-migration.' },
]

export default function StatusPage() {
  return (
    <LuxuryMarketingShell
      eyebrow="Uptime"
      title="System status"
      description="Live health for every surface you rely on. We publish incidents within five minutes of detection and follow up with a short postmortem when customer impact occurred."
      actions={
        <Button className={luxuryBtnOutline} asChild>
          <Link href="/help">Report an issue</Link>
        </Button>
      }
    >
      <div className="mb-10 flex flex-wrap items-center gap-4 rounded-[1.5rem] border border-[#c9e8d5] bg-[#f4fbf7] px-5 py-4 text-sm text-[#1f3d2b]">
        <span className="flex items-center gap-2 font-medium">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3d9a6b] opacity-40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#3d9a6b]" />
          </span>
          All systems operational
        </span>
        <span className="text-[#2d5c45]/80">Last updated {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.name}
            className="rounded-[1.5rem] border border-[#ead9d3] bg-white/90 p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-serif text-lg font-medium text-[#1a1615]">{service.name}</h2>
                <p className="mt-1 text-xs text-[#8f6f72]">{service.detail}</p>
              </div>
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#3d9a6b]" strokeWidth={1.5} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#f4fbf7] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2d5c45]">
                {service.status}
              </span>
              <span className="rounded-full border border-[#ead9d3] px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-[#8f6f72]">
                {service.latency}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <div className="flex items-center gap-2 text-[#b76e79]">
          <Activity className="h-5 w-5" strokeWidth={1.5} />
          <h2 className="font-serif text-2xl font-medium text-[#1a1615]">Incident history</h2>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-[#4a403e]">
          Transparency matters. Entries stay visible for twelve months so you can audit reliability alongside your own planning.
        </p>
        <div className="mt-8 space-y-4">
          {incidents.map((incident) => (
            <div
              key={incident.title}
              className="rounded-[1.5rem] border border-[#ead9d3] bg-gradient-to-r from-white to-[#fdf9f6] p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8f6f72]">
                <Radio className="h-3.5 w-3.5 text-[#b76e79]" />
                {incident.date}
                <span className="text-[#d4b8b0]">·</span>
                {incident.window}
              </div>
              <p className="mt-2 font-medium text-[#1a1615]">{incident.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#4a403e]">{incident.note}</p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#3d9a6b]">{incident.status}</p>
            </div>
          ))}
        </div>
      </div>
    </LuxuryMarketingShell>
  )
}
