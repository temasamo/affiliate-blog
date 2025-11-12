/**
 * 欠損したウイスキーのフレーバー要素（palate / finish）をAIで補完
 * - 既存の aroma は保持
 * - 空配列の palate / finish のみ補完
 * - Supabase + OpenAI GPT-4o-mini
 */

import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// .env.localファイルが存在する場合のみ読み込む（ローカル開発用）
const envLocalPath = path.resolve(__dirname, "..", ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
}

// --- 環境変数 ---
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // anon では UPDATE できないので service role key を使用
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// --- 実行本体 ---
async function main() {
  console.log("🧭 欠損フレーバーの自動補完を開始します...");

  // すべてのレコードを取得
  const { data: allRows, error } = await supabase
    .from("whisky_embeddings_v2")
    .select("id, brand_name, expression_name, type, flavor_json");

  if (error) throw error;
  if (!allRows || allRows.length === 0) {
    console.log("✅ データがありません。");
    return;
  }

  // 欠損行をフィルタリング（JavaScript側で）
  const rows = allRows.filter((row) => {
    const flavor_json = row.flavor_json || {};
    const palate = flavor_json.palate || [];
    const finish = flavor_json.finish || [];
    const aroma = flavor_json.aroma || [];
    return palate.length === 0 || finish.length === 0 || aroma.length === 0;
  });

  if (rows.length === 0) {
    console.log("✅ 欠損フレーバーはありません。");
    return;
  }

  console.log(`🔎 対象件数: ${rows.length}`);

  for (const row of rows) {
    const { id, brand_name, expression_name, type, flavor_json } = row;

    const aroma = flavor_json?.aroma ?? [];
    const palate = flavor_json?.palate ?? [];
    const finish = flavor_json?.finish ?? [];

    // 空の要素を確認
    const missing: string[] = [];
    if (palate.length === 0) missing.push("palate");
    if (finish.length === 0) missing.push("finish");
    if (aroma.length === 0) missing.push("aroma");

    if (missing.length === 0) continue;

    console.log(`🧩 ${brand_name} ${expression_name || ""} → 欠損: ${missing.join(", ")}`);

    // --- OpenAI に補完を依頼 ---
    const prompt = `
あなたはウイスキー専門家です。
以下の情報をもとに、欠けているフレーバー要素を自然な日本語で3〜4語ずつ補完してください。
必ずJSONで返してください。

---
銘柄名: ${brand_name}
エディション: ${expression_name || "なし"}
タイプ: ${type || "不明"}
既存のフレーバー情報: ${JSON.stringify(flavor_json, null, 2)}
---
出力形式:
{
  "aroma": [...],
  "palate": [...],
  "finish": [...]
}
    `;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    let completionText = aiResponse.choices[0].message?.content?.trim() || "{}";
    let newFlavor: any;

    try {
      newFlavor = JSON.parse(completionText);
    } catch {
      console.warn("⚠️ JSONパース失敗。テキスト補正を試みます。");
      completionText = completionText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      newFlavor = JSON.parse(completionText);
    }

    // --- 既存データとマージ ---
    const updatedFlavor = {
      aroma: aroma.length > 0 ? aroma : newFlavor.aroma ?? [],
      palate: palate.length > 0 ? palate : newFlavor.palate ?? [],
      finish: finish.length > 0 ? finish : newFlavor.finish ?? [],
    };

    // --- DB更新 ---
    const { error: updateError } = await supabase
      .from("whisky_embeddings_v2")
      .update({ flavor_json: updatedFlavor })
      .eq("id", id);

    if (updateError) {
      console.error(`❌ 更新失敗: ${brand_name}`, updateError.message);
    } else {
      console.log(`✅ 更新完了: ${brand_name}`);
    }
  }

  console.log("🎉 補完処理が完了しました。");
}

main().catch((err) => {
  console.error("🚨 致命的エラー:", err);
});
