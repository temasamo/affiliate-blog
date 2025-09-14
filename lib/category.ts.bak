export const CATEGORY_LABELS: Record<string, string> = {
  "sleep-health": "睡眠・健康",
  "japanesetea": "日本茶",
  "global-hot-picks": "海外トレンド",
  "popular-japan": "人気の日本商品",
  "popular-japanese-items": "人気の日本商品",
  "diagnosis": "診断AI",
  "diagnosis-ai": "診断AI",
  "diagnostic-ai": "診断AI",
  "education": "教育",
  "travel": "旅行",
};

export function deriveCategory(p: any): string | null {
  const fm = p?.category && String(p.category).trim();
  if (fm) return fm;
  const slug = String(p?.slug || p?.path || "");
  const hit = Object.keys(CATEGORY_LABELS).find((k) =>
    slug.startsWith(`${k}/`) || slug.includes(`/${k}/`)
  );
  if (hit) return CATEGORY_LABELS[hit];
  
  // blog配下のネストしたディレクトリ構造に対応
  const pathParts = slug.split("/");
  if (pathParts[0] === "blog" && pathParts.length > 1) {
    const nestedHit = Object.keys(CATEGORY_LABELS).find((k) => pathParts[1] === k);
    if (nestedHit) return CATEGORY_LABELS[nestedHit];
  }
  
  return null;
} 