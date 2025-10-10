// GPT API連携：スキンケアギフト提案生成
import { NextApiRequest, NextApiResponse } from 'next';

interface GPTRequest {
  answers: Record<string, string | string[]>;
  suggestions: any[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { answers, suggestions }: GPTRequest = req.body;

    // GPT APIへのリクエスト
    const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `あなたは実母へのスキンケアギフト選びの専門アドバイザーです。
            
以下の情報を基に、お母さまに最適なスキンケアギフトを提案してください：

回答データ: ${JSON.stringify(answers)}
提案候補: ${JSON.stringify(suggestions)}

以下の形式で回答してください：
1. お母さまのプロフィール分析（年齢、肌の悩み、好み）
2. おすすめギフトの理由（3つまで）
3. 各ギフトの特徴とお母さまに合う理由
4. プレゼントを渡す際のアドバイス

自然で親しみやすい口調で、お母さまへの愛情が伝わるような提案をしてください。`
          },
          {
            role: 'user',
            content: `実母へのスキンケアギフト選びをお手伝いしてください。回答データと提案候補を基に、最適な提案をお願いします。`
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
    const aiComment = gptData.choices[0]?.message?.content || '';

    res.status(200).json({ aiComment });

  } catch (error) {
    console.error('GPT API Error:', error);
    res.status(500).json({ error: 'Failed to generate AI suggestions' });
  }
}
