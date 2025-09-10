# Affiliate Project 概要

本プロジェクトは、以下の4本柱を軸にしたアフィリエイト型コンテンツサイトの構築を目的としています。

1. **睡眠・健康**  
   国内3社（Amazon / 楽天 / Yahoo）の比較をベースに、ランキング記事や商品レビューを提供。
   
2. **日本茶関連**  
   日本茶の魅力や商品レビュー、健康効果、海外展開に関する記事を展開。
   
3. **海外で人気の日本由来のもの**  
   海外観光客・インバウンド向けに日本の人気商品や文化を紹介。
   
4. **Overseas Trend（海外トレンド）**  
   海外SNSやAmazon USなどで話題になった商品を、日本でも購入できる形で紹介。  
   国内未発売や入手困難なアイテムを先取りして情報提供。

---

## 📂 ディレクトリ構成（予定）

affiliate-blog/
├── articles/ # 各記事（Markdown）
├── pages/ # 各カテゴリページ
│ ├── sleep-health.tsx
│ ├── japanese-tea.tsx
│ ├── japan-popular.tsx
│ └── overseas-trend.tsx
├── data/ # 記事データや設定
├── images/ # 画像素材
└── README.md


---

## 🚀 実装予定機能

- カテゴリ別ページでの記事一覧表示
- 各記事ページにアフィリエイトリンクと関連商品紹介
- AIお助けボットによる購入相談機能
- 将来的に自動データ収集・ランキング生成の部分的実装

---

## 📝 今後の予定

1. 7月分の記事を完成 → HPに掲載
2. 8月以降は季節変化・代替テーマを組み合わせて継続
3. 各カテゴリの「知識・教養記事」も並行して作成
4. お助けAIボットとの連動機能の実装

---

## 🚀 記事作成ワークフロー

### 新しい記事作成時の手順

1. **記事ファイル作成**
   ```bash
   # articles/カテゴリ/タイプ/YYYY-MM-DD-記事タイトル.md を作成
   ```

2. **記事カードの自動追加**
   ```bash
   npm run add-article "カテゴリ/タイプ/ファイル名" "記事タイトル" "記事の説明文" "YYYY.MM.DD"
   ```
   
   ※ 自動的に以下に追加されます：
   - ブログ一覧ページ
   - カテゴリ別ページ
   - 新着記事セクション（ホームページ）

3. **デプロイ**
   ```bash
   npm run build
   vercel --prod
   ```

### 詳細なワークフロー
詳細は `WORKFLOW_RULES.md` を参照してください。

### 記事デプロイ時のルール

#### 1. 各カテゴリへの格納
新しい記事を作成する際は、適切なカテゴリディレクトリに格納してください：

- **睡眠・健康**: `articles/sleep-health/`
- **日本茶関連**: `articles/japanesetea/`
- **海外トレンド**: `articles/global-hot-picks/`
- **人気の日本商品**: `articles/japaneseproducts-popular-with-foreigners/`
- **旅行**: `content/travel/`
- **診断AI**: `content/blog/diagnostic-ai/`

#### 2. Global Hot Picksの最新記事表示
- Global Hot Picksカテゴリの記事は、最新の記事がトップに表示されるよう日付順でソートされます
- **新しいGlobal Hot Picks記事を作成したら、ホームページ（pages/index.tsx）のGlobal Hot Picksセクションを必ず更新してください**
- 更新箇所：
  1. リンク先を最新記事の日付に変更（例：`/articles/global-hot-picks/trend/2025-08-28`）
  2. 商品カードの内容を最新記事の商品に合わせて更新
  3. アイコンと商品名、説明文を最新記事の内容に変更
- 記事のfrontmatterで `category: "global-hot-picks"` を設定してください

#### 3. Global Hot Picks記事のタイトル形式
- **統一されたタイトル形式**: `"Global Hot Picks | YYYY-MM-DD"`
- **例**: `"Global Hot Picks | 2025-08-28"`
- **slug形式**: `"YYYY-MM-DD"`（例：`"2025-08-28"`）
- **ファイル名**: `YYYY-MM-DD.mdx`（例：`2025-08-28.mdx`）
- **注意**: タイトルに商品名や説明を含めず、日付のみで統一してください

