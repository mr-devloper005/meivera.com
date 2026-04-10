import { ContentImage } from "@/components/shared/content-image";
import Link from "next/link";
import { ExternalLink, FileText, Mail, MapPin, Tag } from "lucide-react";
import type { SitePost } from "@/lib/site-connector";
import { CATEGORY_OPTIONS, normalizeCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";

type ListingContent = {
  location?: string;
  category?: string;
  description?: string;
  email?: string;
};

const stripHtml = (value?: string | null) =>
  (value || "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getExcerpt = (value?: string | null, maxLength = 140) => {
  const text = stripHtml(value);
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
};

const getContent = (post: SitePost): ListingContent => {
  const content = post.content && typeof post.content === "object" ? post.content : {};
  return content as ListingContent;
};

const getImageUrl = (post: SitePost, content: ListingContent) => {
  const media = Array.isArray(post.media) ? post.media : [];
  const mediaUrl = media[0]?.url;
  if (mediaUrl) return mediaUrl;

  const contentAny = content as Record<string, unknown>;
  const contentImage = typeof contentAny.image === "string" ? contentAny.image : null;
  if (contentImage) return contentImage;

  const contentImages = Array.isArray(contentAny.images) ? contentAny.images : [];
  const firstImage = contentImages.find((value) => typeof value === "string");
  if (firstImage) return firstImage as string;

  const contentLogo = typeof contentAny.logo === "string" ? contentAny.logo : null;
  if (contentLogo) return contentLogo;

  return "/placeholder.svg?height=640&width=960";
};

export function TaskPostCard({
  post,
  href,
  taskKey,
  compact,
}: {
  post: SitePost;
  href: string;
  taskKey?: TaskKey;
  compact?: boolean;
}) {
  const content = getContent(post);
  const image = getImageUrl(post, content);
  const rawCategory = content.category || post.tags?.[0] || "Post";
  const normalizedCategory = normalizeCategory(rawCategory);
  const category =
    CATEGORY_OPTIONS.find((item) => item.slug === normalizedCategory)?.name || rawCategory;

  const variant = taskKey || "listing";
  const isBookmarkVariant = variant === "sbm" || variant === "social";
  const imageAspect =
    variant === "image"
      ? "aspect-[4/5]"
      : variant === "article"
        ? "aspect-[16/10]"
        : variant === "pdf"
          ? "aspect-[4/5]"
          : variant === "classified"
            ? "aspect-[16/11]"
            : "aspect-[4/3]";

  const altText = `${post.title} ${category} ${variant === "listing" ? "business listing" : variant} image`;
  const imageSizes =
    variant === "article"
      ? "(max-width: 640px) 90vw, (max-width: 1024px) 48vw, 420px"
      : variant === "image"
        ? "(max-width: 640px) 82vw, (max-width: 1024px) 34vw, 320px"
        : "(max-width: 640px) 85vw, (max-width: 1024px) 42vw, 340px";

  const contentLogo =
    typeof (content as Record<string, unknown>).logo === "string"
      ? ((content as Record<string, unknown>).logo as string)
      : null;

  if (isBookmarkVariant) {
    return (
      <Link
        href={href}
        className="group sbm-card-surface flex h-full flex-row items-start gap-4 overflow-hidden rounded-xl p-5 transition duration-300 hover:-translate-y-0.5"
      >
        <div className="mt-0.5 rounded-xl bg-[rgba(133,57,83,0.14)] p-2.5 text-[var(--sbm-blue-dim)] transition group-hover:bg-[var(--sbm-blue)] group-hover:text-white">
          <ExternalLink className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-[rgba(97,45,83,0.14)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sbm-green-dim)]">
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            {content.location ? (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {content.location}
              </span>
            ) : null}
          </div>
          <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-[var(--text-heading)] group-hover:text-[var(--sbm-blue-dim)]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-7 text-[var(--text-body)]">
            {getExcerpt(content.description || post.summary, compact ? 120 : 180) || "Explore this bookmark."}
          </p>
          {content.email ? (
            <div className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {content.email}
            </div>
          ) : null}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group sbm-card-surface flex h-full flex-col overflow-hidden rounded-xl transition duration-300 hover:-translate-y-0.5"
    >
      <div className={`relative ${imageAspect} overflow-hidden bg-[var(--surface-muted)]`}>
        <ContentImage
          src={image}
          alt={altText}
          fill
          sizes={imageSizes}
          quality={75}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          intrinsicWidth={960}
          intrinsicHeight={720}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,33,40,0.5)] via-transparent to-transparent opacity-90" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-[rgba(255,255,255,0.92)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-heading)] shadow-sm backdrop-blur-sm">
          <Tag className="h-3.5 w-3.5 text-[var(--sbm-blue)]" />
          {category}
        </span>
        {variant === "pdf" && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-heading)] shadow-sm">
            <FileText className="h-3.5 w-3.5" />
            PDF
          </span>
        )}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${compact ? "py-4" : ""}`}>
        <div className="flex items-start gap-3">
          {contentLogo ? (
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[var(--border-app)] bg-white shadow-sm">
              <ContentImage
                src={contentLogo}
                alt={`${post.title} thumbnail`}
                fill
                className="object-cover"
                sizes="44px"
                intrinsicWidth={88}
                intrinsicHeight={88}
              />
            </div>
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border-app)] bg-[var(--surface-muted)] text-sm font-bold text-[var(--text-heading)]">
              {post.title.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3
                className={`line-clamp-2 font-semibold leading-snug text-[var(--text-heading)] group-hover:text-[var(--sbm-blue-dim)] ${variant === "article" ? "text-[1.2rem]" : "text-base"}`}
              >
                {post.title}
              </h3>
              <span className="shrink-0 text-muted-foreground opacity-60" aria-hidden>
                ⋯
              </span>
            </div>
            <p
              className={`mt-2 text-sm leading-7 text-[var(--text-body)] ${variant === "article" ? "line-clamp-3" : "line-clamp-2"}`}
            >
              {getExcerpt(content.description || post.summary) || "Explore this post."}
            </p>
          </div>
        </div>
        <div className="mt-auto pt-4">
          {content.location && (
            <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {content.location}
            </div>
          )}
          {content.email && (
            <div className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {content.email}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
