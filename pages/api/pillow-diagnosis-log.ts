// /pages/api/pillow-diagnosis-log.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// フロント公開キーでOK（RLS前提）
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

// バリデーション関数
function validatePayload(body: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // 必須フィールドチェック
  if (!body.session_id || typeof body.session_id !== 'string') {
    errors.push('session_id is required and must be a string');
  }

  if (!body.primary_category || typeof body.primary_category !== 'string') {
    errors.push('primary_category is required and must be a string');
  }

  if (!body.answers || typeof body.answers !== 'object') {
    errors.push('answers is required and must be an object');
  }

  if (!body.scores || typeof body.scores !== 'object') {
    errors.push('scores is required and must be an object');
  }

  if (!Array.isArray(body.secondary_categories)) {
    errors.push('secondary_categories must be an array');
  }

  if (typeof body.confidence !== 'number' || body.confidence < 0 || body.confidence > 1) {
    errors.push('confidence must be a number between 0 and 1');
  }

  if (!Array.isArray(body.reasons)) {
    errors.push('reasons must be an array');
  }

  if (typeof body.purchase_signal !== 'boolean') {
    errors.push('purchase_signal must be a boolean');
  }

  // セッションIDの形式チェック（UUIDまたはカスタム形式）
  if (body.session_id && !/^[a-zA-Z0-9-_]+$/.test(body.session_id)) {
    errors.push('session_id contains invalid characters');
  }

  // カテゴリの有効性チェック
  const validCategories = ['adjustable', 'side_sleep', 'breathable', 'washable', 'hotel', 'low_rebound'];
  if (body.primary_category && !validCategories.includes(body.primary_category)) {
    errors.push(`primary_category must be one of: ${validCategories.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // メソッドチェック
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are allowed'
    });
  }

  try {
    // Content-Typeチェック
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        error: 'Invalid content type',
        message: 'Content-Type must be application/json'
      });
    }

    const payload = req.body;

    // バリデーション実行
    const validation = validatePayload(payload);
    if (!validation.isValid) {
      console.error('Validation failed:', validation.errors);
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Invalid request data',
        details: validation.errors
      });
    }

    // 環境変数チェック
    if (!url || !key) {
      console.error('Missing Supabase configuration');
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'Database configuration is missing'
      });
    }

    // PostgREST 直叩き（軽量）。supabase-jsでもOK。
    const r = await fetch(`${url}/rest/v1/pillow_diagnosis_logs`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const errorText = await r.text();
      console.error('Supabase API Error:', {
        status: r.status,
        statusText: r.statusText,
        response: errorText,
        payload: {
          session_id: payload.session_id,
          primary_category: payload.primary_category
        }
      });

      // エラーレスポンスの詳細化
      if (r.status === 400) {
        return res.status(400).json({
          error: 'Bad request',
          message: 'Invalid data format',
          details: errorText
        });
      } else if (r.status === 401) {
        return res.status(500).json({
          error: 'Authentication error',
          message: 'Database authentication failed'
        });
      } else if (r.status === 403) {
        return res.status(500).json({
          error: 'Authorization error',
          message: 'Database access denied'
        });
      } else if (r.status === 422) {
        return res.status(400).json({
          error: 'Validation error',
          message: 'Data validation failed',
          details: errorText
        });
      } else {
        return res.status(500).json({
          error: 'Database error',
          message: 'Failed to save diagnosis data'
        });
      }
    }

    const json = await r.json();
    
    // 成功ログ
    console.log('Diagnosis saved successfully:', {
      session_id: payload.session_id,
      primary_category: payload.primary_category,
      confidence: payload.confidence
    });

    res.status(200).json(json);
  } catch (e: any) {
    console.error('Unexpected error:', e);
    
    // エラーの種類に応じたレスポンス
    if (e.name === 'TypeError' && e.message.includes('fetch')) {
      return res.status(503).json({
        error: 'Service unavailable',
        message: 'Database service is temporarily unavailable'
      });
    } else if (e.name === 'SyntaxError') {
      return res.status(400).json({
        error: 'Invalid JSON',
        message: 'Request body contains invalid JSON'
      });
    } else {
      return res.status(500).json({
        error: 'Internal server error',
        message: 'An unexpected error occurred'
      });
    }
  }
} 