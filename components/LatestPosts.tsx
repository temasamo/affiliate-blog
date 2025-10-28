import Link from "next/link";

type Item = {
  slug: string;
  title: string;
  category: string;
  subcategory?: string;
  date: string | null;
  description?: string | null;
};

// 記事のパスを生成する関数
function getArticlePath(slug: string, category: string, subcategory?: string): string {
  // 旅行記事の場合
  if (category === "旅行") {
    // 名月荘後編の特別処理
    if (slug === "meigetsuso-part2") {
      return `/travel/ryokan/2025-10-17-meigetsuso-part2`;
    }
    
    // 温泉地ガイド記事の場合
    if (subcategory === "温泉地ガイド") {
      return `/travel/onsen/${slug}`;
    }
    
    return `/travel/${slug}`;
  }
  
  // 温泉地ガイド記事の場合
  if (category === "温泉地ガイド") {
    return `/travel/${slug}`;
  }
  
  // Global Hot Picksの場合
  if (category === "global-hot-picks" || category === "海外トレンド" || category === "Global Hot Picks") {
    return `/articles/global-hot-picks/trend/${slug}`;
  }
  
  // 診断AI記事の場合
  if (category === "診断AI") {
    return `/diagnostic-ai/makura/${slug}`;
  }
  
  // 睡眠・健康カテゴリの記事の場合
  if (category === "睡眠・健康") {
    // Group6（抱き枕編）に属するスラッグを優先判定
    const group6Slugs = [
      "hugpillow-effect",
      "global-pillow-material-guide",
      "mogu-body-pillow-guide",
    ];
    if (group6Slugs.includes(slug)) {
      return `/articles/sleep-health/pillow/group6/${slug}`;
    }

    // Group5（朝スッキリ編）に属するスラッグを優先判定
    const group5Slugs = [
      "morning-refresh-pillow",
      "straight-neck-pillow",
      "couple-pillow",
      "kids-pillow",
      "seasonal-pillow",
    ];
    if (group5Slugs.includes(slug)) {
      return `/articles/sleep-health/pillow/group5/${slug}`;
    }

    // Group4（特殊編）に属するスラッグを優先判定
    const group4Slugs = [
      "washable-pillow",
      "cool-breathable-pillow",
      "allergy-free-pillow",
      "organic-pillow",
      "smart-pillow",
    ];
    if (group4Slugs.includes(slug)) {
      return `/articles/sleep-health/pillow/group4/${slug}`;
    }

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

  // 日本茶カテゴリの記事の場合
  if (category === "日本茶") {
    // 特定の記事の修正
    if (slug === "remove-teastains") {
      return `/articles/japanesetea/knowledge/2025-10-19-remove-teastains`;
    }
    if (slug === "ryuouen-tea") {
      return `/articles/japanesetea/recommend/ryuuouenn`;
    }
    if (slug === "leaf-opening-tea") {
      return `/articles/japanesetea/knowledge/2025-10-28-leaf-opening-tea`;
    }
    
    // slugから推測してサブディレクトリを決定
    if (slug.includes("knowledge")) {
      return `/articles/japanesetea/knowledge/${slug}`;
    }
    // knowledge以外（dm、recommend、ranking、set等を含む）はrecommend
    if (slug.includes("dm") || slug.includes("recommend") || slug.includes("ranking") || slug.includes("set") || slug === "yamasa-koyamaen" || slug === "kanbayashi-shunsho") {
      return `/articles/japanesetea/recommend/${slug}`;
    }
    // デフォルトはrecommend（多くの記事が推薦系のため）
    return `/articles/japanesetea/recommend/${slug}`;
  }
  
  // AIアプリ情報カテゴリの記事の場合
  if (category === "AIアプリ情報" || category === "AIアプリ紹介" || category === "ai-apps") {
    // subcategoryから推測してサブディレクトリを決定
    if (subcategory === "おすすめAIアプリ") {
      return `/articles/ai-apps/recommend/${slug}`;
    }
    if (subcategory === "AI活用術") {
      return `/articles/ai-apps/knowledge/${slug}`;
    }
    // デフォルトはrecommend
    return `/articles/ai-apps/recommend/${slug}`;
  }
  
  // 日本酒カテゴリの記事の場合
  if (category === "日本酒" || category === "japanesesake") {
    // typeフィールドまたはslugから推測してサブディレクトリを決定
    if (slug.includes("knowledge") || slug.includes("2025-10-11-nihonshu-intro") || slug.includes("2025-10-12-nihonshu-history") || slug.includes("2025-10-13-nihonshu-ingredients") || slug.includes("2025-10-13-nihonshu-seimaibuai") || slug.includes("2025-10-15-nihonshu-classification") || slug.includes("2025-10-16-nihonshu-temperature") || slug.includes("2025-10-17-nihonshu-flavor") || slug.includes("2025-10-18-nihonshu-storage") || slug.includes("2025-10-23-nihonshu-tastechange") || slug.includes("2025-10-29-nihonshu-brewing-methods") || slug.includes("2025-10-30-nihonshu-nama-vs-hiire")) {
      return `/articles/japanesesake/knowledge/${slug}`;
    }
    // デフォルトはbrands
    return `/articles/japanesesake/brands/${slug}`;
  }
  
  // ウイスキーカテゴリの記事の場合
  if (category === "ウイスキー知識" || category === "ウイスキー") {
    // slugから推測してサブディレクトリを決定
    if (slug.includes("knowledge") || slug.includes("basic")) {
      return `/articles/whisky/knowledge/${slug}`;
    }
    // デフォルトはknowledge
    return `/articles/whisky/knowledge/${slug}`;
  }
  
  // 日本茶カテゴリの記事の場合
  if (category === "japanesetea") {
    // slugから推測してサブディレクトリを決定
    if (slug.includes("knowledge") || slug.includes("2025-10-19-remove-teastains") || slug.includes("2025-10-22-bitter-green-tea")) {
      return `/articles/japanesetea/knowledge/${slug}`;
    }
    // デフォルトはrecommend
    return `/articles/japanesetea/recommend/${slug}`;
  }
  
  // イベントカテゴリの記事の場合
  if (category === "イベント") {
    // 季節のイベント（おせちなど）
    if (slug === "osechi") {
      return `/articles/events/seasonal/new-year/${slug}`;
    }
    // その他のイベント記事は一般的なパス
    return `/articles/events/${slug}`;
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
            href={getArticlePath(p.slug, p.category, p.subcategory)}
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
