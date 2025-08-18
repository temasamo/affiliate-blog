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

export async function searchRakuten({
  keyword, minPrice, maxPrice, hits = 24
}: { keyword: string; minPrice?: number; maxPrice?: number; hits?: number; }) {
  const appId = process.env.RAKUTEN_APP_ID;
  if (!appId) throw new Error("RAKUTEN_APP_ID missing");

  // ← 楽天の上限は 30。念のため 1〜30 に丸める
  const safeHits = Math.min(Math.max(hits ?? 24, 1), 30);

  const qs = new URLSearchParams({
    applicationId: appId,
    keyword: keyword || "枕",
    hits: String(safeHits),
    sort: "-reviewCount",
  });
  if (typeof minPrice === "number") qs.set("minPrice", String(minPrice));
  if (typeof maxPrice === "number") qs.set("maxPrice", String(maxPrice));

  const url = `${BASE}?${qs.toString()}`;
  const r = await fetch(url);
  const text = await r.text();                // ← 失敗時の本文も取得
  if (!r.ok) {
    console.warn("Rakuten API error:", r.status, text); // ← デバッグ用ログ
    throw new Error(`Rakuten API ${r.status}`);
  }
  const j = JSON.parse(text);

  const items: RakutenItem[] = (j?.Items ?? []).map((x: any) => x.Item);
  return items.map((it) => {
    // 複数画像を取得
    const images = [
      it.mediumImageUrls?.[0]?.imageUrl,
      it.mediumImageUrls?.[1]?.imageUrl,
      it.smallImageUrls?.[0]?.imageUrl,
    ].filter((url): url is string => Boolean(url));
    
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