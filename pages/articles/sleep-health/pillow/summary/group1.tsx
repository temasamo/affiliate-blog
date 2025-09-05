import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

export default function Group1Summary({ frontMatter, mdxSource }: { frontMatter: any; mdxSource: any; }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="mb-8">
            <Link href="/articles/sleep-health/pillow/group1" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4" >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              グループ1（基本編）一覧に戻る
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {frontMatter.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <time dateTime={frontMatter.date}>{frontMatter.date}</time>
              {frontMatter.category && (
                <span className="inline-flex items-center rounded-full border border-gray-300 px-2.5 py-1 text-xs font-medium bg-gray-50 text-gray-700">
                  {frontMatter.category}
                </span>
              )}
            </div>
            {frontMatter.description && (
              <p className="text-lg text-gray-600 mb-8">
                {frontMatter.description}
              </p>
            )}
          </div>
          <div className="prose prose-lg max-w-none">
            <MDXRemote {...mdxSource} />
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "articles", "sleep-health", "pillow", "summary", "pillow-summary-group1.mdx");
  if (!fs.existsSync(filePath)) return { notFound: true };
  const src = fs.readFileSync(filePath, "utf8");
  const { data: frontMatter, content } = matter(src);
  if (frontMatter.published === false) return { notFound: true };
  const mdxSource = await serialize(content);
  return { props: { frontMatter, mdxSource } };
}
