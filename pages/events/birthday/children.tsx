import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function ChildrenBirthdayGiftsPage() {
  return (
    <>
      <Header 
        title="子供への誕生日プレゼント10選 - Market Supporter AI" 
        description="子供への誕生日プレゼント選び。おもちゃ・学習用品・スポーツ用品など、子供が喜ぶギフト選びをサポートします。"
      />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* パンくずリスト */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link href="/events" className="hover:text-yellow-600">イベント</Link></li>
              <li>/</li>
              <li><Link href="/events/birthday" className="hover:text-yellow-600">誕生日プレゼント</Link></li>
              <li>/</li>
              <li className="text-gray-900">子供へのプレゼント</li>
            </ol>
          </nav>

          {/* 共感型導入文 */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mb-12 border border-yellow-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                「何を贈れば喜んでくれるだろう？」
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                子供の誕生日は、成長を祝う特別な日。でも、毎年何を贈れば良いか迷ってしまう方も多いはず。<br />
                この記事では、<span className="font-semibold text-yellow-600">おもちゃ・学習用品・スポーツ用品・体験</span>など、子供の笑顔を引き出すプレゼントを厳選して紹介します。
              </p>
            </div>
          </div>

          {/* ヒーローセクション */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              子供への誕生日プレゼント10選
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              おもちゃ・学習用品・スポーツ用品・体験など、子供の成長をサポートするギフト選び。<br />
              いつも元気な子供に、心を込めたプレゼントを選びましょう。
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-yellow-900 mb-2">🎁 子供へのプレゼント選びのポイント</h2>
              <ul className="text-yellow-800 text-left space-y-1">
                <li>• 年齢に合った安全なギフト</li>
                <li>• 創造性や運動能力を育むアイテム</li>
                <li>• 一緒に楽しめる体験ギフト</li>
                <li>• 学習や成長をサポートするアイテム</li>
              </ul>
            </div>
          </div>

          {/* ギフト一覧 */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {/* ギフト1: 知育おもちゃ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">知育おもちゃ</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥15,000）</p>
              <p className="text-gray-600 mb-4">
                ブロック、パズル、お絵描きセットなど、創造性や思考力を育むおもちゃ。<br />
                <span className="font-semibold text-yellow-600">「楽しく学べる」</span>と喜ばれる、成長をサポートするギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=知育おもちゃ&target=子供"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=知育おもちゃ" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=知育おもちゃ" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=知育おもちゃ" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト2: スポーツ用品 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">スポーツ用品</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥20,000）</p>
              <p className="text-gray-600 mb-4">
                サッカーボール、バスケットボール、自転車など、体を動かす楽しさを教えるアイテム。<br />
                <span className="font-semibold text-yellow-600">「運動が楽しくなった」</span>と喜ばれる、健康をサポートするギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=スポーツ用品&target=子供"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=スポーツ用品" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=スポーツ用品" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=スポーツ用品" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト3: 学習用品 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">学習用品</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥15,000）</p>
              <p className="text-gray-600 mb-4">
                文房具セット、図鑑、学習ゲームなど、勉強への興味を引き出すアイテム。<br />
                <span className="font-semibold text-yellow-600">「勉強が楽しくなった」</span>と喜ばれる、学習をサポートするギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=学習用品&target=子供"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=学習用品" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=学習用品" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=学習用品" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト4: 体験ギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">体験ギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥20,000）</p>
              <p className="text-gray-600 mb-4">
                動物園、水族館、科学館、工場見学など、一緒に楽しめる体験ギフト。<br />
                <span className="font-semibold text-yellow-600">「一緒に楽しめて嬉しい」</span>と喜ばれる、思い出に残るギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=体験ギフト&target=子供"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=体験ギフト" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=体験ギフト" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=体験ギフト" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト5: 本・絵本 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">本・絵本</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥1,000〜¥5,000）</p>
              <p className="text-gray-600 mb-4">
                年齢に合った絵本、図鑑、小説など、読書の楽しさを教えるアイテム。<br />
                <span className="font-semibold text-yellow-600">「本が好きになった」</span>と喜ばれる、知識と想像力を育むギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=本・絵本&target=子供"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=本・絵本" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=本・絵本" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=本・絵本" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト6: 音楽・楽器 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">音楽・楽器</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥25,000）</p>
              <p className="text-gray-600 mb-4">
                キーボード、ギター、リコーダーなど、音楽の楽しさを教える楽器。<br />
                <span className="font-semibold text-yellow-600">「音楽が好きになった」</span>と喜ばれる、感性を育むギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=音楽・楽器&target=子供"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=音楽・楽器" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=音楽・楽器" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=音楽・楽器" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト7: アート・工作用品 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">アート・工作用品</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥2,000〜¥10,000）</p>
              <p className="text-gray-600 mb-4">
                絵の具、クレヨン、工作キットなど、創造性を育むアート用品。<br />
                <span className="font-semibold text-yellow-600">「作ることが楽しい」</span>と喜ばれる、表現力を育むギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=アート・工作用品&target=子供"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=アート・工作用品" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=アート・工作用品" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=アート・工作用品" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト8: ゲーム・パズル */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ゲーム・パズル</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥15,000）</p>
              <p className="text-gray-600 mb-4">
                ボードゲーム、カードゲーム、パズルなど、家族で楽しめるゲーム。<br />
                <span className="font-semibold text-yellow-600">「家族で楽しめる」</span>と喜ばれる、コミュニケーションを育むギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=ゲーム・パズル&target=子供"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=ゲーム・パズル" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=ゲーム・パズル" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=ゲーム・パズル" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト9: 衣類・ファッション */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">衣類・ファッション</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥15,000）</p>
              <p className="text-gray-600 mb-4">
                おしゃれな服、靴、アクセサリーなど、子供の個性を表現するアイテム。<br />
                <span className="font-semibold text-yellow-600">「おしゃれが楽しい」</span>と喜ばれる、自己表現をサポートするギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=衣類・ファッション&target=子供"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=衣類・ファッション" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=衣類・ファッション" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=衣類・ファッション" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト10: おもちゃ・人形 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">おもちゃ・人形</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥2,000〜¥10,000）</p>
              <p className="text-gray-600 mb-4">
                人形、ぬいぐるみ、おもちゃなど、子供の想像力を育むアイテム。<br />
                <span className="font-semibold text-yellow-600">「遊ぶのが楽しい」</span>と喜ばれる、夢と冒険を育むギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=おもちゃ・人形&target=子供"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=おもちゃ・人形" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=おもちゃ・人形" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=おもちゃ・人形" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>
          </div>

          {/* 年齢別おすすめ */}
          <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🎂 年齢別おすすめギフト</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👶</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-yellow-600">0-2歳</h3>
                <p className="text-gray-600 text-sm">安全なおもちゃ、絵本、音楽玩具など</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🧒</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-yellow-600">3-5歳</h3>
                <p className="text-gray-600 text-sm">知育玩具、絵本、アート用品など</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👦</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-yellow-600">6-12歳</h3>
                <p className="text-gray-600 text-sm">スポーツ用品、学習用品、ゲームなど</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👧</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-yellow-600">13-18歳</h3>
                <p className="text-gray-600 text-sm">ファッション、音楽、体験ギフトなど</p>
              </Link>
            </div>
          </div>

          {/* 関連ページ */}
          <div className="bg-gray-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🔗 関連ページ</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Link 
                href="/events/birthday/siblings" 
                className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">兄弟姉妹へのプレゼント</h3>
                <p className="text-gray-600 text-sm">趣味・実用品・グルメ・体験など、兄弟姉妹への感謝を込めたギフト選び</p>
              </Link>

              <Link 
                href="/events/birthday/father" 
                className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">実父へのプレゼント</h3>
                <p className="text-gray-600 text-sm">健康・趣味・実用品など、父への感謝を込めたギフト選び</p>
              </Link>

              <Link 
                href="/events/birthday/mother" 
                className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">実母へのプレゼント</h3>
                <p className="text-gray-600 text-sm">美容・癒し・食・花・思い出系など、母への感謝を込めたギフト選び</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
