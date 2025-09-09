import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import fg from "fast-glob";
import matter from "gray-matter";
import PostListSimple from "@/components/PostListSimple";

type Card = { url: string; title: string; date: string; description?: string | null };
type Props = { posts: Card[] };

// --- helpers ---
const ROOTS = ["articles", "content"];
const GHP = "global-hot-picks";

function toUrl(relPath: string) {
  // pages/ 配下に置いていない前提の静的ファイル構成の場合は、ファイルパス=URL に寄せる
  // 例: articles/global-hot-picks/trend/2025-08-21.mdx -> /articles/global-hot-picks/trend/2025-08-21
  return "/" + relPath.replace(/\.(md|mdx)$/, "").replace(/\\/g, "/");
}

function normalize(s: unknown) {
  return (s ?? "").toString().trim();
}

function isGlobalHotPicks(filePath: string, data: any) {
  const cat = normalize(data?.category).toLowerCase();
  const tags = Array.isArray(data?.tags)
    ? data.tags.map((t: any) => normalize(t).toLowerCase())
    : normalize(data?.tags) ? [normalize(data?.tags).toLowerCase()] : [];
  const byCategory = cat === GHP;
  const byTag = tags.includes(GHP);
  const byPath = filePath.includes(`/articles/${GHP}/`);
  return byCategory || byTag || byPath;
}

function parseOne(absPath: string): Card | null {
  const raw = fs.readFileSync(absPath, "utf-8");
  const { data } = matter(raw);

  if (!isGlobalHotPicks(absPath.replace(process.cwd() + path.sep, "").replace(/\\/g, "/"), data)) {
    return null;
  }

  const title = normalize(data?.title) || path.basename(absPath, path.extname(absPath));
  const date = normalize(data?.date);
  if (!date) return null; // 日付必須（不要ならここで file birthtime に置換）

  const description = data?.description ? String(data.description) : null;

  const rel = absPath.replace(process.cwd() + path.sep, "").replace(/\\/g, "/");
  const url = toUrl(rel);

  return { url, title, date, description };
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const patterns = ROOTS.map((r) => `${r}/**/*.{md,mdx}`);
  const files = await fg(patterns, { onlyFiles: true, dot: false });
  const cards: Card[] = [];

  for (const rel of files) {
    const abs = path.join(process.cwd(), rel);
    const c = parseOne(abs);
    if (c) cards.push(c);
  }

  // 日付降順
  cards.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 重複URLを後勝ちでユニーク
  const map = new Map<string, Card>();
  cards.forEach((p) => map.set(p.url, p));

  return { props: { posts: Array.from(map.values()) } };
};

// --- page ---
export default function GlobalHotPicksPage({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Global Hot Picks | Market Supporter AI</title>
        <meta
          name="description"
          content="海外で話題のアイテムを厳選して紹介するGlobal Hot Picksの最新＆過去記事一覧（画像なしテキストカード表示）。"
        />
        <link rel="canonical" href="https://www.marketsupporter-ai.com/global-hot-picks" />
      </Head>

      {/* パンくず */}
      <nav className="text-sm mb-4">
        <Link href="/">Home</Link> <span className="mx-1">›</span>
        <span className="text-gray-500">Global Hot Picks</span>
      </nav>

      <h1 className="text-3xl font-bold mb-6">Global Hot Picks</h1>

      {!posts.length ? (
        <p className="text-gray-500">まだ記事がありません。</p>
      ) : (
        <PostListSimple items={posts} />
      )}
    </>
  );
} 