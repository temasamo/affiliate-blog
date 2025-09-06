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

export default function Group1Index({ articles }: { articles: Article[] }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="mb-8">
            <Link href="/sleep-health" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              睡眠・健康ページに戻る
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              枕診断シリーズ｜グループ1（基本編）
            </h1>
            <p className="text-gray-600">
              高さ・素材・硬さ・肩こり・いびきの5本立て。枕選びの基本を網羅します。
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/articles/sleep-health/pillow/group1/${a.slug}`}
                className="group"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-xs text-gray-500 mb-2">{a.date}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-sm text-gray-600">{a.description}</p>
                  <div className="mt-3 flex items-center text-xs text-green-600">
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
  const dir = path.join(process.cwd(), "articles", "sleep-health", "pillow", "group1");
  const files = fs.readdirSync(dir);
  const articles = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(dir, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data: frontMatter } = matter(fileContents);
      return {
        slug,
        title: frontMatter.title || "記事タイトル",
        description: frontMatter.description || "記事の説明",
        date: frontMatter.date || "2025.07.01",
      };
    });
  return { props: { articles } };
}
