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

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function safeDateToNumber(d?: string): number {
  const t = d ? Date.parse(d) : NaN;
  return Number.isFinite(t) ? t : -8640000000000000; // 不正日付は最小値=末尾へ
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts: PostMeta[] = [];
  for (const file of files) {
    const full = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data } = matter(raw);

    const slug = file.replace(/\.mdx?$/, "").replace(/\s+/g, "-").toLowerCase();

    const meta: PostMeta = {
      slug,
      title: typeof data.title === "string" ? data.title : slug,
      date: typeof data.date === "string" ? data.date : "",
      category: typeof data.category === "string" ? data.category : undefined,
      excerpt: typeof data.excerpt === "string" ? data.excerpt : undefined,
      thumbnail: typeof data.thumbnail === "string" ? data.thumbnail : undefined,
      published: typeof data.published === "boolean" ? data.published : true,
    };

    if (meta.published) posts.push(meta);
  }

  posts.sort((a, b) => safeDateToNumber(b.date) - safeDateToNumber(a.date));
  return posts;
}

export function getAllCategories(posts: PostMeta[]): string[] {
  const set = new Set<string>();
  posts.forEach((p) => p.category && set.add(p.category));
  return Array.from(set).sort((a, b) => a.localeCompare(b, "ja"));
} 