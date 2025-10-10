import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SkincareGiftChatUI from '../../../components/SkincareGiftChatUI';

const MotherV2Page: React.FC = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Head>
        <title>実母へのプレゼント相談 AI - バージョン2 | Market Supporter AI</title>
        <meta name="description" content="実母へのプレゼント選びをAIがサポート。年齢・好み・予算に合わせた最適なギフト提案をします。" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              実母へのプレゼント相談 AI
            </h1>
            <p className="text-gray-600">バージョン2 - 新システム</p>
            <div className="mt-2">
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                A1: スキンケアギフト対応
              </span>
            </div>
          </div>

          {!selectedCategory ? (
            /* カテゴリ選択 */
            <div className="max-w-4xl mx-auto mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => handleCategorySelect('skincare')}
                >
                  <div className="text-4xl mb-4">🧴</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    スキンケアギフト
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    年齢肌に寄り添う上質なスキンケアギフト
                  </p>
                  <div className="text-xs text-green-600 font-semibold">
                    ✓ 対応済み
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer opacity-50">
                  <div className="text-4xl mb-4">🌸</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    花・フラワーギフト
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    感謝の気持ちを形に
                  </p>
                  <div className="text-xs text-gray-500">
                    開発予定
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow cursor-pointer opacity-50">
                  <div className="text-4xl mb-4">🍵</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    グルメ・ティータイム
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    おうち時間を豊かに
                  </p>
                  <div className="text-xs text-gray-500">
                    開発予定
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* AI相談エリア */
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  ← カテゴリ選択に戻る
                </button>
              </div>
              
              {selectedCategory === 'skincare' && (
                <SkincareGiftChatUI version="v2" />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MotherV2Page;