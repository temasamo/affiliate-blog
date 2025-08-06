import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryImage from '../components/CategoryImage';

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  type: string;
}

interface GlobalHotPicksProps {
  articles: Article[];
}

export default function GlobalHotPicks({ articles }: GlobalHotPicksProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Global Hot Picks - Market Supporter AI"
        description="海外で急上昇中の商品トレンドを紹介します。TikTok・Amazon US・Google Trendsで話題の最新アイテムをお届け。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ヒーローセクション */}
        <section className="mb-12 sm:mb-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-lg">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Global Hot Picks
            </h1>
            <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              海外で急上昇中の商品トレンドを速報でお届け<br />
              TikTok・Amazon US・Google Trendsで話題の最新アイテム
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">📱 TikTok</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🛒 Amazon US</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">📈 Google Trends</span>
            </div>
          </div>
        </section>

        {/* 記事一覧 */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">最新トレンド</h2>
            <span className="ml-3 bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium">NEW</span>
          </div>
          
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {articles.map((article) => (
                <Link key={article.slug} href={`/articles/global-hot-picks/trend/${article.slug}`} className="group block">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover">
                    <CategoryImage category="Global Hot Picks" />
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">TREND</span>
                        <span className="ml-2 text-xs text-gray-500">{article.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{article.description}</p>
                      <div className="text-purple-600 text-sm font-medium inline-flex items-center transition-all duration-300 group-hover:translate-x-1">
                        詳細を見る
                        <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">準備中</h3>
              <p className="text-gray-600">最新のトレンド記事を準備中です。もうしばらくお待ちください。</p>
            </div>
          )}
        </section>

        {/* カテゴリセクション */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">他のカテゴリもチェック</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Link href="/sleep-health" className="group block">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover">
                <CategoryImage category="睡眠・健康" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">睡眠・健康</h3>
                  <p className="text-sm text-gray-600">枕・マットレス・睡眠改善情報</p>
                </div>
              </div>
            </Link>
            <Link href="/japanese-tea" className="group block">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover">
                <CategoryImage category="日本茶" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">日本茶関連</h3>
                  <p className="text-sm text-gray-600">緑茶・抹茶・お茶文化の紹介</p>
                </div>
              </div>
            </Link>
            <Link href="/overseas-trend" className="group block">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover">
                <CategoryImage category="海外トレンド" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">海外トレンド</h3>
                  <p className="text-sm text-gray-600">海外で話題の商品を日本で</p>
                </div>
              </div>
            </Link>
            <Link href="/japan-popular" className="group block">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover">
                <CategoryImage category="日本商品" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">人気の日本商品</h3>
                  <p className="text-sm text-gray-600">国内で注目のアイテム</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps<GlobalHotPicksProps> = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const globalHotPicksPath = path.join(articlesDirectory, 'global-hot-picks');
  const articles: Article[] = [];

  if (fs.existsSync(globalHotPicksPath)) {
    const files = fs.readdirSync(globalHotPicksPath);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    
    mdxFiles.forEach(file => {
      const filePath = path.join(globalHotPicksPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontMatter } = matter(fileContents);
      
      articles.push({
        slug: frontMatter.slug || file.replace(/\.mdx$/, ''),
        title: frontMatter.title || '記事タイトル',
        description: frontMatter.description || '記事の説明',
        date: frontMatter.date || '2025.08.06',
        category: 'global-hot-picks',
        type: 'trend'
      });
    });
  }

  // 日付順でソート（新しい順）
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      articles,
    },
  };
}; 