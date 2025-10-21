import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatOption {
  id: string;
  text: string;
  value: string;
}

// コンシェルジュAI用の質問フロー
const conciergeQuestions = [
  {
    id: "target",
    question: "プレゼントを贈る相手は誰ですか？",
    type: "select",
    options: [
      { id: "father", text: "実父", value: "実父" },
      { id: "mother", text: "実母", value: "実母" },
      { id: "father-in-law", text: "義父", value: "義父" },
      { id: "mother-in-law", text: "義母", value: "義母" },
      { id: "partner", text: "恋人", value: "恋人" },
      { id: "siblings", text: "兄弟姉妹", value: "兄弟姉妹" },
      { id: "children", text: "子供", value: "子供" }
    ]
  },
  {
    id: "occasion", 
    question: "どんな機会のプレゼントですか？",
    type: "select",
    options: [
      { id: "birthday", text: "誕生日", value: "誕生日" },
      { id: "anniversary", text: "記念日", value: "記念日" },
      { id: "thanks", text: "お礼", value: "お礼" },
      { id: "other", text: "その他", value: "その他" }
    ]
  },
  {
    id: "freeText",
    question: "相手のことを教えてください（年齢、趣味、普段の様子など）",
    type: "freeText",
    placeholder: "例：50代の父で、最近は家で過ごすことが多いです..."
  },
  {
    id: "preferences",
    question: "相手の好みや嫌いなものはありますか？",
    type: "freeText",
    placeholder: "例：甘いものが苦手、ブランド品は好まない、実用的なものが好き..."
  },
  {
    id: "purpose",
    question: "このプレゼントで相手にどうなってほしいですか？",
    type: "select",
    options: [
      { id: "surprise", text: "驚いてほしい", value: "驚いてほしい" },
      { id: "practical", text: "日常で使ってほしい", value: "日常で使ってほしい" },
      { id: "memorable", text: "思い出に残るもの", value: "思い出に残るもの" },
      { id: "luxury", text: "特別感を味わってほしい", value: "特別感を味わってほしい" },
      { id: "health", text: "健康になってほしい", value: "健康になってほしい" }
    ]
  },
  {
    id: "delivery",
    question: "プレゼントの形式や渡し方は希望がありますか？",
    type: "select",
    options: [
      { id: "direct", text: "直接手渡し", value: "直接手渡し" },
      { id: "surprise", text: "サプライズ", value: "サプライズ" },
      { id: "delivery", text: "配送", value: "配送" },
      { id: "experience", text: "体験型", value: "体験型" }
    ]
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
    options: [
      { id: "low", text: "3,000円未満", value: "3,000円未満" },
      { id: "medium", text: "3,000-8,000円", value: "3,000-8,000円" },
      { id: "high", text: "8,000-15,000円", value: "8,000-15,000円" },
      { id: "premium", text: "15,000円以上", value: "15,000円以上" }
    ]
  }
];

