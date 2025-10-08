// ギフト提案データ（検索キーワードベース）
export interface GiftItem {
  id?: string;
  name: string;
  description?: string;
  keywords: string[];
  priceRange: string;
}

// 高級お茶セット用の提案データ
export const giftTeaItems: GiftItem[] = [
  {
    id: "japanese_premium_tea",
    name: "日本茶 上級者向けセット",
    description: "煎茶、玉露、ほうじ茶など、日本茶の奥深さを味わえる上級者向けセット。",
    keywords: ["日本茶", "ギフト", "高級", "煎茶", "玉露"],
    priceRange: "¥4,000〜¥7,000",
  },
  {
    id: "uji_matcha_set",
    name: "宇治抹茶 高級茶セット",
    description: "上質な宇治抹茶と玉露の詰め合わせ。ギフトボックス付きで、母の癒しの時間を彩ります。",
    keywords: ["宇治抹茶", "玉露", "高級", "お茶", "ギフト"],
    priceRange: "¥3,000〜¥5,000",
  },
  {
    id: "herbal_relax_set",
    name: "ハーブティー リラックスセット",
    description: "カモミール、ラベンダー、ローズヒップなど、心を落ち着かせるハーブティーの詰め合わせ。",
    keywords: ["ハーブティー", "ギフト", "リラックス", "おしゃれ"],
    priceRange: "¥2,500〜¥4,000",
  },
];

// 残り9カテゴリのギフトアイテム定義
export const giftMiscItems: GiftItem[] = [
  {
    id: "seasonal_flowers",
    name: "季節の花ギフト",
    description: "季節の花や観葉植物は、部屋を明るくし、心をなごませてくれる定番ギフト。",
    keywords: ["季節の花", "ギフト", "フラワーアレンジメント", "プレゼント"],
    priceRange: "¥2,000〜¥6,000",
  },
  {
    id: "health_goods",
    name: "健康グッズ",
    description: "血圧計や体温計、マッサージ器など、母の健康をサポートする実用的なアイテム。",
    keywords: ["健康", "管理", "ギフト", "マッサージ器", "プレゼント"],
    priceRange: "¥5,000〜¥15,000",
  },
  {
    id: "gourmet_gift",
    name: "高級グルメギフト",
    description: "和菓子・洋菓子・海鮮・お肉など、母の好みに合わせて贅沢な味をセレクト。",
    keywords: ["グルメギフト", "高級", "母の日", "食品", "ギフト"],
    priceRange: "¥3,000〜¥10,000",
  },
  {
    id: "experience_gift",
    name: "体験ギフト",
    description: "温泉旅行、料理教室、陶芸、エステなど、思い出に残る\"非日常\"の贈り物。",
    keywords: ["体験ギフト", "母", "温泉旅行", "チケット", "プレゼント"],
    priceRange: "¥5,000〜¥20,000",
  },
  {
    id: "personalized_gift",
    name: "名入れ・メッセージ入りギフト",
    description: "名前入りの湯呑みや、感謝のメッセージが刻まれたタオル・ポーチなど。",
    keywords: ["名入れ", "ギフト", "母", "メッセージ入り", "プレゼント"],
    priceRange: "¥3,000〜¥10,000",
  },
  {
    id: "photo_album",
    name: "フォトアルバム・家族の思い出ギフト",
    description: "家族の写真を集めたアルバムや、子ども・孫の成長記録をまとめたフォトブック。",
    keywords: ["フォトアルバム", "ギフト", "家族写真", "プレゼント"],
    priceRange: "¥2,000〜¥8,000",
  },
  {
    id: "home_comfort",
    name: "おうち時間を楽しむアイテム",
    description: "読書灯、ルームシューズ、ブランケットなど、家で過ごす時間を快適にするグッズ。",
    keywords: ["おうち時間", "グッズ", "母", "プレゼント", "ルームシューズ"],
    priceRange: "¥2,000〜¥6,000",
  },
  {
    id: "seasonal_local",
    name: "季節限定・ご当地ギフト",
    description: "春の新茶、夏のゼリー、秋の栗スイーツ、冬のお鍋セットなど、季節感のある贈り物。",
    keywords: ["ご当地グルメ", "季節限定", "ギフト", "春", "新茶", "プレゼント"],
    priceRange: "¥3,000〜¥10,000",
  },
  {
    id: "relaxation_items",
    name: "癒し系リラクゼーションアイテム",
    description: "アロマディフューザー、入浴剤、ヒーリングCDなど、癒し時間を演出するギフト。",
    keywords: ["アロマ", "ギフト", "リラクゼーション", "プレゼント", "癒しグッズ"],
    priceRange: "¥2,000〜¥7,000",
  }
];

