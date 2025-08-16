import type { NextApiRequest, NextApiResponse } from "next";
import { searchRakuten } from "@/lib/malls/rakuten";
import { searchAmazon, amazonSearchUrlFallback } from "@/lib/malls/amazon";
import { searchYahoo } from "@/lib/malls/yahoo";
import { UnifiedProduct } from "@/lib/malls/types";
import { interleave } from "@/lib/utils/interleave";

function buildKeyword(input: {
  category: string;   // 例: "頸椎サポート" / "横向き強化" etc
  height: string;     // "低め" | "ふつう" | "高め"
  firmness: string;   // "やわらかめ" | "ふつう" | "やや硬め" | "硬め"
  material?: string;  // 例: "ラテックス" "パイプ" など
}) {
  // カテゴリをシンプルなキーワードに変換
  const categoryMap: Record<string, string> = {
    'cervical-support': '頸椎',
    'side-sleep': '横向き',
    'back-stable': '仰向け',
    'breathable': '通気性',
    'adjustable': '調整式',
    'wrapping': '包み込み'
  };
  
  // 高さをシンプルに
  const heightMap: Record<string, string> = {
    '低め': '低め',
    'ふつう': '',
    '高め': '高め'
  };
  
  // 硬さをシンプルに
  const firmnessMap: Record<string, string> = {
    'やわらかめ': 'やわらか',
    'ふつう': '',
    'やや硬め': '硬め',
    '硬め': '硬め'
  };
  
  // 素材をシンプルに
  const materialMap: Record<string, string> = {
    'buckwheat': 'そば殻',
    'pipe': 'パイプ',
    'memory': '低反発',
    'latex': 'ラテックス',
    'fiber': 'ポリエステル',
    'feather': '羽毛'
  };
  
  const parts = [
    '枕',
    categoryMap[input.category] || input.category,
    heightMap[input.height] || '',
    firmnessMap[input.firmness] || '',
    input.material ? materialMap[input.material] || input.material : ''
  ].filter(Boolean);
  
  return parts.join(' ');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    category = "",
    height = "",
    firmness = "",
    material = "",
    minPrice,
    maxPrice,
    hits = "20",
  } = req.query as Record<string, string>;

  // ❶ キーワードは常に作る＆fallback
  const built = buildKeyword({ category, height, firmness, material });
  const keyword = (built && built.trim()) || "枕";

  const minP = minPrice ? Number(minPrice) : undefined;
  const maxP = maxPrice ? Number(maxPrice) : undefined;
  const limit = Number(hits);

  // デバッグログ
  console.log("▶ /api/mall-products", { keyword, minP, maxP });

  let rakuten: UnifiedProduct[] = [];
  let yahoo: UnifiedProduct[] = [];
  let amazon: UnifiedProduct[] = [];

  try {
    // ❷ 楽天は try-catch（400でも落とさない）
    try {
      rakuten = await searchRakuten({ keyword, minPrice: minP, maxPrice: maxP, hits: limit });
    } catch (e: any) {
      console.warn("Rakuten fail:", e?.message || e);
      rakuten = [];
    }

    // ❸ Amazonは従来通り or フラグで無効化
    try {
      if (process.env.NEXT_PUBLIC_ENABLE_AMAZON === "1") {
        amazon = await searchAmazon({ keyword, minPrice: minP, maxPrice: maxP, hits: limit });
      }
    } catch { amazon = []; }

    // ❹ Yahoo はフラグ＆IDがある時だけ
    try {
      if (process.env.NEXT_PUBLIC_ENABLE_YAHOO === "1" && process.env.YAHOO_APP_ID) {
        yahoo = await searchYahoo({ keyword, minPrice: minP, maxPrice: maxP, hits: limit });
      }
    } catch (e:any) {
      console.warn("Yahoo fail:", e?.message || e);
      yahoo = [];
    }

                    // ❺ インタリーブで結合
                const items = interleave(rakuten, yahoo, 1, 1) as any[];
                let merged = items;

    // ❻ 予算内0件 → 予算外で再検索（フォールバック）
    let budgetMatched = true;
    if (merged.length === 0 && (minP != null || maxP != null)) {
      budgetMatched = false;
      // 予算条件外で再検索（落ちても無視）
      try { rakuten = await searchRakuten({ keyword, hits: limit }); } catch {}
      try {
        if (process.env.NEXT_PUBLIC_ENABLE_YAHOO === "1" && process.env.YAHOO_APP_ID) {
          yahoo = await searchYahoo({ keyword, hits: limit });
        }
      } catch {}
      const fallbackItems = interleave(rakuten, yahoo, 1, 1) as any[];
      merged = fallbackItems;
    }

    // ❼ スコアリング（簡易）
    const needle = `${height} ${firmness} ${material}`.trim().toLowerCase();
    const scored = merged.map(p => {
      let s = 0;
      const t = `${p.title}`.toLowerCase();
      if (height)   s += t.includes(height.replace("め","")) ? 0.3 : 0;
      if (material) s += t.includes(material.toLowerCase()) ? 0.4 : 0;
      if (firmness) s += t.includes(firmness.replace("やや","")) ? 0.2 : 0;
      return { ...p, score: s };
    }).sort((a,b)=> (b.score - a.score) || ((b.price ?? 0) - (a.price ?? 0)));

    // ❽ 厳密な価格フィルタ（priceが取れていないものも除外）
    const inRange = (p: any) =>
      (typeof p.price === "number") &&
      (minP == null || p.price >= minP) &&
      (maxP == null || p.price <= maxP);

    let itemsStrict = scored.filter(inRange);

    // 予算内で 1 件以上あればそれを返す
    if (itemsStrict.length > 0) {
      return res.status(200).json({
        ok: true,
        keyword,
        items: itemsStrict as any,
        meta: {
          budgetMatched: true,
          budgetRange: (minP || maxP) ? { min: minP ?? null, max: maxP ?? null } : null,
          stores: { rakuten: rakuten.length, yahoo: yahoo.length, amazon: amazon.length },
        },
      });
    }

    // 予算内が 0 件 → 予算外から提示（このときだけ budgetMatched:false）
    return res.status(200).json({
      ok: true,
      keyword,
      items: scored as any, // フィルタなし版
      meta: {
        budgetMatched: false,
        budgetRange: (minP || maxP) ? { min: minP ?? null, max: maxP ?? null } : null,
        stores: { rakuten: rakuten.length, yahoo: yahoo.length, amazon: amazon.length },
      },
    });
  } catch (e: any) {
    // ❾ どうしても全滅した時だけ ok:false
    console.error("❌ mall-products fatal:", e?.message || e);
    return res.status(200).json({ ok: false, keyword, error: e?.message ?? "unknown" });
  }
} 