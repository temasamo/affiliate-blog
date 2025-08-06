// pages/articles/sleep-health/recomend/index.tsx
import React from 'react';
import Link from 'next/link';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
}

interface RecomendIndexProps {
  articles: Article[];
}

export default function RecomendIndex({ articles }: RecomendIndexProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="おすすめ商品一覧 - 睡眠・健康 | Market Supporter AI"
        description="睡眠・健康に関するおすすめ商品の過去記事一覧です。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="mb-8">
            <Link href="/sleep-health" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              睡眠・健康に戻る
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">おすすめ商品一覧</h1>
            <p className="text-gray-600">睡眠・健康に関するおすすめ商品の過去記事をすべて表示しています。</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link key={article.slug} href={`/articles/sleep-health/recomend/${article.slug}`} className="group">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-xs text-gray-500 mb-2">{article.date}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600">{article.description}</p>
                  <div className="mt-3 flex items-center text-xs text-blue-600">
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps<RecomendIndexProps> = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles', 'sleep-health', 'recomend');
  const articles: Article[] = [];

  if (fs.existsSync(articlesDirectory)) {
    const files = fs.readdirSync(articlesDirectory);
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(articlesDirectory, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data: frontMatter } = matter(fileContents);
        
        articles.push({
          slug: file.replace(/\.md$/, ''),
          title: frontMatter.title || '記事タイトル',
          description: frontMatter.description || '記事の説明',
          date: frontMatter.date || '2025.07.01'
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