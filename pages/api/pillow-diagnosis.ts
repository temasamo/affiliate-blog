import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const body = req.body ?? {};
    
    // 診断ロジック（簡易版）
    const result = {
      id: `diagnosis_${Date.now()}`,
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
      height: '高め（10-12cm）',
      firmness: 'やや硬め',
      ctaLabel: 'おすすめ商品をチェック',
      ctaUrl: process.env.NEXT_PUBLIC_CTA_URL || 'https://example.com',
      ctaId: 'diagnosis-primary',
    };

    // Supabaseにログを保存（オプション）
    if (process.env.NODE_ENV !== 'production') {
      try {
        await supabaseAdmin
          .from('pillow_diagnosis_logs')
          .insert([{ 
            session_id: body.sessionId || 'debug-session', 
            answers: body 
          }]);
      } catch (dbError) {
        console.log('DB保存エラー（無視）:', dbError);
      }
    }

    return res.status(200).json(result);
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
} 