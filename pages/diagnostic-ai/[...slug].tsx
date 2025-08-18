import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";

const ROOT = path.join(process.cwd(), "articles", "diagnostic-ai");

type Props = { source: MDXRemoteSerializeResult; frontMatter: any };

export default function Article({ source, frontMatter }: Props) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <article className="mx-auto max-w-4xl p-6 sm:p-10">
        {/* ヘッダー部分 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium mb-6">
            <span className="mr-2">🤖</span>
            枕診断AIシリーズ
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {frontMatter?.title}
          </h1>
        {frontMatter?.description && (
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              {frontMatter.description}
            </p>
        )}
        </div>

        {/* 記事コンテンツ */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 p-8 sm:p-12 shadow-xl shadow-blue-500/10">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-800 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg">
          <MDXRemote {...source} />
          </div>
        </div>

        {/* トップへ戻るボタン */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            トップページへ戻る
          </Link>
        </div>
      </article>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { slug: string[] } }[] = [];
  const walk = (dir: string, parts: string[] = []) => {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      const rel = [...parts, f];
      if (fs.statSync(p).isDirectory()) walk(p, rel);
      else if (/\.(md|mdx)$/i.test(f)) {
        const slug = rel.join("/").replace(/\.(md|mdx)$/i, "").split("/");
        paths.push({ params: { slug } });
      }
    }
  };
  if (fs.existsSync(ROOT)) walk(ROOT);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = (params?.slug as string[]) || [];
  const file = path.join(ROOT, ...slug) + ".mdx";
  const raw = fs.readFileSync(file, "utf-8");
  const { content, data } = matter(raw);
  const mdx = await serialize(content, { scope: data });
  return { props: { source: mdx, frontMatter: data } };
}; 