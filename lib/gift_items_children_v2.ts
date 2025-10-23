// 子供向けギフト専用システム（子供向け誕生日AI v2）
// 年齢層別・発達段階別を重視したロジック

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

export interface ChildrenGiftItem {
  id: string;
  name: string;
  category: 'toy' | 'educational' | 'sports' | 'creative';
  description: string;
  priceRange: string;
  imageUrl: string;
  features: string[];
  targetAge: string[];
  interests: string[];
  mallLinks: {
    rakuten: string;
    amazon: string;
    yahoo: string;
  };
}

// 子供向け専用質問フロー（13問）
export const childrenQuestionFlow: Question[] = [
  // ブロック1: お子さんの基本情報・発達段階
  {
    id: 'age',
    question: 'お子さんの年齢を教えてください。',
    options: ['0-2歳（乳幼児）', '3-5歳（幼児）', '6-8歳（低学年）', '9-12歳（高学年）', '13-15歳（中学生）', '16-18歳（高校生）'],
    type: 'single'
  },
  {
    id: 'gender',
    question: 'お子さんの性別は？',
    options: ['男の子', '女の子', 'どちらでも良い'],
    type: 'single'
  },
  {
    id: 'interests',
    question: 'お子さんの興味のあることは？（複数選択可）',
    options: ['おもちゃ・ゲーム', 'スポーツ・運動', '読書・学習', 'アート・創作', '音楽・ダンス', '科学・実験', '特になし'],
    type: 'multiple'
  },
  {
    id: 'personality',
    question: 'お子さんの性格タイプは？',
    options: ['アクティブ・活発', '穏やか・静か', 'クリエイティブ・芸術的', '論理的・学習好き'],
    type: 'single'
  },
  
  // ブロック2: 贈り手の想い・教育方針
  {
    id: 'giftFeeling',
    question: 'どんな気持ちを込めて贈りたいですか？',
    options: ['「楽しく遊んでほしい」の楽しさ', '「成長してほしい」の応援', '「一緒に楽しもう」の共感', '「特別な存在」への愛情'],
    type: 'single'
  },
  {
    id: 'priority',
    question: 'あなたが重視したいポイントを選んでください。',
    options: ['楽しさ・面白さ', '学習・教育効果', '運動・健康促進', '創造性・表現力'],
    type: 'single'
  },
  {
    id: 'relationship',
    question: 'お子さんとの関係性は？',
    options: ['とても仲が良い', '普通（時々一緒に遊ぶ）', '少し距離がある', 'わからない'],
    type: 'single'
  },
  
  // ブロック3: ギフト条件・安全性
  {
    id: 'budget',
    question: '予算を教えてください。',
    options: ['〜¥2,000', '〜¥5,000', '〜¥10,000', '〜¥20,000', '¥30,000〜'],
    type: 'single'
  },
  {
    id: 'safety',
    question: '安全性について重視したいポイントは？',
    options: ['年齢に適した安全性', '耐久性・壊れにくさ', '環境に優しい素材', '特にこだわりなし'],
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
    options: ['両方希望（特別感を演出）', 'ラッピングのみ', '不要'],
    type: 'single'
  },
  
  // ブロック4: 感情トリガー（子供特有）
  {
    id: 'expectedReaction',
    question: 'お子さんが喜びそうな反応は？',
    options: ['「わあ、すごい！」（驚き・興奮派）', '「これで遊ぼう！」（アクティブ派）', '「ありがとう」（素直な感謝派）'],
    type: 'single'
  },
  {
    id: 'message',
    question: 'メッセージを添えるとしたら？（自由記述）',
    options: ['メッセージを添える', 'メッセージは不要'],
    type: 'freeText'
  }
];

