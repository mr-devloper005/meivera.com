import Link from "next/link";
import { LuxuryMarketingShell, luxuryBtnOutline, luxuryBtnPrimary } from "@/components/marketing/luxury-marketing-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";
import { Clock, Globe, HeartHandshake, Laptop } from "lucide-react";

const roles = [
  {
    title: "Principal product designer",
    location: "Remote · EU or US",
    type: "Full-time",
    level: "Lead",
    blurb: "Shape the visual language of discovery—from bookmark cards to editorial layouts—with systems thinking and a poet’s eye.",
  },
  {
    title: "Staff frontend engineer",
    location: "New York or remote",
    type: "Full-time",
    level: "Senior",
    blurb: "Own performance, accessibility, and motion across Next.js surfaces; partner closely with design on micro‑delight.",
  },
  {
    title: "Community curator",
    location: "Remote",
    type: "Part-time",
    level: "Mid",
    blurb: "Welcome new creators, moderate with empathy, and translate member feedback into crisp product narratives.",
  },
  {
    title: "Developer experience advocate",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    blurb: "Document APIs, craft sample apps, and make third‑party integrations feel as polished as our first‑party flows.",
  },
];

const benefits = [
  { icon: Globe, text: "Remote‑first with quarterly in‑person salons in Lisbon, NYC, or Singapore." },
  { icon: HeartHandshake, text: "Inclusive health coverage, mental wellness stipend, and caregiver leave." },
  { icon: Laptop, text: "Top‑tier hardware, ergonomic budget, and a learning fund for courses & conferences." },
  { icon: Clock, text: "Async‑friendly hours, meeting‑light culture, and protected focus blocks on Wednesdays." },
];

export default function CareersPage() {
  return (
    <LuxuryMarketingShell
      eyebrow="Join us"
      title={`Careers at ${SITE_CONFIG.name}`}
      description={`Help us craft the next chapter of calm, curated discovery. ${SITE_CONFIG.name} is hiring kind, rigorous humans who care about typography, trust, and the long arc of community.`}
      actions={
        <>
          <Button className={luxuryBtnOutline} asChild>
            <Link href="/community">Community pulse</Link>
          </Button>
          <Button className={luxuryBtnPrimary} asChild>
            <Link href="/contact">Introduce yourself</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h2 className="font-serif text-2xl font-medium text-[#1a1615]">Open roles</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#4a403e]">
            We review applications weekly. Share a short note, three work samples, and the craft moment you are most proud of—no
            boilerplate cover letters required.
          </p>
          <div className="mt-8 space-y-5">
            {roles.map((role) => (
              <div
                key={role.title}
                className="rounded-[1.5rem] border border-[#ead9d3] bg-white/85 p-6 shadow-sm transition hover:border-[#d4b8b0]"
              >
                <div className="flex flex-wrap gap-2">
                  <Badge className="rounded-full border-0 bg-[#fdf3f0] text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8f4f5c]">
                    {role.level}
                  </Badge>
                  <Badge variant="outline" className="rounded-full border-[#d4b8b0] text-[10px] uppercase tracking-[0.12em]">
                    {role.type}
                  </Badge>
                </div>
                <h3 className="mt-3 font-serif text-xl font-medium text-[#1a1615]">{role.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#8f6f72]">{role.location}</p>
                <p className="mt-4 text-sm leading-relaxed text-[#4a403e]">{role.blurb}</p>
                <Button className={`${luxuryBtnOutline} mt-5`} asChild>
                  <Link href="/contact">Apply for this role</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-[1.75rem] border border-[#ead9d3] bg-gradient-to-b from-[#fffdfb] to-[#faf5f1] p-8 shadow-[0_16px_40px_rgba(74,52,56,0.05)]">
          <h2 className="font-serif text-xl font-medium text-[#1a1615]">Why people stay</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#4a403e]">
            We are building software that feels like a well‑appointed studio: daylight, linen textures, and enough silence to think.
          </p>
          <ul className="mt-8 space-y-5">
            {benefits.map((b) => (
              <li key={b.text} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#b76e79] shadow-sm">
                  <b.icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <p className="text-sm leading-relaxed text-[#4a403e]">{b.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-[#ead9d3] pt-6 text-xs leading-relaxed text-[#8f6f72]">
            {SITE_CONFIG.name} is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive
            environment for all team members.
          </p>
        </aside>
      </div>
    </LuxuryMarketingShell>
  );
}
