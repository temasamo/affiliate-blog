import type { NextApiRequest, NextApiResponse } from 'next';
import { diagnose, type Answers } from '@/lib/resultLogic';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const answers: Answers = req.body;
    
    // 基本的なバリデーション
    if (!answers || !answers.sleepPosition) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // 診断実行
    const result = diagnose(answers);

  return res.status(200).json({
      id: `diagnosis-${Date.now()}`,
      ...result
    });
  } catch (error) {
    console.error('Diagnosis error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 