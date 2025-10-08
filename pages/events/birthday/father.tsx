import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function FatherBirthdayGiftsPage() {
  return (
    <>
      <Header 
        title="実父への誕生日プレゼント10選 - Market Supporter AI" 
        description="実父への誕生日プレゼント選び。健康・趣味・実用品など、父への感謝を込めたギフト選びをサポートします。"
      />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* パンくずリスト */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link href="/events" className="hover:text-blue-600">イベント</Link></li>
              <li>/</li>
              <li><Link href="/events/birthday" className="hover:text-blue-600">誕生日プレゼント</Link></li>
              <li>/</li>
              <li className="text-gray-900">実父へのプレゼント</li>
            </ol>
          </nav>

          {/* ヒーローセクション */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              実父への誕生日プレゼント10選
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              健康・趣味・実用品など、父への感謝を込めたギフト選び。<br />
              いつも家族を支えてくれる父に、心を込めたプレゼントを選びましょう。
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">💝 実父へのプレゼント選びのポイント</h2>
              <ul className="text-blue-800 text-left space-y-1">
                <li>• 父の趣味や興味を考慮したギフト</li>
                <li>• 健康管理をサポートする実用的なアイテム</li>
                <li>• お酒・グルメ系の贅沢なアイテム</li>
                <li>• 家族との思い出を形にしたギフト</li>
              </ul>
            </div>
          </div>

          {/* ギフト一覧 */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {/* ギフト1: 高級お酒セット */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">高級お酒セット</h3>
              <p className="text-gray-600 mb-4">
                日本酒・ワイン・ウイスキーなど、父の好みに合わせた厳選されたお酒の詰め合わせ。
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">¥5,000〜¥15,000</span>
                <Link 
                  href="https://www.rakuten.co.jp/" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  楽天で探す
                </Link>
              </div>
            </div>

            {/* ギフト2: 健康グッズ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">健康管理グッズ</h3>
              <p className="text-gray-600 mb-4">
                血圧計・体重計・歩数計・マッサージ器など、父の健康管理をサポートする実用的なアイテム。
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">¥3,000〜¥10,000</span>
                <Link 
                  href="https://www.rakuten.co.jp/" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  楽天で探す
                </Link>
              </div>
            </div>

            {/* ギフト3: 趣味関連グッズ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">趣味関連グッズ</h3>
              <p className="text-gray-600 mb-4">
                ゴルフ・釣り・読書・園芸など、父の趣味に合わせた専門的なアイテム。
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">¥2,000〜¥8,000</span>
                <Link 
                  href="https://www.rakuten.co.jp/" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  楽天で探す
                </Link>
              </div>
            </div>

            {/* ギフト4: 高級グルメギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">高級グルメギフト</h3>
              <p className="text-gray-600 mb-4">
                和牛・海産物・おつまみ・お菓子など、父の好みに合わせた贅沢なグルメの詰め合わせ。
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">¥3,000〜¥12,000</span>
                <Link 
                  href="https://www.rakuten.co.jp/" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  楽天で探す
                </Link>
              </div>
            </div>

            {/* ギフト5: 名入れグッズ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">名入れグッズ</h3>
              <p className="text-gray-600 mb-4">
                名入れのマグカップ・ペン・キーホルダーなど、父だけの特別なアイテム。
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">¥2,000〜¥6,000</span>
                <Link 
                  href="https://www.rakuten.co.jp/" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  楽天で探す
                </Link>
              </div>
            </div>

            {/* ギフト6: 体験ギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">体験ギフト</h3>
              <p className="text-gray-600 mb-4">
                温泉旅行・ゴルフ・釣り・料理教室など、父がリフレッシュできる体験型ギフト。
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">¥5,000〜¥25,000</span>
                <Link 
                  href="https://www.rakuten.co.jp/" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  楽天で探す
                </Link>
              </div>
            </div>
          </div>

          {/* 趣味別おすすめ */}
          <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🎯 趣味別おすすめギフト</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⛳</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">ゴルフ</h3>
                <p className="text-gray-600 text-sm">ゴルフボール・グローブ・タオル・アクセサリーなど</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎣</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">釣り</h3>
                <p className="text-gray-600 text-sm">釣り竿・リール・ルアー・釣り具セットなど</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">読書</h3>
                <p className="text-gray-600 text-sm">本・電子書籍・読書灯・ブックスタンドなど</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">園芸</h3>
                <p className="text-gray-600 text-sm">植物・種・園芸道具・プランターなど</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍺</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">お酒</h3>
                <p className="text-gray-600 text-sm">日本酒・ワイン・ウイスキー・ビールなど</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">DIY・工具</h3>
                <p className="text-gray-600 text-sm">工具・DIY用品・工作キット・測定器具など</p>
              </div>
            </div>
          </div>

          {/* 予算別ガイド */}
          <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">💰 予算別ギフトガイド</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-yellow-600">¥3,000</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">手軽なギフト</h3>
                <p className="text-gray-600 text-sm">お菓子・おつまみ・小物・名入れグッズなど</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-orange-600">¥5,000</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">定番ギフト</h3>
                <p className="text-gray-600 text-sm">お酒・グルメ・健康グッズ・趣味用品など</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-red-600">¥10,000</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">特別なギフト</h3>
                <p className="text-gray-600 text-sm">高級食材・体験ギフト・高級お酒・健康機器など</p>
              </div>
            </div>
          </div>

          {/* 関連ページ */}
          <div className="bg-gray-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔗 関連ページ</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link 
                href="/events/birthday/mother" 
                className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">実母へのプレゼント</h3>
                <p className="text-gray-600 text-sm">美容・癒し・食・花・思い出系など、母への感謝を込めたギフト選び</p>
              </Link>

              <Link 
                href="/events/birthday/father-in-law" 
                className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">義父へのプレゼント</h3>
                <p className="text-gray-600 text-sm">堅すぎず気が利いた、義理の父へのギフト選び</p>
              </Link>

              <Link 
                href="/events/birthday/health-gifts" 
                className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">健康を気遣うギフト</h3>
                <p className="text-gray-600 text-sm">両親の健康を願う、実用的で喜ばれるギフトを厳選</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
