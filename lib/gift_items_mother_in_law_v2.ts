// 義母向けギフト専用システム（義母向け誕生日AI v2）
// 印象重視・上品・礼儀と気遣いを重視したロジック

export interface Question {
  id: string;
  question: string;
  options: string[];
  condition?: {
    questionId: string;
    expectedAnswer: string | string[];
  };
  type: 'single' | 'multiple' | 'freeText';
}

export interface MotherInLawGiftItem {
  id: string;
  name: string;
  category: 'impression' | 'practical' | 'luxury';
  description: string;
  priceRange: string;
  imageUrl: string;
  features: string[];
  targetAge: string[];
  preferences: string[];
  mallLinks: {
    rakuten: string;
    amazon: string;
    yahoo: string;
  };
}

// 義母向け専用質問フロー（13問）
export const motherInLawQuestionFlow: Question[] = [
  // ブロック1: 義母さまの基本情報・好み
  {
    id: 'age',
    question: '義母さまの年代を教えてください。',
    options: ['50代', '60代', '70代', '80代以上'],
    type: 'single'
  },
  {
    id: 'lifestyle',
    question: '義母さまの普段の生活スタイルは？',
    options: ['アクティブ（外出・趣味が多い）', '穏やか（家で過ごすことが多い）', '社交的（人との交流が多い）', 'わからない'],
    type: 'single'
  },
  {
    id: 'interests',
    question: '義母さまの趣味や興味のあることは？（複数選択可）',
    options: ['お花・ガーデニング', 'お茶・日本文化', '料理・グルメ', '健康・美容', '読書・学習', '特になし'],
    type: 'multiple'
  },
  {
    id: 'taste',
    question: '義母さまの好みのスタイルは？',
    options: ['上品で落ち着いた', '華やかで明るい', 'シンプルで実用的', 'わからない'],
    type: 'single'
  },
  
  // ブロック2: 贈り手の想い・配慮
  {
    id: 'giftFeeling',
    question: 'どんな気持ちを込めて贈りたいですか？',
    options: ['「いつもありがとう」の感謝', '「お疲れ様」の労い', '「これからもよろしく」の気遣い', '「特別な存在」への敬意'],
    type: 'single'
  },
  {
    id: 'priority',
    question: 'あなたが重視したいポイントを選んでください。',
    options: ['印象が良い・上品', '実用的で助かる', '特別感・高級感', '心遣いが伝わる'],
    type: 'single'
  },
  {
    id: 'relationship',
    question: '義母さまとの関係性は？',
    options: ['良好（よく話す）', '普通（挨拶程度）', '少し距離がある', 'わからない'],
    type: 'single'
  },
  
  // ブロック3: ギフト条件・物流
  {
    id: 'budget',
    question: '予算を教えてください。',
    options: ['〜¥5,000', '〜¥10,000', '〜¥20,000', '〜¥30,000', '¥50,000〜'],
    type: 'single'
  },
  {
    id: 'deliveryMethod',
    question: 'プレゼントはどのように渡しますか？',
    options: ['直接手渡しする', '宅配で送る', '訪問時に持参する'],
    type: 'single'
  },
  {
    id: 'wrapping',
    question: 'ラッピング・メッセージカードは？',
    options: ['両方希望（丁寧に）', 'ラッピングのみ', '不要'],
    type: 'single'
  },
  {
    id: 'deliveryTiming',
    question: 'お届け希望はありますか？',
    options: ['当日または前日に届くようにしたい', 'なるべく早く', '指定なし'],
    type: 'single'
  },
  
  // ブロック4: 感情トリガー（義母特有）
  {
    id: 'expectedReaction',
    question: '義母さまが喜びそうな反応は？',
    options: ['「気が利いていて上品ね」（印象重視派）', '「実用的で助かるわ」（実用性重視派）', '「心遣いが嬉しい」（心重視派）'],
    type: 'single'
  },
  {
    id: 'message',
    question: 'メッセージを添えるとしたら？（自由記述）',
    options: ['メッセージを添える', 'メッセージは不要'],
    type: 'freeText'
  }
];

