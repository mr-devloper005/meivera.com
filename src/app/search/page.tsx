import Link from "next/link";
import { LuxuryMarketingShell, luxuryBtnOutline } from "@/components/marketing/luxury-marketing-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, Users, Bookmark } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";

export const revalidate = 3;

const matchText = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

const tips = [
  {
    icon: Bookmark,
    title: "Try bookmark tags",
    body: "Combine a keyword with a category filter to surface niche collections faster.",
  },
  {
    icon: Users,
    title: "Explore profiles",
    body: "Many creators pin their best shelves on their public profile—open one and follow outward.",
  },
  {
    icon: Sparkles,
    title: "Natural language",
    body: `${SITE_CONFIG.name} understands conversational queries like “sustainable packaging studios in Mumbai.”`,
  },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((t) => getMockPostsForTask(t.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as Record<string, unknown>).type);
    if (typeText === "comment") return false;
    const description = compactText((content as Record<string, unknown>).description);
    const body = compactText((content as Record<string, unknown>).body);
    const excerpt = compactText((content as Record<string, unknown>).excerpt);
    const categoryText = compactText((content as Record<string, unknown>).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  return (
    <LuxuryMarketingShell
      eyebrow="Discovery"
      title="Search the catalog"
      description={
        query
          ? `Results for “${query}” across bookmarks, profiles, listings, and editorial posts.`
          : "A single search bar for everything on Meivera—bookmarks, people, collections, and long-form stories."
      }
      actions={
        <Button className={luxuryBtnOutline} asChild>
          <Link href="/sbm">Browse bookmarks</Link>
        </Button>
      }
    >
      <form action="/search" className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input type="hidden" name="master" value="1" />
        {category ? <input type="hidden" name="category" value={category} /> : null}
        {task ? <input type="hidden" name="task" value={task} /> : null}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b76e79]" />
          <Input
            name="q"
            defaultValue={query}
            placeholder="Search bookmarks, profiles, resources…"
            className="h-12 rounded-full border-[#d4b8b0] bg-white/95 pl-11 pr-4 text-[15px] shadow-sm"
          />
        </div>
        <Button
          type="submit"
          className="h-12 rounded-full bg-gradient-to-r from-[#b76e79] to-[#8f4f5c] px-8 font-semibold text-white shadow-md hover:opacity-95"
        >
          Search
        </Button>
      </form>

      <div className="mb-12 grid gap-4 md:grid-cols-3">
        {tips.map((tip) => (
          <div
            key={tip.title}
            className="flex gap-3 rounded-[1.5rem] border border-[#ead9d3] bg-white/85 p-5 shadow-sm"
          >
            <tip.icon className="mt-0.5 h-5 w-5 shrink-0 text-[#b76e79]" strokeWidth={1.5} />
            <div>
              <p className="font-medium text-[#1a1615]">{tip.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#4a403e]">{tip.body}</p>
            </div>
          </div>
        ))}
      </div>

      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => {
            const taskKey = getPostTaskKey(post);
            const href = taskKey ? buildPostUrl(taskKey, post.slug) : `/posts/${post.slug}`;
            return <TaskPostCard key={post.id} post={post} href={href} />;
          })}
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-dashed border-[#d4b8b0] bg-[#fdf9f6]/80 p-12 text-center">
          <p className="font-serif text-lg font-medium text-[#1a1615]">No matches yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#4a403e]">
            Try a broader phrase, remove filters, or explore curated bookmarks from the home page.
          </p>
        </div>
      )}
    </LuxuryMarketingShell>
  );
}
