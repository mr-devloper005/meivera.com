import { LuxuryMarketingShell } from '@/components/marketing/luxury-marketing-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const licenses = [
  { name: 'Next.js', license: 'MIT License', holder: 'Vercel, Inc.' },
  { name: 'React', license: 'MIT License', holder: 'Meta Platforms, Inc.' },
  { name: 'Tailwind CSS', license: 'MIT License', holder: 'Tailwind Labs Inc.' },
  { name: 'Radix UI', license: 'MIT License', holder: 'WorkOS' },
  { name: 'Lucide Icons', license: 'ISC License', holder: 'Lucide Contributors' },
  { name: 'Framer Motion', license: 'MIT License', holder: 'Framer B.V.' },
  { name: 'date-fns', license: 'MIT License', holder: 'Sasha Koss & Lesha Koss' },
  { name: 'Zod', license: 'MIT License', holder: 'Colin McDonnell' },
]

export default function LicensesPage() {
  return (
    <LuxuryMarketingShell
      eyebrow="Open source"
      title="Licenses & notices"
      description={`${SITE_CONFIG.name} is built on extraordinary open-source work. Below are the primary packages shipped in our web client, each used under the terms of its respective license.`}
    >
      <p className="text-sm leading-relaxed text-[#4a403e]">
        Full dependency trees include additional packages; source code and complete attribution files are available in the repository
        root. Contact opensource@meivera.com for compliance questions.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {licenses.map((row) => (
          <div
            key={row.name}
            className="rounded-[1.5rem] border border-[#ead9d3] bg-gradient-to-br from-white to-[#fdf9f6] p-6 shadow-sm"
          >
            <h2 className="font-serif text-lg font-medium text-[#1a1615]">{row.name}</h2>
            <p className="mt-2 text-sm text-[#8f4f5c]">{row.license}</p>
            <p className="mt-1 text-xs text-[#8f6f72]">{row.holder}</p>
          </div>
        ))}
      </div>
    </LuxuryMarketingShell>
  )
}
