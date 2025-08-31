import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="お問い合わせ - Market Supporter AI"
        description="Market Supporter AIへのお問い合わせはこちらからお願いいたします。"
      />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* 見出し */}
        <h1 className="text-3xl font-bold mb-4 text-gray-900">お問い合わせ</h1>
        <p className="mb-8 text-gray-700 leading-relaxed">
          当サイトへのご質問やご意見は、以下のフォームからお送りください。
          2〜3営業日以内にご返信いたします。
        </p>

        {/* Googleフォーム埋め込み */}
        <div className="bg-white shadow-md rounded-xl border border-gray-200 p-4">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfLnl3bQiRwe8ibxrAfnuFUEUsi4DW-VRp7HsiFQoMsMbnc5A/viewform?embedded=true"
            width={800}
            height={800}
            frameBorder="0"
            className="w-full"
          >
            読み込んでいます…
          </iframe>
        </div>

        {/* 運営者情報リンク */}
        <div className="text-center mt-8">
          <Link
            href="/about"
            className="text-blue-600 hover:underline font-medium transition-colors"
          >
            運営者情報はこちら
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
} 