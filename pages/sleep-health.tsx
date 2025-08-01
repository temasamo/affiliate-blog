// pages/sleep-health.tsx
import Link from 'next/link';

export default function SleepHealth() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">🛏 睡眠・健康</h1>
      <p className="mb-8 text-gray-600">
        枕・マットレス・快眠グッズなど、睡眠の質を高める情報や商品を紹介します。
      </p>

      <ul className="space-y-3 list-disc list-inside">
        <li>
          <Link href="/articles/2025-07-07-makura-series-summary">
            枕シリーズ総まとめ
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
    </div>
  );
}
