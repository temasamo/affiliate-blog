import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

// コンシェルジュAI用の質問フロー
const conciergeQuestions = [
  {
    id: "target",
    question: "プレゼントを贈る相手は誰ですか？",
    type: "select",
    options: ["実父", "実母", "義父", "義母", "恋人", "兄弟姉妹", "子供"]
  },
  {
    id: "occasion", 
    question: "どんな機会のプレゼントですか？",
    type: "select",
    options: ["誕生日", "記念日", "お礼", "その他"]
  },
  {
    id: "freeText",
    question: "相手のことを教えてください（年齢、趣味、普段の様子など）",
    type: "freeText",
    placeholder: "例：50代の父で、最近は家で過ごすことが多いです..."
  },
  {
    id: "history",
    question: "これまでにプレゼントした経験はありますか？",
    type: "freeText", 
    placeholder: "例：昨年はワインを贈りましたが、あまり喜んでくれませんでした..."
  },
  {
    id: "budget",
    question: "予算はどのくらいですか？",
    type: "select",
    options: ["3,000円未満", "3,000-8,000円", "8,000-15,000円", "15,000円以上"]
  }
];

// キーワード分析によるカテゴリ提案
const analyzeConversation = (responses: Record<string, string>) => {
  const text = (responses.freeText || "") + " " + (responses.history || "");
  const target = responses.target || "";
  const budget = responses.budget || "";
  
  // より詳細なキーワード分析
  const keywords = {
    // 生活スタイル関連
    "家で過ごす": { categories: ["ルームウェア", "家電", "趣味グッズ"], weight: 2 },
    "外出": { categories: ["ファッション", "小物", "体験ギフト"], weight: 2 },
    "運動": { categories: ["スポーツグッズ", "健康グッズ", "アウトドア"], weight: 2 },
    "読書": { categories: ["本・雑誌", "文房具", "照明"], weight: 1.5 },
    
    // 年齢・性別関連
    "50代": { categories: ["実用的", "高品質", "健康グッズ"], weight: 1.5 },
    "60代": { categories: ["健康グッズ", "実用的", "高品質"], weight: 1.5 },
    "男性": { categories: ["実用的", "趣味グッズ", "家電"], weight: 1.2 },
    "女性": { categories: ["美容", "ファッション", "花"], weight: 1.2 },
    
    // 趣味・興味関連
    "料理": { categories: ["キッチン用品", "グルメ", "調理器具"], weight: 2 },
    "ガーデニング": { categories: ["園芸用品", "花", "アウトドア"], weight: 2 },
    "音楽": { categories: ["音楽関連", "体験ギフト", "家電"], weight: 1.5 },
    "映画": { categories: ["エンターテイメント", "体験ギフト", "家電"], weight: 1.5 },
    
    // 過去の経験関連
    "喜んでくれなかった": { categories: ["実用的", "日常的", "高品質"], weight: 2 },
    "喜んでくれた": { categories: ["類似カテゴリ"], weight: 1.5 },
    "使わなかった": { categories: ["実用的", "日常的"], weight: 2 },
    
    // 予算関連
    "高級": { categories: ["高級食材", "ブランド品", "体験ギフト"], weight: 1.5 },
    "手軽": { categories: ["小物", "お菓子", "文房具"], weight: 1.5 },
    
    // 健康関連
    "健康": { categories: ["健康グッズ", "マッサージ機器", "サプリメント"], weight: 2 },
    "疲れ": { categories: ["マッサージ機器", "リラックスグッズ", "健康グッズ"], weight: 2 },
    
    // 実用性関連
    "実用的": { categories: ["日常家電", "ルームウェア", "キッチン用品"], weight: 2 },
    "毎日使う": { categories: ["日常家電", "ルームウェア", "キッチン用品"], weight: 2 }
  };
  
  // カテゴリスコア計算
  const categoryScores: Record<string, number> = {};
  let reasoning = "";
  
  Object.entries(keywords).forEach(([keyword, data]) => {
    if (text.includes(keyword)) {
      data.categories.forEach(category => {
        categoryScores[category] = (categoryScores[category] || 0) + data.weight;
      });
    }
  });
  
  // ターゲット別の重み付け
  const targetWeights: Record<string, Record<string, number>> = {
    "実父": { "実用的": 1.5, "健康グッズ": 1.3, "趣味グッズ": 1.2, "家電": 1.2 },
    "実母": { "美容": 1.3, "花": 1.2, "キッチン用品": 1.2, "リラックスグッズ": 1.2 },
    "義父": { "実用的": 1.4, "高品質": 1.3, "健康グッズ": 1.2 },
    "義母": { "センス良い": 1.3, "高品質": 1.2, "花": 1.2 },
    "恋人": { "ファッション": 1.4, "体験ギフト": 1.3, "小物": 1.2 },
    "兄弟姉妹": { "趣味グッズ": 1.3, "体験ギフト": 1.2, "実用的": 1.1 },
    "子供": { "おもちゃ": 1.5, "学習用品": 1.3, "スポーツ用品": 1.2 }
  };
  
  if (targetWeights[target]) {
    Object.entries(targetWeights[target]).forEach(([category, weight]) => {
      if (categoryScores[category]) {
        categoryScores[category] *= weight;
      }
    });
  }
  
  // 予算別の重み付け
  if (budget.includes("3,000円未満")) {
    categoryScores["小物"] = (categoryScores["小物"] || 0) + 1;
    categoryScores["お菓子"] = (categoryScores["お菓子"] || 0) + 1;
  } else if (budget.includes("15,000円以上")) {
    categoryScores["高級食材"] = (categoryScores["高級食材"] || 0) + 1;
    categoryScores["体験ギフト"] = (categoryScores["体験ギフト"] || 0) + 1;
  }
  
  // スコア順にソート
  const sortedCategories = Object.entries(categoryScores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([category]) => category);
  
  // 推論理由の生成
  if (text.includes("喜んでくれなかった")) {
    reasoning = "過去のプレゼントが不評だったので、より実用的で日常的に使えるものをおすすめします";
  } else if (text.includes("家で過ごす")) {
    reasoning = "家で過ごす時間が多い方なので、リラックスや快適さを重視したギフトが良さそうです";
  } else if (text.includes("健康")) {
    reasoning = "健康を気遣う方なので、健康関連のグッズが喜ばれそうです";
  } else if (target === "実父") {
    reasoning = "実父には実用性と品質を重視したギフトがおすすめです";
  } else if (target === "実母") {
    reasoning = "実母には美容や癒しを重視したギフトがおすすめです";
  } else {
    reasoning = "会話内容から、相手の好みに合ったギフトを提案します";
  }
  
  return {
    recommendedCategories: sortedCategories,
    reasoning: reasoning
  };
};

