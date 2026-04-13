import Link from "next/link";
import { LuxuryMarketingShell, luxuryBtnOutline, luxuryBtnPrimary } from "@/components/marketing/luxury-marketing-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { Sparkles, Leaf, Heart, Shield } from "lucide-react";

const milestones = [
  { year: "2023", title: "A quieter corner of the web", copy: "We set out to prove discovery could feel intimate, editorial, and human—not algorithmically loud." },
  { year: "2024", title: "Collections take shape", copy: "Creators began weaving bookmarks, profiles, and stories into shareable rooms others could revisit." },
  { year: "2025", title: "Trust at the center", copy: "Verification, transparent policies, and thoughtful moderation became non‑negotiable pillars of the experience." },
  { year: "2026", title: "Where we are today", copy: `${SITE_CONFIG.name} is a sanctuary for curated knowledge—rose‑lit, calm, and built to last.` },
];

const pillars = [
  {
    icon: Leaf,
    title: "Organic growth",
    body: "We nurture communities the way a garden grows—slowly, intentionally, with room to breathe between announcements.",
  },
  {
    icon: Heart,
    title: "People first",
    body: "Every surface is designed around real readers and makers: legible type, soft contrast, and zero dark patterns.",
  },
  {
    icon: Shield,
    title: "Quiet integrity",
    body: "Your data and creative work stay yours. We collect only what powers the product and say so in plain language.",
  },
  {
    icon: Sparkles,
    title: "Everyday luxury",
    body: "Premium is not excess—it is care. Micro‑interactions, typography, and pacing signal respect for your attention.",
  },
];

export default function AboutPage() {
  return (
    <LuxuryMarketingShell
      eyebrow="Our story"
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a refined platform where bookmarks, profiles, and editorial collections live together—thoughtful discovery for people who value quality over noise.`}
      actions={
        <>
          <Button className={luxuryBtnOutline} asChild>
            <Link href="/team">Meet the team</Link>
          </Button>
          <Button className={luxuryBtnPrimary} asChild>
            <Link href="/contact">Speak with us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div className="space-y-6">
          <Badge className="rounded-full border border-[#ead9d3] bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8f6f72]">
            Philosophy
          </Badge>
          <p className="font-serif text-2xl font-medium leading-snug text-[#1a1615]">
            We believe the internet still has rooms worth lingering in—places where taste, trust, and texture matter.
          </p>
          <p className="text-[15px] leading-[1.8] text-[#4a403e]">
            {SITE_CONFIG.name} brings publishing, social bookmarking, and community signals into one serene workspace. Whether you are
            cataloging research, showcasing a portfolio, or inviting others into a shared shelf of inspiration, the interface stays
            whisper‑soft so your work can speak loudly.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { n: "12k+", l: "Creators" },
              { n: "180k+", l: "Bookmarks" },
              { n: "8.6k+", l: "Listings" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-[#ead9d3] bg-white/70 px-3 py-4 text-center shadow-sm"
              >
                <div className="font-serif text-xl font-medium text-[#1a1615]">{s.n}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-[#8f6f72]">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-[#ead9d3] bg-gradient-to-br from-white to-[#faf5f1] p-8 shadow-[0_20px_50px_rgba(74,52,56,0.06)]">
          <h2 className="font-serif text-xl font-medium text-[#1a1615]">Milestones</h2>
          <ul className="mt-6 space-y-6">
            {milestones.map((m) => (
              <li key={m.year} className="border-l-2 border-[#c4a574]/50 pl-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b76e79]">{m.year}</span>
                <p className="mt-1 font-medium text-[#1a1615]">{m.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#4a403e]">{m.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-center font-serif text-3xl font-medium text-[#1a1615]">What guides us</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-relaxed text-[#4a403e]">
          Four principles keep product, brand, and community aligned—so every release feels cohesive, not chaotic.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="flex gap-4 rounded-[1.5rem] border border-[#ead9d3] bg-white/80 p-6 shadow-sm transition hover:border-[#d4b8b0]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fdf3f0] text-[#b76e79]">
                <p.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[#1a1615]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a403e]">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <h2 className="font-serif text-3xl font-medium text-[#1a1615]">Faces behind the craft</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#4a403e]">
          A distributed studio of designers, engineers, and community stewards—united by the belief that software should feel as
          considered as a handwritten note.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-[1.5rem] border border-[#ead9d3] bg-gradient-to-b from-white to-[#fdf9f6] p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14 border border-[#ead9d3]">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-[#1a1615]">{member.name}</p>
                  <p className="text-xs text-[#8f6f72]">{member.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#4a403e]">{member.bio}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.12em] text-[#b76e79]/80">{member.location}</p>
            </div>
          ))}
        </div>
      </div>
    </LuxuryMarketingShell>
  );
}
