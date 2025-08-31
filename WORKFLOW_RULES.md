# 記事作成ワークフロールール

## 新しい記事作成時の必須手順

### 1. 記事ファイル作成
- 適切なディレクトリに `.md` ファイルを作成
- ファイル名は日付形式: `YYYY-MM-DD-記事タイトル.md`
- フロントマターに必要なメタデータを設定

### 2. 記事カードの追加（必須）

#### A. ブログ一覧ページ (`pages/blog.tsx`)
- `articles` 配列の**最上部**に新しい記事を追加
- 以下の形式で記述:

```javascript
{
  slug: 'カテゴリ/タイプ/ファイル名（拡張子なし）',
  title: '記事タイトル',
  description: '記事の説明文',
  date: 'YYYY.MM.DD',
  category: 'カテゴリ名',
  emoji: '😴',
  color: 'from-indigo-400 to-indigo-600'
},
```

#### B. カテゴリ別ページ
- 該当するカテゴリページ（例: `pages/sleep-health.tsx`）に追加
- おすすめ商品セクションの**最上部**に配置

#### C. 新着記事セクション（ホームページ）
- ホームページ（`pages/index.tsx`）の新着記事セクションに追加
- **最上部**に配置（最新記事として表示）

#### D. Global Hot Picks セクション（ホームページ）
- **Global Hot Picks** カテゴリの記事を新規作成した場合、ホームページ（`pages/index.tsx`）の「Global Hot Picks」セクションを最新記事に更新
- 以下の2箇所を修正:

**1. リンクの更新:**
```javascript
// pages/index.tsx の Global Hot Picks セクション内
<Link href="/articles/global-hot-picks/trend/最新記事の日付" className="...">
  最新トレンドを見る
</Link>
```

**2. 商品カードの更新:**
```javascript
// 最新記事の内容に合わせて商品カードを更新
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
  <div className="bg-white rounded-xl p-4 shadow-sm">
    <div className="text-2xl mb-2">📷</div>
    <h4 className="font-semibold text-gray-900 mb-1">最新記事の商品1</h4>
    <p className="text-sm text-gray-600">商品1の説明</p>
  </div>
  // 商品2、商品3も同様に更新
</div>
```

#### E. 広告作成ルール（Global Hot Picks記事）
**重要：広告は記事ファイル（MDX）には記載せず、記事ページコンポーネントで管理**

**1. 記事ファイル（MDX）の作成:**
- 記事本文のみを作成
- 広告部分は記載しない
- 記事の最後に水平線（---）のみ追加

**2. 記事ページコンポーネントでの広告定義:**
- `pages/articles/[category]/[type]/[post].tsx` に広告セクションを追加
- 記事の`post`名に基づいて条件分岐で広告を表示
- 各商品ごとに個別の広告カードを作成

**広告の構造（記事ページコンポーネント）:**
```tsx
{post === '記事の日付' && (
  <section className="mt-8">
    <hr className="my-8 border-t-2 border-dashed border-gray-300" />
    <h3 className="text-lg font-bold mb-4 text-gray-700">
      🛒 以下、プロモーションリンク（広告）です
    </h3>

    {/* 商品1 - 購入はこちら */}
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <img src="商品画像URL" alt="商品名" className="w-48 h-48 object-cover rounded-lg" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">商品名</h4>
          <p className="text-sm text-gray-600 mb-4">商品説明</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="楽天アフィリエイトリンク" className="...">楽天市場で探す</a>
            <a href="Amazonリンク" className="...">Amazonで探す</a>
          </div>
          {/* ValueCommerce スクリプト */}
          <script type="text/javascript" src="//mlb.valuecommerce.com/mylinkbox.js" async></script>
          <div data-vc_mylinkbox_id="固有ID"></div>
        </div>
      </div>
    </div>
  </section>
)}
```

**注意事項:**
- 記事ファイルには広告を記載しない（8月13日以前の方式）
- 記事ページコンポーネントで広告を管理（8月6日〜8月12日の方式）
- ValueCommerce IDは各商品ごとに異なるIDを使用
- 楽天アフィリエイトリンクは該当商品の正しいリンクを使用
- 8月6日〜8月12日の記事を参考に統一された形式で作成

### 3. デプロイ手順
```bash
# 1. ビルド
npm run build

# 2. 本番デプロイ
vercel --prod
```

## 記事カードの優先順位

### ブログ一覧ページ
1. **最新記事** → 最上部
2. **人気記事** → 上位
3. **シリーズ記事** → まとめて配置

### カテゴリ別ページ
1. **最新記事** → 最上部
2. **関連記事** → 時系列順

### 新着記事セクション（ホームページ）
1. **最新記事** → 最上部（必須）
2. **最新3記事** → 表示対象
3. **時系列順** → 新しい順

## 記事カードのデザイン統一

### カラーパレット
- **睡眠・健康**: `from-indigo-100 to-indigo-200`
- **日本茶**: `from-green-100 to-green-200`
- **海外トレンド**: `from-blue-100 to-blue-200`
- **日本商品**: `from-red-100 to-red-200`

### 絵文字
- **睡眠・健康**: 😴
- **日本茶**: 🍵
- **海外トレンド**: 🌍
- **日本商品**: 🇯🇵

## チェックリスト

新しい記事作成時は以下を確認:

- [ ] 記事ファイルが適切なディレクトリに作成済み
- [ ] フロントマターのメタデータが正しく設定済み
- [ ] ブログ一覧ページに記事カードを追加済み
- [ ] カテゴリ別ページに記事カードを追加済み
- [ ] 新着記事セクション（ホームページ）に記事カードを追加済み
- [ ] **Global Hot Picks記事の場合**: ホームページの「Global Hot Picks」セクションのリンクと商品カードを最新記事に更新済み
- [ ] **Global Hot Picks記事の場合**: 記事ページコンポーネントに広告セクションを追加済み（記事ファイルには広告なし、記事ページコンポーネントで広告管理、各商品ごとに個別の広告カード、固有のValueCommerce ID）
- [ ] 記事カードのリンクが正しく設定済み
- [ ] ビルドが正常に完了
- [ ] 本番デプロイが完了
- [ ] 実際のサイトで記事が表示されることを確認

## 注意事項

- 記事カードの追加は**必須**です
- 記事カードなしでは記事にアクセスできません
- デプロイ前に必ずビルドテストを実行
- 記事カードの順序は最新記事を最上部に配置 