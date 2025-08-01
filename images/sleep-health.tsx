// pages/sleep-health.tsx
import Link from 'next/link';

export default function SleepHealth() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">睡眠・健康 カテゴリー</h1>
      <p className="mb-8 text-gray-600">
        枕・マットレス・快眠グッズなど、睡眠の質を高める商品や情報を紹介します。
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">枕シリーズ（2025年7月）</h2>
      <ul className="space-y-3">
        <li><Link href="/articles/2025-07-07-makura-series-summary">枕シリーズ総まとめ</Link></li>
        <li><Link href="/articles/2025-07-06-hotel-makura-ranking">ホテル仕様枕ランキング</Link></li>
        <li><Link href="/articles/2025-07-05-sobagara-makura-ranking">そば殻枕ランキング</Link></li>
        <li><Link href="/articles/2025-07-04-umou-makura-ranking">羽毛枕ランキング</Link></li>
        <li><Link href="/articles/2025-07-03-kouhanpatsu-ranking">高反発枕ランキング</Link></li>
        <li><Link href="/articles/2025-07-02-teihannpatsu-vs-others">低反発枕 VS 他素材比較</Link></li>
        <li><Link href="/articles/2025-07-01-makura-ranking">枕総合ランキング</Link></li>
      </ul>
    </div>
  );
}
