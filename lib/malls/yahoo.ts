import { UnifiedProduct } from "./types";

export async function searchYahoo({
  keyword,
  minPrice,
  maxPrice,
  hits = 24,
}: {
  keyword: string;
  minPrice?: number;
  maxPrice?: number;
  hits?: number;
}) {
  const appid = process.env.YAHOO_APP_ID;
  if (!appid) return [];

  const qs = new URLSearchParams({
    appid,
    query: keyword,
    results: String(hits),
    sort: "-review_count",
    availability: "1",
  });

  const r = await fetch(`https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?${qs}`);
  if (!r.ok) return [];

  const j = await r.json();
  let items = j?.hits ?? [];

  // 価格帯をローカルで絞る
  if (minPrice || maxPrice) {
    items = items.filter((it: any) => {
      const p = Number(it.price) || 0;
      if (minPrice && p < minPrice) return false;
      if (maxPrice && p > maxPrice) return false;
      return true;
    });
  }

  const prefix = process.env.NEXT_PUBLIC_VC_YAHOO_PREFIX || "";
  return items.map((it: any) => ({
    id: `yahoo:${it.code}`,
    title: it.name,
    price: Number(it.price) || null,
    currency: "JPY",
    image: (it.image?.medium || it.image?.small || "").replace(/^http:/, "https:"),
    url: prefix ? `${prefix}${encodeURIComponent(it.url)}` : it.url,
   // lib/malls/yahoo.ts
   store: { key: 'yahoo' as const, name: 'Yahoo!' as const },// name は as const でなくてもOK
    score: 0,
    tags: [],
  }));
} 