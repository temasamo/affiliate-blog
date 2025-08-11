// pages/api/log-outbound.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { partner, sessionId, ctaId, url, page, referrer, userAgent } = req.body;

    // ログを保存
    const { error } = await supabaseAdmin
      .from('outbound_clicks')
      .insert([{
        session_id: sessionId,
        partner,
        cta_id: ctaId,
        url,
        page,
        referrer,
        user_agent: userAgent,
        clicked_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Log outbound error:', error);
      return res.status(500).json({ error: 'Failed to log outbound click' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Log outbound error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 