// pages/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* ヘッダー */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold">Affiliate Blog</h1>
        <p className="text-gray-600 mt-2">
          4つのカテゴリーでおすすめ商品と情報をお届け
        </p>
      </header>

      {/* カテゴリーセクション */}
      <section className="grid md:grid-cols-2 gap-6">
        <CategoryCard
          title="睡眠・健康"
          description="枕・マットレス・快眠グッズの比較とレビュー"
          href="/sleep-health"
        />
        <CategoryCard
          title="日本茶関連"
          description="茶葉・抹茶・健康茶のレビューと文化紹介"
          href="/japanese-tea"
        />
        <CategoryCard
          title="海外人気の日本商品"
          description="抹茶スイーツ、和食器、和菓子など海外で人気の日本由来のもの"
          href="/japan-popular"
        />
        <CategoryCard
          title="海外で人気→日本で買える"
          description="海外SNSやAmazon USでバズった商品を日本で購入可能に"
          href="/overseas-trend"
        />
      </section>

      {/* 最新記事リンク（サンプル） */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">最新記事</h2>
        <ul className="space-y-3">
          <li>
            <Link href="/articles/2025-07-07-makura-series-summary">
              枕シリーズ総まとめ
            </Link>
          </li>
          <li>
            <Link href="/articles/2025-07-06-hotel-makura-ranking">
              ホテル仕様枕ランキング
            </Link>
          </li>
          <li>
            <Link href="/articles/2025-07-05-sobagara-makura-ranking">
              そば殻枕ランキング
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}

function CategoryCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="p-6 border rounded-lg hover:shadow-lg transition cursor-pointer bg-white">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
