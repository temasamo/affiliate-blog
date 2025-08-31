// pages/japanese-tea.tsx
import Link from 'next/link';

export default function JapaneseTea() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">日本茶関連 カテゴリー</h1>
      <p className="mb-8 text-gray-600">
        日本茶・抹茶・健康茶の商品比較や文化紹介をお届けします。
      </p>

      <ul className="space-y-3">
        <li><Link href="/articles/2025-xx-xx-tea-health-benefits">日本茶の健康効果まとめ</Link></li>
        <li><Link href="/articles/2025-xx-xx-matcha-recipe">抹茶アレンジレシピ集</Link></li>
      </ul>
    </div>
  );
}
