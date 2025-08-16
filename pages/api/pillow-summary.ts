import type { NextApiRequest, NextApiResponse } from 'next';

type PillowSummaryPayload = {
  sleepPos: string;
  mattressFirm: string;
  category: string;
  height: string;
  firmness: string;
  lastOne?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload: PillowSummaryPayload = req.body;

    // 必須フィールドの検証
    if (!payload.category || !payload.height || !payload.firmness) {
      return res.status(400).json({ 
        error: 'Missing required fields: category, height, firmness' 
      });
    }

    // サマリー生成（簡易版）
    const summary = generateSummary(payload);

    res.status(200).json({ 
      ok: true, 
      summary 
    });
  } catch (error) {
    console.error('Pillow summary error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function generateSummary(payload: PillowSummaryPayload): string {
  const { sleepPos, mattressFirm, category, height, firmness } = payload;
  
  let summary = `あなたの睡眠習慣（${sleepPos}）とマットレスの硬さ（${mattressFirm}）を考慮し、`;
  summary += `${category}タイプの枕で、高さは${height}、硬さは${firmness}を中心にご提案します。`;
  
  return summary;
} 