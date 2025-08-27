/* scripts/check-frontmatter.js */
const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");
const matter = require("gray-matter");

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content"); // 必要なら変更
const DO_FIX = process.argv.includes("--fix");

// ここはあなたの実フォルダ名に合わせて調整OK
const CATEGORY_LABELS = {
  "sleep-health": "睡眠・健康",
  "japanesetea": "日本茶",
  "global-hot-picks": "海外トレンド",
  "popular-japan": "人気の日本商品",
  "popular-japanese-items": "人気の日本商品",
  "diagnosis": "診断AI",
  "diagnosis-ai": "診断AI",
  "diagnostic-ai": "診断AI",
  "education": "教育",
  "travel": "旅行",
};

function deriveCategoryFromPath(filePath) {
  const rel = path.relative(CONTENT_DIR, filePath).replace(/\\/g, "/");
  const parts = rel.split("/");
  // 最初のディレクトリ名から推定
  const hitKey = Object.keys(CATEGORY_LABELS).find((k) => parts[0] === k);
  return hitKey ? CATEGORY_LABELS[hitKey] : null;
}

(async function main() {
  const files = await fg(["**/*.md", "**/*.mdx"], { cwd: CONTENT_DIR, absolute: true, dot: false });
  let missing = [];
  let fixed = 0;

  for (const abs of files) {
    const raw = fs.readFileSync(abs, "utf8");
    const parsed = matter(raw, { language: "yaml", delimiters: "---" });
    const data = parsed.data || {};
    const hasCategory = typeof data.category === "string" && data.category.trim().length > 0;

    if (!hasCategory) {
      const derived = deriveCategoryFromPath(abs);
      missing.push({
        file: path.relative(ROOT, abs),
        title: data.title || "(無題)",
        date: data.date || "",
        derived: derived || "(推定不可)",
      });

      if (DO_FIX && derived) {
        data.category = derived;
        const next = matter.stringify(parsed.content, data, { language: "yaml", delimiters: "---" });
        fs.writeFileSync(abs, next, "utf8");
        fixed++;
      }
    }
  }

  // レポート出力
  console.log("\n=== Category Missing Report ===");
  console.log(`Checked: ${files.length} files`);
  console.log(`Missing category: ${missing.length}`);
  if (DO_FIX) console.log(`Auto-fixed: ${fixed}`);

  const outDir = path.join(ROOT, "scripts", "report");
  fs.mkdirSync(outDir, { recursive: true });
  const outCsv = path.join(outDir, "frontmatter-missing-category.csv");

  const csv = [
    "file,title,date,derived",
    ...missing.map((m) =>
      [m.file, m.title.replace(/"/g, '""'), m.date, m.derived].map((x) => `"${x}"`).join(",")
    ),
  ].join("\n");

  fs.writeFileSync(outCsv, csv, "utf8");
  console.log(`CSV: ${path.relative(ROOT, outCsv)}\n`);
})(); 