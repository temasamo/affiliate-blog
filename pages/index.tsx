import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ヒーローセクション */}
        <section className="mb-12 sm:mb-16">
          <div className="bg-gradient-hero rounded-3xl p-8 sm:p-12 text-center shadow-lg border border-gray-100">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Market Supporter AI
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              AIが導く、賢い洞察と信頼できるおすすめ
            </p>
            <Link 
              href="/blog" 
              className="inline-flex items-center px-8 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg hover-lift"
            >
              最新の記事を見る
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* おすすめランキングセクション */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">おすすめランキング</h2>
            <span className="ml-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">HOT</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-6xl">😴</span>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">枕</span>
                  <span className="ml-2 text-xs text-gray-500">7商品比較</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">枕総合ランキング</h3>
                <p className="text-sm text-gray-600 mb-4">価格・機能・口コミの3軸で徹底比較</p>
                <Link href="/articles/sleep-health/recomend/2025-07-01-makura-ranking" className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center transition-colors">
                  詳細を見る
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <span className="text-6xl">🌍</span>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">海外トレンド</span>
                  <span className="ml-2 text-xs text-gray-500">準備中</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">海外トレンド商品</h3>
                <p className="text-sm text-gray-600 mb-4">海外で話題の商品を日本で購入</p>
                <Link href="/overseas-trend" className="text-orange-600 hover:text-orange-800 text-sm font-medium inline-flex items-center transition-colors">
                  詳細を見る
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <span className="text-6xl">🍵</span>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">日本茶</span>
                  <span className="ml-2 text-xs text-gray-500">5商品比較</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">日本茶ランキング</h3>
                <p className="text-sm text-gray-600 mb-4">味・香り・価格で厳選</p>
                <Link href="/articles/japanesetea/recomend/250731matcha-set-recommend-dm" className="text-purple-600 hover:text-purple-800 text-sm font-medium inline-flex items-center transition-colors">
                  詳細を見る
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* カテゴリセクション */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">カテゴリ別商品比較</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Link href="/sleep-health" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 hover-lift scale-hover">
                <div className="text-4xl mb-4">😴</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">睡眠・健康</h3>
                <p className="text-sm text-gray-600">枕・マットレス・睡眠改善情報</p>
              </div>
            </Link>
            <Link href="/japanese-tea" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 hover-lift scale-hover">
                <div className="text-4xl mb-4">🍵</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">日本茶関連</h3>
                <p className="text-sm text-gray-600">緑茶・抹茶・お茶文化の紹介</p>
              </div>
            </Link>
            <Link href="/overseas-trend" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 hover-lift scale-hover">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">海外トレンド</h3>
                <p className="text-sm text-gray-600">海外で話題の商品を日本で</p>
              </div>
            </Link>
            <Link href="/japan-popular" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 hover-lift scale-hover">
                <div className="text-4xl mb-4">🇯🇵</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">人気の日本商品</h3>
                <p className="text-sm text-gray-600">国内で注目のアイテム</p>
              </div>
            </Link>
          </div>
        </section>

        {/* 新着記事セクション */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">新着記事</h2>
            <span className="ml-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">NEW</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Link href="/articles/sleep-health/recomend/2025-07-07-makura-series-summary" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-6xl">😴</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    枕シリーズ総まとめ (2025年7月)
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">枕選びの決定版！全ランキングを一覧で</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>2025.07.07</span>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/articles/sleep-health/recomend/2025-07-06-hotel-makura-ranking" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover">
                <div className="h-48 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                  <span className="text-6xl">🏨</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    ホテル枕ランキング
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">高級ホテルで使われる枕を徹底比較</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>2025.07.06</span>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/articles/sleep-health/recomend/2025-07-05-sobagara-makura-ranking" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-6xl">🌾</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    そば殻枕ランキング
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">自然素材のそば殻枕を徹底検証</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>2025.07.05</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* 今後の機能 */}
        <section className="bg-white rounded-xl shadow-md p-8">
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
        </section>
      </main>

      <Footer />
    </div>
  );
}

