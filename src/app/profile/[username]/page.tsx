import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { siteContent } from "@/config/site.content";
import { MapPin, Globe, ExternalLink, Tag } from "lucide-react";
import { ShareButton } from "@/components/shared/share-button";

export const revalidate = 3;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }
  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const category = (content.category as string | undefined) || "Food";
  const location = (content.location as string | undefined) || (content.address as string | undefined);
  const suggestedArticles = await fetchTaskPosts("article", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-transparent">
      <NavbarShell />
      <main className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />
        <Card className="overflow-hidden border-border bg-gradient-to-br from-card to-muted/30 shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
              {/* Circular Logo/Image */}
              <div className="flex-shrink-0">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-background bg-muted shadow-lg ring-2 ring-border md:h-36 md:w-36">
                  {logoUrl ? (
                    <ContentImage
                      src={logoUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="144px"
                      intrinsicWidth={144}
                      intrinsicHeight={144}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-3xl font-bold text-primary md:text-4xl">
                      {post.title.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Title */}
                <h1 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
                  {brandName}
                </h1>

                {/* Category */}
                <div className="mt-2">
                  <Badge variant="secondary" className="inline-flex items-center gap-1 text-sm">
                    <Tag className="h-3.5 w-3.5" />
                    {category}
                  </Badge>
                </div>

                {/* Location */}
                {location && (
                  <div className="mt-3 flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{location}</span>
                  </div>
                )}

                {/* Website Link */}
                {website && (
                  <div className="mt-3">
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 hover:underline"
                    >
                      <Globe className="h-4 w-4" />
                      {domain || website}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <ShareButton />
                  {website && (
                    <Button asChild size="sm" className="gap-2">
                      <a href={website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Visit Site
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        {descriptionHtml && (
          <Card className="mt-6 overflow-hidden border-border">
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">About</h2>
              <article
                className="prose prose-slate max-w-2xl text-base leading-relaxed text-muted-foreground prose-p:my-4 prose-a:text-primary prose-a:underline prose-strong:font-semibold"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            </CardContent>
          </Card>
        )}

        {suggestedArticles.length ? (
          <section className="mt-12">
            <div className="flex items-center justify-between border-b border-[var(--border-app)] pb-4">
              <h2 className="text-xl font-bold text-[var(--text-heading)]">{siteContent.profileSuggestedReadingTitle}</h2>
              <Link href="/articles" className="text-sm font-semibold text-[var(--sbm-blue-dim)] hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {suggestedArticles.slice(0, 3).map((article) => (
                <TaskPostCard
                  key={article.id}
                  post={article}
                  href={buildPostUrl("article", article.slug)}
                  compact
                />
              ))}
            </div>
            <nav className="mt-8 rounded-2xl border border-[var(--border-app)] bg-white/90 p-5 shadow-sm">
              <p className="text-sm font-semibold text-[var(--text-heading)]">Related links</p>
              <ul className="mt-3 space-y-2 text-sm">
                {suggestedArticles.slice(0, 3).map((article) => (
                  <li key={`related-${article.id}`}>
                    <Link
                      href={buildPostUrl("article", article.slug)}
                      className="text-[var(--sbm-blue-dim)] underline-offset-4 hover:underline"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/profile" className="text-[var(--sbm-blue-dim)] underline-offset-4 hover:underline">
                    Browse all profiles
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
