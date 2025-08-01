// pages/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* サイトタイトル */}
      <h1 className="text-4xl font-bold mb-6 text-center">
        Affiliate Blog
      </h1>

      {/* サイト説明 */}
      <p className="mb-8 text-gray-600 text-center">
        睡眠・健康、日本茶、海外トレンド、日本人気商品を発信する総合アフィリエイトサイト
      </p>

      {/* カテゴリーリンク */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg font-medium">
        <Link href="/sleep-health" className="block bg-white border rounded-lg shadow hover:shadow-lg p-6 transition">
          🛏 睡眠・健康
          <p className="mt-2 text-sm text-gray-500">枕・マットレス・睡眠改善情報</p>
        </Link>

        <Link href="/japanese-tea" className="block bg-white border rounded-lg shadow hover:shadow-lg p-6 transition">
          🍵 日本茶関連
          <p className="mt-2 text-sm text-gray-500">緑茶・抹茶・お茶文化の紹介</p>
        </Link>

        <Link href="/overseas-trend" className="block bg-white border rounded-lg shadow hover:shadow-lg p-6 transition">
          🌍 海外トレンド
          <p className="mt-2 text-sm text-gray-500">海外で話題の商品を日本で</p>
        </Link>

        <Link href="/japan-popular" className="block bg-white border rounded-lg shadow hover:shadow-lg p-6 transition">
          🇯🇵 日本人気商品
          <p className="mt-2 text-sm text-gray-500">国内で注目のアイテム</p>
        </Link>
      </div>

      {/* 新着記事エリア */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">🆕 新着記事</h2>
        <ul className="list-disc list-inside text-blue-600">
          <li>
            <Link href="/articles/2025-07-07-makura-series-summary">
              枕シリーズ総まとめ（2025年7月）
            </Link>
          </li>
          <li>
            <Link href="/articles/2025-07-06-hotel-makura-ranking">
              ホテル枕ランキング
            </Link>
          </li>
          <li>
            <Link href="/articles/2025-07-05-sobagara-makura-ranking">
              そば殻枕ランキング
            </Link>
          </li>
        </ul>
      </section>

      {/* 今後の機能紹介 */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">🚀 今後の機能</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>カテゴリ別ページでの記事一覧表示</li>
          <li>各記事ページにアフィリエイトリンクと関連商品紹介</li>
          <li>AIお助けボットによる購入相談機能</li>
          <li>将来的に自動データ収集・ランキング生成の一部実装</li>
        </ul>
      </section>
    </div>
  );
}

