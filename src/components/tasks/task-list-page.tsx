import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { TaskListClient } from "@/components/tasks/task-list-client";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG, getTaskConfig, type TaskKey } from "@/lib/site-config";
import { CATEGORY_OPTIONS, normalizeCategory } from "@/lib/categories";

import { taskIntroCopy } from '@/config/site.content';



export async function TaskListPage({
  task,
  category,
}: {
  task: TaskKey;
  category?: string;
}) {
  const taskConfig = getTaskConfig(task);
  const posts = await fetchTaskPosts(task, 30);
  const normalizedCategory = category ? normalizeCategory(category) : "all";
  const intro = taskIntroCopy[task];
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || "/posts"}/${post.slug}`,
    name: post.title,
  }));

  return (
    <div className="min-h-screen bg-transparent">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === "listing" ? (
          <SchemaJsonLd
            data={[
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                name: "Business Directory Listings",
                itemListElement: schemaItems,
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: "Worldwide",
              },
            ]}
          />
        ) : null}
        {task === "article" || task === "classified" ? (
          <SchemaJsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ""}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}
        <div className="mb-10 flex flex-col gap-6 rounded-2xl border border-[var(--border-app)] bg-white/90 p-6 shadow-sm sm:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--sbm-blue-dim)]">
              {taskConfig?.label || task}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[var(--text-heading)]">
              {taskConfig?.description || "Latest posts"}
            </h1>
            <p className="mt-2 text-sm text-[var(--text-body)]">Browse by category to narrow results.</p>
          </div>
          <form className="flex flex-wrap items-center gap-3" action={taskConfig?.route || "#"}>
            <label className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Category</label>
            <select
              name="category"
              defaultValue={normalizedCategory}
              className="h-11 rounded-lg border border-[var(--border-app)] bg-[var(--surface-muted)] px-3 text-sm font-medium text-[var(--text-heading)]"
            >
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="h-11 rounded-lg bg-[var(--sbm-blue)] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--sbm-blue-dim)]"
            >
              Apply
            </button>
          </form>
        </div>

        {intro ? (
          <section className="paper-panel mb-12 rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-[var(--text-heading)]">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 text-sm leading-7 text-[var(--text-body)]">
                {paragraph}
              </p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-semibold text-[var(--sbm-blue-dim)] underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  );
}
