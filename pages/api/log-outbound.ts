// /pages/api/log-outbound.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// サーバのみ: service role key を使用
const supabase = createClient(supabaseUrl, serviceKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { vendor, query, url, page, sessionId, referrer, userAgent } = (req.body ?? {}) as {
      vendor?: string;
      query?: string;
      url?: string;
      page?: string;
      sessionId?: string;
      referrer?: string;
      userAgent?: string;
    };

    if (!vendor || !url) {
      return res.status(400).json({ ok: false, error: 'vendor and url are required' });
    }

    const allowed = ['rakuten', 'amazon', 'yahoo'];
    if (!allowed.includes(vendor)) {
      return res.status(400).json({ ok: false, error: 'invalid vendor' });
    }

    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress ||
      null;

    const payload = {
      vendor,
      query: query ?? null,
      url,
      page: page ?? null,
      session_id: sessionId ?? null,
      referrer: referrer ?? null,
      user_agent: userAgent ?? (req.headers['user-agent'] as string) ?? null,
      ip,
    };

    const { data, error } = await supabase
      .from('outbound_clicks')
      .insert(payload)
      .select('id')
      .single();

    if (error) {
      // 失敗してもUX優先でエコー返し
      console.error('[log-outbound] insert failed:', error);
      return res.status(200).json({ ok: true, received: payload });
    }

    return res.status(200).json({ ok: true, id: data.id });
  } catch (err: any) {
    console.error('[log-outbound] unexpected error:', err);
    // 失敗してもUX優先でエコー返し
    return res.status(200).json({ ok: true, received: req.body ?? null });
  }
} 