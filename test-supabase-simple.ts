import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// 環境変数を読み込み
dotenv.config({ path: '.env.local' });

// 環境変数の確認
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

console.log('Environment variables:');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? '***' + supabaseKey.slice(-4) : 'undefined');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Environment variables not set!');
  console.log('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseConnection() {
  console.log('\nTesting Supabase connection...');
  
  try {
    // 基本的な接続テスト
    const { data, error } = await supabase
      .from('pillow_diagnosis_logs')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Connection Error:', error);
      return;
    }

    console.log('✅ Supabase connection successful!');
    console.log('Sample data:', data);
    
  } catch (err) {
    console.error('❌ Connection failed:', err);
  }
}

// テスト用のデータ挿入
async function testDataInsertion() {
  console.log('\nTesting data insertion...');
  
  const testPayload = {
    session_id: 'test-' + Date.now(),
    answers: { Q1: 'no', Q2: ['height_mismatch'], Q3: 'side' },
    scores: { adjustable: 5, side_sleep: 3 },
    primary_category: 'adjustable',
    secondary_categories: ['side_sleep'],
    confidence: 0.75,
    reasons: ['高さ不一致→高さ調整', '横向き寝→横向き特化'],
    outbound_clicks: { rakuten: 0, yahoo: 0, amazon: 0 },
    purchase_signal: false,
    satisfaction_quick: null
  };

  try {
    const { data, error } = await supabase
      .from('pillow_diagnosis_logs')
      .insert([testPayload])
      .select();

    if (error) {
      console.error('❌ Insert Error:', error);
      return;
    }

    console.log('✅ Data insertion successful!');
    console.log('Inserted data:', data);
    
  } catch (err) {
    console.error('❌ Insert failed:', err);
  }
}

async function main() {
  await testSupabaseConnection();
  await testDataInsertion();
}

main().catch(console.error); 