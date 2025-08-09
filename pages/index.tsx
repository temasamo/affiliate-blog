import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryImage from '../components/CategoryImage';
import CategoryCard from '../components/CategoryCard';

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  type: string;
}

interface HomeProps {
  latestArticles: Article[];
}

export default function Home({ latestArticles }: HomeProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ヒーローセクション */}
        <section className="mb-12 sm:mb-16">
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-lg overflow-hidden">
            {/* 背景の80%を覆う透かし画像 */}
            <div className="absolute top-0 right-0 w-4/5 h-full opacity-20">
              <div className="w-full h-full bg-cover bg-center bg-no-repeat" 
                   style={{
                     backgroundImage: 'url("/images/handshake-robot.jpg")'
                   }}>
              </div>
              {/* グラデーションオーバーレイで自然な融合 */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-blue-600/30"></div>
            </div>
            
            {/* コンテンツ */}
            <div className="relative z-10">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Market Supporter AI
              </h1>
              <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
                AIが導く、賢い洞察と信頼できるおすすめ
              </p>
              <Link 
                href="/blog" 
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
              >
                最新の記事を見る
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Global Hot Picks セクション */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Global Hot Picks</h2>
            <span className="ml-3 bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium">TREND</span>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-purple-100">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">海外で急上昇中の商品</h3>
              <p className="text-gray-600">TikTok・Amazon US・Google Trendsで話題の最新アイテム</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">🔋</div>
                <h4 className="font-semibold text-gray-900 mb-1">Anker SOLIX C1000</h4>
                <p className="text-sm text-gray-600">58分でフル充電</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">💆‍♂️</div>
                <h4 className="font-semibold text-gray-900 mb-1">Theragun Relief</h4>
                <p className="text-sm text-gray-600">軽量マッサージガン</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">💄</div>
                <h4 className="font-semibold text-gray-900 mb-1">Etude Glow Fixing Tint</h4>
                <p className="text-sm text-gray-600">水膜のようなツヤ</p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/global-hot-picks" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors">
                最新トレンドを見る
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* 新着記事セクション */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">新着記事</h2>
            <span className="ml-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">NEW</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {latestArticles.map((article) => (
              <Link key={article.slug} href={article.category === 'global-hot-picks' ? `/articles/${article.category}/trend/${article.slug}` : `/articles/${article.category}/${article.type}/${article.slug}`} className="group block">
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1">
                  <CategoryImage category={getCategoryDisplayName(article.category)} />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{article.date}</span>
                      <div className="text-blue-600 text-sm font-medium inline-flex items-center transition-all duration-300 group-hover:translate-x-1">
                        詳細を見る
                        <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* カテゴリセクション */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">カテゴリ別商品比較</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <CategoryCard
              title="睡眠・健康"
              description="枕・マットレス・睡眠改善情報"
              href="/sleep-health"
              bgImage="https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/40"
            />
            <CategoryCard
              title="日本茶関連"
              description="緑茶・抹茶・お茶文化の紹介"
              href="/japanese-tea"
              bgImage="/images/macha-kyusu.jpg"
              overlayColor="bg-black/40"
            />
            <CategoryCard
              title="海外トレンド"
              subtitle="Deep-Dive Overseas Trend"
              description="海外で話題の商品を日本で"
              href="/overseas-trend"
              bgImage="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/40"
            />
            <CategoryCard
              title="人気の日本商品"
              description="国内で注目のアイテム"
              href="/japan-popular"
              bgImage="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/40"
            />
          </div>
        </section>

        {/* おすすめランキングセクション */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">おすすめランキング</h2>
            <span className="ml-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">HOT</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1 group">
              <CategoryImage category="睡眠・健康" />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">枕</span>
                  <span className="ml-2 text-xs text-gray-500">7商品比較</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">枕総合ランキング</h3>
                <p className="text-sm text-gray-600 mb-4">価格・機能・口コミの3軸で徹底比較</p>
                <Link href="/articles/sleep-health/recommend/2025-07-01-makura-ranking" className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center transition-all duration-300 hover:translate-x-1">
                  詳細を見る
                  <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// カテゴリ表示名を取得する関数
function getCategoryDisplayName(category: string): string {
  const categoryNames: { [key: string]: string } = {
    'sleep-health': '睡眠・健康',
    'japanesetea': '日本茶',
    'popularproducts-overseas': '海外トレンド',
    '海外トレンド': '海外トレンド',
    'japaneseproducts-popular-with-foreigners': '人気の日本商品',
    'global-hot-picks': 'Global Hot Picks'
  };
  return categoryNames[category] || category;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const allArticles: Article[] = [];

  // 全カテゴリの記事を取得
  const categories = ['sleep-health', 'japanesetea', 'popularproducts-overseas', '海外トレンド', 'japaneseproducts-popular-with-foreigners', 'global-hot-picks'];
  
  categories.forEach(category => {
    const categoryPath = path.join(articlesDirectory, category);
    if (fs.existsSync(categoryPath)) {
      // global-hot-picksの場合は直接.md/.mdxファイルを処理
      if (category === 'global-hot-picks') {
        const files = fs.readdirSync(categoryPath);
        files.forEach(file => {
          if (file.endsWith('.md') || file.endsWith('.mdx')) {
            const filePath = path.join(categoryPath, file);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data: frontMatter } = matter(fileContents);
            
            allArticles.push({
              slug: file.replace(/\.mdx?$/, ''),
              title: frontMatter.title || '記事タイトル',
              description: frontMatter.description || '記事の説明',
              date: frontMatter.date || '2025.07.01',
              category: category,
              type: 'trend'
            });
          }
        });
      } else {
        // その他のカテゴリは従来通り
        const types = ['recommend', 'knowledge'];
        types.forEach(type => {
          const typePath = path.join(categoryPath, type);
          if (fs.existsSync(typePath)) {
            const files = fs.readdirSync(typePath);
            files.forEach(file => {
              if (file.endsWith('.md')) {
                const filePath = path.join(typePath, file);
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const { data: frontMatter } = matter(fileContents);
                
                allArticles.push({
                  slug: file.replace(/\.md$/, ''),
                  title: frontMatter.title || '記事タイトル',
                  description: frontMatter.description || '記事の説明',
                  date: frontMatter.date || '2025.07.01',
                  category: category,
                  type: type
                });
              }
            });
          }
        });
      }
    }
  });



  // 日付順でソート（新しい順）して最新3件を取得
  allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latestArticles = allArticles.slice(0, 3);

  return {
    props: {
      latestArticles,
    },
  };
};

