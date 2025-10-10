// A1: スキンケアギフト専用システム（実母向け誕生日AI v2）
// 新システムとして独立実装

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

export interface SkincareGiftItem {
  id: string;
  name: string;
  category: 'aging' | 'organic' | 'premium';
  description: string;
  priceRange: string;
  imageUrl: string;
  features: string[];
  targetAge: string[];
  skinConcerns: string[];
  mallLinks: {
    rakuten: string;
    amazon: string;
    yahoo: string;
  };
}

// A1専用質問フロー（13問）
export const skincareQuestionFlow: Question[] = [
  // ブロック1: お母さまの肌タイプ・悩み
  {
    id: 'age',
    question: 'お母さまの年代を教えてください。',
    options: ['40代', '50代', '60代', '70代', '80代以上'],
    type: 'single'
  },
  {
    id: 'skinConcerns',
    question: '気になる肌の悩みはどれですか？（複数選択可）',
    options: ['乾燥・小じわ', 'シミ・くすみ', 'たるみ・ハリ不足', '敏感肌', '特になし'],
    type: 'multiple'
  },
  {
    id: 'skincareStyle',
    question: '普段のスキンケアスタイルに近いのは？',
    options: ['シンプル（化粧水・乳液だけ）', '平均的（美容液なども使う）', 'しっかり（多ステップ）'],
    type: 'single'
  },
  {
    id: 'fragrancePreference',
    question: '香りの強さの好みは？',
    options: ['無香料が好き', 'ほんのり香る程度', '香りがある方が嬉しい'],
    type: 'single',
    condition: {
      questionId: 'skincareStyle',
      expectedAnswer: ['平均的（美容液なども使う）', 'しっかり（多ステップ）']
    }
  },
  
  // ブロック2: 贈り手のこだわり・想い
  {
    id: 'giftFeeling',
    question: 'どんな気持ちを込めて贈りたいですか？',
    options: ['「きれいでいてほしい」', '「癒されてほしい」', '「自分の時間を楽しんでほしい」', '「健康に気をつけて」'],
    type: 'single'
  },
  {
    id: 'priority',
    question: 'あなたが重視したいポイントを選んでください。',
    options: ['実用性・毎日使える', '特別感・ブランド力', '成分・ナチュラル志向', 'デザイン・見た目の華やかさ'],
    type: 'single'
  },
  {
    id: 'motherType',
    question: 'お母さまに合いそうなタイプを選ぶなら？',
    options: ['シンプルケア派（毎日手軽）', '美容意識高め派（しっかりケア）', '贅沢体験派（週末集中ケア）'],
    type: 'single'
  },
  
  // ブロック3: ギフト条件・物流まわり
  {
    id: 'budget',
    question: '予算を教えてください。',
    options: ['〜¥5,000', '〜¥10,000', '〜¥20,000', '〜¥30,000', '¥50,000〜'],
    type: 'single'
  },
  {
    id: 'deliveryMethod',
    question: 'プレゼントはどのように渡しますか？',
    options: ['手渡しする', '実家などに直送する'],
    type: 'single'
  },
  {
    id: 'wrapping',
    question: 'ラッピング・メッセージカードは？',
    options: ['両方希望', 'ラッピングのみ', '不要'],
    type: 'single'
  },
  {
    id: 'deliveryTiming',
    question: 'お届け希望はありますか？',
    options: ['当日または前日に届くようにしたい', 'なるべく早く', '指定なし'],
    type: 'single'
  },
  
  // ブロック4: 感情トリガー（提案文生成に使用）
  {
    id: 'expectedReaction',
    question: 'お母さまが喜びそうな反応は？',
    options: ['「見た目がきれい！」（華やか派）', '「これ良さそう、使ってみよう」（実用派）', '「気持ちが嬉しい」（心重視派）'],
    type: 'single'
  },
  {
    id: 'message',
    question: 'メッセージを添えるとしたら？（自由記述）',
    options: ['メッセージを添える', 'メッセージは不要'],
    type: 'freeText' // 自由記述タイプ
  }
];

