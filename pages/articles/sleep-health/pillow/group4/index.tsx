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

export default function Group4Index({ articles }: { articles: Article[] }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="mb-8">
            <Link href="/sleep-health" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              睡眠・健康に戻る
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              グループ4（特殊編）｜特殊な機能・素材の枕
            </h1>
            <p className="text-gray-600">
              洗える枕、冷感枕、アレルギー対応枕など、特殊な機能や素材に特化した枕の選び方をご紹介します。
            </p>
          </div>

          <div className="grid gap-6 md:gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/sleep-health/pillow/group4/${article.slug}`}
                className="block rounded-xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {article.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <time dateTime={article.date}>{article.date}</time>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 枕診断AIセクション */}
          <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                枕診断AI
              </h2>
              <p className="text-gray-600 mb-6">
                あなたに最適な枕をAI診断で見つけませんか？簡単な質問に答えるだけで、最適な枕をご提案します。
              </p>
              <Link
                href="https://mm-diagnosis-pillow.vercel.app/pillow"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                枕診断を始める
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const articlesDir = path.join(process.cwd(), "articles/sleep-health/pillow/group4");
  
  const articles: Article[] = [];
  
  if (fs.existsSync(articlesDir)) {
    const files = fs.readdirSync(articlesDir);
    
    files
      .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
      .forEach((file) => {
        const filePath = path.join(articlesDir, file);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);
        
        articles.push({
          slug: file.replace(/\.(md|mdx)$/, ""),
          title: data.title || "Untitled",
          description: data.description || "",
          date: data.date || "",
        });
      });
  }
  
  // 日付順でソート
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      articles,
    },
  };
}
