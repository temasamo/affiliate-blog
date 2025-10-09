// 実父・義父向けギフトカテゴリの追加データ

export interface GiftItem {
  id?: string;
  name: string;
  description?: string;
  keywords: string[];
  priceRange: string;
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
      options: ["5,000円以下", "5,000円〜15,000円", "15,000円〜30,000円", "30,000円以上"]
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
      options: ["3,000円以下", "3,000円〜8,000円", "8,000円〜15,000円", "15,000円以上"]
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
      options: ["5,000円以下", "5,000円〜15,000円", "15,000円〜30,000円", "30,000円以上"]
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
      options: ["3,000円以下", "3,000円〜8,000円", "8,000円〜20,000円", "20,000円以上"]
    }
  ],
  "グルメギフト": [
    {
      question: "お父さんの好きな食べ物は？",
      options: ["肉類", "魚介類", "和食", "洋食"]
    },
    {
      question: "ギフトの形式は？",
      options: ["冷凍食品", "缶詰・瓶詰", "乾物", "生鮮食品"]
    },
    {
      question: "特別感のレベルは？",
      options: ["日常的に食べられる", "たまに食べる贅沢", "特別な日だけ", "一度は食べたい"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["3,000円以下", "3,000円〜8,000円", "8,000円〜20,000円", "20,000円以上"]
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
      options: ["10,000円以下", "10,000円〜30,000円", "30,000円〜50,000円", "50,000円以上"]
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
      options: ["5,000円以下", "5,000円〜15,000円", "15,000円〜30,000円", "30,000円以上"]
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
      options: ["5,000円以下", "5,000円〜15,000円", "15,000円〜30,000円", "30,000円以上"]
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
      options: ["5,000円以下", "5,000円〜15,000円", "15,000円〜30,000円", "30,000円以上"]
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
      options: ["5,000円以下", "5,000円〜15,000円", "15,000円〜30,000円", "30,000円以上"]
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
      options: ["5,000円以下", "5,000円〜12,000円", "12,000円〜25,000円", "25,000円以上"]
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
      options: ["3,000円以下", "3,000円〜8,000円", "8,000円〜15,000円", "15,000円以上"]
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
      options: ["5,000円以下", "5,000円〜15,000円", "15,000円〜30,000円", "30,000円以上"]
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
      options: ["5,000円以下", "5,000円〜15,000円", "15,000円〜30,000円", "30,000円以上"]
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
      options: ["3,000円以下", "3,000円〜10,000円", "10,000円〜20,000円", "20,000円以上"]
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
      options: ["2,000円以下", "2,000円〜6,000円", "6,000円〜12,000円", "12,000円以上"]
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
      options: ["5,000円以下", "5,000円〜15,000円", "15,000円〜30,000円", "30,000円以上"]
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
      options: ["2,000円以下", "2,000円〜6,000円", "6,000円〜12,000円", "12,000円以上"]
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
      options: ["3,000円以下", "3,000円〜8,000円", "8,000円〜15,000円", "15,000円以上"]
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
      options: ["3,000円以下", "3,000円〜8,000円", "8,000円〜15,000円", "15,000円以上"]
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

    default:
      suggestions.push(
        { name: "実用的なギフト", keywords: ["実用", "ギフト", "お父さん", "プレゼント"], priceRange: "¥3,000〜¥15,000" },
        { name: "健康サポートグッズ", keywords: ["健康", "サポート", "ギフト", "お父さん"], priceRange: "¥5,000〜¥20,000" },
        { name: "趣味応援グッズ", keywords: ["趣味", "応援", "ギフト", "お父さん"], priceRange: "¥4,000〜¥18,000" }
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
