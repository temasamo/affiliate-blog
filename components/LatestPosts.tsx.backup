import Link from "next/link";

type Item = {
  slug: string;
  title: string;
  category: string;
  date: string | null;
  description?: string | null;
};

// 記事のパスを生成する関数
function getArticlePath(slug: string, category: string): string {
  // 旅行記事の場合
  if (category === "旅行") {
    return `/travel/${slug}`;
  }
  
  // Global Hot Picksの場合
  if (category === "global-hot-picks" || category === "海外トレンド") {
    return `/articles/global-hot-picks/trend/${slug}`;
  }
  
  // 診断AI記事の場合
  if (category === "診断AI") {
    return `/diagnostic-ai/makura/${slug}`;
  }
  
  // 睡眠・健康カテゴリの記事の場合
  if (category === "睡眠・健康") {
    // Group3の記事を判定
    const group3Slugs = [
      'hotel-style-pillow',
      'pillow-for-kids', 
      'pillow-for-seniors',
      'pillow-for-broad-shoulders',
      'pillow-for-deep-sleep'
    ];
    
    if (group3Slugs.includes(slug)) {
      return `/articles/sleep-health/pillow/group3/${slug}`;
    }
    
    // その他の睡眠・健康記事はgroup2
    return `/articles/sleep-health/pillow/group2/${slug}`;
  }
  
  // その他の記事は一般的なパス
  return `/articles/${slug}`;
}

export default function LatestPosts({ items }: { items: Item[] }) {
  if (!items?.length) return null;

  // 重複を除去（slugとcategoryの組み合わせでユニークにする）
  const uniqueItems = items.filter((item, index, self) => 
    index === self.findIndex(t => t.slug === item.slug && t.category === item.category)
  );

  return (
    <section className="mt-8 md:mt-10">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">新着記事</h2>
        <Link
          href="/contents"
          className="text-sm md:text-base text-blue-600 hover:text-blue-800 underline underline-offset-4 transition-colors"
        >
          すべて見る →
        </Link>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {uniqueItems.slice(0, 5).map((p) => (
          <Link
            key={p.slug}
            href={getArticlePath(p.slug, p.category)}
            className="
              group block rounded-xl border border-gray-200 bg-white
              p-4 md:p-5 hover:shadow-md hover:border-gray-300 
              transition-all duration-200 hover:-translate-y-1
            "
          >
            <div className="mb-3 flex items-center gap-2">
              {p.category && (
                <span
                  className="
                    inline-flex items-center rounded-full
                    border border-gray-300 px-2.5 py-1
                    text-xs font-medium
                    bg-gray-50 text-gray-700
                  "
                >
                  {p.category}
                </span>
              )}
              {p.date && (
                <time
                  className="text-xs text-gray-500"
                  dateTime={p.date}
                  aria-label="公開日"
                >
                  {p.date}
                </time>
              )}
            </div>
            <h3 className="
              line-clamp-2 text-sm md:text-base font-medium text-gray-900
              group-hover:text-blue-600 transition-colors mb-2
            ">
              {p.title}
            </h3>
            {p.description && (
              <p className="
                line-clamp-2 text-xs md:text-sm text-gray-600
                leading-relaxed
              ">
                {p.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
