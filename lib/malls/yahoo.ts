import { UnifiedProduct } from "./types";

export async function searchYahoo(params: {
  keyword: string;
  hits?: number;
  minPrice?: number;
  maxPrice?: number;
}): Promise<UnifiedProduct[]> {
  if (!process.env.YAHOO_APP_ID) return [];

  const qs = new URLSearchParams({
    appid: process.env.YAHOO_APP_ID!,
    query: params.keyword,
    results: String(params.hits ?? 20),
    availability: "1", // 在庫あり優先
    sort: "-review_count",
  });
  const url = `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?${qs}`;

  const r = await fetch(url);
  if (!r.ok) return [];
  const j = await r.json();

  const items = j?.hits ?? [];
  const mapped: UnifiedProduct[] = items.map((it: any) => ({
    id: `yahoo:${it.code}`,
    title: it.name,
    price: Number(it.price) || null,
    currency: "JPY",
    image: it.image?.medium || it.image?.small || null,
    url: it.url, // ValueCommerce 経由にしたい場合は別途ラップ
    store: { key: "yahoo", name: "Yahoo!" },
    score: 0,
    tags: [],
  }));

  // 価格フィルタ（手元で）
  return mapped.filter(p => {
    if (params.minPrice && (p.price ?? 0) < params.minPrice) return false;
    if (params.maxPrice && (p.price ?? 0) > params.maxPrice) return false;
    return true;
  });
} 