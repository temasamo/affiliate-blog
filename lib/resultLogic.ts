// lib/resultLogic.ts

// 質問項目の型定義
export type Answers = {
  // 基本情報
  gender: "male" | "female" | "other" | "unspecified";
  age: number | null;
  
  // 睡眠スタイル
  sleepPosition: "back" | "side" | "stomach";
  neckPain: boolean;
  neckIssue: "none" | "stiff" | "cervical";
  heightPref: "low" | "medium" | "high";
  shoulderWidth: "narrow" | "normal" | "wide";
  rollOver: "few" | "normal" | "many";
  
  // 健康・快適性
  snoring: "yes" | "no";
  morningTired: "often" | "sometimes" | "no";
  hotSweaty: boolean;
  
  // 環境・好み
  mattressHardness: "soft" | "medium" | "hard";
  adjustable: "yes" | "no";
  materialPref: "none" | "buckwheat" | "pipe" | "memory" | "latex" | "fiber" | "feather";
  
  // 購入情報
  budget: "UNDER_3000" | "Y3_5" | "Y5_8" | "Y8_12" | "Y12_15" | "Y15_20" | "OVER_20000";
  budgetText?: string; // 自由入力の予算
  reason: "doesnt_fit" | "upgrade" | "gift" | "first_time";
  pillowSize: "small" | "standard" | "large";

  // 現在の枕情報（ギフト以外の場合）
  currentPillow?: {
    brand?: string;
    yearsUsed?: string;
    size?: string;
    height?: string;
    firmness?: string;
    material?: string;
    issues?: Record<string, boolean>;
    wish?: string;
  };
};

// 商品情報の型定義
export type Product = {
  id: string;
  title: string;
  category: string;
  image: string;
  images?: string[];
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  stores: {
    rakuten?: { url: string; price?: number };
    amazon?: { url: string; price?: number };
    yahoo?: { url: string; price?: number };
  };
};

// カテゴリ別商品データ
const PRODUCTS: Record<string, Product[]> = {
  'cervical-support': [
    {
      id: 'cervical-1',
      title: '頸椎サポート枕 プロ',
      category: '頸椎サポート枕',
      image: '/images/pillows/cervical-support.jpg',
      price: 15000,
      rating: 4.5,
      reviewCount: 1280,
      description: '頸椎の自然なカーブを維持する専用設計',
      features: ['頸椎サポート', '高さ調整可能', '通気性メッシュ'],
      stores: {
        rakuten: { url: 'https://www.rakuten.co.jp/search?k=頸椎サポート枕' },
        amazon: { url: 'https://www.amazon.co.jp/s?k=頸椎サポート枕' },
        yahoo: { url: 'https://shopping.yahoo.co.jp/search?p=頸椎サポート枕' }
      }
    }
  ],
  'side-sleep': [
    {
      id: 'side-1',
      title: '横向き専用枕 プレミアム',
      category: '横向き強化枕',
      image: '/images/pillows/side-sleep.jpg',
      price: 12000,
      rating: 4.3,
      reviewCount: 890,
      description: '横向き寝に最適化された高さと形状',
      features: ['横向き専用設計', '肩の圧迫軽減', '快適な寝返り'],
      stores: {
        rakuten: { url: 'https://www.rakuten.co.jp/search?k=横向き枕' },
        amazon: { url: 'https://www.amazon.co.jp/s?k=横向き枕' },
        yahoo: { url: 'https://shopping.yahoo.co.jp/search?p=横向き枕' }
      }
    }
  ],
  'back-stable': [
    {
      id: 'back-1',
      title: '仰向け安定枕 クラシック',
      category: '後頭部安定枕',
      image: '/images/pillows/back-stable.jpg',
      price: 8000,
      rating: 4.2,
      reviewCount: 650,
      description: '仰向け寝の安定性を重視した設計',
      features: ['後頭部安定', '適度な高さ', '自然な寝姿勢'],
      stores: {
        rakuten: { url: 'https://www.rakuten.co.jp/search?k=仰向け枕' },
        amazon: { url: 'https://www.amazon.co.jp/s?k=仰向け枕' },
        yahoo: { url: 'https://shopping.yahoo.co.jp/search?p=仰向け枕' }
      }
    }
  ],
  'breathable': [
    {
      id: 'breathable-1',
      title: '通気性枕 クール',
      category: '通気性重視枕',
      image: '/images/pillows/breathable.jpg',
      price: 9500,
      rating: 4.4,
      reviewCount: 720,
      description: '夏でも快適な通気性を実現',
      features: ['高通気性', 'メッシュ素材', '洗濯可能'],
      stores: {
        rakuten: { url: 'https://www.rakuten.co.jp/search?k=通気性枕' },
        amazon: { url: 'https://www.amazon.co.jp/s?k=通気性枕' },
        yahoo: { url: 'https://shopping.yahoo.co.jp/search?p=通気性枕' }
      }
    }
  ],
  'adjustable': [
    {
      id: 'adjustable-1',
      title: '調整式枕 フレックス',
      category: '調整式枕',
      image: '/images/pillows/adjustable.jpg',
      price: 18000,
      rating: 4.6,
      reviewCount: 1100,
      description: '好みに合わせて高さを調整可能',
      features: ['高さ調整', '複数パーツ', '長期間使用'],
      stores: {
        rakuten: { url: 'https://www.rakuten.co.jp/search?k=調整式枕' },
        amazon: { url: 'https://www.amazon.co.jp/s?k=調整式枕' },
        yahoo: { url: 'https://shopping.yahoo.co.jp/search?p=調整式枕' }
      }
    }
  ],
  'wrapping': [
    {
      id: 'wrapping-1',
      title: '包み込み枕 コンフォート',
      category: '包み込み系枕',
      image: '/images/pillows/wrapping.jpg',
      price: 11000,
      rating: 4.1,
      reviewCount: 540,
      description: '頭を優しく包み込む柔らかさ',
      features: ['包み込み感', '低反発素材', '静音設計'],
      stores: {
        rakuten: { url: 'https://www.rakuten.co.jp/search?k=包み込み枕' },
        amazon: { url: 'https://www.amazon.co.jp/s?k=包み込み枕' },
        yahoo: { url: 'https://shopping.yahoo.co.jp/search?p=包み込み枕' }
      }
    }
  ]
};

