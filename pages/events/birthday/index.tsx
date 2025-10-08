import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function BirthdayGiftsPage() {
  return (
    <>
      <Header 
        title="誕生日プレゼント特集 - Market Supporter AI" 
        description="30代以上の子どもから両親・義理の両親への誕生日プレゼント選び。感謝の気持ちを込めたギフト選びをサポートします。"
      />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* ヒーローセクション */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              誕生日プレゼント特集
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              30代以上の子どもから両親・義理の両親への誕生日プレゼント選び。<br />
              感謝の気持ちを込めたギフト選びをサポートします。
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">🎯 こんな方におすすめ</h2>
              <p className="text-blue-800">
                両親の誕生日に何を贈ればいいか悩んでいる方<br />
                義理の両親へのプレゼント選びに困っている方<br />
                健康を気遣うギフトを探している方
              </p>
            </div>
          </div>

          {/* カテゴリ一覧 */}
          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {/* 実母向け */}
            <Link 
              href="/events/birthday/mother" 
              className="group block bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  実母へのプレゼント
                </h3>
                <p className="text-gray-600 text-sm">
                  美容・癒し・食・花・思い出系など、母への感謝を込めたギフト選び
                </p>
              </div>
            </Link>

            {/* 実父向け */}
            <Link 
              href="/events/birthday/father" 
              className="group block bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  実父へのプレゼント
                </h3>
                <p className="text-gray-600 text-sm">
                  健康・趣味・実用品など、父への感謝を込めたギフト選び
                </p>
              </div>
            </Link>

            {/* 義母向け */}
            <Link 
              href="/events/birthday/mother-in-law" 
              className="group block bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  義母へのプレゼント
                </h3>
                <p className="text-gray-600 text-sm">
                  センス良い×無難な観点で選ぶ、義理の母へのギフト選び
                </p>
              </div>
            </Link>

            {/* 義父向け */}
            <Link 
              href="/events/birthday/father-in-law" 
              className="group block bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  義父へのプレゼント
                </h3>
                <p className="text-gray-600 text-sm">
                  堅すぎず気が利いた、義理の父へのギフト選び
                </p>
              </div>
            </Link>
          </div>

          {/* 特集セクション */}
          <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🎁 特集ギフト</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Link 
                href="/events/birthday/health-gifts" 
                className="group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                  健康を気遣うギフト10選
                </h3>
                <p className="text-gray-600 text-sm">
                  両親の健康を願う、実用的で喜ばれるギフトを厳選
                </p>
              </Link>

              <Link 
                href="/events/birthday/remote-gifts" 
                className="group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                  遠方の親に喜ばれる郵送ギフト
                </h3>
                <p className="text-gray-600 text-sm">
                  離れて暮らす両親に、心を込めたギフトを郵送
                </p>
              </Link>

              <Link 
                href="/events/birthday/seasonal" 
                className="group block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                  季節別おすすめギフト
                </h3>
                <p className="text-gray-600 text-sm">
                  春・夏・秋・冬の季節感を活かしたギフト選び
                </p>
              </Link>
            </div>
          </div>

          {/* 予算別ガイド */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">💰 予算別ギフトガイド</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-yellow-600">¥3,000</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">手軽なギフト</h3>
                <p className="text-gray-600 text-sm">
                  お菓子・お茶・小物など、気軽に贈れるギフト
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-orange-600">¥5,000</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">定番ギフト</h3>
                <p className="text-gray-600 text-sm">
                  花・グルメ・健康グッズなど、定番で喜ばれるギフト
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-red-600">¥10,000</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">特別なギフト</h3>
                <p className="text-gray-600 text-sm">
                  高級食材・体験ギフト・名入れ商品など
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
