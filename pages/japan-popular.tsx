// pages/japan-popular.tsx
import Link from 'next/link';

export default function JapanPopular() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">🇯🇵 日本人気商品</h1>
      <p className="mb-8 text-gray-600">
        海外で人気のある日本由来の商品や文化を紹介します。
      </p>

      <ul className="space-y-3 list-disc list-inside">
        <li>
          <Link href="/articles/2025-xx-xx-matcha-sweets">
            海外で人気の抹茶スイーツ特集
          </Link>
        </li>
        <li>
          <Link href="/articles/2025-xx-xx-japanese-tableware">
            海外で人気の和食器ランキング
          </Link>
        </li>
      </ul>
    </div>
  );
}
