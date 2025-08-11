import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  return res.status(200).json({
    id: 'debug-row-1',
    primaryCategory: '高め・やや硬め枕',
    secondaryCategories: ['低め・柔らかめ', '標準'],
    confidence: 0.82,
    reasons: ['横向きが多い', '首・肩のこり', 'マットレス普通〜硬め'],
    title: '横向きさんには「しっかり支える高め枕」',
    summary: '横向き時の肩スペースを確保できる高さと、後頭部を安定させるやや硬め素材を推奨します。',
  });
} 