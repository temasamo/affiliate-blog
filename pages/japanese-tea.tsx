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
        description="日本茶の基礎・健康効果・おすすめの飲み方を分かりやすく。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* パンくずリスト */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-blue-600">ホーム</Link></li>
              <li>/</li>
              <li className="text-gray-900">日本茶</li>
            </ol>
          </nav>
          
          <div className="text-center mb-8">
            <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/80 to-emerald-600/80"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  🍵
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-3xl font-bold mb-2">
                    日本茶
                  </div>
                  <div className="text-white/90 text-lg bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm">
                    基礎・健康効果・おすすめの飲み方
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              日本茶の奥深い世界を探索しましょう。基礎知識、健康効果、おすすめの飲み方など、
              あなたにぴったりの日本茶を見つける情報をご用意しています。
            </p>
          </div>

          {/* おすすめ商品セクション */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">おすすめ商品</h2>
              <Link 
                href="/articles/japanesetea/recommend" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                すべて見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendArticles.slice(0, 3).map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/japanesetea/recommend/${article.slug}`}
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
              <h2 className="text-2xl font-bold text-gray-900">日本茶知識</h2>
              <Link 
                href="/articles/japanesetea/knowledge" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                すべて見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {knowledgeArticles.slice(0, 3).map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/japanesetea/knowledge/${article.slug}`}
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

          {/* お茶診断AIセクション */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200">
              <div className="text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">お茶診断AI</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  あなたの好みやシーンに合わせて、最適な日本茶を提案します。
                  初心者から上級者まで、誰でも簡単に使える診断AIです。
                </p>
                <Link
                  href="https://tea-diagnosis.vercel.app/tea/quick-diagnosis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
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

export const getStaticProps: GetStaticProps<JapaneseTeaProps> = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles/japanesetea');
  
  // おすすめ商品記事を取得
  const recommendPath = path.join(articlesDirectory, 'recommend');
  const recommendArticles: Article[] = [];
  
  if (fs.existsSync(recommendPath)) {
    const files = fs.readdirSync(recommendPath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    files.forEach(file => {
      const filePath = path.join(recommendPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontMatter } = matter(fileContents);
      
      // publishedがfalseの場合はスキップ
      if (frontMatter.published === false) {
        return;
      }
      
      recommendArticles.push({
        slug: frontMatter.slug || file.replace(/\.(md|mdx)$/, ''),
        title: frontMatter.title || '記事タイトル',
        description: frontMatter.description || '記事の説明',
        date: frontMatter.date || '2025.07.01',
        type: 'recommend'
      });
    });
  }

  // 知識記事を取得
  const knowledgePath = path.join(articlesDirectory, 'knowledge');
  const knowledgeArticles: Article[] = [];
  
  if (fs.existsSync(knowledgePath)) {
    const files = fs.readdirSync(knowledgePath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    files.forEach(file => {
      const filePath = path.join(knowledgePath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontMatter } = matter(fileContents);
      
      // publishedがfalseの場合はスキップ
      if (frontMatter.published === false) {
        return;
      }
      
      // ファイル名ベースのslugを使用（実際のファイル名から拡張子を除いたもの）
      const fileBasedSlug = file.replace(/\.(md|mdx)$/, '');
      
      knowledgeArticles.push({
        slug: fileBasedSlug,
        title: frontMatter.title || '記事タイトル',
        description: frontMatter.description || '記事の説明',
        date: frontMatter.date || '2025.07.01',
        type: 'knowledge'
      });
    });
  }

  return {
    props: {
      recommendArticles: recommendArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      knowledgeArticles: knowledgeArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    },
  };
};

