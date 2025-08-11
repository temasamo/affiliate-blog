import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SR_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SERVICE_ROLE ??
  '';

const supa = createClient(URL, SR_KEY, {
  auth: { persistSession: false },
  db: { schema: 'public' },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {if (process.env.NODE_ENV === 'production') {
    return res.status(200).json({ ok: true, note: 'debug endpoint disabled in production' });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const payload = {
    session_id: 'debug-session',
    outbound_clicks: 0,      // テーブルの別カラム
    scores: [],              // テーブルの別カラム（型に合わせて）

    // answers は jsonb カラム想定
    answers: {
      confidence: 0.95,
      reasons: ['Debug test'],
      ts: new Date().toISOString(),
    },
  };

  try {
    const { data, error } = await supa
      .from('pillow_diagnosis_logs')
      .insert([payload])
      .select();

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      error: e.message,
      hint: e.hint ?? null,
      code: e.code ?? null,
    });
  }
}
