import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const HealthGoodsPage: React.FC = () => {
  const router = useRouter();
  const { target } = router.query;

  return (
    <>
      <Head>
        <title>健康グッズ - 母の日ギフト | Market Supporter AI</title>
        <meta name="description" content="母の健康をサポートするグッズ。マッサージ器、健康食品、快眠グッズなど、毎日の健康管理を応援するギフトです。" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link href="/events/birthday/mother" className="text-blue-600 hover:text-blue-800">
              ← 母の日ギフト一覧に戻る
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* メインカード */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            {/* 画像エリア */}
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-lg">画像</span>
            </div>

            <div className="p-8">
              {/* タイトル */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                健康グッズ
              </h1>

              {/* 価格帯 */}
              <p className="text-lg text-gray-600 mb-6">
                (参考価格帯: ¥3,000~¥15,000)
              </p>

              {/* 説明文 */}
              <div className="text-gray-700 mb-8 leading-relaxed">
                <p className="mb-4">
                  母の健康をサポートするグッズ。マッサージ器、健康食品、快眠グッズなど、毎日の健康管理を応援するギフトです。
                </p>
                <p className="mb-4">
                  <span className="text-pink-600 font-semibold">「いつまでも元気でいてほしい」</span>
                  という想いを込めて、母の健康をサポートする実用的なギフトを選びましょう。
                </p>
              </div>

              {/* AI相談ボタン */}
              <div className="mb-8">
                <Link 
                  href={`/events/birthday/chat?category=健康グッズ&target=${target || '実母'}`}
                  className="inline-flex items-center px-8 py-4 bg-pink-600 text-white font-semibold rounded-xl hover:bg-pink-700 transition-colors shadow-lg"
                >
                  <span className="mr-3">🤖</span>
                  AI相談で選ぶ
                </Link>
              </div>

              {/* モールボタン */}
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="https://search.rakuten.co.jp/search/mall/健康グッズ+母の日/"
                  className="flex-1 min-w-[120px] px-6 py-3 bg-red-600 text-white text-center rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  楽天
                </Link>
                <Link 
                  href="https://www.amazon.co.jp/s?k=健康グッズ+母の日"
                  className="flex-1 min-w-[120px] px-6 py-3 bg-orange-500 text-white text-center rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  Amazon
                </Link>
                <Link 
                  href="https://shopping.yahoo.co.jp/search?p=健康グッズ+母の日"
                  className="flex-1 min-w-[120px] px-6 py-3 bg-red-500 text-white text-center rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Yahoo
                </Link>
              </div>
            </div>
          </div>

          {/* おすすめポイント */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">おすすめポイント</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-pink-600">💊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">健康サポート</h3>
                  <p className="text-gray-600 text-sm">毎日の健康管理をサポートする実用的なグッズ</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-pink-600">🛁</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">リラックス効果</h3>
                  <p className="text-gray-600 text-sm">マッサージ器や快眠グッズでリラックスタイムを</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-pink-600">❤️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">愛情表現</h3>
                  <p className="text-gray-600 text-sm">「いつまでも元気でいてほしい」という想いを込めて</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-pink-600">📅</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">毎日使える</h3>
                  <p className="text-gray-600 text-sm">日常的に使える実用的なギフトで長く愛用</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthGoodsPage;




