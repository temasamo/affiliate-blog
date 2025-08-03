// pages/sleep-health.tsx
import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SleepHealth() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="睡眠・健康 - Market Supporter AI"
        description="枕・マットレス・快眠グッズなど、睡眠の質を高める情報や商品を紹介します。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">😴</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">睡眠・健康</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              枕・マットレス・快眠グッズなど、睡眠の質を高める情報や商品を紹介します。
            </p>
          </div>

          {/* Recomend セクション */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-blue-600 mr-3">📋</span>
              おすすめ商品
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/articles/sleep-health/recomend/2025-07-07-makura-series-summary" className="group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    枕シリーズ総まとめ
                  </h3>
                  <p className="text-sm text-gray-600">枕選びの決定版！全ランキングを一覧で</p>
                  <div className="mt-3 flex items-center text-xs text-blue-600">
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
              <Link href="/articles/sleep-health/recomend/2025-07-06-hotel-makura-ranking" className="group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    ホテル枕ランキング
                  </h3>
                  <p className="text-sm text-gray-600">高級ホテルで使われる枕を徹底比較</p>
                  <div className="mt-3 flex items-center text-xs text-blue-600">
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
              <Link href="/articles/sleep-health/recomend/2025-07-05-sobagara-makura-ranking" className="group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    そば殻枕ランキング
                  </h3>
                  <p className="text-sm text-gray-600">自然素材のそば殻枕を徹底検証</p>
                  <div className="mt-3 flex items-center text-xs text-blue-600">
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
              <Link href="/articles/sleep-health/recomend/2025-07-04-umou-makura-ranking" className="group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    羽毛枕ランキング
                  </h3>
                  <p className="text-sm text-gray-600">軽やかで快適な羽毛枕を比較</p>
                  <div className="mt-3 flex items-center text-xs text-blue-600">
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
              <Link href="/articles/sleep-health/recomend/2025-07-01-makura-ranking" className="group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    枕総合ランキング
                  </h3>
                  <p className="text-sm text-gray-600">価格・機能・口コミの3軸で徹底比較</p>
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
              睡眠知識
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/articles/sleep-health/knowledge/sleep-quality-guide" className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    睡眠の質を向上させる方法
                  </h3>
                  <p className="text-sm text-gray-600">科学的根拠に基づく快眠テクニック</p>
                  <div className="mt-3 flex items-center text-xs text-green-600">
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
              <Link href="/articles/sleep-health/knowledge/pillow-selection-guide" className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    枕選びの完全ガイド
                  </h3>
                  <p className="text-sm text-gray-600">体型・寝方別の最適な枕選び</p>
                  <div className="mt-3 flex items-center text-xs text-green-600">
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
              <Link href="/articles/sleep-health/knowledge/mattress-comparison" className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    マットレスの種類と特徴
                  </h3>
                  <p className="text-sm text-gray-600">素材・硬さ・価格帯の比較</p>
                  <div className="mt-3 flex items-center text-xs text-green-600">
                    <span>詳細を見る</span>
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
