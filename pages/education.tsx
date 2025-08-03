import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Education() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header 
        title="Future Leaders - 教育・習い事ガイド" 
        description="世界で輝く子どもの未来を創る、富裕層ファミリーのための教育情報"
      />
      
      {/* ヒーローセクション */}
      <section className="relative h-[60vh] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wide">
              世界で輝く子どもの未来を創る
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto px-4">
              グローバルエリートを目指す富裕層ファミリーのための教育情報
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-100 to-transparent"></div>
      </section>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* 教育・スクールセクション */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              教育・スクール
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* インターナショナルスクール */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-blue-600 to-purple-700">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                    <h3 className="text-2xl font-bold">インターナショナルスクール</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  東京インターナショナルスクール比較
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  カリキュラム・学費・進学実績を徹底比較。世界トップ大学への進学実績を持つ名門校をご紹介。
                </p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                  詳細を見る
                </button>
              </div>
            </div>

            {/* ボーディングスクール */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-emerald-600 to-teal-700">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd"/>
                      <path fillRule="evenodd" d="M8 8a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                    <h3 className="text-2xl font-bold">ボーディングスクール</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  海外ボーディングスクール特集
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  スイス・英国など名門校への留学ガイド。世界のエリートが集う最高峰の教育環境をご案内。
                </p>
                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 px-6 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105">
                  詳細を見る
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* おすすめ記事セクション */}
        <section className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              おすすめ記事：家族旅行も一緒に
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          </div>
          <p className="text-xl text-slate-200 text-center mb-8 max-w-3xl mx-auto">
            留学準備や習い事の合間に、家族で楽しめる高級リゾートをご紹介。
            教育投資と家族の時間を両立させる贅沢な体験をお届けします。
          </p>
          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
              家族旅行特集を見る
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
} 