// ギフト提案データ（検索キーワードベース）
import { fatherQuestionFlows, fatherInLawQuestionFlows, motherQuestionFlows, generateFatherSuggestions, generateFatherInLawSuggestions, generateMotherSuggestions, filterSuggestionsByBudget, GiftItem, getProductNameByBudget, getPriceRangeByBudget } from './gift_items_father';
import { motherInLawQuestionFlow, generateMotherInLawSuggestions } from './gift_items_mother_in_law_v2';
import { siblingsQuestionFlow, generateSiblingsSuggestions } from './gift_items_siblings_v2';
import { childrenQuestionFlow, generateChildrenSuggestions } from './gift_items_children_v2';

// GiftItem型を再エクスポート
export type { GiftItem };

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

// ヘアケア専用のギフトアイテム定義
export const giftHaircareItems: GiftItem[] = [
  {
    id: "premium_shampoo_set",
    name: "高級シャンプー・トリートメントセット",
    description: "プロ仕様の高級シャンプーとトリートメントのセット。髪の質感とツヤを向上させます。",
    keywords: ["シャンプー", "トリートメント", "ヘアケア", "高級", "プロ仕様"],
    priceRange: "¥3,000〜¥8,000",
  },
  {
    id: "hair_oil_serum",
    name: "ヘアオイル・セラムセット",
    description: "髪のダメージを修復し、美しいツヤを与えるオイルとセラムのセット。",
    keywords: ["ヘアオイル", "セラム", "ダメージ修復", "ツヤ", "ヘアケア"],
    priceRange: "¥2,500〜¥6,000",
  },
  {
    id: "hair_mask_treatment",
    name: "ヘアマスク・集中ケアセット",
    description: "週1回の集中ケアで髪質を改善するヘアマスクとトリートメントのセット。",
    keywords: ["ヘアマスク", "集中ケア", "トリートメント", "髪質改善", "ヘアケア"],
    priceRange: "¥2,000〜¥5,000",
  },
  {
    id: "hair_styling_tools",
    name: "ヘアスタイリングツールセット",
    description: "ドライヤー、ブロワー、ブラシ、コームなど、美しいスタイリングをサポートするツールセット。",
    keywords: ["ドライヤー", "ヘアスタイリング", "ブロワー", "ブラシ", "ツール", "ヘアケア"],
    priceRange: "¥4,000〜¥12,000",
  },
  {
    id: "scalp_care_set",
    name: "スカルプケアセット",
    description: "頭皮の健康をサポートするシャンプーとスカルプマッサージツールのセット。",
    keywords: ["スカルプケア", "頭皮", "マッサージ", "ヘアケア", "健康"],
    priceRange: "¥3,500〜¥7,000",
  },
  {
    id: "color_care_set",
    name: "カラーケアセット",
    description: "カラーリングした髪の色持ちとツヤを保つ専用シャンプーとトリートメント。",
    keywords: ["カラーケア", "カラーリング", "色持ち", "ヘアケア", "専用"],
    priceRange: "¥2,500〜¥6,000",
  }
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
  // 恋人向けカテゴリ
  "ペアウォッチ": [
    {
      question: "お二人の好みのスタイルはどちらですか？",
      options: ["シンプル・ミニマル", "クラシック・上品", "スポーティ・カジュアル"]
    },
    {
      question: "普段のファッションはどちら寄りですか？",
      options: ["カジュアル", "ビジネス・フォーマル", "ミックス"]
    },
    {
      question: "機能性で重視したいのは？",
      options: ["時間を見やすさ", "防水性", "デザイン重視"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜15,000円", "15,000円〜30,000円", "30,000円以上"]
    }
  ],
  "フラワーボックス＋メッセージ": [
    {
      question: "お花の好みはどちらですか？",
      options: ["華やかな花", "シンプルな花", "季節の花"]
    },
    {
      question: "メッセージの内容は？",
      options: ["感謝の気持ち", "愛の言葉", "思い出の共有"]
    },
    {
      question: "プレゼントの印象は？",
      options: ["ロマンチック", "上品", "可愛らしい"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["3,000円未満", "3,000円〜5,000円", "5,000円〜8,000円", "8,000円以上"]
    }
  ],
  "高品質スキンケア・アロマ加湿器": [
    {
      question: "スキンケアの好みは？",
      options: ["保湿重視", "香り重視", "機能重視"]
    },
    {
      question: "アロマの香りは？",
      options: ["フローラル系", "リラックス系", "フレッシュ系"]
    },
    {
      question: "使用シーンは？",
      options: ["寝室", "リビング", "バスルーム"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜8,000円", "8,000円〜12,000円", "12,000円以上"]
    }
  ],
  "コーヒー・お茶・ペアマグ": [
    {
      question: "お二人の飲み物の好みは？",
      options: ["コーヒー", "お茶", "両方"]
    },
    {
      question: "マグのデザインは？",
      options: ["シンプル", "可愛らしい", "お揃いデザイン"]
    },
    {
      question: "特別感を演出したいのは？",
      options: ["名前入り", "メッセージ入り", "記念日デザイン"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["2,000円未満", "2,000円〜4,000円", "4,000円〜6,000円", "6,000円以上"]
    }
  ],
  "手袋・ストール・ルームウェア": [
    {
      question: "どのアイテムがお好みですか？",
      options: ["手袋", "ストール", "ルームウェア"]
    },
    {
      question: "素材の好みは？",
      options: ["ウール", "コットン", "カシミア"]
    },
    {
      question: "色の好みは？",
      options: ["落ち着いた色", "明るい色", "モノトーン"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["3,000円未満", "3,000円〜5,000円", "5,000円〜8,000円", "8,000円以上"]
    }
  ],
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
  // 義母向けカテゴリ
  "上質スキンケア": [
    {
      question: "義母さまは普段、どんなお手入れをされていそうですか？",
      options: ["化粧水や乳液などのスキンケア", "ハンドクリームなどのボディケア", "特にわからない"]
    },
    {
      question: "上品な香り付きアイテムはお好きそうですか？",
      options: ["はい", "無香料の方が良さそう", "わからない"]
    },
    {
      question: "プレゼントするならどんな印象を届けたいですか？",
      options: ["気が利いていて上品", "実用的で助かる", "見た目が華やか"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "香りギフト": [
    {
      question: "義母さまは普段、どんな香りを好まれていそうですか？",
      options: ["フローラル系", "フレッシュ系", "特にわからない"]
    },
    {
      question: "香りの強さはどの程度が良さそうですか？",
      options: ["控えめで上品", "しっかりと香る", "わからない"]
    },
    {
      question: "プレゼントするならどんな印象を届けたいですか？",
      options: ["気が利いていて上品", "実用的で助かる", "見た目が華やか"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "高級タオル・寝具": [
    {
      question: "義母さまは普段、どんな質感のものを好まれていそうですか？",
      options: ["やわらかくてふわふわ", "しっかりとした質感", "特にわからない"]
    },
    {
      question: "色合いの好みはどのような感じですか？",
      options: ["上品な色合い", "明るい色合い", "わからない"]
    },
    {
      question: "プレゼントするならどんな印象を届けたいですか？",
      options: ["気が利いていて上品", "実用的で助かる", "見た目が華やか"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "コンパクト美容家電": [
    {
      question: "義母さまは普段、どんな美容ケアをされていそうですか？",
      options: ["スキンケア", "ボディケア", "特にわからない"]
    },
    {
      question: "家電の使いやすさはどの程度が良さそうですか？",
      options: ["シンプルで簡単", "機能が充実", "わからない"]
    },
    {
      question: "プレゼントするならどんな印象を届けたいですか？",
      options: ["気が利いていて上品", "実用的で助かる", "見た目が華やか"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "華やかスイーツギフト": [
    {
      question: "義母さまは普段、どんなスイーツを好まれていそうですか？",
      options: ["和菓子", "洋菓子", "特にわからない"]
    },
    {
      question: "見た目の好みはどのような感じですか？",
      options: ["華やかで美しい", "シンプルで上品", "わからない"]
    },
    {
      question: "プレゼントするならどんな印象を届けたいですか？",
      options: ["気が利いていて上品", "実用的で助かる", "見た目が華やか"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "上品なお茶・紅茶ギフト": [
    {
      question: "義母さまは普段、どんなお茶を飲まれていそうですか？",
      options: ["日本茶", "紅茶", "特にわからない"]
    },
    {
      question: "香りの好みはどのような感じですか？",
      options: ["香り高い", "控えめ", "わからない"]
    },
    {
      question: "プレゼントするならどんな印象を届けたいですか？",
      options: ["気が利いていて上品", "実用的で助かる", "見た目が華やか"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "キッチン雑貨・調理器具": [
    {
      question: "義母さまは普段、どんな料理をされていそうですか？",
      options: ["和食中心", "洋食中心", "特にわからない"]
    },
    {
      question: "調理器具の好みはどのような感じですか？",
      options: ["高級で上質", "実用的", "わからない"]
    },
    {
      question: "プレゼントするならどんな印象を届けたいですか？",
      options: ["気が利いていて上品", "実用的で助かる", "見た目が華やか"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "アロマ・癒しグッズ": [
    {
      question: "義母さまは普段、どんな時間を大切にされていそうですか？",
      options: ["リラックスタイム", "お風呂タイム", "特にわからない"]
    },
    {
      question: "香りの好みはどのような感じですか？",
      options: ["フローラル系", "ウッディ系", "わからない"]
    },
    {
      question: "プレゼントするならどんな印象を届けたいですか？",
      options: ["気が利いていて上品", "実用的で助かる", "見た目が華やか"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "ブランド小物": [
    {
      question: "義母さまは普段、どんなスタイルを好まれていそうですか？",
      options: ["上品でクラシック", "モダンでおしゃれ", "特にわからない"]
    },
    {
      question: "小物の好みはどのような感じですか？",
      options: ["ブランド品", "シンプルで上質", "わからない"]
    },
    {
      question: "プレゼントするならどんな印象を届けたいですか？",
      options: ["気が利いていて上品", "実用的で助かる", "見た目が華やか"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "季節の花＆プリザーブドギフト": [
    {
      question: "義母さまは普段、どんな花を好まれていそうですか？",
      options: ["生花", "プリザーブドフラワー", "特にわからない"]
    },
    {
      question: "色合いの好みはどのような感じですか？",
      options: ["華やかな色合い", "上品な色合い", "わからない"]
    },
    {
      question: "プレゼントするならどんな印象を届けたいですか？",
      options: ["気が利いていて上品", "実用的で助かる", "見た目が華やか"]
    },
    {
      question: "ご予算帯をお選びください",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "美容・スキンケア": [
    {
      question: "お母さまは最近、お肌や髪について気になっていることはございますか？",
      options: [
        "乾燥が気になる",
        "シミやくすみが気になる", 
        "ハリやたるみが気になる",
        "髪のパサつき・ダメージが気になる",
        "特にないけれど、何か始めてみたい"
      ]
    },
    {
      question: "お母さまが美容アイテムを選ぶ際に重視されることはどれですか？",
      options: [
        "お手入れが簡単なものが良い",
        "効果を実感しやすいものが良い",
        "肌に優しい・低刺激なもの",
        "年齢に合ったケアができるもの",
        "デザインや機能性が良いもの"
      ]
    },
    {
      question: "お母さまは普段よくお使いの美容アイテムはございますか？",
      options: [
        "スキンケア（化粧水・クリームなど）",
        "美顔器などの美容家電",
        "ドライヤー・ヘアアイロン",
        "ボディケア用品（入浴剤・マッサージなど）",
        "あまり使っていない"
      ]
    },
    {
      question: "お母さまのご予算や使用頻度について、近いものをお選びくださいませ。",
      options: [
        "できれば1万円以内で続けやすいもの",
        "価格よりも効果を重視したい",
        "たまに使えれば十分（週1〜2回）",
        "毎日しっかり使いたい"
      ]
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
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "グルメギフト": [
    {
      question: "お母さまはどんな食べ物が好きですか？",
      options: ["甘いもの（スイーツなど）", "肉類", "海鮮", "くだもの", "どちらも好き"]
    },
    {
      question: "普段の食事の好みは？",
      options: ["和食が好き", "洋食が好き", "中華が好き", "特にこだわりなし"]
    },
    {
      question: "ギフトの予算感は？",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    },
    {
      question: "どんなグルメギフトに興味がありそうですか？",
      options: ["和菓子・日本茶", "洋菓子・紅茶", "地方特産品", "高級食材"]
    },
    {
      question: "地方特産品の種類はいかがでしょうか？",
      options: ["海産物・乾物", "農産物・果物", "調味料・調理用品", "特にこだわりなし"],
      condition: {
        dependsOn: "question_3",
        value: "地方特産品"
      }
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
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
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
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
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
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
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
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "おうちアイテム": [
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
      question: "おうちアイテムの予算感は？",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "実用派タイプ": [
    {
      question: "恋人は普段どんなアイテムを大切に使っていますか？",
      options: ["時計・アクセサリー", "バッグ・財布", "デジタルガジェット", "分からない"]
    },
    {
      question: "どのような実用性を重視しますか？",
      options: ["毎日使えるもの", "長く使える品質の良いもの", "機能性の高いもの", "シンプルで使いやすいもの"]
    },
    {
      question: "どんなスタイルがお好みですか？",
      options: ["シンプル・ミニマル", "高級感のあるもの", "モダン・スタイリッシュ", "クラシック・上品"]
    },
    {
      question: "実用派ギフトの予算感は？",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "趣味・共感タイプ": [
    {
      question: "恋人の趣味や興味のあることは？",
      options: ["音楽・映画", "スポーツ・アウトドア", "読書・学習", "アート・クリエイティブ"]
    },
    {
      question: "どんな体験を共有したいですか？",
      options: ["一緒に楽しめる体験", "相手の趣味を深められるもの", "新しい発見ができるもの", "特別な思い出になるもの"]
    },
    {
      question: "ギフトで伝えたいメッセージは？",
      options: ["応援・サポート", "感謝・愛情", "一緒に成長したい", "特別な存在であること"]
    },
    {
      question: "趣味・共感ギフトの予算感は？",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ],
  "洋服": [
    {
      question: "恋人の性別は？",
      options: ["男性", "女性", "わからない"]
    },
    {
      question: "恋人の普段のファッションスタイルは？",
      options: ["カジュアル・リラックス", "おしゃれ・トレンド", "上品・エレガント", "わからない"]
    },
    {
      question: "どんなアイテムが喜ばれそうですか？",
      options: ["トップス（シャツ・ニット）", "ボトムス（パンツ・スカート）", "アウター（ジャケット・コート）", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["5,000円未満", "5,000円〜10,000円", "10,000円〜20,000円", "20,000円以上"]
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
      question: "どんなタイプのギフトに興味がありますか？",
      options: ["季節限定食品", "ご当地グルメ", "伝統工芸品", "季節の花・植物", "特にこだわりなし"]
    },
    {
      question: "季節限定ギフトの予算感は？",
      options: ["5,000円未満", "5,000円〜10,000円未満", "10,000円〜20,000円未満", "20,000円以上"]
    }
  ]
};

// 恋人向け質問フロー
const coupleQuestionFlows = {
  "ペアアクセサリー": [
    {
      question: "恋人の普段のファッションスタイルは？",
      options: ["シンプル・カジュアル", "おしゃれ・トレンド", "上品・エレガント", "わからない"]
    },
    {
      question: "どんなアクセサリーがお好きそうですか？",
      options: ["シンプルなデザイン", "華やかなデザイン", "ブランド物", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["5,000円未満", "5,000円〜10,000円", "10,000円〜20,000円", "20,000円以上"]
    }
  ],
  "フラワーギフト": [
    {
      question: "恋人の好きな花の色は？",
      options: ["ピンク系", "白系", "赤系", "わからない"]
    },
    {
      question: "どんな印象のギフトにしたいですか？",
      options: ["華やかで特別感", "上品で落ち着いた", "可愛らしく親しみやすい", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["3,000円未満", "3,000円〜5,000円", "5,000円〜10,000円", "10,000円以上"]
    }
  ],
  "体験ギフト": [
    {
      question: "どんな体験がお好きそうですか？",
      options: ["グルメ・レストラン", "旅行・宿泊", "エステ・スパ", "わからない"]
    },
    {
      question: "一緒に楽しみたいですか？",
      options: ["はい、一緒に楽しみたい", "一人で楽しんでもらいたい", "どちらでも良い"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["10,000円未満", "10,000円〜20,000円", "20,000円〜30,000円", "30,000円以上"]
    }
  ],
  "おうち時間ギフト": [
    {
      question: "恋人の好きな飲み物は？",
      options: ["コーヒー", "お茶", "その他", "わからない"]
    },
    {
      question: "どんなスタイルのギフトにしたいですか？",
      options: ["実用的で毎日使える", "特別感のある高級品", "可愛らしいデザイン", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["2,000円未満", "2,000円〜5,000円", "5,000円〜10,000円", "10,000円以上"]
    }
  ],
  "冬小物": [
    {
      question: "恋人の普段の服装の色味は？",
      options: ["明るい色（白・ピンク・ベージュ）", "落ち着いた色（黒・グレー・ネイビー）", "カラフル", "わからない"]
    },
    {
      question: "どんなスタイルがお好きそうですか？",
      options: ["シンプル・カジュアル", "おしゃれ・トレンド", "上品・エレガント", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["3,000円未満", "3,000円〜5,000円", "5,000円〜10,000円", "10,000円以上"]
    }
  ],
  // 兄弟姉妹向けカテゴリ
  "家電ガジェット": [
    {
      question: "兄弟姉妹の普段の生活スタイルは？",
      options: ["忙しくて時間がない", "ゆったりとした生活", "アクティブ", "わからない"]
    },
    {
      question: "どんな家電に興味がありそうですか？",
      options: ["スマート家電", "健康管理系", "エンターテイメント系", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["5,000円未満", "5,000円〜10,000円", "10,000円〜20,000円", "20,000円以上"]
    }
  ],
  "趣味グッズ": [
    {
      question: "兄弟姉妹の趣味は何ですか？",
      options: ["読書", "映画・音楽", "アート・創作", "スポーツ", "わからない"]
    },
    {
      question: "どんなグッズが喜ばれそうですか？",
      options: ["実用的なもの", "見た目が良いもの", "高級感のあるもの", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["3,000円未満", "3,000円〜8,000円", "8,000円〜15,000円", "15,000円以上"]
    }
  ],
  "グルメギフト": [
    {
      question: "兄弟姉妹の食べ物の好みは？",
      options: ["和食", "洋食", "中華", "スイーツ", "わからない"]
    },
    {
      question: "どんなギフトが喜ばれそうですか？",
      options: ["高級食材", "お菓子・スイーツ", "お酒", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["5,000円未満", "5,000円〜10,000円", "10,000円〜20,000円", "20,000円以上"]
    }
  ],
  "お酒ギフト": [
    {
      question: "兄弟姉妹の飲み物の好みは？",
      options: ["ビール", "ワイン", "日本酒", "ウイスキー", "わからない"]
    },
    {
      question: "どんなお酒が喜ばれそうですか？",
      options: ["高級ブランド", "限定品", "地酒・クラフト", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["3,000円未満", "3,000円〜8,000円", "8,000円〜15,000円", "15,000円以上"]
    }
  ],
  "ファッション小物": [
    {
      question: "兄弟姉妹のファッションスタイルは？",
      options: ["カジュアル", "ビジネス", "おしゃれ", "シンプル", "わからない"]
    },
    {
      question: "どんな小物が喜ばれそうですか？",
      options: ["バッグ", "財布", "アクセサリー", "時計", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["3,000円未満", "3,000円〜8,000円", "8,000円〜15,000円", "15,000円以上"]
    }
  ],
  "兄弟姉妹体験ギフト": [
    {
      question: "兄弟姉妹の興味のある体験は？",
      options: ["料理教室", "陶芸体験", "温泉旅行", "スポーツ体験", "わからない"]
    },
    {
      question: "一緒に楽しみたいですか？",
      options: ["はい", "一人で楽しんでもらいたい", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["5,000円未満", "5,000円〜10,000円", "10,000円〜20,000円", "20,000円以上"]
    }
  ],
  "本・雑誌ギフト": [
    {
      question: "兄弟姉妹の読書の好みは？",
      options: ["小説", "ビジネス書", "趣味の雑誌", "専門書", "わからない"]
    },
    {
      question: "どんな本が喜ばれそうですか？",
      options: ["ベストセラー", "専門書", "雑誌", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["2,000円未満", "2,000円〜5,000円", "5,000円〜10,000円", "10,000円以上"]
    }
  ],
  "スポーツグッズ": [
    {
      question: "兄弟姉妹のスポーツの好みは？",
      options: ["ジョギング", "筋トレ", "球技", "アウトドア", "わからない"]
    },
    {
      question: "どんなグッズが喜ばれそうですか？",
      options: ["ウェア", "シューズ", "器具", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["5,000円未満", "5,000円〜10,000円", "10,000円〜20,000円", "20,000円以上"]
    }
  ],
  "美容・健康グッズ": [
    {
      question: "兄弟姉妹の美容・健康への関心は？",
      options: ["スキンケア", "健康管理", "エクササイズ", "わからない"]
    },
    {
      question: "どんなグッズが喜ばれそうですか？",
      options: ["スキンケア用品", "健康食品", "マッサージ器", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["3,000円未満", "3,000円〜8,000円", "8,000円〜15,000円", "15,000円以上"]
    }
  ],
  "旅行グッズ": [
    {
      question: "兄弟姉妹の旅行の頻度は？",
      options: ["よく旅行する", "たまに旅行する", "あまり旅行しない", "わからない"]
    },
    {
      question: "どんなグッズが喜ばれそうですか？",
      options: ["スーツケース", "旅行バッグ", "旅行雑貨", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["5,000円未満", "5,000円〜10,000円", "10,000円〜20,000円", "20,000円以上"]
    }
  ],
  // 子供向けカテゴリ
  "知育おもちゃ": [
    {
      question: "お子様の年齢は？",
      options: ["0-2歳", "3-5歳", "6-12歳", "13-18歳"]
    },
    {
      question: "どんな知育おもちゃに興味がありそうですか？",
      options: ["ブロック", "パズル", "お絵描き", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["3,000円未満", "3,000円〜8,000円", "8,000円〜15,000円", "15,000円以上"]
    }
  ],
  "スポーツ用品": [
    {
      question: "お子様のスポーツの好みは？",
      options: ["サッカー", "バスケットボール", "水泳", "その他", "わからない"]
    },
    {
      question: "どんなスポーツ用品が喜ばれそうですか？",
      options: ["ボール", "ウェア", "シューズ", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["5,000円未満", "5,000円〜10,000円", "10,000円〜20,000円", "20,000円以上"]
    }
  ],
  "学習用品": [
    {
      question: "お子様の学習への関心は？",
      options: ["勉強が好き", "勉強は普通", "勉強は苦手", "わからない"]
    },
    {
      question: "どんな学習用品が喜ばれそうですか？",
      options: ["文房具", "図鑑", "学習ゲーム", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["3,000円未満", "3,000円〜8,000円", "8,000円〜15,000円", "15,000円以上"]
    }
  ],
  "子供体験ギフト": [
    {
      question: "お子様の興味のある体験は？",
      options: ["動物園", "水族館", "科学館", "工場見学", "わからない"]
    },
    {
      question: "一緒に楽しみたいですか？",
      options: ["はい", "一人で楽しんでもらいたい", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["5,000円未満", "5,000円〜10,000円", "10,000円〜20,000円", "20,000円以上"]
    }
  ],
  "本・絵本": [
    {
      question: "お子様の読書の好みは？",
      options: ["絵本", "図鑑", "小説", "漫画", "わからない"]
    },
    {
      question: "どんな本が喜ばれそうですか？",
      options: ["絵本", "図鑑", "小説", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["1,000円未満", "1,000円〜3,000円", "3,000円〜8,000円", "8,000円以上"]
    }
  ],
  "音楽・楽器": [
    {
      question: "お子様の音楽への関心は？",
      options: ["音楽が好き", "楽器に興味がある", "特にない", "わからない"]
    },
    {
      question: "どんな楽器が喜ばれそうですか？",
      options: ["キーボード", "ギター", "リコーダー", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["5,000円未満", "5,000円〜15,000円", "15,000円〜25,000円", "25,000円以上"]
    }
  ],
  "アート・工作用品": [
    {
      question: "お子様の創作活動への関心は？",
      options: ["絵を描くのが好き", "工作が好き", "特にない", "わからない"]
    },
    {
      question: "どんなアート用品が喜ばれそうですか？",
      options: ["絵の具", "クレヨン", "工作キット", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["2,000円未満", "2,000円〜5,000円", "5,000円〜10,000円", "10,000円以上"]
    }
  ],
  "ゲーム・パズル": [
    {
      question: "お子様のゲームの好みは？",
      options: ["ボードゲーム", "カードゲーム", "パズル", "わからない"]
    },
    {
      question: "家族で楽しみたいですか？",
      options: ["はい", "一人で楽しんでもらいたい", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["3,000円未満", "3,000円〜8,000円", "8,000円〜15,000円", "15,000円以上"]
    }
  ],
  "衣類・ファッション": [
    {
      question: "お子様のファッションスタイルは？",
      options: ["カジュアル", "おしゃれ", "スポーティ", "わからない"]
    },
    {
      question: "どんなアイテムが喜ばれそうですか？",
      options: ["服", "靴", "アクセサリー", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["3,000円未満", "3,000円〜8,000円", "8,000円〜15,000円", "15,000円以上"]
    }
  ],
  "おもちゃ・人形": [
    {
      question: "お子様のおもちゃの好みは？",
      options: ["人形", "ぬいぐるみ", "おもちゃ", "わからない"]
    },
    {
      question: "どんなおもちゃが喜ばれそうですか？",
      options: ["人形", "ぬいぐるみ", "おもちゃ", "わからない"]
    },
    {
      question: "予算はどのくらいですか？",
      options: ["2,000円未満", "2,000円〜5,000円", "5,000円〜10,000円", "10,000円以上"]
    }
  ]
};

// 義母向け質問フローを追加
const motherInLawQuestionFlows = {
  "義母向けスキンケア": motherInLawQuestionFlow.map(q => ({
    question: q.question,
    options: q.options
  }))
};

// 兄弟姉妹向け質問フローを追加
const siblingsQuestionFlows = {
  "兄弟姉妹向けギフト": siblingsQuestionFlow.map(q => ({
    question: q.question,
    options: q.options
  }))
};

// 子供向け質問フローを追加
const childrenQuestionFlows = {
  "子供向けギフト": childrenQuestionFlow.map(q => ({
    question: q.question,
    options: q.options
  }))
};

// 実父・義父・実母・義母・兄弟姉妹・子供・恋人向け質問フローを統合
Object.assign(questionFlows, fatherQuestionFlows, fatherInLawQuestionFlows, motherQuestionFlows, motherInLawQuestionFlows, siblingsQuestionFlows, childrenQuestionFlows, coupleQuestionFlows);

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
  console.log("=== generateCategorySuggestions 呼び出し ===");
  console.log("カテゴリ:", category);
  console.log("回答:", answers);

  let suggestions: GiftItem[] = [];
  
  // カテゴリに応じた適切なアイテムを選択
  switch (category) {
    case "高級お茶セット":
      return generateTeaSuggestions(answers);
    
    
    case "健康グッズ":
      // ユーザーの回答に基づいてサブカテゴリを提案
      const healthAnswer = answers.question_2 || "";
      suggestions = generateHealthSuggestions(healthAnswer);
      break;
    
    case "季節の花ギフト":
      // ユーザーの回答に基づいてサブカテゴリを提案
      const flowerAnswer = answers.question_0 || "";
      suggestions = generateFlowerSuggestions(flowerAnswer);
      break;
    
    // 義母向けカテゴリ
    case "上質スキンケア":
      const skincareAnswer = answers.question_0 || "";
      suggestions = generateSkincareSuggestions(skincareAnswer);
      break;
    
    case "香りギフト":
      const fragranceAnswer = answers.question_0 || "";
      suggestions = generateFragranceSuggestions(fragranceAnswer);
      break;
    
    case "高級タオル・寝具":
      const towelAnswer = answers.question_0 || "";
      suggestions = generateTowelSuggestions(towelAnswer);
      break;
    
    case "コンパクト美容家電":
      const beautyDeviceAnswer = answers.question_0 || "";
      suggestions = generateBeautyDeviceSuggestions(beautyDeviceAnswer);
      break;
    
    case "華やかスイーツギフト":
      const sweetsAnswer = answers.question_0 || "";
      suggestions = generateSweetsSuggestions(sweetsAnswer);
      break;
    
    case "上品なお茶・紅茶ギフト":
      const teaAnswer = answers.question_0 || "";
      suggestions = generateElegantTeaSuggestions(teaAnswer);
      break;

    // 実父向けカテゴリ
    case "マッサージ機器":
    case "健康食品・サプリメント":
    case "睡眠グッズ":
    case "お酒ギフト":
    case "家電ガジェット":
    case "趣味グッズ":
    case "日常家電":
    case "ブランド財布・キーケース":
    case "スポーツ系グッズ":
    case "ルームウェア":
      suggestions = generateFatherSuggestions(category, answers);
      break;

    // 義父向けカテゴリ
    case "高級グルメギフト":
    case "プレミアムドリンク":
    case "お酒（見た目重視）":
    case "上品な健康グッズ":
    case "ブランド小物":
    case "靴下・肌着（上質系）":
    case "シニア向けガジェット":
    case "本・雑誌ギフト":
    case "季節感ギフト":
    case "和風雑貨":
      suggestions = generateFatherInLawSuggestions(category, answers);
      break;

    // 恋人向けカテゴリ
    case "ペアアクセサリー":
      suggestions = generateCoupleAccessorySuggestions(answers);
      break;
    
    case "ペアウォッチ":
      suggestions = generateCoupleAccessorySuggestions(answers);
      break;
    
    case "フラワーボックス＋メッセージ":
      suggestions = generateCoupleFlowerSuggestions(answers);
      break;
    
    case "高品質スキンケア・アロマ加湿器":
      suggestions = generateCoupleSkincareSuggestions(answers);
      break;
    
    case "コーヒー・お茶・ペアマグ":
      suggestions = generateCoupleHomeTimeSuggestions(answers);
      break;
    
    case "手袋・ストール・ルームウェア":
      suggestions = generateCoupleWinterSuggestions(answers);
      break;
    
    case "フラワーギフト":
      suggestions = generateCoupleFlowerSuggestions(answers);
      break;
    
    case "美容・スキンケア":
      // 対象者別の特別なロジックを使用
      if (answers.target === "恋人") {
        suggestions = generateCoupleSkincareSuggestions(answers);
      } else if (answers.target === "義母") {
        suggestions = generateMotherInLawSuggestions(answers);
      } else {
        suggestions = generateMotherSuggestions(category, answers);
        // 予算フィルタリングを適用
        const budget = answers.question_4 || "";
        if (budget) {
          suggestions = filterSuggestionsByBudget(suggestions, budget);
        }
      }
      break;
    
    case "体験ギフト":
      // 対象者別の特別なロジックを使用
      if (answers.target === "恋人") {
        suggestions = generateCoupleExperienceSuggestions(answers);
      } else if (answers.target === "兄弟姉妹") {
        suggestions = generateSiblingsSuggestions(answers);
      } else {
        suggestions = generateMotherSuggestions(category, answers);
        // 予算フィルタリングを適用
        const experienceBudget = answers.question_4 || "";
        if (experienceBudget) {
          suggestions = filterSuggestionsByBudget(suggestions, experienceBudget);
        }
      }
      break;
    case "兄弟姉妹体験ギフト":
      suggestions = generateSiblingsSuggestions(answers);
      break;
    case "子供体験ギフト":
      suggestions = generateChildrenSuggestions(answers);
      break;
    
    case "おうち時間ギフト":
      // 恋人向けの場合は特別なロジックを使用
      if (answers.target === "恋人") {
        suggestions = generateCoupleHomeTimeSuggestions(answers);
      } else {
        suggestions = generateMotherSuggestions(category, answers);
        // 予算フィルタリングを適用
        const homeTimeBudget = answers.question_4 || "";
        if (homeTimeBudget) {
          suggestions = filterSuggestionsByBudget(suggestions, homeTimeBudget);
        }
      }
      break;
    
    case "冬小物":
      suggestions = generateCoupleWinterSuggestions(answers);
      break;
    
    case "洋服":
      suggestions = generateCoupleClothingSuggestions(answers);
      break;

    // 実母向けカテゴリ（既存のロジック）
    case "美容・スキンケア（実母）":
      suggestions = generateMotherSuggestions(category, answers);
      // 予算フィルタリングを適用
      const budget = answers.question_4 || "";
      if (budget) {
        suggestions = filterSuggestionsByBudget(suggestions, budget);
      }
      break;
    
    case "キッチン雑貨・調理器具":
      suggestions = generateMotherSuggestions(category, answers);
      // 予算フィルタリングを適用
      const kitchenBudget = answers.question_4 || "";
      if (kitchenBudget) {
        suggestions = filterSuggestionsByBudget(suggestions, kitchenBudget);
      }
      break;
    
    case "アロマ・癒しグッズ":
      suggestions = generateMotherSuggestions(category, answers);
      // 予算フィルタリングを適用
      const aromaBudget = answers.question_4 || "";
      if (aromaBudget) {
        suggestions = filterSuggestionsByBudget(suggestions, aromaBudget);
      }
      break;
    
    case "ブランド小物":
      suggestions = generateMotherSuggestions(category, answers);
      // 予算フィルタリングを適用
      const brandBudget = answers.question_4 || "";
      if (brandBudget) {
        suggestions = filterSuggestionsByBudget(suggestions, brandBudget);
      }
      break;
    
    case "季節の花＆プリザーブドギフト":
      suggestions = generateMotherSuggestions(category, answers);
      // 予算フィルタリングを適用
      const flowerGiftBudget = answers.question_4 || "";
      if (flowerGiftBudget) {
        suggestions = filterSuggestionsByBudget(suggestions, flowerGiftBudget);
      }
      break;
    
    case "グルメギフト":
      suggestions = generateMotherSuggestions(category, answers);
      // 予算フィルタリングを適用
      const gourmetBudget = answers.question_4 || "";
      if (gourmetBudget) {
        suggestions = filterSuggestionsByBudget(suggestions, gourmetBudget);
      }
      break;
    
    case "体験ギフト":
      suggestions = generateMotherSuggestions(category, answers);
      // 予算フィルタリングを適用
      const experienceBudget = answers.question_4 || "";
      if (experienceBudget) {
        suggestions = filterSuggestionsByBudget(suggestions, experienceBudget);
      }
      break;
    case "兄弟姉妹体験ギフト":
      suggestions = generateMotherSuggestions(category, answers);
      break;
    case "子供体験ギフト":
      suggestions = generateMotherSuggestions(category, answers);
      break;
    
    case "名入れ・メッセージ入りギフト":
      suggestions = generateMotherSuggestions(category, answers);
      // 予算フィルタリングを適用
      const personalizedBudget = answers.question_4 || "";
      if (personalizedBudget) {
        suggestions = filterSuggestionsByBudget(suggestions, personalizedBudget);
      }
      break;
    
    case "フォトアルバム・家族の思い出ギフト":
      suggestions = generateMotherSuggestions(category, answers);
      // 予算フィルタリングを適用
      const memoryBudget = answers.question_4 || "";
      if (memoryBudget) {
        suggestions = filterSuggestionsByBudget(suggestions, memoryBudget);
      }
      break;
    
    case "おうち時間を楽しむアイテム":
      suggestions = generateMotherSuggestions(category, answers);
      // 予算フィルタリングを適用
      const homeTimeBudget = answers.question_4 || "";
      if (homeTimeBudget) {
        suggestions = filterSuggestionsByBudget(suggestions, homeTimeBudget);
      }
      break;
    
    case "おうちアイテム":
      suggestions = generateMotherSuggestions(category, answers);
      // 予算フィルタリングを適用
      const homeItemBudget = answers.question_4 || "";
      if (homeItemBudget) {
        suggestions = filterSuggestionsByBudget(suggestions, homeItemBudget);
      }
      break;
    
    case "実用派タイプ":
      suggestions = generateCoupleSuggestions(category, answers);
      // 予算フィルタリングを適用
      const practicalBudget = answers.question_4 || "";
      if (practicalBudget) {
        suggestions = filterSuggestionsByBudget(suggestions, practicalBudget);
      }
      break;
    
    case "趣味・共感タイプ":
      suggestions = generateCoupleSuggestions(category, answers);
      // 予算フィルタリングを適用
      const hobbyBudget = answers.question_4 || "";
      if (hobbyBudget) {
        suggestions = filterSuggestionsByBudget(suggestions, hobbyBudget);
      }
      break;
    
    case "季節限定・ご当地ギフト":
      suggestions = generateMotherSuggestions(category, answers);
      // 予算フィルタリングを適用
      const seasonalBudget = answers.question_4 || "";
      if (seasonalBudget) {
        suggestions = filterSuggestionsByBudget(suggestions, seasonalBudget);
      }
      break;
    
    default:
      // デフォルトは雑貨系
      return generateMiscSuggestions(answers);
  }
  
  return suggestions.slice(0, 3);
}

// 健康グッズの提案生成関数
export function generateHealthSuggestions(healthAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  // ユーザーの回答に基づいてサブカテゴリを提案
  if (healthAnswer.includes("マッサージ器具") || healthAnswer.includes("マッサージ")) {
    suggestions.push(
      { name: "顔用マッサージ器具", keywords: ["顔", "マッサージ", "美顔器"], priceRange: "¥4,000〜¥10,000" },
      { name: "腰用マッサージ器具", keywords: ["腰", "マッサージ", "腰痛"], priceRange: "¥6,000〜¥12,000" },
      { name: "脚・足用マッサージ器具", keywords: ["足", "マッサージ", "むくみ"], priceRange: "¥5,000〜¥15,000" }
    );
  } else if (healthAnswer.includes("健康サプリメント") || healthAnswer.includes("サプリメント")) {
    suggestions.push(
      { name: "関節ケアサプリ", keywords: ["関節", "サプリ", "グルコサミン"], priceRange: "¥2,000〜¥6,000" },
      { name: "骨密度サポート", keywords: ["骨", "サプリ", "カルシウム"], priceRange: "¥3,000〜¥8,000" },
      { name: "免疫力サポート", keywords: ["免疫", "サプリ", "ビタミン"], priceRange: "¥2,000〜¥5,000" }
    );
  } else if (healthAnswer.includes("測定器具") || healthAnswer.includes("血圧計") || healthAnswer.includes("健康測定器")) {
    suggestions.push(
      { name: "手首式血圧計", keywords: ["手首", "血圧計", "コンパクト"], priceRange: "¥5,000〜¥8,000" },
      { name: "上腕式血圧計", keywords: ["上腕", "血圧計", "高精度"], priceRange: "¥6,000〜¥12,000" },
      { name: "体組成計", keywords: ["体組成計", "体重計", "体脂肪"], priceRange: "¥3,000〜¥10,000" }
    );
  } else if (healthAnswer.includes("温熱器具") || healthAnswer.includes("温熱")) {
    suggestions.push(
      { name: "首・肩用温熱器具", keywords: ["首", "肩", "温熱", "ホットパック"], priceRange: "¥3,000〜¥8,000" },
      { name: "腰用温熱器具", keywords: ["腰", "温熱", "腰痛"], priceRange: "¥4,000〜¥10,000" },
      { name: "足用温熱器具", keywords: ["足", "温熱", "冷え性"], priceRange: "¥2,500〜¥7,000" }
    );
  } else if (healthAnswer.includes("運動器具") || healthAnswer.includes("運動")) {
    suggestions.push(
      { name: "軽量ダンベル", keywords: ["ダンベル", "筋トレ", "軽量"], priceRange: "¥3,000〜¥8,000" },
      { name: "ヨガマット・ストレッチ", keywords: ["ヨガ", "ストレッチ", "マット"], priceRange: "¥2,000〜¥6,000" },
      { name: "バランスボール", keywords: ["バランスボール", "体幹", "運動"], priceRange: "¥2,500〜¥5,000" }
    );
  } else {
    // デフォルト：バランスの取れた提案
    suggestions.push(
      { name: "血圧計・健康測定器", keywords: ["血圧計", "健康測定", "医療機器"], priceRange: "¥5,000〜¥15,000" },
      { name: "マッサージ器具", keywords: ["マッサージ", "肩こり", "腰痛"], priceRange: "¥3,000〜¥10,000" },
      { name: "健康サプリメント", keywords: ["サプリメント", "健康", "栄養"], priceRange: "¥2,000〜¥8,000" }
    );
  }

  return suggestions;
}

// 季節の花ギフトの提案生成関数
export function generateFlowerSuggestions(flowerAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  // ユーザーの回答に基づいてサブカテゴリを提案
  if (flowerAnswer.includes("生花") || flowerAnswer.includes("フラワーアレンジ")) {
    suggestions.push(
      { name: "季節の生花アレンジメント", keywords: ["生花", "フラワーアレンジ", "季節"], priceRange: "¥2,000〜¥6,000" },
      { name: "バラの花束", keywords: ["バラ", "花束", "ローズ"], priceRange: "¥3,000〜¥8,000" },
      { name: "季節の切り花セット", keywords: ["切り花", "季節", "フラワー"], priceRange: "¥1,500〜¥4,000" }
    );
  } else if (flowerAnswer.includes("観葉植物") || flowerAnswer.includes("鉢植え")) {
    suggestions.push(
      { name: "観葉植物・鉢植え", keywords: ["観葉植物", "鉢植え", "グリーン"], priceRange: "¥3,000〜¥8,000" },
      { name: "多肉植物セット", keywords: ["多肉植物", "サボテン", "インテリア"], priceRange: "¥2,000〜¥5,000" },
      { name: "ハーブ・香り植物", keywords: ["ハーブ", "香り", "料理"], priceRange: "¥1,500〜¥4,000" }
    );
  } else if (flowerAnswer.includes("ドライフラワー") || flowerAnswer.includes("プリザーブド")) {
    suggestions.push(
      { name: "ドライフラワー・プリザーブド", keywords: ["ドライフラワー", "プリザーブド", "長持ち"], priceRange: "¥2,500〜¥7,000" },
      { name: "アーティフィシャルフラワー", keywords: ["造花", "アーティフィシャル", "インテリア"], priceRange: "¥2,000〜¥6,000" },
      { name: "押し花・フラワーアート", keywords: ["押し花", "アート", "インテリア"], priceRange: "¥3,000〜¥8,000" }
    );
  } else {
    // デフォルト：バランスの取れた提案
    suggestions.push(
      { name: "季節の生花アレンジメント", keywords: ["生花", "フラワーアレンジ", "季節"], priceRange: "¥2,000〜¥6,000" },
      { name: "観葉植物・鉢植え", keywords: ["観葉植物", "鉢植え", "グリーン"], priceRange: "¥3,000〜¥8,000" },
      { name: "ドライフラワー・プリザーブド", keywords: ["ドライフラワー", "プリザーブド", "長持ち"], priceRange: "¥2,500〜¥7,000" }
    );
  }

  return suggestions;
}

// グルメギフトの提案生成関数
export function generateGourmetSuggestions(gourmetAnswer: string, subcategoryAnswer?: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  // ユーザーの回答に基づいてサブカテゴリを提案
  if (gourmetAnswer.includes("和菓子・日本茶") || gourmetAnswer.includes("和菓子") || gourmetAnswer.includes("日本茶")) {
    suggestions.push(
      { name: "高級和菓子セット", keywords: ["和菓子", "日本茶", "伝統"], priceRange: "¥3,000〜¥8,000" },
      { name: "抹茶・煎茶セット", keywords: ["抹茶", "煎茶", "日本茶"], priceRange: "¥2,500〜¥6,000" },
      { name: "季節の和菓子", keywords: ["季節", "和菓子", "限定"], priceRange: "¥2,000〜¥5,000" }
    );
  } else if (gourmetAnswer.includes("洋菓子・紅茶") || gourmetAnswer.includes("洋菓子") || gourmetAnswer.includes("ケーキ")) {
    suggestions.push(
      { name: "洋菓子・ケーキセット", keywords: ["洋菓子", "ケーキ", "スイーツ"], priceRange: "¥2,500〜¥6,000" },
      { name: "チョコレート・お菓子", keywords: ["チョコレート", "お菓子", "スイーツ"], priceRange: "¥2,000〜¥5,000" },
      { name: "焼き菓子・クッキー", keywords: ["焼き菓子", "クッキー", "手作り風"], priceRange: "¥1,500〜¥4,000" }
    );
  } else if (gourmetAnswer.includes("地方特産品") || gourmetAnswer.includes("地方特産") || gourmetAnswer.includes("ご当地")) {
    // 地方特産品のサブカテゴリに基づく提案
    if (subcategoryAnswer?.includes("海産物")) {
      suggestions.push(
        { name: "北海道海産物セット", keywords: ["北海道", "海産物", "海の幸"], priceRange: "¥3,000〜¥7,000" },
        { name: "九州海産物セット", keywords: ["九州", "海産物", "海の幸"], priceRange: "¥2,500〜¥6,000" },
        { name: "瀬戸内海産物セット", keywords: ["瀬戸内", "海産物", "海の幸"], priceRange: "¥2,800〜¥6,500" }
      );
    } else if (subcategoryAnswer?.includes("農産物")) {
      suggestions.push(
        { name: "青森りんごセット", keywords: ["青森", "りんご", "果物"], priceRange: "¥2,500〜¥5,000" },
        { name: "山形さくらんぼセット", keywords: ["山形", "さくらんぼ", "果物"], priceRange: "¥3,000〜¥6,000" },
        { name: "静岡お茶セット", keywords: ["静岡", "お茶", "日本茶"], priceRange: "¥2,000〜¥5,000" }
      );
    } else if (subcategoryAnswer?.includes("調味料")) {
      suggestions.push(
        { name: "九州調味料セット", keywords: ["九州", "調味料", "料理"], priceRange: "¥2,000〜¥4,500" },
        { name: "北海道調味料セット", keywords: ["北海道", "調味料", "料理"], priceRange: "¥2,200〜¥5,000" },
        { name: "関西調味料セット", keywords: ["関西", "調味料", "料理"], priceRange: "¥1,800〜¥4,000" }
      );
    } else {
      // デフォルト：地方特産品のバランスの取れた提案
      suggestions.push(
        { name: "北海道特産品セット", keywords: ["北海道", "特産品", "地方"], priceRange: "¥3,000〜¥7,000" },
        { name: "九州特産品セット", keywords: ["九州", "特産品", "地方"], priceRange: "¥2,500〜¥6,000" },
        { name: "東北特産品セット", keywords: ["東北", "特産品", "地方"], priceRange: "¥2,800〜¥6,500" }
      );
    }
  } else {
    // デフォルト：バランスの取れた提案
    suggestions.push(
      { name: "高級和菓子セット", keywords: ["和菓子", "日本茶", "伝統"], priceRange: "¥3,000〜¥8,000" },
      { name: "洋菓子・ケーキセット", keywords: ["洋菓子", "ケーキ", "スイーツ"], priceRange: "¥2,500〜¥6,000" },
      { name: "地方特産品セット", keywords: ["地方特産", "ご当地", "名産品"], priceRange: "¥3,000〜¥7,000" }
    );
  }

  return suggestions;
}

// 体験ギフトの提案生成関数
export function generateExperienceSuggestions(experienceAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  // ユーザーの回答に基づいてサブカテゴリを提案
  if (experienceAnswer.includes("温泉・リラクゼーション") || experienceAnswer.includes("温泉") || experienceAnswer.includes("リラクゼーション")) {
    suggestions.push(
      { name: "温泉・リラクゼーション", keywords: ["温泉", "リラクゼーション", "癒し"], priceRange: "¥5,000〜¥20,000" },
      { name: "エステ・マッサージ", keywords: ["エステ", "マッサージ", "美容"], priceRange: "¥3,000〜¥15,000" },
      { name: "ヨガ・フィットネス", keywords: ["ヨガ", "フィットネス", "健康"], priceRange: "¥2,000〜¥8,000" }
    );
  } else if (experienceAnswer.includes("料理教室・ワークショップ") || experienceAnswer.includes("料理教室") || experienceAnswer.includes("ワークショップ")) {
    suggestions.push(
      { name: "料理教室・ワークショップ", keywords: ["料理教室", "ワークショップ", "体験"], priceRange: "¥3,000〜¥10,000" },
      { name: "手作り体験", keywords: ["手作り", "体験", "クラフト"], priceRange: "¥2,500〜¥8,000" },
      { name: "文化体験", keywords: ["文化", "体験", "伝統"], priceRange: "¥2,000〜¥6,000" }
    );
  } else if (experienceAnswer.includes("観劇・コンサート") || experienceAnswer.includes("観劇") || experienceAnswer.includes("コンサート")) {
    suggestions.push(
      { name: "観劇・コンサートチケット", keywords: ["観劇", "コンサート", "エンターテイメント"], priceRange: "¥4,000〜¥15,000" },
      { name: "映画・イベント", keywords: ["映画", "イベント", "エンターテイメント"], priceRange: "¥2,000〜¥8,000" },
      { name: "スポーツ観戦", keywords: ["スポーツ", "観戦", "チケット"], priceRange: "¥3,000〜¥12,000" }
    );
  } else {
    // デフォルト：バランスの取れた提案
    suggestions.push(
      { name: "温泉・リラクゼーション", keywords: ["温泉", "リラクゼーション", "癒し"], priceRange: "¥5,000〜¥20,000" },
      { name: "料理教室・ワークショップ", keywords: ["料理教室", "ワークショップ", "体験"], priceRange: "¥3,000〜¥10,000" },
      { name: "観劇・コンサートチケット", keywords: ["観劇", "コンサート", "エンターテイメント"], priceRange: "¥4,000〜¥15,000" }
    );
  }

  return suggestions;
}

// 名入れ・メッセージ入りギフトの提案生成関数
export function generatePersonalizedSuggestions(personalizedAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  // ユーザーの回答に基づいてサブカテゴリを提案
  if (personalizedAnswer.includes("湯呑み・マグカップ") || personalizedAnswer.includes("マグカップ") || personalizedAnswer.includes("湯呑み")) {
    suggestions.push(
      { name: "名入れマグカップ・湯呑み", keywords: ["名入れ", "マグカップ", "湯呑み"], priceRange: "¥3,000〜¥8,000" },
      { name: "名入れコーヒーカップ", keywords: ["名入れ", "コーヒーカップ", "カップ"], priceRange: "¥2,500〜¥6,000" },
      { name: "名入れ茶碗・お椀", keywords: ["名入れ", "茶碗", "お椀"], priceRange: "¥3,000〜¥7,000" }
    );
  } else if (personalizedAnswer.includes("タオル・ハンカチ") || personalizedAnswer.includes("タオル") || personalizedAnswer.includes("ハンカチ")) {
    suggestions.push(
      { name: "名入れタオル・ハンカチ", keywords: ["名入れ", "タオル", "ハンカチ"], priceRange: "¥2,000〜¥5,000" },
      { name: "名入れバスタオル", keywords: ["名入れ", "バスタオル", "タオル"], priceRange: "¥2,500〜¥6,000" },
      { name: "名入れ手ぬぐい", keywords: ["名入れ", "手ぬぐい", "伝統"], priceRange: "¥1,500〜¥4,000" }
    );
  } else if (personalizedAnswer.includes("ポーチ・バッグ") || personalizedAnswer.includes("ポーチ") || personalizedAnswer.includes("バッグ")) {
    suggestions.push(
      { name: "名入れポーチ・バッグ", keywords: ["名入れ", "ポーチ", "バッグ"], priceRange: "¥3,500〜¥8,000" },
      { name: "名入れエコバッグ", keywords: ["名入れ", "エコバッグ", "バッグ"], priceRange: "¥2,000〜¥5,000" },
      { name: "名入れ小物入れ", keywords: ["名入れ", "小物入れ", "収納"], priceRange: "¥2,500〜¥6,000" }
    );
  } else {
    // デフォルト：バランスの取れた提案
    suggestions.push(
      { name: "名入れマグカップ・湯呑み", keywords: ["名入れ", "マグカップ", "湯呑み"], priceRange: "¥3,000〜¥8,000" },
      { name: "名入れタオル・ハンカチ", keywords: ["名入れ", "タオル", "ハンカチ"], priceRange: "¥2,000〜¥5,000" },
      { name: "名入れポーチ・バッグ", keywords: ["名入れ", "ポーチ", "バッグ"], priceRange: "¥3,500〜¥8,000" }
    );
  }

  return suggestions;
}

// フォトアルバム・家族の思い出ギフトの提案生成関数
export function generateMemorySuggestions(memoryAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  // ユーザーの回答に基づいてサブカテゴリを提案
  if (memoryAnswer.includes("デジタルアルバム") || memoryAnswer.includes("デジタルフォトフレーム") || memoryAnswer.includes("デジタル")) {
    suggestions.push(
      { name: "デジタルフォトフレーム", keywords: ["デジタルフォトフレーム", "写真", "デジタル"], priceRange: "¥5,000〜¥15,000" },
      { name: "スマートフォトフレーム", keywords: ["スマート", "フォトフレーム", "WiFi"], priceRange: "¥6,000〜¥18,000" },
      { name: "電子フォトアルバム", keywords: ["電子", "フォトアルバム", "デジタル"], priceRange: "¥4,000〜¥12,000" }
    );
  } else if (memoryAnswer.includes("手作りアルバム") || memoryAnswer.includes("手作り") || memoryAnswer.includes("クラフト")) {
    suggestions.push(
      { name: "手作りアルバムキット", keywords: ["手作り", "アルバム", "キット"], priceRange: "¥2,000〜¥6,000" },
      { name: "スクラップブッキング", keywords: ["スクラップブッキング", "手作り", "クラフト"], priceRange: "¥2,500〜¥7,000" },
      { name: "フォトクラフトキット", keywords: ["フォトクラフト", "手作り", "キット"], priceRange: "¥1,500〜¥5,000" }
    );
  } else if (memoryAnswer.includes("プロに頼む") || memoryAnswer.includes("プロ")) {
    suggestions.push(
      { name: "フォトアルバム制作", keywords: ["フォトアルバム", "写真", "思い出"], priceRange: "¥3,000〜¥10,000" },
      { name: "プロフォトブック制作", keywords: ["プロ", "フォトブック", "写真集"], priceRange: "¥4,000〜¥12,000" },
      { name: "フォトブック・写真集", keywords: ["フォトブック", "写真集", "アルバム"], priceRange: "¥2,500〜¥8,000" }
    );
  } else {
    // デフォルト：バランスの取れた提案
    suggestions.push(
      { name: "フォトアルバム制作", keywords: ["フォトアルバム", "写真", "思い出"], priceRange: "¥3,000〜¥10,000" },
      { name: "デジタルフォトフレーム", keywords: ["デジタルフォトフレーム", "写真", "デジタル"], priceRange: "¥5,000〜¥15,000" },
      { name: "手作りアルバムキット", keywords: ["手作り", "アルバム", "キット"], priceRange: "¥2,000〜¥6,000" }
    );
  }

  return suggestions;
}

// おうち時間を楽しむアイテムの提案生成関数
export function generateHomeTimeSuggestions(homeTimeAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  // ユーザーの回答に基づいてサブカテゴリを提案
  if (homeTimeAnswer.includes("リラックスグッズ") || homeTimeAnswer.includes("リラックス") || homeTimeAnswer.includes("ブランケット")) {
    suggestions.push(
      { name: "リラックスブランケット", keywords: ["ブランケット", "リラックス", "おうち時間"], priceRange: "¥3,000〜¥8,000" },
      { name: "抱き枕・クッション", keywords: ["抱き枕", "クッション", "リラックス"], priceRange: "¥2,500〜¥6,000" },
      { name: "アロマ・香りアイテム", keywords: ["アロマ", "香り", "リラックス"], priceRange: "¥2,000〜¥5,000" }
    );
  } else if (homeTimeAnswer.includes("実用的なグッズ") || homeTimeAnswer.includes("加湿器") || homeTimeAnswer.includes("空気清浄機")) {
    suggestions.push(
      { name: "加湿器・空気清浄機", keywords: ["加湿器", "空気清浄機", "健康"], priceRange: "¥4,000〜¥12,000" },
      { name: "空気清浄機", keywords: ["空気清浄機", "健康", "空気"], priceRange: "¥5,000〜¥15,000" },
      { name: "加湿器", keywords: ["加湿器", "湿度", "健康"], priceRange: "¥3,000〜¥8,000" }
    );
  } else if (homeTimeAnswer.includes("インテリアグッズ") || homeTimeAnswer.includes("インテリア") || homeTimeAnswer.includes("小物")) {
    suggestions.push(
      { name: "インテリア小物", keywords: ["インテリア", "小物", "装飾"], priceRange: "¥2,000〜¥6,000" },
      { name: "照明・ライト", keywords: ["照明", "ライト", "インテリア"], priceRange: "¥3,000〜¥8,000" },
      { name: "収納・整理用品", keywords: ["収納", "整理", "インテリア"], priceRange: "¥2,500〜¥7,000" }
    );
  } else {
    // デフォルト：バランスの取れた提案
    suggestions.push(
      { name: "リラックスブランケット", keywords: ["ブランケット", "リラックス", "おうち時間"], priceRange: "¥3,000〜¥8,000" },
      { name: "加湿器・空気清浄機", keywords: ["加湿器", "空気清浄機", "健康"], priceRange: "¥4,000〜¥12,000" },
      { name: "インテリア小物", keywords: ["インテリア", "小物", "装飾"], priceRange: "¥2,000〜¥6,000" }
    );
  }

  return suggestions;
}

// カップル向けギフトの提案生成関数
export function generateCoupleSuggestions(category: string, answers: Record<string, string>): GiftItem[] {
  const suggestions: GiftItem[] = [];
  
  switch (category) {
    case "実用派タイプ":
      const practicalItemAnswer = answers.question_0 || "";
      const practicalUseAnswer = answers.question_1 || "";
      const practicalStyleAnswer = answers.question_2 || "";
      const practicalBudgetAnswer = answers.question_4 || "";
      
      // アイテムタイプに基づく分岐
      if (practicalItemAnswer.includes("時計・アクセサリー")) {
        const baseProducts = [
          { name: "シンプルウォッチ", keywords: ["時計", "シンプル", "実用的", "カップル"] },
          { name: "上質なアクセサリー", keywords: ["アクセサリー", "上質", "実用的", "カップル"] },
          { name: "ペアウォッチ", keywords: ["ペアウォッチ", "時計", "実用的", "カップル"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, practicalBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(practicalBudgetAnswer, "¥5,000〜¥15,000")
          });
        });
      } else if (practicalItemAnswer.includes("バッグ・財布")) {
        const baseProducts = [
          { name: "上質な財布", keywords: ["財布", "上質", "実用的", "カップル"] },
          { name: "シンプルなバッグ", keywords: ["バッグ", "シンプル", "実用的", "カップル"] },
          { name: "名刺入れ", keywords: ["名刺入れ", "実用的", "カップル"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, practicalBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(practicalBudgetAnswer, "¥3,000〜¥12,000")
          });
        });
      } else if (practicalItemAnswer.includes("デジタルガジェット")) {
        const baseProducts = [
          { name: "スマートウォッチ", keywords: ["スマートウォッチ", "デジタル", "実用的", "カップル"] },
          { name: "ワイヤレスイヤホン", keywords: ["イヤホン", "ワイヤレス", "実用的", "カップル"] },
          { name: "モバイルバッテリー", keywords: ["バッテリー", "モバイル", "実用的", "カップル"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, practicalBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(practicalBudgetAnswer, "¥4,000〜¥20,000")
          });
        });
      } else {
        // デフォルト：バランスの取れた提案
        const baseProducts = [
          { name: "シンプルウォッチ", keywords: ["時計", "シンプル", "実用的", "カップル"] },
          { name: "上質な財布", keywords: ["財布", "上質", "実用的", "カップル"] },
          { name: "スマートウォッチ", keywords: ["スマートウォッチ", "デジタル", "実用的", "カップル"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, practicalBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(practicalBudgetAnswer, "¥5,000〜¥15,000")
          });
        });
      }
      break;
      
    case "趣味・共感タイプ":
      const hobbyInterestAnswer = answers.question_0 || "";
      const hobbyExperienceAnswer = answers.question_1 || "";
      const hobbyMessageAnswer = answers.question_2 || "";
      const hobbyBudgetAnswer = answers.question_4 || "";
      
      // 趣味に基づく分岐
      if (hobbyInterestAnswer.includes("音楽・映画")) {
        const baseProducts = [
          { name: "高音質イヤホン", keywords: ["イヤホン", "音楽", "高音質", "カップル"] },
          { name: "映画鑑賞セット", keywords: ["映画", "鑑賞", "セット", "カップル"] },
          { name: "音楽関連グッズ", keywords: ["音楽", "グッズ", "カップル"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, hobbyBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(hobbyBudgetAnswer, "¥3,000〜¥12,000")
          });
        });
      } else if (hobbyInterestAnswer.includes("スポーツ・アウトドア")) {
        const baseProducts = [
          { name: "スポーツ用品", keywords: ["スポーツ", "用品", "カップル"] },
          { name: "アウトドアグッズ", keywords: ["アウトドア", "グッズ", "カップル"] },
          { name: "フィットネスアイテム", keywords: ["フィットネス", "アイテム", "カップル"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, hobbyBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(hobbyBudgetAnswer, "¥4,000〜¥15,000")
          });
        });
      } else if (hobbyInterestAnswer.includes("読書・学習")) {
        const baseProducts = [
          { name: "読書関連グッズ", keywords: ["読書", "グッズ", "カップル"] },
          { name: "学習用品セット", keywords: ["学習", "用品", "セット", "カップル"] },
          { name: "文房具セット", keywords: ["文房具", "セット", "カップル"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, hobbyBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(hobbyBudgetAnswer, "¥2,000〜¥8,000")
          });
        });
      } else if (hobbyInterestAnswer.includes("アート・クリエイティブ")) {
        const baseProducts = [
          { name: "アート用品セット", keywords: ["アート", "用品", "セット", "カップル"] },
          { name: "クリエイティブグッズ", keywords: ["クリエイティブ", "グッズ", "カップル"] },
          { name: "手作りキット", keywords: ["手作り", "キット", "カップル"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, hobbyBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(hobbyBudgetAnswer, "¥3,000〜¥10,000")
          });
        });
      } else {
        // デフォルト：バランスの取れた提案
        const baseProducts = [
          { name: "高音質イヤホン", keywords: ["イヤホン", "音楽", "高音質", "カップル"] },
          { name: "スポーツ用品", keywords: ["スポーツ", "用品", "カップル"] },
          { name: "読書関連グッズ", keywords: ["読書", "グッズ", "カップル"] }
        ];
        
        baseProducts.forEach(product => {
          suggestions.push({
            name: getProductNameByBudget(product.name, hobbyBudgetAnswer),
            keywords: product.keywords,
            priceRange: getPriceRangeByBudget(hobbyBudgetAnswer, "¥3,000〜¥12,000")
          });
        });
      }
      break;
  }
  
  return suggestions;
}

// 季節限定・ご当地ギフトの提案生成関数
export function generateSeasonalSuggestions(seasonalAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  // ユーザーの回答に基づいてサブカテゴリを提案
  if (seasonalAnswer.includes("季節限定食品") || seasonalAnswer.includes("季節限定") || seasonalAnswer.includes("お菓子")) {
    suggestions.push(
      { name: "季節限定お菓子", keywords: ["季節限定", "お菓子", "スイーツ"], priceRange: "¥2,000〜¥5,000" },
      { name: "季節の和菓子", keywords: ["季節", "和菓子", "限定"], priceRange: "¥2,500〜¥6,000" },
      { name: "季節の洋菓子", keywords: ["季節", "洋菓子", "限定"], priceRange: "¥2,000〜¥5,000" }
    );
  } else if (seasonalAnswer.includes("ご当地グルメ") || seasonalAnswer.includes("ご当地") || seasonalAnswer.includes("特産品")) {
    suggestions.push(
      { name: "ご当地特産品", keywords: ["ご当地", "特産品", "地方"], priceRange: "¥3,000〜¥8,000" },
      { name: "地方名産品", keywords: ["地方", "名産品", "特産品"], priceRange: "¥2,500〜¥7,000" },
      { name: "ご当地グルメ", keywords: ["ご当地", "グルメ", "名産品"], priceRange: "¥2,000〜¥6,000" }
    );
  } else if (seasonalAnswer.includes("伝統工芸品")) {
    suggestions.push(
      { name: "有田焼セット", keywords: ["有田焼", "陶器", "伝統工芸"], priceRange: "¥4,000〜¥8,000" },
      { name: "輪島塗セット", keywords: ["輪島塗", "漆器", "伝統工芸"], priceRange: "¥5,000〜¥12,000" },
      { name: "南部鉄器セット", keywords: ["南部鉄器", "鉄器", "伝統工芸"], priceRange: "¥3,500〜¥7,000" }
    );
  } else if (seasonalAnswer.includes("季節の花・植物") || seasonalAnswer.includes("花") || seasonalAnswer.includes("植物")) {
    suggestions.push(
      { name: "季節の花ギフト", keywords: ["季節", "花", "植物"], priceRange: "¥3,000〜¥8,000" },
      { name: "観葉植物ギフト", keywords: ["観葉植物", "グリーン", "インテリア"], priceRange: "¥2,500〜¥6,000" },
      { name: "季節の花アレンジ", keywords: ["季節", "花", "アレンジ"], priceRange: "¥2,000〜¥5,000" }
    );
  } else {
    // デフォルト：バランスの取れた提案
    suggestions.push(
      { name: "季節限定お菓子", keywords: ["季節限定", "お菓子", "スイーツ"], priceRange: "¥2,000〜¥5,000" },
      { name: "ご当地特産品", keywords: ["ご当地", "特産品", "地方"], priceRange: "¥3,000〜¥8,000" },
      { name: "期間限定雑貨", keywords: ["期間限定", "雑貨", "小物"], priceRange: "¥2,500〜¥6,000" }
    );
  }

  return suggestions;
}

// 美容・スキンケアの組み合わせ提案ロジック
export function generateBeautySuggestions(concern: string, priority: string, habit: string, budget: string): GiftItem[] {
  const suggestions: GiftItem[] = [];
  
  // 1. 悩み（concern）に基づく提案
  if (concern.includes("乾燥")) {
    suggestions.push(
      { name: "保湿スキンケアセット", keywords: ["保湿", "スキンケア", "乾燥対策"], priceRange: "¥3,000〜¥8,000" }
    );
  } else if (concern.includes("シミ") || concern.includes("くすみ")) {
    suggestions.push(
      { name: "美白・エイジングケアセット", keywords: ["美白", "シミ", "くすみ", "エイジング"], priceRange: "¥5,000〜¥15,000" }
    );
  } else if (concern.includes("ハリ") || concern.includes("たるみ")) {
    suggestions.push(
      { name: "美顔器・リフトアップセット", keywords: ["美顔器", "リフトアップ", "ハリ", "たるみ"], priceRange: "¥8,000〜¥25,000" }
    );
  } else if (concern.includes("髪")) {
    suggestions.push(
      giftHaircareItems[0], // 高級シャンプー・トリートメントセット
      giftHaircareItems[1]  // ヘアオイル・セラムセット
    );
  }
  
  // 2. 重視すること（priority）に基づく提案
  if (priority.includes("簡単")) {
    suggestions.push(
      { name: "オールインワンケアセット", keywords: ["オールインワン", "簡単", "時短"], priceRange: "¥2,000〜¥6,000" }
    );
  } else if (priority.includes("効果")) {
    suggestions.push(
      { name: "高濃度美容液セット", keywords: ["高濃度", "美容液", "効果", "集中ケア"], priceRange: "¥6,000〜¥18,000" }
    );
  } else if (priority.includes("低刺激")) {
    suggestions.push(
      { name: "敏感肌用スキンケアセット", keywords: ["敏感肌", "低刺激", "無添加"], priceRange: "¥3,000〜¥8,000" }
    );
  }
  
  // 3. 使用習慣（habit）に基づく提案
  if (habit.includes("美顔器")) {
    suggestions.push(
      { name: "美顔器・美容機器セット", keywords: ["美顔器", "美容機器", "エステ"], priceRange: "¥8,000〜¥25,000" }
    );
  } else if (habit.includes("ドライヤー")) {
    suggestions.push(
      giftHaircareItems[3] // ヘアスタイリングツールセット
    );
  } else if (habit.includes("ボディケア")) {
    suggestions.push(
      { name: "バスソルト・入浴剤セット", keywords: ["バスソルト", "入浴剤", "リラックス"], priceRange: "¥3,000〜¥8,000" }
    );
  }
  
  // 4. 予算（budget）に基づく調整
  if (budget.includes("1万円以内")) {
    // 高価格帯の商品を除外
    suggestions.splice(suggestions.findIndex(item => item.priceRange.includes("¥15,000") || item.priceRange.includes("¥25,000")), 1);
  } else if (budget.includes("効果を重視")) {
    // 高価格帯の商品を優先
    suggestions.push(
      { name: "高級美顔器セット", keywords: ["高級", "美顔器", "エステ級"], priceRange: "¥15,000〜¥30,000" }
    );
  }
  
  // 5. 不足分をデフォルトで補完
  if (suggestions.length < 3) {
    const defaultItems = [
      { name: "高級スキンケアセット", keywords: ["スキンケア", "美容", "化粧品"], priceRange: "¥4,000〜¥12,000" },
      { name: "ヘアケア・ドライヤーセット", keywords: ["ヘアケア", "ドライヤー", "シャンプー"], priceRange: "¥4,000〜¥12,000" },
      { name: "バス・ボディケアセット", keywords: ["バス", "ボディケア", "リラックス"], priceRange: "¥3,000〜¥8,000" }
    ];
    
    for (const item of defaultItems) {
      if (suggestions.length >= 3) break;
      if (!suggestions.some(s => s.name === item.name)) {
        suggestions.push(item);
      }
    }
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

// 義母向けサブカテゴリ提案関数

// 上質スキンケア
export function generateSkincareSuggestions(skincareAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  if (skincareAnswer.includes("化粧水") || skincareAnswer.includes("スキンケア")) {
    suggestions.push(
      { name: "高級スキンケアセット", keywords: ["高級", "スキンケア", "化粧水", "乳液"], priceRange: "¥5,000〜¥12,000" },
      { name: "ブランドコスメセット", keywords: ["ブランド", "コスメ", "上質", "スキンケア"], priceRange: "¥6,000〜¥15,000" },
      { name: "香り付きスキンケア", keywords: ["香り", "スキンケア", "上品", "フローラル"], priceRange: "¥4,000〜¥10,000" }
    );
  } else if (skincareAnswer.includes("ハンドクリーム") || skincareAnswer.includes("ボディケア")) {
    suggestions.push(
      { name: "高級ハンドクリームセット", keywords: ["ハンドクリーム", "高級", "香り", "保湿"], priceRange: "¥3,000〜¥8,000" },
      { name: "ボディケアセット", keywords: ["ボディケア", "保湿", "香り", "上質"], priceRange: "¥4,000〜¥10,000" },
      { name: "アロマボディオイル", keywords: ["アロマ", "ボディオイル", "香り", "リラックス"], priceRange: "¥3,500〜¥8,000" }
    );
  } else {
    suggestions.push(
      { name: "高級スキンケアセット", keywords: ["高級", "スキンケア", "上質", "ギフト"], priceRange: "¥5,000〜¥12,000" },
      { name: "香り付きスキンケア", keywords: ["香り", "スキンケア", "上品", "フローラル"], priceRange: "¥4,000〜¥10,000" },
      { name: "高級ハンドクリームセット", keywords: ["ハンドクリーム", "高級", "香り", "保湿"], priceRange: "¥3,000〜¥8,000" }
    );
  }

  return suggestions;
}

// 香りギフト
export function generateFragranceSuggestions(fragranceAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  if (fragranceAnswer.includes("フローラル")) {
    suggestions.push(
      { name: "フローラルハンドクリーム", keywords: ["フローラル", "ハンドクリーム", "香り", "上品"], priceRange: "¥2,500〜¥6,000" },
      { name: "花の香りアロマキャンドル", keywords: ["フローラル", "アロマキャンドル", "香り", "癒し"], priceRange: "¥3,000〜¥8,000" },
      { name: "フローラル入浴剤セット", keywords: ["フローラル", "入浴剤", "香り", "リラックス"], priceRange: "¥2,000〜¥5,000" }
    );
  } else if (fragranceAnswer.includes("フレッシュ")) {
    suggestions.push(
      { name: "フレッシュハンドクリーム", keywords: ["フレッシュ", "ハンドクリーム", "香り", "清潔感"], priceRange: "¥2,500〜¥6,000" },
      { name: "シトラスアロマオイル", keywords: ["シトラス", "アロマオイル", "フレッシュ", "香り"], priceRange: "¥3,000〜¥7,000" },
      { name: "フレッシュ入浴剤", keywords: ["フレッシュ", "入浴剤", "香り", "清潔感"], priceRange: "¥2,000〜¥5,000" }
    );
  } else {
    suggestions.push(
      { name: "上品な香りハンドクリーム", keywords: ["香り", "ハンドクリーム", "上品", "ギフト"], priceRange: "¥2,500〜¥6,000" },
      { name: "アロマキャンドルセット", keywords: ["アロマキャンドル", "香り", "癒し", "上質"], priceRange: "¥3,000〜¥8,000" },
      { name: "香り付き入浴剤", keywords: ["入浴剤", "香り", "リラックス", "上品"], priceRange: "¥2,000〜¥5,000" }
    );
  }

  return suggestions;
}

// 高級タオル・寝具
export function generateTowelSuggestions(towelAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  if (towelAnswer.includes("やわらかくてふわふわ")) {
    suggestions.push(
      { name: "今治タオルセット", keywords: ["今治タオル", "やわらか", "高級", "上質"], priceRange: "¥4,000〜¥10,000" },
      { name: "オーガニックコットンタオル", keywords: ["オーガニック", "コットン", "やわらか", "自然"], priceRange: "¥3,500〜¥8,000" },
      { name: "高級バスタオルセット", keywords: ["バスタオル", "高級", "やわらか", "吸水"], priceRange: "¥5,000〜¥12,000" }
    );
  } else if (towelAnswer.includes("しっかりとした質感")) {
    suggestions.push(
      { name: "高級タオルセット", keywords: ["高級タオル", "しっかり", "質感", "上質"], priceRange: "¥4,000〜¥10,000" },
      { name: "綿100%タオル", keywords: ["綿100%", "タオル", "しっかり", "吸水"], priceRange: "¥3,000〜¥8,000" },
      { name: "寝具セット", keywords: ["寝具", "シーツ", "枕カバー", "上質"], priceRange: "¥6,000〜¥15,000" }
    );
  } else {
    suggestions.push(
      { name: "今治タオルセット", keywords: ["今治タオル", "高級", "上質", "ギフト"], priceRange: "¥4,000〜¥10,000" },
      { name: "オーガニックコットンタオル", keywords: ["オーガニック", "コットン", "自然", "上質"], priceRange: "¥3,500〜¥8,000" },
      { name: "高級バスタオルセット", keywords: ["バスタオル", "高級", "吸水", "上質"], priceRange: "¥5,000〜¥12,000" }
    );
  }

  return suggestions;
}

// コンパクト美容家電
export function generateBeautyDeviceSuggestions(beautyDeviceAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  if (beautyDeviceAnswer.includes("スキンケア")) {
    suggestions.push(
      { name: "美顔ローラー", keywords: ["美顔ローラー", "スキンケア", "コンパクト", "リフトアップ"], priceRange: "¥6,000〜¥12,000" },
      { name: "ナノスチーマー", keywords: ["ナノスチーマー", "スキンケア", "コンパクト", "保湿"], priceRange: "¥8,000〜¥15,000" },
      { name: "美顔器セット", keywords: ["美顔器", "スキンケア", "コンパクト", "エイジングケア"], priceRange: "¥10,000〜¥20,000" }
    );
  } else if (beautyDeviceAnswer.includes("ボディケア")) {
    suggestions.push(
      { name: "ボディマッサージャー", keywords: ["ボディマッサージャー", "ボディケア", "コンパクト", "リラックス"], priceRange: "¥7,000〜¥15,000" },
      { name: "美顔ローラー", keywords: ["美顔ローラー", "ボディケア", "コンパクト", "リフトアップ"], priceRange: "¥6,000〜¥12,000" },
      { name: "コンパクト美顔器", keywords: ["美顔器", "ボディケア", "コンパクト", "エイジングケア"], priceRange: "¥8,000〜¥18,000" }
    );
  } else {
    suggestions.push(
      { name: "美顔ローラー", keywords: ["美顔ローラー", "コンパクト", "リフトアップ", "ギフト"], priceRange: "¥6,000〜¥12,000" },
      { name: "ナノスチーマー", keywords: ["ナノスチーマー", "コンパクト", "保湿", "スキンケア"], priceRange: "¥8,000〜¥15,000" },
      { name: "コンパクト美顔器", keywords: ["美顔器", "コンパクト", "エイジングケア", "上質"], priceRange: "¥8,000〜¥18,000" }
    );
  }

  return suggestions;
}

// 華やかスイーツギフト
export function generateSweetsSuggestions(sweetsAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  if (sweetsAnswer.includes("和菓子")) {
    suggestions.push(
      { name: "高級和菓子セット", keywords: ["和菓子", "高級", "華やか", "ギフト"], priceRange: "¥3,000〜¥8,000" },
      { name: "季節の和菓子", keywords: ["季節", "和菓子", "華やか", "限定"], priceRange: "¥2,500〜¥6,000" },
      { name: "上品な和菓子ギフト", keywords: ["和菓子", "上品", "華やか", "ギフトボックス"], priceRange: "¥4,000〜¥10,000" }
    );
  } else if (sweetsAnswer.includes("洋菓子")) {
    suggestions.push(
      { name: "高級洋菓子セット", keywords: ["洋菓子", "高級", "華やか", "ギフト"], priceRange: "¥3,000〜¥8,000" },
      { name: "季節の洋菓子", keywords: ["季節", "洋菓子", "華やか", "限定"], priceRange: "¥2,500〜¥6,000" },
      { name: "上品な洋菓子ギフト", keywords: ["洋菓子", "上品", "華やか", "ギフトボックス"], priceRange: "¥4,000〜¥10,000" }
    );
  } else {
    suggestions.push(
      { name: "高級スイーツセット", keywords: ["スイーツ", "高級", "華やか", "ギフト"], priceRange: "¥3,000〜¥8,000" },
      { name: "季節限定スイーツ", keywords: ["季節限定", "スイーツ", "華やか", "限定"], priceRange: "¥2,500〜¥6,000" },
      { name: "上品なスイーツギフト", keywords: ["スイーツ", "上品", "華やか", "ギフトボックス"], priceRange: "¥4,000〜¥10,000" }
    );
  }

  return suggestions;
}

// キッチン雑貨・調理器具
export function generateKitchenSuggestions(kitchenAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  if (kitchenAnswer.includes("和食") || kitchenAnswer.includes("和風")) {
    suggestions.push(
      { name: "高級和食器セット", keywords: ["和食器", "高級", "上質", "ギフト"], priceRange: "¥5,000〜¥15,000" },
      { name: "上品な箸セット", keywords: ["箸", "上品", "高級", "和食"], priceRange: "¥3,000〜¥8,000" },
      { name: "和食調理器具", keywords: ["調理器具", "和食", "高級", "実用的"], priceRange: "¥4,000〜¥12,000" }
    );
  } else if (kitchenAnswer.includes("洋食") || kitchenAnswer.includes("洋風")) {
    suggestions.push(
      { name: "高級洋食器セット", keywords: ["洋食器", "高級", "上質", "ギフト"], priceRange: "¥5,000〜¥15,000" },
      { name: "上品なカトラリー", keywords: ["カトラリー", "上品", "高級", "洋食"], priceRange: "¥4,000〜¥10,000" },
      { name: "洋食調理器具", keywords: ["調理器具", "洋食", "高級", "実用的"], priceRange: "¥5,000〜¥15,000" }
    );
  } else {
    suggestions.push(
      { name: "高級食器セット", keywords: ["食器", "高級", "上質", "ギフト"], priceRange: "¥5,000〜¥15,000" },
      { name: "上品なカトラリー", keywords: ["カトラリー", "上品", "高級", "実用的"], priceRange: "¥4,000〜¥10,000" },
      { name: "高級調理器具", keywords: ["調理器具", "高級", "実用的", "上質"], priceRange: "¥5,000〜¥15,000" }
    );
  }

  return suggestions;
}

// アロマ・癒しグッズ
export function generateAromaSuggestions(aromaAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  if (aromaAnswer.includes("リラックスタイム") || aromaAnswer.includes("リラックス")) {
    suggestions.push(
      { name: "アロマディフューザー", keywords: ["アロマディフューザー", "リラックス", "香り", "癒し"], priceRange: "¥3,000〜¥8,000" },
      { name: "アロマキャンドルセット", keywords: ["アロマキャンドル", "リラックス", "香り", "癒し"], priceRange: "¥2,500〜¥6,000" },
      { name: "リラックスアロマオイル", keywords: ["アロマオイル", "リラックス", "香り", "癒し"], priceRange: "¥3,000〜¥7,000" }
    );
  } else if (aromaAnswer.includes("お風呂タイム") || aromaAnswer.includes("お風呂")) {
    suggestions.push(
      { name: "アロマ入浴剤セット", keywords: ["入浴剤", "アロマ", "お風呂", "癒し"], priceRange: "¥2,000〜¥5,000" },
      { name: "バスソルトセット", keywords: ["バスソルト", "お風呂", "癒し", "香り"], priceRange: "¥2,500〜¥6,000" },
      { name: "お風呂用アロマオイル", keywords: ["アロマオイル", "お風呂", "癒し", "香り"], priceRange: "¥3,000〜¥7,000" }
    );
  } else {
    suggestions.push(
      { name: "アロマディフューザー", keywords: ["アロマディフューザー", "香り", "癒し", "上質"], priceRange: "¥3,000〜¥8,000" },
      { name: "アロマキャンドルセット", keywords: ["アロマキャンドル", "香り", "癒し", "上品"], priceRange: "¥2,500〜¥6,000" },
      { name: "アロマ入浴剤セット", keywords: ["入浴剤", "アロマ", "癒し", "香り"], priceRange: "¥2,000〜¥5,000" }
    );
  }

  return suggestions;
}

// ブランド小物
export function generateBrandSuggestions(brandAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  if (brandAnswer.includes("上品でクラシック") || brandAnswer.includes("クラシック")) {
    suggestions.push(
      { name: "クラシックエプロン", keywords: ["エプロン", "クラシック", "上品", "ブランド"], priceRange: "¥4,000〜¥10,000" },
      { name: "上品なハンカチセット", keywords: ["ハンカチ", "上品", "クラシック", "ブランド"], priceRange: "¥3,000〜¥8,000" },
      { name: "クラシックポーチ", keywords: ["ポーチ", "クラシック", "上品", "ブランド"], priceRange: "¥4,000〜¥12,000" }
    );
  } else if (brandAnswer.includes("モダンでおしゃれ") || brandAnswer.includes("モダン")) {
    suggestions.push(
      { name: "モダンエプロン", keywords: ["エプロン", "モダン", "おしゃれ", "ブランド"], priceRange: "¥4,000〜¥10,000" },
      { name: "おしゃれなハンカチセット", keywords: ["ハンカチ", "おしゃれ", "モダン", "ブランド"], priceRange: "¥3,000〜¥8,000" },
      { name: "モダンポーチ", keywords: ["ポーチ", "モダン", "おしゃれ", "ブランド"], priceRange: "¥4,000〜¥12,000" }
    );
  } else {
    suggestions.push(
      { name: "ブランドエプロン", keywords: ["エプロン", "ブランド", "上質", "ギフト"], priceRange: "¥4,000〜¥10,000" },
      { name: "ブランドハンカチセット", keywords: ["ハンカチ", "ブランド", "上質", "ギフト"], priceRange: "¥3,000〜¥8,000" },
      { name: "ブランドポーチ", keywords: ["ポーチ", "ブランド", "上質", "ギフト"], priceRange: "¥4,000〜¥12,000" }
    );
  }

  return suggestions;
}

// 上品なお茶・紅茶ギフト
export function generateElegantTeaSuggestions(teaAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  if (teaAnswer.includes("日本茶")) {
    suggestions.push(
      { name: "高級日本茶セット", keywords: ["日本茶", "高級", "上品", "ギフト"], priceRange: "¥3,000〜¥8,000" },
      { name: "上品な煎茶ギフト", keywords: ["煎茶", "上品", "日本茶", "ギフト"], priceRange: "¥2,500〜¥6,000" },
      { name: "高級抹茶セット", keywords: ["抹茶", "高級", "上品", "日本茶"], priceRange: "¥4,000〜¥10,000" }
    );
  } else if (teaAnswer.includes("紅茶")) {
    suggestions.push(
      { name: "高級紅茶セット", keywords: ["紅茶", "高級", "上品", "ギフト"], priceRange: "¥3,000〜¥8,000" },
      { name: "上品なアールグレイ", keywords: ["アールグレイ", "上品", "紅茶", "ギフト"], priceRange: "¥2,500〜¥6,000" },
      { name: "高級ダージリンティー", keywords: ["ダージリンティー", "高級", "紅茶", "上品"], priceRange: "¥4,000〜¥10,000" }
    );
  } else {
    suggestions.push(
      { name: "高級お茶セット", keywords: ["お茶", "高級", "上品", "ギフト"], priceRange: "¥3,000〜¥8,000" },
      { name: "上品な茶ギフト", keywords: ["茶", "上品", "ギフト", "高級"], priceRange: "¥2,500〜¥6,000" },
      { name: "高級茶葉ギフト", keywords: ["茶葉", "高級", "上品", "ギフト"], priceRange: "¥4,000〜¥10,000" }
    );
  }

  return suggestions;
}

// 季節の花＆プリザーブドギフト
export function generateFlowerGiftSuggestions(flowerGiftAnswer: string): GiftItem[] {
  const suggestions: GiftItem[] = [];

  if (flowerGiftAnswer.includes("生花") || flowerGiftAnswer.includes("フラワーアレンジ")) {
    suggestions.push(
      { name: "季節の生花アレンジメント", keywords: ["生花", "アレンジメント", "季節", "華やか"], priceRange: "¥3,000〜¥8,000" },
      { name: "上品な生花ブーケ", keywords: ["生花", "ブーケ", "上品", "華やか"], priceRange: "¥4,000〜¥10,000" },
      { name: "季節の生花ギフト", keywords: ["生花", "季節", "ギフト", "華やか"], priceRange: "¥3,000〜¥8,000" }
    );
  } else if (flowerGiftAnswer.includes("プリザーブドフラワー") || flowerGiftAnswer.includes("プリザーブド")) {
    suggestions.push(
      { name: "プリザーブドフラワーアレンジ", keywords: ["プリザーブドフラワー", "アレンジ", "長持ち", "華やか"], priceRange: "¥4,000〜¥12,000" },
      { name: "上品なプリザーブドフラワー", keywords: ["プリザーブドフラワー", "上品", "長持ち", "ギフト"], priceRange: "¥5,000〜¥15,000" },
      { name: "プリザーブドフラワーギフト", keywords: ["プリザーブドフラワー", "ギフト", "長持ち", "華やか"], priceRange: "¥4,000〜¥12,000" }
    );
  } else {
    suggestions.push(
      { name: "季節の花ギフト", keywords: ["花", "季節", "ギフト", "華やか"], priceRange: "¥3,000〜¥8,000" },
      { name: "プリザーブドフラワーアレンジ", keywords: ["プリザーブドフラワー", "アレンジ", "長持ち", "華やか"], priceRange: "¥4,000〜¥12,000" },
      { name: "上品な花ギフト", keywords: ["花", "上品", "ギフト", "華やか"], priceRange: "¥4,000〜¥10,000" }
    );
  }

  return suggestions;
}

// ===== 恋人向けカテゴリの提案ロジック =====

// ペアアクセサリーの提案生成
export function generateCoupleAccessorySuggestions(answers: Record<string, string>): GiftItem[] {
  const suggestions: GiftItem[] = [];
  const style = answers.question_0 || "";
  const accessoryType = answers.question_1 || "";
  const budget = answers.question_2 || "";

  // ファッションスタイルに基づく提案
  if (style.includes("シンプル・カジュアル")) {
    suggestions.push(
      { name: "シンプルペアウォッチ", keywords: ["ペアウォッチ", "シンプル", "カジュアル", "お揃い"], priceRange: "¥8,000〜¥15,000" },
      { name: "ミニマルペアリング", keywords: ["ペアリング", "ミニマル", "シンプル", "お揃い"], priceRange: "¥5,000〜¥12,000" },
      { name: "カジュアルペアブレスレット", keywords: ["ペアブレスレット", "カジュアル", "シンプル", "お揃い"], priceRange: "¥3,000〜¥8,000" }
    );
  } else if (style.includes("おしゃれ・トレンド")) {
    suggestions.push(
      { name: "トレンドペアウォッチ", keywords: ["ペアウォッチ", "トレンド", "おしゃれ", "お揃い"], priceRange: "¥12,000〜¥25,000" },
      { name: "ファッショナブルペアリング", keywords: ["ペアリング", "ファッション", "トレンド", "お揃い"], priceRange: "¥8,000〜¥18,000" },
      { name: "スタイリッシュペアネックレス", keywords: ["ペアネックレス", "スタイリッシュ", "おしゃれ", "お揃い"], priceRange: "¥6,000〜¥15,000" }
    );
  } else if (style.includes("上品・エレガント")) {
    suggestions.push(
      { name: "エレガントペアウォッチ", keywords: ["ペアウォッチ", "エレガント", "上品", "お揃い"], priceRange: "¥15,000〜¥30,000" },
      { name: "上品なペアリング", keywords: ["ペアリング", "上品", "エレガント", "お揃い"], priceRange: "¥10,000〜¥25,000" },
      { name: "クラシックペアピアス", keywords: ["ペアピアス", "クラシック", "上品", "お揃い"], priceRange: "¥8,000〜¥20,000" }
    );
  } else {
    // デフォルト提案
    suggestions.push(
      { name: "ベーシックペアウォッチ", keywords: ["ペアウォッチ", "ベーシック", "お揃い", "定番"], priceRange: "¥8,000〜¥20,000" },
      { name: "シンプルペアリング", keywords: ["ペアリング", "シンプル", "お揃い", "定番"], priceRange: "¥5,000〜¥15,000" },
      { name: "カジュアルペアブレスレット", keywords: ["ペアブレスレット", "カジュアル", "お揃い", "定番"], priceRange: "¥3,000〜¥10,000" }
    );
  }

  return suggestions.slice(0, 3);
}

// フラワーギフトの提案生成
export function generateCoupleFlowerSuggestions(answers: Record<string, string>): GiftItem[] {
  const suggestions: GiftItem[] = [];
  const color = answers.question_0 || "";
  const impression = answers.question_1 || "";
  const budget = answers.question_2 || "";

  // 花の色に基づく提案
  if (color.includes("ピンク系")) {
    suggestions.push(
      { name: "ピンクローズギフト", keywords: ["ピンクローズ", "ロマンチック", "ギフト", "花"], priceRange: "¥3,000〜¥8,000" },
      { name: "ピンクフラワーアレンジ", keywords: ["ピンク", "フラワーアレンジ", "可愛い", "ギフト"], priceRange: "¥4,000〜¥10,000" },
      { name: "ピンクプリザーブドフラワー", keywords: ["ピンク", "プリザーブドフラワー", "長持ち", "ギフト"], priceRange: "¥5,000〜¥12,000" }
    );
  } else if (color.includes("白系")) {
    suggestions.push(
      { name: "ホワイトローズギフト", keywords: ["ホワイトローズ", "上品", "ギフト", "花"], priceRange: "¥3,000〜¥8,000" },
      { name: "白いフラワーアレンジ", keywords: ["白", "フラワーアレンジ", "上品", "ギフト"], priceRange: "¥4,000〜¥10,000" },
      { name: "ホワイトプリザーブドフラワー", keywords: ["白", "プリザーブドフラワー", "上品", "ギフト"], priceRange: "¥5,000〜¥12,000" }
    );
  } else if (color.includes("赤系")) {
    suggestions.push(
      { name: "レッドローズギフト", keywords: ["レッドローズ", "情熱的", "ギフト", "花"], priceRange: "¥3,000〜¥8,000" },
      { name: "赤いフラワーアレンジ", keywords: ["赤", "フラワーアレンジ", "情熱的", "ギフト"], priceRange: "¥4,000〜¥10,000" },
      { name: "レッドプリザーブドフラワー", keywords: ["赤", "プリザーブドフラワー", "情熱的", "ギフト"], priceRange: "¥5,000〜¥12,000" }
    );
  } else {
    // デフォルト提案
    suggestions.push(
      { name: "ミックスフラワーギフト", keywords: ["ミックスフラワー", "カラフル", "ギフト", "花"], priceRange: "¥3,000〜¥8,000" },
      { name: "季節のフラワーアレンジ", keywords: ["季節", "フラワーアレンジ", "ギフト", "花"], priceRange: "¥4,000〜¥10,000" },
      { name: "プリザーブドフラワーギフト", keywords: ["プリザーブドフラワー", "長持ち", "ギフト", "花"], priceRange: "¥5,000〜¥12,000" }
    );
  }

  return suggestions.slice(0, 3);
}

// 恋人向け美容・スキンケアの提案生成
export function generateCoupleSkincareSuggestions(answers: Record<string, string>): GiftItem[] {
  const suggestions: GiftItem[] = [];
  const skincareStyle = answers.question_0 || "";
  const fragrance = answers.question_1 || "";
  const budget = answers.question_2 || "";

  // スキンケアスタイルに基づく提案
  if (skincareStyle.includes("シンプル")) {
    suggestions.push(
      { name: "シンプルスキンケアセット", keywords: ["スキンケア", "シンプル", "化粧水", "乳液"], priceRange: "¥5,000〜¥10,000" },
      { name: "ミニマル美容セット", keywords: ["美容", "ミニマル", "シンプル", "ケア"], priceRange: "¥4,000〜¥8,000" },
      { name: "ベーシックケアギフト", keywords: ["ケア", "ベーシック", "シンプル", "ギフト"], priceRange: "¥3,000〜¥7,000" }
    );
  } else if (skincareStyle.includes("平均的")) {
    suggestions.push(
      { name: "美容液付きスキンケアセット", keywords: ["スキンケア", "美容液", "セット", "ケア"], priceRange: "¥8,000〜¥15,000" },
      { name: "多機能美容セット", keywords: ["美容", "多機能", "セット", "ケア"], priceRange: "¥6,000〜¥12,000" },
      { name: "充実ケアギフト", keywords: ["ケア", "充実", "美容液", "ギフト"], priceRange: "¥5,000〜¥10,000" }
    );
  } else if (skincareStyle.includes("しっかり")) {
    suggestions.push(
      { name: "フルステップスキンケアセット", keywords: ["スキンケア", "フルステップ", "多段階", "ケア"], priceRange: "¥12,000〜¥25,000" },
      { name: "プレミアム美容セット", keywords: ["美容", "プレミアム", "高級", "セット"], priceRange: "¥10,000〜¥20,000" },
      { name: "贅沢ケアギフト", keywords: ["ケア", "贅沢", "高級", "ギフト"], priceRange: "¥8,000〜¥18,000" }
    );
  } else {
    // デフォルト提案
    suggestions.push(
      { name: "バランススキンケアセット", keywords: ["スキンケア", "バランス", "セット", "ケア"], priceRange: "¥6,000〜¥12,000" },
      { name: "人気美容セット", keywords: ["美容", "人気", "セット", "ケア"], priceRange: "¥5,000〜¥10,000" },
      { name: "定番ケアギフト", keywords: ["ケア", "定番", "ギフト", "美容"], priceRange: "¥4,000〜¥8,000" }
    );
  }

  return suggestions.slice(0, 3);
}

// 恋人向け体験ギフトの提案生成
export function generateCoupleExperienceSuggestions(answers: Record<string, string>): GiftItem[] {
  const suggestions: GiftItem[] = [];
  const experienceType = answers.question_0 || "";
  const together = answers.question_1 || "";
  const budget = answers.question_2 || "";

  // 体験タイプに基づく提案
  if (experienceType.includes("グルメ・レストラン")) {
    suggestions.push(
      { name: "高級レストランディナー", keywords: ["レストラン", "ディナー", "グルメ", "体験"], priceRange: "¥15,000〜¥30,000" },
      { name: "シェフ特製コース", keywords: ["シェフ", "コース", "グルメ", "体験"], priceRange: "¥12,000〜¥25,000" },
      { name: "特別ディナー体験", keywords: ["ディナー", "特別", "グルメ", "体験"], priceRange: "¥10,000〜¥20,000" }
    );
  } else if (experienceType.includes("旅行・宿泊")) {
    suggestions.push(
      { name: "温泉宿泊プラン", keywords: ["温泉", "宿泊", "旅行", "体験"], priceRange: "¥20,000〜¥40,000" },
      { name: "リゾートホテル宿泊", keywords: ["リゾート", "ホテル", "宿泊", "体験"], priceRange: "¥25,000〜¥50,000" },
      { name: "特別宿泊体験", keywords: ["宿泊", "特別", "旅行", "体験"], priceRange: "¥15,000〜¥30,000" }
    );
  } else if (experienceType.includes("エステ・スパ")) {
    suggestions.push(
      { name: "高級エステ体験", keywords: ["エステ", "高級", "リラックス", "体験"], priceRange: "¥8,000〜¥20,000" },
      { name: "スパトリートメント", keywords: ["スパ", "トリートメント", "リラックス", "体験"], priceRange: "¥10,000〜¥25,000" },
      { name: "癒しエステ体験", keywords: ["エステ", "癒し", "リラックス", "体験"], priceRange: "¥6,000〜¥15,000" }
    );
  } else {
    // デフォルト提案
    suggestions.push(
      { name: "特別体験ギフト", keywords: ["体験", "特別", "ギフト", "思い出"], priceRange: "¥10,000〜¥25,000" },
      { name: "プレミアム体験", keywords: ["体験", "プレミアム", "特別", "ギフト"], priceRange: "¥8,000〜¥20,000" },
      { name: "思い出体験ギフト", keywords: ["体験", "思い出", "ギフト", "特別"], priceRange: "¥6,000〜¥15,000" }
    );
  }

  return suggestions.slice(0, 3);
}

// 恋人向けおうち時間ギフトの提案生成
export function generateCoupleHomeTimeSuggestions(answers: Record<string, string>): GiftItem[] {
  const suggestions: GiftItem[] = [];
  const drink = answers.question_0 || "";
  const style = answers.question_1 || "";
  const budget = answers.question_2 || "";

  // 飲み物の好みに基づく提案
  if (drink.includes("コーヒー")) {
    suggestions.push(
      { name: "高級コーヒーセット", keywords: ["コーヒー", "高級", "セット", "おうち時間"], priceRange: "¥3,000〜¥8,000" },
      { name: "ペアコーヒーマグ", keywords: ["コーヒー", "ペア", "マグ", "お揃い"], priceRange: "¥2,000〜¥5,000" },
      { name: "コーヒー器具セット", keywords: ["コーヒー", "器具", "セット", "おうち時間"], priceRange: "¥4,000〜¥10,000" }
    );
  } else if (drink.includes("お茶")) {
    suggestions.push(
      { name: "高級お茶セット", keywords: ["お茶", "高級", "セット", "おうち時間"], priceRange: "¥3,000〜¥8,000" },
      { name: "ペアティーカップ", keywords: ["お茶", "ペア", "カップ", "お揃い"], priceRange: "¥2,000〜¥5,000" },
      { name: "茶器セット", keywords: ["お茶", "茶器", "セット", "おうち時間"], priceRange: "¥4,000〜¥10,000" }
    );
  } else {
    // デフォルト提案
    suggestions.push(
      { name: "おうち時間ギフトセット", keywords: ["おうち時間", "ギフト", "セット", "リラックス"], priceRange: "¥3,000〜¥8,000" },
      { name: "ペアマグセット", keywords: ["ペア", "マグ", "セット", "お揃い"], priceRange: "¥2,000〜¥5,000" },
      { name: "リラックスグッズセット", keywords: ["リラックス", "グッズ", "セット", "おうち時間"], priceRange: "¥4,000〜¥10,000" }
    );
  }

  return suggestions.slice(0, 3);
}

// 恋人向け冬小物の提案生成
export function generateCoupleWinterSuggestions(answers: Record<string, string>): GiftItem[] {
  const suggestions: GiftItem[] = [];
  const color = answers.question_0 || "";
  const style = answers.question_1 || "";
  const budget = answers.question_2 || "";

  // 色味に基づく提案
  if (color.includes("明るい色")) {
    suggestions.push(
      { name: "明るい色の手袋", keywords: ["手袋", "明るい色", "冬", "小物"], priceRange: "¥3,000〜¥8,000" },
      { name: "パステルストール", keywords: ["ストール", "パステル", "冬", "小物"], priceRange: "¥4,000〜¥10,000" },
      { name: "明るいルームウェア", keywords: ["ルームウェア", "明るい色", "冬", "小物"], priceRange: "¥5,000〜¥12,000" }
    );
  } else if (color.includes("落ち着いた色")) {
    suggestions.push(
      { name: "落ち着いた色の手袋", keywords: ["手袋", "落ち着いた色", "冬", "小物"], priceRange: "¥3,000〜¥8,000" },
      { name: "クラシックストール", keywords: ["ストール", "クラシック", "冬", "小物"], priceRange: "¥4,000〜¥10,000" },
      { name: "上品なルームウェア", keywords: ["ルームウェア", "上品", "冬", "小物"], priceRange: "¥5,000〜¥12,000" }
    );
  } else if (color.includes("カラフル")) {
    suggestions.push(
      { name: "カラフル手袋", keywords: ["手袋", "カラフル", "冬", "小物"], priceRange: "¥3,000〜¥8,000" },
      { name: "カラフルストール", keywords: ["ストール", "カラフル", "冬", "小物"], priceRange: "¥4,000〜¥10,000" },
      { name: "カラフルルームウェア", keywords: ["ルームウェア", "カラフル", "冬", "小物"], priceRange: "¥5,000〜¥12,000" }
    );
  } else {
    // デフォルト提案
    suggestions.push(
      { name: "冬小物ギフトセット", keywords: ["冬小物", "ギフト", "セット", "冬"], priceRange: "¥3,000〜¥8,000" },
      { name: "定番手袋", keywords: ["手袋", "定番", "冬", "小物"], priceRange: "¥2,000〜¥6,000" },
      { name: "人気ストール", keywords: ["ストール", "人気", "冬", "小物"], priceRange: "¥3,000〜¥8,000" }
    );
  }

  return suggestions.slice(0, 3);
}

// 恋人向け洋服の提案生成
export function generateCoupleClothingSuggestions(answers: Record<string, string>): GiftItem[] {
  const suggestions: GiftItem[] = [];
  const gender = answers.question_0 || "";
  const style = answers.question_1 || "";
  const item = answers.question_2 || "";
  const budget = answers.question_3 || "";

  // 性別とスタイルに基づく提案
  if (gender.includes("男性")) {
    if (style.includes("カジュアル・リラックス")) {
      if (item.includes("トップス")) {
        suggestions.push(
          { name: "メンズカジュアルニット", keywords: ["メンズ", "ニット", "カジュアル", "トップス", "洋服"], priceRange: "¥5,000〜¥15,000" },
          { name: "メンズTシャツ", keywords: ["メンズ", "Tシャツ", "カジュアル", "トップス", "洋服"], priceRange: "¥3,000〜¥8,000" },
          { name: "メンズカジュアルシャツ", keywords: ["メンズ", "シャツ", "カジュアル", "トップス", "洋服"], priceRange: "¥4,000〜¥12,000" }
        );
      } else if (item.includes("ボトムス")) {
        suggestions.push(
          { name: "メンズカジュアルパンツ", keywords: ["メンズ", "パンツ", "カジュアル", "ボトムス", "洋服"], priceRange: "¥5,000〜¥15,000" },
          { name: "メンズジーンズ", keywords: ["メンズ", "ジーンズ", "カジュアル", "ボトムス", "洋服"], priceRange: "¥6,000〜¥18,000" },
          { name: "メンズチノパンツ", keywords: ["メンズ", "チノパンツ", "カジュアル", "ボトムス", "洋服"], priceRange: "¥5,000〜¥15,000" }
        );
      } else if (item.includes("アウター")) {
        suggestions.push(
          { name: "メンズカジュアルジャケット", keywords: ["メンズ", "ジャケット", "カジュアル", "アウター", "洋服"], priceRange: "¥8,000〜¥20,000" },
          { name: "メンズパーカー", keywords: ["メンズ", "パーカー", "カジュアル", "アウター", "洋服"], priceRange: "¥5,000〜¥15,000" },
          { name: "メンズカーディガン", keywords: ["メンズ", "カーディガン", "カジュアル", "アウター", "洋服"], priceRange: "¥6,000〜¥18,000" }
        );
      }
    } else if (style.includes("おしゃれ・トレンド")) {
      if (item.includes("トップス")) {
        suggestions.push(
          { name: "メンズトレンドニット", keywords: ["メンズ", "ニット", "トレンド", "トップス", "洋服"], priceRange: "¥8,000〜¥20,000" },
          { name: "メンズおしゃれシャツ", keywords: ["メンズ", "シャツ", "おしゃれ", "トップス", "洋服"], priceRange: "¥6,000〜¥18,000" },
          { name: "メンズトレンドトップス", keywords: ["メンズ", "トップス", "トレンド", "おしゃれ", "洋服"], priceRange: "¥5,000〜¥15,000" }
        );
      } else if (item.includes("ボトムス")) {
        suggestions.push(
          { name: "メンズトレンドパンツ", keywords: ["メンズ", "パンツ", "トレンド", "ボトムス", "洋服"], priceRange: "¥8,000〜¥20,000" },
          { name: "メンズトレンドジーンズ", keywords: ["メンズ", "ジーンズ", "トレンド", "ボトムス", "洋服"], priceRange: "¥8,000〜¥25,000" },
          { name: "メンズおしゃれパンツ", keywords: ["メンズ", "パンツ", "おしゃれ", "ボトムス", "洋服"], priceRange: "¥7,000〜¥18,000" }
        );
      } else if (item.includes("アウター")) {
        suggestions.push(
          { name: "メンズトレンドジャケット", keywords: ["メンズ", "ジャケット", "トレンド", "アウター", "洋服"], priceRange: "¥12,000〜¥30,000" },
          { name: "メンズおしゃれコート", keywords: ["メンズ", "コート", "おしゃれ", "アウター", "洋服"], priceRange: "¥15,000〜¥40,000" },
          { name: "メンズトレンドアウター", keywords: ["メンズ", "アウター", "トレンド", "おしゃれ", "洋服"], priceRange: "¥10,000〜¥25,000" }
        );
      }
    } else if (style.includes("上品・エレガント")) {
      if (item.includes("トップス")) {
        suggestions.push(
          { name: "メンズエレガントニット", keywords: ["メンズ", "ニット", "エレガント", "トップス", "洋服"], priceRange: "¥10,000〜¥25,000" },
          { name: "メンズ上品シャツ", keywords: ["メンズ", "シャツ", "上品", "トップス", "洋服"], priceRange: "¥8,000〜¥20,000" },
          { name: "メンズエレガントトップス", keywords: ["メンズ", "トップス", "エレガント", "上品", "洋服"], priceRange: "¥6,000〜¥18,000" }
        );
      } else if (item.includes("ボトムス")) {
        suggestions.push(
          { name: "メンズエレガントパンツ", keywords: ["メンズ", "パンツ", "エレガント", "ボトムス", "洋服"], priceRange: "¥10,000〜¥25,000" },
          { name: "メンズ上品パンツ", keywords: ["メンズ", "パンツ", "上品", "ボトムス", "洋服"], priceRange: "¥8,000〜¥20,000" },
          { name: "メンズエレガントボトムス", keywords: ["メンズ", "ボトムス", "エレガント", "上品", "洋服"], priceRange: "¥6,000〜¥18,000" }
        );
      } else if (item.includes("アウター")) {
        suggestions.push(
          { name: "メンズエレガントジャケット", keywords: ["メンズ", "ジャケット", "エレガント", "アウター", "洋服"], priceRange: "¥15,000〜¥40,000" },
          { name: "メンズ上品コート", keywords: ["メンズ", "コート", "上品", "アウター", "洋服"], priceRange: "¥20,000〜¥50,000" },
          { name: "メンズエレガントアウター", keywords: ["メンズ", "アウター", "エレガント", "上品", "洋服"], priceRange: "¥12,000〜¥30,000" }
        );
      }
    }
  } else if (gender.includes("女性")) {
    if (style.includes("カジュアル・リラックス")) {
      if (item.includes("トップス")) {
        suggestions.push(
          { name: "レディースカジュアルニット", keywords: ["レディース", "ニット", "カジュアル", "トップス", "洋服"], priceRange: "¥5,000〜¥15,000" },
          { name: "レディースTシャツ", keywords: ["レディース", "Tシャツ", "カジュアル", "トップス", "洋服"], priceRange: "¥3,000〜¥8,000" },
          { name: "レディースカジュアルシャツ", keywords: ["レディース", "シャツ", "カジュアル", "トップス", "洋服"], priceRange: "¥4,000〜¥12,000" }
        );
      } else if (item.includes("ボトムス")) {
        suggestions.push(
          { name: "レディースカジュアルパンツ", keywords: ["レディース", "パンツ", "カジュアル", "ボトムス", "洋服"], priceRange: "¥5,000〜¥15,000" },
          { name: "レディーススカート", keywords: ["レディース", "スカート", "カジュアル", "ボトムス", "洋服"], priceRange: "¥4,000〜¥12,000" },
          { name: "レディースジーンズ", keywords: ["レディース", "ジーンズ", "カジュアル", "ボトムス", "洋服"], priceRange: "¥6,000〜¥18,000" }
        );
      } else if (item.includes("アウター")) {
        suggestions.push(
          { name: "レディースカジュアルジャケット", keywords: ["レディース", "ジャケット", "カジュアル", "アウター", "洋服"], priceRange: "¥8,000〜¥20,000" },
          { name: "レディースカーディガン", keywords: ["レディース", "カーディガン", "カジュアル", "アウター", "洋服"], priceRange: "¥6,000〜¥18,000" },
          { name: "レディースパーカー", keywords: ["レディース", "パーカー", "カジュアル", "アウター", "洋服"], priceRange: "¥5,000〜¥15,000" }
        );
      }
    } else if (style.includes("おしゃれ・トレンド")) {
      if (item.includes("トップス")) {
        suggestions.push(
          { name: "レディーストレンドニット", keywords: ["レディース", "ニット", "トレンド", "トップス", "洋服"], priceRange: "¥8,000〜¥20,000" },
          { name: "レディースおしゃれシャツ", keywords: ["レディース", "シャツ", "おしゃれ", "トップス", "洋服"], priceRange: "¥6,000〜¥18,000" },
          { name: "レディーストレンドトップス", keywords: ["レディース", "トップス", "トレンド", "おしゃれ", "洋服"], priceRange: "¥5,000〜¥15,000" }
        );
      } else if (item.includes("ボトムス")) {
        suggestions.push(
          { name: "レディーストレンドパンツ", keywords: ["レディース", "パンツ", "トレンド", "ボトムス", "洋服"], priceRange: "¥8,000〜¥20,000" },
          { name: "レディースおしゃれスカート", keywords: ["レディース", "スカート", "おしゃれ", "ボトムス", "洋服"], priceRange: "¥6,000〜¥18,000" },
          { name: "レディーストレンドジーンズ", keywords: ["レディース", "ジーンズ", "トレンド", "ボトムス", "洋服"], priceRange: "¥8,000〜¥25,000" }
        );
      } else if (item.includes("アウター")) {
        suggestions.push(
          { name: "レディーストレンドジャケット", keywords: ["レディース", "ジャケット", "トレンド", "アウター", "洋服"], priceRange: "¥12,000〜¥30,000" },
          { name: "レディースおしゃれコート", keywords: ["レディース", "コート", "おしゃれ", "アウター", "洋服"], priceRange: "¥15,000〜¥40,000" },
          { name: "レディーストレンドアウター", keywords: ["レディース", "アウター", "トレンド", "おしゃれ", "洋服"], priceRange: "¥10,000〜¥25,000" }
        );
      }
    } else if (style.includes("上品・エレガント")) {
      if (item.includes("トップス")) {
        suggestions.push(
          { name: "レディースエレガントニット", keywords: ["レディース", "ニット", "エレガント", "トップス", "洋服"], priceRange: "¥10,000〜¥25,000" },
          { name: "レディース上品シャツ", keywords: ["レディース", "シャツ", "上品", "トップス", "洋服"], priceRange: "¥8,000〜¥20,000" },
          { name: "レディースエレガントトップス", keywords: ["レディース", "トップス", "エレガント", "上品", "洋服"], priceRange: "¥6,000〜¥18,000" }
        );
      } else if (item.includes("ボトムス")) {
        suggestions.push(
          { name: "レディースエレガントパンツ", keywords: ["レディース", "パンツ", "エレガント", "ボトムス", "洋服"], priceRange: "¥10,000〜¥25,000" },
          { name: "レディース上品スカート", keywords: ["レディース", "スカート", "上品", "ボトムス", "洋服"], priceRange: "¥8,000〜¥20,000" },
          { name: "レディースエレガントボトムス", keywords: ["レディース", "ボトムス", "エレガント", "上品", "洋服"], priceRange: "¥6,000〜¥18,000" }
        );
      } else if (item.includes("アウター")) {
        suggestions.push(
          { name: "レディースエレガントジャケット", keywords: ["レディース", "ジャケット", "エレガント", "アウター", "洋服"], priceRange: "¥15,000〜¥40,000" },
          { name: "レディース上品コート", keywords: ["レディース", "コート", "上品", "アウター", "洋服"], priceRange: "¥20,000〜¥50,000" },
          { name: "レディースエレガントアウター", keywords: ["レディース", "アウター", "エレガント", "上品", "洋服"], priceRange: "¥12,000〜¥30,000" }
        );
      }
    }
  } else {
    // デフォルト提案（性別不明の場合）
    suggestions.push(
      { name: "洋服ギフトセット", keywords: ["洋服", "ギフト", "セット", "ファッション"], priceRange: "¥5,000〜¥15,000" },
      { name: "定番トップス", keywords: ["トップス", "定番", "洋服", "ファッション"], priceRange: "¥4,000〜¥12,000" },
      { name: "定番ボトムス", keywords: ["ボトムス", "定番", "洋服", "ファッション"], priceRange: "¥5,000〜¥15,000" }
    );
  }

  return suggestions.slice(0, 3);
}
