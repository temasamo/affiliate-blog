import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const TeaSetPage: React.FC = () => {
  const router = useRouter();
  const { target } = router.query;

  return (
    <>
      <Head>
        <title>高級お茶セット - 母の日ギフト | Market Supporter AI</title>
        <meta name="description" content="母の癒しの時間を彩る、厳選されたお茶の詰め合わせ。日本茶・紅茶・ハーブティーなど、好みに合わせて選べるのが魅力。" />
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
                高級お茶セット
              </h1>

              {/* 価格帯 */}
              <p className="text-lg text-gray-600 mb-6">
                (参考価格帯: ¥3,000~¥8,000)
              </p>

              {/* 説明文 */}
              <div className="text-gray-700 mb-8 leading-relaxed">
                <p className="mb-4">
                  母の癒しの時間を彩る、厳選されたお茶の詰め合わせ。日本茶・紅茶・ハーブティーなど、好みに合わせて選べるのが魅力。
                </p>
                <p className="mb-4">
                  <span className="text-pink-600 font-semibold">朝の一杯でリフレッシュ、夜の一杯でほっと一息。</span>
                  母の毎日に寄り添う贈り物です。
                </p>
              </div>

              {/* AI相談ボタン */}
              <div className="mb-8">
                <Link 
                  href={`/events/birthday/chat?category=高級お茶セット&target=${target || '実母'}`}
                  className="inline-flex items-center px-8 py-4 bg-pink-600 text-white font-semibold rounded-xl hover:bg-pink-700 transition-colors shadow-lg"
                >
                  <span className="mr-3">🤖</span>
                  AI相談で選ぶ
                </Link>
              </div>

              {/* モールボタン */}
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="https://search.rakuten.co.jp/search/mall/高級お茶セット+母の日/"
                  className="flex-1 min-w-[120px] px-6 py-3 bg-red-600 text-white text-center rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  楽天
                </Link>
                <Link 
                  href="https://www.amazon.co.jp/s?k=高級お茶セット+母の日"
                  className="flex-1 min-w-[120px] px-6 py-3 bg-orange-500 text-white text-center rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  Amazon
                </Link>
                <Link 
                  href="https://shopping.yahoo.co.jp/search?p=高級お茶セット+母の日"
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
                  <span className="text-pink-600">🍵</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">多様な種類</h3>
                  <p className="text-gray-600 text-sm">日本茶、紅茶、ハーブティーなど、母の好みに合わせて選べます</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-pink-600">⏰</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">毎日の癒し</h3>
                  <p className="text-gray-600 text-sm">朝のリフレッシュタイムや夜のリラックスタイムに最適</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-pink-600">🎁</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">ギフト感</h3>
                  <p className="text-gray-600 text-sm">美しいパッケージで特別感のある贈り物になります</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-pink-600">💝</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">長く楽しめる</h3>
                  <p className="text-gray-600 text-sm">保存がきくので、ゆっくりと味わって楽しめます</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeaSetPage;
