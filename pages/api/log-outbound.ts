// pages/api/log-outbound.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase environment variables are not configured');
}

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { partner, sessionId } = req.body as { partner?: 'rakuten' | 'amazon' | 'yahoo'; sessionId?: string };
    if (!partner || !sessionId) return res.status(400).json({ error: 'partner and sessionId required' });

    if (!supabase) {
      console.warn('Supabase not configured, skipping log');
      return res.status(200).json({ ok: true, outbound_clicks: {} });
    }

    // クリックを +1 する（upsert 例：初回なら作る、あれば加算）
    const { data, error } = await supabase
      .from('pillow_diagnosis_logs')
      .select('outbound_clicks')
      .eq('session_id', sessionId)
      .single();

    if (error) return res.status(500).json({ error: error.message });

    const clicks = (data?.outbound_clicks ?? {}) as Record<string, number>;
    clicks[partner] = (clicks[partner] ?? 0) + 1;

    const { error: upErr } = await supabase
      .from('pillow_diagnosis_logs')
      .update({ outbound_clicks: clicks })
      .eq('session_id', sessionId);

    if (upErr) return res.status(500).json({ error: upErr.message });

    return res.status(200).json({ ok: true, outbound_clicks: clicks });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? 'unknown error' });
  }
} 