import type { NextApiRequest, NextApiResponse } from "next";
import { searchRakuten } from "@/lib/malls/rakuten";
import { searchAmazon, amazonSearchUrlFallback } from "@/lib/malls/amazon";
import { searchYahoo } from "@/lib/malls/yahoo";
import { UnifiedProduct } from "@/lib/malls/types";

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
  try {
    const {
      category = "",
      height = "",
      firmness = "",
      material = "",
      minPrice,
      maxPrice,
      hits = "20",
    } = req.query as Record<string, string>;

    const keyword = buildKeyword({ category, height, firmness, material });
    const minP = minPrice ? Number(minPrice) : undefined;
    const maxP = maxPrice ? Number(maxPrice) : undefined;
    const limit = Number(hits);

    console.log('🔍 検索キーワード:', keyword);

    // 1) 楽天（予算内で検索、0件なら予算外で再検索）
    let rakuten: UnifiedProduct[] = [];
    let budgetMatched = true;
    
    if (minP || maxP) {
      // まずは予算内で検索
      rakuten = await searchRakuten({ keyword, minPrice: minP, maxPrice: maxP, hits: limit });
      
      // もし0件なら → 予算条件を外して再検索（フォールバック）
      if (rakuten.length === 0) {
        budgetMatched = false;
        rakuten = await searchRakuten({ keyword, hits: limit });
      }
    } else {
      // 予算指定なしの場合は通常検索
      rakuten = await searchRakuten({ keyword, hits: limit });
    }

    // 2) Amazon（失敗時は空配列にして後でフォールバックURLを返す）
    let amazon: UnifiedProduct[] = [];
    try {
      amazon = await searchAmazon({ keyword, minPrice: minP, maxPrice: maxP, hits: limit });
    } catch {
      // PA‑API未承認などで落ちるケースに備える
      amazon = [];
    }

    // 3) Yahoo（フラグとキーがある時だけ）
    let yahoo: UnifiedProduct[] = [];
    if (process.env.NEXT_PUBLIC_ENABLE_YAHOO === "1" && process.env.YAHOO_APP_ID) {
      yahoo = await searchYahoo({ keyword, minPrice: minP, maxPrice: maxP, hits: limit });
    }

    // 4) 結合→重複除去（タイトルと価格でラフ判定）
    const keyOf = (p: UnifiedProduct) => `${p.store.key}:${p.title}:${p.price ?? "?"}`;
    const map = new Map<string, UnifiedProduct>();
    [...rakuten, ...amazon, ...yahoo].forEach(p => map.set(keyOf(p), p));
    let merged = Array.from(map.values());

    // 5) スコアリング（軽め）
    const needle = `${height} ${firmness} ${material}`.trim().toLowerCase();
    const scored = merged.map(p => {
      let s = 0;
      const t = `${p.title}`.toLowerCase();
      if (height && t.includes(height.replace("め",""))) s += 0.3;
      if (material && t.includes(material.toLowerCase())) s += 0.4;
      if (firmness && t.includes(firmness.replace("やや",""))) s += 0.2;
      return { ...p, score: s };
    }).sort((a,b)=> (b.score - a.score) || ((b.price ?? 0) - (a.price ?? 0)));

    // 6) 返却（空ならフォールバックURL）
    const fallbackUrl = amazon.length === 0 ? amazonSearchUrlFallback(keyword) : null;

    console.log(`✅ 検索結果: ${scored.length}件 (楽天: ${rakuten.length}件, Amazon: ${amazon.length}件, Yahoo: ${yahoo.length}件)`);

    res.status(200).json({
      ok: true,
      keyword,
      items: scored,
      fallbackUrl, // これがあれば Amazon ボタンは検索遷移
      meta: {
        budgetMatched,
        budgetRange: (minP || maxP) ? { min: minP ?? null, max: maxP ?? null } : null,
      },
    });
  } catch (e: any) {
    console.error('❌ 商品検索エラー:', e?.message);
    res.status(500).json({ ok: false, error: e?.message ?? "unknown" });
  }
} 