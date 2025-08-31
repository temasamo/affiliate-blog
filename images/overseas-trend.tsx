// pages/overseas-trend.tsx
import Link from 'next/link';

export default function OverseasTrend() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">海外で人気 → 日本で買える カテゴリー</h1>
      <p className="mb-8 text-gray-600">
        海外SNSやAmazon USでバズった商品を、日本でも買える形で紹介します。
      </p>

      <ul className="space-y-3">
        <li><Link href="/articles/2025-xx-xx-overseas-trend-example">海外で話題の○○が日本上陸！</Link></li>
        <li><Link href="/articles/2025-xx-xx-amazonus-hot-items">Amazon USで人気のアイテムまとめ</Link></li>
      </ul>
    </div>
  );
}
