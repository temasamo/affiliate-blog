// pages/japan-popular.tsx
import Link from 'next/link';

export default function JapanPopular() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">海外人気の日本商品 カテゴリー</h1>
      <p className="mb-8 text-gray-600">
        海外で人気を集めている抹茶スイーツ、和食器、和菓子などを紹介します。
      </p>

      <ul className="space-y-3">
        <li><Link href="/articles/2025-xx-xx-matcha-sweets">海外で人気の抹茶スイーツ特集</Link></li>
        <li><Link href="/articles/2025-xx-xx-japanese-tableware">海外で人気の和食器ランキング</Link></li>
      </ul>
    </div>
  );
}