#### 4. 新着記事の表示
- 新着記事セクションは、全カテゴリの最新5件を日付順で表示します
- 記事のfrontmatterに `date` フィールドを必ず設定してください

### 🚨 新着記事デプロイ時のチェックポイント

#### 事前チェック（ローカル開発時）

1. **フロントマターの確認**
   ```bash
   # 記事ファイルのフロントマターが正しく解析されているか確認
   curl -s http://localhost:3000/api/debug/latest | jq .
   ```
   - `title`: 正しいタイトルが表示されているか
   - `category`: 適切なカテゴリが設定されているか
   - `date`: 日付が正しく設定されているか
   - `published`: `true` になっているか

2. **新着記事セクションの表示確認**
   ```bash
   # ホームページで新着記事が正しく表示されているか確認
   curl -s http://localhost:3000/ | grep -A 5 -B 5 "記事タイトル"
   ```
   - 記事が新着記事の1位に表示されているか
   - 記事カードが正常に表示されているか
   - リンクが正しく機能しているか

3. **記事ページの表示確認**
   ```bash
   # 記事ページが正常に表示されるか確認
   curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/記事のパス
   ```
   - 200ステータスが返されるか
   - 記事内容が正しく表示されるか

4. **カテゴリページでの表示確認**
   - 該当するカテゴリページで記事が表示されているか
   - 診断AI記事の場合は `/diagnostic-ai` ページで表示されているか

#### デプロイ後の確認

1. **本番環境での表示確認**
   ```bash
   # 本番環境で新着記事が正しく表示されているか確認
   curl -s https://www.marketsupporter-ai.com/ | grep -A 5 -B 5 "記事タイトル"
   ```

2. **記事ページの本番確認**
   ```bash
   # 本番環境で記事ページが正常に表示されるか確認
   curl -s -o /dev/null -w "%{http_code}" https://www.marketsupporter-ai.com/記事のパス
   ```

#### よくある問題と対処法

1. **フロントマター解析エラー**
   - 問題: `title`、`category`、`date` が `null` や空文字になる
   - 原因: フロントマターの構文エラー（余分な `---` など）
   - 対処: フロントマターの構文を修正

2. **新着記事に表示されない**
   - 問題: 記事が新着記事セクションに表示されない
   - 原因: `date` フィールドが設定されていない、または `published: false`
   - 対処: フロントマターに `date` と `published: true` を追加

3. **記事カードのリンク切れ**
   - 問題: 新着記事カードをクリックしても記事ページに遷移しない
   - 原因: ルーティング設定の問題
   - 対処: `components/LatestPosts.tsx` の `getArticlePath` 関数を確認

4. **記事ページが500エラー**
   - 問題: 記事ページにアクセスすると500エラーが発生
   - 原因: MDXの構文エラー、またはフロントマターの問題
   - 対処: ローカルで `pnpm dev` を再起動し、エラーログを確認

#### デバッグ用API

新着記事の取得状況を確認するためのデバッグAPIが利用可能です：
```bash
# 新着記事の取得状況を確認
curl -s http://localhost:3000/api/debug/latest | jq .
```

このAPIを使用して、記事が正しく読み込まれているか、フロントマターが正しく解析されているかを確認できます。

### 自動化スクリプト
- `scripts/create-article.js` - 記事カード自動追加スクリプト
- `WORKFLOW_RULES.md` - ワークフロールール詳細

<!-- Force redeploy to clear Vercel cache - 2025-08-28 -->
---

## 🔥 Global Hot Picks MDXシステム

### 概要
Global Hot Picks記事は、`next-mdx-remote`を使用した特別なMDXシステムで動作します。これにより、記事内でReactコンポーネント（特にアフィリエイトリンク）を直接使用できます。

### 技術仕様

#### 1. MDX処理パイプライン
- **通常記事**: `unified` + `remark` でMarkdownをHTMLに変換
- **Global Hot Picks**: `next-mdx-remote` でMDXをReactコンポーネントとして処理

