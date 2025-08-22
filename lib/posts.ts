import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;          // 正規化済み YYYY-MM-DD
  category?: string;
  excerpt?: string;
  thumbnail?: string;
  published?: boolean;
  href: string;          // 一覧カードのリンク先（/blog 以外も可）
};

// ここに「存在したら読む」ディレクトリを列挙
// [物理ディレクトリ, 公開ルート, listingが必須か]
const CANDIDATE_DIRS: Array<[string, string, boolean]> = [
  // ふつうのブログ記事（listing不要）
  [path.join(process.cwd(), "content", "blog"), "/blog", false],

  // Travel（Pages Router / App Router の両方をケア）
  [path.join(process.cwd(), "pages", "travel"), "/travel", true],
  [path.join(process.cwd(), "app", "travel"), "/travel", true],

  // Global Hot Picks
  [
    path.join(process.cwd(), "pages", "articles", "global-hot-picks", "trend"),
    "/articles/global-hot-picks/trend",
    true,
  ],
  [
    path.join(process.cwd(), "app", "articles", "global-hot-picks", "trend"),
    "/articles/global-hot-picks/trend",
    true,
  ],
];

// ".md" / ".mdx" のみ対象
const VALID_EXT = new Set([".md", ".mdx"]);

function normalizeDate(input?: string): string {
  if (!input || typeof input !== "string") return "";
  // "2025.08.21" / "2025/08/21" なども受け取り、"-" に統一
  const s = input.trim().replace(/[./]/g, "-");
  const t = Date.parse(s);
  if (!Number.isFinite(t)) return "";
  const d = new Date(t);
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function safeDateToNumber(d?: string): number {
  const t = d ? Date.parse(d) : NaN;
  return Number.isFinite(t) ? t : -8640000000000000; // 不正は最小値=末尾
}

function listFilesRecursively(dir: string): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      out.push(...listFilesRecursively(p));
    } else {
      const ext = path.extname(p).toLowerCase();
      if (VALID_EXT.has(ext)) out.push(p);
    }
  }
  return out;
}

function makeHref(routeBase: string, baseDir: string, absFile: string): string {
  // baseDir からの相対パスをURLに変換
  const rel = path
    .relative(baseDir, absFile)
    .replace(/\\/g, "/")       // Windows対応
    .replace(/\.(md|mdx)$/i, "");

  // Next.js の index/page ファイルは親ディレクトリを使う
  const parts = rel.split("/");
  const last = parts[parts.length - 1];
  if (last === "index" || last === "page") {
    parts.pop();
  }
  const urlPath = parts.join("/");
  const joined = [routeBase, urlPath].filter(Boolean).join("/");
  return joined.replace(/\/+/g, "/").replace(/\/$/, "") || routeBase;
}

export function getAllPosts(): PostMeta[] {
  const posts: PostMeta[] = [];

  for (const [dir, routeBase, requireListing] of CANDIDATE_DIRS) {
    if (!fs.existsSync(dir)) continue;

    const files = listFilesRecursively(dir);

    for (const file of files) {
      const raw = fs.readFileSync(file, "utf8");
      const { data } = matter(raw);

      // draft / published の両流儀に対応
      const draft = data?.draft === true;
      const published =
        typeof data?.published === "boolean" ? data.published : !draft;

      // ルート配下（travel/hot-picks）は listing: true の記事だけを載せる
      if (requireListing && data?.listing !== true) continue;
      if (!published) continue;

      const date = normalizeDate(String(data?.date || ""));
      const title =
        typeof data?.title === "string" && data.title.trim().length
          ? data.title
          : path.basename(file).replace(/\.(md|mdx)$/i, "");

      // slug はURLっぽく見えるID（実URLは href を使う）
      const slug = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const href = makeHref(routeBase, dir, file);

      posts.push({
        slug,
        title,
        date,
        category:
          typeof data?.category === "string" ? data.category : undefined,
        excerpt:
          typeof data?.excerpt === "string" ? data.excerpt : undefined,
        thumbnail:
          typeof data?.thumbnail === "string" ? data.thumbnail : undefined,
        published,
        href,
      });
    }
  }

  // 新しい→古い
  posts.sort((a, b) => safeDateToNumber(b.date) - safeDateToNumber(a.date));
  return posts;
}

export function getAllCategories(posts: PostMeta[]): string[] {
  const set = new Set<string>();
  posts.forEach((p) => p.category && set.add(p.category));
  return Array.from(set).sort((a, b) => a.localeCompare(b, "ja"));
} 