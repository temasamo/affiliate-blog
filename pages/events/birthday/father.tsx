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

          {/* 共感型導入文 */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-12 border border-blue-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                「何を贈れば喜んでくれるだろう？」
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                父の誕生日は、感謝の気持ちを伝える絶好の機会。でも、毎年何を贈れば良いか迷ってしまう方も多いはず。<br />
                この記事では、<span className="font-semibold text-blue-600">健康・趣味・実用品・グルメ</span>など、父の笑顔を引き出すプレゼントを厳選して紹介します。
              </p>
            </div>
          </div>

          {/* ヒーローセクション */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              実父への誕生日プレゼント10選
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              健康・趣味・実用品・グルメなど、父への感謝を込めたギフト選び。<br />
              いつもお疲れ様の父に、心を込めたプレゼントを選びましょう。
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">💝 実父へのプレゼント選びのポイント</h2>
              <ul className="text-blue-800 text-left space-y-1">
                <li>• 父の趣味や好みを考慮したギフト</li>
                <li>• 健康を気遣う実用的なアイテム</li>
                <li>• マッサージ・リラックス系のアイテム</li>
                <li>• お酒・グルメ系の贅沢なギフト</li>
              </ul>
            </div>
          </div>

          {/* AI相談セクション - 一時的に非表示 */}
          {/* 
          <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl p-8 mb-12 border border-blue-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🤖 AI相談でぴったりのギフトを見つけよう
              </h2>
              <p className="text-gray-700 mb-6">
                お父さまの好みや生活スタイルをAIが聞き出して、<br />
                あなただけの特別なギフトを提案します。
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <Link 
                  href="/events/birthday/chat?category=マッサージ機器&target=実父"
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-blue-200"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">💆</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">マッサージ機器</h3>
                    <p className="text-xs text-gray-600">AI相談で選ぶ</p>
                  </div>
                </Link>
                
                <Link 
                  href="/events/birthday/chat?category=お酒ギフト&target=実父"
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-blue-200"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">🍶</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">お酒ギフト</h3>
                    <p className="text-xs text-gray-600">AI相談で選ぶ</p>
                  </div>
                </Link>
                
                <Link 
                  href="/events/birthday/chat?category=健康食品・サプリメント&target=実父"
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-blue-200"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">💊</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">健康食品・サプリメント</h3>
                    <p className="text-xs text-gray-600">AI相談で選ぶ</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          */}

          {/* ギフト一覧 */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {/* ギフト1: マッサージ機器 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">マッサージ機器</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥8,000〜¥25,000）</p>
              <p className="text-gray-600 mb-4">
                肩こりや腰痛に悩む父に、マッサージチェアやフットマッサージャーを。<br />
                <span className="font-semibold text-blue-600">「疲れが取れる」</span>と喜ばれる、実用的で体に優しいギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=マッサージ機器&target=実父"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=マッサージ機器" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=マッサージ機器" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=マッサージ機器" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト2: お酒ギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">お酒ギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥20,000）</p>
              <p className="text-gray-600 mb-4">
                ウイスキー、日本酒、ワインなど、父の好みに合わせたお酒のギフト。<br />
                <span className="font-semibold text-blue-600">「美味しい！」と笑顔がこぼれる</span>、晩酌が楽しくなる贅沢なギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=お酒ギフト&target=実父"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=お酒ギフト" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=お酒ギフト" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=お酒ギフト" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト3: 健康食品・サプリメント */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-64 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fnissoplus%2Fnp-nr20w%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fnissoplus%2Fi%2F10000015%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/nissoplus/cabinet/item/neck_relax/main/250417_nr01.jpg?_ex=200x200" alt="健康食品・サプリメント" style={{ border: 'medium', width: '200px', height: '200px', objectFit: 'cover' }} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{ border: '0px' }} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">健康食品・サプリメント</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥10,000）</p>
              <p className="text-gray-600 mb-4">
                高麗人参、DHA、コラーゲンなど、父の健康をサポートするサプリメント。<br />
                <span className="font-semibold text-blue-600">「ずっと元気でいてほしい」</span>という想いが伝わる、思いやりのこもったギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=健康食品・サプリメント&target=実父"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=健康食品・サプリメント" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=健康食品・サプリメント" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=健康食品・サプリメント" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト4: 睡眠グッズ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">睡眠グッズ</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥15,000）</p>
              <p className="text-gray-600 mb-4">
                安眠枕、快眠グッズ、アイマスクなど、質の良い睡眠をサポートするアイテム。<br />
                <span className="font-semibold text-blue-600">「よく眠れるようになった」</span>と喜ばれる、体調管理に役立つギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=睡眠グッズ&target=実父"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=睡眠グッズ" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=睡眠グッズ" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=睡眠グッズ" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト5: グルメギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-64 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2F29hijiri%2Fb6r350g%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2F29hijiri%2Fi%2F10000006%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/29hijiri/cabinet/700top/1bn236.jpg?_ex=200x200" alt="グルメギフト" style={{ border: 'medium', width: '200px', height: '200px', objectFit: 'cover' }} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{ border: '0px' }} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">グルメギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥8,000〜¥25,000）</p>
              <p className="text-gray-600 mb-4">
                和牛、うなぎ、海鮮など、父の好みに合わせた贅沢なグルメギフト。<br />
                <span className="font-semibold text-blue-600">「美味しい！」と笑顔がこぼれる</span>、食卓が華やぐギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=グルメギフト&target=実父"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=グルメギフト" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=グルメギフト" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=グルメギフト" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト6: 家電ガジェット */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">家電ガジェット</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥8,000〜¥25,000）</p>
              <p className="text-gray-600 mb-4">
                スマートウォッチ、自動コーヒーメーカー、ネックファンなど、生活を便利にするガジェット。<br />
                <span className="font-semibold text-blue-600">「便利になった」</span>と喜ばれる、実用的でおしゃれなギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=家電ガジェット&target=実父"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=家電ガジェット" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=家電ガジェット" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=家電ガジェット" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト7: 趣味グッズ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">趣味グッズ</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥20,000）</p>
              <p className="text-gray-600 mb-4">
                ゴルフ、釣り、読書など、父の趣味に合わせたグッズや道具。<br />
                <span className="font-semibold text-blue-600">「趣味を応援してくれてありがとう」</span>と喜ばれる、心のこもったギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=趣味グッズ&target=実父"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=趣味グッズ" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=趣味グッズ" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=趣味グッズ" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト8: 日常家電 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">日常家電</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥15,000）</p>
              <p className="text-gray-600 mb-4">
                電動歯ブラシ、ネックファン、加湿器など、日常の生活を快適にする家電。<br />
                <span className="font-semibold text-blue-600">「便利になった」</span>と喜ばれる、実用的で体に優しいギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=日常家電&target=実父"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=日常家電" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=日常家電" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=日常家電" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト9: ブランド財布・キーケース */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ブランド財布・キーケース</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥8,000〜¥25,000）</p>
              <p className="text-gray-600 mb-4">
                ポーター、ラルフローレンなど、上質で実用的な財布やキーケース。<br />
                <span className="font-semibold text-blue-600">「毎日使うものだから嬉しい」</span>と喜ばれる、長く愛用できるギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=ブランド財布・キーケース&target=実父"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=ブランド財布・キーケース" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=ブランド財布・キーケース" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=ブランド財布・キーケース" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト10: スポーツ系グッズ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">スポーツ系グッズ</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥20,000）</p>
              <p className="text-gray-600 mb-4">
                ウォーキングシューズ、スポーツウェア、フィットネスグッズなど、健康維持をサポートするアイテム。<br />
                <span className="font-semibold text-blue-600">「運動が楽しくなった」</span>と喜ばれる、健康を応援するギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=スポーツ系グッズ&target=実父"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=スポーツ系グッズ" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=スポーツ系グッズ" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=スポーツ系グッズ" 
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
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌸</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">春</h3>
                <p className="text-gray-600 text-sm">新茶、春の味覚、ウォーキンググッズなど</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">☀️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">夏</h3>
                <p className="text-gray-600 text-sm">冷感グッズ、夏のビール、スポーツウェアなど</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍂</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">秋</h3>
                <p className="text-gray-600 text-sm">秋の味覚、ウイスキー、アウトドアグッズなど</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">❄️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">冬</h3>
                <p className="text-gray-600 text-sm">あったかグッズ、お鍋セット、高級食材など</p>
              </Link>
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
                <p className="text-gray-600 text-sm">美容・癒し・健康・思い出系など、母への感謝を込めたギフト選び</p>
              </Link>

              <Link 
                href="/events/birthday/father-in-law" 
                className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">義父へのプレゼント</h3>
                <p className="text-gray-600 text-sm">印象重視×無難な観点で選ぶ、義理の父へのギフト選び</p>
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