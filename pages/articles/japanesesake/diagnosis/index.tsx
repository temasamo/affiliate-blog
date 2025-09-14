// pages/articles/japanesesake/diagnosis/index.tsx
import React from 'react';
import Link from 'next/link';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

export default function JapaneseSakeDiagnosisConstruction() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="日本酒コンシェルジュAI - 工事中 | Market Supporter AI"
        description="日本酒コンシェルジュAIは現在開発中です。近日公開予定です。"
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-md p-8 sm:p-12 text-center">
          {/* 工事中アイコン */}
          <div className="mb-8">
            <div className="text-8xl mb-4">🚧</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              日本酒コンシェルジュAI
            </h1>
            <div className="inline-block bg-orange-100 text-orange-800 text-sm font-medium px-4 py-2 rounded-full mb-6">
              工事中
            </div>
          </div>

          {/* 説明文 */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg text-gray-600 mb-4">
              あなたの好みやシーンに合わせて、最適な日本酒を提案する
              <strong className="text-gray-900">コンシェルジュAI</strong>を開発中です。
            </p>
            <p className="text-gray-600">
              初心者から上級者まで、誰でも簡単に使える診断システムを準備しています。
              公開まで今しばらくお待ちください。
            </p>
          </div>

          {/* 予定機能 */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">予定機能</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🍶</div>
                <div>
                  <h3 className="font-medium text-gray-900">好み診断</h3>
                  <p className="text-sm text-gray-600">簡単な質問であなたの好みを分析</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="font-medium text-gray-900">シーン別提案</h3>
                  <p className="text-sm text-gray-600">食事・贈り物・記念日などに最適化</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-medium text-gray-900">詳細分析</h3>
                  <p className="text-sm text-gray-600">味わい・香り・コストパフォーマンス</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🛒</div>
                <div>
                  <h3 className="font-medium text-gray-900">購入リンク</h3>
                  <p className="text-sm text-gray-600">おすすめ商品の購入先を案内</p>
                </div>
              </div>
            </div>
          </div>

          {/* 代替リンク */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">今すぐ日本酒について学ぶ</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles/japanesesake/brands"
                className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors"
              >
                <span className="mr-2">🍶</span>
                銘柄紹介を見る
              </Link>
              <Link
                href="/articles/japanesesake/knowledge"
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors"
              >
                <span className="mr-2">📚</span>
                日本酒知識を学ぶ
              </Link>
            </div>
          </div>

          {/* 戻るリンク */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/japanese-sake"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              日本酒カテゴリーページに戻る
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