// カテゴリに基づいて商品を取得
function getProductsByCategory(category: string): Product[] {
  return PRODUCTS[category] || PRODUCTS['back-stable']; // デフォルト
}

// 診断結果の型定義を更新
export type DiagnosisResult = {
  // 基本情報
  title: string;
  summary: string;
  height: string;
  firmness: string;
  sizeLabel: string;
  sizeTag: string;
  
  // 問題点・アプローチ
  problems: string[];
  approaches: string[];
  avoided: string[];
  changePoints: string[];
  
  // カテゴリ・候補
  primaryCategory: string;
  secondaryCandidates: Array<{key: string; label: string; tags: string[]; score: number}>;
  
  // 信頼度・理由
  confidence: number;
  reasons: string[];
  
  // 商品情報（新規追加）
  primaryProduct: Product;
  secondaryProducts: Product[];
};

// タグ化関数
function extractTags(answers: Answers): string[] {
  const tags: string[] = [];

  // 睡眠スタイルタグ
  if (answers.sleepPosition === 'side') tags.push('side-sleeper');
  if (answers.sleepPosition === 'back') tags.push('back-sleeper');
  if (answers.sleepPosition === 'stomach') tags.push('stomach-sleeper');
  
  // 体格・肩幅タグ
  if (answers.shoulderWidth === 'wide') tags.push('high-shoulder');
  if (answers.shoulderWidth === 'narrow') tags.push('low-shoulder');
  
  // 健康・快適性タグ
  if (answers.hotSweaty) tags.push('hot-sweaty');
  if (answers.rollOver === 'many') tags.push('rollover-many');
  if (answers.rollOver === 'few') tags.push('rollover-few');
  if (answers.neckPain || answers.neckIssue !== 'none') tags.push('neck-issue');
  
  // 好みタグ
  if (answers.adjustable === 'yes') tags.push('wants-adjustable');
  if (answers.materialPref !== 'none') tags.push(`prefer-${answers.materialPref}`);
  
  // 予算・サイズタグ
  tags.push(`budget-${answers.budget}`);
  tags.push(`size-${answers.pillowSize}`);
  
  return tags;
}

