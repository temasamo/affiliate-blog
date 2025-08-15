import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Travel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header 
        title="Future Leaders - 家族旅行・リゾート" 
        description="家族で楽しむラグジュアリーリゾート、富裕層ファミリーのための特別な旅"
      />
      
      {/* ヒーローセクション */}
      <section className="relative h-[60vh] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-teal-900/30"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wide">
              家族で楽しむラグジュアリーリゾート
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto px-4">
              世界最高峰のホスピタリティで家族の絆を深める特別な体験
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-100 to-transparent"></div>
      </section>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* 国内リゾートセクション */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              国内リゾート
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* ニセコスキーリゾート */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-emerald-600 to-teal-700">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                    </svg>
                    <h3 className="text-2xl font-bold">スキーリゾート</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  ニセコラグジュアリースキー
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  世界的に人気の高級スキーリゾート。プライベートレッスンと専用ゲレンデで最高のスキー体験を。
                </p>
                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 px-6 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105">
                  予約する
                </button>
              </div>
            </div>

            {/* 軽井沢・箱根ホテル */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-amber-600 to-orange-700">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <h3 className="text-2xl font-bold">高級ホテル</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  軽井沢・箱根の高級ホテル
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  四季折々の美しさを楽しめるラグジュアリーステイ。温泉と美食で至福の時間をお過ごしください。
                </p>
                <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 px-6 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105">
                  予約する
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 海外リゾートセクション */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              海外リゾート
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* マルディブ */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-blue-600 to-cyan-700">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                    <h3 className="text-2xl font-bold">オーバーウォーター</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  マルディブ・オーバーウォーター
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  世界最高峰のオーバーウォーターヴィラ。プライベートプールと専用バトラーで究極の贅沢を。
                </p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
                  予約する
                </button>
              </div>
            </div>

            {/* スイスアルプス */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-slate-600 to-gray-700">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <h3 className="text-2xl font-bold">アルプス</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  スイスアルプス・高級山荘
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  ヨーロッパ最高峰の山岳リゾート。プライベートスキー場とヘリコプターアクセスで特別な体験を。
                </p>
                <button className="w-full bg-gradient-to-r from-slate-600 to-gray-600 text-white font-bold py-3 px-6 rounded-xl hover:from-slate-700 hover:to-gray-700 transition-all duration-300 transform hover:scale-105">
                  予約する
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 特別提案セクション */}
        <section className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              特別提案：滞在をより豊かに
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto"></div>
          </div>
          <p className="text-xl text-slate-200 text-center mb-8 max-w-3xl mx-auto">
            滞在先で別荘購入や医療ツーリズム体験も可能。旅行を超えた投資とライフスタイルの提案をお届けします。
          </p>
          <div className="text-center">
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 px-8 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105">
              富裕層向けサービスを見る
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
} 