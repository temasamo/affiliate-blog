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
        description="海外で話題の商品を日本で購入できるように紹介します。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🌍</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">海外トレンド</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              海外で話題の商品を日本で購入できるように紹介します。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                アメリカ発トレンド（準備中）
              </h3>
              <p className="text-sm text-gray-600">アメリカで話題の商品を日本で購入</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ヨーロッパ発トレンド（準備中）
              </h3>
              <p className="text-sm text-gray-600">ヨーロッパで人気の商品を紹介</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                アジア発トレンド（準備中）
              </h3>
              <p className="text-sm text-gray-600">韓国・台湾などアジアのトレンド商品</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
