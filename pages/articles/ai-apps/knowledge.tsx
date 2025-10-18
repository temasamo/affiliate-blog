// pages/articles/ai-apps/knowledge.tsx
import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function AiAppsKnowledge() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="AI活用術 - Market Supporter AI"
        description="AI活用術の記事一覧ページです。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">🚧</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                工事中
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                AI活用術の記事を準備中です。<br />
                もうしばらくお待ちください。
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                準備中のコンテンツ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  <span>プロンプトエンジニアリング</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  <span>業務効率化・自動化</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  <span>AI活用事例・トレンド</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  <span>AIツール比較・選び方</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/ai-apps" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                AIアプリ情報トップに戻る
              </Link>
              <Link 
                href="/articles/ai-apps/recommend" 
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                おすすめAIアプリを見る
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
