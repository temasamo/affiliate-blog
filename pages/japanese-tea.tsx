// pages/japanese-tea.tsx
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

interface JapaneseTeaProps {
  recommendArticles: Article[];
  knowledgeArticles: Article[];
}

export default function JapaneseTea({ recommendArticles, knowledgeArticles }: JapaneseTeaProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="日本茶 - Market Supporter AI"
        description="緑茶・抹茶・お茶文化の紹介と商品比較を行います。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/80 to-emerald-600/80"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                <img
                  src="/images/macha-kyusu.jpg"
                  alt="日本茶"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-3xl font-bold mb-2">
                    日本茶
                  </div>
                  <div className="text-white/90 text-lg bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm">
                    緑茶・抹茶・お茶文化
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              緑茶・抹茶・お茶文化の紹介と商品比較を行います。
            </p>
          </div>

          {/* Recomend セクション */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              おすすめ商品
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {recommendArticles.slice(0, 6).map((article) => (
              <Link key={article.slug} href={`/articles/japanesetea/recommend/${article.slug}`} className="group block">
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600">{article.description}</p>
                    <div className="mt-3 flex items-center text-xs text-purple-600">
                      <span>詳細を見る</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
              {/* おすすめ商品一覧カード */}
              <Link href="/articles/japanesetea/recommend" className="group block">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-purple-200">
                  <div className="flex items-center mb-3">
                    <div className="text-2xl mr-3">🛒</div>
                    <h3 className="text-lg font-semibold text-purple-700 group-hover:text-purple-800 transition-colors">
                      おすすめ商品一覧
                    </h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-purple-600">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      <span>抹茶セット・急須・茶器</span>
                    </div>
                    <div className="flex items-center text-sm text-purple-600">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      <span>初心者〜上級者向け</span>
                    </div>
                    <div className="flex items-center text-sm text-purple-600">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      <span>価格比較・レビュー付き</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-purple-600 font-medium">
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
              日本茶知識
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {knowledgeArticles.slice(0, 6).map((article) => (
                <Link key={article.slug} href={`/articles/japanesetea/knowledge/${article.slug}`} className="group block">
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
              {/* 日本茶知識一覧カード */}
              <Link href="/articles/japanesetea/knowledge" className="group block">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-green-200">
                  <div className="flex items-center mb-3">
                    <div className="text-2xl mr-3">📚</div>
                    <h3 className="text-lg font-semibold text-green-700 group-hover:text-green-800 transition-colors">
                      日本茶知識一覧
                    </h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-green-600">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      <span>抹茶の歴史・道具の使い方</span>
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      <span>急須の種類・選び方</span>
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      <span>日本茶ライフスタイル</span>
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

export const getStaticProps: GetStaticProps<JapaneseTeaProps> = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles', 'japanesetea');
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
