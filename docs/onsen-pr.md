# 全国温泉地PRプロジェクト – 開発進め方

## 🎯 プロジェクトの目的
- 日本全国200〜250の温泉地を「観光協会レベル」で網羅し記事化
- 各記事は **公式リンク＋宿泊予約導線（楽天/じゃらん/一休）** をセット
- SEOでロングテール検索を拾い、観光協会との連携実績も築く
- 信頼性と収益性を両立する「日本最大級の温泉情報プラットフォーム」を目指す

---

## 📝 記事制作ルール
- 記事は **.mdx** 形式で `/content/travel/onsen/{pref}/{onsen}.mdx` に配置
- フロントマター必須項目：
  ```yaml
  ---
  title: "下呂温泉（岐阜県）"
  date: "2025-08-27"
  category: "旅行"
  tags: ["温泉", "岐阜", "下呂温泉"]
  slug: "gero-onsen"
  description: "下呂温泉の歴史、アクセス、予算、観光、グルメ、宿泊情報を網羅。フォト利用は許可取得後に掲載。"
  published: true
  ---
  ```

### 記事本文の固定構成
1. **温泉の特徴と歴史**
2. **アクセス**
3. **旅行予算**
4. **周辺観光スポット**
5. **名物料理・ご当地グルメ**
6. **おすすめ旅館・ホテル**
7. **フォトギャラリー（NO IMAGEプレースホルダー3枚）**
8. **まとめ**

### 写真の取り扱い
写真は観光協会の利用許可が下りるまで「NO IMAGE」枠を表示

```html
<div style="text-align:center;margin:16px 0;">
  <p>NO IMAGE（許可申請中）</p>
  <img src="/images/no-image1.svg" alt="NO IMAGE" width="250" style="margin:6px;"/>
  <img src="/images/no-image2.svg" alt="NO IMAGE" width="250" style="margin:6px;"/>
  <img src="/images/no-image3.svg" alt="NO IMAGE" width="250" style="margin:6px;"/>
  <p style="font-size:12px;color:#64748b;">※観光協会に利用許可申請中です。許可が下り次第差し替えます。</p>
</div>
```

---

## 🗂 サイト構成

### 旅行カテゴリTOP
- 新着旅行記事（睡眠・日本茶なども含む）
- 全国温泉地ガイド（カード型グリッド → 後に地図ナビへ拡張）

### 都道府県別まとめページ
例：`/content/travel/onsen/gifu/index.mdx`

### 個別温泉記事
例：`/content/travel/onsen/gifu/gero-onsen.mdx`

---

## 🚀 開発ステップ

### 短期（公開優先）
- 各県のまとめページ＋代表的な1温泉記事を公開
- トップページに「新着記事」欄を新設

### 中期（拡張・充実）
- 各県で10本程度の記事を追加
- 写真利用許可取得 → NO IMAGE 差し替え
- 回遊性強化（次の記事リンクなど）

### 長期（完成形）
- 全国200〜250本の記事を揃える
- 日本地図ナビ導入
- 観光協会との共同プロモーション化

---

## ✅ 現在の進捗（2025-08-30時点）
- 岐阜まとめページ → 作成済み
- 下呂温泉記事 → 作成済み（NO IMAGE対応）
- 北海道まとめ＋定山渓温泉記事 → 次ステップで作成予定
- トップページ「新着記事」欄 → 実装予定

---

## 📋 都道府県別まとめページの構成

### 必須項目
- **冒頭リード**：県の温泉特徴を2–3文
- **温泉地カードの一覧**：最低1件は公開リンク、他は「準備中」
- **県内の観光公式サイトへのリンク**

### 任意項目
- アクセス概略（主要空港/都市→県の玄関口）
- 季節の見どころ（1行×3つ）
- 「公開予定リスト（進捗）」セクション

### 雛形（MDX）
```yaml
---
title: "岐阜の温泉地まとめ"
date: "2025-08-27"
category: "旅行"
slug: "gifu-onsen"
description: "岐阜県の主要温泉地を網羅。下呂・奥飛騨・平湯・福地・新穂高…"
published: true
---

# 岐阜の温泉地まとめ

飛騨の山並みと清流に抱かれた名湯が点在。まずは **下呂温泉** を公開、順次拡充します。

<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;margin-top:16px;">
  <a href="/travel/onsen/gifu/gero-onsen" style="text-decoration:none;border:1px solid #e5e7eb;border-radius:16px;padding:16px;display:block;">
    <div style="font-weight:700;margin-bottom:6px;">下呂温泉</div>
    <div style="font-size:12px;color:#6b7280;">日本三名泉の美肌の湯</div>
    <div style="margin-top:10px;font-size:12px;color:#334155;">→ 記事を読む</div>
  </a>
  <div style="border:1px dashed #d1d5db;border-radius:16px;padding:16px;">
    <div style="font-weight:700;margin-bottom:6px;">奥飛騨温泉郷</div>
    <div style="font-size:12px;color:#6b7280;">露天王国（新穂高/平湯/福地/栃尾/新平湯）</div>
    <div style="margin-top:10px;font-size:12px;color:#9ca3af;">準備中</div>
  </div>
  <!-- 他も同様 -->
</div>

**観光公式**：<https://www.kankou-gifu.jp/>
```

---

## 🎯 優先順位（公開ロードマップ）

### 運用方針
毎日2本：北ルート（北海道）＋南ルート（岐阜起点）

### 岐阜（南ルート）
1. 下呂（公開済）
2. 奥飛騨温泉郷（親） → 子として〔平湯／福地／新穂高／栃尾／新平湯〕
3. 白川郷（平瀬）
4. 飛騨高山温泉

### 北海道（北ルート）
1. 登別
2. 定山渓
3. 洞爺湖
4. 湯の川
5. 白金／支笏湖
6. 阿寒湖／川湯
7. ニセコ／富良野

### 進め方
県まとめ → 代表1件公開 → 以後、まとめページのカードを順次「準備中→リンク」に差し替え

---

## 🔧 技術仕様

### ディレクトリ構造
```
/content/travel/onsen/
  ├─ gifu/
  │   ├─ index.mdx           ← 県まとめ
  │   └─ gero-onsen.mdx      ← 個別記事
  └─ hokkaido/
      ├─ index.mdx
      ├─ noboribetsu.mdx
      └─ jozankei.mdx
```

### ルーティング
- `/pages/travel/onsen/[...slug].tsx` ← 汎用ルータ（既存の仕組みがあれば流用）

### アフィリエイトリンク管理
- 既存の `AffStoreLinks` を基本に、必要なら `OnsenBookingLinks` ラッパー
- 温泉用ラッパー例：
```tsx
import AffStoreLinks from "@/components/AffStoreLinks";

export default function OnsenBookingLinks({ keyword }: { keyword: string }) {
  return (
    <AffStoreLinks
      rakuten={`https://travel.rakuten.co.jp/search?kw=${encodeURIComponent(keyword)}`}
      jalan={`https://www.jalan.net/kankou/cty_${encodeURIComponent(keyword)}/`}
      ikyu={`https://www.ikyu.com/search/?kw=${encodeURIComponent(keyword)}`}
      label={`宿泊予約（${keyword}）`}
    />
  );
}
```

### NO IMAGE画像
- 場所：`/public/images/no-image{1..3}.svg`
- 新規作成が必要（なければ） 