import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const BeautySkincarePage: React.FC = () => {
  const router = useRouter();
  const { target } = router.query;

  return (
    <>
      <Head>
        <title>美容・スキンケアセット - 母の日ギフト | Market Supporter AI</title>
        <meta name="description" content="年齢に合ったスキンケアアイテムや、香りで癒されるバスソルトのセット。特別感のあるご褒美コスメを届けましょう。" />
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
                美容・スキンケアセット
              </h1>

              {/* 価格帯 */}
              <p className="text-lg text-gray-600 mb-6">
                (参考価格帯: ¥4,000~¥12,000)
              </p>

              {/* 説明文 */}
              <div className="text-gray-700 mb-8 leading-relaxed">
                <p className="mb-4">
                  年齢に合ったスキンケアアイテムや、香りで癒されるバスソルトのセット。
                </p>
                <p className="mb-4">
                  <span className="text-pink-600 font-semibold">「自分では買わないけどもらうと嬉しい」</span>
                  そんな特別感のある"ご褒美コスメ"を届けましょう。母の美しさと笑顔を応援するギフトです。
                </p>
              </div>

              {/* AI相談ボタン */}
              <div className="mb-8">
                <Link 
                  href={`/events/birthday/chat?category=美容・スキンケア&target=${target || '実母'}`}
                  className="inline-flex items-center px-8 py-4 bg-pink-600 text-white font-semibold rounded-xl hover:bg-pink-700 transition-colors shadow-lg"
                >
                  <span className="mr-3">🤖</span>
                  AI相談で選ぶ
                </Link>
              </div>

              {/* モールボタン */}
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="https://search.rakuten.co.jp/search/mall/美容+スキンケア+母の日/"
                  className="flex-1 min-w-[120px] px-6 py-3 bg-red-600 text-white text-center rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  楽天
                </Link>
                <Link 
                  href="https://www.amazon.co.jp/s?k=美容+スキンケア+母の日"
                  className="flex-1 min-w-[120px] px-6 py-3 bg-orange-500 text-white text-center rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  Amazon
                </Link>
                <Link 
                  href="https://shopping.yahoo.co.jp/search?p=美容+スキンケア+母の日"
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
                  <span className="text-pink-600">💄</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">年齢に合ったケア</h3>
                  <p className="text-gray-600 text-sm">母の年齢と肌質に合わせたスキンケアアイテムを選べます</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-pink-600">🛁</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">バスタイムの癒し</h3>
                  <p className="text-gray-600 text-sm">香り高いバスソルトでリラックスタイムを演出</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-pink-600">✨</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">特別感</h3>
                  <p className="text-gray-600 text-sm">普段は買わない高級コスメで特別な気分に</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-pink-600">😊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">自信と笑顔</h3>
                  <p className="text-gray-600 text-sm">美しさをサポートして、母の笑顔を引き出します</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeautySkincarePage;
