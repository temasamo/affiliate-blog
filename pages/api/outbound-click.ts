// pages/api/outbound-click.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

// JSONB のカウントを +1 するユーティリティ
function bump(obj: Record<string, number> | null, dest: string) {
  const base = obj ?? {};
  return { ...base, [dest]: (base[dest] ?? 0) + 1 };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { dest, sessionId } = req.body ?? {};
    if (!dest || !sessionId) return res.status(400).json({ ok: false, error: 'bad_request' });

    // 1) 既存行を取得
    const { data: rows, error: selErr } = await supabase
      .from('pillow_diagnosis_logs')
      .select('id, outbound_clicks')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (selErr) return res.status(500).json({ ok: false, error: selErr.message });
    if (!rows || rows.length === 0) return res.status(404).json({ ok: false, error: 'session_not_found' });

    const row = rows[0];
    const nextJson = bump(row.outbound_clicks as any, dest);

    // 2) 更新
    const { error: updErr } = await supabase
      .from('pillow_diagnosis_logs')
      .update({ outbound_clicks: nextJson })
      .eq('id', row.id);

    if (updErr) return res.status(500).json({ ok: false, error: updErr.message });

    return res.json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message ?? 'unknown' });
  }
} 