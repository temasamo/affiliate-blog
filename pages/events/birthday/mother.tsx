import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function MotherBirthdayGiftsPage() {
  return (
    <>
      <Header 
        title="実母への誕生日プレゼント10選 - Market Supporter AI" 
        description="実母への誕生日プレゼント選び。美容・癒し・食・花・思い出系など、母への感謝を込めたギフト選びをサポートします。"
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
              <li className="text-gray-900">実母へのプレゼント</li>
            </ol>
          </nav>

          {/* 共感型導入文 */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 mb-12 border border-pink-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                「何を贈れば喜んでくれるだろう？」
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                母の誕生日は、感謝の気持ちを伝える絶好の機会。でも、毎年何を贈れば良いか迷ってしまう方も多いはず。<br />
                この記事では、<span className="font-semibold text-pink-600">美容・癒し・健康・思い出系</span>など、母の笑顔を引き出すプレゼントを厳選して紹介します。
              </p>
            </div>
          </div>

          {/* ヒーローセクション */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              実母への誕生日プレゼント10選
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              美容・癒し・食・花・思い出系など、母への感謝を込めたギフト選び。<br />
              いつもお疲れ様の母に、心を込めたプレゼントを選びましょう。
            </p>
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-pink-900 mb-2">💝 実母へのプレゼント選びのポイント</h2>
              <ul className="text-pink-800 text-left space-y-1">
                <li>• 母の趣味や好みを考慮したギフト</li>
                <li>• 健康を気遣う実用的なアイテム</li>
                <li>• 美容・癒し系のアイテム</li>
                <li>• 家族の思い出を形にしたギフト</li>
              </ul>
            </div>
          </div>

          {/* AI相談セクション */}
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-8 mb-12 border border-pink-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🤖 AI相談でぴったりのギフトを見つけよう
              </h2>
              <p className="text-gray-700 mb-6">
                お母さまの好みや生活スタイルをAIが聞き出して、<br />
                あなただけの特別なギフトを提案します。
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <Link 
                  href="/events/birthday/chat?category=高級お茶セット&target=実母"
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-pink-200"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">🍵</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">高級お茶セット</h3>
                    <p className="text-xs text-gray-600">AI相談で選ぶ</p>
                  </div>
                </Link>
                
                <Link 
                  href="/events/birthday/chat?category=美容・スキンケア&target=実母"
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-pink-200"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">💄</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">美容・スキンケア</h3>
                    <p className="text-xs text-gray-600">AI相談で選ぶ</p>
                  </div>
                </Link>
                
                <Link 
                  href="/events/birthday/chat?category=健康グッズ&target=実母"
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-pink-200"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">💊</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">健康グッズ</h3>
                    <p className="text-xs text-gray-600">AI相談で選ぶ</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* ギフト一覧 */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {/* ギフト1: 高級お茶セット */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">高級お茶セット</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥8,000）</p>
              <p className="text-gray-600 mb-4">
                母の癒しの時間を彩る、厳選されたお茶の詰め合わせ。日本茶・紅茶・ハーブティーなど、好みに合わせて選べるのが魅力。<br />
                <span className="font-semibold text-pink-600">朝の一杯でリフレッシュ、夜の一杯でほっと一息。</span>母の毎日に寄り添う贈り物です。
              </p>
              <Link 
                href="/events/birthday/chat?category=高級お茶セット&target=実母"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="https://www.rakuten.co.jp/" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="https://www.amazon.co.jp/" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="https://shopping.yahoo.co.jp/" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト2: 美容・スキンケアセット */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">美容・スキンケアセット</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥4,000〜¥12,000）</p>
              <p className="text-gray-600 mb-4">
                年齢に合ったスキンケアアイテムや、香りで癒されるバスソルトのセット。<br />
                <span className="font-semibold text-pink-600">「自分では買わないけどもらうと嬉しい」</span>そんな特別感のある"ご褒美コスメ"を届けましょう。母の美しさと笑顔を応援するギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=美容・スキンケア&target=実母"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="https://www.rakuten.co.jp/" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="https://www.amazon.co.jp/" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="https://shopping.yahoo.co.jp/" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト3: 花のギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">季節の花ギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥2,000〜¥6,000）</p>
              <p className="text-gray-600 mb-4">
                季節の花や観葉植物は、部屋を明るくし、心をなごませてくれる定番ギフト。<br />
                普段言えない<span className="font-semibold text-pink-600">「ありがとう」を花に込めて</span>届けてみませんか？生花はもちろん、長く楽しめる鉢植えやドライフラワーも人気。
              </p>
              <Link 
                href="/events/birthday/chat?category=季節の花ギフト&target=実母"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="https://www.rakuten.co.jp/" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="https://www.amazon.co.jp/" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="https://shopping.yahoo.co.jp/" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト4: 健康グッズ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">健康グッズ</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥15,000）</p>
              <p className="text-gray-600 mb-4">
                血圧計や体温計、マッサージ器など、母の健康をサポートする実用的なアイテム。<br />
                <span className="font-semibold text-pink-600">「ずっと元気でいてほしい」</span>という想いが伝わる、思いやりのこもったギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=健康グッズ&target=実母"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="https://www.rakuten.co.jp/" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="https://www.amazon.co.jp/" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="https://shopping.yahoo.co.jp/" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト5: グルメギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">高級グルメギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥10,000）</p>
              <p className="text-gray-600 mb-4">
                和菓子・洋菓子・海鮮・お肉など、母の好みに合わせて贅沢な味をセレクト。<br />
                <span className="font-semibold text-pink-600">「美味しい！」と笑顔がこぼれる</span>、食卓が華やぐギフトです。普段は買わないちょっといいものを選ぶのがポイント。
              </p>
              <Link 
                href="/events/birthday/chat?category=グルメギフト&target=実母"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="https://www.rakuten.co.jp/" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="https://www.amazon.co.jp/" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="https://shopping.yahoo.co.jp/" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
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
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥20,000）</p>
              <p className="text-gray-600 mb-4">
                温泉旅行、料理教室、陶芸、エステなど、思い出に残る"非日常"の贈り物。<br />
                ひとりでも友人とでも楽しめて、感謝の気持ちが形になります。<span className="font-semibold text-pink-600">「今度これ行ってみるね」</span>と会話も弾むきっかけに。
              </p>
              <Link 
                href="/events/birthday/chat?category=体験ギフト&target=実母"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="https://www.rakuten.co.jp/" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="https://www.amazon.co.jp/" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="https://shopping.yahoo.co.jp/" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト7: 名入れ・メッセージ入りギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">名入れ・メッセージ入りギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥10,000）</p>
              <p className="text-gray-600 mb-4">
                名前入りの湯呑みや、感謝のメッセージが刻まれたタオル・ポーチなど。<br />
                <span className="font-semibold text-pink-600">世界に一つだけの特別なプレゼント</span>は、どんな高価な品より心に残ります。
              </p>
              <Link 
                href="/events/birthday/chat?category=名入れ・メッセージ入りギフト&target=実母"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="https://www.rakuten.co.jp/" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="https://www.amazon.co.jp/" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="https://shopping.yahoo.co.jp/" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト8: フォトアルバム・家族の思い出ギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">フォトアルバム・家族の思い出ギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥2,000〜¥8,000）</p>
              <p className="text-gray-600 mb-4">
                家族の写真を集めたアルバムや、子ども・孫の成長記録をまとめたフォトブック。<br />
                <span className="font-semibold text-pink-600">「宝物にするね」</span>と言ってもらえる、心があたたまる贈り物です。
              </p>
              <Link 
                href="/events/birthday/chat?category=フォトアルバム・家族の思い出ギフト&target=実母"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="https://www.rakuten.co.jp/" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="https://www.amazon.co.jp/" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="https://shopping.yahoo.co.jp/" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト9: おうち時間を楽しむアイテム */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">おうち時間を楽しむアイテム</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥2,000〜¥6,000）</p>
              <p className="text-gray-600 mb-4">
                読書灯、ルームシューズ、ブランケットなど、家で過ごす時間を快適にするグッズ。<br />
                母の<span className="font-semibold text-pink-600">「小さな幸せ時間」</span>をサポートする、実用的かつ心地よいギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=おうち時間を楽しむアイテム&target=実母"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="https://www.rakuten.co.jp/" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="https://www.amazon.co.jp/" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="https://shopping.yahoo.co.jp/" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト10: 季節限定・ご当地ギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">季節限定・ご当地ギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥10,000）</p>
              <p className="text-gray-600 mb-4">
                春の新茶、夏のゼリー、秋の栗スイーツ、冬のお鍋セットなど、季節感のある贈り物は特別感がUP。<br />
                <span className="font-semibold text-pink-600">「こんなのあるんだ！」</span>と驚きと喜びが一緒に届きます。
              </p>
              <Link 
                href="/events/birthday/chat?category=季節限定・ご当地ギフト&target=実母"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="https://www.rakuten.co.jp/" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="https://www.amazon.co.jp/" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="https://shopping.yahoo.co.jp/" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>
          </div>

          {/* 季節別おすすめ */}
          <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🌸 季節別おすすめギフト</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌸</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600">春</h3>
                <p className="text-gray-600 text-sm">桜モチーフの和菓子、春の花、新茶など</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">☀️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600">夏</h3>
                <p className="text-gray-600 text-sm">冷感グッズ、夏の果物、涼やかなお茶など</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍂</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600">秋</h3>
                <p className="text-gray-600 text-sm">栗・芋スイーツ、秋の味覚、温かいお茶など</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">❄️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600">冬</h3>
                <p className="text-gray-600 text-sm">あったかグッズ、お鍋セット、高級食材など</p>
              </Link>
            </div>
          </div>

          {/* 関連ページ */}
          <div className="bg-gray-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔗 関連ページ</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link 
                href="/events/birthday/father" 
                className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">実父へのプレゼント</h3>
                <p className="text-gray-600 text-sm">健康・趣味・実用品など、父への感謝を込めたギフト選び</p>
              </Link>

              <Link 
                href="/events/birthday/mother-in-law" 
                className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">義母へのプレゼント</h3>
                <p className="text-gray-600 text-sm">センス良い×無難な観点で選ぶ、義理の母へのギフト選び</p>
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
