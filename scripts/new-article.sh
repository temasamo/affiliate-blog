#!/bin/bash

# 記事雛形生成スクリプト
# 使用方法: ./scripts/new-article.sh <date> <category> <type> <slug>

if [ $# -ne 4 ]; then
    echo "使用方法: $0 <date> <category> <type> <slug>"
    echo "例: $0 2025-08-23 global-hot-picks trend 2025-08-23"
    exit 1
fi

DATE=$1
CATEGORY=$2
TYPE=$3
SLUG=$4

# ディレクトリ作成
mkdir -p "articles/${CATEGORY}/${TYPE}"

# ファイルパス
FILE_PATH="articles/${CATEGORY}/${TYPE}/${SLUG}.mdx"

# front-matterテンプレート
cat > "$FILE_PATH" << EOF
---
title: "Global Hot Picks | ${DATE}"
date: "${DATE}"
category: "trend"
tags: ["海外トレンド","Global Hot Picks"]
description: "（記事カード用の1〜2文要約をここに記載）"
---

## 商品名1 — サブタイトル
商品の説明文。特徴や人気の理由を簡潔に記載。

### Timeline
- **発売時期**　発売からの経緯や人気の変遷
- **現在**　現在のSNSでの話題状況

### Key Facts
- 主要な特徴1
- 主要な特徴2
- 主要な特徴3

### Where to Buy (JP)
※日本での取り扱い状況は記事下「商品お取り扱い状況」をご覧ください
- **公式サイト**：[商品名公式サイト](https://example.com)

---

## 商品名2 — サブタイトル
商品の説明文。特徴や人気の理由を簡潔に記載。

### Timeline
- **発売時期**　発売からの経緯や人気の変遷
- **現在**　現在のSNSでの話題状況

### Key Facts
- 主要な特徴1
- 主要な特徴2
- 主要な特徴3

### Where to Buy (JP)
※日本での取り扱い状況は記事下「商品お取り扱い状況」をご覧ください
- **公式サイト**：[商品名公式サイト](https://example.com)

---

> ※ここから下は広告（PR）です
> ※記事本文とは無関係のバナー／リンクが表示される場合があります

## 商品お取り扱い状況（${DATE} 時点）

### 商品名1
- **Amazon**: ◯
- **楽天市場**: ◯
- **Yahoo!**: ◯

### 商品名2
- **Amazon**: ◯
- **楽天市場**: ◯
- **Yahoo!**: ◯

---
EOF

echo "✅ 記事雛形を作成しました: $FILE_PATH"
echo ""
echo "📝 次の手順:"
echo "1. description を編集（記事カード用の1〜2文要約）"
echo "2. 商品情報を実際の内容に置き換え"
echo "3. 商品お取り扱い状況を更新"
echo "4. git add してコミット" 