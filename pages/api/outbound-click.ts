// /pages/api/outbound-click.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { session_id, kind } = req.body;

    if (!session_id || !kind || !['rakuten', 'yahoo', 'amazon'].includes(kind)) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    // 既存レコードを取得
    const { data: existingRecord } = await supabase
      .from('pillow_diagnosis_logs')
      .select('outbound_clicks')
      .eq('session_id', session_id)
      .single();

    if (existingRecord) {
      // 既存レコードを更新（クリック数をインクリメント）
      const currentClicks = existingRecord.outbound_clicks || {};
      const updatedClicks = {
        ...currentClicks,
        [kind]: (currentClicks[kind] || 0) + 1
      };

      const { error } = await supabase
        .from('pillow_diagnosis_logs')
        .update({ outbound_clicks: updatedClicks })
        .eq('session_id', session_id);

      if (error) {
        console.error('Update error:', error);
        return res.status(500).json({ error: 'Update failed' });
      }
    } else {
      // 新規レコードを作成
      const { error } = await supabase
        .from('pillow_diagnosis_logs')
        .insert({
          session_id,
          outbound_clicks: { [kind]: 1 },
          answers: {},
          scores: {},
          primary_category: 'unknown',
          secondary_categories: [],
          confidence: 0,
          reasons: [],
          purchase_signal: false
        });

      if (error) {
        console.error('Insert error:', error);
        return res.status(500).json({ error: 'Insert failed' });
      }
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'unexpected' });
  }
} 