// モールリンク生成関数（楽天、Amazon、Yahoo用）
export const getMallLinks = (keywords: string[]) => {
  const keywordString = keywords.join(' ');
  const encoded = encodeURIComponent(keywordString);

  return {
    amazon: `https://www.amazon.co.jp/s?k=${encoded}&tag=marketsupporter-22`,
    rakuten: `https://search.rakuten.co.jp/search/mall/${encoded}/?scid=af_pc_etc&affiliate_id=marketsupporter`,
    yahoo: `https://shopping.yahoo.co.jp/search?p=${encoded}&affiliate_id=marketsupporter`,
  };
};

// 質問フロー用のデータ
export interface Question {
  id: string;
  text: string;
  options: string[];
  nextQuestionId?: string;
}

// カテゴリ別質問フロー
export const questionFlows = {
  "高級お茶セット": [
    {
      question: "お母さまは普段お茶を飲む習慣はありますか？",
      options: ["毎日飲む", "たまに飲む", "ほとんど飲まない"]
    },
    {
      question: "どのようなお茶がお好きですか？",
      options: ["緑茶・日本茶", "紅茶", "ハーブティー"]
    },
    {
      question: "どんなスタイルのギフトをお探しですか？",
      options: ["高級感のあるもの", "実用的なもの", "特別感のあるもの"]
    },
    {
      question: "最後に、ギフトの印象で重視したいのは？",
      options: ["見た目が華やか", "高級感", "実用性", "特別感"]
    }
  ],
  "美容・スキンケア": [
    {
      question: "最近、お肌や髪のことで気になることはありますか？",
      options: ["乾燥が気になる", "エイジングケアに興味がある", "特にない"]
    },
    {
      question: "普段のスキンケアで重視していることは？",
      options: ["保湿", "美白", "アンチエイジング", "特に意識していない"]
    },
    {
      question: "香りにこだわりはありますか？",
      options: ["香りにこだわりたい", "無香料が良い", "どちらでも良い"]
    },
    {
      question: "どんな美容アイテムに興味がありそうですか？",
      options: ["スキンケアセット", "バス・ボディケア", "ヘアケア", "化粧品"]
    }
  ],
  "健康グッズ": [
    {
      question: "お母さまは健康習慣で意識していることはありますか？",
      options: ["ウォーキングなど運動", "食事・栄養バランス", "特に意識していない"]
    },
    {
      question: "健康管理で気になることは？",
      options: ["血圧・血糖値", "肩こり・腰痛", "睡眠の質", "特にない"]
    },
    {
      question: "どんな健康グッズに興味がありそうですか？",
      options: ["測定器具", "マッサージ器具", "運動器具", "サプリメント"]
    },
    {
      question: "健康グッズの予算感は？",
      options: ["5,000円以下", "5,000〜10,000円", "10,000円以上", "こだわらない"]
    }
  ],
  "季節の花ギフト": [
    {
      question: "今の季節にぴったりの贈り物を探していますか？",
      options: ["季節感を重視したい", "定番のギフトが良い", "どちらでもよい"]
    },
    {
      question: "お花の好みはありますか？",
      options: ["生花が好き", "鉢植えが好き", "ドライフラワーが好き", "特にこだわりなし"]
    },
    {
      question: "お部屋の雰囲気はどんな感じですか？",
      options: ["明るい雰囲気", "落ち着いた雰囲気", "ナチュラルな雰囲気", "分からない"]
    },
    {
      question: "花ギフトの予算感は？",
      options: ["2,000円以下", "2,000〜5,000円", "5,000円以上", "こだわらない"]
    }
  ],
  "グルメギフト": [
    {
      question: "お母さまはどんな食べ物が好きですか？",
      options: ["甘いもの（スイーツなど）", "しょっぱいもの（煎餅・佃煮など）", "どちらも好き"]
    },
    {
      question: "普段の食事の好みは？",
      options: ["和食が好き", "洋食が好き", "中華が好き", "特にこだわりなし"]
    },
    {
      question: "ギフトの予算感は？",
      options: ["3,000円以下", "3,000〜5,000円", "5,000円以上", "こだわらない"]
    },
    {
      question: "どんなグルメギフトに興味がありそうですか？",
      options: ["和菓子・日本茶", "洋菓子・紅茶", "地方特産品", "高級食材"]
    }
  ],
  "体験ギフト": [
    {
      question: "お母さまは体験型のギフトに興味を持ちそうですか？",
      options: ["旅行や外出が好き", "リラックス系の体験が好き", "あまり外出しない"]
    },
    {
      question: "どんな体験に興味がありそうですか？",
      options: ["温泉・リラクゼーション", "料理教室・ワークショップ", "観劇・コンサート", "分からない"]
    },
    {
      question: "一緒に体験したいですか？",
      options: ["一緒に体験したい", "一人で楽しんでもらいたい", "どちらでも良い"]
    },
    {
      question: "体験ギフトの予算感は？",
      options: ["5,000円以下", "5,000〜15,000円", "15,000円以上", "こだわらない"]
    }
  ],
  "名入れ・メッセージ入りギフト": [
    {
      question: "名入れギフトのような特別感のある贈り物はどう思いますか？",
      options: ["喜ばれそう", "気にしないと思う", "好みが分かれそう"]
    },
    {
      question: "どんなメッセージを込めたいですか？",
      options: ["感謝の気持ち", "健康を願う気持ち", "いつまでも元気で", "シンプルに"]
    },
    {
      question: "どんなアイテムに名入れしたいですか？",
      options: ["湯呑み・マグカップ", "タオル・ハンカチ", "ポーチ・バッグ", "どれでも良い"]
    },
    {
      question: "名入れギフトの予算感は？",
      options: ["3,000円以下", "3,000〜8,000円", "8,000円以上", "こだわらない"]
    }
  ],
  "フォトアルバム・家族の思い出ギフト": [
    {
      question: "お母さまは家族との思い出を形に残すのが好きな方ですか？",
      options: ["写真をよく見返す", "たまに見る", "あまり興味がない"]
    },
    {
      question: "どんな写真を集めたいですか？",
      options: ["最近の家族写真", "子どもの成長記録", "旅行の思い出", "どれでも良い"]
    },
    {
      question: "アルバムのスタイルは？",
      options: ["デジタルアルバム", "手作りアルバム", "プロに頼む", "どれでも良い"]
    },
    {
      question: "思い出ギフトの予算感は？",
      options: ["3,000円以下", "3,000〜10,000円", "10,000円以上", "こだわらない"]
    }
  ],
  "おうち時間を楽しむアイテム": [
    {
      question: "お母さまは家で過ごす時間が長い方ですか？",
      options: ["自宅でのんびり過ごすのが好き", "外出が多い", "どちらとも言えない"]
    },
    {
      question: "家でよく過ごす場所は？",
      options: ["リビング", "寝室", "キッチン", "特に決まっていない"]
    },
    {
      question: "どんなアイテムに興味がありそうですか？",
      options: ["リラックスグッズ", "実用的なグッズ", "インテリアグッズ", "分からない"]
    },
    {
      question: "おうち時間アイテムの予算感は？",
      options: ["3,000円以下", "3,000〜8,000円", "8,000円以上", "こだわらない"]
    }
  ],
  "季節限定・ご当地ギフト": [
    {
      question: "季節限定や期間限定の商品に魅力を感じるタイプですか？",
      options: ["限定商品が好き", "あまり気にしない", "迷うので選びやすい方が良い"]
    },
    {
      question: "ご当地の特産品に興味はありますか？",
      options: ["ご当地のものが好き", "定番のものが良い", "どちらでも良い"]
    },
    {
      question: "今の季節に合ったギフトを探していますか？",
      options: ["季節感を重視したい", "季節に関係なく", "どちらでも良い"]
    },
    {
      question: "季節限定ギフトの予算感は？",
      options: ["3,000円以下", "3,000〜8,000円", "8,000円以上", "こだわらない"]
    }
  ]
};

