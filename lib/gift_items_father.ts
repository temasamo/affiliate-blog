// 実父・義父向けギフトカテゴリの追加データ

export interface GiftItem {
  id?: string;
  name: string;
  description?: string;
  keywords: string[];
  priceRange: string;
}

// 予算連動型価格表示のヘルパー関数
export function getPriceRangeByBudget(budget: string, basePriceRange: string): string {
  const budgetMap: Record<string, { min: number; max: number }> = {
    "5,000円未満": { min: 2000, max: 5000 },
    "5,000円〜10,000円未満": { min: 5000, max: 10000 },
    "10,000円〜20,000円未満": { min: 10000, max: 20000 },
    "20,000円以上": { min: 20000, max: 100000 }
  };

  const budgetRange = budgetMap[budget];
  if (!budgetRange) return basePriceRange;

  return `¥${budgetRange.min.toLocaleString()}〜¥${budgetRange.max.toLocaleString()}`;
}

// 予算に応じた商品名を生成する関数
export function getProductNameByBudget(baseName: string, budget: string): string {
  const budgetPrefixes: Record<string, string> = {
    "5,000円未満": "手軽な",
    "5,000円〜10,000円未満": "上質な",
    "10,000円〜20,000円未満": "プレミアムな",
    "20,000円以上": "最高級の"
  };

  const prefix = budgetPrefixes[budget] || "";
  return prefix ? `${prefix}${baseName}` : baseName;
}

// 予算フィルタリング機能
export function filterSuggestionsByBudget(suggestions: GiftItem[], budget: string): GiftItem[] {
  if (!budget) return suggestions;
  
  const budgetMap: Record<string, { min: number; max: number }> = {
    "5,000円未満": { min: 0, max: 5000 },
    "5,000円〜10,000円未満": { min: 5000, max: 10000 },
    "10,000円〜20,000円未満": { min: 10000, max: 20000 },
    "20,000円以上": { min: 20000, max: 100000 }
  };

  const budgetRange = budgetMap[budget];
  if (!budgetRange) return suggestions;

  return suggestions.filter(item => {
    // 価格範囲から数値を抽出
    const priceMatch = item.priceRange.match(/¥([0-9,]+)〜¥([0-9,]+)/);
    if (!priceMatch) return true; // 価格が解析できない場合は表示

    const minPrice = parseInt(priceMatch[1].replace(/,/g, ''));
    const maxPrice = parseInt(priceMatch[2].replace(/,/g, ''));

    // 予算範囲と重複するかチェック
    return (minPrice <= budgetRange.max && maxPrice >= budgetRange.min);
  });
}

