import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Luxury() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header 
        title="Future Leaders - 富裕層ライフサービス" 
        description="富裕層ファミリーのための特別な提案、不動産・医療・移動サービス"
      />
      
      {/* ヒーローセクション */}
      <section className="relative h-[60vh] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wide">
              富裕層ファミリーのための特別な提案
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto px-4">
              最高峰のライフスタイルを実現する、選ばれた方だけの特別なサービス
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-100 to-transparent"></div>
      </section>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* 不動産・別荘セクション */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              不動産・別荘
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* 軽井沢別荘 */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-purple-600 to-pink-700">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                    <h3 className="text-2xl font-bold">別荘</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  軽井沢別荘購入ガイド
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  国内外の富裕層に人気の高級別荘エリア。四季折々の美しさと最高のセキュリティ環境。
                </p>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                  資料請求
                </button>
              </div>
            </div>

            {/* 海外不動産 */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-amber-600 to-orange-700">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <h3 className="text-2xl font-bold">海外不動産</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  海外高級不動産投資
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  ロンドン、ニューヨーク、香港の高級物件。資産価値とライフスタイルを両立する投資物件。
                </p>
                <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 px-6 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105">
                  資料請求
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 医療ツーリズムセクション */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              医療ツーリズム
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* 幹細胞治療 */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-emerald-600 to-teal-700">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                    <h3 className="text-2xl font-bold">再生医療</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  幹細胞治療・再生医療
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  最先端医療を日本滞在中に体験。アンチエイジングと健康維持のための革新的な治療。
                </p>
                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 px-6 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105">
                  相談する
                </button>
              </div>
            </div>

            {/* プレミアム健診 */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-blue-600 to-indigo-700">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <h3 className="text-2xl font-bold">プレミアム健診</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  プレミアム健康診断
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  完全個室での最高峰の健康診断。最新機器と専門医による徹底的な健康チェック。
                </p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                  相談する
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 移動サービスセクション */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              移動サービス
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-slate-600 to-gray-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* プライベートジェット */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-slate-600 to-gray-700">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                    <h3 className="text-2xl font-bold">プライベートジェット</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  プライベートジェット手配
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  家族だけの快適な空の旅を実現。専用クルーと最高峰のサービスで特別な体験を。
                </p>
                <button className="w-full bg-gradient-to-r from-slate-600 to-gray-600 text-white font-bold py-3 px-6 rounded-xl hover:from-slate-700 hover:to-gray-700 transition-all duration-300 transform hover:scale-105">
                  見積もり依頼
                </button>
              </div>
            </div>

            {/* リムジンサービス */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-red-600 to-pink-700">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                    <h3 className="text-2xl font-bold">リムジン</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  プレミアムリムジンサービス
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  最高級のリムジンで特別な移動を。専属ドライバーと最高峰の車両で贅沢な時間を。
                </p>
                <button className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                  見積もり依頼
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 特別提案セクション */}
        <section className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              完全オーダーメイドサービス
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>
          <p className="text-xl text-slate-200 text-center mb-8 max-w-3xl mx-auto">
            お客様一人ひとりのニーズに合わせた完全カスタマイズサービス。富裕層ファミリーだけの特別な体験を提供します。
          </p>
          <div className="text-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
              カスタムプラン相談
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
} 