// A1提案ロジック：3タイプのスキンケアギフト
export const skincareGiftSuggestions: SkincareGiftItem[] = [
  // ① 高保湿・エイジングケアセット
  {
    id: 'aging-care-set',
    name: '高保湿・エイジングケアセット',
    category: 'aging',
    description: '乾燥・小じわ・たるみが気になるお母さまへ。毎日のケアを"ご褒美タイム"に。',
    priceRange: '¥8,000〜¥25,000',
    imageUrl: '/images/gifts/skincare-aging.jpg',
    features: ['高保湿成分配合', 'エイジングケア特化', '無香料タイプあり', '日本ブランド中心'],
    targetAge: ['50代', '60代', '70代', '80代以上'],
    skinConcerns: ['乾燥・小じわ', 'たるみ・ハリ不足'],
    mallLinks: {
      rakuten: '/api/go/skincare-aging-rakuten',
      amazon: '/api/go/skincare-aging-amazon',
      yahoo: '/api/go/skincare-aging-yahoo'
    }
  },
  
  // ② オーガニック・ナチュラルスキンケア
  {
    id: 'organic-natural',
    name: 'オーガニック・ナチュラルスキンケア',
    category: 'organic',
    description: '肌に優しい成分を好むお母さまへ。ほのかな香りと植物由来のしっとり感が特徴です。',
    priceRange: '¥6,000〜¥18,000',
    imageUrl: '/images/gifts/skincare-organic.jpg',
    features: ['植物由来成分', '国産オーガニック', 'ボトルデザイン上品', '敏感肌対応'],
    targetAge: ['40代', '50代', '60代', '70代'],
    skinConcerns: ['敏感肌', '乾燥・小じわ'],
    mallLinks: {
      rakuten: '/api/go/skincare-organic-rakuten',
      amazon: '/api/go/skincare-organic-amazon',
      yahoo: '/api/go/skincare-organic-yahoo'
    }
  },
  
  // ③ プレミアムブランドコフレ（限定品）
  {
    id: 'premium-brand',
    name: 'プレミアムブランドコフレ（限定品）',
    category: 'premium',
    description: '誕生日らしい華やかさを演出。コスメブランドの限定コフレやギフトボックスを厳選しました。',
    priceRange: '¥15,000〜¥35,000',
    imageUrl: '/images/gifts/skincare-premium.jpg',
    features: ['限定パッケージ', '高級感', 'ラッピング対応', 'ブランド力'],
    targetAge: ['40代', '50代', '60代', '70代'],
    skinConcerns: ['シミ・くすみ', 'たるみ・ハリ不足'],
    mallLinks: {
      rakuten: '/api/go/skincare-premium-rakuten',
      amazon: '/api/go/skincare-premium-amazon',
      yahoo: '/api/go/skincare-premium-yahoo'
    }
  }
];

// 回答に基づく提案生成ロジック
export function generateSkincareSuggestions(answers: Record<string, string | string[]>): SkincareGiftItem[] {
  let suggestions = [...skincareGiftSuggestions];
  
  // 年齢フィルタリング
  const age = answers.age as string;
  if (age) {
    suggestions = suggestions.filter(item => item.targetAge.includes(age));
  }
  
  // 肌の悩みフィルタリング
  const skinConcerns = answers.skinConcerns as string[];
  if (skinConcerns && skinConcerns.length > 0) {
    suggestions = suggestions.filter(item => 
      item.skinConcerns.some(concern => skinConcerns.includes(concern))
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
function filterByBudget(suggestions: SkincareGiftItem[], budget: string): SkincareGiftItem[] {
  const budgetMap: Record<string, { min: number; max: number }> = {
    '〜¥5,000': { min: 0, max: 5000 },
    '〜¥10,000': { min: 0, max: 10000 },
    '〜¥20,000': { min: 0, max: 20000 },
    '〜¥30,000': { min: 0, max: 30000 },
    '¥50,000〜': { min: 50000, max: 100000 }
  };
  
  const budgetRange = budgetMap[budget];
  if (!budgetRange) return suggestions;
  
  return suggestions.filter(item => {
    const priceMatch = item.priceRange.match(/¥([0-9,]+)〜¥([0-9,]+)/);
    if (!priceMatch) return true;
    
    const minPrice = parseInt(priceMatch[1].replace(/,/g, ''));
    const maxPrice = parseInt(priceMatch[2].replace(/,/g, ''));
    
    return (
      (minPrice >= budgetRange.min && minPrice <= budgetRange.max) ||
      (maxPrice >= budgetRange.min && maxPrice <= budgetRange.max) ||
      (budgetRange.min >= minPrice && budgetRange.min <= maxPrice)
    );
  });
}

// 重視ポイントによる重み付け
function sortByPriority(suggestions: SkincareGiftItem[], priority: string): SkincareGiftItem[] {
  const priorityMap: Record<string, string[]> = {
    '実用性・毎日使える': ['aging', 'organic'],
    '特別感・ブランド力': ['premium', 'aging'],
    '成分・ナチュラル志向': ['organic', 'aging'],
    'デザイン・見た目の華やかさ': ['premium', 'organic']
  };
  
  const preferredCategories = priorityMap[priority] || [];
  
  return suggestions.sort((a, b) => {
    const aIndex = preferredCategories.indexOf(a.category);
    const bIndex = preferredCategories.indexOf(b.category);
    
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    
    return aIndex - bIndex;
  });
}

// AIコメント生成
export function generateAIComment(answers: Record<string, string | string[]>, suggestion: SkincareGiftItem): string {
  const giftFeeling = answers.giftFeeling as string;
  const expectedReaction = answers.expectedReaction as string;
  const message = answers.message as string;
  
  let comment = suggestion.description;
  
  // 気持ちを込めたコメント追加
  if (giftFeeling) {
    comment += `\n\n${giftFeeling}という想いを込めて、`;
  }
  
  // 期待される反応に合わせたコメント
  if (expectedReaction) {
    if (expectedReaction.includes('華やか派')) {
      comment += '見た目も美しいパッケージで、開封の瞬間から特別感を演出します。';
    } else if (expectedReaction.includes('実用派')) {
      comment += '毎日使える実用的なアイテムで、お母さまの日常を少し贅沢にします。';
    } else if (expectedReaction.includes('心重視派')) {
      comment += 'お母さまへの感謝の気持ちが伝わる、心のこもったギフトです。';
    }
  }
  
  // カスタムメッセージ追加
  if (message && message.trim()) {
    comment += `\n\nメッセージ：「${message}」`;
  }
  
  return comment;
}
