import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function UnderConstruction() {
  return (
    <>
      <Head>
        <title>工事中 - Market Supporter AI</title>
        <meta name="description" content="このページは現在準備中です。" />
      </Head>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">工事中</h1>
            <p className="text-lg text-gray-600 mb-8">
              このページは現在準備中です。<br />
              もうしばらくお待ちください。
            </p>
            <Link 
              href="/events"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              イベント一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
