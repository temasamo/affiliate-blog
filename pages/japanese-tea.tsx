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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/articles/2025-07-03-kouhanpatsu-ranking" className="group">
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  日本茶ランキング
                </h3>
                <p className="text-sm text-gray-600">味・香り・価格で厳選</p>
              </div>
            </Link>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                抹茶特集（準備中）
              </h3>
              <p className="text-sm text-gray-600">本格抹茶の選び方とおすすめ商品</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                緑茶比較（準備中）
              </h3>
              <p className="text-sm text-gray-600">煎茶・玉露・番茶の違いと選び方</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
