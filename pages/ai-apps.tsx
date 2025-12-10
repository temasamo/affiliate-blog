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

// 記事リンクを生成する関数
function getAiAppsArticleLink(slug: string, type: string): string {
  // 特定の記事の修正
  if (slug === "ai-skin-analysis") {
    return `/articles/ai-apps/recommend/2025-10-29-ai-skin-analysis`;
  }
  if (slug === "ai-health-tracking") {
    return `/articles/ai-apps/recommend/2025-10-31-ai-health-tracking`;
  }
  if (slug === "ai-fashion-coordination-apps") {
    return `/articles/ai-apps/recommend/2025-11-02-ai-fashion-coordination`;
  }
  if (slug === "ai-mental-health-apps") {
    return `/articles/ai-apps/recommend/2025-11-05-ai-mental-health`;
  }
  if (slug === "ai-travel-planner-apps") {
    return `/articles/ai-apps/recommend/2025-11-08-ai-travel-planner-apps`;
  }
  if (slug === "ai-learning-support-apps") {
    return `/articles/ai-apps/recommend/2025-11-12-ai-learning-support-apps`;
  }
  if (slug === "ai-kakeibo-2025") {
    return `/articles/ai-apps/recommend/2025-12-11-ai-kakeibo-2025`;
  }
  // slugが既にファイル名形式（日付プレフィックス付き）の場合はそのまま使用
  if (slug.match(/^\d{4}-\d{2}-\d{2}-/)) {
    return `/articles/ai-apps/${type}/${slug}`;
  }
  return `/articles/ai-apps/${type}/${slug}`;
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
          {/* パンくずリスト */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-blue-600">ホーム</Link></li>
              <li>/</li>
              <li className="text-gray-900">AIアプリ情報</li>
            </ol>
          </nav>
          
          <div className="text-center mb-8">
            <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-purple-600/80"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  🤖
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
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
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              最新のAIアプリ・ツール・サービスを紹介し、生産性向上のためのAI活用術を提案します。ChatGPT、Claude、Geminiなどの主要AIから、画像生成・動画編集AI、業務効率化ツールまで幅広くカバーします。
            </p>
          </div>

          {/* おすすめAIアプリ セクション */}
          {recommendArticles.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">🤖 おすすめAIアプリ</h2>
                {recommendArticles.length > 3 && (
                  <Link 
                    href="/ai-apps/recommend" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    すべて見る →
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendArticles.slice(0, 3).map((article) => (
                  <Link
                    key={article.slug}
                    href={getAiAppsArticleLink(article.slug, article.type)}
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
          )}

          {/* AI活用術 セクション */}
          {knowledgeArticles.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">💡 AI活用術</h2>
                {knowledgeArticles.length > 3 && (
                  <Link 
                    href="/articles/ai-apps/knowledge" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    すべて見る →
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {knowledgeArticles.slice(0, 3).map((article) => (
                  <Link
                    key={article.slug}
                    href={getAiAppsArticleLink(article.slug, article.type)}
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
          )}
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
        
        // publishedがfalseの場合はスキップ
        if (frontMatter.published === false) {
          return;
        }
        
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
        
        // publishedがfalseの場合はスキップ
        if (frontMatter.published === false) {
          return;
        }
        
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
