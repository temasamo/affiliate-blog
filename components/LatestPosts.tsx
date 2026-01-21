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
  // 旅行記事の場合（カテゴリが"旅行"、"旅行・観光"、"旅館・温泉"、"東京観光"、"温泉地ガイド"などの旅行関連）
  if (category === "旅行" || category === "旅行・観光" || category === "旅館・温泉" || category === "東京観光" || category === "温泉地ガイド" || category === "travel" || slug.includes("ryokan") || slug.includes("travel") || slug.includes("onsen")) {
    // 名月荘の記事の特別処理
    if (slug === "meigetsuso-part1") {
      return `/travel/ryokan/2025-10-15-meigetsuso-part1`;
    }
    if (slug === "meigetsuso-part2") {
      return `/travel/ryokan/2025-10-17-meigetsuso-part2`;
    }
    
    // 古窯の記事の特別処理
    if (slug === "koyo-onsen-part1") {
      return `/travel/ryokan/2025-10-29-koyo-onsen-part1`;
    }
    if (slug === "koyo-onsen-part2") {
      return `/travel/ryokan/2025-10-29-koyo-onsen-part2`;
    }
    if (slug === "koyo-renewal" || slug.includes("koyo-renewal") || slug === "2025-11-01-koyo-renewal" || slug.includes("2025-11-01-koyo-renewal")) {
      return `/travel/ryokan/2025-11-01-koyo-renewal`;
    }
    
    // 東京タワー・六本木イルミネーション記事の特別処理
    if (slug === "tokyo-tower-roppongi-illumination") {
      return `/travel/others/2025-11-tokyo-winter-illumination`;
    }
    
    // 恵比寿イルミネーション記事の特別処理
    if (slug === "ebisu-winter-illumination") {
      return `/travel/others/2025-11-ebisu-winter-illumination`;
    }
    
    // 新宿イルミネーション記事の特別処理
    if (slug === "shinjuku-winter-illumination" || slug.includes("shinjuku-winter-illumination")) {
      return `/travel/others/2025-12-06-shinjuku-winter-illumination`;
    }
    
    // 浅草初詣記事の特別処理
    if (slug === "asakusa-newyear-intro" || slug.includes("asakusa-newyear-intro")) {
      return `/travel/others/2025-12-18-asakusa-newyear-intro`;
    }
    if (slug === "asakusa-newyear-part1" || slug.includes("asakusa-newyear-part1")) {
      return `/travel/others/2025-12-18-asakusa-newyear-part1`;
    }
    if (slug === "asakusa-newyear-part2" || slug.includes("asakusa-newyear-part2")) {
      return `/travel/others/2025-12-18-asakusa-new-year-part2`;
    }
    
    // ファイルパス形式のslugを処理（例: "ryokan/2025-11-01-koyo-renewal", "others/2025-11-10-fujigoko-petstay", "onsen/kusatsu-onsen-guide-with-sake"）
    if (slug.includes('/')) {
      return `/travel/${slug}`;
    }
    
    // 草津温泉記事の特別処理（フロントマターのslugの場合）
    if (slug === "kusatsu-onsen-guide" || slug.includes("kusatsu-onsen-guide-with-sake")) {
      return `/travel/onsen/kusatsu-onsen-guide-with-sake`;
    }
    
    // 温泉地ガイド記事の場合
    if (subcategory === "温泉地ガイド" || category === "温泉地ガイド") {
      return `/travel/onsen/${slug}`;
    }
    
    // 個別旅館記事の場合
    if (subcategory === "個別旅館" || subcategory === "おすすめ個別旅館ガイド") {
      return `/travel/ryokan/${slug}`;
    }
    
    return `/travel/${slug}`;
  }
  
  // 温泉地ガイド記事の場合
  if (category === "温泉地ガイド") {
    // ファイルパス形式のslugを処理（例: "onsen/kusatsu-onsen"）
    if (slug.includes('/')) {
      return `/travel/${slug}`;
    }
    return `/travel/onsen/${slug}`;
  }
  
  // Global Hot Picksの場合
  if (category === "global-hot-picks" || category === "海外トレンド" || category === "Global Hot Picks") {
    return `/articles/global-hot-picks/trend/${slug}`;
  }
  
  // 診断AI記事の場合
  if (category === "診断AI") {
    return `/diagnostic-ai/makura/${slug}`;
  }
  
  // sleep-healthカテゴリの記事の場合
  if (category === "sleep-health") {
    return `/articles/sleep-health/health/${slug}`;
  }

  // 睡眠・健康カテゴリの記事の場合
  if (category === "睡眠・健康") {
    // Group6（抱き枕編）に属するスラッグを優先判定
    const group6Slugs = [
      "hugpillow-effect",
      "global-pillow-material-guide",
      "mogu-body-pillow-guide",
      "world-pillow-brands-comparison",
      "japan-pillow-brands",
      "japan-expert-pillow-brands",
      "european-luxury-pillow-brands",
      "japan-vs-global-pillow-brands",
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
    if (slug === "japanese-tea-basics") {
      return `/articles/japanesetea/knowledge/2025-10-30-japanese-tea-basics`;
    }
    if (slug === "what-is-sencha") {
      return `/articles/japanesetea/knowledge/2025-10-30-sencha`;
    }
    if (slug === "deep-steamed-sencha") {
      return `/articles/japanesetea/knowledge/2025-11-02-deep-steamed-sencha`;
    }
    if (slug === "gyokuro") {
      return `/articles/japanesetea/knowledge/2025-11-03-gyokuro`;
    }
    if (slug === "matcha") {
      return `/articles/japanesetea/knowledge/2025-11-06-matcha`;
    }
    if (slug === "kabusecha") {
      return `/articles/japanesetea/knowledge/2025-11-07-kabusecha`;
    }
    if (slug === "hojicha") {
      return `/articles/japanesetea/knowledge/2025-11-13-hojicha`;
    }
    if (slug === "genmaicha") {
      return `/articles/japanesetea/knowledge/2025-11-14-genmaicha`;
    }
    if (slug === "bancha") {
      return `/articles/japanesetea/knowledge/2025-11-17-bancha`;
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
    // 特定の記事の修正
    if (slug === "ai-skin-analysis") {
      return `/articles/ai-apps/recommend/2025-10-29-ai-skin-analysis`;
    }
    if (slug === "ai-health-tracking") {
      return `/articles/ai-apps/recommend/2025-10-31-ai-health-tracking`;
    }
    if (slug === "ai-fashion-coordination-apps") {
      return `/articles/ai-apps/recommend/2025-11-02-ai-fashion-coordination`;
    }
    if (slug === "ai-mental-health-apps") {
      return `/articles/ai-apps/recommend/2025-11-05-ai-mental-health`;
    }
    if (slug === "ai-travel-planner-apps") {
      return `/articles/ai-apps/recommend/2025-11-08-ai-travel-planner-apps`;
    }
    if (slug === "ai-learning-support-apps") {
      return `/articles/ai-apps/recommend/2025-11-12-ai-learning-support-apps`;
    }
    if (slug === "ai-productivity-apps") {
      return `/articles/ai-apps/recommend/2025-11-20-ai-productivity-apps`;
    }
    if (slug === "ai-kakeibo-2025") {
      return `/articles/ai-apps/recommend/2025-12-11-ai-kakeibo-2025`;
    }
    if (slug === "ai-schedule-task-management-2026-newyear" || slug.includes("ai-schedule-task-management-2026-newyear")) {
      return `/articles/ai-apps/recommend/2026-01-07-ai-schedule-task-manegement-2026-newyear`;
    }
    
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
    // 特定の記事の修正
    if (slug === "juyondai-complete") {
      return `/articles/japanesesake/brands/juuyonndai`;
    }
    // slugがsake-5types-part1の場合はファイル名ベースのパスに変換
    if (slug === "sake-5types-part1") {
      return `/articles/japanesesake/knowledge/2025-11-21-sake-5types-part1`;
    }
    // slugがsake-5types-10brands-part2の場合はファイル名ベースのパスに変換
    if (slug === "sake-5types-10brands-part2") {
      return `/articles/japanesesake/knowledge/2025-11-22-sake-5types-10brands-part2`;
    }
    // slugがkirekei-top5-part1の場合はファイル名ベースのパスに変換
    if (slug === "kirekei-top5-part1") {
      return `/articles/japanesesake/knowledge/2025-11-30-kirekei-top5-part1`;
    }
    // slugがumami-type-part1の場合はファイル名ベースのパスに変換
    if (slug === "umami-type-part1" || slug.includes("umami-type-part1")) {
      return `/articles/japanesesake/knowledge/2025-12-03-umami-type-part1`;
    }
    // slugがumami-sake-guide-part2の場合はファイル名ベースのパスに変換
    if (slug === "umami-sake-guide-part2" || slug.includes("umami-sake-guide-part2")) {
      return `/articles/japanesesake/knowledge/2025-12-04-umami-sake-guide-part2`;
    }
    // balance-sake-guide-part1 のファイル名ベースのパスに変換
    if (slug === "balance-sake-guide-part1" || slug.includes("balance-sake-guide-part1")) {
      return `/articles/japanesesake/knowledge/2025-12-09-balance-sake-guide-part1`;
    }
    // balance-sake-guide-part2 のファイル名ベースのパスに変換
    if (slug === "balance-sake-guide-part2" || slug.includes("balance-sake-guide-part2")) {
      return `/articles/japanesesake/knowledge/2025-12-12-balance-sake-guide-part2`;
    }
    // modern-sake-guide-part1 のファイル名ベースのパスに変換
    if (slug === "modern-sake-guide-part1" || slug.includes("modern-sake-guide-part1")) {
      return `/articles/japanesesake/knowledge/2025-12-16-modern-sake-guide-part1`;
    }
    // modern-sake-guide-part2 のファイル名ベースのパスに変換
    if (slug === "modern-sake-guide-part2" || slug.includes("modern-sake-guide-part2")) {
      return `/articles/japanesesake/knowledge/2025-12-17-modern-guide-part2`;
    }
    // typeフィールドまたはslugから推測してサブディレクトリを決定
    const isDateSlug = /^\d{4}-\d{2}-\d{2}-/.test(slug);
    if (isDateSlug || slug.includes("knowledge") || slug.includes("kirekei") || slug.includes("2025-10-11-nihonshu-intro") || slug.includes("2025-10-12-nihonshu-history") || slug.includes("2025-10-13-nihonshu-ingredients") || slug.includes("2025-10-13-nihonshu-seimaibuai") || slug.includes("2025-10-15-nihonshu-classification") || slug.includes("2025-10-16-nihonshu-temperature") || slug.includes("2025-10-17-nihonshu-flavor") || slug.includes("2025-10-18-nihonshu-storage") || slug.includes("2025-10-23-nihonshu-tastechange") || slug.includes("2025-10-29-nihonshu-brewing-methods") || slug.includes("2025-10-30-nihonshu-nama-vs-hiire") || slug.includes("2025-11-01-seimaibuai") || slug.includes("2025-11-04-nihonshu-genshu") || slug.includes("2025-11-04-nihonshu-muroka-jukusei-hiyaoroshi") || slug.includes("2025-11-11-nihonshu-") || slug.includes("2025-11-21-sake-5types-part1") || slug.includes("sake-5types") || slug.includes("sake-fruity-7brands-for-learners") || slug.includes("nihonshu-")) {
      return `/articles/japanesesake/knowledge/${slug}`;
    }
    // デフォルトはbrands
    return `/articles/japanesesake/brands/${slug}`;
  }
  
  // ウイスキーカテゴリの記事の場合
  if (category === "ウイスキー知識" || category === "ウイスキー") {
    // 特定の記事の修正
    if (slug === "yamazaki-hakushu") {
      return `/articles/whisky/brands/2025-11-12-yamazaki-hakushu`;
    }
    if (slug === "nikka-three-pillars") {
      return `/articles/whisky/brands/2025-11-12-nikka-three-pillars`;
    }
    // global-major-whiskies-part1のファイル名ベースのパスに変換
    if (slug === "global-major-whiskies-part1") {
      return `/articles/whisky/knowledge/2025-11-29-global-major-whiskies-part1`;
    }
    // global-major-whiskies-part2のファイル名ベースのパスに変換
    if (slug === "global-major-whiskies-part2" || slug.includes("global-major-whiskies-part2")) {
      return `/articles/whisky/knowledge/2025-12-02-global-major-whiskies-part2`;
    }
    // why-yamazaki-hakushu-shortage-part1のファイル名ベースのパスに変換
    if (slug === "why-yamazaki-hakushu-shortage-part1" || slug.includes("why-yamazaki-hakushu-shortage-part1")) {
      return `/articles/whisky/knowledge/2025-11-25-why-yamazaki-hakushu-shortage-part1`;
    }
    // why-yamazaki-hakushu-shortage-part2のファイル名ベースのパスに変換
    if (slug === "why-yamazaki-hakushu-shortage-part2" || slug.includes("why-yamazaki-hakushu-shortage-part2")) {
      return `/articles/whisky/knowledge/2025-11-26-why-yamazaki-hakushu-shortage-part2`;
    }
    // jimbeam-smoky-highballのファイル名ベースのパスに変換
    if (slug === "jimbeam-smoky-highball" || slug.includes("jimbeam-smoky-highball")) {
      return `/articles/whisky/knowledge/2025-12-07-jimbeam-smoky-highball`;
    }
    // white-kaku-highball-review のファイル名ベースのパスに変換
    if (slug === "white-kaku-highball-review" || slug.includes("white-kaku-highball-review")) {
      return `/articles/whisky/knowledge/2025-12-10-white-kaku-highball-review`;
    }
    // teachers-true-smoky-highball のファイル名ベースのパスに変換
    if (slug === "teachers-true-smoky-highball" || slug.includes("teachers-true-smoky-highball")) {
      return `/articles/whisky/knowledge/2025-12-14-teachers-true-smoky-highball`;
    }
    // カテゴリーが「ウイスキー知識」の場合は常にknowledgeにルーティング
    if (category === "ウイスキー知識") {
      // slugがファイル名形式（日付プレフィックス付き）の場合はそのまま使用
      if (slug.includes("2025-") || slug.includes("2026-")) {
        return `/articles/whisky/knowledge/${slug}`;
      }
      // slugが短い形式の場合は、ファイル名を推測する必要がある
      // ただし、正確なファイル名が分からない場合は、slugをそのまま使用
      return `/articles/whisky/knowledge/${slug}`;
    }
    // subcategoryから推測してサブディレクトリを決定
    if (subcategory === "知識") {
      return `/articles/whisky/knowledge/${slug}`;
    }
    // slugから推測してサブディレクトリを決定
    if (slug.includes("knowledge") || slug.includes("basic")) {
      return `/articles/whisky/knowledge/${slug}`;
    }
    // デフォルトはbrands（銘柄紹介）
    return `/articles/whisky/brands/${slug}`;
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
    if (slug === "christmas-birthday-beauty-gift-2025") {
      return `/articles/events/seasonal/${slug}`;
    }
    // その他のイベント記事は一般的なパス
    return `/articles/events/${slug}`;
  }
  
  // 一般教養カテゴリの記事の場合
  if (category === "一般教養" || category === "general-knowledge" || category === "industry-analysis" || category === "海外展開" || category === "海外展開・国際経営" || category === "海外展開・専門家の役割" || category === "海外進出") {
    // slugがファイル名形式（例: "2025-11-27-japan-doge", "2026-01-09-overseas-expansion-map-for-smbs"）の場合はそのまま使用
    if (slug.includes("2025-") || slug.includes("2026-")) {
      return `/articles/general-knowledge/knowledge/${slug}`;
    }
    // overseas-expansion-industry-shift-10yearsのファイル名ベースのパスに変換
    if (slug === "overseas-expansion-industry-shift-10years" || slug.includes("overseas-expansion-industry-shift-10years")) {
      return `/articles/general-knowledge/knowledge/2026-01-09-overseas-expansion-industry-shift-10years`;
    }
    // overseas-expansion-support-players-tax-accountantのファイル名ベースのパスに変換
    if (slug === "overseas-expansion-support-players-tax-accountant" || slug.includes("overseas-expansion-support-players-tax-accountant")) {
      return `/articles/general-knowledge/knowledge/2026-01-09-overseas-expansion-support-players-tax-accountant`;
    }
    // overseas-expansion-data-analysis-smbのファイル名ベースのパスに変換
    if (slug === "overseas-expansion-data-analysis-smb" || slug.includes("overseas-expansion-data-analysis-smb")) {
      return `/articles/general-knowledge/knowledge/2026-01-09-overseas-expansion-data-analysis-smb`;
    }
    // sme-overseas-expansion-recent-trends-successのファイル名ベースのパスに変換
    if (slug === "sme-overseas-expansion-recent-trends-success" || slug.includes("sme-overseas-expansion-recent-trends-success")) {
      return `/articles/general-knowledge/knowledge/2026-01-10-sme-overseas-expansion-recent-trends-success`;
    }
    // sme-overseas-expansion-supporters-selectionのファイル名ベースのパスに変換
    if (slug === "sme-overseas-expansion-supporters-selection" || slug.includes("sme-overseas-expansion-supporters-selection")) {
      return `/articles/general-knowledge/knowledge/2026-01-13-sme-overseas-expansion-supporters-selection`;
    }
    // aws-ainfra-impactのファイル名ベースのパスに変換
    if (slug === "aws-ainfra-impact" || slug.includes("aws-ainfra-impact")) {
      return `/articles/general-knowledge/knowledge/2025-12-08-aws-ainfra-impact`;
    }
    // country-risk-china-recent-tensionsのファイル名ベースのパスに変換
    if (slug === "country-risk-china-recent-tensions" || slug.includes("country-risk-china-recent-tensions")) {
      return `/articles/general-knowledge/knowledge/2025-12-12-country-risk-china-recent-tensions`;
    }
    // country-risk-china-4-typesのファイル名ベースのパスに変換
    if (slug === "country-risk-china-4-types" || slug.includes("country-risk-china-4-types")) {
      return `/articles/general-knowledge/knowledge/2025-12-14-country-risk-china-4-types`;
    }
    // what-is-tax-reform-outlineのファイル名ベースのパスに変換
    if (slug === "what-is-tax-reform-outline" || slug.includes("what-is-tax-reform-outline")) {
      return `/articles/general-knowledge/knowledge/2025-12-18-what-is-tax-reform-outline`;
    }
    // toyota-china-risk-overviewのファイル名ベースのパスに変換
    if (slug === "toyota-china-risk-overview" || slug.includes("toyota-china-risk-overview")) {
      return `/articles/general-knowledge/knowledge/2025-12-19-toyota-chaina-risk-overview`;
    }
    // 税制改正記事のファイル名ベースのパスに変換
    if (slug === "tax-reform-outline-2026-individual" || slug.includes("tax-reform-outline-2026-individual")) {
      return `/articles/general-knowledge/knowledge/2025-12-20-tax-reform-outline-2026-individual`;
    }
    if (slug === "tax-reform-outline-2026-corporate-state" || slug.includes("tax-reform-outline-2026-corporate-state")) {
      return `/articles/general-knowledge/knowledge/2025-12-20-tax-reform-outline-2026-corporate-state`;
    }
    if (slug === "tax-reform-2026-overall-map" || slug.includes("tax-reform-2026-overall-map")) {
      return `/articles/general-knowledge/knowledge/2025-12-20-tax-reform-2026-overall-map`;
    }
    if (slug === "tax-reform-2026-individual-detail" || slug.includes("tax-reform-2026-individual-detail")) {
      return `/articles/general-knowledge/knowledge/2025-12-20-tax-reform-2026-individual-detail`;
    }
    if (slug === "tax-reform-2026-corporate-detail" || slug.includes("tax-reform-2026-corporate-detail")) {
      return `/articles/general-knowledge/knowledge/2025-12-20-tax-reform-2026-corporate-detail`;
    }
    if (slug === "tax-reform-2026-global-enterprise" || slug.includes("tax-reform-2026-global-enterprise")) {
      return `/articles/general-knowledge/knowledge/2025-12-20-tax-reform-2026-global-enterprise`;
    }
    // slugが短い形式（例: "japan-doge"）の場合、ファイル名を推測
    // 実際のファイル名は "2025-11-27-japan-doge" のような形式を想定
    // ただし、正確なファイル名が分からない場合は、slugをそのまま使用
    // 記事詳細ページのgetStaticPathsがファイル名から生成するため、
    // ここではslugをそのまま使用し、実際のファイル名と一致させる必要がある
    return `/articles/general-knowledge/knowledge/${slug}`;
  }
  
  // その他の記事は一般的なパス
  return `/articles/${slug}`;
}

export default function LatestPosts({ items }: { items: Item[] }) {
  if (!items?.length) {
    console.log('LatestPosts: items is empty or undefined', items);
    return null;
  }

  console.log('LatestPosts: received items', items.slice(0, 5).map(i => ({ slug: i.slug, category: i.category, date: i.date })));

  // 重複を除去（slugとcategoryの組み合わせでユニークにする）
  // 同じ記事を指す異なるslug（例: tokyo-tower-roppongi-illumination と others/2025-11-tokyo-winter-illumination）も除去
  const uniqueItems = items.filter((item, index, self) => {
    // 同じslugとcategoryの組み合わせで既に存在する場合は除去
    const isDuplicateBySlug = index !== self.findIndex(t => 
      t.slug === item.slug && t.category === item.category
    );
    
    if (isDuplicateBySlug) {
      return false;
    }
    
    // 同じ記事を指す異なるslugを検出（ファイルパス形式のslugを優先）
    if (item.category === '東京観光') {
      // tokyo-tower-roppongi-illumination と others/2025-11-tokyo-winter-illumination は同じ記事
      if (item.slug === 'tokyo-tower-roppongi-illumination') {
        const hasFileBasedSlug = self.some((t, idx) => 
          idx !== index &&
          t.slug === 'others/2025-11-tokyo-winter-illumination' && 
          t.category === '東京観光' &&
          t.date === item.date &&
          t.title === item.title
        );
        if (hasFileBasedSlug) {
          return false; // ファイルパス形式のslugを優先して、短いslugを除去
        }
      }
    }
    
    return true;
  });
  
  console.log('LatestPosts: uniqueItems', uniqueItems.slice(0, 5).map(i => ({ slug: i.slug, category: i.category, date: i.date })));

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

      <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {uniqueItems.slice(0, 5).map((p) => (
          <Link
            key={p.slug}
            href={getArticlePath(p.slug, p.category, p.subcategory)}
            className="
              group block rounded-xl border border-gray-200 bg-white
              p-3 sm:p-4 md:p-5 hover:shadow-md hover:border-gray-300 
              transition-all duration-200 hover:-translate-y-1
            "
          >
            <div className="mb-2 sm:mb-3 flex items-center gap-2">
              {p.category && (
                <span
                  className="
                    inline-flex items-center rounded-full
                    border border-gray-300 px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1
                    text-[10px] sm:text-xs font-medium
                    bg-gray-50 text-gray-700
                  "
                >
                  {p.category}
                </span>
              )}
              {p.date && (
                <time
                  className="text-[10px] sm:text-xs text-gray-500"
                  dateTime={p.date}
                  aria-label="公開日"
                >
                  {p.date}
                </time>
              )}
            </div>
            <h3 className="
              line-clamp-2 text-xs sm:text-sm md:text-base font-medium text-gray-900
              group-hover:text-blue-600 transition-colors mb-1.5 sm:mb-2
            ">
              {p.title}
            </h3>
            {p.description && (
              <p className="
                line-clamp-2 text-[10px] sm:text-xs md:text-sm text-gray-600
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
