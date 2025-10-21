// pages/whisky.tsx
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

interface WhiskyProps {
  brandArticles: Article[];
  knowledgeArticles: Article[];
}

export default function Whisky({ brandArticles, knowledgeArticles }: WhiskyProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="ウイスキー - Market Supporter AI"
        description="ウイスキーの銘柄紹介・知識・コンシェルジュAIで、あなたにぴったりのウイスキーを見つけましょう。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/80 to-amber-800/80"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-amber-300">
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  🥃
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-3xl font-bold mb-2">
                    ウイスキー
                  </div>
                  <div className="text-white/90 text-lg bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm">
                    銘柄紹介・知識・コンシェルジュAI
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              ウイスキーの奥深い世界を探索しましょう。厳選された銘柄紹介、豊富な知識記事、
              そしてあなたにぴったりのウイスキーを見つけるコンシェルジュAIをご用意しています。
            </p>
          </div>

          {/* 銘柄紹介セクション */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">銘柄紹介</h2>
              <Link 
                href="/articles/whisky/brands" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                すべて見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandArticles.slice(0, 3).map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/whisky/brands/${article.slug}`}
                  className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="text-xs text-gray-500">
                      {article.date}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 知識セクション */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">ウイスキー知識</h2>
              <Link 
                href="/articles/whisky/knowledge" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                すべて見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {knowledgeArticles.slice(0, 3).map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/whisky/knowledge/${article.slug}`}
                  className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="text-xs text-gray-500">
                      {article.date}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* コンシェルジュAIセクション */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-8 border border-amber-200">
              <div className="text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">ウイスキーコンシェルジュAI</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  あなたの好みやシーンに合わせて、最適なウイスキーを提案します。
                  初心者から上級者まで、誰でも簡単に使える診断AIです。
                </p>
                <Link
                  href="/articles/whisky/diagnosis"
                  className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors"
                >
                  診断を開始する
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps<WhiskyProps> = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles/whisky');
  
  // 銘柄紹介記事を取得
  const brandsDir = path.join(articlesDirectory, 'brands');
  const brandArticles: Article[] = [];
  
  if (fs.existsSync(brandsDir)) {
    const files = fs.readdirSync(brandsDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    files.forEach(file => {
      const filePath = path.join(brandsDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontMatter } = matter(fileContents);
      
      brandArticles.push({
        slug: file.replace(/\.(md|mdx)$/, ''),
        title: frontMatter.title || '記事タイトル',
        description: frontMatter.description || '記事の説明',
        date: frontMatter.date || '2025.10.21',
        type: 'brands'
      });
    });
  }

  // 知識記事を取得
  const knowledgeDir = path.join(articlesDirectory, 'knowledge');
  const knowledgeArticles: Article[] = [];
  
  if (fs.existsSync(knowledgeDir)) {
    const files = fs.readdirSync(knowledgeDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    files.forEach(file => {
      const filePath = path.join(knowledgeDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontMatter } = matter(fileContents);
      
      
      knowledgeArticles.push({
        slug: file.replace(/\.(md|mdx)$/, ''),
        title: frontMatter.title || '記事タイトル',
        description: frontMatter.description || '記事の説明',
        date: frontMatter.date || '2025.10.21',
        type: 'knowledge'
      });
    });
  }

  return {
    props: {
      brandArticles: brandArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      knowledgeArticles: knowledgeArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    },
  };
};