// 旧形式との互換性のため残す
export const teaQuestions: Question[] = [
  {
    id: "tea_habit",
    text: "お母さまは普段お茶を飲む習慣はありますか？",
    options: ["毎日飲む", "たまに飲む", "ほとんど飲まない"],
    nextQuestionId: "tea_type"
  },
  {
    id: "tea_type",
    text: "どんな種類のお茶が好きそうですか？",
    options: ["緑茶・日本茶", "紅茶", "ハーブティー", "わからない"],
    nextQuestionId: "sweet_preference"
  },
  {
    id: "sweet_preference",
    text: "甘いお菓子や茶菓子と一緒に楽しむことはありますか？",
    options: ["はい", "いいえ", "わからない"],
    nextQuestionId: "gift_style"
  },
  {
    id: "gift_style",
    text: "贈り物としてはどんな雰囲気を重視したいですか？",
    options: ["見た目が華やか", "高級感", "実用性", "特別感"],
    nextQuestionId: "final"
  }
];

// カテゴリ別の提案生成関数
export function generateCategorySuggestions(category: string, answers: Record<string, string>): GiftItem[] {
  const suggestions: GiftItem[] = [];
  
  // カテゴリに応じた適切なアイテムを選択
  switch (category) {
    case "高級お茶セット":
      return generateTeaSuggestions(answers);
    
    case "美容・スキンケア":
      // 美容・スキンケア関連のアイテムを提案
      suggestions.push(
        { name: "高級スキンケアセット", keywords: ["スキンケア", "美容", "化粧品"], priceRange: "¥4,000〜¥12,000" },
        { name: "バスソルト・入浴剤セット", keywords: ["バスソルト", "入浴剤", "リラックス"], priceRange: "¥3,000〜¥8,000" },
        { name: "ヘアケアセット", keywords: ["ヘアケア", "シャンプー", "トリートメント"], priceRange: "¥2,000〜¥6,000" }
      );
      break;
    
    case "健康グッズ":
      // 健康グッズ関連のアイテムを提案
      suggestions.push(
        { name: "血圧計・健康測定器", keywords: ["血圧計", "健康測定", "医療機器"], priceRange: "¥5,000〜¥15,000" },
        { name: "マッサージ器具", keywords: ["マッサージ", "肩こり", "腰痛"], priceRange: "¥3,000〜¥10,000" },
        { name: "健康サプリメント", keywords: ["サプリメント", "健康", "栄養"], priceRange: "¥2,000〜¥8,000" }
      );
      break;
    
    case "季節の花ギフト":
      // 花ギフト関連のアイテムを提案
      suggestions.push(
        { name: "季節の生花アレンジメント", keywords: ["生花", "フラワーアレンジ", "季節"], priceRange: "¥2,000〜¥6,000" },
        { name: "観葉植物・鉢植え", keywords: ["観葉植物", "鉢植え", "グリーン"], priceRange: "¥3,000〜¥8,000" },
        { name: "ドライフラワー・プリザーブド", keywords: ["ドライフラワー", "プリザーブド", "長持ち"], priceRange: "¥2,500〜¥7,000" }
      );
      break;
    
    case "グルメギフト":
      // グルメギフト関連のアイテムを提案
      suggestions.push(
        { name: "高級和菓子セット", keywords: ["和菓子", "日本茶", "伝統"], priceRange: "¥3,000〜¥8,000" },
        { name: "洋菓子・ケーキセット", keywords: ["洋菓子", "ケーキ", "スイーツ"], priceRange: "¥2,500〜¥6,000" },
        { name: "地方特産品セット", keywords: ["地方特産", "ご当地", "名産品"], priceRange: "¥3,000〜¥7,000" }
      );
      break;
    
    case "体験ギフト":
      // 体験ギフト関連のアイテムを提案
      suggestions.push(
        { name: "温泉・リラクゼーション", keywords: ["温泉", "リラクゼーション", "癒し"], priceRange: "¥5,000〜¥20,000" },
        { name: "料理教室・ワークショップ", keywords: ["料理教室", "ワークショップ", "体験"], priceRange: "¥3,000〜¥10,000" },
        { name: "観劇・コンサートチケット", keywords: ["観劇", "コンサート", "エンターテイメント"], priceRange: "¥4,000〜¥15,000" }
      );
      break;
    
    case "名入れ・メッセージ入りギフト":
      // 名入れギフト関連のアイテムを提案
      suggestions.push(
        { name: "名入れマグカップ・湯呑み", keywords: ["名入れ", "マグカップ", "湯呑み"], priceRange: "¥3,000〜¥8,000" },
        { name: "名入れタオル・ハンカチ", keywords: ["名入れ", "タオル", "ハンカチ"], priceRange: "¥2,000〜¥5,000" },
        { name: "名入れポーチ・バッグ", keywords: ["名入れ", "ポーチ", "バッグ"], priceRange: "¥3,500〜¥8,000" }
      );
      break;
    
    case "フォトアルバム・家族の思い出ギフト":
      // 思い出ギフト関連のアイテムを提案
      suggestions.push(
        { name: "フォトアルバム制作", keywords: ["フォトアルバム", "写真", "思い出"], priceRange: "¥3,000〜¥10,000" },
        { name: "デジタルフォトフレーム", keywords: ["デジタルフォトフレーム", "写真", "デジタル"], priceRange: "¥5,000〜¥15,000" },
        { name: "手作りアルバムキット", keywords: ["手作り", "アルバム", "キット"], priceRange: "¥2,000〜¥6,000" }
      );
      break;
    
    case "おうち時間を楽しむアイテム":
      // おうち時間アイテム関連のアイテムを提案
      suggestions.push(
        { name: "リラックスブランケット", keywords: ["ブランケット", "リラックス", "おうち時間"], priceRange: "¥3,000〜¥8,000" },
        { name: "加湿器・空気清浄機", keywords: ["加湿器", "空気清浄機", "健康"], priceRange: "¥4,000〜¥12,000" },
        { name: "インテリア小物", keywords: ["インテリア", "小物", "装飾"], priceRange: "¥2,000〜¥6,000" }
      );
      break;
    
    case "季節限定・ご当地ギフト":
      // 季節限定ギフト関連のアイテムを提案
      suggestions.push(
        { name: "季節限定お菓子", keywords: ["季節限定", "お菓子", "スイーツ"], priceRange: "¥2,000〜¥5,000" },
        { name: "ご当地特産品", keywords: ["ご当地", "特産品", "地方"], priceRange: "¥3,000〜¥8,000" },
        { name: "期間限定雑貨", keywords: ["期間限定", "雑貨", "小物"], priceRange: "¥2,500〜¥6,000" }
      );
      break;
    
    default:
      // デフォルトは雑貨系
      return generateMiscSuggestions(answers);
  }
  
  return suggestions.slice(0, 3);
}

