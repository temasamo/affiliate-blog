import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { freeText, answers } = req.body;

    if (!freeText) {
      return res.status(400).json({ error: 'Free text is required' });
    }

    // 義母向けのGPT提案ロジック（現在はモックデータ）
    // 実際のGPT API統合時は、ここでGPT APIを呼び出し
    const suggestions = generateMotherInLawSuggestions(freeText, answers);

    res.status(200).json({ suggestions });
  } catch (error) {
    console.error('Mother-in-law GPT API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function generateMotherInLawSuggestions(freeText: string, answers: Record<string, string>): any[] {
  // 義母向けの提案ロジック
  // 自由記述の内容に基づいて、上品で気が利いたギフトを提案
  
  const suggestions = [];

  // 自由記述の内容を分析して適切な提案を生成
  if (freeText.includes("香り") || freeText.includes("香る")) {
    suggestions.push(
      {
        name: "上品な香りハンドクリーム",
        keywords: ["香り", "ハンドクリーム", "上品", "ギフト"],
        priceRange: "¥2,500〜¥6,000"
      },
      {
        name: "アロマキャンドルセット",
        keywords: ["アロマキャンドル", "香り", "癒し", "上質"],
        priceRange: "¥3,000〜¥8,000"
      },
      {
        name: "香り付き入浴剤",
        keywords: ["入浴剤", "香り", "リラックス", "上品"],
        priceRange: "¥2,000〜¥5,000"
      }
    );
  } else if (freeText.includes("スキンケア") || freeText.includes("美容")) {
    suggestions.push(
      {
        name: "高級スキンケアセット",
        keywords: ["高級", "スキンケア", "上質", "ギフト"],
        priceRange: "¥5,000〜¥12,000"
      },
      {
        name: "ブランドコスメセット",
        keywords: ["ブランド", "コスメ", "上質", "スキンケア"],
        priceRange: "¥6,000〜¥15,000"
      },
      {
        name: "香り付きスキンケア",
        keywords: ["香り", "スキンケア", "上品", "フローラル"],
        priceRange: "¥4,000〜¥10,000"
      }
    );
  } else if (freeText.includes("タオル") || freeText.includes("寝具")) {
    suggestions.push(
      {
        name: "今治タオルセット",
        keywords: ["今治タオル", "高級", "上質", "ギフト"],
        priceRange: "¥4,000〜¥10,000"
      },
      {
        name: "オーガニックコットンタオル",
        keywords: ["オーガニック", "コットン", "自然", "上質"],
        priceRange: "¥3,500〜¥8,000"
      },
      {
        name: "高級バスタオルセット",
        keywords: ["バスタオル", "高級", "吸水", "上質"],
        priceRange: "¥5,000〜¥12,000"
      }
    );
  } else if (freeText.includes("スイーツ") || freeText.includes("お菓子")) {
    suggestions.push(
      {
        name: "高級スイーツセット",
        keywords: ["スイーツ", "高級", "華やか", "ギフト"],
        priceRange: "¥3,000〜¥8,000"
      },
      {
        name: "季節限定スイーツ",
        keywords: ["季節限定", "スイーツ", "華やか", "限定"],
        priceRange: "¥2,500〜¥6,000"
      },
      {
        name: "上品なスイーツギフト",
        keywords: ["スイーツ", "上品", "華やか", "ギフトボックス"],
        priceRange: "¥4,000〜¥10,000"
      }
    );
  } else if (freeText.includes("花") || freeText.includes("フラワー")) {
    suggestions.push(
      {
        name: "季節の花ギフト",
        keywords: ["花", "季節", "ギフト", "華やか"],
        priceRange: "¥3,000〜¥8,000"
      },
      {
        name: "プリザーブドフラワーアレンジ",
        keywords: ["プリザーブドフラワー", "アレンジ", "長持ち", "華やか"],
        priceRange: "¥4,000〜¥12,000"
      },
      {
        name: "上品な花ギフト",
        keywords: ["花", "上品", "ギフト", "華やか"],
        priceRange: "¥4,000〜¥10,000"
      }
    );
  } else {
    // デフォルト：上品で気が利いたギフト
    suggestions.push(
      {
        name: "上品な香りハンドクリーム",
        keywords: ["香り", "ハンドクリーム", "上品", "ギフト"],
        priceRange: "¥2,500〜¥6,000"
      },
      {
        name: "高級スキンケアセット",
        keywords: ["高級", "スキンケア", "上質", "ギフト"],
        priceRange: "¥5,000〜¥12,000"
      },
      {
        name: "今治タオルセット",
        keywords: ["今治タオル", "高級", "上質", "ギフト"],
        priceRange: "¥4,000〜¥10,000"
      }
    );
  }

  return suggestions;
}
