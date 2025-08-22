import Head from "next/head";
import Link from "next/link";
import { GetStaticProps, NextPage } from "next";
import { getAllPosts, getAllCategories, PostMeta } from "@/lib/posts";

type Props = { posts: PostMeta[]; categories: string[]; pageSize: number };
const PAGE_SIZE = 12;

const BlogIndex: NextPage<Props> = ({ posts, categories, pageSize }) => {
  let currentCategory = "";
  let currentPage = 1;
  if (typeof window !== "undefined") {
    const u = new URL(window.location.href);
    currentCategory = u.searchParams.get("category") || "";
    currentPage = Math.max(1, Number(u.searchParams.get("page") || "1"));
  }

  const filtered = currentCategory ? posts.filter((p) => p.category === currentCategory) : posts;
  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const start = (currentPage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);
  const canonical = "https://www.marketsupporter-ai.com/blog";

  return (
    <>
      <Head>
        <title>最新記事一覧 | Market Supporter AI</title>
        <meta
          name="description"
          content="Market Supporter AIの最新記事一覧。日本茶・睡眠/健康・旅行・AI診断などを最新順でお届けします。"
        />
        <link rel="canonical" href={canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: visible.map((p, i) => ({
                "@type": "ListItem",
                position: (start + i + 1),
                url: `${canonical}/${p.slug}`,
              })),
            }),
          }}
        />
      </Head>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">最新記事</h1>
          <div className="flex items-center gap-2 overflow-x-auto">
            <FilterChip label="すべて" active={!currentCategory} href="/blog" />
            {categories.map((c) => (
              <FilterChip key={c} label={c} active={currentCategory === c} href={`/blog?category=${encodeURIComponent(c)}`} />
            ))}
          </div>
        </header>

        <section aria-label="記事一覧" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </section>

        <nav className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: pageCount }, (_, i) => {
            const page = i + 1;
            const sp = new URLSearchParams();
            if (currentCategory) sp.set("category", currentCategory);
            if (page > 1) sp.set("page", String(page));
            const href = `/blog${sp.toString() ? `?${sp.toString()}` : ""}`;
            const active = page === currentPage;
            return (
              <Link key={page} href={href} className={`rounded-md px-3 py-1 text-sm ${active ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`} aria-current={active ? "page" : undefined}>
                {page}
              </Link>
            );
          })}
        </nav>
      </main>
    </>
  );
};

function ArticleCard({ post }: { post: PostMeta }) {
  return (
    <Link href={post.href} className="rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl bg-gray-100">
        {post.thumbnail ? (
          <img src={post.thumbnail} alt={post.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">No Image</div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-1 text-xs text-gray-500">{post.category ?? "未分類"}・{post.date ? formatDate(post.date) : "日付未設定"}</div>
        <h2 className="line-clamp-2 text-base font-semibold">{post.title}</h2>
        {post.excerpt && <p className="mt-2 line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>}
      </div>
    </Link>
  );
}

function FilterChip({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link href={href} className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm ${active ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`} aria-current={active ? "page" : undefined}>
      {label}
    </Link>
  );
}

function formatDate(d: string): string {
  const t = Date.parse(d);
  if (!Number.isFinite(t)) return d;
  const dt = new Date(t);
  const y = dt.getFullYear();
  const m = `${dt.getMonth() + 1}`.padStart(2, "0");
  const day = `${dt.getDate()}`.padStart(2, "0");
  return `${y}/${m}/${day}`;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getAllPosts();
  const categories = getAllCategories(posts);
  return { props: { posts, categories, pageSize: PAGE_SIZE }, revalidate: 60 };
};

export default BlogIndex; 