import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { deriveCategory } from "./category";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;                 // "" or "YYYY-MM-DD"
  category: string | null;
  excerpt: string | null;
  thumbnail: string | null;
  published: boolean;
  href: string;                 // クリック先（/blog 以外も可）
};

export type SimplePost = {
  slug: string;
  title: string;
  category: string; // ★常に文字列
  date: string | null;
  description?: string | null;
};

/** ───────── 収集対象 ───────── **/
const MDX_DIRS = [
  [path.join(process.cwd(), "content", "blog"), "/blog"] as const,
  [path.join(process.cwd(), "content", "travel"), "/travel"] as const,
  [path.join(process.cwd(), "content", "global-hot-picks"), "/global-hot-picks"] as const,
  [path.join(process.cwd(), "articles"), "/articles"] as const,
];

// data配下（dev/prod/共通）からJSONを読む
const JSON_DIRS = [
  [path.join(process.cwd(), "data", "development", "travel"), "/travel"],
  [path.join(process.cwd(), "data", "production", "travel"), "/travel"],
  [path.join(process.cwd(), "data", "travel"), "/travel"],
  [
    path.join(
      process.cwd(),
      "data",
      "development",
      "articles",
      "global-hot-picks",
      "trend"
    ),
    "/articles/global-hot-picks/trend",
  ],
  [
    path.join(
      process.cwd(),
      "data",
      "production",
      "articles",
      "global-hot-picks",
      "trend"
    ),
    "/articles/global-hot-picks/trend",
  ],
  [
    path.join(
      process.cwd(),
      "data",
      "articles",
      "global-hot-picks",
      "trend"
    ),
    "/articles/global-hot-picks/trend",
  ],
] as const;

const PUBLIC_DIR = path.join(process.cwd(), "public");
const VALID_MDX = new Set([".md", ".mdx"]);

function normalizeDate(input?: string): string {
  if (!input || typeof input !== "string") return "";
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
  return Number.isFinite(t) ? t : -8640000000000000;
}

function resolveThumbnail(input?: string | null): string | null {
  if (!input || typeof input !== "string") return null;
  if (/^https?:\/\//i.test(input)) return input; // 外部URLは通す
  const rel = input.replace(/^\/+/, "");
  const abs = path.join(PUBLIC_DIR, rel);
  return fs.existsSync(abs) ? `/${rel.replace(/\\/g, "/")}` : null;
}

function listFilesRecursively(dir: string, exts: Set<string>): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...listFilesRecursively(p, exts));
    else if (exts.has(path.extname(p).toLowerCase())) out.push(p);
  }
  return out;
}

function makeHref(routeBase: string, baseDir: string, absFile: string): string {
  const rel = path.relative(baseDir, absFile).replace(/\\/g, "/");
  const slug = rel.replace(/\.(md|mdx|json)$/i, "");
  return `${routeBase}/${slug}`.replace(/\/+/g, "/").replace(/\/$/, "");
}

/** MD/MDX 読み込み */
function loadFromMdx(): PostMeta[] {
  const posts: PostMeta[] = [];
  for (const [dir, routeBase] of MDX_DIRS) {
    if (!fs.existsSync(dir)) continue;
    const files = listFilesRecursively(dir, VALID_MDX);
    for (const file of files) {
      const raw = fs.readFileSync(file, "utf8");
      const { data } = matter(raw);

      const filenameSlug = path.basename(file).replace(/\.mdx?$/i, "");
      const slug =
        (typeof data?.slug === "string" && data.slug) || filenameSlug;

      const title =
        typeof data?.title === "string" && data.title.trim().length
          ? data.title
          : slug;

      const published =
        data?.published === false || data?.draft === true ? false : true;

      const href =
        typeof data?.permalink === "string" && data.permalink.trim().length
          ? data.permalink
          : makeHref(routeBase, dir, file);

      posts.push({
        slug,
        title,
        date: normalizeDate(String(data?.date || "")),
        category:
          typeof data?.category === "string" && data.category.trim().length
            ? data.category
            : null,
        excerpt:
          typeof data?.excerpt === "string" && data.excerpt.trim().length
            ? data.excerpt
            : null,
        thumbnail: resolveThumbnail(
          typeof data?.thumbnail === "string" ? data.thumbnail : null
        ),
        published,
        href,
      });
    }
  }
  return posts;
}

