import { LuxuryMarketingShell } from '@/components/marketing/luxury-marketing-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Overview',
    body: `${SITE_CONFIG.name} respects your privacy. This policy explains what we collect, why we collect it, and the controls available to you. If anything here is unclear, email privacy@meivera.com and we will respond within seven days.`,
  },
  {
    title: 'Information we collect',
    body: 'Account details (name, email, username), content you publish, technical logs (IP address, device type, approximate location derived for fraud prevention), and usage analytics that help us understand feature adoption. Payment data is handled by certified processors—we never store full card numbers on our servers.',
  },
  {
    title: 'How we use information',
    body: 'To operate and secure the platform, personalize discovery, send transactional emails, comply with law, and improve performance. We may use aggregated, de-identified data for public research or marketing narratives.',
  },
  {
    title: 'Sharing & subprocessors',
    body: 'We share data only with vendors who help us run the service (hosting, email, analytics) under strict agreements. We do not sell personal information. A current subprocessor list is available on request.',
  },
  {
    title: 'Retention',
    body: 'We keep account data while your profile is active. Deleted accounts enter a 30-day grace period, after which personal identifiers are purged unless law requires longer retention.',
  },
  {
    title: 'Your rights',
    body: 'Depending on your region you may access, correct, export, or delete personal data, and object to certain processing. Use in-app settings or contact privacy@meivera.com to exercise these rights.',
  },
  {
    title: 'International transfers',
    body: 'If you are outside the region where our primary servers reside, we rely on standard contractual clauses and supplementary measures to protect your data during transfer.',
  },
  {
    title: 'Updates',
    body: 'We will notify you of material changes via email or an in-product banner. Continued use after the effective date constitutes acceptance unless prohibited by law.',
  },
]

export default function PrivacyPage() {
  return (
    <LuxuryMarketingShell
      eyebrow="Legal"
      title="Privacy policy"
      description={`How ${SITE_CONFIG.name} collects, uses, and safeguards personal information across our websites, applications, and APIs.`}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-[#8f6f72]">Effective 13 April 2026</p>
      <div className="mt-10 space-y-6">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-[1.5rem] border border-[#ead9d3] bg-white/90 p-6 shadow-sm sm:p-8"
          >
            <h2 className="font-serif text-xl font-medium text-[#1a1615]">{section.title}</h2>
            <p className="mt-4 text-sm leading-[1.85] text-[#4a403e]">{section.body}</p>
          </section>
        ))}
      </div>
    </LuxuryMarketingShell>
  )
}
