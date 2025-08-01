import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Affiliate Blog</h1>
              <span className="ml-4 text-sm text-gray-500">睡眠・健康、日本茶、海外トレンド、日本人気商品を発信する総合アフィリエイトサイト</span>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* カテゴリセクション */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">カテゴリ別商品比較</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/sleep-health" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">😴</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">睡眠・健康</h3>
                <p className="text-sm text-gray-600">枕・マットレス・睡眠改善情報</p>
              </div>
            </Link>
            <Link href="/japanese-tea" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">🍵</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">日本茶関連</h3>
                <p className="text-sm text-gray-600">緑茶・抹茶・お茶文化の紹介</p>
              </div>
            </Link>
            <Link href="/overseas-trend" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">🌍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">海外トレンド</h3>
                <p className="text-sm text-gray-600">海外で話題の商品を日本で</p>
              </div>
            </Link>
            <Link href="/japan-popular" className="group">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">🇯🇵</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">日本人気商品</h3>
                <p className="text-sm text-gray-600">国内で注目のアイテム</p>
              </div>
            </Link>
          </div>
        </section>

        {/* 新着記事セクション */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">新着記事</h2>
            <span className="ml-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/articles/2025-07-07-makura-series-summary" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">枕シリーズ総まとめ (2025年7月)</h3>
                  <p className="text-sm text-gray-600 mb-4">枕選びの決定版！全ランキングを一覧で</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>2025.07.07</span>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/articles/2025-07-06-hotel-makura-ranking" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">ホテル枕ランキング</h3>
                  <p className="text-sm text-gray-600 mb-4">高級ホテルで使われる枕を徹底比較</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>2025.07.06</span>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/articles/2025-07-05-sobagara-makura-ranking" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">そば殻枕ランキング</h3>
                  <p className="text-sm text-gray-600 mb-4">自然素材のそば殻枕を徹底検証</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>2025.07.05</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* 商品比較セクション */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">実際に商品を購入して徹底的に比較・検証</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">枕</span>
                <span className="ml-2 text-sm text-gray-500">7商品</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">枕総合ランキング</h3>
              <p className="text-sm text-gray-600 mb-4">価格・機能・口コミの3軸で徹底比較</p>
              <Link href="/articles/2025-07-01-makura-ranking" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                詳細を見る →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">発毛剤</span>
                <span className="ml-2 text-sm text-gray-500">3商品</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">定番発毛剤比較</h3>
              <p className="text-sm text-gray-600 mb-4">効果・価格・使いやすさを検証</p>
              <Link href="/articles/2025-07-02-teihannpatsu-vs-others" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                詳細を見る →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">日本茶</span>
                <span className="ml-2 text-sm text-gray-500">5商品</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">日本茶ランキング</h3>
              <p className="text-sm text-gray-600 mb-4">味・香り・価格で厳選</p>
              <Link href="/articles/2025-07-03-kouhanpatsu-ranking" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                詳細を見る →
              </Link>
            </div>
          </div>
        </section>

        {/* 今後の機能 */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">今後の機能実装予定</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 text-xs">1</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">カテゴリ別ページでの記事一覧表示</h3>
                <p className="text-xs text-gray-600 mt-1">商品カテゴリごとに整理された記事一覧</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 text-xs">2</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">アフィリエイトリンクと関連商品紹介</h3>
                <p className="text-xs text-gray-600 mt-1">各記事に商品リンクと関連商品を追加</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 text-xs">3</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">AIお助けボットによる購入相談機能</h3>
                <p className="text-xs text-gray-600 mt-1">ユーザーの悩みに応じた商品推薦</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-blue-600 text-xs">4</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">自動データ収集・ランキング生成</h3>
                <p className="text-xs text-gray-600 mt-1">最新の商品情報を自動で更新</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

