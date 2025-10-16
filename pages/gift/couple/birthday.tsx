import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function CoupleBirthdayGiftsPage() {
  return (
    <>
      <Header 
        title="恋人の誕生日プレゼント特集｜彼氏・彼女が喜ぶ人気ギフトと選び方"
        description="彼氏・彼女への誕生日プレゼントをテーマに、年代・性格・交際期間別のおすすめギフトを紹介。サプライズ演出やペアグッズも解説。"
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
              <li className="text-gray-900">恋人へのプレゼント</li>
            </ol>
          </nav>

          {/* 共感型導入文 */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 mb-12 border border-red-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                「今年は、ちゃんと“伝わる”贈り方をしたい」
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                誕生日は、一年に一度「ありがとう」と「これからもよろしく」を伝える特別な日。<br />
                この記事では、<span className="font-semibold text-red-600">交際期間・性格・ライフスタイル</span>に合わせて、失敗しない“ちょうどいい”ギフトの選び方とおすすめを紹介します。
              </p>
            </div>
          </div>

          {/* ヒーローセクション */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              恋人の誕生日プレゼント特集
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              彼氏・彼女が本当に喜ぶ、タイプ別×価格別のおすすめを一挙に紹介。<br />
              サプライズ演出やペアアイテム、体験ギフトまで網羅します。
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-red-900 mb-2">🎯 プレゼント選びのポイント</h2>
              <ul className="text-red-800 text-left space-y-1">
                <li>• 交際期間を意識（半年以内は無理しない、1年以上なら特別感）</li>
                <li>• ライフスタイルに寄せる（仕事・趣味・ファッション）</li>
                <li>• 形に残る or 思い出に残るを決める</li>
              </ul>
            </div>
          </div>


          {/* ギフト一覧 */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {/* ギフト1: ペアアクセ/ペアウォッチ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <a href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fseiko3s%2Fsbtm170-ssdy020%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fseiko3s%2Fi%2F10055832%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade" target="_blank">
                    <img src="https://thumbnail.image.rakuten.co.jp/@0_mall/seiko3s/cabinet/cab02/sbtm170-ssdy020-a.jpg?_ex=500x500" alt="ペアウォッチ" style={{border: "medium", width: "100%", height: "100%", objectFit: "cover"}} />
                  </a>
                  <img src="https://i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: "0px"}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ペアウォッチ</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥60,000）</p>
              <p className="text-gray-600 mb-4">
                形に残る"お揃い"は鉄板。<span className="font-semibold text-red-600">さりげないシンプル系</span>が長く使えて人気です。
              </p>
              <Link 
                href="/events/birthday/chat?category=ペアアクセサリー&target=恋人"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link href="/api/out?mall=rakuten&brand=ペアウォッチ" className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">楽天</Link>
                <Link href="/api/out?mall=amazon&brand=ペアウォッチ" className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors">Amazon</Link>
                <Link href="/api/out?mall=yahoo&brand=ペアウォッチ" className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors">Yahoo</Link>
              </div>
            </div>

            {/* ギフト2: ロマンチックギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <a href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Ffloreal%2Fch_01_a1000%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Ffloreal%2Fi%2F10000701%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade" target="_blank">
                    <img src="https://thumbnail.image.rakuten.co.jp/@0_mall/floreal/cabinet/shohin_page/ch_01_a1000/ch_01_a1000_p2_01.jpg?_ex=500x500" alt="フラワーボックス" style={{border: "medium", width: "100%", height: "100%", objectFit: "cover"}} />
                  </a>
                  <img src="https://i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: "0px"}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">フラワーボックス＋メッセージ</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥8,000）</p>
              <p className="text-gray-600 mb-4">
                王道の“気持ちが伝わる”ギフト。手紙を添えて特別感を演出しましょう。
              </p>
              <Link 
                href="/events/birthday/chat?category=フラワーギフト&target=恋人"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link href="/api/out?mall=rakuten&brand=フラワーボックス ギフト" className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">楽天</Link>
                <Link href="/api/out?mall=amazon&brand=フラワーボックス ギフト" className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors">Amazon</Link>
                <Link href="/api/out?mall=yahoo&brand=フラワーボックス ギフト" className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors">Yahoo</Link>
              </div>
            </div>

            {/* ギフト3: 実用派ギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <a href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fnisyoshop%2Faromadiffuser%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fnisyoshop%2Fi%2F10000319%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade" target="_blank">
                    <img src="https://thumbnail.image.rakuten.co.jp/@0_mall/nisyoshop/cabinet/main01/aromadiffuser.jpg?_ex=500x500" alt="アロマ加湿器" style={{border: "medium", width: "100%", height: "100%", objectFit: "cover"}} />
                  </a>
                  <img src="https://i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: "0px"}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">高品質スキンケア・アロマ加湿器</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥12,000）</p>
              <p className="text-gray-600 mb-4">
                冬場に嬉しい保湿系や、寝室で使える<span className="font-semibold text-red-600">癒しのアロマ</span>が好相性。
              </p>
              <Link 
                href="/events/birthday/chat?category=美容・スキンケア&target=恋人"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link href="/api/out?mall=rakuten&brand=スキンケア アロマ加湿器" className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">楽天</Link>
                <Link href="/api/out?mall=amazon&brand=スキンケア アロマ加湿器" className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors">Amazon</Link>
                <Link href="/api/out?mall=yahoo&brand=スキンケア アロマ加湿器" className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors">Yahoo</Link>
              </div>
            </div>

            {/* ギフト4: 体験ギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <a href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fsowxp%2Frestaurant_red%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fsowxp%2Fi%2F10000013%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade" target="_blank">
                    <img src="https://thumbnail.image.rakuten.co.jp/@0_mall/sowxp/cabinet/restaurant-series/10767281/1restaurant.jpg?_ex=500x500" alt="レストラン体験ギフト" style={{border: "medium", width: "100%", height: "100%", objectFit: "cover"}} />
                  </a>
                  <img src="https://i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: "0px"}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">サプライズディナー・宿泊体験</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥10,000〜¥30,000）</p>
              <p className="text-gray-600 mb-4">
                思い出に残る“非日常”体験。ペアで楽しめるプランを選ぶと満足度が高いです。
              </p>
              <Link 
                href="/events/birthday/chat?category=体験ギフト&target=恋人"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link href="/api/out?mall=rakuten&brand=体験ギフト ディナー 宿泊" className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">楽天</Link>
                <Link href="/api/out?mall=amazon&brand=体験ギフト ディナー 宿泊" className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors">Amazon</Link>
                <Link href="/api/out?mall=yahoo&brand=体験ギフト ディナー 宿泊" className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors">Yahoo</Link>
              </div>
            </div>

            {/* ギフト5: おうち時間ギフト */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <a href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fpurpleleaf%2F10000025%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fpurpleleaf%2Fi%2F10000032%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade" target="_blank">
                    <img src="https://thumbnail.image.rakuten.co.jp/@0_mall/purpleleaf/cabinet/disny/imgrc0103844102.jpg?_ex=500x500" alt="ペアマグ" style={{border: "medium", width: "100%", height: "100%", objectFit: "cover"}} />
                  </a>
                  <img src="https://i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: "0px"}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">コーヒー・お茶・ペアマグ</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥2,000〜¥6,000）</p>
              <p className="text-gray-600 mb-4">
                おうちで一緒に楽しめる“ほっと時間”。名前入りのマグで特別感を。
              </p>
              <Link 
                href="/events/birthday/chat?category=おうち時間ギフト&target=恋人"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link href="/api/out?mall=rakuten&brand=コーヒー お茶 ペアマグ" className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">楽天</Link>
                <Link href="/api/out?mall=amazon&brand=コーヒー お茶 ペアマグ" className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors">Amazon</Link>
                <Link href="/api/out?mall=yahoo&brand=コーヒー お茶 ペアマグ" className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors">Yahoo</Link>
              </div>
            </div>

            {/* ギフト6: 冬小物 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <a href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fqueenhead%2F7033-1%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fqueenhead%2Fi%2F10001606%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade" target="_blank">
                    <img src="https://thumbnail.image.rakuten.co.jp/@0_mall/queenhead/cabinet/23aw/23aw7033_0.jpg?_ex=500x500" alt="ストール" style={{border: "medium", width: "100%", height: "100%", objectFit: "cover"}} />
                  </a>
                  <img src="https://i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: "0px"}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">手袋・ストール・ルームウェア</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥8,000）</p>
              <p className="text-gray-600 mb-4">
                寒い季節に嬉しい実用品。<span className="font-semibold text-red-600">色味は相手の普段着に合わせて</span>選ぶと失敗しません。
              </p>
              <Link 
                href="/events/birthday/chat?category=冬小物&target=恋人"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link href="/api/out?mall=rakuten&brand=手袋 ストール ルームウェア" className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">楽天</Link>
                <Link href="/api/out?mall=amazon&brand=手袋 ストール ルームウェア" className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors">Amazon</Link>
                <Link href="/api/out?mall=yahoo&brand=手袋 ストール ルームウェア" className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors">Yahoo</Link>
              </div>
            </div>

            {/* タイプ別カード: 実用派タイプ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <a href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fno-plan%2F10000000%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fno-plan%2Fi%2F10000000%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade" target="_blank">
                    <img src="https://thumbnail.image.rakuten.co.jp/@0_mall/no-plan/cabinet/05804571/blthumbnail2.jpg?_ex=500x500" alt="スマートウォッチ" style={{border: "medium", width: "100%", height: "100%", objectFit: "cover"}} />
                  </a>
                  <img src="https://i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: "0px"}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">実用派タイプ</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥12,000）</p>
              <p className="text-gray-600 mb-4">
                スマートウォッチ、名刺入れ、シンプルな財布など<span className="font-semibold text-red-600">毎日使える品質重視</span>の一品。
              </p>
              <Link 
                href="/events/birthday/chat?category=実用派タイプ&target=恋人"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link href="/api/out?mall=rakuten&brand=スマートウォッチ 名刺入れ 財布" className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">楽天</Link>
                <Link href="/api/out?mall=amazon&brand=スマートウォッチ 名刺入れ 財布" className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors">Amazon</Link>
                <Link href="/api/out?mall=yahoo&brand=スマートウォッチ 名刺入れ 財布" className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors">Yahoo</Link>
              </div>
            </div>

            {/* タイプ別カード: ロマンチックタイプ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <a href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fm-dragon%2Fac125%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fm-dragon%2Fi%2F10000171%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade" target="_blank">
                    <img src="https://thumbnail.image.rakuten.co.jp/@0_mall/m-dragon/cabinet/accessories/ac057/compass1589162755.jpg?_ex=500x500" alt="ペアアクセサリー" style={{border: "medium", width: "100%", height: "100%", objectFit: "cover"}} />
                  </a>
                  <img src="https://i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: "0px"}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ペアアクセサリー</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥10,000）</p>
              <p className="text-gray-600 mb-4">
                ペアリングやペアネックレスなど、<span className="font-semibold text-red-600">お揃いのアクセサリー</span>で特別感を演出。
              </p>
              <Link 
                href="/events/birthday/chat?category=ペアアクセサリー&target=恋人"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link href="/api/out?mall=rakuten&brand=ペアアクセサリー" className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">楽天</Link>
                <Link href="/api/out?mall=amazon&brand=ペアアクセサリー" className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors">Amazon</Link>
                <Link href="/api/out?mall=yahoo&brand=ペアアクセサリー" className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors">Yahoo</Link>
              </div>
            </div>

            {/* タイプ別カード: 趣味・共感タイプ */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <a href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Ftiarise%2Fasc-m%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Ftiarise%2Fi%2F10000371%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade" target="_blank">
                    <img src="https://thumbnail.image.rakuten.co.jp/@0_mall/tiarise/cabinet/products01/bag/item1_ascmn.jpg?_ex=500x500" alt="バッグ" style={{border: "medium", width: "100%", height: "100%", objectFit: "cover"}} />
                  </a>
                  <img src="https://i.moshimo.com/af/i/impression?a_id=5122395&p_id=54&pc_id=54&pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: "0px"}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">趣味・共感タイプ</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥3,000〜¥15,000）</p>
              <p className="text-gray-600 mb-4">
                推し活グッズや体験ギフトなど、<span className="font-semibold text-red-600">一緒に楽しめる</span>カテゴリから厳選。
              </p>
              <Link 
                href="/events/birthday/chat?category=趣味・共感タイプ&target=恋人"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link href="/api/out?mall=rakuten&brand=推し活グッズ 体験ギフト" className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">楽天</Link>
                <Link href="/api/out?mall=amazon&brand=推し活グッズ 体験ギフト" className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors">Amazon</Link>
                <Link href="/api/out?mall=yahoo&brand=推し活グッズ 体験ギフト" className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors">Yahoo</Link>
              </div>
            </div>

            {/* ギフト10: 洋服 */}
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <a href="//af.moshimo.com/af/c/click?a_id=5122395&amp;p_id=54&amp;pc_id=54&amp;pl_id=616&amp;url=https%3A%2F%2Fitem.rakuten.co.jp%2Fw-w-m%2Fcw6768-010%2F&amp;m=http%3A%2F%2Fm.rakuten.co.jp%2Fw-w-m%2Fi%2F10046833%2F" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
                    <img src="//thumbnail.image.rakuten.co.jp/@0_mall/w-w-m/cabinet/cm/2201a/cw6768-010_01.jpg?_ex=128x128" alt="" style={{border: "medium", width: "100%", height: "100%", objectFit: "cover"}} />
                  </a>
                  <img src="//i.moshimo.com/af/i/impression?a_id=5122395&amp;p_id=54&amp;pc_id=54&amp;pl_id=616" alt="" loading="lazy" width="1" height="1" style={{border: "0px"}} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">洋服</h3>
              <p className="text-sm text-gray-700 mb-2">（参考価格帯：¥5,000〜¥20,000）</p>
              <p className="text-gray-600 mb-4">
                トップス、ボトムス、アウターなど、<span className="font-semibold text-red-600">普段着にプラス</span>できる実用的なギフト。
              </p>
              <Link 
                href="/events/birthday/chat?category=洋服&target=恋人"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-center block mb-3"
              >
                🤖 AI相談で選ぶ
              </Link>
              <div className="flex gap-2 justify-center">
                <Link href="/api/out?mall=rakuten&brand=洋服 ファッション" className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">楽天</Link>
                <Link href="/api/out?mall=amazon&brand=洋服 ファッション" className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors">Amazon</Link>
                <Link href="/api/out?mall=yahoo&brand=洋服 ファッション" className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors">Yahoo</Link>
              </div>
            </div>
          </div>

          {/* 価格帯ガイド */}
          <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">💰 価格帯の目安</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Link href="/events/under-construction?price=low" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-yellow-600">¥3k〜¥5k</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">交際半年以内</h3>
                <p className="text-gray-600 text-sm">マグ・ハンドクリーム・スイーツギフト</p>
                <p className="mt-2 text-xs font-semibold text-yellow-700">工事中</p>
              </Link>
              <Link href="/events/under-construction?price=mid" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-orange-600">¥5k〜¥10k</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">1年以上</h3>
                <p className="text-gray-600 text-sm">ペア小物・アクセ・アロマ系</p>
                <p className="mt-2 text-xs font-semibold text-orange-700">工事中</p>
              </Link>
              <Link href="/events/under-construction?price=high" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-red-600">¥10k〜¥20k</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">長く付き合っている</h3>
                <p className="text-gray-600 text-sm">ペアウォッチ・旅行体験・ブランド品</p>
                <p className="mt-2 text-xs font-semibold text-red-700">工事中</p>
              </Link>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600">春</h3>
                <p className="text-gray-600 text-sm">桜スイーツ、春限定フレグランス</p>
              </Link>
              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">☀️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600">夏</h3>
                <p className="text-gray-600 text-sm">冷感グッズ、アウトドア小物</p>
              </Link>
              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍂</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600">秋</h3>
                <p className="text-gray-600 text-sm">栗・芋スイーツ、温かい飲み物</p>
              </Link>
              <Link href="/events/under-construction" className="text-center group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">❄️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600">冬</h3>
                <p className="text-gray-600 text-sm">あったか小物、鍋セット</p>
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
                href="/events/birthday/father" 
                className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">実父へのプレゼント</h3>
                <p className="text-gray-600 text-sm">健康・趣味・実用品など、父への感謝を込めたギフト選び</p>
              </Link>

              <Link 
                href="/gift/couple/christmas" 
                className="block bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">恋人のクリスマスプレゼント</h3>
                <p className="text-gray-600 text-sm">ペア小物から思い出作りまで、完全ガイド</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
