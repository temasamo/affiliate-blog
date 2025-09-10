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

export default function SleepHealth({ knowledgeArticles, recommendArticles }: { knowledgeArticles: Article[]; recommendArticles: Article[]; }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              ホームに戻る
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">睡眠・健康</h1>
            <p className="text-gray-600">快適な睡眠と健康な生活をサポートする情報をお届けします。</p>
          </div>

          {/* 枕選びガイドセクション */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              枕選びガイド
            </h2>
            <p className="text-gray-600 mb-6">診断・選び方に特化した記事群。まずはここから。</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* グループ1（基本編）へのカード */}
              <Link
                href="/articles/sleep-health/pillow/summary/group1"
                className="block rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-xs text-gray-500 mb-2">枕診断シリーズ</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  グループ1（基本編）｜高さ・素材・硬さ・肩こり・いびき
                </h3>
                <p className="text-gray-600 text-sm">
                  枕選びの基礎を5本立てで網羅。迷ったらまずはここから。
                </p>
                <div className="mt-3 flex items-center text-sm text-green-600">
                  <span>まとめページへ</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              {/* グループ2（応用編）へのカード */}
              <Link
                href="/articles/sleep-health/pillow/summary/group2"
                className="block rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-xs text-gray-500 mb-2">枕診断シリーズ</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  グループ2（応用編）｜首の痛み・寝返り・寝姿勢別
                </h3>
                <p className="text-gray-600 text-sm">
                  悩み別の枕選びを網羅。より具体的な症状に対応した記事群。
                </p>
                <div className="mt-3 flex items-center text-sm text-blue-600">
                  <span>まとめページへ</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              {/* グループ3（目的・ライフスタイル別）へのカード */}
              <Link
                href="/articles/sleep-health/pillow/summary/pillow-summary-group3"
                className="block rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-xs text-gray-500 mb-2">枕診断シリーズ</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  グループ3（目的・ライフスタイル別）｜快眠・肩幅・子ども・高齢者・ホテル
                </h3>
                <p className="text-gray-600 text-sm">
                  目的やライフスタイルに応じた枕選びを網羅。自分の状況に合う記事を探せます。
                </p>
                <div className="mt-3 flex items-center text-sm text-purple-600">
                  <span>まとめページへ</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* Recomend セクション */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              おすすめ商品
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendArticles.filter(article => ["2025-08-04-makura-rankingtop5", "2025-08-04-makura-rankingtop6-10", "2025-07-07-makura-series-summary", "2025-07-06-hotel-makura-ranking"].includes(article.slug)).map((article) => (
                <Link key={article.slug} href={`/articles/sleep-health/recommend/${article.slug}`} className="group block">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600">{article.description}</p>
                    <div className="mt-3 flex items-center text-xs text-blue-600">
                      <span>詳細を見る</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
              {/* おすすめ商品一覧カード */}
              <Link href="/articles/sleep-health/recommend" className="group block">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-indigo-200">
                  <div className="flex items-center mb-3">
                    <div className="text-2xl mr-3">🛒</div>
                    <h3 className="text-lg font-semibold text-indigo-700 group-hover:text-indigo-800 transition-colors">
                      おすすめ商品一覧
                    </h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-indigo-600">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                      <span>価格比較・レビュー付き</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-indigo-600 font-medium">
                    <span>全{recommendArticles.length}記事を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Knowledge セクション */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              睡眠知識
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {knowledgeArticles.slice(0, 6).map((article) => (
                <Link key={article.slug} href={`/articles/sleep-health/knowledge/${article.slug}`} className="group block">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600">{article.description}</p>
                    <div className="mt-3 flex items-center text-xs text-green-600">
                      <span>詳細を見る</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
              {/* 知識記事一覧カード */}
              <Link href="/articles/sleep-health/knowledge" className="group block">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="text-2xl mr-3">📚</div>
                    <h3 className="text-lg font-semibold text-green-700 group-hover:text-green-800 transition-colors">
                      睡眠知識一覧
                    </h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-green-600">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      <span>科学的根拠に基づく情報</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-green-600 font-medium">
                    <span>全{knowledgeArticles.length}記事を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const knowledgeDir = path.join(process.cwd(), "articles/sleep-health/knowledge");
  const recommendDir = path.join(process.cwd(), "articles/sleep-health/recommend");

  const getArticles = (dir: string) => {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const filePath = path.join(dir, file);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);
        return {
          slug: file.replace(/\.md$/, ""),
          title: data.title || "Untitled",
          description: data.description || "",
          date: data.date || "",
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const knowledgeArticles = getArticles(knowledgeDir);
  const recommendArticles = getArticles(recommendDir);

  return {
    props: {
      knowledgeArticles,
      recommendArticles,
    },
  };
}
