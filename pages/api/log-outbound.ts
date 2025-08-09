// pages/api/log-outbound.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { partner, sessionId } = req.body as { partner?: 'rakuten' | 'amazon' | 'yahoo'; sessionId?: string };
    if (!partner || !sessionId) return res.status(400).json({ error: 'partner and sessionId required' });

    // 既存値を取り出し
    const { data, error } = await supabase
      .from('pillow_diagnosis_logs')
      .select('outbound_clicks')
      .eq('session_id', sessionId)
      .single();

    if (error) return res.status(500).json({ error: error.message });

    const current = (data?.outbound_clicks ?? {}) as Record<string, number>;
    const next = { ...current, [partner]: (current[partner] ?? 0) + 1 };

    const { error: upErr } = await supabase
      .from('pillow_diagnosis_logs')
      .update({ outbound_clicks: next })
      .eq('session_id', sessionId);

    if (upErr) return res.status(500).json({ error: upErr.message });

    return res.status(200).json({ ok: true, outbound_clicks: next });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? 'unknown error' });
  }
} 