// キーワード分析によるカテゴリ提案
const analyzeConversation = (responses: Record<string, string>) => {
  const text = (responses.freeText || "") + " " + (responses.history || "") + " " + (responses.preferences || "");
  const target = responses.target || "";
  const budget = responses.budget || "";
  const purpose = responses.purpose || "";
  const delivery = responses.delivery || "";
  
  // より詳細なキーワード分析
  const keywords = {
    // 生活スタイル関連
    "家で過ごす": { categories: ["ルームウェア", "家電", "趣味グッズ"], weight: 2 },
    "外出": { categories: ["ファッション", "小物", "体験ギフト"], weight: 2 },
    "運動": { categories: ["スポーツグッズ", "健康グッズ", "アウトドア"], weight: 2 },
    "料理": { categories: ["キッチン用品", "グルメ", "調理器具"], weight: 2 },
    "読書": { categories: ["書籍", "文具", "読書関連グッズ"], weight: 2 },
    "音楽": { categories: ["音楽関連", "楽器", "オーディオ"], weight: 2 },
    "旅行": { categories: ["旅行用品", "体験ギフト", "アクセサリー"], weight: 2 },
    
    // 健康関連
    "健康": { categories: ["健康グッズ", "サプリメント", "フィットネス"], weight: 3 },
    "美容": { categories: ["スキンケア", "化粧品", "美容グッズ"], weight: 3 },
    "介護": { categories: ["介護用品", "健康グッズ", "安全グッズ"], weight: 3 },
    
    // 趣味関連
    "お茶": { categories: ["日本茶", "茶器", "茶道具"], weight: 3 },
    "コーヒー": { categories: ["コーヒー", "コーヒー器具", "グルメ"], weight: 3 },
    "花": { categories: ["花", "植物", "ガーデニング"], weight: 3 },
    "手芸": { categories: ["手芸用品", "工芸品", "ハンドメイド"], weight: 3 },
    
    // 年齢層別
    "50代": { categories: ["健康グッズ", "実用品", "趣味グッズ"], weight: 2 },
    "60代": { categories: ["健康グッズ", "実用品", "趣味グッズ"], weight: 2 },
    "70代": { categories: ["健康グッズ", "安全グッズ", "実用品"], weight: 2 },
  };

  // 好み分析の強化
  const preferenceKeywords = {
    "甘いもの": { avoid: ["スイーツ", "お菓子", "甘い"], prefer: ["辛い", "苦い"] },
    "ブランド品": { avoid: ["ブランド", "高級"], prefer: ["実用的", "シンプル"] },
    "実用的": { prefer: ["実用品", "日用品", "家電"], avoid: ["装飾品", "観賞用"] },
    "高級": { prefer: ["高級品", "ブランド品", "限定品"], avoid: ["安物", "大量生産"] },
    "シンプル": { prefer: ["シンプル", "ミニマル", "無印"], avoid: ["派手", "装飾的"] }
  };

  // 目的別カテゴリマッピング
  const purposeMapping: Record<string, string[]> = {
    "驚いてほしい": ["体験ギフト", "珍しいもの", "サプライズ", "限定品"],
    "日常で使ってほしい": ["実用品", "家電", "日用品", "キッチン用品"],
    "思い出に残るもの": ["体験ギフト", "写真", "記念品", "旅行用品"],
    "特別感を味わってほしい": ["高級品", "ブランド品", "限定品", "体験ギフト"],
    "健康になってほしい": ["健康グッズ", "サプリメント", "フィットネス", "医療機器"]
  };

  // 配達形式別フィルタリング
  const deliveryFilter: Record<string, string[]> = {
    "直接手渡し": ["すべての商品"],
    "サプライズ": ["小物", "アクセサリー", "体験ギフト", "花"],
    "配送": ["重いもの除外", "壊れやすいもの除外", "冷蔵が必要なもの除外"],
    "体験型": ["体験ギフト", "チケット", "予約制サービス", "旅行券"]
  };
  
  const matchedCategories: Record<string, number> = {};
  
  // キーワードマッチング
  Object.entries(keywords).forEach(([keyword, data]) => {
    if (text.includes(keyword)) {
      data.categories.forEach(category => {
        matchedCategories[category] = (matchedCategories[category] || 0) + data.weight;
      });
    }
  });

  // 好み分析の適用
  Object.entries(preferenceKeywords).forEach(([preference, data]) => {
    if (text.includes(preference)) {
      // 好きなものを優先
      data.prefer.forEach(category => {
        matchedCategories[category] = (matchedCategories[category] || 0) + 3;
      });
      // 嫌いなものを除外
      data.avoid.forEach(category => {
        if (matchedCategories[category]) {
          matchedCategories[category] = Math.max(0, matchedCategories[category] - 5);
        }
      });
    }
  });

  // 目的別の重み付け
  if (purposeMapping[purpose]) {
    purposeMapping[purpose].forEach(category => {
      matchedCategories[category] = (matchedCategories[category] || 0) + 4;
    });
  }

  // 配達形式別のフィルタリング
  if (deliveryFilter[delivery]) {
    deliveryFilter[delivery].forEach(category => {
      matchedCategories[category] = (matchedCategories[category] || 0) + 2;
    });
  }
  
  // ターゲット別の重み付け
  const targetPreferences: Record<string, string[]> = {
    "実父": ["健康グッズ", "実用品", "趣味グッズ", "グルメ"],
    "実母": ["美容", "スキンケア", "花", "キッチン用品", "日本茶"],
    "義父": ["実用品", "健康グッズ", "グルメ"],
    "義母": ["花", "スキンケア", "日本茶", "実用品"],
    "恋人": ["ファッション", "アクセサリー", "体験ギフト", "小物"],
    "兄弟姉妹": ["趣味グッズ", "体験ギフト", "実用品"],
    "子供": ["おもちゃ", "学習用品", "スポーツ用品"]
  };
  
  if (targetPreferences[target]) {
    targetPreferences[target].forEach(category => {
      matchedCategories[category] = (matchedCategories[category] || 0) + 2;
    });
  }
  
  // 予算別フィルタリング
  const budgetFilter: Record<string, string[]> = {
    "3,000円未満": ["小物", "文具", "書籍", "花"],
    "3,000-8,000円": ["実用品", "キッチン用品", "健康グッズ", "日本茶"],
    "8,000-15,000円": ["高級品", "体験ギフト", "美容", "家電"],
    "15,000円以上": ["高級品", "体験ギフト", "家電", "旅行用品"]
  };
  
  if (budgetFilter[budget]) {
    budgetFilter[budget].forEach(category => {
      matchedCategories[category] = (matchedCategories[category] || 0) + 1;
    });
  }
  
  // スコア順でソート
  return Object.entries(matchedCategories)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([category]) => category);
};