// 高さ決定ロジック
function determineHeight(answers: Answers): "低め" | "ふつう" | "高め" {
  let baseHeight = 1; // 0: 低め, 1: ふつう, 2: 高め
  
  // ベース高さ
  switch (answers.sleepPosition) {
    case 'side': baseHeight = 2; break;
    case 'back': baseHeight = 1; break;
    case 'stomach': baseHeight = 0; break;
  }
  
  // 肩幅補正
  if (answers.shoulderWidth === 'wide') baseHeight += 1;
  if (answers.shoulderWidth === 'narrow') baseHeight -= 1;
  
  // ユーザー希望補正
  switch (answers.heightPref) {
    case 'high': baseHeight += 1; break;
    case 'low': baseHeight -= 1; break;
  }
  
  // 現在の枕の不満補正
  if (answers.currentPillow?.issues) {
    const issues = answers.currentPillow.issues;
    if (issues.tooHigh) baseHeight -= 1;
    if (issues.tooLow) baseHeight += 1;
  }

  // 寝返り頻度補正
  if (answers.rollOver === 'many') baseHeight += 0.5;
  
  // クリップして最終決定
  const finalHeight = Math.max(0, Math.min(2, Math.round(baseHeight)));
  
  switch (finalHeight) {
    case 0: return "低め";
    case 1: return "ふつう";
    case 2: return "高め";
    default: return "ふつう";
  }
}

// 硬さ決定ロジック
function determineFirmness(answers: Answers): "やわらかめ" | "ふつう" | "やや硬め" | "硬め" {
  let baseFirmness = 1; // 0: やわらかめ, 1: ふつう, 2: やや硬め, 3: 硬め
  
  // 首・肩の問題
  if (answers.neckIssue === 'cervical' || answers.neckIssue === 'stiff') {
    baseFirmness = 3; // 硬め
  } else if (answers.neckPain) {
    baseFirmness = 2; // やや硬め
  }
  
  // 寝返り頻度
  if (answers.rollOver === 'many') baseFirmness += 1;
  
  // マットレス硬さ補正
  if (answers.mattressHardness === 'soft') baseFirmness += 1;
  if (answers.mattressHardness === 'hard') baseFirmness -= 1;
  
  // クリップして最終決定
  const finalFirmness = Math.max(0, Math.min(3, baseFirmness));
  
  switch (finalFirmness) {
    case 0: return "やわらかめ";
    case 1: return "ふつう";
    case 2: return "やや硬め";
    case 3: return "硬め";
    default: return "ふつう";
  }
}

// カテゴリ決定ロジック
function determineCategories(answers: Answers): {
  primaryCategory: string;
  secondaryCandidates: Array<{key: string; label: string; tags: string[]; score: number}>;
} {
  const categories = [
    {
      key: 'cervical-support',
      label: '頸椎サポート枕',
      tags: ['cervical-support', 'wave-shape'],
      score: 0
    },
    {
      key: 'side-sleep',
      label: '横向き強化枕',
      tags: ['side-sleep', 'high-side'],
      score: 0
    },
    {
      key: 'back-stable',
      label: '後頭部安定枕',
      tags: ['back-stable', 'low-medium'],
      score: 0
    },
    {
      key: 'breathable',
      label: '通気性重視枕',
      tags: ['breathable', 'fiber-pipe'],
      score: 0
    },
    {
      key: 'adjustable',
      label: '調整式枕',
      tags: ['adjustable', 'height-variable'],
      score: 0
    },
    {
      key: 'wrapping',
      label: '包み込み系枕',
      tags: ['wrapping', 'memory-feather'],
      score: 0
    }
  ];
  
  // スコア計算
  if (answers.neckIssue === 'cervical' || answers.neckPain) {
    categories.find(c => c.key === 'cervical-support')!.score += 3;
  }
  
  if (answers.sleepPosition === 'side' || answers.snoring === 'yes') {
    categories.find(c => c.key === 'side-sleep')!.score += 2;
  }
  
  if (answers.sleepPosition === 'back' && answers.rollOver === 'few') {
    categories.find(c => c.key === 'back-stable')!.score += 2;
  }
  
  if (answers.hotSweaty) {
    categories.find(c => c.key === 'breathable')!.score += 2;
  }
  
  if (answers.adjustable === 'yes') {
    categories.find(c => c.key === 'adjustable')!.score += 2;
  }
  
  if (answers.rollOver === 'few' && answers.mattressHardness === 'soft') {
    categories.find(c => c.key === 'wrapping')!.score += 1;
  }
  
  // スコア順にソート
  categories.sort((a, b) => b.score - a.score);
  
  return {
    primaryCategory: categories[0].key,
    secondaryCandidates: categories.slice(1, 4).filter(c => c.score > 0)
  };
}

// サイズラベル生成
function getSizeLabel(size: string): { label: string; tag: string } {
  switch (size) {
    case 'small':
      return { label: '小さめ（約35×50cm）', tag: 'small' };
    case 'standard':
      return { label: '標準（約43×63cm）', tag: 'standard' };
    case 'large':
      return { label: '大きめ（約50×70cm）', tag: 'large' };
    default:
      return { label: '標準（約43×63cm）', tag: 'standard' };
  }
}

