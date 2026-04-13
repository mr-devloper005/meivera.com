import Link from 'next/link'
import { LuxuryMarketingShell, luxuryBtnOutline, luxuryBtnPrimary } from '@/components/marketing/luxury-marketing-shell'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'
import { BookOpen, Compass, LifeBuoy, MessageCircle } from 'lucide-react'

const topics = [
  {
    icon: Compass,
    title: 'First steps',
    body: 'Create your profile, verify your email, and tour the bookmark composer. We walk you through saving your first link and choosing visibility.',
  },
  {
    icon: BookOpen,
    title: 'Collections & shelves',
    body: 'Group bookmarks by client, mood, or research thread. Learn how to invite collaborators and export a read-only snapshot.',
  },
  {
    icon: MessageCircle,
    title: 'Community etiquette',
    body: 'Guidelines for thoughtful comments, crediting original authors, and reporting content that breaks our trust standards.',
  },
  {
    icon: LifeBuoy,
    title: 'Billing & listings',
    body: 'Understand promoted placements, invoice cadence, and how to pause campaigns without losing historical analytics.',
  },
]

export default function HelpPage() {
  return (
    <LuxuryMarketingShell
      eyebrow="Support"
      title="Help center"
      description="Guides written like a concierge note—clear, calm, and free of jargon. Search the FAQ or reach our team for anything that needs a human touch."
      actions={
        <>
          <Button className={luxuryBtnOutline} asChild>
            <Link href="/status">System status</Link>
          </Button>
          <Button className={luxuryBtnPrimary} asChild>
            <Link href="/contact">Contact support</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h2 className="font-serif text-2xl font-medium text-[#1a1615]">Popular topics</h2>
          <p className="mt-2 text-sm text-[#4a403e]">Start here—each card links to deeper articles inside the same help library.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {topics.map((topic) => (
              <div
                key={topic.title}
                className="rounded-[1.5rem] border border-[#ead9d3] bg-white/90 p-6 shadow-sm transition hover:border-[#d4b8b0]"
              >
                <topic.icon className="h-5 w-5 text-[#b76e79]" strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-lg font-medium text-[#1a1615]">{topic.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a403e]">{topic.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="h-fit rounded-[1.75rem] border border-[#ead9d3] bg-gradient-to-b from-white to-[#fdf9f6] p-6 shadow-sm sm:p-8">
          <h2 className="font-serif text-xl font-medium text-[#1a1615]">Frequently asked</h2>
          <p className="mt-2 text-sm text-[#4a403e]">Straight answers to the questions we see every week.</p>
          <Accordion type="single" collapsible className="mt-6 w-full">
            {mockFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-[#ead9d3]">
                <AccordionTrigger className="text-left text-[15px] font-medium text-[#1a1615] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-[#4a403e]">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </LuxuryMarketingShell>
  )
}