// 質問の回答に基づいてギフトを提案する関数（お茶専用）
export function generateTeaSuggestions(answers: Record<string, string>): GiftItem[] {
  const suggestions: GiftItem[] = [];
  
  // お茶の習慣に基づく絞り込み
  const habit = answers.tea_habit;
  const type = answers.tea_type;
  const style = answers.gift_style;
  
  // ロジック：習慣 + 種類 + スタイルで絞り込み
  if (habit === "毎日飲む" && type === "緑茶・日本茶") {
    suggestions.push(giftTeaItems[0]); // 日本茶上級者向け
  } else if (type === "ハーブティー" || style === "癒し") {
    suggestions.push(giftTeaItems[2]); // ハーブティー
  } else {
    suggestions.push(giftTeaItems[1]); // 宇治抹茶（デフォルト）
  }
  
  // 常に3つ提案（不足分は他のアイテムから選択）
  if (suggestions.length < 3) {
    const remaining = giftTeaItems.filter(item => !suggestions.includes(item));
    suggestions.push(...remaining.slice(0, 3 - suggestions.length));
  }
  
  return suggestions.slice(0, 3);
}

// カテゴリ別の提案生成関数
export function generateMiscSuggestions(answers: Record<string, string>): GiftItem[] {
  const suggestions: GiftItem[] = [];
  
  // 回答に基づく絞り込みロジック
  const interest = answers.interest || "";
  const lifestyle = answers.lifestyle || "";
  const budget = answers.budget || "";
  
  // 興味・関心に基づく提案
  if (interest.includes("健康") || interest.includes("体調")) {
    suggestions.push(giftMiscItems[1]); // 健康グッズ
  }
  
  if (interest.includes("料理") || interest.includes("グルメ")) {
    suggestions.push(giftMiscItems[2]); // 高級グルメギフト
  }
  
  if (interest.includes("癒し") || interest.includes("リラックス")) {
    suggestions.push(giftMiscItems[8]); // 癒し系リラクゼーション
  }
  
  // ライフスタイルに基づく提案
  if (lifestyle.includes("家で過ごす") || lifestyle.includes("おうち時間")) {
    suggestions.push(giftMiscItems[6]); // おうち時間アイテム
  }
  
  if (lifestyle.includes("外出") || lifestyle.includes("体験")) {
    suggestions.push(giftMiscItems[3]); // 体験ギフト
  }
  
  // 予算に基づく提案
  if (budget.includes("高め") || budget.includes("贅沢")) {
    suggestions.push(giftMiscItems[2]); // 高級グルメ
    suggestions.push(giftMiscItems[3]); // 体験ギフト
  } else {
    suggestions.push(giftMiscItems[0]); // 季節の花
    suggestions.push(giftMiscItems[6]); // おうち時間アイテム
  }
  
  // 常に3つ提案（不足分はランダム選択）
  if (suggestions.length < 3) {
    const remaining = giftMiscItems.filter(item => !suggestions.includes(item));
    suggestions.push(...remaining.slice(0, 3 - suggestions.length));
  }
  
  return suggestions.slice(0, 3);
}
