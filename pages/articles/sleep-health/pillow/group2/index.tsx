import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export default function Group2Index({ articles }: { articles: Article[] }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              枕診断シリーズ｜グループ2（応用編）
            </h1>
            <p className="text-gray-600">
              首の痛み・寝返り・寝姿勢別の枕選び。より具体的な悩みに対応した記事群です。
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/articles/sleep-health/pillow/group2/${a.slug}`}
                className="group"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-xs text-gray-500 mb-2">{a.date}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-sm text-gray-600">{a.description}</p>
                  <div className="mt-3 flex items-center text-xs text-blue-600">
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const dir = path.join(process.cwd(), "articles", "sleep-health", "pillow", "group2");
  const articles: Article[] = [];
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files
      .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
      .forEach((file) => {
        const fp = path.join(dir, file);
        const raw = fs.readFileSync(fp, "utf8");
        const { data } = matter(raw);
        articles.push({
          slug: file.replace(/\.mdx?$/, ""),
          title: data.title || "記事タイトル",
          description: data.description || "",
          date: data.date || ""
        });
      });
  }
  // 新しい順
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return { props: { articles } };
}
