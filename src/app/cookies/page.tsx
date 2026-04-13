import { LuxuryMarketingShell } from '@/components/marketing/luxury-marketing-shell'
import { SITE_CONFIG } from '@/lib/site-config'
import Link from 'next/link'

const sections = [
  {
    title: 'What cookies are',
    body: 'Cookies are small text files stored on your device. They help us remember sessions, protect against abuse, and understand how features perform.',
  },
  {
    title: 'Strictly necessary',
    body: 'Authentication tokens, CSRF protection, load balancing, and security telemetry. These cannot be disabled without breaking core functionality.',
  },
  {
    title: 'Analytics & product insights',
    body: 'Anonymous usage events (page views, feature toggles) aggregated in dashboards. IP addresses are truncated where possible. You may opt out via the cookie banner or browser settings.',
  },
  {
    title: 'Preferences',
    body: 'Theme choices, saved filters, and language selections persist through preference cookies so your workspace feels familiar on return visits.',
  },
  {
    title: 'Marketing (optional)',
    body: 'If enabled, we may set cookies to attribute campaigns and measure conversions. We never sell this data. Disable anytime in account settings.',
  },
  {
    title: 'Managing cookies',
    body: 'Use our in-product controls, industry opt-out tools, or your browser’s privacy settings. Note that blocking all cookies may limit certain experiences.',
  },
]

export default function CookiesPage() {
  return (
    <LuxuryMarketingShell
      eyebrow="Legal"
      title="Cookie policy"
      description={`Transparent detail about the cookies and similar technologies we use across ${SITE_CONFIG.name} web and embedded experiences.`}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-[#8f6f72]">Effective 13 April 2026</p>
      <p className="mt-4 text-sm leading-relaxed text-[#4a403e]">
        For how we process personal data more broadly, see our{' '}
        <Link href="/privacy" className="font-semibold text-[#8f4f5c] underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
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
