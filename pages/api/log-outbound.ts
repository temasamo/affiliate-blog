// /pages/api/log-outbound.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { session_id, channel } = req.body as { session_id: string; channel: 'rakuten'|'yahoo'|'amazon' };
  
  if (!session_id || !channel) {
    return res.status(400).json({ error: 'bad params' });
  }

  // 1) 既存行を取得
  const { data: row, error: getErr } = await supabase
    .from('pillow_diagnosis_logs')
    .select('outbound_clicks')
    .eq('session_id', session_id)
    .single();

  if (getErr) {
    return res.status(404).json({ error: 'session not found' });
  }

  const current = row?.outbound_clicks ?? {};
  const next = { ...current, [channel]: (current?.[channel] ?? 0) + 1 };

  // 2) 書き戻し
  const { error: updErr } = await supabase
    .from('pillow_diagnosis_logs')
    .update({ outbound_clicks: next })
    .eq('session_id', session_id);

  if (updErr) {
    return res.status(500).json({ error: updErr.message });
  }

  return res.status(200).json({ ok: true });
} 