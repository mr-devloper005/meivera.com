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
    <div className="min-h-screen bg-[#fdfbf8]">
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
        <div className="mb-10 flex flex-col gap-6 rounded-[1.75rem] border border-[#ead9d3] bg-gradient-to-br from-white/95 to-[#faf5f1] p-6 shadow-[0_20px_50px_rgba(74,52,56,0.07)] sm:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8f6f72]">
              {taskConfig?.label || task}
            </p>
            <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#1a1615] sm:text-[2rem]">
              {taskConfig?.description || "Latest posts"}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#4a403e]">
              Refine what you see with categories—crafted for calm, focused browsing.
            </p>
          </div>
          <form className="flex flex-wrap items-center gap-3" action={taskConfig?.route || "#"}>
            <label className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8f6f72]">Category</label>
            <select
              name="category"
              defaultValue={normalizedCategory}
              className="h-11 rounded-full border border-[#d4b8b0] bg-white/90 px-4 text-sm font-medium text-[#2c2624] shadow-sm"
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
              className="h-11 rounded-full bg-gradient-to-r from-[#b76e79] to-[#8f4f5c] px-6 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
            >
              Apply
            </button>
          </form>
        </div>

        {intro ? (
          <section className="mb-12 rounded-[1.75rem] border border-[#ead9d3] bg-gradient-to-b from-white to-[#fdf9f6] p-6 shadow-[0_16px_40px_rgba(74,52,56,0.05)] sm:p-8">
            <h2 className="font-serif text-2xl font-medium text-[#1a1615]">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 text-sm leading-[1.8] text-[#4a403e]">
                {paragraph}
              </p>
            ))}
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-semibold text-[#8f4f5c] underline-offset-4 hover:underline"
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
