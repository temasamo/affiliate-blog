import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  type: string;
}

interface AiAppsRecommendProps {
  articles: Article[];
}

export default function AiAppsRecommend({ articles }: AiAppsRecommendProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="おすすめAIアプリ一覧 - Market Supporter AI"
        description="最新のAIアプリとツールを厳選して紹介。生産性向上に役立つAIアプリの情報をお届けします。"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* パンくずリスト */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                ホーム
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link href="/ai-apps" className="hover:text-blue-600 transition-colors">
                AIアプリ情報
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">おすすめAIアプリ</span>
            </li>
          </ol>
        </nav>

        {/* ページヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            おすすめAIアプリ一覧
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            最新のAIアプリとツールを厳選して紹介。生産性向上に役立つAIアプリの情報をお届けします。
          </p>
        </div>

        {/* 記事一覧 */}
        {articles.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/ai-apps/recommend/${article.slug}`}
                className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      おすすめAIアプリ
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(article.date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                      詳細を見る →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🤖</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              記事を準備中です
            </h2>
            <p className="text-gray-600 mb-8">
              おすすめAIアプリに関する記事を鋭意作成中です。<br />
              もうしばらくお待ちください。
            </p>
            <Link
              href="/ai-apps"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              AIアプリ情報トップに戻る
            </Link>
          </div>
        )}

        {/* 戻るボタン */}
        <div className="mt-12 text-center">
          <Link
            href="/ai-apps"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            ← AIアプリ情報トップに戻る
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps<AiAppsRecommendProps> = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles', 'ai-apps', 'recommend');
  const articles: Article[] = [];

  if (fs.existsSync(articlesDirectory)) {
    const files = fs.readdirSync(articlesDirectory);
    
    files.forEach(file => {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const filePath = path.join(articlesDirectory, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data: frontMatter } = matter(fileContents);
        
        articles.push({
          slug: file.replace(/\.(md|mdx)$/, ''),
          title: frontMatter.title || '記事タイトル',
          description: frontMatter.description || '記事の説明',
          date: frontMatter.date || '2025.10.19',
          type: 'recommend'
        });
      }
    });
  }

  // 日付順でソート（新しい順）
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      articles,
    },
  };
};