// 動的商品推薦
const generateConciergeSuggestions = (responses: Record<string, string>, category: string) => {
  const suggestions = [];
  const target = responses.target || "";
  const budget = responses.budget || "";
  const freeText = responses.freeText || "";
  
  // カテゴリ別の基本提案
  if (category === "日本茶") {
    suggestions.push({
      name: "高級日本茶セット",
      reason: "上質な茶葉と茶器のセットで、日本の伝統を感じられるギフトです",
      priceRange: "¥5,000〜¥15,000",
      keywords: ["日本茶", "茶器", "伝統"]
    });
  }
  
  if (category === "健康グッズ") {
    suggestions.push({
      name: "血圧計・健康測定器",
      reason: "健康管理に役立つ、実用的で喜ばれるギフトです",
      priceRange: "¥3,000〜¥10,000",
      keywords: ["健康", "測定器", "実用的"]
    });
  }
  
  if (category === "美容・スキンケア") {
    suggestions.push({
      name: "高級スキンケアセット",
      reason: "美容と健康をサポートする、厳選されたスキンケア商品です",
      priceRange: "¥6,000〜¥20,000",
      keywords: ["美容", "スキンケア", "高級"]
    });
  }
  
  if (category === "花・植物") {
    suggestions.push({
      name: "観葉植物・花ギフト",
      reason: "お部屋を彩る、育てやすい植物や季節の花ギフトです",
      priceRange: "¥2,000〜¥8,000",
      keywords: ["花", "植物", "季節"]
    });
  }
  
  if (category === "キッチン用品") {
    suggestions.push({
      name: "高級調理器具セット",
      reason: "料理好きの方に喜ばれる、実用的で高品質な調理器具です",
      priceRange: "¥4,000〜¥12,000",
      keywords: ["調理器具", "キッチン", "実用的"]
    });
  }
  
  if (category === "体験ギフト") {
    suggestions.push({
      name: "温泉・旅行体験券",
      reason: "思い出に残る特別な体験をプレゼントできます",
      priceRange: "¥8,000〜¥30,000",
      keywords: ["体験", "旅行", "温泉"]
    });
  }
  
  // ターゲット別の特別提案
  if (target === "実母" && category === "美容・スキンケア") {
    suggestions.push({
      name: "エステ・美容体験券",
      reason: "お母さんの美容とリラックスをサポートする特別な体験です",
      priceRange: "¥10,000〜¥25,000",
      keywords: ["エステ", "美容", "リラックス"]
    });
  }
  
  if (target === "実父" && category === "健康グッズ") {
    suggestions.push({
      name: "健康サプリメントセット",
      reason: "お父さんの健康をサポートする、厳選されたサプリメントです",
      priceRange: "¥5,000〜¥15,000",
      keywords: ["サプリメント", "健康", "実用的"]
    });
  }
  
  // 年齢・性別を考慮した提案
  if (freeText.includes("50代") && freeText.includes("父")) {
    suggestions.unshift({
      name: "高級綿パジャマセット", 
      reason: "50代の男性に人気の実用的なギフトです",
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
    filteredSuggestions = filteredSuggestions.filter(suggestion => 
      targetPreferences[target].some(pref => 
        suggestion.keywords.some(keyword => keyword.includes(pref))
      )
    );
  }
  
  return filteredSuggestions.slice(0, 3);
};

export default function ConciergeAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recommendedCategories, setRecommendedCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [freeText, setFreeText] = useState("");
  const [preferences, setPreferences] = useState("");
  const [history, setHistory] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // タイピング表示のシミュレーション
  const simulateTyping = (callback: () => void) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 1500 + Math.random() * 1000);
  };

  // メッセージを追加
  const addMessage = (content: string, type: 'user' | 'ai', isTyping = false) => {
    const message: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      isTyping
    };
    setMessages(prev => [...prev, message]);
  };

  // オプション選択
  const handleOptionSelect = (option: ChatOption) => {
    // ユーザーメッセージを追加
    addMessage(option.text, 'user');
    
    // 回答を保存
    const question = conciergeQuestions[currentStep];
    setResponses(prev => ({
      ...prev,
      [question.id]: option.value
    }));

    // 次の質問または結果表示
    if (currentStep < conciergeQuestions.length - 1) {
      simulateTyping(() => {
        setCurrentStep(prev => prev + 1);
        addMessage(conciergeQuestions[currentStep + 1].question, 'ai');
      });
    } else {
      // 最終回答
      simulateTyping(() => {
        const categories = analyzeConversation({
          ...responses,
          [question.id]: option.value
        });
        
        let response = "お答えいただき、ありがとうございます！\n\n";
        response += "あなたの回答を分析して、おすすめのカテゴリをご提案します：\n\n";
        categories.forEach((category, index) => {
          response += `${index + 1}. **${category}**\n`;
        });
        
        response += "\nどのカテゴリに興味がありますか？";
        
        addMessage(response, 'ai');
        setRecommendedCategories(categories);
        setShowSuggestions(true);
      });
    }
  };

  // フリーテキスト送信
  const handleFreeTextSubmit = (questionId: string, text: string) => {
    addMessage(text, 'user');
    
    setResponses(prev => ({
      ...prev,
      [questionId]: text
    }));

    if (currentStep < conciergeQuestions.length - 1) {
      simulateTyping(() => {
        setCurrentStep(prev => prev + 1);
        addMessage(conciergeQuestions[currentStep + 1].question, 'ai');
      });
    } else {
      // 最終回答
      simulateTyping(() => {
        const categories = analyzeConversation({
          ...responses,
          [questionId]: text
        });
        
        let response = "お答えいただき、ありがとうございます！\n\n";
        response += "あなたの回答を分析して、おすすめのカテゴリをご提案します：\n\n";
        categories.forEach((category, index) => {
          response += `${index + 1}. **${category}**\n`;
        });
        
        response += "\nどのカテゴリに興味がありますか？";
        
        addMessage(response, 'ai');
        setRecommendedCategories(categories);
        setShowSuggestions(true);
      });
    }
  };

  // カテゴリ選択
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const newSuggestions = generateConciergeSuggestions(responses, category);
    setSuggestions(newSuggestions);
    
    let response = `**${category}**カテゴリの商品をご提案します！\n\n`;
    newSuggestions.forEach((suggestion, index) => {
      response += `${index + 1}. **${suggestion.name}**\n`;
      response += `   ${suggestion.reason}\n`;
      response += `   価格: ${suggestion.priceRange}\n\n`;
    });
    
    addMessage(response, 'ai');
  };

  // 会話リセット
  const resetConversation = () => {
    setMessages([]);
    setCurrentStep(0);
    setResponses({});
    setShowSuggestions(false);
    setRecommendedCategories([]);
    setSelectedCategory("");
    setSuggestions([]);
    setFreeText("");
    setPreferences("");
    setHistory("");
    setTimeout(() => {
      addMessage(conciergeQuestions[0].question, 'ai');
    }, 1000);
  };

  // 初期化
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage(conciergeQuestions[0].question, 'ai');
      }, 1000);
    }
  }, []);

  return (
    <>
      <Head>
        <title>プレゼントコンシェルジュAI - Market Supporter AI</title>
        <meta name="description" content="AIがあなたにぴったりのプレゼントを見つけます。質問に答えるだけで、最適なギフトを提案します。" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* ヘッダー */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/events/birthday" className="text-blue-600 hover:text-blue-800">
                ← 誕生日プレゼント特集に戻る
              </Link>
              <h1 className="text-lg font-semibold text-gray-900">
                プレゼントコンシェルジュAI
              </h1>
            </div>
          </div>
        </div>

        {/* チャットエリア */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-lg h-96 overflow-y-auto">
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {message.isTyping ? (
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    ) : (
                      <div className="whitespace-pre-line">{message.content}</div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* 質問フォーム */}
          {currentStep < conciergeQuestions.length && !showSuggestions && !isTyping && conciergeQuestions[currentStep] && (
            <div className="mt-4">
              {conciergeQuestions[currentStep].type === 'select' ? (
                <div className="space-y-2">
                  {conciergeQuestions[currentStep].options?.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option)}
                      className="w-full text-left bg-white border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 hover:border-blue-300 transition-colors"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <textarea
                    value={
                      conciergeQuestions[currentStep].id === 'freeText' ? freeText :
                      conciergeQuestions[currentStep].id === 'preferences' ? preferences :
                      history
                    }
                    onChange={(e) => {
                      if (conciergeQuestions[currentStep].id === 'freeText') {
                        setFreeText(e.target.value);
                      } else if (conciergeQuestions[currentStep].id === 'preferences') {
                        setPreferences(e.target.value);
                      } else {
                        setHistory(e.target.value);
                      }
                    }}
                    placeholder={conciergeQuestions[currentStep].placeholder}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                  <button
                    onClick={() => {
                      const text = 
                        conciergeQuestions[currentStep].id === 'freeText' ? freeText :
                        conciergeQuestions[currentStep].id === 'preferences' ? preferences :
                        history;
                      if (text.trim()) {
                        handleFreeTextSubmit(conciergeQuestions[currentStep].id, text);
                      }
                    }}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    送信
                  </button>
                </div>
              )}
            </div>
          )}

          {/* カテゴリ選択 */}
          {showSuggestions && !selectedCategory && (
            <div className="mt-4 space-y-2">
              {recommendedCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="w-full text-left bg-white border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 hover:border-blue-300 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* 商品提案 */}
          {selectedCategory && suggestions.length > 0 && (
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedCategory}のおすすめ商品
              </h3>
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {suggestion.name}
                    </h4>
                    <p className="text-gray-600 mb-2">
                      {suggestion.reason}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      価格: {suggestion.priceRange}
                    </p>
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
              
              <div className="text-center space-x-4 mt-6">
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

          {/* リセットボタン */}
          <div className="mt-6 text-center">
            <button
              onClick={resetConversation}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              最初からやり直す
            </button>
          </div>
        </div>
      </div>
    </>
  );
}