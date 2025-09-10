// utils/aff.ts
type BuildArgs = {
  keyword?: string;        // 検索ワード（どれか1つ指定）
  url?: string;            // 直接飛ばしたいURL（商品ページなど）
  asin?: string;           // AmazonのASIN（指定があれば /dp/<asin> に）
};

// 環境変数をモジュール先頭で固定
const AMAZON_MODE = (process.env.NEXT_PUBLIC_AMAZON_MODE || "moshimo").toLowerCase();
const MOSHIMO_AMAZON_BASE = process.env.NEXT_PUBLIC_MOSHIMO_AMAZON_BASE || "";
const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "";
const RAKUTEN_ENTRANCE_URL = process.env.NEXT_PUBLIC_RAKUTEN_ENTRANCE_URL || "";
const YAHOO_ENTRANCE_URL = process.env.NEXT_PUBLIC_YAHOO_ENTRANCE_URL || "";

function buildAmazonDest({ keyword, url, asin }: BuildArgs) {
  if (url) return url;
  if (asin) return `https://www.amazon.co.jp/dp/${encodeURIComponent(asin)}`;
  if (keyword)
    return `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}`;
  return `https://www.amazon.co.jp/`;
}

/** Amazon：もしも or 直アソ を env で切替 */
export function amazonUrl(args: BuildArgs = {}) {
  const dest = buildAmazonDest(args);

  if (AMAZON_MODE === "associates" && AMAZON_TAG) {
    const u = new URL(dest);
    u.searchParams.set("tag", AMAZON_TAG);
    return u.toString();
  }
  if (MOSHIMO_AMAZON_BASE) {
    const join = MOSHIMO_AMAZON_BASE.includes("?") ? "&" : "?";
    return `${MOSHIMO_AMAZON_BASE}${join}url=${encodeURIComponent(dest)}`;
  }
  return undefined;
}

/** 楽天：BASE（もしも or 楽天アフィ）に &url= で遷移先を渡す想定 */
export function rakutenUrl(args: BuildArgs = {}) {
  if (!RAKUTEN_ENTRANCE_URL) return undefined;
  const dest = args.url
    ? args.url
    : args.keyword
    ? `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(
        args.keyword
      )}/`
    : "https://www.rakuten.co.jp/";
  return `${RAKUTEN_ENTRANCE_URL}&url=${encodeURIComponent(dest)}`;
}

/** Yahoo!（ValueCommerce）：常に vc_url= を付与して遷移先を渡す */
export function yahooUrl(args: { keyword?: string; url?: string } = {}) {
  const base = process.env.NEXT_PUBLIC_YAHOO_ENTRANCE_URL || "";
  if (!base) return undefined;

  // 遷移先（商品URLを渡すときは args.url を使う）
  const dest = args.url
    ? args.url
    : args.keyword
    ? `https://shopping.yahoo.co.jp/search?p=${encodeURIComponent(args.keyword)}&first=1`
    : `https://shopping.yahoo.co.jp/`;

  const sep = base.includes("?") ? "&" : "?";
  // VC は vc_url= が必須
  return `${base}${sep}vc_url=${encodeURIComponent(dest)}`;
}