/** JSON 読み込み（/data/**） */
function loadFromJson(): PostMeta[] {
  const posts: PostMeta[] = [];

  for (const [dir, routeBase] of JSON_DIRS) {
    if (!fs.existsSync(dir)) continue;

    const files = listFilesRecursively(dir, new Set([".json"]));
    for (const file of files) {
      let obj: any = null;
      try {
        obj = JSON.parse(fs.readFileSync(file, "utf8"));
      } catch {
        continue; // 壊れたJSONは無視
      }

      // 採用条件：listingが明示的にfalseなら除外。それ以外は採用。
      const listing =
        obj?.listing === false ? false : true;
      const published =
        obj?.published === false || obj?.draft === true ? false : true;
      if (!listing || !published) continue;

      const filenameSlug = path.basename(file, ".json");
      const slug: string =
        (typeof obj?.slug === "string" && obj.slug) || filenameSlug;

      const title: string =
        (typeof obj?.title === "string" && obj.title) ||
        (typeof obj?.metaTitle === "string" && obj.metaTitle) ||
        slug;

      const date = normalizeDate(
        obj?.date || obj?.publishedAt || obj?.updatedAt
      );

      const category: string | null =
        typeof obj?.category === "string" && obj.category.trim().length
          ? obj.category
          : typeof obj?.categoryName === "string" && obj.categoryName.trim().length
          ? obj.categoryName
          : typeof obj?.tag === "string" && obj.tag.trim().length
          ? obj.tag
          : null;

      const excerpt: string | null =
        typeof obj?.excerpt === "string" && obj.excerpt.trim().length
          ? obj.excerpt
          : typeof obj?.description === "string" && obj.description.trim().length
          ? obj.description
          : typeof obj?.summary === "string" && obj.summary.trim().length
          ? obj.summary
          : null;

      const thumbnail = resolveThumbnail(
        obj?.thumbnail || obj?.image || obj?.cover || null
      );

      const href = `${routeBase}/${slug}`.replace(/\/+/g, "/");

      posts.push({
        slug,
        title,
        date,
        category,
        excerpt,
        thumbnail,
        published,
        href,
      });
    }
  }

  return posts;
}

/** 公開記事を集約して新しい順に */
export function getAllPosts(): PostMeta[] {
  const mdx = loadFromMdx();
  const json = loadFromJson();
  const posts = [...mdx, ...json].filter((p) => p.published);

  // 重複を除去（slugとcategoryの組み合わせでユニークにする）
  const uniquePosts = posts.filter((post, index, self) => 
    index === self.findIndex(p => p.slug === post.slug && p.category === post.category)
  );

  uniquePosts.sort((a, b) => safeDateToNumber(b.date) - safeDateToNumber(a.date));
  return uniquePosts;
}

export function getAllCategories(posts: PostMeta[]): string[] {
  const set = new Set<string>();
  posts.forEach((p) => p.category && set.add(p.category));
  return Array.from(set).sort((a, b) => a.localeCompare(b, "ja"));
}

/** 関連記事（同カテゴリ 最新N件） */
export function getRelatedPosts(
  all: PostMeta[],
  current: { slug?: string; category?: string | null; date?: string },
  limit = 3
): PostMeta[] {
  const same = all.filter(
    (p) => p.slug !== current.slug && p.category && p.category === current.category
  );
  same.sort((a, b) => safeDateToNumber(b.date) - safeDateToNumber(a.date));
  return same.slice(0, limit);
}

/** 最新記事（公開済みのみ、日付降順） */
export async function getLatestPosts(limit = 5): Promise<SimplePost[]> {
  const all = getAllPosts(); // Frontmatter を含む全記事
  return all
    .filter((p) => p.published !== false) // unpublished を除外
    .sort((a, b) => {
      const da = new Date(a.date || 0).getTime();
      const db = new Date(b.date || 0).getTime();
      return db - da;
    })
    .slice(0, limit)
    .map((p) => ({
      slug: String(p.slug),
      title: p.title ?? "(無題)",
      category: deriveCategory(p) || "その他",
      date: p.date ?? null,
      description: p.excerpt ?? null,
    }));
} 