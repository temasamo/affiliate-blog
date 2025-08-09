# 枕診断システム デプロイメントガイド

## 概要
このガイドでは、枕診断システムをVercelにデプロイする手順を説明します。

## 前提条件
- GitHubアカウント
- Vercelアカウント
- Supabaseプロジェクト

## 1. コードの準備

### 1.1 Gitリポジトリの確認
```bash
# 現在のブランチとステータスを確認
git status
git branch

# 変更をコミット
git add .
git commit -m "Add pillow diagnosis system with validation and error handling"

# リモートリポジトリにプッシュ
git push origin main
```

### 1.2 本番用の設定確認
以下のファイルが正しく設定されていることを確認：
- `next.config.js`
- `package.json`
- `tsconfig.json`

## 2. Vercelでのデプロイ

### 2.1 Vercelプロジェクトの作成
1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセス
2. "New Project" をクリック
3. GitHubリポジトリを選択
4. プロジェクト名を設定（例：`pillow-diagnosis-system`）

### 2.2 環境変数の設定
Vercelプロジェクトの設定で以下の環境変数を追加：

#### 必須環境変数
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_KEY=your-anon-key
```

#### 設定手順
1. Vercelプロジェクトの "Settings" タブを開く
2. "Environment Variables" セクションを開く
3. 以下の変数を追加：

| 名前 | 値 | 環境 |
|------|-----|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_KEY` | `your-anon-key` | Production, Preview, Development |

### 2.3 Supabase設定の確認
Supabaseプロジェクトで以下を確認：

1. **RLSポリシーの有効化**
```sql
-- テーブルでRLSを有効化
alter table pillow_diagnosis_logs enable row level security;

-- ポリシーを適用
create policy "Enable insert for all users"
on pillow_diagnosis_logs
for insert with check (true);

create policy "Enable select for all users"
on pillow_diagnosis_logs
for select using (true);

create policy "Enable update for outbound clicks"
on pillow_diagnosis_logs
for update using (true)
with check (true);
```

2. **インデックスの作成**
```sql
-- パフォーマンス向上のためのインデックス
create index if not exists idx_pillow_created_at 
on pillow_diagnosis_logs(created_at desc);

create index if not exists idx_pillow_session_id 
on pillow_diagnosis_logs(session_id);

create index if not exists idx_pillow_primary_category 
on pillow_diagnosis_logs(primary_category);
```

## 3. デプロイの実行

### 3.1 自動デプロイ
GitHubにプッシュすると自動的にデプロイが開始されます。

### 3.2 手動デプロイ
Vercel Dashboardから手動でデプロイすることも可能です。

## 4. デプロイ後の確認

### 4.1 基本的な動作確認
1. デプロイされたURLにアクセス
2. `/pillow-diagnosis` ページが正常に表示されることを確認
3. フォームが正常に動作することを確認

### 4.2 API動作確認
```bash
# 診断データの送信テスト
curl -X POST https://your-domain.vercel.app/api/pillow-diagnosis-log \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "test-deploy-123",
    "answers": {"sleepPosition": "side"},
    "scores": {"adjustable": 8, "side_sleep": 5},
    "primary_category": "adjustable",
    "secondary_categories": ["side_sleep"],
    "confidence": 0.85,
    "reasons": ["横向き寝に最適化"],
    "outbound_clicks": {"rakuten": 0, "yahoo": 0, "amazon": 0},
    "purchase_signal": false,
    "satisfaction_quick": null
  }'
```

### 4.3 ブラウザでの確認
1. ブラウザの開発者ツールを開く
2. Network タブを開く
3. フォームを送信
4. `POST /api/pillow-diagnosis-log` が 200 で成功することを確認

### 4.4 データベース確認
Supabase Dashboardで以下を確認：
1. `pillow_diagnosis_logs` テーブルにレコードが追加されている
2. データが正しい形式で保存されている

## 5. 本番環境での監視

### 5.1 Vercel Analytics
- Vercel Dashboardでパフォーマンスを監視
- エラー率を確認

### 5.2 Supabase Monitoring
- Supabase Dashboardでデータベースの使用状況を監視
- クエリパフォーマンスを確認

### 5.3 ログ監視
- Vercel Functions のログを確認
- エラーが発生していないかチェック

## 6. トラブルシューティング

### 6.1 よくある問題

#### 環境変数が読み込まれない
- Vercelの環境変数設定を再確認
- デプロイ後に環境変数が反映されるまで数分待つ

#### APIエラーが発生する
- SupabaseのRLSポリシーが正しく設定されているか確認
- 環境変数の値が正しいか確認

#### フォームが送信できない
- ブラウザのコンソールでエラーを確認
- ネットワークタブでリクエストの詳細を確認

### 6.2 デバッグ方法
1. Vercel Functions のログを確認
2. ブラウザの開発者ツールでエラーを確認
3. Supabase Dashboardでデータベースの状態を確認

## 7. セキュリティ考慮事項

### 7.1 環境変数の管理
- 本番環境の環境変数は適切に管理
- 機密情報はGitにコミットしない

### 7.2 RLSポリシー
- 必要最小限の権限のみを付与
- 定期的にポリシーを見直し

### 7.3 入力値検証
- フロントエンドとバックエンドの両方でバリデーション
- SQLインジェクション対策

## 8. パフォーマンス最適化

### 8.1 データベース最適化
- インデックスの効果を監視
- 不要なデータの定期的な削除

### 8.2 フロントエンド最適化
- 画像の最適化
- コード分割の活用

## 9. 更新とメンテナンス

### 9.1 定期的な更新
- 依存関係の更新
- セキュリティパッチの適用

### 9.2 バックアップ
- データベースの定期的なバックアップ
- 設定ファイルのバックアップ

---

## サポート
問題が発生した場合は、以下を確認してください：
1. Vercel Dashboardのログ
2. Supabase Dashboardのログ
3. ブラウザの開発者ツール
4. このドキュメントのトラブルシューティングセクション 