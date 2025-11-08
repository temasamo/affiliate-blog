import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import matter from "gray-matter";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

      // コンテンツからfrontmatterを除いた本文を取得
      // ベクトル化用のテキストを作成（タイトル + 説明 + 本文）
      const textForEmbedding = `${title}\n${description}\n${content}`.trim();

      console.log(`🔄 処理中: ${file} (${title})`);

      // 埋め込みベクトルを生成
      const embedding = await generateEmbedding(textForEmbedding);

      // Supabaseに保存
      const { error } = await supabase.from("whisky_articles").upsert({
        slug,
        title,
        description,
        content: content.trim(),
        type,
        embedding,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "slug"
      });

      if (error) {
        console.error(`❌ エラー: ${file}`, error);
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

