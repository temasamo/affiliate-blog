/**
 * insertWhiskyFlavorsFromArticles.ts
 * --------------------------------------------------------
 * 目的:
 *   /articles/whisky/brands/ にある記事を読み込み、
 *   本文から登場するウイスキーブランドをAIで抽出。
 *   各ブランドごとに flavor_json をAI生成し、
 *   Supabaseの whisky_embeddings_v2 に新規INSERT。
 *
 * ポイント:
 *  - 既存80銘柄とはマージせず、常に新規追加。
 *  - 1記事に複数ブランドが含まれていてもOK。
 *  - 各ブランド＝1行として登録（RAG最適化構成）。
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

// --- 初期設定 ---
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// --- ブランド名抽出 ---
async function extractBrandsFromText(text: string) {
  const prompt = `
以下のテキストを読み、登場するウイスキーのブランド名をリスト化してください。

【重要な指示】
- 出力は必ずJSON形式で、以下の構造にしてください: {"brands": ["ブランド名1", "ブランド名2"]}
- ブランド名の例: "山崎", "白州", "余市", "宮城峡", "竹鶴ピュアモルト", "竹鶴", "ニッカ"など
- 蒸留所名（例: "余市蒸溜所"）は「余市」のようにブランド名に変換してください
- 企業名（例: "サントリー", "ニッカ"）は、その企業の主要ブランドが記事に含まれている場合はブランド名として含めてください
- 記事内で明確にブランドが言及されていない場合は {"brands": []} を返してください

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

// --- テイスティング情報抽出 ---
async function extractFlavorJson(text: string) {
  const prompt = `
あなたはウイスキーのテイスティング専門家です。
以下の本文を読み、香り (aroma)、味わい (palate)、余韻 (finish) の3要素を抽出してください。

出力形式は以下のJSON形式でお願いします。
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
  console.log("🚀 Whisky Flavor 新規登録スクリプト開始");

  // 記事フォルダ
  const dir = path.join(process.cwd(), "articles", "whisky", "brands");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  console.log(`📄 対象記事数: ${files.length}`);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(raw);

    console.log(`🟢 解析中: ${file}`);

    try {
      // ① 本文からブランド抽出
      const matchedBrands = await extractBrandsFromText(content);

      if (!matchedBrands.length) {
        console.log(`⚪ ブランド検出なし: ${file}`);
        continue;
      }

      console.log(`🔍 抽出ブランド: ${matchedBrands.join(", ")}`);

      // ② flavor_json抽出
      const flavorJSON = await extractFlavorJson(content);

      // ③ SupabaseへINSERT（ブランドごとに追加）
      for (const brand of matchedBrands) {
        const { error } = await supabase
          .from("whisky_embeddings_v2")
          .insert({
            brand_name: brand,
            expression_name: data.title || file.replace(".mdx", ""),
            flavor_json: flavorJSON,
          });

        if (error) {
          console.error(`❌ ${brand} の登録失敗:`, error.message);
        } else {
          console.log(`✅ 登録完了: ${brand}`);
        }
      }
    } catch (err: any) {
      console.error(`⚠️ ${file} の処理中にエラー:`, err.message);
    }
  }

  console.log("🎉 全記事の新規INSERTが完了しました。");
}

// --- 実行 ---
main();
