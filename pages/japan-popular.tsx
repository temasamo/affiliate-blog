// pages/japan-popular.tsx
import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function JapanPopular() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="日本人気商品 - Market Supporter AI"
        description="国内で注目のアイテムや人気商品を紹介します。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🇯🇵</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">日本人気商品</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              国内で注目のアイテムや人気商品を紹介します。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ドラッグストア人気商品（準備中）
              </h3>
              <p className="text-sm text-gray-600">薬局・ドラッグストアで売れている商品</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                100均人気商品（準備中）
              </h3>
              <p className="text-sm text-gray-600">ダイソー・セリア・キャンドゥの人気アイテム</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                コンビニ限定商品（準備中）
              </h3>
              <p className="text-sm text-gray-600">コンビニでしか買えない限定商品</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
