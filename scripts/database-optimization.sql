-- ========================================
-- 枕診断ログ データベース最適化スクリプト
-- ========================================

-- 1. RLS (Row Level Security) ポリシー設定
-- ========================================

-- 既存のポリシーを削除（必要に応じて）
-- drop policy if exists "Enable insert for all users" on pillow_diagnosis_logs;
-- drop policy if exists "Enable select for all users" on pillow_diagnosis_logs;
-- drop policy if exists "Enable update for all users" on pillow_diagnosis_logs;

-- INSERT ポリシー（全ユーザーが挿入可能）
create policy "Enable insert for all users"
on pillow_diagnosis_logs
for insert with check (true);

-- SELECT ポリシー（全ユーザーが読み取り可能 - MVP想定）
create policy "Enable select for all users"
on pillow_diagnosis_logs
for select using (true);

-- UPDATE ポリシー（outbound_clicks の更新用）
create policy "Enable update for outbound clicks"
on pillow_diagnosis_logs
for update using (true)
with check (true);

-- 2. インデックス作成
-- ========================================

-- created_at の降順インデックス（集計・並び替え用）
create index if not exists idx_pillow_created_at 
on pillow_diagnosis_logs(created_at desc);

-- session_id のインデックス（検索・更新用）
create index if not exists idx_pillow_session_id 
on pillow_diagnosis_logs(session_id);

-- primary_category のインデックス（分析用）
create index if not exists idx_pillow_primary_category 
on pillow_diagnosis_logs(primary_category);

-- 複合インデックス（日付 + カテゴリ）
create index if not exists idx_pillow_created_category 
on pillow_diagnosis_logs(created_at desc, primary_category);

-- 3. データクリーンアップ用関数
-- ========================================

-- 古いデータを削除する関数
create or replace function cleanup_old_diagnosis_logs(days_to_keep integer default 90)
returns integer
language plpgsql
security definer
as $$
declare
  deleted_count integer;
begin
  delete from pillow_diagnosis_logs 
  where created_at < now() - interval '1 day' * days_to_keep;
  
  get diagnostics deleted_count = row_count;
  
  -- ログ出力
  raise notice 'Deleted % old diagnosis logs (older than % days)', deleted_count, days_to_keep;
  
  return deleted_count;
end;
$$;

-- 4. 統計情報更新
-- ========================================

-- テーブルの統計情報を更新
analyze pillow_diagnosis_logs;

-- 5. 監視用ビュー
-- ========================================

-- 日別診断数ビュー
create or replace view daily_diagnosis_stats as
select 
  date(created_at) as diagnosis_date,
  count(*) as total_diagnoses,
  count(distinct session_id) as unique_sessions,
  primary_category,
  avg(confidence) as avg_confidence
from pillow_diagnosis_logs
group by date(created_at), primary_category
order by diagnosis_date desc, total_diagnoses desc;

-- カテゴリ別統計ビュー
create or replace view category_stats as
select 
  primary_category,
  count(*) as total_count,
  avg(confidence) as avg_confidence,
  min(created_at) as first_diagnosis,
  max(created_at) as last_diagnosis
from pillow_diagnosis_logs
group by primary_category
order by total_count desc;

-- アウトバウンドクリック統計ビュー
create or replace view outbound_click_stats as
select 
  session_id,
  primary_category,
  outbound_clicks,
  created_at
from pillow_diagnosis_logs
where outbound_clicks is not null
  and (outbound_clicks->>'rakuten' != '0' 
       or outbound_clicks->>'yahoo' != '0' 
       or outbound_clicks->>'amazon' != '0')
order by created_at desc;

-- 6. 定期実行用のクリーンアップコマンド
-- ========================================

-- Supabase の cron/スケジュールドジョブで毎日実行する SQL:
-- select cleanup_old_diagnosis_logs(90);

-- または直接削除:
-- delete from pillow_diagnosis_logs where created_at < now() - interval '90 days';

-- 7. パフォーマンス監視クエリ
-- ========================================

-- テーブルサイズ確認
-- select 
--   schemaname,
--   tablename,
--   attname,
--   n_distinct,
--   correlation
-- from pg_stats 
-- where tablename = 'pillow_diagnosis_logs';

-- インデックス使用状況確認
-- select 
--   schemaname,
--   tablename,
--   indexname,
--   idx_scan,
--   idx_tup_read,
--   idx_tup_fetch
-- from pg_stat_user_indexes 
-- where tablename = 'pillow_diagnosis_logs';

-- 8. バックアップ・復旧用
-- ========================================

-- データエクスポート用クエリ（CSV出力）
-- copy (
--   select 
--     session_id,
--     primary_category,
--     confidence,
--     created_at,
--     outbound_clicks
--   from pillow_diagnosis_logs
--   where created_at >= current_date - interval '30 days'
-- ) to '/tmp/recent_diagnoses.csv' with csv header;

-- 注意事項:
-- ========================================
-- 1. 本番環境で実行前に必ずバックアップを取得してください
-- 2. RLSポリシーはセキュリティ要件に応じて調整してください
-- 3. インデックスはクエリパターンに応じて最適化してください
-- 4. クリーンアップ期間はビジネス要件に応じて調整してください 