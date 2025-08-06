// pages/overseas-trend.tsx
import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  type: string;
}

interface OverseasTrendProps {
  recommendArticles: Article[];
  knowledgeArticles: Article[];
}

export default function OverseasTrend({ recommendArticles, knowledgeArticles }: OverseasTrendProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="海外トレンド - Market Supporter AI"
        description="海外で話題の商品やトレンド情報を紹介します。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-cyan-600/80"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop"
                  alt="海外トレンド"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-3xl font-bold mb-2">
                    海外トレンド
                  </div>
                  <div className="text-white/90 text-lg bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm">
                    海外で話題の商品
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              海外で話題の商品やトレンド情報を紹介します。
            </p>
          </div>

          {/* Recomend セクション */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              おすすめ商品
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {recommendArticles.slice(0, 6).map((article) => (
              <Link key={article.slug} href={`/articles/popularproducts-overseas/recommend/${article.slug}`} className="group">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
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
              {/* 過去の記事一覧カード */}
              {recommendArticles.length > 6 && (
                <Link href="/articles/popularproducts-overseas/recommend" className="group">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-dashed border-gray-300">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 group-hover:text-gray-900 transition-colors">
                      過去の記事一覧
                    </h3>
                    <p className="text-sm text-gray-600">おすすめ商品の過去記事をすべて見る</p>
                    <div className="mt-3 flex items-center text-xs text-gray-600">
                      <span>一覧を見る</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Knowledge セクション */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              海外トレンド知識
            </h2>
            <div className="bg-green-50 rounded-xl p-6">
              <p className="text-sm text-gray-600">
                海外トレンドに関する知識記事は現在準備中です。<br />
                もうしばらくお待ちください。
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps<OverseasTrendProps> = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles', 'popularproducts-overseas');
  const recommendArticles: Article[] = [];
  const knowledgeArticles: Article[] = [];

  // Recommend 記事を取得
  const recommendPath = path.join(articlesDirectory, 'recommend');
  if (fs.existsSync(recommendPath)) {
    const files = fs.readdirSync(recommendPath);
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(recommendPath, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data: frontMatter } = matter(fileContents);
        
        recommendArticles.push({
          slug: file.replace(/\.md$/, ''),
          title: frontMatter.title || '記事タイトル',
          description: frontMatter.description || '記事の説明',
          date: frontMatter.date || '2025.07.01',
          type: 'recommend'
        });
      }
    });
  }

  // Knowledge 記事を取得
  const knowledgePath = path.join(articlesDirectory, 'knowledge');
  if (fs.existsSync(knowledgePath)) {
    const files = fs.readdirSync(knowledgePath);
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const filePath = path.join(knowledgePath, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data: frontMatter } = matter(fileContents);
        
        knowledgeArticles.push({
          slug: file.replace(/\.md$/, ''),
          title: frontMatter.title || '記事タイトル',
          description: frontMatter.description || '記事の説明',
          date: frontMatter.date || '2025.07.01',
          type: 'knowledge'
        });
      }
    });
  }

  // 日付順でソート（新しい順）
  recommendArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  knowledgeArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      recommendArticles,
      knowledgeArticles,
    },
  };
};
