import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// 環境変数を読み込み
dotenv.config({ path: '.env.local' });

// 環境変数から読み込み
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

async function main() {
  console.log('Testing Supabase insert...');
  console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('Key:', process.env.NEXT_PUBLIC_SUPABASE_KEY ? '***' + process.env.NEXT_PUBLIC_SUPABASE_KEY.slice(-4) : 'undefined');

  const { data, error } = await supabase
    .from('pillow_diagnosis_logs')
    .insert([
      {
        session_id: 'test-session-123',
        answers: { q1: 'yes', q2: 'no' },
        scores: { comfort: 80, support: 70 },
        primary_category: 'high-support',
        secondary_categories: ['soft', 'cooling'],
        confidence: 0.9,
        reasons: ['good support', 'cool material'],
        outbound_clicks: { amazon: 1 },
        purchase_signal: false,
        satisfaction_quick: 4
      }
    ])
    .select();

  if (error) {
    console.error('❌ Insert error:', error);
  } else {
    console.log('✅ Insert success:', data);
  }
}

main().catch(console.error); 