// 兄弟姉妹向けギフト専用システム（兄弟姉妹向け誕生日AI v2）
// 趣味・実用・共感を重視したロジック

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

export interface SiblingsGiftItem {
  id: string;
  name: string;
  category: 'hobby' | 'practical' | 'experience';
  description: string;
  priceRange: string;
  imageUrl: string;
  features: string[];
  targetAge: string[];
  interests: string[];
  keywords: string[]; // GiftItem型との互換性のため追加
  mallLinks: {
    rakuten: string;
    amazon: string;
    yahoo: string;
  };
}

// 兄弟姉妹向け専用質問フロー（13問）
export const siblingsQuestionFlow: Question[] = [
  // ブロック1: 兄弟姉妹の基本情報・趣味
  {
    id: 'age',
    question: '兄弟姉妹の年代を教えてください。',
    options: ['20代', '30代', '40代', '50代', '60代以上'],
    type: 'single'
  },
  {
    id: 'lifestyle',
    question: '兄弟姉妹の普段の生活スタイルは？',
    options: ['忙しくて時間がない', 'ゆったりとした生活', 'アクティブ（趣味・運動が多い）', '家で過ごすことが多い'],
    type: 'single'
  },
  {
    id: 'interests',
    question: '兄弟姉妹の趣味や興味のあることは？（複数選択可）',
    options: ['読書・学習', '映画・音楽', 'スポーツ・アウトドア', '料理・グルメ', 'アート・創作', 'ゲーム・エンタメ', '特になし'],
    type: 'multiple'
  },
  {
    id: 'personality',
    question: '兄弟姉妹の性格タイプは？',
    options: ['アクティブ・外向的', '穏やか・内向的', '実用的・合理的', 'クリエイティブ・芸術的'],
    type: 'single'
  },
  
  // ブロック2: 贈り手の想い・関係性
  {
    id: 'giftFeeling',
    question: 'どんな気持ちを込めて贈りたいですか？',
    options: ['「いつもありがとう」の感謝', '「一緒に楽しもう」の共感', '「応援してる」のサポート', '「特別な存在」への愛情'],
    type: 'single'
  },
  {
    id: 'priority',
    question: 'あなたが重視したいポイントを選んでください。',
    options: ['趣味に合ったもの', '実用的で毎日使える', '一緒に楽しめる体験', '驚き・サプライズ要素'],
    type: 'single'
  },
  {
    id: 'relationship',
    question: '兄弟姉妹との関係性は？',
    options: ['とても仲が良い', '普通（時々連絡）', '少し距離がある', 'わからない'],
    type: 'single'
  },
  
  // ブロック3: ギフト条件・物流
  {
    id: 'budget',
    question: '予算を教えてください。',
    options: ['〜¥3,000', '〜¥5,000', '〜¥10,000', '〜¥20,000', '¥30,000〜'],
    type: 'single'
  },
  {
    id: 'deliveryMethod',
    question: 'プレゼントはどのように渡しますか？',
    options: ['直接手渡しする', '宅配で送る', '会う時に持参する'],
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
  
  // ブロック4: 感情トリガー（兄弟姉妹特有）
  {
    id: 'expectedReaction',
    question: '兄弟姉妹が喜びそうな反応は？',
    options: ['「おお、これいいね！」（驚き・感動派）', '「ありがとう、使わせてもらう」（実用派）', '「一緒に楽しもう」（共感・体験派）'],
    type: 'single'
  },
  {
    id: 'message',
    question: 'メッセージを添えるとしたら？（自由記述）',
    options: ['メッセージを添える', 'メッセージは不要'],
    type: 'freeText'
  }
];

// 兄弟姉妹向けギフト提案データ
export const siblingsGiftSuggestions: SiblingsGiftItem[] = [
  {
    id: 'hobby-book-set',
    name: '趣味に合った本セット',
    category: 'hobby',
    description: '兄弟姉妹の趣味に合わせた本や雑誌のセット。読書好きの兄弟姉妹にぴったりのギフト。',
    priceRange: '¥3,000〜¥8,000',
    imageUrl: '/images/gifts/siblings/book-set.jpg',
    features: ['趣味に特化', '実用的', '長く楽しめる'],
    targetAge: ['20代', '30代', '40代', '50代', '60代以上'],
    interests: ['読書・学習', '映画・音楽', 'アート・創作'],
    keywords: ['本', '雑誌', '趣味', '兄弟姉妹', 'ギフト'],
    mallLinks: {
      rakuten: '/api/go/siblings-book-rakuten',
      amazon: '/api/go/siblings-book-amazon',
      yahoo: '/api/go/siblings-book-yahoo'
    }
  },
  {
    id: 'gadget-gift',
    name: '最新ガジェット',
    category: 'practical',
    description: '日常的に使える実用的なガジェット。兄弟姉妹の生活を便利にする最新アイテム。',
    priceRange: '¥5,000〜¥15,000',
    imageUrl: '/images/gifts/siblings/gadget.jpg',
    features: ['実用性重視', '最新技術', '毎日使える'],
    targetAge: ['20代', '30代', '40代'],
    interests: ['ゲーム・エンタメ', '映画・音楽'],
    keywords: ['ガジェット', '実用的', '最新', '兄弟姉妹', 'ギフト'],
    mallLinks: {
      rakuten: '/api/go/siblings-gadget-rakuten',
      amazon: '/api/go/siblings-gadget-amazon',
      yahoo: '/api/go/siblings-gadget-yahoo'
    }
  },
  {
    id: 'experience-gift',
    name: '体験ギフト券',
    category: 'experience',
    description: '一緒に楽しめる体験ギフト。兄弟姉妹との思い出作りに最適な特別な体験。',
    priceRange: '¥8,000〜¥25,000',
    imageUrl: '/images/gifts/siblings/experience.jpg',
    features: ['体験型', '思い出作り', '一緒に楽しめる'],
    targetAge: ['20代', '30代', '40代', '50代'],
    interests: ['スポーツ・アウトドア', '料理・グルメ', 'アート・創作'],
    keywords: ['体験', '思い出', '一緒に楽しむ', '兄弟姉妹', 'ギフト'],
    mallLinks: {
      rakuten: '/api/go/siblings-experience-rakuten',
      amazon: '/api/go/siblings-experience-amazon',
      yahoo: '/api/go/siblings-experience-yahoo'
    }
  },
  {
    id: 'gourmet-gift',
    name: 'グルメギフトセット',
    category: 'practical',
    description: '高級食材やお菓子のセット。兄弟姉妹の食の好みに合わせた贅沢なギフト。',
    priceRange: '¥4,000〜¥12,000',
    imageUrl: '/images/gifts/siblings/gourmet.jpg',
    features: ['高級食材', '美味しさ重視', '実用的'],
    targetAge: ['20代', '30代', '40代', '50代', '60代以上'],
    interests: ['料理・グルメ'],
    keywords: ['グルメ', '食材', 'お菓子', '兄弟姉妹', 'ギフト'],
    mallLinks: {
      rakuten: '/api/go/siblings-gourmet-rakuten',
      amazon: '/api/go/siblings-gourmet-amazon',
      yahoo: '/api/go/siblings-gourmet-yahoo'
    }
  },
  {
    id: 'sports-equipment',
    name: 'スポーツ用品',
    category: 'hobby',
    description: '兄弟姉妹のスポーツ趣味に合わせた用品。アクティブな兄弟姉妹への応援ギフト。',
    priceRange: '¥6,000〜¥20,000',
    imageUrl: '/images/gifts/siblings/sports.jpg',
    features: ['スポーツ特化', '健康促進', 'アクティブ'],
    targetAge: ['20代', '30代', '40代'],
    interests: ['スポーツ・アウトドア'],
    keywords: ['スポーツ', '健康', 'アクティブ', '兄弟姉妹', 'ギフト'],
    mallLinks: {
      rakuten: '/api/go/siblings-sports-rakuten',
      amazon: '/api/go/siblings-sports-amazon',
      yahoo: '/api/go/siblings-sports-yahoo'
    }
  }
];

// 回答に基づく提案生成ロジック
export function generateSiblingsSuggestions(answers: Record<string, string | string[]>): SiblingsGiftItem[] {
  let suggestions = [...siblingsGiftSuggestions];
  
  // 年齢フィルタリング
  const age = answers.age as string;
  if (age) {
    suggestions = suggestions.filter(item => item.targetAge.includes(age));
  }
  
  // 趣味・興味フィルタリング
  const interests = answers.interests as string[];
  if (interests && interests.length > 0) {
    suggestions = suggestions.filter(item => 
      item.interests.some(interest => interests.includes(interest))
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
function filterByBudget(suggestions: SiblingsGiftItem[], budget: string): SiblingsGiftItem[] {
  const budgetRanges: Record<string, { min: number; max: number }> = {
    '〜¥3,000': { min: 0, max: 3000 },
    '〜¥5,000': { min: 0, max: 5000 },
    '〜¥10,000': { min: 0, max: 10000 },
    '〜¥20,000': { min: 0, max: 20000 },
    '¥30,000〜': { min: 30000, max: 1000000 }
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
function sortByPriority(suggestions: SiblingsGiftItem[], priority: string): SiblingsGiftItem[] {
  const priorityWeights: Record<string, Record<string, number>> = {
    '趣味に合ったもの': {
      'hobby': 3,
      'experience': 2,
      'practical': 1
    },
    '実用的で毎日使える': {
      'practical': 3,
      'hobby': 2,
      'experience': 1
    },
    '一緒に楽しめる体験': {
      'experience': 3,
      'hobby': 2,
      'practical': 1
    },
    '驚き・サプライズ要素': {
      'experience': 3,
      'hobby': 2,
      'practical': 1
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
