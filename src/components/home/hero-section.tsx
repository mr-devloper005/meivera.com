"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentImage } from "@/components/shared/content-image";
import { SITE_CONFIG } from "@/lib/site-config";
import { siteContent } from "@/config/site.content";

const FALLBACK_IMAGE = "/placeholder.svg?height=1400&width=2400";

export function HeroSection({ images }: { images: string[] }) {
  const slides = useMemo(() => {
    const valid = images.filter(Boolean);
    return valid.length ? valid.slice(0, 3) : [FALLBACK_IMAGE];
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides]);

  return (
    <section className="relative overflow-hidden border-b border-[var(--border-app)] bg-[var(--surface-muted)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(133,57,83,0.08),transparent_42%),radial-gradient(circle_at_85%_10%,rgba(97,45,83,0.08),transparent_38%)]" />
      <div className="relative mx-auto max-w-[1400px] px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-12">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3 lg:mb-9">
          <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(133,57,83,0.2)] bg-white/80 px-4 py-1.5 text-sm font-semibold text-[var(--text-heading)] shadow-sm backdrop-blur-sm sm:text-base">
            {siteContent.hero.discoverEyebrow}
            <ChevronDown className="h-4 w-4 shrink-0 text-[var(--sbm-blue)]" aria-hidden />
          </p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-12">
          <div className="max-w-2xl lg:max-w-none">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(133,57,83,0.2)] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--sbm-blue-dim)] shadow-sm">
              <Sparkles className="h-4 w-4 text-[var(--sbm-blue)]" />
              {siteContent.hero.badge}
            </div>

            <h1 className="mt-5 text-balance text-4xl font-black leading-[1.05] tracking-tight text-[var(--text-heading)] sm:text-5xl lg:text-[3.35rem]">
              {siteContent.hero.title[0]}{" "}
              <span className="text-[var(--sbm-blue)]">{siteContent.hero.title[1]}</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--text-body)] sm:text-[17px] sm:leading-8">
              {siteContent.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-xl bg-[var(--sbm-blue)] px-7 text-sm font-semibold text-white shadow-sm hover:bg-[var(--sbm-blue-dim)]"
              >
                <Link href={siteContent.hero.primaryCta.href}>
                  {siteContent.hero.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-[var(--border-app)] bg-white px-7 text-sm font-semibold text-[var(--text-heading)] hover:bg-[rgba(97,45,83,0.08)]"
              >
                <Link href={siteContent.hero.secondaryCta.href}>{siteContent.hero.secondaryCta.label}</Link>
              </Button>
            </div>

            <div className="mt-9">
              <form
                action="/search"
                className="flex min-h-[3.35rem] flex-1 overflow-hidden rounded-2xl border border-[var(--border-app)] bg-white shadow-[0_10px_24px_rgba(44,44,44,0.08)]"
              >
                <div className="relative flex min-w-0 flex-1 items-center">
                  <Search className="pointer-events-none absolute left-4 h-5 w-5 text-[var(--sbm-blue-dim)]/70" />
                  <input
                    name="q"
                    placeholder={siteContent.hero.searchPlaceholder}
                    className="h-full w-full border-0 bg-transparent py-3 pl-12 pr-4 text-base text-[var(--text-heading)] outline-none placeholder:text-[var(--text-body)]/60"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-auto shrink-0 rounded-none rounded-r-2xl bg-[var(--sbm-blue-dim)] px-6 text-sm font-semibold text-white hover:bg-[var(--sbm-blue)] sm:px-8"
                >
                  Search
                </Button>
              </form>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {siteContent.hero.filterChips.map((chip) => (
                <Link
                  key={chip.href}
                  href={chip.href}
                  className="inline-flex items-center rounded-xl border border-[var(--border-app)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-body)] shadow-sm transition hover:border-[rgba(133,57,83,0.35)] hover:bg-[rgba(97,45,83,0.08)] hover:text-[var(--sbm-blue-dim)]"
                >
                  {chip.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[var(--border-app)] pt-6 text-sm text-[var(--text-body)]">
              <span className="font-semibold uppercase tracking-[0.16em] text-[var(--text-heading)]">{siteContent.hero.focusLabel}</span>
              <Link href="/sbm" className="font-medium hover:text-[var(--sbm-blue-dim)]">
                Bookmarks
              </Link>
              <span className="text-muted-foreground">·</span>
              <Link href="/profile" className="font-medium hover:text-[var(--sbm-blue-dim)]">
                Profiles
              </Link>
              <span className="text-muted-foreground">·</span>
              <Link href="/sbm/collections" className="font-medium hover:text-[var(--sbm-blue-dim)]">
                Collections
              </Link>
              <span className="text-muted-foreground">·</span>
              <Link href="/search" className="font-medium hover:text-[var(--sbm-blue-dim)]">
                Search
              </Link>
            </div>
          </div>

          <div className="relative lg:pl-2">
            <div className="overflow-hidden rounded-[1.35rem] border border-[var(--border-app)] bg-white p-3 shadow-[0_14px_36px_rgba(44,44,44,0.1)] sm:p-4">
              <div className="relative flex items-center gap-3 rounded-xl border border-[var(--border-app)] bg-[var(--surface-muted)] px-3 py-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-sm font-bold text-[var(--sbm-blue)] shadow-sm">
                  {SITE_CONFIG.name.slice(0, 1)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[var(--text-heading)]">{SITE_CONFIG.name}</p>
                  <p className="text-xs text-muted-foreground">Featured resource preview</p>
                </div>
                <span className="text-muted-foreground">⋯</span>
              </div>
              <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-xl border border-[var(--border-app)] bg-[var(--surface-muted)]">
                <ContentImage
                  key={slides[activeIndex]}
                  src={slides[activeIndex]}
                  alt={`Featured visual ${activeIndex + 1} from ${SITE_CONFIG.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  className="object-cover"
                  intrinsicWidth={1200}
                  intrinsicHeight={900}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,44,44,0.7)] via-[rgba(44,44,44,0.12)] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                  <div className="inline-flex items-center rounded-md bg-white/92 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--sbm-blue-dim)] shadow-sm backdrop-blur-sm">
                    {siteContent.hero.featureCardBadge}
                  </div>
                  <p className="mt-3 max-w-md text-lg font-semibold leading-snug text-white sm:text-xl">
                    {siteContent.hero.featureCardTitle}
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/85">{siteContent.hero.featureCardDescription}</p>
                </div>
              </div>
            </div>

            {slides.length > 1 ? (
              <div className="mt-4 flex items-center justify-center gap-2 lg:justify-start">
                {slides.map((_, index) => (
                  <span
                    key={index}
                    className={`rounded-full transition-all duration-300 ${
                      index === activeIndex ? "h-2.5 w-8 bg-[var(--sbm-blue)]" : "h-2.5 w-2.5 bg-[var(--border-app)]"
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
