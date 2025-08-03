// pages/japanese-tea.tsx
import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function JapaneseTea() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="日本茶 - Market Supporter AI"
        description="緑茶・抹茶・お茶文化の紹介と商品比較を行います。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🍵</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">日本茶</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              緑茶・抹茶・お茶文化の紹介と商品比較を行います。
            </p>
          </div>

          {/* Recomend セクション */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="text-purple-600 mr-3">📋</span>
              おすすめ商品
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/articles/japanesetea/recomend/250731matcha-set-recommend-dm" className="group">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    抹茶セットおすすめ
                  </h3>
                  <p className="text-sm text-gray-600">本格抹茶の選び方とおすすめ商品</p>
                  <div className="mt-3 flex items-center text-xs text-purple-600">
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
              <Link href="/articles/japanesetea/recomend/250731kyusu-ranking-dm" className="group">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    急須ランキング
                  </h3>
                  <p className="text-sm text-gray-600">煎茶・玉露・番茶の違いと選び方</p>
                  <div className="mt-3 flex items-center text-xs text-purple-600">
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
              <Link href="/articles/japanesetea/recomend/250731japanesetea-goods-dm" className="group">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    日本茶グッズ
                  </h3>
                  <p className="text-sm text-gray-600">お茶を楽しむための道具とグッズ</p>
                  <div className="mt-3 flex items-center text-xs text-purple-600">
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
              日本茶知識
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/articles/japanesetea/knowledge/250731matcha-history-tools-knowledge" className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    抹茶の歴史と道具
                  </h3>
                  <p className="text-sm text-gray-600">抹茶の歴史と必要な道具について</p>
                  <div className="mt-3 flex items-center text-xs text-green-600">
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
              <Link href="/articles/japanesetea/knowledge/250731kyusu-types-knowledge" className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    急須の種類と選び方
                  </h3>
                  <p className="text-sm text-gray-600">急須の種類とお茶に合う選び方</p>
                  <div className="mt-3 flex items-center text-xs text-green-600">
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
              <Link href="/articles/japanesetea/knowledge/250731japanesetea-lifestyle-knowledge" className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    日本茶ライフスタイル
                  </h3>
                  <p className="text-sm text-gray-600">日本茶を取り入れた生活の楽しみ方</p>
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
