import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { diagnose, Answers } from '@/lib/resultLogic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { sessionId, answers } = req.body as { sessionId: string; answers: Answers };
    if (!sessionId || !answers) return res.status(400).json({ error: 'Bad Request' });

    // 診断
    const result = diagnose(answers);

    // DB へ保存
    const payload = {
      session_id: sessionId,
      answers,
      scores: result.scores,
      primary_category: result.primaryCategory,
      secondary_categories: result.secondaryCategories,
      confidence: result.confidence,
      reasons: result.reasons,
      outbound_clicks: { rakuten: 0, yahoo: 0, amazon: 0 },
      purchase_signal: false,
      satisfaction_quick: null,
    };

    const { data, error } = await supabase
      .from('pillow_diagnosis_logs')
      .insert(payload)
      .select('id, primary_category, secondary_categories, confidence, reasons')
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'DB Insert Failed' });
    }

    return res.status(200).json({
      id: data.id,
      result: {
        scores: result.scores,
        primaryCategory: data.primary_category,
        secondaryCategories: data.secondary_categories,
        confidence: data.confidence,
        reasons: data.reasons,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal Error' });
  }
} 