/**
 * extractWhiskyFlavorFromArticle.ts
 * --------------------------------------------------------
 * 記事本文（.mdx）から香り・味わい・余韻をAIで抽出し、
 * Supabaseの `whisky_embeddings_v2` に flavor_json として登録する。
 * 
 * 対象フォルダ: /articles/whisky/brands/
 * 対応カラム: brand_name / expression_name / region / type / flavor_json
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

// --- 環境変数からAPIキーなど取得 ---
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// --- AIに flavor_json を抽出させる関数 ---
async function extractFlavor(articleText: string) {
  const prompt = `
あなたは熟練のウイスキー・テイスティング専門家です。
以下のウイスキー記事本文を分析し、
香り(aroma)、味わい(palate)、余韻(finish)の3要素に分けてJSON形式で出力してください。

【出力フォーマット】
{
  "aroma": ["例: フルーティー", "例: バニラ", "例: スモーキー"],
  "palate": ["例: ハチミツ", "例: シナモン", "例: ナッツ"],
  "finish": ["例: 長い余韻", "例: ピート香", "例: スパイシー"]
}

本文:
${articleText}
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
  const dir = path.join(process.cwd(), "articles", "whisky", "brands");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  console.log(`📂 処理対象フォルダ: ${dir}`);
  console.log(`📄 対象ファイル数: ${files.length}件`);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(raw);

    const brand = data.title || file.replace(".mdx", "");
    const expression = data.expression_name || data.expression || null;
    const region = data.region || null;
    const type = data.type || null;

    console.log(`🟢 抽出中: ${brand} ...`);

    try {
      const flavorJSON = await extractFlavor(content);

      // 既存レコードを検索
      const { data: existing } = await supabase
        .from("whisky_embeddings_v2")
        .select("id")
        .eq("brand_name", brand)
        .single();

      const dataToSave = {
        brand_name: brand,
        expression_name: expression,
        region,
        type,
        flavor_json: flavorJSON,
      };

      let error;
      if (existing?.id) {
        // 既存レコードを更新
        const { error: updateError } = await supabase
          .from("whisky_embeddings_v2")
          .update(dataToSave)
          .eq("id", existing.id);
        error = updateError;
      } else {
        // 新規レコードを作成
        const { error: insertError } = await supabase
          .from("whisky_embeddings_v2")
          .insert(dataToSave);
        error = insertError;
      }

      if (error) {
        console.error(`❌ ${brand} の登録でエラー:`, error.message);
        console.error(`   詳細: ${JSON.stringify(error, null, 2)}`);
      } else {
        console.log(`✅ 登録完了: ${brand}`);
        console.log(`   flavor_json:`, JSON.stringify(flavorJSON, null, 2));
      }
    } catch (err: any) {
      console.error(`⚠️ ${brand} の抽出に失敗:`, err.message);
    }
  }

  console.log("🎉 全記事のflavor_json抽出・登録が完了しました。");
}

// --- 実行 ---
main();