// 子供向けギフト提案データ
export const childrenGiftSuggestions: ChildrenGiftItem[] = [
  {
    id: 'educational-toy',
    name: '知育おもちゃセット',
    category: 'educational',
    description: '年齢に合わせた知育おもちゃ。遊びながら学習できる、お子さんの成長をサポートするギフト。',
    priceRange: '¥3,000〜¥8,000',
    imageUrl: '/images/gifts/children/educational-toy.jpg',
    features: ['知育効果', '年齢適応', '安全設計'],
    targetAge: ['0-2歳（乳幼児）', '3-5歳（幼児）', '6-8歳（低学年）'],
    interests: ['おもちゃ・ゲーム', '読書・学習'],
    mallLinks: {
      rakuten: '/api/go/children-educational-rakuten',
      amazon: '/api/go/children-educational-amazon',
      yahoo: '/api/go/children-educational-yahoo'
    }
  },
  {
    id: 'sports-equipment',
    name: 'スポーツ用品',
    category: 'sports',
    description: 'お子さんの運動能力向上をサポートするスポーツ用品。健康的な成長を応援するギフト。',
    priceRange: '¥5,000〜¥15,000',
    imageUrl: '/images/gifts/children/sports.jpg',
    features: ['運動促進', '健康向上', 'アクティブ'],
    targetAge: ['6-8歳（低学年）', '9-12歳（高学年）', '13-15歳（中学生）', '16-18歳（高校生）'],
    interests: ['スポーツ・運動'],
    mallLinks: {
      rakuten: '/api/go/children-sports-rakuten',
      amazon: '/api/go/children-sports-amazon',
      yahoo: '/api/go/children-sports-yahoo'
    }
  },
  {
    id: 'creative-art-set',
    name: 'アート・創作セット',
    category: 'creative',
    description: 'お子さんの創造性を育むアート用品。表現力や想像力を伸ばす創作活動をサポート。',
    priceRange: '¥2,000〜¥6,000',
    imageUrl: '/images/gifts/children/art-set.jpg',
    features: ['創造性向上', '表現力育成', 'アート体験'],
    targetAge: ['3-5歳（幼児）', '6-8歳（低学年）', '9-12歳（高学年）'],
    interests: ['アート・創作', '音楽・ダンス'],
    mallLinks: {
      rakuten: '/api/go/children-art-rakuten',
      amazon: '/api/go/children-art-amazon',
      yahoo: '/api/go/children-art-yahoo'
    }
  },
  {
    id: 'science-experiment',
    name: '科学実験キット',
    category: 'educational',
    description: 'お子さんの好奇心を刺激する科学実験キット。楽しく学べる学習体験を提供。',
    priceRange: '¥4,000〜¥10,000',
    imageUrl: '/images/gifts/children/science.jpg',
    features: ['科学学習', '好奇心向上', '実験体験'],
    targetAge: ['6-8歳（低学年）', '9-12歳（高学年）', '13-15歳（中学生）'],
    interests: ['科学・実験', '読書・学習'],
    mallLinks: {
      rakuten: '/api/go/children-science-rakuten',
      amazon: '/api/go/children-science-amazon',
      yahoo: '/api/go/children-science-yahoo'
    }
  },
  {
    id: 'board-game',
    name: 'ボードゲーム・カードゲーム',
    category: 'toy',
    description: '家族や友達と一緒に楽しめるボードゲーム。コミュニケーション能力向上にも効果的。',
    priceRange: '¥3,000〜¥8,000',
    imageUrl: '/images/gifts/children/board-game.jpg',
    features: ['コミュニケーション', '戦略思考', '家族時間'],
    targetAge: ['6-8歳（低学年）', '9-12歳（高学年）', '13-15歳（中学生）', '16-18歳（高校生）'],
    interests: ['おもちゃ・ゲーム'],
    mallLinks: {
      rakuten: '/api/go/children-game-rakuten',
      amazon: '/api/go/children-game-amazon',
      yahoo: '/api/go/children-game-yahoo'
    }
  }
];

// 回答に基づく提案生成ロジック
export function generateChildrenSuggestions(answers: Record<string, string | string[]>): ChildrenGiftItem[] {
  let suggestions = [...childrenGiftSuggestions];
  
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
function filterByBudget(suggestions: ChildrenGiftItem[], budget: string): ChildrenGiftItem[] {
  const budgetRanges: Record<string, { min: number; max: number }> = {
    '〜¥2,000': { min: 0, max: 2000 },
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
function sortByPriority(suggestions: ChildrenGiftItem[], priority: string): ChildrenGiftItem[] {
  const priorityWeights: Record<string, Record<string, number>> = {
    '楽しさ・面白さ': {
      'toy': 3,
      'sports': 2,
      'creative': 2,
      'educational': 1
    },
    '学習・教育効果': {
      'educational': 3,
      'creative': 2,
      'toy': 1,
      'sports': 1
    },
    '運動・健康促進': {
      'sports': 3,
      'toy': 2,
      'creative': 1,
      'educational': 1
    },
    '創造性・表現力': {
      'creative': 3,
      'educational': 2,
      'toy': 1,
      'sports': 1
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
