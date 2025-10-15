import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function FatherInLawBirthdayGiftsPage() {
  return (
    <>
      <Header 
        title="義父への誕生日プレゼント10選 - Market Supporter AI" 
        description="義父への誕生日プレゼント選び。印象重視×無難な観点で選ぶ、義理の父へのギフト選びをサポートします。"
      />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* パンくずリスト */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link href="/events" className="hover:text-green-600">イベント</Link></li>
              <li>/</li>
              <li><Link href="/events/birthday" className="hover:text-green-600">誕生日プレゼント</Link></li>
              <li>/</li>
              <li className="text-gray-900">義父へのプレゼント</li>
            </ol>
          </nav>

          {/* 共感型導入文 */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-12 border border-green-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                「何を贈れば喜んでくれるだろう？」
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                義父の誕生日は、感謝の気持ちを伝える絶好の機会。でも、毎年何を贈れば良いか迷ってしまう方も多いはず。<br />
                この記事では、<span className="font-semibold text-green-600">印象重視・無難・上質</span>など、義父の笑顔を引き出すプレゼントを厳選して紹介します。
              </p>
            </div>
          </div>

          {/* ヒーローセクション */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              義父への誕生日プレゼント10選
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              印象重視・無難・上質など、義父への感謝を込めたギフト選び。<br />
              いつもお疲れ様の義父に、心を込めたプレゼントを選びましょう。
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-green-900 mb-2">💝 義父へのプレゼント選びのポイント</h2>
              <ul className="text-green-800 text-left space-y-1">
                <li>• 印象が良く、上品なギフト</li>
                <li>• 無難で万人受けするアイテム</li>
                <li>• 高級感のある上質なアイテム</li>
                <li>• 礼儀と気遣いが伝わるギフト</li>
              </ul>
            </div>
          </div>

          {/* AI相談セクション - 一時的に非表示 */}
          {/* 
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 mb-12 border border-green-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🤖 AI相談でぴったりのギフトを見つけよう
              </h2>
              <p className="text-gray-700 mb-6">
                義父さまの好みや生活スタイルをAIが聞き出して、<br />
                あなただけの特別なギフトを提案します。
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <Link 
                  href="/events/birthday/chat?category=高級グルメギフト&target=義父"
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-green-200"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">🍽️</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">高級グルメギフト</h3>
                    <p className="text-xs text-gray-600">AI相談で選ぶ</p>
                  </div>
                </Link>
                
                <Link 
                  href="/events/birthday/chat?category=お酒（見た目重視）&target=義父"
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-green-200"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">🍶</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">お酒（見た目重視）</h3>
                    <p className="text-xs text-gray-600">AI相談で選ぶ</p>
                  </div>
                </Link>
                
                <Link 
                  href="/events/birthday/chat?category=ブランド小物&target=義父"
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-green-200"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">💼</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">ブランド小物</h3>
                    <p className="text-xs text-gray-600">AI相談で選ぶ</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          */}

          {/* ギフト一覧 */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {/* ギフト1: 高級グルメギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-64 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2F29hijiri%2Fb6r350g%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2F29hijiri%2Fi%2F10000006%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/29hijiri/cabinet/700top/1bn236.jpg?_ex=200x200" alt="高級グルメギフト" style={{ border: 'medium', width: '200px', height: '200px', objectFit: 'cover' }} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{ border: '0px' }} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">高級グルメギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥8,000〜¥25,000）</p>
              <p className="text-gray-600 mb-4">
                黒毛和牛、鰻蒲焼、高級和菓子など、印象が良く上品なグルメギフト。<br />
                <span className="font-semibold text-green-600">「美味しい！」と笑顔がこぼれる</span>、食卓が華やぐギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=高級グルメギフト&target=義父"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=高級グルメギフト" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=高級グルメギフト" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=高級グルメギフト" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト2: お酒（見た目重視） */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">お酒（見た目重視）</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥6,000〜¥20,000）</p>
              <p className="text-gray-600 mb-4">
                木箱入りウイスキー、地酒飲み比べなど、見た目も美しいお酒のギフト。<br />
                <span className="font-semibold text-green-600">「美味しい！」と笑顔がこぼれる</span>、晩酌が楽しくなる贅沢なギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=お酒（見た目重視）&target=義父"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=お酒（見た目重視）" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=お酒（見た目重視）" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=お酒（見た目重視）" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト3: ブランド小物 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ブランド小物</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥4,000〜¥18,000）</p>
              <p className="text-gray-600 mb-4">
                ハンカチ、ネクタイ、ポーチなど、上質で印象の良いブランド小物。<br />
                <span className="font-semibold text-green-600">「毎日使うものだから嬉しい」</span>と喜ばれる、長く愛用できるギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=ブランド小物&target=義父"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=ブランド小物" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=ブランド小物" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=ブランド小物" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト4: プレミアムドリンク */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">プレミアムドリンク</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥15,000）</p>
              <p className="text-gray-600 mb-4">
                高級緑茶、コーヒーギフトなど、上品で印象の良いドリンクギフト。<br />
                <span className="font-semibold text-green-600">「美味しい！」と笑顔がこぼれる</span>、日常が贅沢になるギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=プレミアムドリンク&target=義父"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=プレミアムドリンク" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=プレミアムドリンク" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=プレミアムドリンク" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト5: 上品な健康グッズ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-64 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fnissoplus%2Fnp-nr20w%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fnissoplus%2Fi%2F10000015%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/nissoplus/cabinet/item/neck_relax/main/250417_nr01.jpg?_ex=200x200" alt="上品な健康グッズ" style={{ border: 'medium', width: '200px', height: '200px', objectFit: 'cover' }} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{ border: '0px' }} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">上品な健康グッズ</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥6,000〜¥18,000）</p>
              <p className="text-gray-600 mb-4">
                マッサージ器（コンパクト）、高級アイマスクなど、上品で実用的な健康グッズ。<br />
                <span className="font-semibold text-green-600">「ずっと元気でいてほしい」</span>という想いが伝わる、思いやりのこもったギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=上品な健康グッズ&target=義父"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=上品な健康グッズ" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=上品な健康グッズ" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=上品な健康グッズ" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト6: 靴下・肌着（上質系） */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">靴下・肌着（上質系）</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥10,000）</p>
              <p className="text-gray-600 mb-4">
                シルク靴下、グンゼ肌着など、上質で実用的な靴下・肌着ギフト。<br />
                <span className="font-semibold text-green-600">「毎日使うものだから嬉しい」</span>と喜ばれる、長く愛用できるギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=靴下・肌着（上質系）&target=義父"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=靴下・肌着（上質系）" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=靴下・肌着（上質系）" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=靴下・肌着（上質系）" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト7: シニア向けガジェット */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">シニア向けガジェット</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥15,000）</p>
              <p className="text-gray-600 mb-4">
                電波時計、デジタル血圧計など、シニアに優しいガジェット。<br />
                <span className="font-semibold text-green-600">「便利になった」</span>と喜ばれる、実用的で体に優しいギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=シニア向けガジェット&target=義父"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=シニア向けガジェット" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=シニア向けガジェット" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=シニア向けガジェット" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト8: 本・雑誌ギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">本・雑誌ギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥8,000）</p>
              <p className="text-gray-600 mb-4">
                歴史雑誌、趣味の本など、義父の興味に合わせた本・雑誌ギフト。<br />
                <span className="font-semibold text-green-600">「趣味を応援してくれてありがとう」</span>と喜ばれる、心のこもったギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=本・雑誌ギフト&target=義父"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=本・雑誌ギフト" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=本・雑誌ギフト" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=本・雑誌ギフト" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト9: 季節感ギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-64 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fluna-luce%2Ftaigi-105orange%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fluna-luce%2Fi%2F10006965%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/luna-luce/cabinet/taigi/taigi-105orange.jpg?_ex=200x200" alt="季節感ギフト" style={{ border: 'medium', width: '200px', height: '200px', objectFit: 'cover' }} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{ border: '0px' }} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">季節感ギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥4,000〜¥12,000）</p>
              <p className="text-gray-600 mb-4">
                父の日ギフト、秋の味覚セットなど、季節感のある贈り物。<br />
                <span className="font-semibold text-green-600">「こんなのあるんだ！」</span>と驚きと喜びが一緒に届きます。
              </p>
              <Link 
                href="/events/birthday/chat?category=季節感ギフト&target=義父"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=季節感ギフト" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=季節感ギフト" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=季節感ギフト" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト10: 和風雑貨 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">和風雑貨</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥10,000）</p>
              <p className="text-gray-600 mb-4">
                風呂敷ギフト、竹製の和雑貨など、上品で印象の良い和風雑貨。<br />
                <span className="font-semibold text-green-600">「毎日使うものだから嬉しい」</span>と喜ばれる、長く愛用できるギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=和風雑貨&target=義父"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=和風雑貨" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=和風雑貨" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=和風雑貨" 
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
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌸</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600">春</h3>
                <p className="text-gray-600 text-sm">新茶、春の味覚、和風雑貨など</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">☀️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600">夏</h3>
                <p className="text-gray-600 text-sm">夏のビール、冷感グッズ、季節感ギフトなど</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍂</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600">秋</h3>
                <p className="text-gray-600 text-sm">秋の味覚、ウイスキー、季節感ギフトなど</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">❄️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600">冬</h3>
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