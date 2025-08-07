# Global Hot Picks 記事フォーマットルール

## 記事構成

### 1. フロントマター
```yaml
---
title: "Global Hot Picks｜YYYY-MM-DD"
date: "YYYY-MM-DD"
description: "海外で急上昇中のガジェット＆コスメを3分でチェック！"
type: "trend"
tags: ["商品名1","商品名2","商品名3"]
featured: true
slug: "YYYY-MM-DD"
---
```

### 2. 記事本文
- 各商品のTimeline、Key Specs、Where to Buy (JP)セクション
- **Where to Buy (JP)は公式サイトリンク＋統一備考文**
- 統一備考文：「※上記以外の「お取り扱い状況」については、本記事末をご確認ください」
- 在庫可否やモールURLは記事末の「商品お取り扱い状況」で管理

### 3. 商品お取り扱い状況ブロック
- テーブルではなく見出し＋箇条書き形式
- フィールド順 = Amazon／楽天市場／Yahoo!
- 記事最終セクション直前に配置
- 記号: ◯（取扱あり）、△（一部取扱）、×（取扱なし）
- **広告リンク追加はこのセクションを差し替えるだけ**

### 4. 免責・リンクポリシー
- 記事の最後に配置

## 広告区切り

### ArticleDetail.tsx 側の設定
- `<hr>`＋見出し「🛒 以下、プロモーションリンク（広告）です」を自動挿入
- 新しい slug で GlobalHotPicksAffiliate を追加する場合も同ラップを踏襲すること

### 表示条件
```typescript
{post === 'YYYY-MM-DD' && (
  <section className="mt-8">
    <hr className="my-8 border-t-2 border-dashed border-gray-300" />
    <h3 className="text-lg font-bold mb-4 text-gray-700">
      🛒 以下、プロモーションリンク（広告）です
    </h3>
    {/* 各商品のGlobalHotPicksAffiliateコンポーネント */}
  </section>
)}
```

## 商品情報の管理

### GlobalHotPicksAffiliate コンポーネント
- 商品画像、商品名、各ECサイトのURLを管理
- アフィリエイトリンクの自動生成
- インプレッションタグの自動挿入

### 対応ECサイト
- **Amazon**: 直接リンク
- **楽天市場**: アフィリエイトリンク（Moshimo）
- **Yahoo!**: アフィリエイトリンク（ValueCommerce）
- **公式サイト**: 直接リンク

## 今後の執筆フロー

### Global Hot Picks 記事フォーマット

1. **本文中の `### Where to Buy (JP)` は**
   - 公式サイトリンク ＋ 統一備考文
   - 備考文：「※上記以外の「お取り扱い状況」については、本記事末をご確認ください」

2. **在庫可否やモール URL は記事末の**
   - `## 商品お取り扱い状況` テーブルで管理

3. **広告リンク追加はテーブル側を差し替えるだけ**

### 執筆手順
1. 記事本文を執筆（Where to Buy (JP)は公式サイト＋統一備考文）
2. 記事末に商品お取り扱い状況を追加
3. ArticleDetail.tsxで広告コンポーネントを設定
4. 広告リンクの変更は商品お取り扱い状況セクションのみ修正 