import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import fg from 'fast-glob';

export type Post = {
  title: string;
  date: string;
  description: string | null;
  thumbnail: string | null;
  tags: string[];
  category: string | null;
  slug: string;
  filePath: string;
  url: string;
};

const NO_IMAGE = '/images/no-image.webp';
const ROOTS = ['content', 'articles', path.join('pages','articles')];

export async function getAllMarkdownFiles() {
  const patterns = ROOTS.map(r => `${r}/**/*.{md,mdx}`);
  const files = await fg(patterns, { dot: false, onlyFiles: true });
  return files;
}

function safe<T>(v: T | undefined | null, fallback: T): T {
  return (v === undefined || v === null) ? fallback : v;
}

export function parsePost(fp: string): Post | null {
  const raw = fs.readFileSync(fp, 'utf-8');
  const { data } = matter(raw);
  const title = safe(data.title, null) ?? path.basename(fp, path.extname(fp));
  const date = safe(data.date, null);
  const description = safe(data.description, null);
  const thumbnail = safe(data.thumbnail, null) ?? NO_IMAGE;
  const tags: string[] = Array.isArray(data.tags) ? data.tags : (data.tags ? [String(data.tags)] : []);
  const category = data.category ? String(data.category) : null;

  // slug
  const rel = fp.replace(process.cwd()+path.sep, '').replace(/\\/g,'/');
  const base = path.basename(fp, path.extname(fp));
  const slug = base;

  // URL 推定（pages配下は /articles/... から、そうでなければ /articles ぶら下げ）
  const inPages = rel.startsWith('pages/');
  const url = inPages
    ? '/'+rel.replace(/^pages\//,'').replace(/\.(md|mdx)$/, '')
    : '/'+rel.replace(/\.(md|mdx)$/, '');

  if (!date) return null; // 日付無しは一覧に出さない（必要ならここで代替日付生成）

  return {
    title: String(title),
    date: String(date),
    description,
    thumbnail,
    tags,
    category,
    slug,
    filePath: rel,
    url,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const files = await getAllMarkdownFiles();
  const posts: Post[] = [];
  for (const fp of files) {
    const p = parsePost(fp);
    if (p) posts.push(p);
  }
  // 重複 slug を後勝ちで uniq
  const map = new Map<string, Post>();
  posts.forEach(p => map.set(p.slug, p));
  const uniq = Array.from(map.values());
  // 日付降順
  uniq.sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime());
  return uniq;
}

export async function getPostsByPredicate(pred: (p: Post)=> boolean) {
  const all = await getAllPosts();
  return all.filter(pred);
} 