// 診断理由生成
function generateReasons(answers: Answers, height: string, firmness: string): string[] {
  const reasons: string[] = [];
  
  // 睡眠スタイル
  if (answers.sleepPosition === 'side') {
    reasons.push('横向き寝の特徴として、首が横向きに傾くため、首の角度を適切に保つ高さの枕が必要です。');
  } else if (answers.sleepPosition === 'back') {
    reasons.push('仰向け寝では、首の自然なカーブ（頸椎の生理的弯曲）を維持することが重要です。');
  } else if (answers.sleepPosition === 'stomach') {
    reasons.push('うつ伏せ寝は首を捻る姿勢になるため、首への負担が大きくなります。低めで柔らかい枕を使用することで、首の捻転を最小限に抑え、頸椎への負担を軽減できます。');
  }
  
  // 首・肩の問題
  if (answers.neckPain || answers.neckIssue !== 'none') {
    reasons.push('首や肩の痛みは、睡眠中の首の角度が原因であることが多いです。頸椎の自然なカーブを維持する高さと形状の枕を選択することで、首への負担を軽減し、痛みの改善が期待できます。');
  }
  
  // いびき
  if (answers.snoring === 'yes') {
    reasons.push('いびきの主な原因は気道の狭窄です。気道を確保しやすい高さと形状の枕を選択することで、いびきの軽減が期待できます。');
  }
  
  // 寝返り頻度
  if (answers.rollOver === 'many') {
    reasons.push('寝返りが多い場合、反発力のある素材や通気性の良い枕が適しています。これにより、快適な睡眠姿勢を維持しやすくなります。');
  }
  
  // 暑がり
  if (answers.hotSweaty) {
    reasons.push('暑がりの方には、通気性の良い素材の枕が効果的です。メッシュ素材や通気孔のある枕により、熱や湿気を逃がし、快適な睡眠環境を維持できます。');
  }
  
  return reasons;
}

// メイン診断関数を更新
export function diagnose(answers: Answers): DiagnosisResult {
  const tags = extractTags(answers);
  const height = determineHeight(answers);
  const firmness = determineFirmness(answers);
  const { primaryCategory, secondaryCandidates } = determineCategories(answers);
  const { label: sizeLabel, tag: sizeTag } = getSizeLabel(answers.pillowSize);
  const reasons = generateReasons(answers, height, firmness);
  
  // タイトルとサマリー生成
  const title = `${height}・${firmness}枕`;
  const summary = `${height}で${firmness}の枕を推奨します。${answers.sleepPosition === 'side' ? '横向き寝' : answers.sleepPosition === 'back' ? '仰向け寝' : 'うつ伏せ寝'}に適した形状と素材を選択しました。`;
  
  // 問題点・アプローチ・回避点・変更点の生成
  const problems: string[] = [];
  const approaches: string[] = [];
  const avoided: string[] = [];
  const changePoints: string[] = [];
  
  if (answers.neckPain) {
    problems.push('首や肩の痛み');
    approaches.push('頸椎の自然なカーブを維持する枕の形状');
    changePoints.push('首への負担を軽減する高さと形状');
  }
  
  if (answers.snoring === 'yes') {
    problems.push('いびき');
    approaches.push('気道を確保しやすい枕の形状');
    changePoints.push('いびき軽減のための枕の調整');
  }
  
  if (answers.hotSweaty) {
    problems.push('暑さ・汗');
    approaches.push('通気性の良い素材の選択');
    avoided.push('低反発素材（熱がこもりやすいため）');
    changePoints.push('通気性重視の素材への変更');
  }
  
  // 信頼度計算（簡易版）
  const confidence = Math.min(0.95, 0.7 + (tags.length * 0.02));
  
  // 商品情報を取得
  const primaryProducts = getProductsByCategory(primaryCategory);
  const primaryProduct = primaryProducts[0];
  
  // 次点候補の商品も取得
  const secondaryProducts: Product[] = [];
  secondaryCandidates.slice(0, 2).forEach(candidate => {
    const products = getProductsByCategory(candidate.key);
    if (products.length > 0) {
      secondaryProducts.push(products[0]);
    }
  });
  
  return {
    title,
    summary,
    height,
    firmness,
    sizeLabel,
    sizeTag,
    problems,
    approaches,
    avoided,
    changePoints,
    primaryCategory,
    secondaryCandidates,
    confidence,
    reasons,
    primaryProduct,
    secondaryProducts
  };
} 