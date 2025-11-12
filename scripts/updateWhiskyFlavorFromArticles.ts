/**
 * updateWhiskyFlavorFromArticles.ts
 * --------------------------------------------------------
 * 既存の whisky_embeddings_v2 テーブルに登録済みの80銘柄を対象に、
 * 記事本文（/articles/whisky/brands/）を解析して flavor_json を補完・上書き。
 *
 * 処理フロー:
 * 1. Supabaseから既存の brand_name 一覧を取得
 * 2. 記事本文をAIに解析させ、登場銘柄を特定
 * 3. 該当ブランドの flavor_json をAIにより抽出・更新
 * --------------------------------------------------------
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// .env.localファイルが存在する場合のみ読み込む（ローカル開発用）
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
}

// --- API設定 ---
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// --- AIで本文から登場銘柄を抽出 ---
async function extractBrandsFromText(text: string, existingBrands: string[]) {
  const prompt = `
以下のテキストから、登場するウイスキーブランド名を正確に抽出してください。
出力は必ずJSON配列形式で、既存ブランドリストに一致するものだけを含めてください。

【既存ブランドリスト】
${JSON.stringify(existingBrands)}

【出力例】
["山崎", "白州", "余市"]

【本文】
${text}
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: { type: "json_object" },
  });

  const jsonText = res.choices[0].message.content;
  if (!jsonText) {
    throw new Error("AIからの応答が空です");
  }
  const json = JSON.parse(jsonText);
  return json.brands || json || [];
}

// --- AIでflavor_jsonを抽出 ---
async function extractFlavorJson(text: string) {
  const prompt = `
あなたはウイスキーのテイスティング専門家です。
以下の本文を読み、香り(aroma)、味わい(palate)、余韻(finish)の3要素を抽出してください。

出力フォーマット:
{
  "aroma": ["例: フルーティー", "例: ピート香"],
  "palate": ["例: バニラ", "例: スパイス"],
  "finish": ["例: 長い余韻", "例: ウッディ"]
}

本文:
${text}
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: { type: "json_object" },
  });

  const jsonText = res.choices[0].message.content;
  if (!jsonText) {
    throw new Error("AIからの応答が空です");
  }
  return JSON.parse(jsonText);
}

// --- メイン処理 ---
async function main() {
  console.log("🚀 Whisky Flavor 補完スクリプト開始");

  // 1️⃣ Supabaseから既存ブランド名一覧を取得
  const { data: brandsData, error: brandError } = await supabase
    .from("whisky_embeddings_v2")
    .select("brand_name");

  if (brandError || !brandsData) {
    console.error("❌ ブランド一覧の取得に失敗:", brandError?.message);
    return;
  }

  const existingBrands = brandsData.map((b) => b.brand_name);
  console.log(`📦 既存ブランド数: ${existingBrands.length}`);

  // 2️⃣ 記事フォルダをスキャン
  const dir = path.join(process.cwd(), "articles", "whisky", "brands");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  console.log(`📄 記事ファイル数: ${files.length}`);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(raw);

    console.log(`🟢 解析中: ${file}`);

    try {
      // 3️⃣ 本文から登場ブランドを抽出
      const matchedBrands = await extractBrandsFromText(content, existingBrands);

      if (!matchedBrands.length) {
        console.log(`⚪ 該当ブランドなし: ${file}`);
        continue;
      }

      console.log(`🔍 登場ブランド: ${matchedBrands.join(", ")}`);

      // 4️⃣ flavor_json抽出
      const flavorJSON = await extractFlavorJson(content);

      // 5️⃣ 各ブランドにflavor_jsonを反映
      for (const brand of matchedBrands) {
        const { error: updateError } = await supabase
          .from("whisky_embeddings_v2")
          .update({ flavor_json: flavorJSON })
          .eq("brand_name", brand);

        if (updateError) {
          console.error(`❌ ${brand} の更新失敗:`, updateError.message);
        } else {
          console.log(`✅ 更新完了: ${brand}`);
        }
      }
    } catch (err: any) {
      console.error(`⚠️ ${file} の処理中にエラー:`, err.message);
    }
  }

  console.log("🎉 全記事のflavor_json補完が完了しました。");
}

// --- 実行 ---
main();
