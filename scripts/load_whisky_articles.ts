import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import matter from "gray-matter";
import dotenv from "dotenv";

// .env.localファイルが存在する場合のみ読み込む（ローカル開発用）
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
}

// 環境変数の取得（NEXT_PUBLIC_プレフィックスにも対応）
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const openaiApiKey = process.env.OPENAI_API_KEY;

// 環境変数の検証
if (!supabaseUrl) {
  console.error("❌ エラー: SUPABASE_URLまたはNEXT_PUBLIC_SUPABASE_URL環境変数が設定されていません");
  process.exit(1);
}
if (!supabaseServiceRoleKey) {
  console.error("❌ エラー: SUPABASE_SERVICE_ROLE_KEY環境変数が設定されていません");
  process.exit(1);
}
if (!openaiApiKey) {
  console.error("❌ エラー: OPENAI_API_KEY環境変数が設定されていません");
  process.exit(1);
}

const supabase = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
);
const openai = new OpenAI({ apiKey: openaiApiKey });

async function generateEmbedding(input: string) {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input,
  });
  return res.data[0].embedding;
}

async function processDirectory(dirPath: string, type: "knowledge" | "brands") {
  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️ ディレクトリが存在しません: ${dirPath}`);
    return;
  }

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith(".mdx") || f.endsWith(".md"));
  console.log(`📂 ${type} ディレクトリ: ${files.length}件のファイルを検出`);

  for (const file of files) {
    try {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data: frontMatter, content } = matter(fileContent);

      // publishedがfalseの場合はスキップ
      if (frontMatter.published === false) {
        console.log(`⏭️  スキップ（非公開）: ${file}`);
        continue;
      }

      // タイトルとslugを取得
      const title = frontMatter.title || file.replace(/\.(mdx|md)$/, "");
      const slug = frontMatter.slug || file.replace(/\.(mdx|md)$/, "");
      const description = frontMatter.description || "";
      const category = frontMatter.category || "ウイスキー知識";
      const tags = frontMatter.tags || [];

      // コンテンツからfrontmatterを除いた本文を取得
      // ベクトル化用のテキストを作成（タイトル + 説明 + 本文）
      const textForEmbedding = `${title}\n${description}\n${content}`.trim();

      console.log(`🔄 処理中: ${file} (${title})`);

      // 埋め込みベクトルを生成
      const embedding = await generateEmbedding(textForEmbedding);

      // 既存のレコードをslugで検索（titleで検索する場合）
      const { data: existing } = await supabase
        .from("whisky_articles")
        .select("id")
        .eq("title", title)
        .single();

      // Supabaseに保存（テーブル構造に合わせて修正）
      const dataToSave: any = {
        title,
        content: content.trim(),
        embedding,
        category,
        tags,
        updated_at: new Date().toISOString(),
      };

      let error;
      if (existing?.id) {
        // 既存レコードを更新
        const { error: updateError } = await supabase
          .from("whisky_articles")
          .update(dataToSave)
          .eq("id", existing.id);
        error = updateError;
      } else {
        // 新規レコードを作成
        const { error: insertError } = await supabase
          .from("whisky_articles")
          .insert(dataToSave);
        error = insertError;
      }

      if (error) {
        console.error(`❌ エラー: ${file}`);
        console.error(`   エラーコード: ${error.code}`);
        console.error(`   メッセージ: ${error.message}`);
        console.error(`   詳細: ${JSON.stringify(error, null, 2)}`);
      } else {
        console.log(`✅ 登録完了: ${file} (${title})`);
      }
    } catch (error) {
      console.error(`❌ ファイル処理エラー: ${file}`, error);
    }
  }
}

async function main() {
  console.log("🚀 ウイスキー記事のRAG同期を開始します...\n");

  // テーブルの存在確認
  const { data: tableCheck, error: tableError } = await supabase
    .from("whisky_articles")
    .select("*")
    .limit(1);

  if (tableError) {
    console.error("❌ テーブルエラー:", tableError.message);
    console.error("   テーブル 'whisky_articles' が存在しないか、アクセス権限がありません。");
    console.error("   Supabaseでテーブルを作成してください。");
    process.exit(1);
  }

  console.log("✅ テーブル 'whisky_articles' に接続できました\n");

  const knowledgeDir = path.resolve("./articles/whisky/knowledge");
  const brandsDir = path.resolve("./articles/whisky/brands");

  await processDirectory(knowledgeDir, "knowledge");
  await processDirectory(brandsDir, "brands");

  console.log("\n🎉 全記事の登録が完了しました。");
}

main().catch((err) => {
  console.error("❌ スクリプト実行エラー:", err);
  process.exit(1);
});


