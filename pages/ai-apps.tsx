// pages/ai-apps.tsx
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

interface AiAppsProps {
  recommendArticles: Article[];
  knowledgeArticles: Article[];
}

export default function AiApps({ recommendArticles, knowledgeArticles }: AiAppsProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="AIアプリ情報 - Market Supporter AI"
        description="最新のAIアプリ・ツール・サービスを紹介し、生産性向上のためのAI活用術を提案します。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/60 to-purple-600/60 z-10"></div>
              <div className="absolute inset-0">
                <video
                  src="/videos/categories/ai-apps-hero.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <div className="text-white text-3xl font-bold mb-2">
                    AIアプリ情報
                  </div>
                  <div className="text-white/90 text-lg bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm">
                    最新AIツール・生産性向上
                  </div>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              最新のAIアプリ・ツール・サービスを紹介し、生産性向上のためのAI活用術を提案します。
            </p>
          </div>

          {/* おすすめAIアプリ セクション */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              おすすめAIアプリ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendArticles.slice(0, 6).map((article) => (
                <Link key={article.slug} href={`/articles/ai-apps/recommend/${article.slug}`} className="group block">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
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
              {/* おすすめAIアプリ一覧カード */}
              <Link href="/ai-apps/recommend" className="group block">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-blue-200">
                  <div className="flex items-center mb-3">
                    <div className="text-2xl mr-3">🤖</div>
                    <h3 className="text-lg font-semibold text-blue-700 group-hover:text-blue-800 transition-colors">
                      おすすめAIアプリ一覧
                    </h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-blue-600">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      <span>ChatGPT・Claude・Gemini</span>
                    </div>
                    <div className="flex items-center text-sm text-blue-600">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      <span>画像生成・動画編集AI</span>
                    </div>
                    <div className="flex items-center text-sm text-blue-600">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      <span>生産性向上ツール</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-blue-600 font-medium">
                    <span>全{recommendArticles.length}記事を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* AI活用術 セクション */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              AI活用術
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {knowledgeArticles.slice(0, 6).map((article) => (
                <Link key={article.slug} href={`/articles/ai-apps/knowledge/${article.slug}`} className="group block">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
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
              {/* AI活用術一覧カード */}
              <Link href="/articles/ai-apps/knowledge" className="group block">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-purple-200">
                  <div className="flex items-center mb-3">
                    <div className="text-2xl mr-3">💡</div>
                    <h3 className="text-lg font-semibold text-purple-700 group-hover:text-purple-800 transition-colors">
                      AI活用術一覧
                    </h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-purple-600">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      <span>プロンプトエンジニアリング</span>
                    </div>
                    <div className="flex items-center text-sm text-purple-600">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      <span>業務効率化・自動化</span>
                    </div>
                    <div className="flex items-center text-sm text-purple-600">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                      <span>AI活用事例・トレンド</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-purple-600 font-medium">
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

        {/* トップページへ戻るボタン */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            ← トップページへ戻る
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps<AiAppsProps> = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles', 'ai-apps');
  const recommendArticles: Article[] = [];
  const knowledgeArticles: Article[] = [];

  // Recommend 記事を取得
  const recommendPath = path.join(articlesDirectory, 'recommend');
  if (fs.existsSync(recommendPath)) {
    const files = fs.readdirSync(recommendPath);
    files.forEach(file => {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const filePath = path.join(recommendPath, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data: frontMatter } = matter(fileContents);
        
        recommendArticles.push({
          slug: file.replace(/\.(md|mdx)$/, ''),
          title: frontMatter.title || '記事タイトル',
          description: frontMatter.description || '記事の説明',
          date: frontMatter.date || '2025.10.18',
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
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const filePath = path.join(knowledgePath, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data: frontMatter } = matter(fileContents);
        
        knowledgeArticles.push({
          slug: file.replace(/\.(md|mdx)$/, ''),
          title: frontMatter.title || '記事タイトル',
          description: frontMatter.description || '記事の説明',
          date: frontMatter.date || '2025.10.18',
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
