import AmazonPaapi from "amazon-paapi";
import { UnifiedProduct } from "./types";

const commonParams = {
  AccessKey: process.env.AMAZON_ACCESS_KEY!,
  SecretKey: process.env.AMAZON_SECRET_KEY!,
  PartnerTag: process.env.AMAZON_ASSOCIATE_TAG!, // yourtag-22
  PartnerType: "Associates",
  Marketplace: "www.amazon.co.jp",
  Region: "us-east-1", // 署名リージョン。JPでも us-east-1 でOK
};

export async function searchAmazon(params: {
  keyword: string;
  minPrice?: number; // JPY
  maxPrice?: number;
  hits?: number;
}): Promise<UnifiedProduct[]> {
  // 価格フィルタは PA‑API の Resources/Filters では完全一致できないため、取得後に手元で絞り込み
  const res = await AmazonPaapi.SearchItems({
    ...commonParams,
    Keywords: params.keyword,
    ItemCount: params.hits ?? 20,
    Resources: [
      "Images.Primary.Large",
      "ItemInfo.Title",
      "Offers.Listings.Price",
      "Offers.Listings.MerchantInfo",
    ],
  });

  const items = res?.SearchResult?.Items ?? [];
  const mapped: UnifiedProduct[] = items.map((it: any) => {
    const listing = it?.Offers?.Listings?.[0];
    const amount = listing?.Price?.Amount ?? null;
    return {
      id: `amazon:${it.ASIN}`,
      title: it?.ItemInfo?.Title?.DisplayValue ?? "",
      price: amount,
      currency: "JPY",
      image: it?.Images?.Primary?.Large?.URL ?? null,
      url: it?.DetailPageURL, // これにアソシエイトタグが自動付与される
      store: { key: "amazon"　as const, name: "Amazon" },
      score: 0,
      tags: [],
    };
  });

  // 価格で手元フィルタ（指定があれば）
  return mapped.filter(p => {
    if (params.minPrice && (p.price ?? 0) < params.minPrice) return false;
    if (params.maxPrice && (p.price ?? 0) > params.maxPrice) return false;
    return true;
  });
}

/**
 * もし PA‑API の承認が降りておらずレスポンスが取れない場合のフォールバック。
 * 単なる検索URLを生成して、アソシエイトタグ付きで遷移させる（カード表示は楽天メインで埋める）。
 */
export function amazonSearchUrlFallback(keyword: string) {
  const tag = process.env.AMAZON_ASSOCIATE_TAG!;
  const q = encodeURIComponent(keyword);
  return `https://www.amazon.co.jp/s?k=${q}&tag=${tag}`;
} 