import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function EventsPage() {
  return (
    <>
      <Header 
        title="イベント - Market Supporter AI" 
        description="季節のイベントや誕生日プレゼントなど、特別な日に役立つ情報をお届けします。"
      />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* ヒーローセクション */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              イベント
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              季節のイベントや誕生日プレゼントなど、特別な日に役立つ情報をお届けします。
            </p>
          </div>

          {/* カテゴリ一覧 */}
          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* 季節のイベント */}
            <Link 
              href="/articles/events/seasonal/new-year/osechi" 
              className="group block bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  季節のイベント
                </h3>
                <p className="text-gray-600">
                  お正月、バレンタイン、母の日、父の日、クリスマスなど、季節に合わせたイベント情報
                </p>
              </div>
            </Link>

            {/* 誕生日プレゼント */}
            <Link 
              href="/events/birthday" 
              className="group block bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  誕生日プレゼント
                </h3>
                <p className="text-gray-600">
                  お母さん、お父さん、お子さん向けの誕生日プレゼントアイデアとおすすめ商品
                </p>
              </div>
            </Link>

            {/* 特別なイベント */}
            <Link 
              href="/events/under-construction" 
              className="group block bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  特別なイベント
                </h3>
                <p className="text-gray-600">
                  卒業、結婚、記念日など、人生の特別な瞬間を彩るアイデアとおすすめ商品
                </p>
              </div>
            </Link>
          </div>

          {/* 新着記事セクション */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              新着イベント記事
            </h2>
            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* おせち記事 */}
              <Link 
                href="/articles/events/seasonal/new-year/osechi" 
                className="group block bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-red-50 to-orange-50">
                  <div className="flex items-center justify-center">
                    <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center rounded-full border border-gray-300 px-2.5 py-1 text-xs font-medium bg-gray-50 text-gray-700">
                      イベント
                    </span>
                    <time className="text-xs text-gray-500" dateTime="2025-10-01">
                      2025-10-01
                    </time>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    2025年おせち料理の選び方とおすすめ商品
                  </h3>
                  <p className="text-gray-600 text-sm">
                    新年を迎えるおせち料理の歴史、選び方、人気商品を紹介。通販で購入できるおすすめおせちを厳選しました。
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
