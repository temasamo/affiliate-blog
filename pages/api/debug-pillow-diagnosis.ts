import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const body = req.body ?? {};
  // ここではまずUIが出ることを優先してダミー返却
  const result = {
    primaryCategory: '高め・やや硬め枕',
    secondaryCategories: ['低め・柔らかめ', '標準'],
    confidence: 0.82,
    reasons: [
      '横向きが多い',
      '首・肩のこりを軽減したい',
      'マットレスは普通〜硬め',
    ],
    title: '横向きさんには「しっかり支える高め枕」',
    summary: '横向き時に肩のスペースを確保できる高さで、後頭部を安定させるやや硬め素材を推奨します。',
    received: body, // デバッグ用
  };

  // 本番でデバッグを止めたい時はこれを冒頭に置く
  // if (process.env.NODE_ENV === 'production') {
  //   return res.status(200).json({ ok: true, note: 'debug endpoint disabled in production' });
  // }

  return res.status(200).json(result);
} 