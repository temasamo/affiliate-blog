import fetch from "node-fetch";
import { UnifiedProduct } from "./types";

const BASE = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601";

type RakutenItem = {
  itemName: string;
  itemPrice: number;
  itemUrl: string;
  affiliateUrl?: string;
  mediumImageUrls?: { imageUrl: string }[];
  smallImageUrls?: { imageUrl: string }[];
  itemCode: string;
};

export async function searchRakuten(params: {
  keyword: string;
  minPrice?: number;
  maxPrice?: number;
  hits?: number;
}): Promise<UnifiedProduct[]> {
  const qs = new URLSearchParams({
    applicationId: process.env.RAKUTEN_APP_ID!,
    affiliateId: process.env.RAKUTEN_AFFILIATE_ID!,
    format: "json",
    keyword: params.keyword,
    hits: String(params.hits ?? 20),
    sort: "-reviewCount", // 初期はレビュー数降順が無難
  });
  if (params.minPrice) qs.set("minPrice", String(params.minPrice));
  if (params.maxPrice) qs.set("maxPrice", String(params.maxPrice));

  const res = await fetch(`${BASE}?${qs.toString()}`);
  if (!res.ok) throw new Error(`Rakuten API ${res.status}`);
  const json = await res.json();

  const items: RakutenItem[] = (json?.Items ?? []).map((x: any) => x.Item);
  return items.map((it) => {
    // 複数画像を取得
    const images = [
      it.mediumImageUrls?.[0]?.imageUrl,
      it.mediumImageUrls?.[1]?.imageUrl,
      it.smallImageUrls?.[0]?.imageUrl,
    ].filter(Boolean);
    
    return {
      id: `rakuten:${it.itemCode}`,
      title: it.itemName,
      price: it.itemPrice ?? null,
      currency: "JPY",
      image: images[0] || null,
      images: images, // 複数画像を追加
      url: it.affiliateUrl || it.itemUrl, // affiliateId 指定時は affiliateUrl が付与される
      store: { key: "rakuten", name: "Rakuten" },
      score: 0,
      tags: [],
    };
  });
} 