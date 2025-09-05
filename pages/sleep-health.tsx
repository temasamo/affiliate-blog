// pages/sleep-health.tsx
import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GetStaticProps } from 'next';
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

interface SleepHealthProps {
  recommendArticles: Article[];
  knowledgeArticles: Article[];
}

export default function SleepHealth({ recommendArticles, knowledgeArticles }: SleepHealthProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="睡眠・健康 - Market Supporter AI"
        description="枕・マットレス・快眠グッズなど、睡眠の質を高める情報や商品を紹介します。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/80 to-blue-600/80"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                <img
                  src="https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&h=400&fit=crop"
                  alt="睡眠・健康"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-3xl font-bold mb-2">
                    睡眠・健康
                  </div>
                  <div className="text-white/90 text-lg bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm">
                    枕・マットレス・快眠グッズ
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              枕・マットレス・快眠グッズなど、睡眠の質を高める情報や商品を紹介します。
            </p>
            
            {/* 枕診断AIへの導線 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">枕診断AIシリーズ</h4>
                    <p className="text-sm text-gray-600">科学的根拠に基づく枕選びの新時代</p>
                  </div>
                </div>
                <Link href="/diagnostic-ai/makura/01-intro" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors">
                  診断を始める
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* 枕選びガイド セクション */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">枕選びガイド</h2>
            <p className="text-gray-600 mb-6">診断・選び方に特化した記事群。まずはここから。</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 親ページ（グループ1まとめ）へのカード 1件のみ */}
              <Link
                href="/articles/sleep-health/pillow/group1"
                className="block rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-xs text-gray-500 mb-2">枕診断シリーズ</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  グループ1（基本編）｜高さ・素材・硬さ・肩こり・いびき
                </h3>
                <p className="text-gray-600 text-sm">
                  枕選びの基礎を5本立てで網羅。迷ったらまずはここから。
                </p>
                <div className="mt-3 flex items-center text-sm text-green-600">
                  <span>まとめページへ</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              {/* 将来：グループが増えたら下にカードを追加していく */}
              {/* 例：
              <Link href="/articles/sleep-health/pillow/group2" ...>グループ2（〇〇編）</Link>
              */}
            </div>
          </div>

          {/* Recomend セクション */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              おすすめ商品
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {recommendArticles.slice(0, 6).map((article) => (
              <Link key={article.slug} href={`/articles/sleep-health/recommend/${article.slug}`} className="group block">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
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
              {/* おすすめ商品一覧カード */}
              <Link href="/articles/sleep-health/recommend" className="group block">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-indigo-200">
                  <div className="flex items-center mb-3">
                    <div className="text-2xl mr-3">🛒</div>
                    <h3 className="text-lg font-semibold text-indigo-700 group-hover:text-indigo-800 transition-colors">
                      おすすめ商品一覧
                    </h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-indigo-600">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                      <span>枕・マットレス・快眠グッズ</span>
                    </div>
                    <div className="flex items-center text-sm text-indigo-600">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                      <span>睡眠の質を向上させる商品</span>
                    </div>
                    <div className="flex items-center text-sm text-indigo-600">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                      <span>価格比較・レビュー付き</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-indigo-600 font-medium">
                    <span>全{recommendArticles.length}記事を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Knowledge セクション */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              睡眠知識
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {knowledgeArticles.slice(0, 6).map((article) => (
                <Link key={article.slug} href={`/articles/sleep-health/knowledge/${article.slug}`} className="group block">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600">{article.description}</p>
                    <div className="mt-3 flex items-center text-xs text-green-600">
                      <span>詳細を見る</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
              {/* 睡眠知識一覧カード */}
              <Link href="/articles/sleep-health/knowledge" className="group block">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="text-2xl mr-3">📚</div>
                    <h3 className="text-lg font-semibold text-green-700 group-hover:text-green-800 transition-colors">
                      睡眠知識一覧
                    </h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-green-600">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      <span>睡眠の質を向上させる知識</span>
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      <span>快眠のための生活習慣</span>
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      <span>睡眠と健康の関係</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-green-600 font-medium">
                    <span>全{knowledgeArticles.length}記事を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps<SleepHealthProps> = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles', 'sleep-health');
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
