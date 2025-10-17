import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function MotherInLawBirthdayGiftsPage() {
  return (
    <>
      <Header 
        title="義母への誕生日プレゼント10選 - Market Supporter AI" 
        description="義母への誕生日プレゼント選び。センス良い×無難な観点で選ぶ、義理の母へのギフト選びをサポートします。"
      />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* パンくずリスト */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link href="/events" className="hover:text-purple-600">イベント</Link></li>
              <li>/</li>
              <li><Link href="/events/birthday" className="hover:text-purple-600">誕生日プレゼント</Link></li>
              <li>/</li>
              <li className="text-gray-900">義母へのプレゼント</li>
            </ol>
          </nav>

          {/* 共感型導入文 */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mb-12 border border-purple-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                「センスを疑われたくない…」
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                義母へのプレゼント選びは、実母以上に慎重になってしまうもの。<br />
                この記事では、<span className="font-semibold text-purple-600">上品で気が利いた、印象に残るギフト</span>を厳選して紹介します。失礼のない丁寧さと、心からの感謝を込めた贈り物を選びましょう。
              </p>
            </div>
          </div>

          {/* ヒーローセクション */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              義母への誕生日プレゼント10選
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              センス良い×無難な観点で選ぶ、義理の母へのギフト選び。<br />
              印象に残る上品な贈り物で、感謝の気持ちを伝えましょう。
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-purple-900 mb-2">💝 義母へのプレゼント選びのポイント</h2>
              <ul className="text-purple-800 text-left space-y-1">
                <li>• 上品で気が利いた印象のギフト</li>
                <li>• 高見えするセンスの良いアイテム</li>
                <li>• 香りや質感にこだわった上質なもの</li>
                <li>• 失礼のない丁寧な包装・メッセージ</li>
              </ul>
            </div>
          </div>

          {/* AI相談セクション - 一時的に非表示 */}
          {/* 
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-8 mb-12 border border-purple-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🤖 AI相談でぴったりのギフトを見つけよう
              </h2>
              <p className="text-gray-700 mb-6">
                義母さまの好みや雰囲気をAIが丁寧に聞き出して、<br />
                印象に残る上品なギフトを提案します。
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <Link 
                  href="/events/birthday/chat?category=上質スキンケア&target=義母"
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-purple-200"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">💄</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">上質スキンケア</h3>
                    <p className="text-xs text-gray-600">AI相談で選ぶ</p>
                  </div>
                </Link>
                
                <Link 
                  href="/events/birthday/chat?category=香りギフト&target=義母"
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-purple-200"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">🌸</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">香りギフト</h3>
                    <p className="text-xs text-gray-600">AI相談で選ぶ</p>
                  </div>
                </Link>
                
                <Link 
                  href="/events/birthday/chat?category=高級タオル・寝具&target=義母"
                  className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-purple-200"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">🛁</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">高級タオル・寝具</h3>
                    <p className="text-xs text-gray-600">AI相談で選ぶ</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          */}

          {/* ギフト一覧 */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {/* ギフト1: 上質スキンケアセット */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-64 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fshuuemura%2Fshu30001jp%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fshuuemura%2Fi%2F10000018%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/shuuemura/cabinet/images/packshots/shu30001jp-2-v9.jpg?_ex=200x200" alt="上質スキンケアセット" style={{border: 'medium', width: '200px', height: '200px', objectFit: 'cover'}} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: '0px'}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">上質スキンケアセット</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥15,000）</p>
              <p className="text-gray-600 mb-4">
                ロクシタンやHACCIなど、香りと高級感を重視したブランドコスメ。<br />
                <span className="font-semibold text-purple-600">「気が利いているね」</span>と言ってもらえる、上品で印象に残るギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=上質スキンケア&target=義母"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=上質スキンケア" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=上質スキンケア" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=上質スキンケア" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト2: 香りギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-64 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fasktrading%2Fit493%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fasktrading%2Fi%2F10061552%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/asktrading/cabinet/variety/goods4/it493_thum_n.jpg?_ex=200x200" alt="香りギフト" style={{border: 'medium', width: '200px', height: '200px', objectFit: 'cover'}} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: '0px'}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">香りギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥8,000）</p>
              <p className="text-gray-600 mb-4">
                ハンドクリーム・入浴剤・アロマキャンドルなど、上品な香りで癒されるギフト。<br />
                <span className="font-semibold text-purple-600">「いい香りね」</span>と毎日使ってもらえる、気遣いのこもった贈り物です。
              </p>
              <Link 
                href="/events/birthday/chat?category=香りギフト&target=義母"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=香りギフト" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=香りギフト" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=香りギフト" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト3: 高級タオル・寝具 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-64 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Floeuvredart%2Fitshrk100%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Floeuvredart%2Fi%2F10006379%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/loeuvredart/cabinet/towel/ituori/itu_haru100_01.jpg?_ex=200x200" alt="高級タオル・寝具" style={{border: 'medium', width: '200px', height: '200px', objectFit: 'cover'}} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: '0px'}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">高級タオル・寝具</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥4,000〜¥12,000）</p>
              <p className="text-gray-600 mb-4">
                今治タオルやオーガニックコットンなど、質感にこだわった上質なアイテム。<br />
                <span className="font-semibold text-purple-600">「気持ちいい」</span>と毎日使ってもらえる、実用性と上品さを兼ね備えたギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=高級タオル・寝具&target=義母"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=高級タオル・寝具" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=高級タオル・寝具" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=高級タオル・寝具" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト4: コンパクト美容家電 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-64 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Ffestino-shop%2Fsmhb033%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Ffestino-shop%2Fi%2F10000170%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/festino-shop/cabinet/items/09306859/imgrc0083636606.jpg?_ex=200x200" alt="コンパクト美容家電" style={{border: 'medium', width: '200px', height: '200px', objectFit: 'cover'}} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: '0px'}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">コンパクト美容家電</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥6,000〜¥15,000）</p>
              <p className="text-gray-600 mb-4">
                リファの美顔ローラーやナノスチーマーなど、コンパクトで使いやすい美容家電。<br />
                <span className="font-semibold text-purple-600">「便利ね」</span>と実用性も評価される、上品で気が利いたギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=コンパクト美容家電&target=義母"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=コンパクト美容家電" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=コンパクト美容家電" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=コンパクト美容家電" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト5: 華やかスイーツギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-64 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Ffunabashi-ya%2F878731%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Ffunabashi-ya%2Fi%2F10000023%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/funabashi-ya/cabinet/petitscakes/051.jpg?_ex=200x200" alt="華やかスイーツギフト" style={{border: 'medium', width: '200px', height: '200px', objectFit: 'cover'}} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: '0px'}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">華やかスイーツギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥8,000）</p>
              <p className="text-gray-600 mb-4">
                見た目も華やかで、外さない定番のスイーツギフト。個包装で季節感も演出。<br />
                <span className="font-semibold text-purple-600">「美味しいわね」</span>と笑顔がこぼれる、安心して選べるギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=華やかスイーツギフト&target=義母"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=華やかスイーツギフト" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=華やかスイーツギフト" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=華やかスイーツギフト" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト6: 上品なお茶・紅茶ギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-64 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Frikyu-en%2Fitem-set3%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Frikyu-en%2Fi%2F10000010%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/rikyu-en/cabinet/tea/item-set3/imgrc0101693534.jpg?_ex=200x200" alt="上品なお茶・紅茶ギフト" style={{border: 'medium', width: '200px', height: '200px', objectFit: 'cover'}} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: '0px'}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">上品なお茶・紅茶ギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥4,000〜¥10,000）</p>
              <p className="text-gray-600 mb-4">
                パッケージも上品で、香り高いお茶や紅茶のギフトセット。<br />
                <span className="font-semibold text-purple-600">「いい香りね」</span>と一息つく時間を彩る、心に残る贈り物です。
              </p>
              <Link 
                href="/events/birthday/chat?category=上品なお茶・紅茶ギフト&target=義母"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=上品なお茶・紅茶ギフト" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=上品なお茶・紅茶ギフト" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=上品なお茶・紅茶ギフト" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト7: キッチン雑貨・調理器具 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-64 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fluckywood%2F5-09710-2107%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fluckywood%2Fi%2F10000219%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/luckywood/cabinet/10688426/5-09710-2107.jpg?_ex=200x200" alt="キッチン雑貨・調理器具" style={{border: 'medium', width: '200px', height: '200px', objectFit: 'cover'}} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: '0px'}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">キッチン雑貨・調理器具</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥15,000）</p>
              <p className="text-gray-600 mb-4">
                高級カトラリーやセンスのいい食器など、玄人向けの上質なキッチンアイテム。<br />
                <span className="font-semibold text-purple-600">「いいものね」</span>と料理好きの義母に喜ばれる、気が利いたギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=キッチン雑貨・調理器具&target=義母"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=キッチン雑貨・調理器具" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=キッチン雑貨・調理器具" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=キッチン雑貨・調理器具" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト8: アロマ・癒しグッズ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-64 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fcrystal-planet%2Fmrm02%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fcrystal-planet%2Fi%2F10065140%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/crystal-planet/cabinet/brand001/moreroom001/mrm17_yappari.jpg?_ex=200x200" alt="アロマ・癒しグッズ" style={{border: 'medium', width: '200px', height: '200px', objectFit: 'cover'}} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: '0px'}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">アロマ・癒しグッズ</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥8,000）</p>
              <p className="text-gray-600 mb-4">
                ディフューザーや香りつきキャンドルなど、リラックスタイムを演出するアイテム。<br />
                <span className="font-semibold text-purple-600">「癒されるわ」</span>と心身ともにリフレッシュしてもらえる、気遣いのギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=アロマ・癒しグッズ&target=義母"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=アロマ・癒しグッズ" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=アロマ・癒しグッズ" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=アロマ・癒しグッズ" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト9: ブランド小物 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-64 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fartisan-artist%2F9wp-li117%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fartisan-artist%2Fi%2F10002355%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/artisan-artist/cabinet/img_std/9wp-li117blk_1.jpg?_ex=200x200" alt="ブランド小物" style={{border: 'medium', width: '200px', height: '200px', objectFit: 'cover'}} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: '0px'}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ブランド小物</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥4,000〜¥12,000）</p>
              <p className="text-gray-600 mb-4">
                エプロン・ハンカチ・ポーチなど、ポール&ジョーやラルフ・ローレンなどのブランド小物。<br />
                <span className="font-semibold text-purple-600">「素敵ね」</span>とセンスを評価される、印象に残るギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=ブランド小物&target=義母"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 text-center block mb-3"
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

            {/* ギフト10: 季節の花＆プリザーブドギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-64 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fflowerkitchen%2Ffksw-1974%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fflowerkitchen%2Fi%2F10010119%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/flowerkitchen/cabinet/pr/set/09061109/fksw-1974-02.jpg?_ex=200x200" alt="季節の花＆プリザーブドギフト" style={{ border: 'medium', width: '200px', height: '200px', objectFit: 'cover' }} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{ border: '0px' }} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">季節の花＆プリザーブドギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥10,000）</p>
              <p className="text-gray-600 mb-4">
                生花やプリザーブドフラワー、一緒にギフト券も添えて。<br />
                <span className="font-semibold text-purple-600">「きれいね」</span>と部屋を明るくする、華やかで印象的なギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=季節の花＆プリザーブドギフト&target=義母"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=季節の花＆プリザーブドギフト" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=季節の花＆プリザーブドギフト" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=季節の花＆プリザーブドギフト" 
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
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌸</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600">春</h3>
                <p className="text-gray-600 text-sm">桜モチーフのスキンケア、春の香りアロマなど</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">☀️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600">夏</h3>
                <p className="text-gray-600 text-sm">涼やかな香りのハンドクリーム、夏の花など</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍂</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600">秋</h3>
                <p className="text-gray-600 text-sm">温かみのあるアロマ、秋の香りスイーツなど</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">❄️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600">冬</h3>
                <p className="text-gray-600 text-sm">保湿重視のスキンケア、温かい香りのキャンドルなど</p>
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
