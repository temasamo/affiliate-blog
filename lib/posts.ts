import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category?: string;
  excerpt?: string;
  thumbnail?: string;
  published?: boolean;
};

// ⇨ 読み取り対象を複数化（必要に応じて追加）
const BLOG_DIRS = [
  path.join(process.cwd(), "content", "blog"),
  path.join(process.cwd(), "content", "hot-picks"),
  path.join(process.cwd(), "content", "articles"),
];

function normalizeDate(input?: string): string {
  if (!input || typeof input !== "string") return "";
  // "2025.08.21" / "2025/08/21" を "2025-08-21" に寄せる
  const s = input.trim().replace(/[./]/g, "-");
  const t = Date.parse(s);
  if (!Number.isFinite(t)) return ""; // 不正は空にして末尾へ
  const d = new Date(t);
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function safeDateToNumber(d?: string): number {
  const t = d ? Date.parse(d) : NaN;
  return Number.isFinite(t) ? t : -8640000000000000; // 不正は最小値＝末尾
}

export function getAllPosts(): PostMeta[] {
  const posts: PostMeta[] = [];

  for (const dir of BLOG_DIRS) {
    if (!fs.existsSync(dir)) continue;

    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

    for (const file of files) {
      const full = path.join(dir, file);
      const raw = fs.readFileSync(full, "utf8");
      const { data } = matter(raw);

      const slug = file.replace(/\.mdx?$/, "").replace(/\s+/g, "-").toLowerCase();

      // draft優先、published優先を両対応
      const draft = data?.draft === true;
      const published =
        typeof data?.published === "boolean" ? data.published : !draft;

      if (!published) continue;

      const normalized = normalizeDate(String(data?.date || ""));

      const meta: PostMeta = {
        slug,
        title: typeof data?.title === "string" ? data.title : slug,
        date: normalized, // 正規化済み
        category: typeof data?.category === "string" ? data.category : undefined,
        excerpt: typeof data?.excerpt === "string" ? data.excerpt : undefined,
        thumbnail: typeof data?.thumbnail === "string" ? data.thumbnail : undefined,
        published,
      };

      posts.push(meta);
    }
  }

  posts.sort((a, b) => safeDateToNumber(b.date) - safeDateToNumber(a.date));
  return posts;
}

export function getAllCategories(posts: PostMeta[]): string[] {
  const set = new Set<string>();
  posts.forEach((p) => p.category && set.add(p.category));
  return Array.from(set).sort((a, b) => a.localeCompare(b, "ja"));
} 