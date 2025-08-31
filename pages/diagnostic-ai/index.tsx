import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getAllPosts } from '../../lib/posts';

interface DiagnosticAIPageProps {
  posts: Array<{
    slug: string;
    title: string;
    category: string;
    date: string | null;
    excerpt?: string | null;
  }>;
}

export default function DiagnosticAIPage({ posts }: DiagnosticAIPageProps) {
  return (
    <>
      <Head>
        <title>診断AI | Market Supporter AI</title>
        <meta name="description" content="AIを活用した診断ツールとガイド。枕診断AIシリーズなど、科学的根拠に基づいた診断コンテンツを提供します。" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* ヘッダー */}
          <div className="text-center mb-12">
            <div className="flex justify-between items-center mb-8">
              <Link href="/" className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                トップへ戻る
              </Link>
              <div></div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              診断AI
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AIを活用した診断ツールとガイド。科学的根拠に基づいた診断コンテンツで、あなたの生活をサポートします。
            </p>
          </div>

          {/* 枕診断AIシリーズ */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                枕診断AIシリーズ
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                科学的根拠に基づく枕選びの新時代
              </p>
              <Link 
                href="/diagnostic-ai/makura/01-intro" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
              >
                シリーズを読む →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts
                .sort((a, b) => {
                  if (!a.date || !b.date) return 0;
                  return new Date(b.date).getTime() - new Date(a.date).getTime();
                })
                .map((post) => (
                  <Link
                    key={post.slug}
                    href={`/diagnostic-ai/makura/${post.slug}`}
                    className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                          {post.excerpt}
                        </p>
                      )}
                      {post.date && (
                        <p className="text-xs text-gray-500">
                          {new Date(post.date).toLocaleDateString('ja-JP')}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* その他の診断コンテンツ */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              その他の診断コンテンツ
            </h2>
            <p className="text-gray-600 mb-8">
              今後、睡眠診断、健康診断など、様々な診断コンテンツを追加予定です。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const allPosts = getAllPosts();
  
  // 診断AI関連の記事をフィルタリング（枕診断AIシリーズのみ）
  const diagnosticPosts = allPosts
    .filter(post => 
      post.category === '診断AI'
    )
    .map(post => ({
      slug: post.slug,
      title: post.title,
      category: post.category,
      date: post.date,
      excerpt: post.excerpt,
    }));

  return {
    props: {
      posts: diagnosticPosts,
    },
  };
}; 