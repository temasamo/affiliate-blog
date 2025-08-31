'use client';
import { useState, useEffect } from 'react';
import OutboundLink from './OutboundLink';

interface DiagnosisResultProps {
  sessionId: string;
  primaryCategory: string;
  secondaryCategories: string[];
  confidence: number;
  reasons: string[];
  scores: Record<string, number>;
}

export default function DiagnosisResult({
  sessionId,
  primaryCategory,
  secondaryCategories,
  confidence,
  reasons,
  scores
}: DiagnosisResultProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // アニメーション用の遅延
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getCategoryDisplayName = (category: string) => {
    const categoryNames: Record<string, string> = {
      adjustable: '高さ調整可能',
      side_sleep: '横向き寝対応',
      breathable: '通気性重視',
      washable: '洗濯可能',
      hotel: 'ホテル級',
      low_rebound: '低反発'
    };
    return categoryNames[category] || category;
  };

  const getAffiliateUrls = (category: string) => {
    const baseUrls = {
      rakuten: 'https://search.rakuten.co.jp/search/mall/',
      yahoo: 'https://shopping.yahoo.co.jp/search?p=',
      amazon: 'https://www.amazon.co.jp/s?k='
    };

    const searchTerms = {
      adjustable: '枕+高さ調整',
      side_sleep: '枕+横向き',
      breathable: '枕+通気性',
      washable: '枕+洗濯可能',
      hotel: '枕+ホテル',
      low_rebound: '枕+低反発'
    };

    const term = searchTerms[category as keyof typeof searchTerms] || '枕';
    
    return {
      rakuten: `${baseUrls.rakuten}${encodeURIComponent(term)}`,
      yahoo: `${baseUrls.yahoo}${encodeURIComponent(term)}`,
      amazon: `${baseUrls.amazon}${encodeURIComponent(term)}`
    };
  };

  const urls = getAffiliateUrls(primaryCategory);

  return (
    <div className={`max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      <h2 className="text-2xl font-bold mb-4 text-center">診断結果</h2>
      
      {/* プライマリカテゴリ */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">おすすめの枕タイプ</h3>
        <p className="text-xl font-bold text-blue-900">
          {getCategoryDisplayName(primaryCategory)}
        </p>
        <p className="text-sm text-blue-600 mt-1">
          信頼度: {Math.round(confidence * 100)}%
        </p>
      </div>

      {/* セカンダリカテゴリ */}
      {secondaryCategories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">その他のおすすめ</h3>
          <div className="flex flex-wrap gap-2">
            {secondaryCategories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {getCategoryDisplayName(category)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 理由 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">おすすめの理由</h3>
        <ul className="space-y-2">
          {reasons.map((reason, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* スコア表示 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">診断スコア</h3>
        <div className="space-y-2">
          {Object.entries(scores)
            .sort(([,a], [,b]) => b - a)
            .map(([category, score]) => (
              <div key={category} className="flex items-center">
                <span className="w-32 text-sm text-gray-600">
                  {getCategoryDisplayName(category)}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (score / 10) * 100)}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-8">{score}</span>
              </div>
            ))}
        </div>
      </div>

      {/* アフィリエイトリンク */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3">商品を探す</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <OutboundLink
            partner="rakuten"
            sessionId={sessionId}
            href={urls.rakuten}
            className="block w-full bg-red-500 hover:bg-red-600 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
          >
            楽天で探す
          </OutboundLink>
          <OutboundLink
            partner="yahoo"
            sessionId={sessionId}
            href={urls.yahoo}
            className="block w-full bg-purple-500 hover:bg-purple-600 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
          >
            Yahoo!ショッピング
          </OutboundLink>
          <OutboundLink
            partner="amazon"
            sessionId={sessionId}
            href={urls.amazon}
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
          >
            Amazonで探す
          </OutboundLink>
        </div>
      </div>

      {/* 再診断ボタン */}
      <div className="text-center">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          再診断する
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-400">
        Session ID: {sessionId}
      </div>
    </div>
  );
} 