// 義母向けギフト提案データ
export const motherInLawGiftSuggestions: MotherInLawGiftItem[] = [
  {
    id: 'premium-tea-set',
    name: '高級日本茶セット',
    category: 'impression',
    description: '上品で印象の良い日本茶ギフト。義母さまへの敬意と感謝を込めた特別な一品。',
    priceRange: '¥8,000〜¥25,000',
    imageUrl: '/images/gifts/mother-in-law/tea-set.jpg',
    features: ['上品なパッケージ', '高級茶葉', '実用的'],
    targetAge: ['50代', '60代', '70代', '80代以上'],
    preferences: ['お茶・日本文化', '上品で落ち着いた'],
    mallLinks: {
      rakuten: '/api/go/mother-in-law-tea-rakuten',
      amazon: '/api/go/mother-in-law-tea-amazon',
      yahoo: '/api/go/mother-in-law-tea-yahoo'
    }
  },
  {
    id: 'luxury-skincare',
    name: '高級スキンケアセット',
    category: 'luxury',
    description: '特別感のある高級スキンケア。義母さまの美しさをサポートする贅沢なギフト。',
    priceRange: '¥15,000〜¥40,000',
    imageUrl: '/images/gifts/mother-in-law/skincare.jpg',
    features: ['高級ブランド', '特別感', '美肌効果'],
    targetAge: ['50代', '60代', '70代'],
    preferences: ['健康・美容', '華やかで明るい'],
    mallLinks: {
      rakuten: '/api/go/mother-in-law-skincare-rakuten',
      amazon: '/api/go/mother-in-law-skincare-amazon',
      yahoo: '/api/go/mother-in-law-skincare-yahoo'
    }
  },
  {
    id: 'practical-kitchen',
    name: '実用的キッチン用品',
    category: 'practical',
    description: '毎日使える実用的なキッチン用品。義母さまの日常をサポートする心遣いのギフト。',
    priceRange: '¥5,000〜¥15,000',
    imageUrl: '/images/gifts/mother-in-law/kitchen.jpg',
    features: ['実用性重視', '高品質', '毎日使える'],
    targetAge: ['50代', '60代', '70代', '80代以上'],
    preferences: ['料理・グルメ', 'シンプルで実用的'],
    mallLinks: {
      rakuten: '/api/go/mother-in-law-kitchen-rakuten',
      amazon: '/api/go/mother-in-law-kitchen-amazon',
      yahoo: '/api/go/mother-in-law-kitchen-yahoo'
    }
  }
];

// 回答に基づく提案生成ロジック
export function generateMotherInLawSuggestions(answers: Record<string, string | string[]>): MotherInLawGiftItem[] {
  let suggestions = [...motherInLawGiftSuggestions];
  
  // 年齢フィルタリング
  const age = answers.age as string;
  if (age) {
    suggestions = suggestions.filter(item => item.targetAge.includes(age));
  }
  
  // 趣味・興味フィルタリング
  const interests = answers.interests as string[];
  if (interests && interests.length > 0) {
    suggestions = suggestions.filter(item => 
      item.preferences.some(preference => interests.includes(preference))
    );
  }
  
  // 予算フィルタリング
  const budget = answers.budget as string;
  if (budget) {
    suggestions = filterByBudget(suggestions, budget);
  }
  
  // 重視ポイントによる重み付け
  const priority = answers.priority as string;
  if (priority) {
    suggestions = sortByPriority(suggestions, priority);
  }
  
  return suggestions.slice(0, 3); // 最大3つまで
}

// 予算フィルタリング
function filterByBudget(suggestions: MotherInLawGiftItem[], budget: string): MotherInLawGiftItem[] {
  const budgetRanges: Record<string, { min: number; max: number }> = {
    '〜¥5,000': { min: 0, max: 5000 },
    '〜¥10,000': { min: 0, max: 10000 },
    '〜¥20,000': { min: 0, max: 20000 },
    '〜¥30,000': { min: 0, max: 30000 },
    '¥50,000〜': { min: 50000, max: 1000000 }
  };
  
  const range = budgetRanges[budget];
  if (!range) return suggestions;
  
  return suggestions.filter(item => {
    const priceMatch = item.priceRange.match(/¥([0-9,]+)〜¥([0-9,]+)/);
    if (!priceMatch) return true;
    
    const minPrice = parseInt(priceMatch[1].replace(/,/g, ''));
    const maxPrice = parseInt(priceMatch[2].replace(/,/g, ''));
    
    return (minPrice <= range.max && maxPrice >= range.min);
  });
}

// 重視ポイントによる重み付け
function sortByPriority(suggestions: MotherInLawGiftItem[], priority: string): MotherInLawGiftItem[] {
  const priorityWeights: Record<string, Record<string, number>> = {
    '印象が良い・上品': {
      'impression': 3,
      'luxury': 2,
      'practical': 1
    },
    '実用的で助かる': {
      'practical': 3,
      'impression': 2,
      'luxury': 1
    },
    '特別感・高級感': {
      'luxury': 3,
      'impression': 2,
      'practical': 1
    },
    '心遣いが伝わる': {
      'impression': 3,
      'practical': 2,
      'luxury': 1
    }
  };
  
  const weights = priorityWeights[priority];
  if (!weights) return suggestions;
  
  return suggestions.sort((a, b) => {
    const weightA = weights[a.category] || 0;
    const weightB = weights[b.category] || 0;
    return weightB - weightA;
  });
}
