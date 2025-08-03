// pages/overseas-trend.tsx
import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function OverseasTrend() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="海外トレンド - Market Supporter AI"
        description="海外で話題の商品やトレンド情報を紹介します。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🌍</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">海外トレンド</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              海外で話題の商品やトレンド情報を紹介します。
            </p>
          </div>

          {/* Recomend セクション */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-blue-600 mr-3">📋</span>
              おすすめ商品
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/articles/popularproducts-overseas/recomend/2025-07-20-smart-water-bottle" className="group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    TikTokで話題のスマート水ボトル
                  </h3>
                  <p className="text-sm text-gray-600">海外で人気爆発中のスマート水ボトル</p>
                  <div className="mt-3 flex items-center text-xs text-blue-600">
                    <span>詳細を見る</span>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-green-600 mr-3">📚</span>
              海外トレンド知識
            </h2>
            <div className="bg-green-50 rounded-xl p-6">
              <p className="text-sm text-gray-600">
                海外トレンドに関する知識記事は現在準備中です。<br />
                もうしばらくお待ちください。
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
