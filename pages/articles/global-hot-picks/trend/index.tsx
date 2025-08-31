import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import type { GetStaticProps } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

type Props = { posts: Post[] };

export default function TrendIndex({ posts }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          海外トレンド（Global Hot Picks）
        </h1>
        <p className="text-gray-600 mb-6">
          海外で話題のプロダクトをピックアップ。新着順に表示しています。
        </p>

        {posts.length === 0 ? (
          <div className="rounded-lg border bg-white p-6">
            記事はまだありません。準備中です。
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/articles/global-hot-picks/trend/${p.slug}`}
                  className="block rounded-xl border bg-white p-4 hover:shadow-md transition"
                >
                  <div className="text-xs text-gray-500 mb-1">{p.date}</div>
                  <div className="font-semibold text-gray-900 mb-1">{p.title}</div>
                  <div className="text-sm text-gray-600 line-clamp-2">
                    {p.description}
                  </div>
                  <div className="text-blue-600 text-sm mt-2">続きを読む →</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const trendDir = path.join(
    process.cwd(),
    "articles",
    "global-hot-picks",
    "trend"
  );

  let posts: Post[] = [];
  try {
    if (fs.existsSync(trendDir)) {
      const files = fs.readdirSync(trendDir);
      posts = files
        .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
        .map((file) => {
          const filePath = path.join(trendDir, file);
          try {
            const raw = fs.readFileSync(filePath, "utf8");
            const { data } = matter(raw);
            return {
              slug: file.replace(/\.(md|mdx)$/, ""),
              title: data.title ?? "記事タイトル",
              description: data.description ?? "記事の説明",
              date: data.date ?? "2025-01-01",
            } as Post;
          } catch (e) {
            console.error("Front matter parse error:", filePath, e);
            return null;
          }
        })
        .filter(Boolean) as Post[];

      posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
  } catch (e) {
    console.error("Trend index build error:", e);
  }

  return { props: { posts } };
}; 