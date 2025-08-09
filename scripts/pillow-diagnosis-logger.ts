import { supabase } from '../lib/supabase';
import { PillowDiagnosisPayload } from '../types/pillow';

async function logPillowDiagnosis(payload: PillowDiagnosisPayload) {
  const { data, error } = await supabase
    .from('pillow_diagnosis_logs')
    .insert([payload])
    .select();

  if (error) {
    console.error('Insert Error:', error);
    throw error;
  }
  
  console.log('Insert Success:', data);
  return data;
}

// テスト用のメイン関数
async function main() {
  const payload: PillowDiagnosisPayload = {
    session_id: 'test-' + Date.now(),
    answers: { Q1: 'no' },
    scores: { adjustable: 5, side_sleep: 3, breathable: 2, washable: 2, hotel: 0, low_rebound: 0 },
    primary_category: 'adjustable',
    secondary_categories: ['side_sleep','breathable','washable'],
    confidence: 0.8,
    reasons: ['テスト送信'],
    outbound_clicks: { rakuten: 0, yahoo: 0, amazon: 0 },
    purchase_signal: false,
    satisfaction_quick: undefined
  };

  try {
    await logPillowDiagnosis(payload);
  } catch (error) {
    console.error('Main Error:', error);
    process.exit(1);
  }
}

// スクリプトとして実行された場合のみmain関数を実行
if (require.main === module) {
  main();
}

export { logPillowDiagnosis };