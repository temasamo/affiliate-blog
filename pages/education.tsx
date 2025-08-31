import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Education() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="教育 - Market Supporter AI"
        description="教育・習い事に関する情報を紹介します。"
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="text-center">
            <div className="text-6xl mb-6">🚧</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">準備中</h1>
            <p className="text-lg text-gray-600 mb-8">
              教育ページは現在準備中です。<br />
              もうしばらくお待ちください。
            </p>
            <div className="bg-purple-50 rounded-xl p-6 max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">今後の予定</h2>
              <p className="text-sm text-gray-600">
                教育・習い事に関する情報を<br />
                詳しく紹介する予定です。
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 