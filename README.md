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

#### 2. Global Hot Picksの最新記事表示
- Global Hot Picksカテゴリの記事は、最新の記事がトップに表示されるよう日付順でソートされます
- ホームページのGlobal Hot Picksセクションのリンクは、最新記事（最も新しい日付）を指すように更新してください
- **Global Hot Picksセクションの商品カードも最新記事の内容に合わせて更新してください**
- 記事のfrontmatterで `category: "global-hot-picks"` を設定してください

#### 3. 新着記事の表示
- 新着記事セクションは、全カテゴリの最新5件を日付順で表示します
- 記事のfrontmatterに `date` フィールドを必ず設定してください

### 自動化スクリプト
- `scripts/create-article.js` - 記事カード自動追加スクリプト
- `WORKFLOW_RULES.md` - ワークフロールール詳細

<!-- Force redeploy to clear Vercel cache - 2025-08-28 -->