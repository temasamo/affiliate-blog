import React from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryImage from '../components/CategoryImage';
import CategoryCard from '../components/CategoryCard';
import TravelTeaser from '../components/TravelTeaser';
import LatestPosts from '../components/LatestPosts';
import { getTravelSlugs, getTravelPostBySlug } from '@/lib/mdx';
import { getLatestPosts } from '@/lib/posts';
import type { SimplePost } from '@/lib/posts';


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
  travelPosts: any[];
  latest: SimplePost[];
}

export default function Home({ latestArticles, travelPosts, latest }: HomeProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ヒーローセクション */}
        <section className="mb-6 sm:mb-8">
          <div className="
            relative overflow-hidden rounded-3xl
            bg-gradient-to-br from-gray-50 to-gray-100
            h-[15vh] md:h-[22vh] lg:h-[20vh]   /* ★ より小さく調整 */
            max-h-[180px] md:max-h-[250px] min-h-[120px] md:min-h-[160px]        /* ★ より小さく */
            px-3 sm:px-5 md:px-7 lg:px-9
            py-2 sm:py-3 md:py-4 lg:py-5
            text-center shadow-lg border border-gray-100
          ">
                        {/* 背景の80%を覆う透かし画像 */}
            <div className="absolute top-0 right-0 w-4/5 h-full opacity-65">
              <div className="w-full h-full bg-cover bg-center bg-no-repeat" 
                   style={{
                     backgroundImage: 'url("/images/handshake-robot.jpg")'
                   }}>
              </div>
              {/* グラデーションオーバーレイで自然な融合 */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-blue-50/30"></div>
            </div>
            
            {/* コンテンツ */}
            <div className="relative z-10">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight">
              Market Supporter AI
            </h1>
            <p className="mt-1.5 sm:mt-2 md:mt-3 text-xs sm:text-sm md:text-base bg-blue-600 text-white inline-block px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-full font-medium">
              AIが導く、賢い洞察と信頼できるおすすめ
            </p>
            </div>
          </div>
        </section>

        {/* メッセージとコンテンツ一覧ボタンセクション */}
        <section className="mx-auto max-w-6xl px-4 md:px-6 mb-4 sm:mb-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 md:p-6 text-center">
            <p className="text-xs sm:text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed mb-4">
              AIを活用して、みなさんの「知りたい」「選びたい」「買いたい」をサポート。情報を整理し、購入時の判断と生活の向上をサポートします。
            </p>
            <Link 
              href="/contents" 
              className="inline-flex items-center px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg hover:-translate-y-1"
              onClick={() => window.gtag?.('event', 'select_content', {
                content_type: 'cta',
                content_id: 'home_hero_contents_button'
              })}
            >
              コンテンツ一覧を見る
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* 新着記事 */}
        <div className="mx-auto max-w-6xl px-4 md:px-6 mb-16">
          <LatestPosts items={latest.slice(0, 5)} />
        </div>

        {/* 枕診断AIシリーズ特集 */}
        <section className="mb-12">
          <div className="relative bg-gradient-to-r from-blue-200 to-indigo-200 border border-blue-400 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            {/* 背景画像 */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <img 
                src="/images/pillow-back.jpg" 
                alt="枕診断AI背景" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* コンテンツ */}
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">枕診断AI</h3>
                  <p className="text-sm text-gray-600">科学的根拠に基づく枕選びの新時代</p>
                </div>
              </div>
              
              {/* 2つのボタン */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="https://mm-diagnosis-pillow.vercel.app/pillow" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  枕診断AIページへ
                </Link>
                <Link 
                  href="/guides" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  枕診断AIと枕について
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* 旅行の新着記事（Global Hot Picksの上に固定配置） */}
        <TravelTeaser posts={travelPosts} />

        {/* AIアプリ情報セクション */}
        <section className="mb-12 sm:mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            {/* 背景動画 */}
            <div className="absolute inset-0">
              <video
                src="/videos/categories/ai-apps-hero.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            
            {/* オーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/60 to-purple-600/60"></div>
            
            {/* コンテンツ */}
            <div className="relative z-10 p-8 sm:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  AIアプリ情報
                </h2>
                <p className="text-white/90 text-lg">
                  最新AIツール・生産性向上
                </p>
              </div>
              
              {/* AIアプリ記事カード */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {latest.filter(article => article.category === 'AIアプリ紹介').slice(0, 3).map((article, index) => {
                  // AIアプリカテゴリの記事パスを生成
                  const getArticlePath = (slug: string) => {
                    if (slug === "ai-skin-analysis") {
                      return `/articles/ai-apps/recommend/2025-10-29-ai-skin-analysis`;
                    }
                    if (slug === "ai-health-tracking") {
                      return `/articles/ai-apps/recommend/2025-10-31-ai-health-tracking`;
                    }
                    return `/articles/ai-apps/recommend/${slug}`;
                  };
                  
                  // 記事内容に基づいてラベルを決定
                  const getArticleLabel = (slug: string, title: string, description?: string) => {
                    const searchText = `${slug} ${title} ${description || ''}`.toLowerCase();
                    // AI旅行関連
                    if (searchText.includes('travel') || searchText.includes('旅行') || searchText.includes('トラベル') || searchText.includes('トラベル')) {
                      return { label: 'AI旅行', colorClass: 'bg-blue-100 text-blue-800' };
                    }
                    // AI活用関連（美容、肌、健康、翻訳、画像生成など）
                    if (searchText.includes('beauty') || searchText.includes('美容') || 
                        searchText.includes('skin') || searchText.includes('肌') || 
                        searchText.includes('health') || searchText.includes('健康') || 
                        searchText.includes('translation') || searchText.includes('翻訳') || 
                        searchText.includes('image') || searchText.includes('画像') || 
                        searchText.includes('generation') || searchText.includes('生成')) {
                      return { label: 'AI活用', colorClass: 'bg-purple-100 text-purple-800' };
                    }
                    // デフォルト
                    return { label: 'おすすめ', colorClass: 'bg-green-100 text-green-800' };
                  };
                  
                  const labelInfo = getArticleLabel(article.slug, article.title, article.description || undefined);
                  
                  return (
                  <Link key={article.slug} href={getArticlePath(article.slug)} className="group">
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 hover:bg-white/60 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center mb-3">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${labelInfo.colorClass}`}>
                          {labelInfo.label}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          {article.date ? new Date(article.date).toLocaleDateString('ja-JP', { 
                            year: 'numeric', 
                            month: '2-digit', 
                            day: '2-digit' 
                          }).replace(/\//g, '.') : '日付未設定'}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {article.description}
                      </p>
                    </div>
                  </Link>
                  );
                })}
                
              </div>
              
              <div className="text-center mt-8">
                <Link href="/ai-apps" className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30">
                  AIアプリ情報を見る
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
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
              {latestArticles.filter(article => article.category === 'global-hot-picks').slice(0, 3).map((article, index) => (
                <Link key={index} href={`/articles/global-hot-picks/trend/${article.slug}`} className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">🔥</div>
                  <h4 className="font-semibold text-gray-900 mb-1">{article.title.replace('Global Hot Picks｜', '')}</h4>
                  <p className="text-sm text-gray-600">{article.description}</p>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link href="/global-hot-picks" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors">
                トレンド一覧へ
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
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
              title="日本酒"
              description="銘柄紹介・知識・コンシェルジュAI"
              href="/japanese-sake"
              bgImage="https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/40"
            />
            <CategoryCard
              title="人気の日本商品"
              description="国内で注目のアイテム"
              href="/japan-popular"
              bgImage="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/40"
            />
            <CategoryCard
              title="AIアプリ情報"
              subtitle="AI Tools & Apps"
              description="最新AIツール・生産性向上"
              href="/ai-apps"
              bgImage="/videos/categories/ai-apps-hero.mp4"
              overlayColor="bg-gradient-to-br from-blue-500/60 to-purple-600/60"
              isVideo={true}
            />
            <CategoryCard
              title="Global Hot Picks"
              description="海外で急上昇中の商品"
              href="/global-hot-picks"
              bgImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center"
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
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover group">
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

            <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover group">
              <CategoryImage category="日本商品" />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">日本商品</span>
                  <span className="ml-2 text-xs text-gray-500">2商品比較</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">人気の日本商品</h3>
                <p className="text-sm text-gray-600 mb-4">外国人に人気の日本食品ランキング</p>
                <Link href="/articles/japaneseproducts-popular-with-foreigners/recommend/250731popular-japanese-foods-2025-dm" className="text-red-600 hover:text-red-800 text-sm font-medium inline-flex items-center transition-all duration-300 hover:translate-x-1">
                  詳細を見る
                  <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover group">
              <CategoryImage category="日本茶" />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">日本茶</span>
                  <span className="ml-2 text-xs text-gray-500">5商品比較</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">日本茶ランキング</h3>
                <p className="text-sm text-gray-600 mb-4">味・香り・価格で厳選</p>
                <Link href="/articles/japanesetea/recommend/250731matcha-set-recommend-dm" className="text-purple-600 hover:text-purple-800 text-sm font-medium inline-flex items-center transition-all duration-300 hover:translate-x-1">
                  詳細を見る
                  <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 今後の機能 - 非表示 */}
        {/* <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">今後の機能実装予定</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 text-sm font-medium">1</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-medium text-gray-900">カテゴリ別ページでの記事一覧表示</h3>
                <p className="text-sm text-gray-600 mt-1">商品カテゴリごとに整理された記事一覧</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 text-sm font-medium">2</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-medium text-gray-900">アフィリエイトリンクと関連商品紹介</h3>
                <p className="text-sm text-gray-600 mt-1">各記事に商品リンクと関連商品を追加</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 text-sm font-medium">3</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-medium text-gray-900">AIお助けボットによる購入相談機能</h3>
                <p className="text-sm text-gray-600 mt-1">ユーザーの悩みに応じた商品推薦</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 text-sm font-medium">4</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-medium text-gray-900">自動データ収集・ランキング生成</h3>
                <p className="text-sm text-gray-600 mt-1">最新の商品情報を自動で更新</p>
              </div>
            </div>
          </div>
        </section> */}
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
    'japanesesake': '日本酒',
    'popularproducts-overseas': '海外トレンド',
    '海外トレンド': '海外トレンド',
    'japaneseproducts-popular-with-foreigners': '人気の日本商品',
    'global-hot-picks': 'Global Hot Picks'
  };
  return categoryNames[category] || category;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const allArticles: Article[] = [];

  // 旅行の新着を取得
  let travelPosts: any[] = [];
  try {
    const slugs = getTravelSlugs();
    console.log('Travel slugs:', slugs);
    travelPosts = slugs.map((s) => {
      try {
        const { frontMatter, slug } = getTravelPostBySlug(s);
        // ファイルパスから最後の部分（実際のスラッグ）を抽出
        const actualSlug = s.split('/').pop() || s;
        return { slug: actualSlug, subcategory: frontMatter.subcategory || null, ...frontMatter };
      } catch (error) {
        console.error(`Error getting travel post for slug ${s}:`, error);
        return null;
      }
    }).filter(Boolean);
    
    // meigetsuso-part2の特別処理を追加
    const meigetsusoPart2Post = travelPosts.find(post => post.slug === 'ryokan/2025-10-17-meigetsuso-part2');
    if (meigetsusoPart2Post) {
      // meigetsuso-part2のエイリアスを追加
      travelPosts.push({
        ...meigetsusoPart2Post,
        slug: 'meigetsuso-part2'
      });
    }
    
    travelPosts.sort((a: any, b: any) => (a.date < b.date ? 1 : -1));
    console.log('Travel posts:', travelPosts);
  } catch (e) {
    // 旅行カテゴリ未作成時でも壊さない
    console.log('Travel category not found:', e);
  }

  // 全カテゴリの記事を取得（global-hot-picksも含める）
  const categories = ['sleep-health', 'japanesetea', 'japanesesake', 'popularproducts-overseas', '海外トレンド', 'japaneseproducts-popular-with-foreigners', 'global-hot-picks', 'whisky'];
  
  categories.forEach(category => {
    const categoryPath = path.join(articlesDirectory, category);
    if (fs.existsSync(categoryPath)) {
      // global-hot-picksの場合はtrendディレクトリを確認
      if (category === 'global-hot-picks') {
        const trendPath = path.join(categoryPath, 'trend');
        if (fs.existsSync(trendPath)) {
          const files = fs.readdirSync(trendPath);
          files.forEach(file => {
            if (file.endsWith('.mdx') || file.endsWith('.md')) {
              try {
                const filePath = path.join(trendPath, file);
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const { data: frontMatter } = matter(fileContents);
                
                allArticles.push({
                  slug: file.replace(/\.(mdx|md)$/, ''),
                  title: frontMatter.title || '記事タイトル',
                  description: frontMatter.description || '記事の説明',
                  date: frontMatter.date || '2025.07.01',
                  category: category,
                  type: 'trend'
                });
              } catch (e) {
                console.error(`Front matter parse error: ${path.join(trendPath, file)}`, e);
              }
            }
          });
        }
      } else {
        // 他のカテゴリはrecommendとknowledgeディレクトリを確認
        const types = ['recommend', 'knowledge'];
        types.forEach(type => {
          const typePath = path.join(categoryPath, type);
          if (fs.existsSync(typePath)) {
            const files = fs.readdirSync(typePath);
            files.forEach(file => {
              if (file.endsWith('.md')) {
                try {
                  const filePath = path.join(typePath, file);
                  const fileContents = fs.readFileSync(filePath, 'utf8');
                  const { data: frontMatter } = matter(fileContents);
                  
                  // publishedがfalseの場合はスキップ
                  if (frontMatter.published === false) {
                    return;
                  }
                  
                  allArticles.push({
                    slug: frontMatter.slug || file.replace(/\.(md|mdx)$/, ''),
                    title: frontMatter.title || '記事タイトル',
                    description: frontMatter.description || '記事の説明',
                    date: frontMatter.date || '2025.07.01',
                    category: category,
                    type: type
                  });
                } catch (e) {
                  console.error(`Front matter parse error: ${path.join(typePath, file)}`, e);
                }
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

  // 新着記事を取得（旅行記事を除外）
  const latest = await getLatestPosts(50); // より多くの記事を取得
  const nonTravelLatest = latest.filter(post => post.category !== '旅行' && post.category !== '温泉地ガイド');
  
  // 旅行記事も新着記事に含める
  const allLatestPosts = [...nonTravelLatest, ...travelPosts];
  
  // 重複を除去（slugとtitleの組み合わせでユニークにする）
  const uniqueLatestPosts = allLatestPosts.filter((post, index, self) => 
    index === self.findIndex(p => p.slug === post.slug && p.title === post.title)
  );
  
  uniqueLatestPosts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      latestArticles,
      travelPosts,
      latest: uniqueLatestPosts, // すべての記事を渡す（AIアプリセクションで必要なため）
    },
  };
};

