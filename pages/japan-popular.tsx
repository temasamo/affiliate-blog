// pages/japan-popular.tsx
import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function JapanPopular() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="人気の日本商品 - Market Supporter AI"
        description="外国人に人気の日本商品を紹介します。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🇯🇵</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">人気の日本商品</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              外国人に人気の日本商品を紹介します。
            </p>
          </div>

          {/* Recomend セクション */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-red-600 mr-3">📋</span>
              おすすめ商品
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/articles/japaneseproducts-pupular with foreigners/recomend/250731popular-japanese-foods-2025-dm" className="group">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    人気の日本食品2025
                  </h3>
                  <p className="text-sm text-gray-600">外国人に人気の日本食品ランキング</p>
                  <div className="mt-3 flex items-center text-xs text-red-600">
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
              <Link href="/articles/japaneseproducts-pupular with foreigners/recomend/250801viral-matcha-sweets-dm" className="group">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    バズる抹茶スイーツ
                  </h3>
                  <p className="text-sm text-gray-600">SNSで話題の抹茶スイーツ特集</p>
                  <div className="mt-3 flex items-center text-xs text-red-600">
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
              日本商品知識
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/articles/japaneseproducts-pupular with foreigners/knowledge/250731popular-japanese-foods-2025-education" className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    日本食品の魅力
                  </h3>
                  <p className="text-sm text-gray-600">外国人に人気の日本食品の特徴</p>
                  <div className="mt-3 flex items-center text-xs text-green-600">
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
              <Link href="/articles/japaneseproducts-pupular with foreigners/knowledge/250801viral-matcha-sweets-education" className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    抹茶スイーツの世界
                  </h3>
                  <p className="text-sm text-gray-600">抹茶スイーツの歴史と種類</p>
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