// 実父向け質問フロー
export const fatherQuestionFlows = {
  "マッサージ機器": [
    {
      question: "お父さんが最近よく言う体の悩みは？",
      options: ["肩こり・首の疲れ", "腰痛・背中の疲れ", "足の疲れ・むくみ", "特にない"]
    },
    {
      question: "お父さんの普段の生活スタイルは？",
      options: ["デスクワーク中心", "立ち仕事が多い", "運動をよくする", "家で過ごすことが多い"]
    },
    {
      question: "マッサージ機器の使用場所は？",
      options: ["リビング", "寝室", "書斎", "どこでも使いたい"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "健康食品・サプリメント": [
    {
      question: "お父さんの健康面で気になることは？",
      options: ["疲れやすい", "関節の痛み", "血圧が気になる", "特にない"]
    },
    {
      question: "お父さんの食生活は？",
      options: ["バランス良く食べている", "外食が多い", "野菜不足", "規則正しく食べている"]
    },
    {
      question: "サプリメントの好みは？",
      options: ["錠剤タイプ", "粉末タイプ", "ドリンクタイプ", "特にこだわりなし"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "睡眠グッズ": [
    {
      question: "お父さんの睡眠で気になることは？",
      options: ["寝つきが悪い", "途中で目が覚める", "朝早く目が覚める", "特にない"]
    },
    {
      question: "お父さんの寝具の好みは？",
      options: ["やわらかい", "硬め", "適度な硬さ", "特にこだわりなし"]
    },
    {
      question: "睡眠グッズの種類は？",
      options: ["枕", "マットレス・敷き布団", "アイマスク・耳栓", "アロマ・香り"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "お酒ギフト": [
    {
      question: "お父さんの好きなお酒の種類は？",
      options: ["ウイスキー", "日本酒", "ビール", "ワイン"]
    },
    {
      question: "お酒を飲む頻度は？",
      options: ["毎日", "週に数回", "たまに", "特別な時だけ"]
    },
    {
      question: "ギフトの形式は？",
      options: ["単品", "セット", "飲み比べ", "特別なボトル"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "家電ガジェット": [
    {
      question: "お父さんの興味のある家電は？",
      options: ["スマートウォッチ", "コーヒーメーカー", "掃除機", "その他"]
    },
    {
      question: "お父さんの技術レベルは？",
      options: ["最新技術が好き", "基本的な操作", "シンプルなものが好き", "特にこだわりなし"]
    },
    {
      question: "使用目的は？",
      options: ["健康管理", "便利性向上", "趣味・娯楽", "実用性重視"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "趣味グッズ": [
    {
      question: "お父さんの趣味は？",
      options: ["釣り", "ゴルフ", "読書", "その他"]
    },
    {
      question: "趣味のレベルは？",
      options: ["初心者", "中級者", "上級者", "特にない"]
    },
    {
      question: "ギフトの種類は？",
      options: ["道具・用具", "消耗品", "アクセサリー", "書籍・雑誌"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "日常家電": [
    {
      question: "お父さんの日常で困っていることは？",
      options: ["歯磨き", "暑さ対策", "掃除", "その他"]
    },
    {
      question: "家電の好みは？",
      options: ["最新の機能", "シンプル", "コンパクト", "特にこだわりなし"]
    },
    {
      question: "使用頻度は？",
      options: ["毎日使う", "週に数回", "たまに使う", "必要に応じて"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "ブランド財布・キーケース": [
    {
      question: "お父さんの好みのスタイルは？",
      options: ["クラシック", "モダン", "カジュアル", "特にこだわりなし"]
    },
    {
      question: "アイテムの種類は？",
      options: ["財布", "キーケース", "カードケース", "セット"]
    },
    {
      question: "ブランドの好みは？",
      options: ["有名ブランド", "実用性重視", "デザイン重視", "特にこだわりなし"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "スポーツ系グッズ": [
    {
      question: "お父さんの運動習慣は？",
      options: ["ウォーキング", "ジョギング", "筋トレ", "特にない"]
    },
    {
      question: "スポーツグッズの種類は？",
      options: ["シューズ", "ウェア", "アクセサリー", "その他"]
    },
    {
      question: "使用頻度は？",
      options: ["毎日", "週に数回", "たまに", "これから始めたい"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "ルームウェア": [
    {
      question: "お父さんの家での過ごし方は？",
      options: ["リラックス重視", "動きやすさ重視", "おしゃれ重視", "特にこだわりなし"]
    },
    {
      question: "どのタイプのルームウェアをお探しですか？",
      options: ["パジャマ（寝間着）", "部屋着（普段着）", "スウェット（動きやすい）", "どれでも良い"]
    },
    {
      question: "素材の好みはありますか？",
      options: ["綿（通気性重視）", "フリース（保温重視）", "タオル地（吸水性重視）", "特にこだわりなし"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["3,000円未満", "3,000円〜8,000円", "8,000円〜15,000円", "15,000円以上"]
    }
  ]
};

// 実母向け質問フロー
export const motherQuestionFlows = {
  "美容・スキンケア": [
    {
      question: "お母さまは最近、お肌や髪について気になっていることはございますか？",
      options: ["シミ・くすみ", "乾燥・小じわ", "たるみ", "髪のダメージ", "特にない"]
    },
    {
      question: "お母さまの年齢層をお教えください",
      options: ["40代", "50代", "60代", "70代以上"]
    },
    {
      question: "今回のプレゼントの方向性はいかがいたしましょうか？",
      options: ["普段使っているもののアップグレード版", "普段使わない特別なもの"]
    },
    {
      question: "どんな内容をご希望ですか？",
      options: ["基礎化粧品", "スペシャルケア", "ボディ・ヘアケア", "美容家電", "香水・フレグランス", "その他"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
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
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "キッチン雑貨・調理器具": [
    {
      question: "お母さまは普段、どんな料理をされることが多いですか？",
      options: ["和食中心", "洋食中心", "中華料理", "特にこだわりなし"]
    },
    {
      question: "お母さまの年齢層をお教えください",
      options: ["40代", "50代", "60代", "70代以上"]
    },
    {
      question: "今回のプレゼントの方向性はいかがいたしましょうか？",
      options: ["普段使っているもののアップグレード版", "普段使わない特別なもの"]
    },
    {
      question: "どんな内容をご希望ですか？",
      options: ["調理器具", "食器・カトラリー", "キッチン小物", "収納・整理用品", "その他"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "アロマ・癒しグッズ": [
    {
      question: "お母さまは普段、どんな時間を大切にされていそうですか？",
      options: ["リラックスタイム", "お風呂タイム", "睡眠時間", "特にない"]
    },
    {
      question: "お母さまの年齢層をお教えください",
      options: ["40代", "50代", "60代", "70代以上"]
    },
    {
      question: "今回のプレゼントの方向性はいかがいたしましょうか？",
      options: ["普段使っているもののアップグレード版", "普段使わない特別なもの"]
    },
    {
      question: "どんな内容をご希望ですか？",
      options: ["アロマオイル・ディフューザー", "入浴剤・バス用品", "マッサージ用品", "リラックスグッズ", "その他"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "ブランド小物": [
    {
      question: "お母さまは普段、どんなスタイルを好まれていそうですか？",
      options: ["上品でクラシック", "モダンでおしゃれ", "シンプルで実用的", "特にこだわりなし"]
    },
    {
      question: "お母さまの年齢層をお教えください",
      options: ["40代", "50代", "60代", "70代以上"]
    },
    {
      question: "今回のプレゼントの方向性はいかがいたしましょうか？",
      options: ["普段使っているもののアップグレード版", "普段使わない特別なもの"]
    },
    {
      question: "どんな内容をご希望ですか？",
      options: ["バッグ・ハンドバッグ", "財布・小銭入れ", "アクセサリー", "時計", "その他"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "季節の花＆プリザーブドギフト": [
    {
      question: "お母さまは普段、お花や植物を飾る習慣はありますか？",
      options: ["よく飾っている", "たまに飾る", "ほとんど飾らない", "わからない"]
    },
    {
      question: "お母さまの年齢層をお教えください",
      options: ["40代", "50代", "60代", "70代以上"]
    },
    {
      question: "今回のプレゼントの方向性はいかがいたしましょうか？",
      options: ["普段使っているもののアップグレード版", "普段使わない特別なもの"]
    },
    {
      question: "どんな内容をご希望ですか？",
      options: ["生花・フラワーアレンジメント", "プリザーブドフラワー", "観葉植物", "ドライフラワー", "その他"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "グルメギフト": [
    {
      question: "お母さまは普段、どんな味の傾向がお好きですか？",
      options: ["和食・日本料理", "洋食・フレンチ", "中華料理", "特にこだわりなし"]
    },
    {
      question: "お母さまの年齢層をお教えください",
      options: ["40代", "50代", "60代", "70代以上"]
    },
    {
      question: "どのようなグルメギフトの体験をご希望ですか？",
      options: ["日常を彩るちょっと贅沢な品", "特別な日に贈る希少な逸品"]
    },
    {
      question: "どんな内容をご希望ですか？",
      options: ["和菓子・日本茶", "洋菓子・紅茶", "海鮮・お肉", "調味料・加工品", "その他"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "体験ギフト": [
    {
      question: "お母さまは普段、どんな活動を楽しまれていそうですか？",
      options: ["お料理・お菓子作り", "手芸・クラフト", "運動・スポーツ", "特にない"]
    },
    {
      question: "お母さまの年齢層をお教えください",
      options: ["40代", "50代", "60代", "70代以上"]
    },
    {
      question: "どのような体験ギフトをご希望ですか？",
      options: ["普段の活動をより充実させる体験", "新しい体験・特別な体験"]
    },
    {
      question: "どんな内容をご希望ですか？",
      options: ["料理教室・お菓子教室", "温泉・スパ", "エステ・美容", "旅行・観光", "その他"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "名入れ・メッセージ入りギフト": [
    {
      question: "お母さまは普段、どんなものを大切に使われていそうですか？",
      options: ["食器・カトラリー", "バッグ・小物", "タオル・布製品", "特にない"]
    },
    {
      question: "お母さまの年齢層をお教えください",
      options: ["40代", "50代", "60代", "70代以上"]
    },
    {
      question: "今回のプレゼントの方向性はいかがいたしましょうか？",
      options: ["普段使っているもののアップグレード版", "普段使わない特別なもの"]
    },
    {
      question: "どんな内容をご希望ですか？",
      options: ["食器・カトラリー", "バッグ・小物", "タオル・布製品", "アクセサリー", "その他"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "フォトアルバム・家族の思い出ギフト": [
    {
      question: "お母さまは普段、写真を整理したり見返したりしますか？",
      options: ["よくする", "たまにする", "ほとんどしない", "わからない"]
    },
    {
      question: "お母さまの年齢層をお教えください",
      options: ["40代", "50代", "60代", "70代以上"]
    },
    {
      question: "どのような思い出ギフトをご希望ですか？",
      options: ["普段の写真整理をより充実させる", "特別な思い出作り"]
    },
    {
      question: "どんな内容をご希望ですか？",
      options: ["フォトアルバム・写真整理", "デジタルフォトフレーム", "家族写真の加工・制作", "思い出の品の整理", "その他"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "おうち時間を楽しむアイテム": [
    {
      question: "お母さまは普段、おうちでどんな時間を過ごされていますか？",
      options: ["読書・学習", "手芸・クラフト", "お料理・お菓子作り", "特にない"]
    },
    {
      question: "お母さまの年齢層をお教えください",
      options: ["40代", "50代", "60代", "70代以上"]
    },
    {
      question: "どのようなおうち時間アイテムをご希望ですか？",
      options: ["普段の活動をより充実させるアイテム", "新しい趣味・特別なアイテム"]
    },
    {
      question: "どんな内容をご希望ですか？",
      options: ["読書・学習用品", "手芸・クラフト用品", "お料理・お菓子作り用品", "リラックス用品", "その他"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "季節限定・ご当地ギフト": [
    {
      question: "お母さまは普段、季節の行事や地域の特産品に興味がありますか？",
      options: ["とても興味がある", "たまに興味がある", "あまり興味がない", "わからない"]
    },
    {
      question: "お母さまの年齢層をお教えください",
      options: ["40代", "50代", "60代", "70代以上"]
    },
    {
      question: "どのような季節・地域ギフトをご希望ですか？",
      options: ["普段の生活に季節感を取り入れる", "特別な季節・地域の逸品"]
    },
    {
      question: "どんな内容をご希望ですか？",
      options: ["季節の食べ物・飲み物", "季節の花・植物", "ご当地特産品", "季節の雑貨", "その他"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ]
};

// 義父向け質問フロー
export const fatherInLawQuestionFlows = {
  "高級グルメギフト": [
    {
      question: "義父さまがお好きそうな味の傾向は？",
      options: ["和食・日本料理", "洋食・フレンチ", "中華料理", "特にこだわりなし"]
    },
    {
      question: "ギフトの印象は？",
      options: ["上品で高級感", "実用的で美味しい", "見た目が美しい", "特別感がある"]
    },
    {
      question: "食材の種類は？",
      options: ["肉類", "魚介類", "野菜・果物", "調味料・加工品"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "プレミアムドリンク": [
    {
      question: "義父さまの飲み物の好みは？",
      options: ["緑茶・日本茶", "紅茶", "コーヒー", "その他"]
    },
    {
      question: "ギフトの印象は？",
      options: ["上品で高級感", "実用的で美味しい", "見た目が美しい", "特別感がある"]
    },
    {
      question: "ドリンクの種類は？",
      options: ["茶葉", "インスタント", "セット", "特別なボトル"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "お酒（見た目重視）": [
    {
      question: "義父さまの好みの印象は？",
      options: ["クラシックで上品", "モダンで洗練", "伝統的で落ち着いた", "特別感がある"]
    },
    {
      question: "お酒の種類は？",
      options: ["ウイスキー", "日本酒", "ワイン", "その他"]
    },
    {
      question: "ギフトの形式は？",
      options: ["木箱入り", "特別なボトル", "セット", "飲み比べ"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "上品な健康グッズ": [
    {
      question: "義父さまの好みの印象は？",
      options: ["上品で高級感", "実用的で便利", "見た目が美しい", "特別感がある"]
    },
    {
      question: "健康グッズの種類は？",
      options: ["マッサージ器", "アイマスク", "血圧計", "その他"]
    },
    {
      question: "使用場所は？",
      options: ["リビング", "寝室", "書斎", "どこでも"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "ブランド小物": [
    {
      question: "義父さまの好みのスタイルは？",
      options: ["クラシックで上品", "モダンで洗練", "伝統的で落ち着いた", "特別感がある"]
    },
    {
      question: "小物の種類は？",
      options: ["ハンカチ", "ネクタイ", "ポーチ", "セット"]
    },
    {
      question: "ブランドの好みは？",
      options: ["有名ブランド", "実用性重視", "デザイン重視", "特にこだわりなし"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "靴下・肌着（上質系）": [
    {
      question: "義父さまの好みの印象は？",
      options: ["上品で高級感", "実用的で快適", "見た目が美しい", "特別感がある"]
    },
    {
      question: "アイテムの種類は？",
      options: ["靴下", "肌着", "セット", "その他"]
    },
    {
      question: "素材の好みは？",
      options: ["シルク", "コットン", "ウール", "特にこだわりなし"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "シニア向けガジェット": [
    {
      question: "義父さまの好みの印象は？",
      options: ["上品で高級感", "実用的で便利", "見た目が美しい", "特別感がある"]
    },
    {
      question: "ガジェットの種類は？",
      options: ["電波時計", "血圧計", "体温計", "その他"]
    },
    {
      question: "使用目的は？",
      options: ["健康管理", "便利性向上", "趣味・娯楽", "実用性重視"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "本・雑誌ギフト": [
    {
      question: "義父さまの興味のある分野は？",
      options: ["歴史", "趣味", "健康", "その他"]
    },
    {
      question: "ギフトの印象は？",
      options: ["上品で高級感", "実用的で役立つ", "見た目が美しい", "特別感がある"]
    },
    {
      question: "本の種類は？",
      options: ["雑誌", "書籍", "セット", "その他"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "季節感ギフト": [
    {
      question: "義父さまの好みの印象は？",
      options: ["上品で高級感", "実用的で美味しい", "見た目が美しい", "特別感がある"]
    },
    {
      question: "季節の種類は？",
      options: ["春", "夏", "秋", "冬"]
    },
    {
      question: "ギフトの種類は？",
      options: ["食べ物", "飲み物", "セット", "その他"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "和風雑貨": [
    {
      question: "義父さまの好みの印象は？",
      options: ["上品で高級感", "実用的で便利", "見た目が美しい", "特別感がある"]
    },
    {
      question: "雑貨の種類は？",
      options: ["風呂敷", "竹製品", "陶器", "その他"]
    },
    {
      question: "使用目的は？",
      options: ["実用性", "装飾性", "ギフト性", "その他"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ]
};

// 実父向け提案生成関数
export function generateFatherSuggestions(category: string, answers: Record<string, string>): GiftItem[] {
  const suggestions: GiftItem[] = [];
  
  switch (category) {
    case "マッサージ機器":
      const massageAnswer = answers.question_0 || "";
      if (massageAnswer.includes("肩こり") || massageAnswer.includes("首")) {
        suggestions.push(
          { name: "首・肩用マッサージ器", keywords: ["首", "肩", "マッサージ", "疲労回復"], priceRange: "¥8,000〜¥20,000" },
          { name: "ネックマッサージャー", keywords: ["ネック", "マッサージ", "首", "肩こり"], priceRange: "¥5,000〜¥15,000" },
          { name: "肩用温熱マッサージ器", keywords: ["肩", "温熱", "マッサージ", "血行促進"], priceRange: "¥6,000〜¥18,000" }
        );
      } else if (massageAnswer.includes("腰") || massageAnswer.includes("背中")) {
        suggestions.push(
          { name: "腰用マッサージ器", keywords: ["腰", "マッサージ", "腰痛", "疲労回復"], priceRange: "¥10,000〜¥25,000" },
          { name: "背中・腰用温熱マッサージ器", keywords: ["背中", "腰", "温熱", "マッサージ"], priceRange: "¥8,000〜¥20,000" },
          { name: "腰用マッサージクッション", keywords: ["腰", "クッション", "マッサージ", "座りながら"], priceRange: "¥5,000〜¥15,000" }
        );
      } else {
        suggestions.push(
          { name: "フットマッサージャー", keywords: ["足", "マッサージ", "疲労回復", "血行促進"], priceRange: "¥8,000〜¥20,000" },
          { name: "全身用マッサージ器", keywords: ["全身", "マッサージ", "疲労回復", "リラックス"], priceRange: "¥15,000〜¥35,000" },
          { name: "ハンドマッサージャー", keywords: ["手", "マッサージ", "疲労回復", "血行促進"], priceRange: "¥3,000〜¥8,000" }
        );
      }
      break;

    case "健康食品・サプリメント":
      const healthAnswer = answers.question_0 || "";
      if (healthAnswer.includes("疲れ")) {
        suggestions.push(
          { name: "疲労回復サプリ", keywords: ["疲労回復", "サプリ", "健康", "栄養補助"], priceRange: "¥3,000〜¥8,000" },
          { name: "高麗人参サプリ", keywords: ["高麗人参", "サプリ", "疲労回復", "滋養強壮"], priceRange: "¥4,000〜¥10,000" },
          { name: "マルチビタミン", keywords: ["マルチビタミン", "サプリ", "健康", "栄養補助"], priceRange: "¥2,500〜¥6,000" }
        );
      } else if (healthAnswer.includes("関節")) {
        suggestions.push(
          { name: "関節ケアサプリ", keywords: ["関節", "サプリ", "健康", "ケア"], priceRange: "¥3,500〜¥8,000" },
          { name: "グルコサミンサプリ", keywords: ["グルコサミン", "関節", "サプリ", "健康"], priceRange: "¥4,000〜¥9,000" },
          { name: "コンドロイチンサプリ", keywords: ["コンドロイチン", "関節", "サプリ", "健康"], priceRange: "¥3,000〜¥7,000" }
        );
      } else {
        suggestions.push(
          { name: "DHA・EPAサプリ", keywords: ["DHA", "EPA", "サプリ", "健康"], priceRange: "¥3,000〜¥8,000" },
          { name: "プロテイン", keywords: ["プロテイン", "サプリ", "健康", "筋肉"], priceRange: "¥4,000〜¥10,000" },
          { name: "青汁", keywords: ["青汁", "健康", "野菜", "栄養補助"], priceRange: "¥2,500〜¥6,000" }
        );
      }
      break;

    case "お酒ギフト":
      const alcoholAnswer = answers.question_0 || "";
      if (alcoholAnswer.includes("ウイスキー")) {
        suggestions.push(
          { name: "高級ウイスキー", keywords: ["ウイスキー", "高級", "ギフト", "お酒"], priceRange: "¥5,000〜¥20,000" },
          { name: "ウイスキーセット", keywords: ["ウイスキー", "セット", "ギフト", "お酒"], priceRange: "¥8,000〜¥25,000" },
          { name: "ウイスキー飲み比べ", keywords: ["ウイスキー", "飲み比べ", "ギフト", "お酒"], priceRange: "¥6,000〜¥18,000" }
        );
      } else if (alcoholAnswer.includes("日本酒")) {
        suggestions.push(
          { name: "高級日本酒", keywords: ["日本酒", "高級", "ギフト", "お酒"], priceRange: "¥3,000〜¥12,000" },
          { name: "日本酒セット", keywords: ["日本酒", "セット", "ギフト", "お酒"], priceRange: "¥5,000〜¥15,000" },
          { name: "地酒ギフト", keywords: ["地酒", "ギフト", "お酒", "地方"], priceRange: "¥4,000〜¥10,000" }
        );
      } else {
        suggestions.push(
          { name: "高級ビール", keywords: ["ビール", "高級", "ギフト", "お酒"], priceRange: "¥2,000〜¥8,000" },
          { name: "ワインギフト", keywords: ["ワイン", "ギフト", "お酒", "高級"], priceRange: "¥3,000〜¥12,000" },
          { name: "お酒ギフトセット", keywords: ["お酒", "ギフト", "セット", "多様"], priceRange: "¥5,000〜¥20,000" }
        );
      }
      break;

    case "睡眠グッズ":
      const sleepAnswer = answers.question_0 || "";
      if (sleepAnswer.includes("枕")) {
        suggestions.push(
          { name: "安眠枕", keywords: ["枕", "安眠", "快眠", "睡眠"], priceRange: "¥5,000〜¥15,000" },
          { name: "高級枕", keywords: ["枕", "高級", "快眠", "睡眠"], priceRange: "¥8,000〜¥20,000" },
          { name: "オーダー枕", keywords: ["枕", "オーダー", "快眠", "睡眠"], priceRange: "¥10,000〜¥25,000" }
        );
      } else if (sleepAnswer.includes("マット")) {
        suggestions.push(
          { name: "快眠マット", keywords: ["マット", "快眠", "睡眠", "安眠"], priceRange: "¥8,000〜¥20,000" },
          { name: "高級マット", keywords: ["マット", "高級", "快眠", "睡眠"], priceRange: "¥12,000〜¥30,000" },
          { name: "温熱マット", keywords: ["マット", "温熱", "快眠", "睡眠"], priceRange: "¥6,000〜¥18,000" }
        );
      } else {
        suggestions.push(
          { name: "快眠グッズ", keywords: ["快眠", "グッズ", "睡眠", "安眠"], priceRange: "¥3,000〜¥12,000" },
          { name: "睡眠サポートグッズ", keywords: ["睡眠", "サポート", "グッズ", "快眠"], priceRange: "¥5,000〜¥15,000" },
          { name: "安眠アイテム", keywords: ["安眠", "アイテム", "睡眠", "快眠"], priceRange: "¥4,000〜¥18,000" }
        );
      }
      break;

    case "グルメギフト":
      const gourmetAnswer = answers.question_0 || "";
      if (gourmetAnswer.includes("肉")) {
        suggestions.push(
          { name: "和牛ギフト", keywords: ["和牛", "肉", "ギフト", "美味しい"], priceRange: "¥6,000〜¥20,000" },
          { name: "高級肉ギフト", keywords: ["肉", "高級", "ギフト", "美味しい"], priceRange: "¥8,000〜¥25,000" },
          { name: "肉ギフトセット", keywords: ["肉", "ギフト", "セット", "多様"], priceRange: "¥5,000〜¥18,000" }
        );
      } else if (gourmetAnswer.includes("魚")) {
        suggestions.push(
          { name: "海鮮ギフト", keywords: ["海鮮", "魚", "ギフト", "美味しい"], priceRange: "¥5,000〜¥18,000" },
          { name: "高級魚ギフト", keywords: ["魚", "高級", "ギフト", "美味しい"], priceRange: "¥6,000〜¥22,000" },
          { name: "魚ギフトセット", keywords: ["魚", "ギフト", "セット", "多様"], priceRange: "¥4,000〜¥15,000" }
        );
      } else {
        suggestions.push(
          { name: "グルメギフト", keywords: ["グルメ", "ギフト", "美味しい", "お父さん"], priceRange: "¥4,000〜¥15,000" },
          { name: "高級グルメギフト", keywords: ["グルメ", "高級", "ギフト", "美味しい"], priceRange: "¥6,000〜¥20,000" },
          { name: "グルメギフトセット", keywords: ["グルメ", "ギフト", "セット", "多様"], priceRange: "¥5,000〜¥18,000" }
        );
      }
      break;

    case "家電ガジェット":
      const gadgetAnswer = answers.question_0 || "";
      if (gadgetAnswer.includes("スマートウォッチ")) {
        suggestions.push(
          { name: "スマートウォッチ", keywords: ["スマートウォッチ", "時計", "ガジェット", "便利"], priceRange: "¥15,000〜¥40,000" },
          { name: "高級スマートウォッチ", keywords: ["スマートウォッチ", "高級", "時計", "ガジェット"], priceRange: "¥25,000〜¥60,000" },
          { name: "健康管理スマートウォッチ", keywords: ["スマートウォッチ", "健康", "管理", "ガジェット"], priceRange: "¥20,000〜¥50,000" }
        );
      } else if (gadgetAnswer.includes("コーヒーメーカー")) {
        suggestions.push(
          { name: "自動コーヒーメーカー", keywords: ["コーヒーメーカー", "自動", "家電", "便利"], priceRange: "¥8,000〜¥25,000" },
          { name: "高級コーヒーメーカー", keywords: ["コーヒーメーカー", "高級", "家電", "便利"], priceRange: "¥12,000〜¥35,000" },
          { name: "プレミアムコーヒーメーカー", keywords: ["コーヒーメーカー", "プレミアム", "家電", "便利"], priceRange: "¥15,000〜¥45,000" }
        );
      } else {
        suggestions.push(
          { name: "便利なガジェット", keywords: ["ガジェット", "便利", "家電", "お父さん"], priceRange: "¥5,000〜¥20,000" },
          { name: "高級ガジェット", keywords: ["ガジェット", "高級", "家電", "便利"], priceRange: "¥8,000〜¥30,000" },
          { name: "実用的なガジェット", keywords: ["ガジェット", "実用的", "家電", "便利"], priceRange: "¥6,000〜¥25,000" }
        );
      }
      break;

    case "趣味グッズ":
      const hobbyAnswer = answers.question_0 || "";
      if (hobbyAnswer.includes("釣り")) {
        suggestions.push(
          { name: "釣りグッズ", keywords: ["釣り", "グッズ", "趣味", "お父さん"], priceRange: "¥5,000〜¥20,000" },
          { name: "高級釣りグッズ", keywords: ["釣り", "グッズ", "高級", "趣味"], priceRange: "¥8,000〜¥30,000" },
          { name: "釣りグッズセット", keywords: ["釣り", "グッズ", "セット", "趣味"], priceRange: "¥6,000〜¥25,000" }
        );
      } else if (hobbyAnswer.includes("ゴルフ")) {
        suggestions.push(
          { name: "ゴルフグッズ", keywords: ["ゴルフ", "グッズ", "趣味", "お父さん"], priceRange: "¥5,000〜¥20,000" },
          { name: "高級ゴルフグッズ", keywords: ["ゴルフ", "グッズ", "高級", "趣味"], priceRange: "¥8,000〜¥30,000" },
          { name: "ゴルフグッズセット", keywords: ["ゴルフ", "グッズ", "セット", "趣味"], priceRange: "¥6,000〜¥25,000" }
        );
      } else {
        suggestions.push(
          { name: "趣味グッズ", keywords: ["趣味", "グッズ", "お父さん", "プレゼント"], priceRange: "¥4,000〜¥18,000" },
          { name: "高級趣味グッズ", keywords: ["趣味", "グッズ", "高級", "お父さん"], priceRange: "¥6,000〜¥25,000" },
          { name: "趣味グッズセット", keywords: ["趣味", "グッズ", "セット", "お父さん"], priceRange: "¥5,000〜¥22,000" }
        );
      }
      break;

    case "日常家電":
      const dailyAnswer = answers.question_0 || "";
      if (dailyAnswer.includes("歯ブラシ")) {
        suggestions.push(
          { name: "電動歯ブラシ", keywords: ["電動歯ブラシ", "歯ブラシ", "家電", "健康"], priceRange: "¥5,000〜¥15,000" },
          { name: "高級電動歯ブラシ", keywords: ["電動歯ブラシ", "高級", "家電", "健康"], priceRange: "¥8,000〜¥25,000" },
          { name: "電動歯ブラシセット", keywords: ["電動歯ブラシ", "セット", "家電", "健康"], priceRange: "¥6,000〜¥20,000" }
        );
      } else if (dailyAnswer.includes("ファン")) {
        suggestions.push(
          { name: "ネックファン", keywords: ["ネックファン", "ファン", "家電", "便利"], priceRange: "¥3,000〜¥8,000" },
          { name: "高級ネックファン", keywords: ["ネックファン", "高級", "ファン", "家電"], priceRange: "¥5,000〜¥12,000" },
          { name: "ネックファンセット", keywords: ["ネックファン", "セット", "ファン", "家電"], priceRange: "¥4,000〜¥10,000" }
        );
      } else {
        suggestions.push(
          { name: "日常家電", keywords: ["家電", "日常", "便利", "お父さん"], priceRange: "¥3,000〜¥15,000" },
          { name: "高級日常家電", keywords: ["家電", "高級", "日常", "便利"], priceRange: "¥5,000〜¥20,000" },
          { name: "実用的な家電", keywords: ["家電", "実用的", "日常", "便利"], priceRange: "¥4,000〜¥18,000" }
        );
      }
      break;

    case "ブランド財布・キーケース":
      const walletAnswer = answers.question_1 || ""; // アイテムの種類を取得
      const styleAnswer = answers.question_0 || ""; // スタイルを取得
      
      if (walletAnswer.includes("財布")) {
        if (styleAnswer.includes("クラシック")) {
          suggestions.push(
            { name: "クラシック財布", keywords: ["財布", "クラシック", "ブランド", "実用的"], priceRange: "¥8,000〜¥25,000" },
            { name: "上品な財布", keywords: ["財布", "上品", "ブランド", "実用的"], priceRange: "¥10,000〜¥30,000" },
            { name: "伝統的な財布", keywords: ["財布", "伝統的", "ブランド", "実用的"], priceRange: "¥12,000〜¥35,000" }
          );
        } else if (styleAnswer.includes("モダン")) {
          suggestions.push(
            { name: "モダン財布", keywords: ["財布", "モダン", "ブランド", "実用的"], priceRange: "¥8,000〜¥25,000" },
            { name: "スタイリッシュ財布", keywords: ["財布", "スタイリッシュ", "ブランド", "実用的"], priceRange: "¥10,000〜¥30,000" },
            { name: "デザイナー財布", keywords: ["財布", "デザイナー", "ブランド", "実用的"], priceRange: "¥12,000〜¥35,000" }
          );
        } else {
          suggestions.push(
            { name: "ブランド財布", keywords: ["財布", "ブランド", "実用的", "お父さん"], priceRange: "¥8,000〜¥25,000" },
            { name: "高級財布", keywords: ["財布", "高級", "ブランド", "実用的"], priceRange: "¥10,000〜¥30,000" },
            { name: "実用的な財布", keywords: ["財布", "実用的", "ブランド", "お父さん"], priceRange: "¥6,000〜¥20,000" }
          );
        }
      } else if (walletAnswer.includes("キーケース")) {
        suggestions.push(
          { name: "ブランドキーケース", keywords: ["キーケース", "ブランド", "実用的", "お父さん"], priceRange: "¥5,000〜¥15,000" },
          { name: "高級キーケース", keywords: ["キーケース", "高級", "ブランド", "実用的"], priceRange: "¥8,000〜¥20,000" },
          { name: "実用的なキーケース", keywords: ["キーケース", "実用的", "ブランド", "お父さん"], priceRange: "¥4,000〜¥12,000" }
        );
      } else {
        suggestions.push(
          { name: "ブランド小物セット", keywords: ["ブランド", "小物", "セット", "お父さん"], priceRange: "¥10,000〜¥30,000" },
          { name: "高級小物セット", keywords: ["ブランド", "小物", "セット", "高級"], priceRange: "¥15,000〜¥40,000" },
          { name: "実用的な小物セット", keywords: ["ブランド", "小物", "セット", "実用的"], priceRange: "¥8,000〜¥25,000" }
        );
      }
      break;

    case "スポーツ系グッズ":
      const sportsAnswer = answers.question_0 || ""; // 運動習慣を取得
      const sportsTypeAnswer = answers.question_1 || ""; // スポーツグッズの種類を取得
      
      if (sportsAnswer.includes("ウォーキング")) {
        suggestions.push(
          { name: "ウォーキングシューズ", keywords: ["ウォーキング", "シューズ", "スポーツ", "健康"], priceRange: "¥8,000〜¥20,000" },
          { name: "高級ウォーキングシューズ", keywords: ["ウォーキング", "シューズ", "高級", "スポーツ"], priceRange: "¥12,000〜¥30,000" },
          { name: "ウォーキングウェア", keywords: ["ウォーキング", "ウェア", "スポーツ", "健康"], priceRange: "¥5,000〜¥15,000" }
        );
      } else if (sportsAnswer.includes("ジョギング")) {
        suggestions.push(
          { name: "ランニングシューズ", keywords: ["ランニング", "シューズ", "スポーツ", "健康"], priceRange: "¥8,000〜¥20,000" },
          { name: "高級ランニングシューズ", keywords: ["ランニング", "シューズ", "高級", "スポーツ"], priceRange: "¥12,000〜¥30,000" },
          { name: "ランニングウェア", keywords: ["ランニング", "ウェア", "スポーツ", "健康"], priceRange: "¥5,000〜¥15,000" }
        );
      } else if (sportsAnswer.includes("筋トレ")) {
        suggestions.push(
          { name: "筋トレグッズ", keywords: ["筋トレ", "グッズ", "スポーツ", "健康"], priceRange: "¥5,000〜¥20,000" },
          { name: "高級筋トレグッズ", keywords: ["筋トレ", "グッズ", "高級", "スポーツ"], priceRange: "¥8,000〜¥25,000" },
          { name: "筋トレウェア", keywords: ["筋トレ", "ウェア", "スポーツ", "健康"], priceRange: "¥4,000〜¥12,000" }
        );
      } else {
        suggestions.push(
          { name: "スポーツグッズ", keywords: ["スポーツ", "グッズ", "健康", "お父さん"], priceRange: "¥5,000〜¥20,000" },
          { name: "高級スポーツグッズ", keywords: ["スポーツ", "グッズ", "高級", "健康"], priceRange: "¥8,000〜¥25,000" },
          { name: "実用的なスポーツグッズ", keywords: ["スポーツ", "グッズ", "実用的", "健康"], priceRange: "¥6,000〜¥22,000" }
        );
      }
      break;

    case "ルームウェア":
      const roomwearAnswer = answers.question_0 || ""; // 家での過ごし方を取得
      const roomwearTypeAnswer = answers.question_1 || ""; // ルームウェアの種類を取得
      const materialAnswer = answers.question_2 || ""; // 素材の好みを取得
      
      // パジャマ系の提案（tentialブランドのドライロングシリーズを参考）
      if (roomwearTypeAnswer.includes("パジャマ") || roomwearTypeAnswer.includes("どれでも良い")) {
        if (materialAnswer.includes("綿")) {
          suggestions.push(
            { name: "メンズ綿パジャマ", keywords: ["メンズ", "パジャマ", "綿", "ルームウェア", "ドライロング", "tential"], priceRange: "¥3,000〜¥8,000" },
            { name: "高級綿パジャマセット", keywords: ["メンズ", "パジャマ", "綿", "高級", "ルームウェア", "ドライロング"], priceRange: "¥5,000〜¥12,000" },
            { name: "快適綿パジャマ", keywords: ["メンズ", "パジャマ", "綿", "快適", "ルームウェア", "tential"], priceRange: "¥4,000〜¥10,000" }
          );
        } else if (materialAnswer.includes("フリース")) {
          suggestions.push(
            { name: "メンズフリースパジャマ", keywords: ["メンズ", "パジャマ", "フリース", "ルームウェア", "暖かい", "tential"], priceRange: "¥4,000〜¥10,000" },
            { name: "高級フリースパジャマ", keywords: ["メンズ", "パジャマ", "フリース", "高級", "ルームウェア", "暖かい"], priceRange: "¥6,000〜¥15,000" },
            { name: "フリースパジャマセット", keywords: ["メンズ", "パジャマ", "フリース", "セット", "ルームウェア", "tential"], priceRange: "¥5,000〜¥12,000" }
          );
        } else if (materialAnswer.includes("タオル地")) {
          suggestions.push(
            { name: "メンズタオル地パジャマ", keywords: ["メンズ", "パジャマ", "タオル地", "ルームウェア", "吸水性", "tential"], priceRange: "¥3,000〜¥8,000" },
            { name: "高級タオル地パジャマ", keywords: ["メンズ", "パジャマ", "タオル地", "高級", "ルームウェア", "吸水性"], priceRange: "¥5,000〜¥12,000" },
            { name: "タオル地パジャマセット", keywords: ["メンズ", "パジャマ", "タオル地", "セット", "ルームウェア", "tential"], priceRange: "¥4,000〜¥10,000" }
          );
        } else {
          suggestions.push(
            { name: "メンズ快適パジャマ", keywords: ["メンズ", "パジャマ", "ルームウェア", "快適", "睡眠", "tential"], priceRange: "¥3,000〜¥8,000" },
            { name: "メンズ高級パジャマ", keywords: ["メンズ", "パジャマ", "高級", "ルームウェア", "睡眠", "ドライロング"], priceRange: "¥5,000〜¥12,000" },
            { name: "メンズパジャマセット", keywords: ["メンズ", "パジャマ", "セット", "ルームウェア", "睡眠", "tential"], priceRange: "¥4,000〜¥10,000" }
          );
        }
      } 
      // 部屋着系の提案（tentialブランドの部屋着シリーズを参考）
      else if (roomwearTypeAnswer.includes("部屋着")) {
        if (materialAnswer.includes("綿")) {
          suggestions.push(
            { name: "メンズ綿部屋着", keywords: ["メンズ", "部屋着", "綿", "ルームウェア", "快適", "tential"], priceRange: "¥3,000〜¥8,000" },
            { name: "高級綿部屋着", keywords: ["メンズ", "部屋着", "綿", "高級", "ルームウェア", "快適"], priceRange: "¥5,000〜¥12,000" },
            { name: "綿部屋着セット", keywords: ["メンズ", "部屋着", "綿", "セット", "ルームウェア", "tential"], priceRange: "¥4,000〜¥10,000" }
          );
        } else if (materialAnswer.includes("タオル地")) {
          suggestions.push(
            { name: "メンズタオル地部屋着", keywords: ["メンズ", "部屋着", "タオル地", "ルームウェア", "吸水性", "tential"], priceRange: "¥3,000〜¥8,000" },
            { name: "高級タオル地部屋着", keywords: ["メンズ", "部屋着", "タオル地", "高級", "ルームウェア", "吸水性"], priceRange: "¥5,000〜¥12,000" },
            { name: "タオル地部屋着セット", keywords: ["メンズ", "部屋着", "タオル地", "セット", "ルームウェア", "tential"], priceRange: "¥4,000〜¥10,000" }
          );
        } else if (materialAnswer.includes("フリース")) {
          suggestions.push(
            { name: "メンズフリース部屋着", keywords: ["メンズ", "部屋着", "フリース", "ルームウェア", "暖かい", "tential"], priceRange: "¥4,000〜¥10,000" },
            { name: "高級フリース部屋着", keywords: ["メンズ", "部屋着", "フリース", "高級", "ルームウェア", "暖かい"], priceRange: "¥6,000〜¥15,000" },
            { name: "フリース部屋着セット", keywords: ["メンズ", "部屋着", "フリース", "セット", "ルームウェア", "tential"], priceRange: "¥5,000〜¥12,000" }
          );
        } else {
          suggestions.push(
            { name: "メンズ快適部屋着", keywords: ["メンズ", "部屋着", "ルームウェア", "快適", "リラックス", "tential"], priceRange: "¥3,000〜¥8,000" },
            { name: "メンズ高級部屋着", keywords: ["メンズ", "部屋着", "高級", "ルームウェア", "リラックス", "tential"], priceRange: "¥5,000〜¥12,000" },
            { name: "メンズ部屋着セット", keywords: ["メンズ", "部屋着", "セット", "ルームウェア", "リラックス", "tential"], priceRange: "¥4,000〜¥10,000" }
          );
        }
      } 
      // スウェット系の提案（tentialブランドのスウェットシリーズを参考）
      else if (roomwearTypeAnswer.includes("スウェット")) {
        if (materialAnswer.includes("フリース")) {
          suggestions.push(
            { name: "メンズフリーススウェット", keywords: ["メンズ", "スウェット", "フリース", "ルームウェア", "暖かい", "tential"], priceRange: "¥4,000〜¥10,000" },
            { name: "高級フリーススウェット", keywords: ["メンズ", "スウェット", "フリース", "高級", "ルームウェア", "暖かい"], priceRange: "¥6,000〜¥15,000" },
            { name: "フリーススウェットセット", keywords: ["メンズ", "スウェット", "フリース", "セット", "ルームウェア", "tential"], priceRange: "¥5,000〜¥12,000" }
          );
        } else if (materialAnswer.includes("綿")) {
          suggestions.push(
            { name: "メンズ綿スウェット", keywords: ["メンズ", "スウェット", "綿", "ルームウェア", "快適", "tential"], priceRange: "¥3,000〜¥8,000" },
            { name: "高級綿スウェット", keywords: ["メンズ", "スウェット", "綿", "高級", "ルームウェア", "快適"], priceRange: "¥5,000〜¥12,000" },
            { name: "綿スウェットセット", keywords: ["メンズ", "スウェット", "綿", "セット", "ルームウェア", "tential"], priceRange: "¥4,000〜¥10,000" }
          );
        } else if (materialAnswer.includes("タオル地")) {
          suggestions.push(
            { name: "メンズタオル地スウェット", keywords: ["メンズ", "スウェット", "タオル地", "ルームウェア", "吸水性", "tential"], priceRange: "¥3,000〜¥8,000" },
            { name: "高級タオル地スウェット", keywords: ["メンズ", "スウェット", "タオル地", "高級", "ルームウェア", "吸水性"], priceRange: "¥5,000〜¥12,000" },
            { name: "タオル地スウェットセット", keywords: ["メンズ", "スウェット", "タオル地", "セット", "ルームウェア", "tential"], priceRange: "¥4,000〜¥10,000" }
          );
        } else {
          suggestions.push(
            { name: "メンズ快適スウェット", keywords: ["メンズ", "スウェット", "ルームウェア", "快適", "動きやすい", "tential"], priceRange: "¥3,000〜¥8,000" },
            { name: "メンズ高級スウェット", keywords: ["メンズ", "スウェット", "高級", "ルームウェア", "動きやすい", "tential"], priceRange: "¥5,000〜¥12,000" },
            { name: "メンズスウェットセット", keywords: ["メンズ", "スウェット", "セット", "ルームウェア", "動きやすい", "tential"], priceRange: "¥4,000〜¥10,000" }
          );
        }
      } 
      // その他の場合は、tentialブランドのルームウェアに特化した提案
      else {
        suggestions.push(
          { name: "メンズルームウェア", keywords: ["メンズ", "ルームウェア", "快適", "リラックス", "家着", "tential"], priceRange: "¥3,000〜¥8,000" },
          { name: "高級ルームウェア", keywords: ["メンズ", "ルームウェア", "高級", "リラックス", "家着", "tential"], priceRange: "¥5,000〜¥12,000" },
          { name: "ルームウェアセット", keywords: ["メンズ", "ルームウェア", "セット", "リラックス", "家着", "tential"], priceRange: "¥4,000〜¥10,000" }
        );
      }
      break;

    default:
      suggestions.push(
        { name: "実用的なギフト", keywords: ["実用", "ギフト", "お父さん", "プレゼント"], priceRange: "¥3,000〜¥15,000" },
        { name: "健康サポートグッズ", keywords: ["健康", "サポート", "ギフト", "お父さん"], priceRange: "¥5,000〜¥20,000" },
        { name: "趣味応援グッズ", keywords: ["趣味", "応援", "ギフト", "お父さん"], priceRange: "¥4,000〜¥18,000" }
      );
  }

  return suggestions;
}

// 実母向け提案生成関数
export function generateMotherSuggestions(category: string, answers: Record<string, string>): GiftItem[] {
  const suggestions: GiftItem[] = [];
  
  switch (category) {
    case "美容・スキンケア":
      const concernAnswer = answers.question_0 || "";
      const ageAnswer = answers.question_1 || "";
      const approachAnswer = answers.question_2 || "";
      const categoryAnswer = answers.question_3 || "";
      const budgetAnswer = answers.question_4 || ""; // 予算選択を取得
      
      // カテゴリ別の分岐
      if (categoryAnswer.includes("基礎化粧品")) {
        if (concernAnswer.includes("シミ・くすみ")) {
          const baseProducts = [
            { name: "美白美容液", keywords: ["美白", "美容液", "シミ", "くすみ", "スキンケア"] },
            { name: "美白セット", keywords: ["美白", "セット", "スキンケア"] },
            { name: "美白クリーム", keywords: ["美白", "クリーム", "スキンケア"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, budgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(budgetAnswer, "¥8,000〜¥25,000")
            });
          });
        } else if (concernAnswer.includes("乾燥・小じわ")) {
          const baseProducts = [
            { name: "保湿美容液", keywords: ["保湿", "美容液", "乾燥", "小じわ", "スキンケア"] },
            { name: "アンチエイジングセット", keywords: ["アンチエイジング", "セット", "スキンケア"] },
            { name: "保湿クリーム", keywords: ["保湿", "クリーム", "スキンケア"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, budgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(budgetAnswer, "¥8,000〜¥25,000")
            });
          });
        } else if (concernAnswer.includes("たるみ")) {
          const baseProducts = [
            { name: "リフトアップ美容液", keywords: ["リフトアップ", "美容液", "たるみ", "エイジングケア", "スキンケア"] },
            { name: "アンチエイジングセット", keywords: ["アンチエイジング", "セット", "たるみ", "スキンケア"] },
            { name: "リフトクリーム", keywords: ["リフト", "クリーム", "たるみ", "スキンケア"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, budgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(budgetAnswer, "¥10,000〜¥30,000")
            });
          });
        } else {
          const baseProducts = [
            { name: "スキンケアセット", keywords: ["スキンケア", "セット", "美容"] },
            { name: "美容液", keywords: ["美容液", "スキンケア"] },
            { name: "化粧水", keywords: ["化粧水", "スキンケア", "美容"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, budgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(budgetAnswer, "¥8,000〜¥25,000")
            });
          });
        }
      } else if (categoryAnswer.includes("スペシャルケア")) {
        if (concernAnswer.includes("シミ・くすみ")) {
          const baseProducts = [
            { name: "高濃度美白セラム", keywords: ["高濃度", "美白", "セラム", "シミ", "くすみ"] },
            { name: "美白マスク", keywords: ["美白", "マスク", "集中ケア"] },
            { name: "美白エッセンス", keywords: ["美白", "エッセンス", "集中ケア"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, budgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(budgetAnswer, "¥10,000〜¥30,000")
            });
          });
        } else if (concernAnswer.includes("乾燥・小じわ")) {
          const baseProducts = [
            { name: "高濃度保湿セラム", keywords: ["高濃度", "保湿", "セラム", "乾燥", "小じわ"] },
            { name: "保湿マスク", keywords: ["保湿", "マスク", "集中ケア"] },
            { name: "保湿エッセンス", keywords: ["保湿", "エッセンス", "集中ケア"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, budgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(budgetAnswer, "¥10,000〜¥30,000")
            });
          });
        } else if (concernAnswer.includes("たるみ")) {
          const baseProducts = [
            { name: "リフトアップセラム", keywords: ["リフトアップ", "セラム", "たるみ", "集中ケア"] },
            { name: "リフトアップマスク", keywords: ["リフトアップ", "マスク", "集中ケア"] },
            { name: "アンチエイジングエッセンス", keywords: ["アンチエイジング", "エッセンス", "集中ケア"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, budgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(budgetAnswer, "¥12,000〜¥35,000")
            });
          });
        } else {
          const baseProducts = [
            { name: "スペシャルケアセット", keywords: ["スペシャルケア", "セット", "集中ケア"] },
            { name: "高濃度セラム", keywords: ["高濃度", "セラム", "集中ケア"] },
            { name: "集中ケアマスク", keywords: ["集中ケア", "マスク", "スペシャル"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, budgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(budgetAnswer, "¥10,000〜¥30,000")
            });
          });
        }
      } else if (categoryAnswer.includes("ボディ・ヘアケア")) {
        if (concernAnswer.includes("髪のダメージ")) {
          const baseProducts = [
            { name: "ヘアトリートメント", keywords: ["ヘアトリートメント", "ダメージ", "ヘアケア"] },
            { name: "シャンプーセット", keywords: ["シャンプー", "セット", "ヘアケア"] },
            { name: "ヘアオイル", keywords: ["ヘアオイル", "ダメージ", "ヘアケア"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, budgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(budgetAnswer, "¥5,000〜¥15,000")
            });
          });
        } else {
          const baseProducts = [
            { name: "ボディケアセット", keywords: ["ボディケア", "セット", "美容"] },
            { name: "ボディクリーム", keywords: ["ボディクリーム", "ボディケア"] },
            { name: "ボディソープ", keywords: ["ボディソープ", "ボディケア", "美容"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, budgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(budgetAnswer, "¥4,000〜¥12,000")
            });
          });
        }
      } else if (categoryAnswer.includes("美容家電")) {
        const baseProducts = [
          { name: "美顔器", keywords: ["美顔器", "美容家電", "スキンケア"] },
          { name: "イオンフェイシャル", keywords: ["イオンフェイシャル", "美容家電", "美顔器"] },
          { name: "超音波美顔器", keywords: ["超音波", "美顔器", "美容家電"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, budgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(budgetAnswer, "¥15,000〜¥50,000")
          });
        });
      } else if (categoryAnswer.includes("香水・フレグランス")) {
        const baseProducts = [
          { name: "高級香水", keywords: ["香水", "フレグランス", "香り"] },
          { name: "フレグランスセット", keywords: ["フレグランス", "セット", "香り"] },
          { name: "ボディミスト", keywords: ["ボディミスト", "香り", "フレグランス"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, budgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(budgetAnswer, "¥8,000〜¥25,000")
          });
        });
      } else {
        // その他の場合
        const baseProducts = [
          { name: "美容ギフトセット", keywords: ["美容", "ギフト", "セット"] },
          { name: "スキンケアセット", keywords: ["スキンケア", "セット", "美容"] },
          { name: "美容アイテム", keywords: ["美容", "アイテム", "ギフト"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, budgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(budgetAnswer, "¥8,000〜¥25,000")
          });
        });
      }
      break;

    case "キッチン雑貨・調理器具":
      const kitchenConcernAnswer = answers.question_0 || "";
      const kitchenAgeAnswer = answers.question_1 || "";
      const kitchenApproachAnswer = answers.question_2 || "";
      const kitchenCategoryAnswer = answers.question_3 || "";
      const kitchenBudgetAnswer = answers.question_4 || "";
      
      if (kitchenCategoryAnswer.includes("調理器具")) {
        const baseProducts = [
          { name: "包丁セット", keywords: ["包丁", "調理器具", "キッチン"] },
          { name: "フライパンセット", keywords: ["フライパン", "調理器具", "キッチン"] },
          { name: "調理器具セット", keywords: ["調理器具", "セット", "キッチン"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, kitchenBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(kitchenBudgetAnswer, "¥8,000〜¥25,000")
          });
        });
      } else if (kitchenCategoryAnswer.includes("食器・カトラリー")) {
        const baseProducts = [
          { name: "食器セット", keywords: ["食器", "セット", "キッチン"] },
          { name: "カトラリーセット", keywords: ["カトラリー", "セット", "キッチン"] },
          { name: "和食器セット", keywords: ["和食器", "セット", "キッチン"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, kitchenBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(kitchenBudgetAnswer, "¥6,000〜¥20,000")
          });
        });
      } else {
        const baseProducts = [
          { name: "キッチン小物セット", keywords: ["キッチン小物", "セット", "キッチン"] },
          { name: "収納用品", keywords: ["収納", "キッチン", "整理"] },
          { name: "キッチン雑貨", keywords: ["キッチン雑貨", "キッチン"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, kitchenBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(kitchenBudgetAnswer, "¥5,000〜¥15,000")
          });
        });
      }
      break;

    case "アロマ・癒しグッズ":
      const aromaConcernAnswer = answers.question_0 || "";
      const aromaAgeAnswer = answers.question_1 || "";
      const aromaApproachAnswer = answers.question_2 || "";
      const aromaCategoryAnswer = answers.question_3 || "";
      const aromaBudgetAnswer = answers.question_4 || "";
      
      if (aromaCategoryAnswer.includes("アロマオイル・ディフューザー")) {
        const baseProducts = [
          { name: "アロマディフューザー", keywords: ["アロマ", "ディフューザー", "癒し"] },
          { name: "アロマオイルセット", keywords: ["アロマオイル", "セット", "癒し"] },
          { name: "アロマキャンドル", keywords: ["アロマキャンドル", "癒し", "香り"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, aromaBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(aromaBudgetAnswer, "¥5,000〜¥15,000")
          });
        });
      } else if (aromaCategoryAnswer.includes("入浴剤・バス用品")) {
        const baseProducts = [
          { name: "入浴剤セット", keywords: ["入浴剤", "セット", "バス", "癒し"] },
          { name: "バス用品セット", keywords: ["バス用品", "セット", "癒し"] },
          { name: "バスソルト", keywords: ["バスソルト", "癒し", "バス"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, aromaBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(aromaBudgetAnswer, "¥3,000〜¥12,000")
          });
        });
      } else {
        const baseProducts = [
          { name: "マッサージ用品", keywords: ["マッサージ", "癒し", "リラックス"] },
          { name: "リラックスグッズ", keywords: ["リラックス", "癒し", "グッズ"] },
          { name: "癒しグッズセット", keywords: ["癒しグッズ", "セット", "リラックス"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, aromaBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(aromaBudgetAnswer, "¥4,000〜¥15,000")
          });
        });
      }
      break;

    case "ブランド小物":
      const brandConcernAnswer = answers.question_0 || "";
      const brandAgeAnswer = answers.question_1 || "";
      const brandApproachAnswer = answers.question_2 || "";
      const brandCategoryAnswer = answers.question_3 || "";
      const brandBudgetAnswer = answers.question_4 || "";
      
      if (brandCategoryAnswer.includes("バッグ・ハンドバッグ")) {
        const baseProducts = [
          { name: "ハンドバッグ", keywords: ["ハンドバッグ", "バッグ", "ブランド"] },
          { name: "トートバッグ", keywords: ["トートバッグ", "バッグ", "ブランド"] },
          { name: "ショルダーバッグ", keywords: ["ショルダーバッグ", "バッグ", "ブランド"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, brandBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(brandBudgetAnswer, "¥8,000〜¥30,000")
          });
        });
      } else if (brandCategoryAnswer.includes("財布・小銭入れ")) {
        const baseProducts = [
          { name: "長財布", keywords: ["長財布", "財布", "ブランド"] },
          { name: "小銭入れ", keywords: ["小銭入れ", "財布", "ブランド"] },
          { name: "カードケース", keywords: ["カードケース", "財布", "ブランド"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, brandBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(brandBudgetAnswer, "¥6,000〜¥25,000")
          });
        });
      } else {
        const baseProducts = [
          { name: "アクセサリー", keywords: ["アクセサリー", "ブランド", "小物"] },
          { name: "時計", keywords: ["時計", "ブランド", "小物"] },
          { name: "ブランド小物セット", keywords: ["ブランド小物", "セット", "小物"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, brandBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(brandBudgetAnswer, "¥8,000〜¥35,000")
          });
        });
      }
      break;

    case "季節の花＆プリザーブドギフト":
      const flowerConcernAnswer = answers.question_0 || "";
      const flowerAgeAnswer = answers.question_1 || "";
      const flowerApproachAnswer = answers.question_2 || "";
      const flowerCategoryAnswer = answers.question_3 || "";
      const flowerBudgetAnswer = answers.question_4 || "";
      
      if (flowerCategoryAnswer.includes("生花・フラワーアレンジメント")) {
        const baseProducts = [
          { name: "フラワーアレンジメント", keywords: ["フラワーアレンジメント", "生花", "花"] },
          { name: "生花ブーケ", keywords: ["生花ブーケ", "生花", "花"] },
          { name: "季節の花束", keywords: ["季節の花束", "生花", "花"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, flowerBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(flowerBudgetAnswer, "¥3,000〜¥12,000")
          });
        });
      } else if (flowerCategoryAnswer.includes("プリザーブドフラワー")) {
        const baseProducts = [
          { name: "プリザーブドフラワー", keywords: ["プリザーブドフラワー", "花", "長持ち"] },
          { name: "プリザーブドアレンジ", keywords: ["プリザーブドアレンジ", "花", "長持ち"] },
          { name: "プリザーブドブーケ", keywords: ["プリザーブドブーケ", "花", "長持ち"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, flowerBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(flowerBudgetAnswer, "¥5,000〜¥20,000")
          });
        });
      } else {
        const baseProducts = [
          { name: "観葉植物", keywords: ["観葉植物", "植物", "花"] },
          { name: "ドライフラワー", keywords: ["ドライフラワー", "花", "植物"] },
          { name: "花ギフトセット", keywords: ["花ギフト", "セット", "花"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, flowerBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(flowerBudgetAnswer, "¥4,000〜¥15,000")
          });
        });
      }
      break;

    case "グルメギフト":
      const gourmetConcernAnswer = answers.question_0 || "";
      const gourmetAgeAnswer = answers.question_1 || "";
      const gourmetApproachAnswer = answers.question_2 || "";
      const gourmetCategoryAnswer = answers.question_3 || "";
      const gourmetBudgetAnswer = answers.question_4 || "";
      
      // 方向性に基づく分岐
      if (gourmetApproachAnswer.includes("日常を彩るちょっと贅沢な品")) {
        if (gourmetCategoryAnswer.includes("和菓子・日本茶")) {
          const baseProducts = [
            { name: "上質な和菓子セット", keywords: ["和菓子", "上質", "セット", "グルメ", "日常"] },
            { name: "高級日本茶セット", keywords: ["日本茶", "高級", "セット", "グルメ", "日常"] },
            { name: "季節の和菓子ギフト", keywords: ["和菓子", "季節", "ギフト", "グルメ", "日常"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, gourmetBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(gourmetBudgetAnswer, "¥4,000〜¥15,000")
            });
          });
        } else if (gourmetCategoryAnswer.includes("洋菓子・紅茶")) {
          const baseProducts = [
            { name: "上質な洋菓子セット", keywords: ["洋菓子", "上質", "セット", "グルメ", "日常"] },
            { name: "高級紅茶セット", keywords: ["紅茶", "高級", "セット", "グルメ", "日常"] },
            { name: "季節の洋菓子ギフト", keywords: ["洋菓子", "季節", "ギフト", "グルメ", "日常"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, gourmetBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(gourmetBudgetAnswer, "¥5,000〜¥18,000")
            });
          });
        } else {
          const baseProducts = [
            { name: "上質な海鮮ギフト", keywords: ["海鮮", "上質", "ギフト", "グルメ", "日常"] },
            { name: "高級お肉ギフト", keywords: ["お肉", "高級", "ギフト", "グルメ", "日常"] },
            { name: "上質な調味料セット", keywords: ["調味料", "上質", "セット", "グルメ", "日常"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, gourmetBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(gourmetBudgetAnswer, "¥6,000〜¥20,000")
            });
          });
        }
      } else if (gourmetApproachAnswer.includes("特別な日に贈る希少な逸品")) {
        if (gourmetCategoryAnswer.includes("和菓子・日本茶")) {
          const baseProducts = [
            { name: "希少な和菓子逸品", keywords: ["和菓子", "希少", "逸品", "グルメ", "特別"] },
            { name: "限定日本茶ギフト", keywords: ["日本茶", "限定", "ギフト", "グルメ", "特別"] },
            { name: "伝統工芸和菓子", keywords: ["和菓子", "伝統工芸", "グルメ", "特別"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, gourmetBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(gourmetBudgetAnswer, "¥8,000〜¥25,000")
            });
          });
        } else if (gourmetCategoryAnswer.includes("洋菓子・紅茶")) {
          const baseProducts = [
            { name: "希少な洋菓子逸品", keywords: ["洋菓子", "希少", "逸品", "グルメ", "特別"] },
            { name: "限定紅茶ギフト", keywords: ["紅茶", "限定", "ギフト", "グルメ", "特別"] },
            { name: "高級洋菓子コレクション", keywords: ["洋菓子", "高級", "コレクション", "グルメ", "特別"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, gourmetBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(gourmetBudgetAnswer, "¥10,000〜¥30,000")
            });
          });
        } else {
          const baseProducts = [
            { name: "希少な海鮮逸品", keywords: ["海鮮", "希少", "逸品", "グルメ", "特別"] },
            { name: "高級お肉逸品", keywords: ["お肉", "高級", "逸品", "グルメ", "特別"] },
            { name: "限定調味料コレクション", keywords: ["調味料", "限定", "コレクション", "グルメ", "特別"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, gourmetBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(gourmetBudgetAnswer, "¥12,000〜¥35,000")
            });
          });
        }
      } else {
        // デフォルト
        const baseProducts = [
          { name: "グルメギフトセット", keywords: ["グルメ", "ギフト", "セット"] },
          { name: "高級グルメギフト", keywords: ["グルメ", "高級", "ギフト"] },
          { name: "特別なグルメギフト", keywords: ["グルメ", "特別", "ギフト"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, gourmetBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(gourmetBudgetAnswer, "¥6,000〜¥20,000")
          });
        });
      }
      break;

    case "体験ギフト":
      const experienceConcernAnswer = answers.question_0 || "";
      const experienceAgeAnswer = answers.question_1 || "";
      const experienceApproachAnswer = answers.question_2 || "";
      const experienceCategoryAnswer = answers.question_3 || "";
      const experienceBudgetAnswer = answers.question_4 || "";
      
      // 方向性に基づく分岐
      if (experienceApproachAnswer.includes("普段の活動をより充実させる体験")) {
        if (experienceCategoryAnswer.includes("料理教室・お菓子作り")) {
          const baseProducts = [
            { name: "上級料理教室体験券", keywords: ["料理教室", "上級", "体験券", "体験", "充実"] },
            { name: "専門お菓子教室体験券", keywords: ["お菓子教室", "専門", "体験券", "体験", "充実"] },
            { name: "料理・お菓子教室セット", keywords: ["料理教室", "お菓子教室", "セット", "体験", "充実"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, experienceBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(experienceBudgetAnswer, "¥8,000〜¥25,000")
            });
          });
        } else if (experienceCategoryAnswer.includes("温泉・スパ")) {
          const baseProducts = [
            { name: "高級温泉旅行券", keywords: ["温泉", "高級", "旅行券", "体験", "充実"] },
            { name: "プレミアムスパ体験券", keywords: ["スパ", "プレミアム", "体験券", "体験", "充実"] },
            { name: "温泉・スパ充実セット", keywords: ["温泉", "スパ", "セット", "体験", "充実"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, experienceBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(experienceBudgetAnswer, "¥10,000〜¥30,000")
            });
          });
        } else {
          const baseProducts = [
            { name: "高級エステ体験券", keywords: ["エステ", "高級", "体験券", "体験", "充実"] },
            { name: "充実旅行・観光券", keywords: ["旅行", "観光券", "体験", "充実"] },
            { name: "充実体験ギフトセット", keywords: ["体験ギフト", "セット", "体験", "充実"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, experienceBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(experienceBudgetAnswer, "¥8,000〜¥35,000")
            });
          });
        }
      } else if (experienceApproachAnswer.includes("新しい体験・特別な体験")) {
        if (experienceCategoryAnswer.includes("料理教室・お菓子作り")) {
          const baseProducts = [
            { name: "特別料理教室体験券", keywords: ["料理教室", "特別", "体験券", "体験", "新体験"] },
            { name: "創作お菓子教室体験券", keywords: ["お菓子教室", "創作", "体験券", "体験", "新体験"] },
            { name: "特別料理・お菓子教室セット", keywords: ["料理教室", "お菓子教室", "セット", "体験", "新体験"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, experienceBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(experienceBudgetAnswer, "¥12,000〜¥35,000")
            });
          });
        } else if (experienceCategoryAnswer.includes("温泉・スパ")) {
          const baseProducts = [
            { name: "特別温泉旅行券", keywords: ["温泉", "特別", "旅行券", "体験", "新体験"] },
            { name: "特別スパ体験券", keywords: ["スパ", "特別", "体験券", "体験", "新体験"] },
            { name: "特別温泉・スパセット", keywords: ["温泉", "スパ", "セット", "体験", "新体験"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, experienceBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(experienceBudgetAnswer, "¥15,000〜¥40,000")
            });
          });
        } else {
          const baseProducts = [
            { name: "特別エステ体験券", keywords: ["エステ", "特別", "体験券", "体験", "新体験"] },
            { name: "特別旅行・観光券", keywords: ["旅行", "観光券", "体験", "新体験", "特別"] },
            { name: "特別体験ギフトセット", keywords: ["体験ギフト", "セット", "体験", "新体験", "特別"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, experienceBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(experienceBudgetAnswer, "¥12,000〜¥45,000")
            });
          });
        }
      } else {
        // デフォルト
        const baseProducts = [
          { name: "体験ギフトセット", keywords: ["体験ギフト", "セット", "体験"] },
          { name: "特別体験ギフト", keywords: ["体験ギフト", "特別", "体験"] },
          { name: "充実体験ギフト", keywords: ["体験ギフト", "充実", "体験"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, experienceBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(experienceBudgetAnswer, "¥8,000〜¥35,000")
          });
        });
      }
      break;

    case "名入れ・メッセージ入りギフト":
      const personalizedConcernAnswer = answers.question_0 || "";
      const personalizedAgeAnswer = answers.question_1 || "";
      const personalizedApproachAnswer = answers.question_2 || "";
      const personalizedCategoryAnswer = answers.question_3 || "";
      const personalizedBudgetAnswer = answers.question_4 || "";
      
      if (personalizedCategoryAnswer.includes("食器・カトラリー")) {
        const baseProducts = [
          { name: "名入れ食器セット", keywords: ["名入れ", "食器", "セット", "メッセージ"] },
          { name: "名入れカトラリー", keywords: ["名入れ", "カトラリー", "メッセージ"] },
          { name: "名入れ湯呑み", keywords: ["名入れ", "湯呑み", "メッセージ"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, personalizedBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(personalizedBudgetAnswer, "¥5,000〜¥18,000")
          });
        });
      } else if (personalizedCategoryAnswer.includes("バッグ・小物")) {
        const baseProducts = [
          { name: "名入れバッグ", keywords: ["名入れ", "バッグ", "メッセージ"] },
          { name: "名入れ小物", keywords: ["名入れ", "小物", "メッセージ"] },
          { name: "名入れポーチ", keywords: ["名入れ", "ポーチ", "メッセージ"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, personalizedBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(personalizedBudgetAnswer, "¥4,000〜¥15,000")
          });
        });
      } else {
        const baseProducts = [
          { name: "名入れタオル", keywords: ["名入れ", "タオル", "メッセージ"] },
          { name: "名入れアクセサリー", keywords: ["名入れ", "アクセサリー", "メッセージ"] },
          { name: "名入れギフトセット", keywords: ["名入れ", "ギフト", "セット", "メッセージ"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, personalizedBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(personalizedBudgetAnswer, "¥3,000〜¥12,000")
          });
        });
      }
      break;

    case "フォトアルバム・家族の思い出ギフト":
      const memoryConcernAnswer = answers.question_0 || "";
      const memoryAgeAnswer = answers.question_1 || "";
      const memoryApproachAnswer = answers.question_2 || "";
      const memoryCategoryAnswer = answers.question_3 || "";
      const memoryBudgetAnswer = answers.question_4 || "";
      
      // 方向性に基づく分岐
      if (memoryApproachAnswer.includes("普段の写真整理をより充実させる")) {
        if (memoryCategoryAnswer.includes("フォトアルバム・写真整理")) {
          const baseProducts = [
            { name: "高級フォトアルバム", keywords: ["フォトアルバム", "高級", "写真", "思い出", "充実"] },
            { name: "充実写真整理用品", keywords: ["写真整理", "充実", "用品", "思い出"] },
            { name: "高機能デジタルフォトフレーム", keywords: ["デジタルフォトフレーム", "高機能", "写真", "思い出", "充実"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, memoryBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(memoryBudgetAnswer, "¥5,000〜¥20,000")
            });
          });
        } else if (memoryCategoryAnswer.includes("家族写真の加工・制作")) {
          const baseProducts = [
            { name: "充実家族写真加工サービス", keywords: ["家族写真", "加工", "サービス", "思い出", "充実"] },
            { name: "高品質写真制作サービス", keywords: ["写真制作", "高品質", "サービス", "思い出", "充実"] },
            { name: "充実思い出写真セット", keywords: ["思い出写真", "セット", "思い出", "充実"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, memoryBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(memoryBudgetAnswer, "¥8,000〜¥25,000")
            });
          });
        } else {
          const baseProducts = [
            { name: "充実思い出の品整理サービス", keywords: ["思い出の品", "整理", "サービス", "思い出", "充実"] },
            { name: "充実思い出ギフトセット", keywords: ["思い出ギフト", "セット", "思い出", "充実"] },
            { name: "充実家族の思い出アイテム", keywords: ["家族の思い出", "アイテム", "思い出", "充実"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, memoryBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(memoryBudgetAnswer, "¥6,000〜¥20,000")
            });
          });
        }
      } else if (memoryApproachAnswer.includes("特別な思い出作り")) {
        if (memoryCategoryAnswer.includes("フォトアルバム・写真整理")) {
          const baseProducts = [
            { name: "特別フォトアルバム", keywords: ["フォトアルバム", "特別", "写真", "思い出", "特別"] },
            { name: "特別写真整理用品", keywords: ["写真整理", "特別", "用品", "思い出", "特別"] },
            { name: "特別デジタルフォトフレーム", keywords: ["デジタルフォトフレーム", "特別", "写真", "思い出", "特別"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, memoryBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(memoryBudgetAnswer, "¥8,000〜¥30,000")
            });
          });
        } else if (memoryCategoryAnswer.includes("家族写真の加工・制作")) {
          const baseProducts = [
            { name: "特別家族写真加工サービス", keywords: ["家族写真", "加工", "サービス", "思い出", "特別"] },
            { name: "特別写真制作サービス", keywords: ["写真制作", "特別", "サービス", "思い出", "特別"] },
            { name: "特別思い出写真セット", keywords: ["思い出写真", "セット", "思い出", "特別"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, memoryBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(memoryBudgetAnswer, "¥12,000〜¥35,000")
            });
          });
        } else {
          const baseProducts = [
            { name: "特別思い出の品整理サービス", keywords: ["思い出の品", "整理", "サービス", "思い出", "特別"] },
            { name: "特別思い出ギフトセット", keywords: ["思い出ギフト", "セット", "思い出", "特別"] },
            { name: "特別家族の思い出アイテム", keywords: ["家族の思い出", "アイテム", "思い出", "特別"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, memoryBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(memoryBudgetAnswer, "¥10,000〜¥30,000")
            });
          });
        }
      } else {
        // デフォルト
        const baseProducts = [
          { name: "思い出ギフトセット", keywords: ["思い出ギフト", "セット", "思い出"] },
          { name: "特別思い出ギフト", keywords: ["思い出ギフト", "特別", "思い出"] },
          { name: "充実思い出ギフト", keywords: ["思い出ギフト", "充実", "思い出"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, memoryBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(memoryBudgetAnswer, "¥6,000〜¥20,000")
          });
        });
      }
      break;

    case "おうち時間を楽しむアイテム":
      const homeTimeConcernAnswer = answers.question_0 || "";
      const homeTimeAgeAnswer = answers.question_1 || "";
      const homeTimeApproachAnswer = answers.question_2 || "";
      const homeTimeCategoryAnswer = answers.question_3 || "";
      const homeTimeBudgetAnswer = answers.question_4 || "";
      
      // 方向性に基づく分岐
      if (homeTimeApproachAnswer.includes("普段の活動をより充実させるアイテム")) {
        if (homeTimeCategoryAnswer.includes("読書・学習用品")) {
          const baseProducts = [
            { name: "充実読書用品セット", keywords: ["読書用品", "セット", "おうち時間", "充実"] },
            { name: "高機能学習用品", keywords: ["学習用品", "高機能", "おうち時間", "充実"] },
            { name: "充実読書・学習グッズ", keywords: ["読書", "学習", "グッズ", "おうち時間", "充実"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, homeTimeBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(homeTimeBudgetAnswer, "¥4,000〜¥15,000")
            });
          });
        } else if (homeTimeCategoryAnswer.includes("手芸・クラフト用品")) {
          const baseProducts = [
            { name: "充実手芸用品セット", keywords: ["手芸用品", "セット", "おうち時間", "充実"] },
            { name: "高品質クラフト用品", keywords: ["クラフト用品", "高品質", "おうち時間", "充実"] },
            { name: "充実手芸・クラフトグッズ", keywords: ["手芸", "クラフト", "グッズ", "おうち時間", "充実"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, homeTimeBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(homeTimeBudgetAnswer, "¥5,000〜¥18,000")
            });
          });
        } else {
          const baseProducts = [
            { name: "充実お料理・お菓子作り用品", keywords: ["お料理", "お菓子作り", "用品", "おうち時間", "充実"] },
            { name: "高機能リラックス用品", keywords: ["リラックス用品", "高機能", "おうち時間", "充実"] },
            { name: "充実おうち時間グッズセット", keywords: ["おうち時間", "グッズ", "セット", "充実"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, homeTimeBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(homeTimeBudgetAnswer, "¥4,000〜¥15,000")
            });
          });
        }
      } else if (homeTimeApproachAnswer.includes("新しい趣味・特別なアイテム")) {
        if (homeTimeCategoryAnswer.includes("読書・学習用品")) {
          const baseProducts = [
            { name: "特別読書用品セット", keywords: ["読書用品", "セット", "おうち時間", "特別", "新趣味"] },
            { name: "特別学習用品", keywords: ["学習用品", "特別", "おうち時間", "新趣味"] },
            { name: "特別読書・学習グッズ", keywords: ["読書", "学習", "グッズ", "おうち時間", "特別", "新趣味"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, homeTimeBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(homeTimeBudgetAnswer, "¥6,000〜¥20,000")
            });
          });
        } else if (homeTimeCategoryAnswer.includes("手芸・クラフト用品")) {
          const baseProducts = [
            { name: "特別手芸用品セット", keywords: ["手芸用品", "セット", "おうち時間", "特別", "新趣味"] },
            { name: "特別クラフト用品", keywords: ["クラフト用品", "特別", "おうち時間", "新趣味"] },
            { name: "特別手芸・クラフトグッズ", keywords: ["手芸", "クラフト", "グッズ", "おうち時間", "特別", "新趣味"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, homeTimeBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(homeTimeBudgetAnswer, "¥8,000〜¥25,000")
            });
          });
        } else {
          const baseProducts = [
            { name: "特別お料理・お菓子作り用品", keywords: ["お料理", "お菓子作り", "用品", "おうち時間", "特別", "新趣味"] },
            { name: "特別リラックス用品", keywords: ["リラックス用品", "特別", "おうち時間", "新趣味"] },
            { name: "特別おうち時間グッズセット", keywords: ["おうち時間", "グッズ", "セット", "特別", "新趣味"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, homeTimeBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(homeTimeBudgetAnswer, "¥6,000〜¥20,000")
            });
          });
        }
      } else {
        // デフォルト
        const baseProducts = [
          { name: "おうち時間グッズセット", keywords: ["おうち時間", "グッズ", "セット"] },
          { name: "特別おうち時間グッズ", keywords: ["おうち時間", "グッズ", "特別"] },
          { name: "充実おうち時間グッズ", keywords: ["おうち時間", "グッズ", "充実"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, homeTimeBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(homeTimeBudgetAnswer, "¥4,000〜¥15,000")
          });
        });
      }
      break;

    case "おうちアイテム":
      const homeItemConcernAnswer = answers.question_0 || "";
      const homeItemAgeAnswer = answers.question_1 || "";
      const homeItemApproachAnswer = answers.question_2 || "";
      const homeItemCategoryAnswer = answers.question_3 || "";
      const homeItemBudgetAnswer = answers.question_4 || "";
      
      // 方向性に基づく分岐
      if (homeItemApproachAnswer.includes("リラックスグッズ")) {
        const baseProducts = [
          { name: "リラックスブランケット", keywords: ["ブランケット", "リラックス", "おうちアイテム"] },
          { name: "抱き枕・クッション", keywords: ["抱き枕", "クッション", "リラックス", "おうちアイテム"] },
          { name: "アロマ・香りアイテム", keywords: ["アロマ", "香り", "リラックス", "おうちアイテム"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, homeItemBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(homeItemBudgetAnswer, "¥2,000〜¥8,000")
          });
        });
      } else if (homeItemApproachAnswer.includes("実用的なグッズ")) {
        const baseProducts = [
          { name: "加湿器・空気清浄機", keywords: ["加湿器", "空気清浄機", "健康", "おうちアイテム"] },
          { name: "空気清浄機", keywords: ["空気清浄機", "健康", "空気", "おうちアイテム"] },
          { name: "加湿器", keywords: ["加湿器", "湿度", "健康", "おうちアイテム"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, homeItemBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(homeItemBudgetAnswer, "¥3,000〜¥12,000")
          });
        });
      } else if (homeItemApproachAnswer.includes("インテリアグッズ")) {
        const baseProducts = [
          { name: "インテリア小物", keywords: ["インテリア", "小物", "装飾", "おうちアイテム"] },
          { name: "照明・ライト", keywords: ["照明", "ライト", "インテリア", "おうちアイテム"] },
          { name: "収納・整理用品", keywords: ["収納", "整理", "インテリア", "おうちアイテム"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, homeItemBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(homeItemBudgetAnswer, "¥2,000〜¥7,000")
          });
        });
      } else {
        // デフォルト：バランスの取れた提案
        const baseProducts = [
          { name: "リラックスブランケット", keywords: ["ブランケット", "リラックス", "おうちアイテム"] },
          { name: "加湿器・空気清浄機", keywords: ["加湿器", "空気清浄機", "健康", "おうちアイテム"] },
          { name: "インテリア小物", keywords: ["インテリア", "小物", "装飾", "おうちアイテム"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, homeItemBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(homeItemBudgetAnswer, "¥2,000〜¥8,000")
          });
        });
      }
      break;

    case "季節限定・ご当地ギフト":
      const seasonalConcernAnswer = answers.question_0 || "";
      const seasonalAgeAnswer = answers.question_1 || "";
      const seasonalApproachAnswer = answers.question_2 || "";
      const seasonalCategoryAnswer = answers.question_3 || "";
      const seasonalBudgetAnswer = answers.question_4 || "";
      
      // 方向性に基づく分岐
      if (seasonalApproachAnswer.includes("普段の生活に季節感を取り入れる")) {
        if (seasonalCategoryAnswer.includes("季節の食べ物・飲み物")) {
          const baseProducts = [
            { name: "日常に季節感を取り入れる食べ物ギフト", keywords: ["季節の食べ物", "ギフト", "季節限定", "日常", "季節感"] },
            { name: "日常に季節感を取り入れる飲み物ギフト", keywords: ["季節の飲み物", "ギフト", "季節限定", "日常", "季節感"] },
            { name: "日常季節感グルメセット", keywords: ["季節限定", "グルメ", "セット", "日常", "季節感"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, seasonalBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(seasonalBudgetAnswer, "¥4,000〜¥15,000")
            });
          });
        } else if (seasonalCategoryAnswer.includes("ご当地特産品")) {
          const baseProducts = [
            { name: "日常に地域感を取り入れる特産品ギフト", keywords: ["ご当地特産品", "ギフト", "地域限定", "日常", "地域感"] },
            { name: "日常地域限定ギフト", keywords: ["地域限定", "ギフト", "ご当地", "日常", "地域感"] },
            { name: "日常特産品セット", keywords: ["特産品", "セット", "ご当地", "日常", "地域感"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, seasonalBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(seasonalBudgetAnswer, "¥5,000〜¥18,000")
            });
          });
        } else {
          const baseProducts = [
            { name: "日常に季節感を取り入れる花・植物ギフト", keywords: ["季節の花", "植物", "ギフト", "季節限定", "日常", "季節感"] },
            { name: "日常に季節感を取り入れる雑貨ギフト", keywords: ["季節の雑貨", "ギフト", "季節限定", "日常", "季節感"] },
            { name: "日常季節感ギフトセット", keywords: ["季節限定", "ギフト", "セット", "日常", "季節感"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, seasonalBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(seasonalBudgetAnswer, "¥4,000〜¥15,000")
            });
          });
        }
      } else if (seasonalApproachAnswer.includes("特別な季節・地域の逸品")) {
        if (seasonalCategoryAnswer.includes("季節の食べ物・飲み物")) {
          const baseProducts = [
            { name: "特別な季節の食べ物逸品", keywords: ["季節の食べ物", "特別", "逸品", "季節限定", "特別"] },
            { name: "特別な季節の飲み物逸品", keywords: ["季節の飲み物", "特別", "逸品", "季節限定", "特別"] },
            { name: "特別季節限定グルメ逸品", keywords: ["季節限定", "グルメ", "特別", "逸品", "特別"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, seasonalBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(seasonalBudgetAnswer, "¥8,000〜¥25,000")
            });
          });
        } else if (seasonalCategoryAnswer.includes("ご当地特産品")) {
          const baseProducts = [
            { name: "特別なご当地特産品逸品", keywords: ["ご当地特産品", "特別", "逸品", "地域限定", "特別"] },
            { name: "特別地域限定逸品", keywords: ["地域限定", "特別", "逸品", "ご当地", "特別"] },
            { name: "特別特産品逸品セット", keywords: ["特産品", "特別", "逸品", "セット", "ご当地", "特別"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, seasonalBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(seasonalBudgetAnswer, "¥10,000〜¥30,000")
            });
          });
        } else {
          const baseProducts = [
            { name: "特別な季節の花・植物逸品", keywords: ["季節の花", "植物", "特別", "逸品", "季節限定", "特別"] },
            { name: "特別な季節の雑貨逸品", keywords: ["季節の雑貨", "特別", "逸品", "季節限定", "特別"] },
            { name: "特別季節限定逸品セット", keywords: ["季節限定", "特別", "逸品", "セット", "特別"] }
          ];
          
          baseProducts.forEach(product => {
            suggestions.push({
              name: getProductNameByBudget(product.name, seasonalBudgetAnswer),
              keywords: product.keywords,
              priceRange: getPriceRangeByBudget(seasonalBudgetAnswer, "¥8,000〜¥25,000")
            });
          });
        }
      } else {
        // デフォルト
        const baseProducts = [
          { name: "季節限定ギフトセット", keywords: ["季節限定", "ギフト", "セット"] },
          { name: "特別季節限定ギフト", keywords: ["季節限定", "ギフト", "特別"] },
          { name: "日常季節感ギフト", keywords: ["季節限定", "ギフト", "日常", "季節感"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, seasonalBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(seasonalBudgetAnswer, "¥4,000〜¥15,000")
          });
        });
      }
      break;

    default:
      suggestions.push(
        { name: "実用的なギフト", keywords: ["実用", "ギフト", "お母さん", "プレゼント"], priceRange: "¥5,000〜¥20,000" },
        { name: "特別感のあるギフト", keywords: ["特別感", "ギフト", "お母さん", "プレゼント"], priceRange: "¥8,000〜¥30,000" },
        { name: "上質なギフト", keywords: ["上質", "ギフト", "お母さん", "プレゼント"], priceRange: "¥10,000〜¥35,000" }
      );
  }

  return suggestions;
}

// 義父向け提案生成関数
export function generateFatherInLawSuggestions(category: string, answers: Record<string, string>): GiftItem[] {
  const suggestions: GiftItem[] = [];
  
  switch (category) {
    case "高級グルメギフト":
      const gourmetAnswer = answers.question_0 || "";
      if (gourmetAnswer.includes("和食") || gourmetAnswer.includes("日本")) {
        suggestions.push(
          { name: "黒毛和牛ギフト", keywords: ["黒毛和牛", "高級", "ギフト", "和食"], priceRange: "¥8,000〜¥25,000" },
          { name: "鰻蒲焼ギフト", keywords: ["鰻", "蒲焼", "ギフト", "和食"], priceRange: "¥5,000〜¥15,000" },
          { name: "高級和菓子セット", keywords: ["和菓子", "高級", "ギフト", "上品"], priceRange: "¥4,000〜¥12,000" }
        );
      } else if (gourmetAnswer.includes("洋食") || gourmetAnswer.includes("フレンチ")) {
        suggestions.push(
          { name: "高級チーズセット", keywords: ["チーズ", "高級", "ギフト", "洋食"], priceRange: "¥6,000〜¥18,000" },
          { name: "フランス産ワイン", keywords: ["ワイン", "フランス", "ギフト", "高級"], priceRange: "¥5,000〜¥20,000" },
          { name: "高級オリーブオイル", keywords: ["オリーブオイル", "高級", "ギフト", "洋食"], priceRange: "¥4,000〜¥12,000" }
        );
      } else {
        suggestions.push(
          { name: "高級海鮮ギフト", keywords: ["海鮮", "高級", "ギフト", "美味しい"], priceRange: "¥6,000〜¥20,000" },
          { name: "季節の味覚セット", keywords: ["季節", "味覚", "ギフト", "特別"], priceRange: "¥5,000〜¥15,000" },
          { name: "高級調味料セット", keywords: ["調味料", "高級", "ギフト", "実用的"], priceRange: "¥4,000〜¥12,000" }
        );
      }
      break;

    case "プレミアムドリンク":
      const drinkAnswer = answers.question_0 || "";
      if (drinkAnswer.includes("緑茶") || drinkAnswer.includes("日本茶")) {
        suggestions.push(
          { name: "高級緑茶セット", keywords: ["緑茶", "高級", "ギフト", "上品"], priceRange: "¥4,000〜¥12,000" },
          { name: "玉露ギフト", keywords: ["玉露", "ギフト", "高級", "上品"], priceRange: "¥5,000〜¥15,000" },
          { name: "抹茶セット", keywords: ["抹茶", "セット", "ギフト", "上品"], priceRange: "¥3,000〜¥10,000" }
        );
      } else if (drinkAnswer.includes("紅茶")) {
        suggestions.push(
          { name: "高級紅茶セット", keywords: ["紅茶", "高級", "ギフト", "上品"], priceRange: "¥4,000〜¥12,000" },
          { name: "アールグレイギフト", keywords: ["アールグレイ", "ギフト", "高級", "上品"], priceRange: "¥3,000〜¥8,000" },
          { name: "ダージリンティー", keywords: ["ダージリンティー", "ギフト", "高級", "上品"], priceRange: "¥4,000〜¥10,000" }
        );
      } else {
        suggestions.push(
          { name: "高級コーヒーセット", keywords: ["コーヒー", "高級", "ギフト", "上品"], priceRange: "¥4,000〜¥12,000" },
          { name: "プレミアムドリンク", keywords: ["ドリンク", "プレミアム", "ギフト", "上品"], priceRange: "¥3,000〜¥10,000" },
          { name: "上品な飲み物ギフト", keywords: ["飲み物", "上品", "ギフト", "高級"], priceRange: "¥4,000〜¥12,000" }
        );
      }
      break;

    case "お酒（見た目重視）":
      const alcoholAnswer = answers.question_0 || "";
      if (alcoholAnswer.includes("ウイスキー")) {
        suggestions.push(
          { name: "木箱入りウイスキー", keywords: ["ウイスキー", "木箱", "ギフト", "高級"], priceRange: "¥8,000〜¥25,000" },
          { name: "高級ウイスキーセット", keywords: ["ウイスキー", "セット", "ギフト", "高級"], priceRange: "¥10,000〜¥30,000" },
          { name: "特別なウイスキー", keywords: ["ウイスキー", "特別", "ギフト", "高級"], priceRange: "¥12,000〜¥35,000" }
        );
      } else if (alcoholAnswer.includes("日本酒")) {
        suggestions.push(
          { name: "地酒飲み比べ", keywords: ["地酒", "飲み比べ", "ギフト", "高級"], priceRange: "¥6,000〜¥18,000" },
          { name: "高級日本酒セット", keywords: ["日本酒", "セット", "ギフト", "高級"], priceRange: "¥8,000〜¥20,000" },
          { name: "特別な日本酒", keywords: ["日本酒", "特別", "ギフト", "高級"], priceRange: "¥10,000〜¥25,000" }
        );
      } else {
        suggestions.push(
          { name: "高級ワインギフト", keywords: ["ワイン", "ギフト", "高級", "上品"], priceRange: "¥5,000〜¥20,000" },
          { name: "特別なお酒ギフト", keywords: ["お酒", "特別", "ギフト", "高級"], priceRange: "¥6,000〜¥22,000" },
          { name: "上品なお酒セット", keywords: ["お酒", "セット", "上品", "ギフト"], priceRange: "¥8,000〜¥25,000" }
        );
      }
      break;

    case "ブランド小物":
      const brandAnswer = answers.question_1 || ""; // 小物の種類を取得
      const styleAnswer = answers.question_0 || ""; // スタイルを取得
      
      if (brandAnswer.includes("ポーチ")) {
        if (styleAnswer.includes("クラシック") || styleAnswer.includes("上品")) {
          suggestions.push(
            { name: "クラシックポーチ", keywords: ["ポーチ", "クラシック", "上品", "ブランド"], priceRange: "¥4,000〜¥12,000" },
            { name: "上品なレザーポーチ", keywords: ["ポーチ", "レザー", "上品", "高級"], priceRange: "¥6,000〜¥18,000" },
            { name: "伝統的なポーチ", keywords: ["ポーチ", "伝統的", "落ち着いた", "ブランド"], priceRange: "¥5,000〜¥15,000" }
          );
        } else if (styleAnswer.includes("モダン") || styleAnswer.includes("洗練")) {
          suggestions.push(
            { name: "モダンポーチ", keywords: ["ポーチ", "モダン", "洗練", "ブランド"], priceRange: "¥4,000〜¥12,000" },
            { name: "スタイリッシュポーチ", keywords: ["ポーチ", "スタイリッシュ", "モダン", "高級"], priceRange: "¥6,000〜¥18,000" },
            { name: "デザイナーポーチ", keywords: ["ポーチ", "デザイナー", "洗練", "ブランド"], priceRange: "¥5,000〜¥15,000" }
          );
        } else {
          suggestions.push(
            { name: "ブランドポーチ", keywords: ["ポーチ", "ブランド", "上質", "ギフト"], priceRange: "¥4,000〜¥12,000" },
            { name: "高級ポーチ", keywords: ["ポーチ", "高級", "上品", "ギフト"], priceRange: "¥6,000〜¥18,000" },
            { name: "印象的なポーチ", keywords: ["ポーチ", "印象的", "特別", "ギフト"], priceRange: "¥5,000〜¥15,000" }
          );
        }
      } else if (brandAnswer.includes("ハンカチ")) {
        if (styleAnswer.includes("クラシック") || styleAnswer.includes("上品")) {
          suggestions.push(
            { name: "クラシックハンカチ", keywords: ["ハンカチ", "クラシック", "上品", "ブランド"], priceRange: "¥3,000〜¥8,000" },
            { name: "上品なシルクハンカチ", keywords: ["ハンカチ", "シルク", "上品", "高級"], priceRange: "¥4,000〜¥12,000" },
            { name: "伝統的なハンカチ", keywords: ["ハンカチ", "伝統的", "落ち着いた", "ブランド"], priceRange: "¥3,000〜¥10,000" }
          );
        } else if (styleAnswer.includes("モダン") || styleAnswer.includes("洗練")) {
          suggestions.push(
            { name: "モダンハンカチ", keywords: ["ハンカチ", "モダン", "洗練", "ブランド"], priceRange: "¥3,000〜¥8,000" },
            { name: "スタイリッシュハンカチ", keywords: ["ハンカチ", "スタイリッシュ", "モダン", "高級"], priceRange: "¥4,000〜¥12,000" },
            { name: "デザイナーハンカチ", keywords: ["ハンカチ", "デザイナー", "洗練", "ブランド"], priceRange: "¥3,000〜¥10,000" }
          );
        } else {
          suggestions.push(
            { name: "ブランドハンカチ", keywords: ["ハンカチ", "ブランド", "上質", "ギフト"], priceRange: "¥3,000〜¥8,000" },
            { name: "高級ハンカチ", keywords: ["ハンカチ", "高級", "上品", "ギフト"], priceRange: "¥4,000〜¥12,000" },
            { name: "印象的なハンカチ", keywords: ["ハンカチ", "印象的", "特別", "ギフト"], priceRange: "¥3,000〜¥10,000" }
          );
        }
      } else if (brandAnswer.includes("ネクタイ")) {
        if (styleAnswer.includes("クラシック") || styleAnswer.includes("上品")) {
          suggestions.push(
            { name: "クラシックネクタイ", keywords: ["ネクタイ", "クラシック", "上品", "ブランド"], priceRange: "¥5,000〜¥15,000" },
            { name: "上品なシルクネクタイ", keywords: ["ネクタイ", "シルク", "上品", "高級"], priceRange: "¥6,000〜¥20,000" },
            { name: "伝統的なネクタイ", keywords: ["ネクタイ", "伝統的", "落ち着いた", "ブランド"], priceRange: "¥5,000〜¥18,000" }
          );
        } else if (styleAnswer.includes("モダン") || styleAnswer.includes("洗練")) {
          suggestions.push(
            { name: "モダンネクタイ", keywords: ["ネクタイ", "モダン", "洗練", "ブランド"], priceRange: "¥5,000〜¥15,000" },
            { name: "スタイリッシュネクタイ", keywords: ["ネクタイ", "スタイリッシュ", "モダン", "高級"], priceRange: "¥6,000〜¥20,000" },
            { name: "デザイナーネクタイ", keywords: ["ネクタイ", "デザイナー", "洗練", "ブランド"], priceRange: "¥5,000〜¥18,000" }
          );
        } else {
          suggestions.push(
            { name: "ブランドネクタイ", keywords: ["ネクタイ", "ブランド", "上質", "ギフト"], priceRange: "¥5,000〜¥15,000" },
            { name: "高級ネクタイ", keywords: ["ネクタイ", "高級", "上品", "ギフト"], priceRange: "¥6,000〜¥20,000" },
            { name: "印象的なネクタイ", keywords: ["ネクタイ", "印象的", "特別", "ギフト"], priceRange: "¥5,000〜¥18,000" }
          );
        }
      } else {
        // セットまたはその他の場合
        suggestions.push(
          { name: "ブランド小物セット", keywords: ["ブランド", "小物", "セット", "ギフト"], priceRange: "¥8,000〜¥25,000" },
          { name: "高級小物セット", keywords: ["高級", "小物", "セット", "上品"], priceRange: "¥10,000〜¥30,000" },
          { name: "印象的な小物セット", keywords: ["印象的", "小物", "セット", "特別"], priceRange: "¥8,000〜¥28,000" }
        );
      }
      break;

    case "靴下・肌着（上質系）":
      const socksAnswer = answers.question_1 || ""; // アイテムの種類を取得
      const materialAnswer = answers.question_2 || ""; // 素材を取得
      
      if (socksAnswer.includes("靴下")) {
        if (materialAnswer.includes("シルク")) {
          suggestions.push(
            { name: "シルク靴下", keywords: ["靴下", "シルク", "上質", "高級"], priceRange: "¥3,000〜¥8,000" },
            { name: "高級シルク靴下", keywords: ["靴下", "シルク", "高級", "上品"], priceRange: "¥4,000〜¥12,000" },
            { name: "プレミアムシルク靴下", keywords: ["靴下", "シルク", "プレミアム", "特別"], priceRange: "¥5,000〜¥15,000" }
          );
        } else if (materialAnswer.includes("コットン")) {
          suggestions.push(
            { name: "高級コットン靴下", keywords: ["靴下", "コットン", "高級", "上質"], priceRange: "¥2,000〜¥6,000" },
            { name: "オーガニックコットン靴下", keywords: ["靴下", "コットン", "オーガニック", "上品"], priceRange: "¥3,000〜¥8,000" },
            { name: "プレミアムコットン靴下", keywords: ["靴下", "コットン", "プレミアム", "高級"], priceRange: "¥4,000〜¥10,000" }
          );
        } else {
          suggestions.push(
            { name: "上質な靴下", keywords: ["靴下", "上質", "高級", "ギフト"], priceRange: "¥2,000〜¥8,000" },
            { name: "高級靴下", keywords: ["靴下", "高級", "上品", "ギフト"], priceRange: "¥3,000〜¥10,000" },
            { name: "印象的な靴下", keywords: ["靴下", "印象的", "特別", "ギフト"], priceRange: "¥4,000〜¥12,000" }
          );
        }
      } else if (socksAnswer.includes("肌着")) {
        if (materialAnswer.includes("シルク")) {
          suggestions.push(
            { name: "シルク肌着", keywords: ["肌着", "シルク", "上質", "高級"], priceRange: "¥4,000〜¥12,000" },
            { name: "高級シルク肌着", keywords: ["肌着", "シルク", "高級", "上品"], priceRange: "¥6,000〜¥18,000" },
            { name: "プレミアムシルク肌着", keywords: ["肌着", "シルク", "プレミアム", "特別"], priceRange: "¥8,000〜¥25,000" }
          );
        } else if (materialAnswer.includes("コットン")) {
          suggestions.push(
            { name: "高級コットン肌着", keywords: ["肌着", "コットン", "高級", "上質"], priceRange: "¥3,000〜¥8,000" },
            { name: "オーガニックコットン肌着", keywords: ["肌着", "コットン", "オーガニック", "上品"], priceRange: "¥4,000〜¥12,000" },
            { name: "プレミアムコットン肌着", keywords: ["肌着", "コットン", "プレミアム", "高級"], priceRange: "¥5,000〜¥15,000" }
          );
        } else {
          suggestions.push(
            { name: "上質な肌着", keywords: ["肌着", "上質", "高級", "ギフト"], priceRange: "¥3,000〜¥10,000" },
            { name: "高級肌着", keywords: ["肌着", "高級", "上品", "ギフト"], priceRange: "¥4,000〜¥15,000" },
            { name: "印象的な肌着", keywords: ["肌着", "印象的", "特別", "ギフト"], priceRange: "¥5,000〜¥18,000" }
          );
        }
      } else {
        // セットまたはその他の場合
        suggestions.push(
          { name: "上質な下着セット", keywords: ["下着", "セット", "上質", "ギフト"], priceRange: "¥6,000〜¥20,000" },
          { name: "高級下着セット", keywords: ["下着", "セット", "高級", "上品"], priceRange: "¥8,000〜¥25,000" },
          { name: "印象的な下着セット", keywords: ["下着", "セット", "印象的", "特別"], priceRange: "¥10,000〜¥30,000" }
        );
      }
      break;

    case "シニア向けガジェット":
      const gadgetAnswer = answers.question_1 || ""; // ガジェットの種類を取得
      const purposeAnswer = answers.question_2 || ""; // 使用目的を取得
      
      if (gadgetAnswer.includes("電波時計")) {
        suggestions.push(
          { name: "電波時計", keywords: ["電波時計", "時計", "高級", "ギフト"], priceRange: "¥8,000〜¥25,000" },
          { name: "高級電波時計", keywords: ["電波時計", "高級", "上品", "ギフト"], priceRange: "¥12,000〜¥35,000" },
          { name: "プレミアム電波時計", keywords: ["電波時計", "プレミアム", "特別", "ギフト"], priceRange: "¥15,000〜¥45,000" }
        );
      } else if (gadgetAnswer.includes("血圧計")) {
        suggestions.push(
          { name: "デジタル血圧計", keywords: ["血圧計", "デジタル", "健康", "ギフト"], priceRange: "¥5,000〜¥15,000" },
          { name: "高級血圧計", keywords: ["血圧計", "高級", "健康", "ギフト"], priceRange: "¥8,000〜¥20,000" },
          { name: "プレミアム血圧計", keywords: ["血圧計", "プレミアム", "健康", "ギフト"], priceRange: "¥12,000〜¥30,000" }
        );
      } else if (gadgetAnswer.includes("体温計")) {
        suggestions.push(
          { name: "デジタル体温計", keywords: ["体温計", "デジタル", "健康", "ギフト"], priceRange: "¥3,000〜¥8,000" },
          { name: "高級体温計", keywords: ["体温計", "高級", "健康", "ギフト"], priceRange: "¥5,000〜¥12,000" },
          { name: "プレミアム体温計", keywords: ["体温計", "プレミアム", "健康", "ギフト"], priceRange: "¥8,000〜¥18,000" }
        );
      } else {
        // その他の場合
        suggestions.push(
          { name: "シニア向けガジェット", keywords: ["ガジェット", "シニア", "便利", "ギフト"], priceRange: "¥5,000〜¥20,000" },
          { name: "高級ガジェット", keywords: ["ガジェット", "高級", "便利", "ギフト"], priceRange: "¥8,000〜¥25,000" },
          { name: "印象的なガジェット", keywords: ["ガジェット", "印象的", "特別", "ギフト"], priceRange: "¥10,000〜¥30,000" }
        );
      }
      break;

    case "本・雑誌ギフト":
      const bookAnswer = answers.question_0 || ""; // ジャンルを取得
      const bookTypeAnswer = answers.question_2 || ""; // 本の種類を取得
      
      if (bookAnswer.includes("歴史")) {
        suggestions.push(
          { name: "歴史雑誌", keywords: ["歴史", "雑誌", "ギフト", "上品"], priceRange: "¥2,000〜¥6,000" },
          { name: "歴史書籍", keywords: ["歴史", "書籍", "ギフト", "上品"], priceRange: "¥3,000〜¥8,000" },
          { name: "歴史セット", keywords: ["歴史", "セット", "ギフト", "上品"], priceRange: "¥4,000〜¥12,000" }
        );
      } else if (bookAnswer.includes("趣味")) {
        suggestions.push(
          { name: "趣味雑誌", keywords: ["趣味", "雑誌", "ギフト", "上品"], priceRange: "¥2,000〜¥6,000" },
          { name: "趣味書籍", keywords: ["趣味", "書籍", "ギフト", "上品"], priceRange: "¥3,000〜¥8,000" },
          { name: "趣味セット", keywords: ["趣味", "セット", "ギフト", "上品"], priceRange: "¥4,000〜¥12,000" }
        );
      } else if (bookAnswer.includes("健康")) {
        suggestions.push(
          { name: "健康雑誌", keywords: ["健康", "雑誌", "ギフト", "上品"], priceRange: "¥2,000〜¥6,000" },
          { name: "健康書籍", keywords: ["健康", "書籍", "ギフト", "上品"], priceRange: "¥3,000〜¥8,000" },
          { name: "健康セット", keywords: ["健康", "セット", "ギフト", "上品"], priceRange: "¥4,000〜¥12,000" }
        );
      } else {
        suggestions.push(
          { name: "上品な雑誌", keywords: ["雑誌", "上品", "ギフト", "高級"], priceRange: "¥2,000〜¥6,000" },
          { name: "高級書籍", keywords: ["書籍", "高級", "ギフト", "上品"], priceRange: "¥3,000〜¥8,000" },
          { name: "印象的なセット", keywords: ["セット", "印象的", "ギフト", "特別"], priceRange: "¥4,000〜¥12,000" }
        );
      }
      break;

    case "季節感ギフト":
      const seasonAnswer = answers.question_1 || ""; // 季節を取得
      const giftTypeAnswer = answers.question_2 || ""; // ギフトの種類を取得
      
      if (seasonAnswer.includes("春")) {
        suggestions.push(
          { name: "春の味覚ギフト", keywords: ["春", "味覚", "ギフト", "季節"], priceRange: "¥4,000〜¥12,000" },
          { name: "春の飲み物ギフト", keywords: ["春", "飲み物", "ギフト", "季節"], priceRange: "¥3,000〜¥8,000" },
          { name: "春のセットギフト", keywords: ["春", "セット", "ギフト", "季節"], priceRange: "¥5,000〜¥15,000" }
        );
      } else if (seasonAnswer.includes("夏")) {
        suggestions.push(
          { name: "夏の味覚ギフト", keywords: ["夏", "味覚", "ギフト", "季節"], priceRange: "¥4,000〜¥12,000" },
          { name: "夏の飲み物ギフト", keywords: ["夏", "飲み物", "ギフト", "季節"], priceRange: "¥3,000〜¥8,000" },
          { name: "夏のセットギフト", keywords: ["夏", "セット", "ギフト", "季節"], priceRange: "¥5,000〜¥15,000" }
        );
      } else if (seasonAnswer.includes("秋")) {
        suggestions.push(
          { name: "秋の味覚ギフト", keywords: ["秋", "味覚", "ギフト", "季節"], priceRange: "¥4,000〜¥12,000" },
          { name: "秋の飲み物ギフト", keywords: ["秋", "飲み物", "ギフト", "季節"], priceRange: "¥3,000〜¥8,000" },
          { name: "秋のセットギフト", keywords: ["秋", "セット", "ギフト", "季節"], priceRange: "¥5,000〜¥15,000" }
        );
      } else if (seasonAnswer.includes("冬")) {
        suggestions.push(
          { name: "冬の味覚ギフト", keywords: ["冬", "味覚", "ギフト", "季節"], priceRange: "¥4,000〜¥12,000" },
          { name: "冬の飲み物ギフト", keywords: ["冬", "飲み物", "ギフト", "季節"], priceRange: "¥3,000〜¥8,000" },
          { name: "冬のセットギフト", keywords: ["冬", "セット", "ギフト", "季節"], priceRange: "¥5,000〜¥15,000" }
        );
      } else {
        suggestions.push(
          { name: "季節感ギフト", keywords: ["季節", "ギフト", "上品", "特別"], priceRange: "¥4,000〜¥12,000" },
          { name: "高級季節ギフト", keywords: ["季節", "ギフト", "高級", "上品"], priceRange: "¥6,000〜¥18,000" },
          { name: "印象的な季節ギフト", keywords: ["季節", "ギフト", "印象的", "特別"], priceRange: "¥8,000〜¥25,000" }
        );
      }
      break;

    case "和風雑貨":
      const japaneseAnswer = answers.question_1 || ""; // 雑貨の種類を取得
      const purposeAnswer2 = answers.question_2 || ""; // 使用目的を取得
      
      if (japaneseAnswer.includes("風呂敷")) {
        suggestions.push(
          { name: "高級風呂敷", keywords: ["風呂敷", "高級", "和風", "ギフト"], priceRange: "¥3,000〜¥8,000" },
          { name: "上品な風呂敷", keywords: ["風呂敷", "上品", "和風", "ギフト"], priceRange: "¥4,000〜¥12,000" },
          { name: "印象的な風呂敷", keywords: ["風呂敷", "印象的", "和風", "ギフト"], priceRange: "¥5,000〜¥15,000" }
        );
      } else if (japaneseAnswer.includes("竹製品")) {
        suggestions.push(
          { name: "竹製雑貨", keywords: ["竹", "雑貨", "和風", "ギフト"], priceRange: "¥3,000〜¥8,000" },
          { name: "高級竹製品", keywords: ["竹", "高級", "和風", "ギフト"], priceRange: "¥4,000〜¥12,000" },
          { name: "印象的な竹製品", keywords: ["竹", "印象的", "和風", "ギフト"], priceRange: "¥5,000〜¥15,000" }
        );
      } else if (japaneseAnswer.includes("陶器")) {
        suggestions.push(
          { name: "和風陶器", keywords: ["陶器", "和風", "ギフト", "上品"], priceRange: "¥4,000〜¥12,000" },
          { name: "高級陶器", keywords: ["陶器", "高級", "和風", "ギフト"], priceRange: "¥6,000〜¥18,000" },
          { name: "印象的な陶器", keywords: ["陶器", "印象的", "和風", "ギフト"], priceRange: "¥8,000〜¥25,000" }
        );
      } else {
        suggestions.push(
          { name: "和風雑貨", keywords: ["和風", "雑貨", "ギフト", "上品"], priceRange: "¥3,000〜¥10,000" },
          { name: "高級和風雑貨", keywords: ["和風", "雑貨", "高級", "ギフト"], priceRange: "¥5,000〜¥15,000" },
          { name: "印象的な和風雑貨", keywords: ["和風", "雑貨", "印象的", "ギフト"], priceRange: "¥6,000〜¥20,000" }
        );
      }
      break;

    default:
      suggestions.push(
        { name: "上品なギフト", keywords: ["上品", "ギフト", "義父", "プレゼント"], priceRange: "¥5,000〜¥20,000" },
        { name: "印象の良いギフト", keywords: ["印象", "ギフト", "義父", "プレゼント"], priceRange: "¥4,000〜¥18,000" },
        { name: "外さないギフト", keywords: ["外さない", "ギフト", "義父", "プレゼント"], priceRange: "¥6,000〜¥22,000" }
      );
  }

  return suggestions;
}
