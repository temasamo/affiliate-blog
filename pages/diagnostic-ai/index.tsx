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
        <meta name="description" content="AIを活用した診断ツール。枕診断AI、お茶診断AI、Face診断AIで、あなたの生活をサポートします。" />
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
              AIを活用した診断ツールで、あなたの生活をサポートします。科学的根拠に基づいた診断で、最適な選択を見つけましょう。
            </p>
          </div>

          {/* 診断AI一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* 枕診断AI */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">枕診断AI</h2>
                <p className="text-gray-600 leading-relaxed">
                  科学的根拠に基づいて、あなたに最適な枕を診断します。睡眠の質向上をサポート。
                </p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  睡眠姿勢の分析
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  個人の体型に合わせた推奨
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  睡眠の質向上アドバイス
                </div>
              </div>
              <a 
                href="https://mm-diagnosis-pillow.vercel.app/pillow" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center block"
              >
                診断を開始する
              </a>
            </div>

            {/* お茶診断AI */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">お茶診断AI</h2>
                <p className="text-gray-600 leading-relaxed">
                  あなたの好みと体調に合わせて、最適なお茶を診断します。日本茶の魅力を再発見。
                </p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  味の好み分析
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  体調に合わせた推奨
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  日本茶の知識と楽しみ方
                </div>
              </div>
              <a 
                href="https://tea-diagnosis.vercel.app/tea/quick-diagnosis" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center block"
              >
                診断を開始する
              </a>
            </div>

            {/* Face診断AI */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Face診断AI</h2>
                <p className="text-gray-600 leading-relaxed">
                  高精度な顔分析で、あなたの美しさを数値化。スキンケアやメイクの参考に。
                </p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  顔の特徴分析
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  美しさの数値化
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  スキンケアアドバイス
                </div>
              </div>
              <a 
                href="https://face-diagnosis-web.vercel.app" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center block"
              >
                診断を開始する
              </a>
            </div>
          </div>

          {/* 枕診断AIシリーズ記事 */}
          {posts.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                枕診断AI関連記事
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/diagnostic-ai/makura/${post.slug}`}
                    className="block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 text-sm mb-2">
                        {post.excerpt}
                      </p>
                    )}
                    {post.date && (
                      <p className="text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString('ja-JP')}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
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