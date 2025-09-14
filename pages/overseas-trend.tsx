// pages/overseas-trend.tsx
import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  type: string;
}

interface OverseasTrendProps {
  globalHotPickArticles: Article[];
  recommendArticles: Article[];
  knowledgeArticles: Article[];
}

export default function OverseasTrend({ globalHotPickArticles, recommendArticles, knowledgeArticles }: OverseasTrendProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="海外トレンド - Market Supporter AI"
        description="海外で話題の商品やトレンド情報を紹介します。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-cyan-600/80"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop"
                  alt="海外トレンド"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-3xl font-bold mb-2">
                    海外トレンド
                  </div>
                  <div className="text-white/90 text-lg bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm">
                    海外で話題の商品
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              海外で話題の商品やトレンド情報を紹介します。
            </p>
          </div>


          {/* Global Hot Pick セクション */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Global Hot Pick
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {globalHotPickArticles.slice(0, 4).map((article) => (
                <Link key={article.slug} href={`/articles/global-hot-picks/trend/${article.slug}`} className="group">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600">{article.description}</p>
                    <div className="mt-3 flex items-center text-xs text-purple-600">
                      <span>詳細を見る</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
              {/* Global Hot Pick一覧カード */}
              <Link href="/global-hot-picks" className="group block">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-purple-200">
                  <div className="flex items-center mb-3">
                    <div className="text-2xl mr-3">🔥</div>
                    <h3 className="text-lg font-semibold text-purple-700 group-hover:text-purple-800 transition-colors">
                      Global Hot Pick一覧を見る
                    </h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-purple-600">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      <span>海外SNSで急上昇の商品</span>
                    </div>
                    <div className="flex items-center text-sm text-purple-600">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      <span>トレンド分析・購入方法</span>
                    </div>
                    <div className="flex items-center text-sm text-purple-600">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      <span>リアルタイム更新</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-purple-600 font-medium">
                    <span>全{globalHotPickArticles.length}記事を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>          {/* Recomend セクション */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              おすすめ商品
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {recommendArticles.slice(0, 6).map((article) => (
              <Link key={article.slug} href={`/articles/popularproducts-overseas/recommend/${article.slug}`} className="group">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
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
              {/* 海外トレンド商品一覧カード */}
              <Link href="/articles/popularproducts-overseas/recommend" className="group block">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="text-2xl mr-3">🌍</div>
                    <h3 className="text-lg font-semibold text-blue-700 group-hover:text-blue-800 transition-colors">
                      海外トレンド商品一覧
                    </h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-blue-600">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      <span>TikTok・Amazon USで話題の商品</span>
                    </div>
                    <div className="flex items-center text-sm text-blue-600">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      <span>日本で買える海外商品</span>
                    </div>
                    <div className="flex items-center text-sm text-blue-600">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      <span>トレンド分析・レビュー付き</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-blue-600 font-medium">
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
              海外トレンド知識
            </h2>
            <div className="bg-green-50 rounded-xl p-6">
              <p className="text-sm text-gray-600">
                海外トレンドに関する知識記事は現在準備中です。<br />
                もうしばらくお待ちください。
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps<OverseasTrendProps> = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles', 'popularproducts-overseas');
  const globalHotPickArticles: Article[] = [];
  const recommendArticles: Article[] = [];
  const knowledgeArticles: Article[] = [];

  // Global Hot Pick 記事を取得
  const globalHotPickDirectory = path.join(process.cwd(), "articles", "global-hot-picks", "trend");
  if (fs.existsSync(globalHotPickDirectory)) {
    const files = fs.readdirSync(globalHotPickDirectory);
    files.forEach(file => {
      if (file.endsWith(".mdx")) {
        const filePath = path.join(globalHotPickDirectory, file);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data: frontMatter } = matter(fileContents);
        
        globalHotPickArticles.push({
          slug: file.replace(/.mdx$/, ""),
          title: frontMatter.title || "記事タイトル",
          description: frontMatter.description || "記事の説明",
          date: frontMatter.date || "2025.09.01",
          type: "trend"
        });
      }
    });
  }
  // Recommend 記事を取得
  const recommendPath = path.join(articlesDirectory, 'recommend');
  if (fs.existsSync(recommendPath)) {
    const files = fs.readdirSync(recommendPath);
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(recommendPath, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data: frontMatter } = matter(fileContents);
        
        recommendArticles.push({
          slug: file.replace(/\.(md|mdx)$/, ''),
          title: frontMatter.title || '記事タイトル',
          description: frontMatter.description || '記事の説明',
          date: frontMatter.date || '2025.07.01',
          type: 'recommend'
        });
      }
    });
  }

  // Knowledge 記事を取得
  const knowledgePath = path.join(articlesDirectory, 'knowledge');
  if (fs.existsSync(knowledgePath)) {
    const files = fs.readdirSync(knowledgePath);
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(knowledgePath, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data: frontMatter } = matter(fileContents);
        
        knowledgeArticles.push({
          slug: file.replace(/\.(md|mdx)$/, ''),
          title: frontMatter.title || '記事タイトル',
          description: frontMatter.description || '記事の説明',
          date: frontMatter.date || '2025.07.01',
          type: 'knowledge'
        });
      }
    });
  }

  // 日付順でソート（新しい順）
  globalHotPickArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  recommendArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  knowledgeArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      globalHotPickArticles,
      recommendArticles,
      knowledgeArticles,
    },
  };
};
