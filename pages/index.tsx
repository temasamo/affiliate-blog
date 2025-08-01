import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* ロゴ・タイトル */}
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Affiliate Blog</h1>
              <span className="hidden sm:block ml-4 text-sm text-gray-500">商品比較・ランキング</span>
            </div>

            {/* デスクトップナビゲーション */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/sleep-health" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                睡眠・健康
              </Link>
              <Link href="/japanese-tea" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                日本茶
              </Link>
              <Link href="/overseas-trend" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                海外トレンド
              </Link>
              <Link href="/japan-popular" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                日本人気商品
              </Link>
            </nav>

            {/* モバイルメニューボタン */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* モバイルメニュー */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-3">
                <Link href="/sleep-health" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  睡眠・健康
                </Link>
                <Link href="/japanese-tea" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  日本茶
                </Link>
                <Link href="/overseas-trend" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  海外トレンド
                </Link>
                <Link href="/japan-popular" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                  日本人気商品
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ヒーローセクション */}
        <section className="mb-8 sm:mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              実際に商品を購入して徹底的に比較・検証
            </h2>
            <p className="text-lg opacity-90">
              価格・機能・口コミの3軸で厳選した商品ランキングをお届けします
            </p>
          </div>
        </section>

        {/* カテゴリセクション */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">カテゴリ別商品比較</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Link href="/sleep-health" className="group">
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">😴</div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">睡眠・健康</h3>
                <p className="text-xs sm:text-sm text-gray-600">枕・マットレス・睡眠改善情報</p>
              </div>
            </Link>
            <Link href="/japanese-tea" className="group">
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🍵</div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">日本茶関連</h3>
                <p className="text-xs sm:text-sm text-gray-600">緑茶・抹茶・お茶文化の紹介</p>
              </div>
            </Link>
            <Link href="/overseas-trend" className="group">
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🌍</div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">海外トレンド</h3>
                <p className="text-xs sm:text-sm text-gray-600">海外で話題の商品を日本で</p>
              </div>
            </Link>
            <Link href="/japan-popular" className="group">
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">🇯🇵</div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">日本人気商品</h3>
                <p className="text-xs sm:text-sm text-gray-600">国内で注目のアイテム</p>
              </div>
            </Link>
          </div>
        </section>

        {/* 新着記事セクション */}
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">新着記事</h2>
            <span className="ml-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Link href="/articles/2025-07-07-makura-series-summary" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    枕シリーズ総まとめ (2025年7月)
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">枕選びの決定版！全ランキングを一覧で</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>2025.07.07</span>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/articles/2025-07-06-hotel-makura-ranking" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    ホテル枕ランキング
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">高級ホテルで使われる枕を徹底比較</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>2025.07.06</span>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/articles/2025-07-05-sobagara-makura-ranking" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    そば殻枕ランキング
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">自然素材のそば殻枕を徹底検証</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>2025.07.05</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* 商品比較セクション */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">商品ランキング・比較</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">枕</span>
                <span className="ml-2 text-xs sm:text-sm text-gray-500">7商品</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">枕総合ランキング</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">価格・機能・口コミの3軸で徹底比較</p>
              <Link href="/articles/2025-07-01-makura-ranking" className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium inline-flex items-center">
                詳細を見る
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">発毛剤</span>
                <span className="ml-2 text-xs sm:text-sm text-gray-500">3商品</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">定番発毛剤比較</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">効果・価格・使いやすさを検証</p>
              <Link href="/articles/2025-07-02-teihannpatsu-vs-others" className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium inline-flex items-center">
                詳細を見る
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">日本茶</span>
                <span className="ml-2 text-xs sm:text-sm text-gray-500">5商品</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">日本茶ランキング</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">味・香り・価格で厳選</p>
              <Link href="/articles/2025-07-03-kouhanpatsu-ranking" className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium inline-flex items-center">
                詳細を見る
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* 今後の機能 */}
        <section className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">今後の機能実装予定</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 text-xs">1</span>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-gray-900">カテゴリ別ページでの記事一覧表示</h3>
                <p className="text-xs text-gray-600 mt-1">商品カテゴリごとに整理された記事一覧</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 text-xs">2</span>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-gray-900">アフィリエイトリンクと関連商品紹介</h3>
                <p className="text-xs text-gray-600 mt-1">各記事に商品リンクと関連商品を追加</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 text-xs">3</span>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-gray-900">AIお助けボットによる購入相談機能</h3>
                <p className="text-xs text-gray-600 mt-1">ユーザーの悩みに応じた商品推薦</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 text-xs">4</span>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-gray-900">自動データ収集・ランキング生成</h3>
                <p className="text-xs text-gray-600 mt-1">最新の商品情報を自動で更新</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

