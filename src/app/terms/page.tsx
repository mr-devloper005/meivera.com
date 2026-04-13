import { LuxuryMarketingShell } from '@/components/marketing/luxury-marketing-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Agreement',
    body: `By accessing ${SITE_CONFIG.name} you agree to these terms and our Privacy Policy. If you disagree, please discontinue use immediately.`,
  },
  {
    title: 'Accounts & security',
    body: 'You are responsible for safeguarding credentials and for all activity under your account. Notify support if you suspect unauthorized access. We may suspend accounts that pose risk to the community.',
  },
  {
    title: 'Content & licenses',
    body: 'You retain ownership of content you post. You grant us a worldwide, non-exclusive license to host, display, distribute, and promote that content solely to operate and improve the service. You represent that you have the rights to grant this license.',
  },
  {
    title: 'Acceptable use',
    body: 'No harassment, hate speech, illegal activity, malware, scraping that degrades service, or attempts to bypass security. We may remove content or accounts that violate these rules or applicable law.',
  },
  {
    title: 'Marketplace & payments',
    body: 'Paid features, listings, or promotions are subject to additional terms presented at checkout. Fees are non-refundable except where required by law or explicitly stated otherwise.',
  },
  {
    title: 'Disclaimers',
    body: 'The service is provided “as is.” We disclaim warranties to the fullest extent permitted by law. We do not guarantee uninterrupted availability or error-free operation.',
  },
  {
    title: 'Limitation of liability',
    body: 'To the maximum extent permitted by law, our aggregate liability arising from these terms is limited to the greater of (a) amounts you paid us in the twelve months preceding the claim or (b) one hundred dollars.',
  },
  {
    title: 'Governing law',
    body: 'These terms are governed by the laws of the jurisdiction stated in your order form or, if none, the laws applicable to our primary operating entity, without regard to conflict-of-law rules.',
  },
  {
    title: 'Contact',
    body: 'Questions about these terms: legal@meivera.com',
  },
]

export default function TermsPage() {
  return (
    <LuxuryMarketingShell
      eyebrow="Legal"
      title="Terms of service"
      description={`Rules for using ${SITE_CONFIG.name}, including acceptable use, content licensing, and limitations of liability.`}
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
