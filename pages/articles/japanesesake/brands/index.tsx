// pages/articles/japanesesake/brands/index.tsx
import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
}

interface BrandsIndexProps {
  articles: Article[];
}

export default function BrandsIndex({ articles }: BrandsIndexProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="日本酒銘柄紹介 - Market Supporter AI"
        description="厳選された日本酒銘柄の詳細紹介。各銘柄の特徴、味わい、最適な飲み方まで詳しく解説します。"
      />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="relative h-32 mb-6 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/80 to-orange-600/80"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-2xl font-bold mb-2">
                    日本酒銘柄紹介
                  </div>
                  <div className="text-white/90 text-sm bg-black/30 px-4 py-1 rounded-full backdrop-blur-sm">
                    厳選された銘柄の詳細解説
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              日本酒愛好家が厳選した、真に味わう価値のある極上銘柄をご紹介します。
              各銘柄の特徴、味わい、最適な飲み方まで詳しく解説いたします。
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍶</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">記事準備中</h2>
              <p className="text-gray-600">日本酒銘柄紹介記事を準備中です。近日公開予定です。</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/japanesesake/brands/${article.slug}`}
                  className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="p-6">
                    <div className="text-3xl mb-3">🍶</div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {article.description}
                    </p>
                    <div className="text-xs text-gray-500">
                      {article.date}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* 戻るリンク */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <Link
              href="/japanese-sake"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              日本酒カテゴリーページに戻る
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps<BrandsIndexProps> = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles/japanesesake/brands');
  const articles: Article[] = [];
  
  if (fs.existsSync(articlesDirectory)) {
    const files = fs.readdirSync(articlesDirectory).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
    files.forEach(file => {
      const filePath = path.join(articlesDirectory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontMatter } = matter(fileContents);
      
      articles.push({
        slug: file.replace(/\.(mdx?)$/, ''),
        title: frontMatter.title || '記事タイトル',
        description: frontMatter.description || '記事の説明',
        date: frontMatter.date || '2025.09.14'
      });
    });
  }

  return {
    props: {
      articles: articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    },
  };
};
