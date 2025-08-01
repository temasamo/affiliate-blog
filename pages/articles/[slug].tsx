import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

interface ArticleProps {
  content: string;
  frontMatter: {
    title?: string;
    date?: string;
    category?: string;
    [key: string]: any;
  };
}

export default function Article({ content, frontMatter }: ArticleProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
                Affiliate Blog
              </Link>
              <span className="ml-4 text-sm text-gray-500">商品比較・ランキング</span>
            </div>
            <nav className="flex space-x-6">
              <Link href="/sleep-health" className="text-gray-600 hover:text-gray-900">睡眠・健康</Link>
              <Link href="/japanese-tea" className="text-gray-600 hover:text-gray-900">日本茶</Link>
              <Link href="/overseas-trend" className="text-gray-600 hover:text-gray-900">海外トレンド</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 記事ヘッダー */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {frontMatter.category || '商品比較'}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              {frontMatter.date || '2025.07.01'}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {frontMatter.title || '商品比較・ランキング'}
          </h1>
          <p className="text-gray-600">
            実際に商品を購入して徹底的に比較・検証した結果をお届けします
          </p>
        </div>

        {/* 記事本文 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <article className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </article>
        </div>

        {/* 関連記事 */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">関連記事</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/articles/2025-07-01-makura-ranking" className="group">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                  枕総合ランキング
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  価格・機能・口コミの3軸で徹底比較
                </p>
                <span className="text-xs text-gray-500">2025.07.01</span>
              </div>
            </Link>
            <Link href="/articles/2025-07-02-teihannpatsu-vs-others" className="group">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                  定番発毛剤比較
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  効果・価格・使いやすさを検証
                </p>
                <span className="text-xs text-gray-500">2025.07.02</span>
              </div>
            </Link>
          </div>
        </div>

        {/* カテゴリ一覧 */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">カテゴリ別商品比較</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/sleep-health" className="group">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">😴</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">睡眠・健康</h3>
                <p className="text-sm text-gray-600">枕・マットレス・睡眠改善</p>
              </div>
            </Link>
            <Link href="/japanese-tea" className="group">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">🍵</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">日本茶</h3>
                <p className="text-sm text-gray-600">緑茶・抹茶・お茶文化</p>
              </div>
            </Link>
            <Link href="/overseas-trend" className="group">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">🌍</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">海外トレンド</h3>
                <p className="text-sm text-gray-600">海外で話題の商品</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const filenames = fs.readdirSync(articlesDirectory);

  const paths = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => ({
      params: {
        slug: filename.replace(/\.md$/, ''),
      },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ArticleProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const fullPath = path.join(process.cwd(), 'articles', `${slug}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontMatter, content } = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      props: {
        content: contentHtml,
        frontMatter,
      },
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return {
      notFound: true,
    };
  }
}; 