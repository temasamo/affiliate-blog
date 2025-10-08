import type { NextApiRequest, NextApiResponse } from "next";

interface GPTResponse {
  suggestions: Array<{
    name: string;
    keywords: string[];
    priceRange: string;
    description: string;
  }>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { freeText, concern, priority, habit, budget } = req.body;

  if (!freeText || !freeText.trim()) {
    return res.status(400).json({ error: 'Free text is required' });
  }

  try {
    // GPT API呼び出し（実際のAPIキーは環境変数から取得）
    const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `あなたは美容・スキンケアの専門家です。ユーザーの自由記述と他の回答を基に、最適な美容アイテムを3つ提案してください。

回答形式：
{
  "suggestions": [
    {
      "name": "商品名",
      "keywords": ["キーワード1", "キーワード2"],
      "priceRange": "¥3,000〜¥8,000",
      "description": "商品の説明"
    }
  ]
}

キーワードは楽天・Amazon・Yahooでの検索に使用されます。`
          },
          {
            role: 'user',
            content: `以下の情報を基に美容アイテムを3つ提案してください：

悩み・気になること: ${concern || 'なし'}
重視すること: ${priority || 'なし'}
使用習慣: ${habit || 'なし'}
予算・使用頻度: ${budget || 'なし'}
自由記述: ${freeText}

自由記述を特に重視して、ユーザーの具体的なニーズに合った商品を提案してください。`
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!gptResponse.ok) {
      throw new Error(`GPT API error: ${gptResponse.status}`);
    }

    const gptData = await gptResponse.json();
    const content = gptData.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content from GPT API');
    }

    // JSONパース
    let suggestions;
    try {
      suggestions = JSON.parse(content);
    } catch (parseError) {
      // JSONパースに失敗した場合のフォールバック
      suggestions = {
        suggestions: [
          {
            name: "カスタム美容アイテム",
            keywords: ["美容", "スキンケア", "カスタム"],
            priceRange: "¥3,000〜¥15,000",
            description: "あなたのご要望に合わせた美容アイテム"
          },
          {
            name: "高級スキンケアセット",
            keywords: ["スキンケア", "美容", "高級"],
            priceRange: "¥5,000〜¥12,000",
            description: "効果を実感できる高級スキンケア"
          },
          {
            name: "美顔器・美容機器",
            keywords: ["美顔器", "美容機器", "エステ"],
            priceRange: "¥8,000〜¥25,000",
            description: "自宅でエステ級のケアができる美顔器"
          }
        ]
      };
    }

    res.status(200).json(suggestions);

  } catch (error) {
    console.error('GPT API Error:', error);
    
    // エラー時のフォールバック
    const fallbackSuggestions = {
      suggestions: [
        {
          name: "カスタム美容アイテム",
          keywords: ["美容", "スキンケア", "カスタム"],
          priceRange: "¥3,000〜¥15,000",
          description: "あなたのご要望に合わせた美容アイテム"
        },
        {
          name: "高級スキンケアセット",
          keywords: ["スキンケア", "美容", "高級"],
          priceRange: "¥5,000〜¥12,000",
          description: "効果を実感できる高級スキンケア"
        },
        {
          name: "美顔器・美容機器",
          keywords: ["美顔器", "美容機器", "エステ"],
          priceRange: "¥8,000〜¥25,000",
          description: "自宅でエステ級のケアができる美顔器"
        }
      ]
    };

    res.status(200).json(fallbackSuggestions);
  }
}