// 動的商品推薦
const generateConciergeSuggestions = (responses: Record<string, string>, category: string) => {
  const suggestions = [];
  const target = responses.target || "";
  const budget = responses.budget || "";
  const freeText = responses.freeText || "";
  const history = responses.history || "";
  
  // カテゴリ別の商品データベース
  const productDatabase: { [key: string]: Array<{ name: string; reason: string; priceRange: string; keywords: string[] }> } = {
    "ルームウェア": [
      { name: "tential ドライロングパジャマ", reason: "吸水性・速乾性に優れた快適なパジャマ", priceRange: "¥5,000〜¥12,000", keywords: ["快適", "吸水性", "速乾"] },
      { name: "高級綿パジャマセット", reason: "上質な綿素材で肌触り抜群", priceRange: "¥8,000〜¥15,000", keywords: ["高級", "綿", "肌触り"] },
      { name: "メンズ快適部屋着セット", reason: "家で過ごす時間を快適にするルームウェア", priceRange: "¥4,000〜¥10,000", keywords: ["快適", "部屋着", "リラックス"] }
    ],
    "健康グッズ": [
      { name: "マッサージチェア", reason: "疲れを癒す本格的なマッサージ機能", priceRange: "¥15,000〜¥50,000", keywords: ["マッサージ", "疲労回復", "リラックス"] },
      { name: "血圧計", reason: "健康管理に欠かせない血圧測定器", priceRange: "¥3,000〜¥8,000", keywords: ["健康", "血圧", "測定"] },
      { name: "温熱マッサージ器", reason: "温熱効果で血行促進", priceRange: "¥5,000〜¥12,000", keywords: ["温熱", "血行", "マッサージ"] }
    ],
    "家電": [
      { name: "電気ケトル", reason: "お湯を簡単に沸かせる便利家電", priceRange: "¥3,000〜¥8,000", keywords: ["お湯", "便利", "キッチン"] },
      { name: "空気清浄機", reason: "空気をきれいにして健康をサポート", priceRange: "¥8,000〜¥20,000", keywords: ["空気", "健康", "清浄"] },
      { name: "コーヒーメーカー", reason: "美味しいコーヒーを自宅で", priceRange: "¥5,000〜¥15,000", keywords: ["コーヒー", "美味しい", "自宅"] }
    ],
    "美容": [
      { name: "エステ機器", reason: "自宅で本格的なエステ体験", priceRange: "¥8,000〜¥20,000", keywords: ["エステ", "美容", "自宅"] },
      { name: "高級化粧品セット", reason: "上質なスキンケアで美肌をサポート", priceRange: "¥5,000〜¥15,000", keywords: ["化粧品", "スキンケア", "美肌"] },
      { name: "ヘアケアセット", reason: "美しい髪を保つヘアケア用品", priceRange: "¥3,000〜¥8,000", keywords: ["ヘアケア", "美髪", "ケア"] }
    ],
    "花": [
      { name: "季節の花束", reason: "季節感あふれる美しい花束", priceRange: "¥3,000〜¥8,000", keywords: ["季節", "美しい", "花束"] },
      { name: "観葉植物", reason: "長く楽しめる緑のインテリア", priceRange: "¥2,000〜¥6,000", keywords: ["観葉植物", "インテリア", "長期間"] },
      { name: "プリザーブドフラワー", reason: "長期間美しさを保つ特別な花", priceRange: "¥5,000〜¥12,000", keywords: ["プリザーブド", "長期間", "特別"] }
    ],
    "グルメ": [
      { name: "高級和菓子セット", reason: "上質な和菓子で特別な時間を", priceRange: "¥3,000〜¥8,000", keywords: ["和菓子", "高級", "特別"] },
      { name: "ワインセット", reason: "厳選されたワインで贅沢な時間を", priceRange: "¥5,000〜¥15,000", keywords: ["ワイン", "厳選", "贅沢"] },
      { name: "チーズセット", reason: "世界各国のチーズを楽しむ", priceRange: "¥4,000〜¥10,000", keywords: ["チーズ", "世界各国", "楽しむ"] }
    ],
    "体験ギフト": [
      { name: "温泉旅行券", reason: "心身ともにリフレッシュできる温泉旅行", priceRange: "¥10,000〜¥30,000", keywords: ["温泉", "旅行", "リフレッシュ"] },
      { name: "料理教室体験", reason: "新しい料理を学ぶ楽しい体験", priceRange: "¥5,000〜¥12,000", keywords: ["料理", "学習", "体験"] },
      { name: "コンサートチケット", reason: "音楽で心豊かな時間を過ごす", priceRange: "¥8,000〜¥20,000", keywords: ["音楽", "コンサート", "心豊か"] }
    ]
  };
  
  // カテゴリに基づく基本提案
  if (productDatabase[category]) {
    suggestions.push(...productDatabase[category]);
  }
  
  // 過去履歴を考慮した提案
  if (history.includes("ワイン") && history.includes("喜んでくれなかった")) {
    suggestions.unshift({
      name: "tential ドライロングパジャマ",
      reason: "過去にワインで不評だったので、実用的なルームウェアはいかがでしょうか？",
      matchScore: 0.9,
      priceRange: "¥5,000〜¥12,000",
      keywords: ["実用的", "ルームウェア", "快適"]
    });
  }
  
  // 年齢・性別を考慮した提案
  if (freeText.includes("50代") && freeText.includes("父")) {
    suggestions.unshift({
      name: "高級綿パジャマセット", 
      reason: "50代の男性に人気の実用的なギフトです",
      matchScore: 0.85,
      priceRange: "¥8,000〜¥15,000",
      keywords: ["50代", "男性", "実用的"]
    });
  }
  
  // 予算に基づくフィルタリング
  let filteredSuggestions = suggestions;
  if (budget.includes("3,000円未満")) {
    filteredSuggestions = suggestions.filter(s => 
      s.priceRange.includes("¥2,000") || s.priceRange.includes("¥3,000")
    );
  } else if (budget.includes("3,000-8,000円")) {
    filteredSuggestions = suggestions.filter(s => 
      s.priceRange.includes("¥3,000") || s.priceRange.includes("¥4,000") || 
      s.priceRange.includes("¥5,000") || s.priceRange.includes("¥6,000") ||
      s.priceRange.includes("¥8,000")
    );
  } else if (budget.includes("8,000-15,000円")) {
    filteredSuggestions = suggestions.filter(s => 
      s.priceRange.includes("¥8,000") || s.priceRange.includes("¥10,000") ||
      s.priceRange.includes("¥12,000") || s.priceRange.includes("¥15,000")
    );
  } else if (budget.includes("15,000円以上")) {
    filteredSuggestions = suggestions.filter(s => 
      s.priceRange.includes("¥15,000") || s.priceRange.includes("¥20,000") ||
      s.priceRange.includes("¥30,000") || s.priceRange.includes("¥50,000")
    );
  }
  
  // ターゲット別の重み付け
  const targetPreferences: Record<string, string[]> = {
    "実父": ["実用的", "健康", "高品質", "家電"],
    "実母": ["美容", "花", "リラックス", "キッチン"],
    "義父": ["実用的", "高品質", "健康"],
    "義母": ["センス良い", "高品質", "花"],
    "恋人": ["ファッション", "体験", "小物"],
    "兄弟姉妹": ["趣味", "体験", "実用的"],
    "子供": ["おもちゃ", "学習", "スポーツ"]
  };
  
  if (targetPreferences[target]) {
    filteredSuggestions = filteredSuggestions.sort((a, b) => {
      const aScore = targetPreferences[target].reduce((score, keyword) => 
        score + (a.keywords?.includes(keyword) ? 1 : 0), 0);
      const bScore = targetPreferences[target].reduce((score, keyword) => 
        score + (b.keywords?.includes(keyword) ? 1 : 0), 0);
      return bScore - aScore;
    });
  }
  
  return filteredSuggestions.slice(0, 3);
};

