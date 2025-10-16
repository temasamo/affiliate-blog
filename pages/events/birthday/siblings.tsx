import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function SiblingsBirthdayGiftsPage() {
  return (
    <>
      <Header 
        title="兄弟姉妹への誕生日プレゼント10選 - Market Supporter AI" 
        description="兄弟姉妹への誕生日プレゼント選び。趣味・実用品・グルメなど、兄弟姉妹への感謝を込めたギフト選びをサポートします。"
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
              <li className="text-gray-900">兄弟姉妹へのプレゼント</li>
            </ol>
          </nav>

          {/* 共感型導入文 */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-12 border border-purple-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                「何を贈れば喜んでくれるだろう？」
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                兄弟姉妹の誕生日は、感謝の気持ちを伝える絶好の機会。でも、毎年何を贈れば良いか迷ってしまう方も多いはず。<br />
                この記事では、<span className="font-semibold text-purple-600">趣味・実用品・グルメ・体験</span>など、兄弟姉妹の笑顔を引き出すプレゼントを厳選して紹介します。
              </p>
            </div>
          </div>

          {/* ヒーローセクション */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              兄弟姉妹への誕生日プレゼント10選
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              趣味・実用品・グルメ・体験など、兄弟姉妹への感謝を込めたギフト選び。<br />
              いつもお疲れ様の兄弟姉妹に、心を込めたプレゼントを選びましょう。
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-purple-900 mb-2">💝 兄弟姉妹へのプレゼント選びのポイント</h2>
              <ul className="text-purple-800 text-left space-y-1">
                <li>• 兄弟姉妹の趣味や好みを考慮したギフト</li>
                <li>• 実用的で日常的に使えるアイテム</li>
                <li>• 一緒に楽しめる体験ギフト</li>
                <li>• グルメ・お酒系の贅沢なギフト</li>
              </ul>
            </div>
          </div>

          {/* ギフト一覧 */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {/* ギフト1: 家電ガジェット */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&amp;p_id=54&amp;pc_id=54&amp;pl_id=616&amp;url=https%3A%2F%2Fitem.rakuten.co.jp%2Fdolce-gusto%2F0012561663%2F&amp;m=http%3A%2F%2Fm.rakuten.co.jp%2Fdolce-gusto%2Fi%2F10000158%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/dolce-gusto/cabinet/sum/plus_variety_thum.jpg?_ex=500x500" alt="家電ガジェット" style={{ border: 'medium', width: '200px', height: '200px', objectFit: 'cover' }} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&amp;p_id=54&amp;pc_id=54&amp;pl_id=616" alt="" loading="lazy" width="1" height="1" style={{ border: '0px' }} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">家電ガジェット</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥8,000〜¥25,000）</p>
              <p className="text-gray-600 mb-4">
                スマートウォッチ、自動コーヒーメーカー、ネックファンなど、生活を便利にするガジェット。<br />
                <span className="font-semibold text-purple-600">「便利になった」</span>と喜ばれる、実用的でおしゃれなギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=家電ガジェット&target=兄弟姉妹"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center block mb-3"
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

            {/* ギフト2: 趣味グッズ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&amp;p_id=54&amp;pc_id=54&amp;pl_id=616&amp;url=https%3A%2F%2Fitem.rakuten.co.jp%2Fheystop%2Fc1000%2F&amp;m=http%3A%2F%2Fm.rakuten.co.jp%2Fheystop%2Fi%2F10000201%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/heystop/cabinet/c1000/c1000z-2509.jpg?_ex=500x500" alt="趣味グッズ" style={{ border: 'medium', width: '200px', height: '200px', objectFit: 'cover' }} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&amp;p_id=54&amp;pc_id=54&amp;pl_id=616" alt="" loading="lazy" width="1" height="1" style={{ border: '0px' }} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">趣味グッズ</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥20,000）</p>
              <p className="text-gray-600 mb-4">
                読書、映画、音楽、アートなど、兄弟姉妹の趣味に合わせたグッズや道具。<br />
                <span className="font-semibold text-purple-600">「趣味を応援してくれてありがとう」</span>と喜ばれる、心のこもったギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=趣味グッズ&target=兄弟姉妹"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center block mb-3"
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

            {/* ギフト3: グルメギフト */}
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
                和牛、うなぎ、海鮮など、兄弟姉妹の好みに合わせた贅沢なグルメギフト。<br />
                <span className="font-semibold text-purple-600">「美味しい！」と笑顔がこぼれる</span>、食卓が華やぐギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=グルメギフト&target=兄弟姉妹"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center block mb-3"
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

            {/* ギフト4: お酒ギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&amp;p_id=54&amp;pc_id=54&amp;pl_id=616&amp;url=https%3A%2F%2Fitem.rakuten.co.jp%2Fyokogoshi%2F720x3_089set%2F&amp;m=http%3A%2F%2Fm.rakuten.co.jp%2Fyokogoshi%2Fi%2F10000908%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/yokogoshi/cabinet/shohin/720x3/imgrc0156251671.jpg?_ex=500x500" alt="お酒ギフト" style={{ border: 'medium', width: '200px', height: '200px', objectFit: 'cover' }} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&amp;p_id=54&amp;pc_id=54&amp;pl_id=616" alt="" loading="lazy" width="1" height="1" style={{ border: '0px' }} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">お酒ギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥20,000）</p>
              <p className="text-gray-600 mb-4">
                ウイスキー、日本酒、ワインなど、兄弟姉妹の好みに合わせたお酒のギフト。<br />
                <span className="font-semibold text-purple-600">「美味しい！」と笑顔がこぼれる</span>、晩酌が楽しくなる贅沢なギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=お酒ギフト&target=兄弟姉妹"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center block mb-3"
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

            {/* ギフト5: ファッション小物 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ファッション小物</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥15,000）</p>
              <p className="text-gray-600 mb-4">
                バッグ、財布、アクセサリー、時計など、兄弟姉妹のスタイルに合わせたファッション小物。<br />
                <span className="font-semibold text-purple-600">「毎日使うものだから嬉しい」</span>と喜ばれる、長く愛用できるギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=ファッション小物&target=兄弟姉妹"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=ファッション小物" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=ファッション小物" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=ファッション小物" 
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
                料理教室、陶芸体験、温泉旅行など、一緒に楽しめる体験ギフト。<br />
                <span className="font-semibold text-purple-600">「一緒に楽しめて嬉しい」</span>と喜ばれる、思い出に残るギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=兄弟姉妹体験ギフト&target=兄弟姉妹"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center block mb-3"
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

            {/* ギフト7: 本・雑誌ギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">本・雑誌ギフト</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥8,000）</p>
              <p className="text-gray-600 mb-4">
                小説、ビジネス書、趣味の雑誌など、兄弟姉妹の興味に合わせた本・雑誌ギフト。<br />
                <span className="font-semibold text-purple-600">「趣味を応援してくれてありがとう」</span>と喜ばれる、心のこもったギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=本・雑誌ギフト&target=兄弟姉妹"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center block mb-3"
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

            {/* ギフト8: スポーツグッズ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 rounded-lg flex items-center justify-center">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&amp;p_id=54&amp;pc_id=54&amp;pl_id=616&amp;url=https%3A%2F%2Fitem.rakuten.co.jp%2Fsuperfoot-2%2F10003316%2F&amp;m=http%3A%2F%2Fm.rakuten.co.jp%2Fsuperfoot-2%2Fi%2F10004883%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/superfoot-2/cabinet/kf11/picrc0131287441.jpg?_ex=500x500" alt="スポーツグッズ" style={{ border: 'medium', width: '200px', height: '200px', objectFit: 'cover' }} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&amp;p_id=54&amp;pc_id=54&amp;pl_id=616" alt="" loading="lazy" width="1" height="1" style={{ border: '0px' }} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">スポーツグッズ</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥20,000）</p>
              <p className="text-gray-600 mb-4">
                ウォーキングシューズ、スポーツウェア、フィットネスグッズなど、健康維持をサポートするアイテム。<br />
                <span className="font-semibold text-purple-600">「運動が楽しくなった」</span>と喜ばれる、健康を応援するギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=スポーツグッズ&target=兄弟姉妹"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=スポーツグッズ" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=スポーツグッズ" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=スポーツグッズ" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト9: 美容・健康グッズ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">美容・健康グッズ</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥15,000）</p>
              <p className="text-gray-600 mb-4">
                スキンケアセット、健康食品、マッサージ器など、美容と健康をサポートするアイテム。<br />
                <span className="font-semibold text-purple-600">「ずっと美しく、元気でいてほしい」</span>という想いが伝わる、思いやりのこもったギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=美容・健康グッズ&target=兄弟姉妹"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=美容・健康グッズ" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=美容・健康グッズ" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=美容・健康グッズ" 
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Yahoo
                </Link>
              </div>
            </div>

            {/* ギフト10: 旅行グッズ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">画像</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">旅行グッズ</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥15,000）</p>
              <p className="text-gray-600 mb-4">
                スーツケース、旅行用バッグ、旅行雑貨など、旅行を楽しむためのアイテム。<br />
                <span className="font-semibold text-purple-600">「旅行が楽しくなった」</span>と喜ばれる、新しい体験をサポートするギフトです。
              </p>
              <Link 
                href="/events/birthday/chat?category=旅行グッズ&target=兄弟姉妹"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link 
                  href="/api/out?mall=rakuten&brand=旅行グッズ" 
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  楽天
                </Link>
                <Link 
                  href="/api/out?mall=amazon&brand=旅行グッズ" 
                  className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Amazon
                </Link>
                <Link 
                  href="/api/out?mall=yahoo&brand=旅行グッズ" 
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
                <p className="text-gray-600 text-sm">新茶、春の味覚、アウトドアグッズなど</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">☀️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600">夏</h3>
                <p className="text-gray-600 text-sm">夏のビール、冷感グッズ、スポーツウェアなど</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍂</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600">秋</h3>
                <p className="text-gray-600 text-sm">秋の味覚、ウイスキー、アウトドアグッズなど</p>
              </Link>

              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">❄️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600">冬</h3>
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
                href="/events/birthday/mother" 
                className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">実母へのプレゼント</h3>
                <p className="text-gray-600 text-sm">美容・癒し・食・花・思い出系など、母への感謝を込めたギフト選び</p>
              </Link>

              <Link 
                href="/events/birthday/children" 
                className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">子供へのプレゼント</h3>
                <p className="text-gray-600 text-sm">おもちゃ・学習用品・スポーツ用品など、子供が喜ぶギフト選び</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