#### 2. ファイル構成
```
articles/global-hot-picks/trend/YYYY-MM-DD.mdx  # 記事ファイル
components/MdxRendererHotPicks.tsx              # MDX専用レンダラー
lib/mdx-hotpicks.ts                            # MDX処理ユーティリティ
components/AffStoreLinks.tsx                   # アフィリエイトリンクコンポーネント
utils/aff.ts                                   # アフィリエイトURL生成
```

#### 3. 記事作成ルール

**フロントマター形式**
```yaml
---
title: "【2025年MM月DD日版】Global Hot Picks：商品名1 & 商品名2"
date: "2025-MM-DD"
slug: "YYYY-MM-DD"  # ファイル名と同じ形式
category: "Global Hot Picks"  # 大文字小文字を正確に
tags: ["商品名1", "商品名2", "海外トレンド", "カテゴリ1", "カテゴリ2"]
description: "海外で爆発的人気の商品1と商品2をピックアップ。日本での購入導線・在庫状況もあわせてチェック。"
published: true
---
```

**アフィリエイトリンクの使用方法**
```mdx
### 商品名
- Amazon.co.jp：◯  
- 楽天市場：◯  
- Yahoo!ショッピング：◯  
<AffStoreLinks amazon="true" rakuten="true" yahoo="true" keyword="商品名" />
```

**重要な注意事項**
- ❌ **import文は不要**: `import AffStoreLinks from "@/components/AffStoreLinks"` は書かない
- ✅ **keywordパラメータは必須**: アフィリンクを表示するには必ず`keyword`を指定
- ✅ **フラグの指定**: `amazon="true"` または `amazon` の形式で指定

#### 4. 環境変数設定

**必須環境変数**
```bash
# Amazon（もしもアフィリエイト）
NEXT_PUBLIC_AMAZON_MODE=moshimo
NEXT_PUBLIC_MOSHIMO_AMAZON_BASE=https://af.moshimo.com/af/c/click?a_id=5122703&p_id=170&pc_id=185&pl_id=4064
NEXT_PUBLIC_AMAZON_TAG=your-amazon-tag-here

# 楽天（実際の楽天アフィリエイトURLに変更必要）
NEXT_PUBLIC_RAKUTEN_ENTRANCE_URL=https://hb.afl.rakuten.co.jp/hgc/xxxxxxxx/

# Yahoo!（実際のValueCommerceのSID/PIDに変更必要）
NEXT_PUBLIC_YAHOO_ENTRANCE_URL=https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=実際のSID&pid=実際のPID
```

#### 5. 開発・デバッグ

**開発サーバー起動**
```bash
npm run dev
```

**記事の動作確認**
```bash
# 記事が正常に表示されるか確認
curl -s "http://localhost:3000/articles/global-hot-picks/trend/YYYY-MM-DD" | head -10

# アフィリンクが正しく生成されているか確認
curl -s "http://localhost:3000/articles/global-hot-picks/trend/YYYY-MM-DD" | grep -A 3 -B 3 "Amazonで探す"
```

**よくある問題と対処法**

1. **MDXコンパイルエラー**
   - 原因: import文が残っている
   - 対処: 記事ファイルから`import AffStoreLinks`行を削除

2. **アフィリンクが表示されない**
   - 原因: `keyword`パラメータが未指定
   - 対処: `<AffStoreLinks ... keyword="商品名" />` を追加

3. **環境変数エラー**
   - 原因: 環境変数が未設定または間違った値
   - 対処: `.env.local`の環境変数を確認・修正

4. **モジュール解決エラー**
   - 原因: ファイルパスの問題
   - 対処: キャッシュクリア `rm -rf .next && npm run dev`

#### 6. デプロイ時の注意事項

1. **ローカル確認必須**: デプロイ前に必ずローカルで動作確認
2. **環境変数確認**: 本番環境でもアフィリエイトURLが正しく設定されているか確認
3. **記事リンク確認**: ホームページとカテゴリページで記事が正しく表示されるか確認

### システムの利点

- ✅ **柔軟なコンポーネント使用**: 記事内でReactコンポーネントを直接使用可能
- ✅ **統一されたアフィリエイト管理**: すべてのアフィリンクが`utils/aff.ts`で一元管理
- ✅ **SSR/CSR一貫性**: サーバーとクライアントで同じ出力を保証
- ✅ **開発効率向上**: 記事作成時にimport文を書く必要がない