export default function ConciergeAI() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recommendedCategories, setRecommendedCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleAnswer = (questionId: string, answer: string) => {
    const newResponses = { ...responses, [questionId]: answer };
    setResponses(newResponses);
    
    if (currentStep < conciergeQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 全質問完了後、カテゴリ分析
      const analysis = analyzeConversation(newResponses);
      setRecommendedCategories(analysis.recommendedCategories);
      setShowSuggestions(true);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const newSuggestions = generateConciergeSuggestions(responses, category);
    setSuggestions(newSuggestions);
  };

  const resetConversation = () => {
    setCurrentStep(0);
    setResponses({});
    setShowSuggestions(false);
    setRecommendedCategories([]);
    setSelectedCategory("");
    setSuggestions([]);
  };

  return (
    <>
      <Head>
        <title>プレゼントコンシェルジュAI | Market Supporter AI</title>
        <meta name="description" content="AIがあなたにぴったりのプレゼントを見つけます。会話形式で簡単に最適なギフトを提案。" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🎁 プレゼントコンシェルジュAI
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              AIがあなたにぴったりのプレゼントを見つけましょう
            </p>
            
            {/* パンくずリスト */}
            <nav className="flex justify-center mb-6">
              <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-blue-600">ホーム</Link></li>
                <li>/</li>
                <li><Link href="/events" className="hover:text-blue-600">イベント</Link></li>
                <li>/</li>
                <li><Link href="/events/birthday" className="hover:text-blue-600">誕生日プレゼント</Link></li>
                <li>/</li>
                <li className="text-gray-900">コンシェルジュAI</li>
              </ol>
            </nav>
          </div>

          {/* チャットエリア */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              {/* 進捗バー */}
              {!showSuggestions && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>質問 {currentStep + 1} / {conciergeQuestions.length}</span>
                    <span>{Math.round(((currentStep + 1) / conciergeQuestions.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / conciergeQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* 質問エリア */}
              {!showSuggestions && currentStep < conciergeQuestions.length && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {conciergeQuestions[currentStep].question}
                    </h3>
                    
                    {conciergeQuestions[currentStep].type === "select" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {conciergeQuestions[currentStep].options?.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswer(conciergeQuestions[currentStep].id, option)}
                            className="p-3 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <textarea
                          placeholder={conciergeQuestions[currentStep].placeholder}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={4}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              const value = (e.target as HTMLTextAreaElement).value.trim();
                              if (value) {
                                handleAnswer(conciergeQuestions[currentStep].id, value);
                              }
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
                            const value = textarea?.value.trim();
                            if (value) {
                              handleAnswer(conciergeQuestions[currentStep].id, value);
                            }
                          }}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          次へ
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* カテゴリ提案エリア */}
              {showSuggestions && !selectedCategory && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      🤖 AI分析結果
                    </h3>
                    <p className="text-gray-600 mb-6">
                      あなたの回答を分析した結果、以下のカテゴリがおすすめです
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommendedCategories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleCategorySelect(category)}
                        className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">{category}</h4>
                        <p className="text-sm text-gray-600">AIがおすすめ</p>
                      </button>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <button
                      onClick={resetConversation}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      最初からやり直す
                    </button>
                  </div>
                </div>
              )}

              {/* 商品提案エリア */}
              {showSuggestions && selectedCategory && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      🎯 {selectedCategory}のおすすめ
                    </h3>
                    <p className="text-gray-600 mb-6">
                      あなたの要望に合った商品をご提案します
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{suggestion.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{suggestion.reason}</p>
                        <p className="text-sm font-medium text-blue-600 mb-4">{suggestion.priceRange}</p>
                        <div className="flex gap-2">
                          <Link
                            href="/api/out?mall=rakuten&brand=プレゼント"
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                          >
                            楽天
                          </Link>
                          <Link
                            href="/api/out?mall=amazon&brand=プレゼント"
                            className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                          >
                            Amazon
                          </Link>
                          <Link
                            href="/api/out?mall=yahoo&brand=プレゼント"
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                          >
                            Yahoo
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center space-x-4">
                    <button
                      onClick={() => setSelectedCategory("")}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      カテゴリを変更
                    </button>
                    <button
                      onClick={resetConversation}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      最初からやり直す
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 説明エリア */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                🤖 コンシェルジュAIについて
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">✨ 特徴</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 会話形式で自然に要望を聞き取り</li>
                    <li>• 過去のプレゼント履歴を考慮</li>
                    <li>• AI分析による最適なカテゴリ提案</li>
                    <li>• 個別にカスタマイズされた商品推薦</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🎯 こんな方におすすめ</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 何をプレゼントすべきか迷っている</li>
                    <li>• 相手の好みがよくわからない</li>
                    <li>• 過去のプレゼントが不評だった</li>
                    <li>• 新しいアイデアが欲しい</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
