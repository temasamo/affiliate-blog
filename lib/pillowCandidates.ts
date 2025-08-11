export function buildMallLinks(tags: string[]) {
  // 検索クエリ（半角スペース区切り）
  const query = tags.join(" ");

  // 目的地URL（エンコード前）
  const dest = {
    rakuten: `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(query)}/`,
    yahoo:   `https://shopping.yahoo.co.jp/search?p=${encodeURIComponent(query)}`
  };

  // --- もしも・VCの prefix（...&url= / ...&vc_url= で終わる）---
  const moshiRakuten = process.env.NEXT_PUBLIC_MOSHI_RAKUTEN_PREFIX;
  const moshiYahoo   = process.env.NEXT_PUBLIC_MOSHI_YAHOO_PREFIX;
  const vcYahoo      = process.env.NEXT_PUBLIC_VC_YAHOO_PREFIX;

  // --- 直接リンクのフォールバック ---
  const rakutenDirectBase =
    process.env.NEXT_PUBLIC_RAKUTEN_DIRECT_BASE || "https://search.rakuten.co.jp/search/mall/";
  const yahooDirectBase =
    process.env.NEXT_PUBLIC_YAHOO_DIRECT_BASE || "https://shopping.yahoo.co.jp/search?p=";

  // Rakuten: もしも > 直接
  const rakuten =
    moshiRakuten
      ? `${moshiRakuten}${encodeURIComponent(dest.rakuten)}`
      : `${rakutenDirectBase}${encodeURIComponent(query)}/`;

  // Yahoo: もしも > VC > 直接
  const yahoo =
    moshiYahoo
      ? `${moshiYahoo}${encodeURIComponent(dest.yahoo)}`
      : vcYahoo
        ? `${vcYahoo}${encodeURIComponent(dest.yahoo)}`
        : `${yahooDirectBase}${encodeURIComponent(query)}`;

  // Amazon（未提携 → 直接検索）
  const amazonTag = process.env.NEXT_PUBLIC_AMAZON_TAG;
  const amazonBase = `https://www.amazon.co.jp/s?k=${encodeURIComponent(query)}`;
  const amazon = amazonTag ? `${amazonBase}&tag=${amazonTag}` : amazonBase;

  return { rakuten, yahoo, amazon };
} 