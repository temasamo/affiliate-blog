import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryImage from '../components/CategoryImage';
import CategoryCard from '../components/CategoryCard';

export default function Blog() {
  const articles = [
    {
              slug: 'sleep-health/recommend/2025-08-04-makura-rankingtop5',
      title: '2025年8月最新版 枕総合ランキングTOP10｜前編（1〜5位）',
      description: '公式出店状況に基づいた安全なアフィリエイトリンク付きの枕総合ランキング',
      date: '2025.08.04',
      category: '睡眠・健康',
      emoji: '😴',
      color: 'from-indigo-100 to-indigo-200'
    },
    {
              slug: '海外トレンド/recommend/2025-07-20-smart-water-bottle',
      title: 'TikTokで話題のスマート水ボトル',
      description: '海外で人気爆発中のスマート水ボトル',
      date: '2025.07.20',
      category: '海外トレンド',
      emoji: '🌍',
      color: 'from-blue-100 to-blue-200'
    },
    {
              slug: 'popularproducts-overseas/recommend/2025-07-24-foldable-wireless-fan-rakuten',
      title: '折りたたみ式ワイヤレス扇風機',
      description: '海外トレンドで人気の折りたたみ式ワイヤレス扇風機',
      date: '2025.07.24',
      category: '海外トレンド',
      emoji: '🌍',
      color: 'from-blue-100 to-blue-200'
    },
    {
      slug: '2025-07-07-makura-series-summary',
      title: '枕シリーズ総まとめ (2025年7月)',
      description: '枕選びの決定版！全ランキングを一覧で',
      date: '2025.07.07',
      category: '睡眠・健康',
      emoji: '😴',
      color: 'from-blue-100 to-blue-200'
    },
    {
      slug: '2025-07-06-hotel-makura-ranking',
      title: 'ホテル枕ランキング',
      description: '高級ホテルで使われる枕を徹底比較',
      date: '2025.07.06',
      category: '睡眠・健康',
      emoji: '🏨',
      color: 'from-yellow-100 to-yellow-200'
    },
    {
      slug: '2025-07-05-sobagara-makura-ranking',
      title: 'そば殻枕ランキング',
      description: '自然素材のそば殻枕を徹底検証',
      date: '2025.07.05',
      category: '睡眠・健康',
      emoji: '🌾',
      color: 'from-green-100 to-green-200'
    },
    {
      slug: '2025-07-04-umou-makura-ranking',
      title: '羽毛枕ランキング',
      description: '軽やかで快適な羽毛枕を比較',
      date: '2025.07.04',
      category: '睡眠・健康',
      emoji: '🪶',
      color: 'from-purple-100 to-purple-200'
    },
    {
              slug: 'japanesetea/recommend/250731kyusu-ranking-dm',
      title: '急須ランキング',
      description: '本格的な日本茶を楽しむ急須を比較',
      date: '2025.07.31',
      category: '日本茶',
      emoji: '🍵',
      color: 'from-green-100 to-green-200'
    },
    {
              slug: 'japaneseproducts-popular-with-foreigners/recommend/250801viral-matcha-sweets-dm',
      title: '抹茶スイーツランキング',
      description: '外国人に人気の抹茶スイーツを紹介',
      date: '2025.08.01',
      category: '日本商品',
      emoji: '🍰',
      color: 'from-red-100 to-red-200'
    },
    {
      slug: '2025-07-01-makura-ranking',
      title: '枕総合ランキング',
      description: '価格・機能・口コミの3軸で徹底比較',
      date: '2025.07.01',
      category: '睡眠・健康',
      emoji: '😴',
      color: 'from-indigo-100 to-indigo-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="ブログ一覧 - Market Supporter AI"
        description="Market Supporter AIの最新記事一覧をご覧ください。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ページタイトル */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">ブログ一覧</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AIが導く、賢い洞察と信頼できるおすすめの最新記事をお届けします
          </p>
        </div>

        {/* 記事一覧 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="group block">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CategoryImage category={article.category} />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">{article.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center text-blue-600 text-sm font-medium transition-all duration-300 group-hover:translate-x-1">
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

        {/* カテゴリ別リンク */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">カテゴリ別記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              title="睡眠・健康"
              description="枕・マットレス・睡眠改善情報"
              href="/sleep-health"
              bgImage="https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/60"
            />
            <CategoryCard
              title="日本茶関連"
              description="緑茶・抹茶・お茶文化の紹介"
              href="/japanese-tea"
              bgImage="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/60"
            />
            <CategoryCard
              title="海外トレンド"
              description="海外で話題の商品を日本で"
              href="/overseas-trend"
              bgImage="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/60"
            />
            <CategoryCard
              title="人気の日本商品"
              description="国内で注目のアイテム"
              href="/japan-popular"
              bgImage="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/60"
            />
          </div>
        </div>

        {/* お問い合わせセクション */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">ご質問やご意見がございましたら</h2>
          <p className="text-lg opacity-90 mb-6">
            記事の内容についてのご質問や、取り上げてほしい商品のご要望など、お気軽にお問い合わせください。
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            お問い合わせはこちら
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
} 