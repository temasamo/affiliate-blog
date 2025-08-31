import type { NextApiRequest, NextApiResponse } from "next";
import { searchRakuten } from "@/lib/malls/rakuten";
import { searchAmazon } from "@/lib/malls/amazon";
import { searchYahoo } from "@/lib/malls/yahoo";
import type { UnifiedProduct } from "@/lib/malls/types";
import { interleave } from "@/lib/utils/interleave";

/** 検索キーワード生成（診断条件をシンプルな語に寄せる） */
function buildKeyword(input: {
  category: string;   // 例: "cervical-support" / "side-sleep" ...
  height: string;     // "低め" | "ふつう" | "高め"
  firmness: string;   // "やわらかめ" | "ふつう" | "やや硬め" | "硬め"
  material?: string;  // 例: "latex" "pipe" "memory" など
}) {
  const categoryMap: Record<string, string> = {
    "cervical-support": "頸椎",
    "side-sleep": "横向き",
    "back-stable": "仰向け",
    "breathable": "通気性",
    "adjustable": "調整式",
    "wrapping": "包み込み",
  };

  const heightMap: Record<string, string> = {
    "低め": "低め",
    "ふつう": "",
    "高め": "高め",
  };

  const firmnessMap: Record<string, string> = {
    "やわらかめ": "やわらか",
    "ふつう": "",
    "やや硬め": "硬め",
    "硬め": "硬め",
  };

  const materialMap: Record<string, string> = {
    buckwheat: "そば殻",
    pipe: "パイプ",
    memory: "低反発",
    latex: "ラテックス",
    fiber: "ポリエステル",
    feather: "羽毛",
  };

  const parts = [
    "枕",
    categoryMap[input.category] || input.category,
    heightMap[input.height] || "",
    firmnessMap[input.firmness] || "",
    input.material ? materialMap[input.material] || input.material : "",
  ].filter(Boolean);

  return parts.join(" ");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    category = "",
    height = "",
    firmness = "",
    material = "",
    minPrice,
    maxPrice,
    hits = "20",
  } = req.query as Record<string, string>;

  // ❶ キーワードは常に作る（空なら "枕"）
  const built = buildKeyword({ category, height, firmness, material });
  const keyword = (built && built.trim()) || "枕";

  const minP = minPrice ? Number(minPrice) : undefined;
  const maxP = maxPrice ? Number(maxPrice) : undefined;
  const limit = Number(hits);

  console.log("▶ /api/mall-products", { keyword, minP, maxP, limit });

  let rakuten: UnifiedProduct[] = [];
  let yahoo: UnifiedProduct[] = [];
  let amazon: UnifiedProduct[] = [];

  try {
    // ❷ 楽天は try-catch（400でも落とさない）
    try {
      rakuten = await searchRakuten({
        keyword,
        minPrice: minP,
        maxPrice: maxP,
        hits: limit,
      });
    } catch (e: any) {
      console.warn("Rakuten fail:", e?.message || e);
      rakuten = [];
    }

    // ❸ Amazon（フラグON時のみ）
    try {
      if (process.env.NEXT_PUBLIC_ENABLE_AMAZON === "1") {
        amazon = await searchAmazon({
          keyword,
          minPrice: minP,
          maxPrice: maxP,
          hits: limit,
        });
      }
    } catch {
      amazon = [];
    }

    // ❹ Yahoo（フラグ＆APP IDありのときのみ）
    try {
      if (
        process.env.NEXT_PUBLIC_ENABLE_YAHOO === "1" &&
        process.env.YAHOO_APP_ID
      ) {
        yahoo = await searchYahoo({
          keyword,
          minPrice: minP,
          maxPrice: maxP,
          hits: limit,
        });
      }
    } catch (e: any) {
      console.warn("Yahoo fail:", e?.message || e);
      yahoo = [];
    }

    // ❺ 楽天×Yahoo を 1:1 でインタリーブ（型を崩さない）
    let merged: UnifiedProduct[] = interleave<UnifiedProduct>(
      rakuten,
      yahoo,
      1,
      1
    );

    // ❻ 予算内 0 件 → 予算外で再検索（フォールバック）
    if (merged.length === 0 && (minP != null || maxP != null)) {
      try {
        rakuten = await searchRakuten({ keyword, hits: limit });
      } catch {}
      try {
        if (
          process.env.NEXT_PUBLIC_ENABLE_YAHOO === "1" &&
          process.env.YAHOO_APP_ID
        ) {
          yahoo = await searchYahoo({ keyword, hits: limit });
        }
      } catch {}
      merged = interleave<UnifiedProduct>(rakuten, yahoo, 1, 1);
    }

    // ❼ 簡易スコアリング（テキスト一致 & 価格で降順）
    const scored: UnifiedProduct[] = merged
      .map((p): UnifiedProduct => {
        let s = 0;
        const t = `${p.title}`.toLowerCase();
        if (height) s += t.includes(height.replace("め", "")) ? 0.3 : 0;
        if (material) s += t.includes(material.toLowerCase()) ? 0.4 : 0;
        if (firmness) s += t.includes(firmness.replace("やや", "")) ? 0.2 : 0;
        return { ...p, score: s };
      })
      .sort((a, b) => b.score - a.score || (b.price ?? 0) - (a.price ?? 0));

    // ❽ 厳密な価格フィルタ（priceが数値のものだけ残す）
    const inRange = (p: UnifiedProduct) =>
      typeof p.price === "number" &&
      (minP == null || p.price >= minP) &&
      (maxP == null || p.price <= maxP);

    const itemsStrict: UnifiedProduct[] = scored.filter(inRange);

    // 予算内で1件以上あれば予算内のみ返す
    if (itemsStrict.length > 0) {
      return res.status(200).json({
        ok: true,
        keyword,
        items: itemsStrict,
        meta: {
          budgetMatched: true,
          budgetRange:
            minP != null || maxP != null
              ? { min: minP ?? null, max: maxP ?? null }
              : null,
          stores: {
            rakuten: rakuten.length,
            yahoo: yahoo.length,
            amazon: amazon.length,
          },
        },
      });
    }

    // 予算内が0件 → スコア順でそのまま提示（budgetMatched:false）
    return res.status(200).json({
      ok: true,
      keyword,
      items: scored,
      meta: {
        budgetMatched: false,
        budgetRange:
          minP != null || maxP != null
            ? { min: minP ?? null, max: maxP ?? null }
            : null,
        stores: {
          rakuten: rakuten.length,
          yahoo: yahoo.length,
          amazon: amazon.length,
        },
      },
    });
  } catch (e: any) {
    console.error("❌ mall-products fatal:", e?.message || e);
    return res
      .status(200)
      .json({ ok: false, keyword, error: e?.message ?? "unknown" });
  }
}
