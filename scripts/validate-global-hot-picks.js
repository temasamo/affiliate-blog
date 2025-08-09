#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// マスターカテゴリ定義
const MASTER_CATEGORIES = [
  'gadget',
  'home-kitchen', 
  'beauty',
  'fitness',
  'toy-collectible',
  'food-bev',
  'outdoor-travel',
  'fashion'
];

// バリデーション関数
function validateFrontMatter(frontMatter, filename) {
  const errors = [];
  const warnings = [];

  // 必須項目チェック
  if (!frontMatter.cats) {
    errors.push('cats配列が存在しません');
  } else {
    // cats配列の形式チェック
    if (!Array.isArray(frontMatter.cats)) {
      errors.push('catsは配列である必要があります');
    } else {
      // カテゴリ数チェック
      if (frontMatter.cats.length < 2 || frontMatter.cats.length > 3) {
        errors.push(`cats配列は2〜3個のカテゴリを含む必要があります（現在: ${frontMatter.cats.length}個）`);
      }

      // 重複チェック
      const uniqueCats = [...new Set(frontMatter.cats)];
      if (uniqueCats.length !== frontMatter.cats.length) {
        errors.push('cats配列に重複があります');
      }

      // 有効なカテゴリかチェック
      const invalidCats = frontMatter.cats.filter(cat => !MASTER_CATEGORIES.includes(cat));
      if (invalidCats.length > 0) {
        errors.push(`無効なカテゴリ: ${invalidCats.join(', ')}`);
      }
    }
  }

  // jp_spotlightチェック
  if (typeof frontMatter.jp_spotlight !== 'boolean') {
    errors.push('jp_spotlightはboolean値である必要があります');
  }

  return { errors, warnings };
}

// 週次カテゴリ分布チェック
function checkWeeklyDistribution(articles) {
  const weeklyCats = new Set();
  const catCounts = {};
  
  articles.forEach(article => {
    if (article.cats) {
      article.cats.forEach(cat => {
        weeklyCats.add(cat);
        catCounts[cat] = (catCounts[cat] || 0) + 1;
      });
    }
  });

  const warnings = [];
  
  if (weeklyCats.size < 6) {
    warnings.push(`週内カテゴリ数が少なすぎます（現在: ${weeklyCats.size}個、目標: 6個以上）`);
  }

  // カテゴリの偏りチェック
  const maxCount = Math.max(...Object.values(catCounts));
  const minCount = Math.min(...Object.values(catCounts));
  if (maxCount - minCount > 2) {
    warnings.push('カテゴリの分布に偏りがあります');
  }

  return { weeklyCats: weeklyCats.size, catCounts, warnings };
}

// 連続カテゴリチェック
function checkConsecutiveCategories(articles) {
  const warnings = [];
  
  for (let i = 2; i < articles.length; i++) {
    const current = articles[i];
    const prev1 = articles[i - 1];
    const prev2 = articles[i - 2];
    
    if (current.cats && prev1.cats && prev2.cats) {
      const currentCats = new Set(current.cats);
      const prev1Cats = new Set(prev1.cats);
      const prev2Cats = new Set(prev2.cats);
      
      // 3日連続で同じカテゴリがあるかチェック
      const intersection = new Set([...currentCats].filter(x => prev1Cats.has(x) && prev2Cats.has(x)));
      if (intersection.size > 0) {
        warnings.push(`${current.date}: 同一カテゴリが3日連続しています (${Array.from(intersection).join(', ')})`);
      }
    }
  }
  
  return warnings;
}

// メイン処理
function main() {
  const articlesDir = path.join(__dirname, '../articles/global-hot-picks');
  const files = fs.readdirSync(articlesDir)
    .filter(file => file.endsWith('.mdx') && file.match(/^\d{4}-\d{2}-\d{2}\.mdx$/))
    .sort();

  console.log('🔍 Global Hot Picks バリデーション開始\n');

  const articles = [];
  let hasErrors = false;

  // 各ファイルをチェック
  files.forEach(file => {
    const filePath = path.join(articlesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontMatter } = matter(content);
    
    console.log(`📄 ${file}`);
    
    const { errors, warnings } = validateFrontMatter(frontMatter, file);
    
    if (errors.length > 0) {
      hasErrors = true;
      errors.forEach(error => console.log(`  ❌ ${error}`));
    }
    
    if (warnings.length > 0) {
      warnings.forEach(warning => console.log(`  ⚠️  ${warning}`));
    }
    
    if (errors.length === 0 && warnings.length === 0) {
      console.log('  ✅ OK');
    }
    
    articles.push({
      date: frontMatter.date,
      cats: frontMatter.cats || [],
      jp_spotlight: frontMatter.jp_spotlight
    });
    
    console.log('');
  });

  // 週次チェック
  if (articles.length > 0) {
    console.log('📊 週次分析');
    const { weeklyCats, catCounts, warnings } = checkWeeklyDistribution(articles);
    const consecutiveWarnings = checkConsecutiveCategories(articles);
    
    console.log(`  週内カテゴリ数: ${weeklyCats}個`);
    console.log('  カテゴリ別登場回数:');
    Object.entries(catCounts).forEach(([cat, count]) => {
      console.log(`    ${cat}: ${count}回`);
    });
    
    warnings.forEach(warning => console.log(`  ⚠️  ${warning}`));
    consecutiveWarnings.forEach(warning => console.log(`  ⚠️  ${warning}`));
  }

  // 結果サマリー
  console.log('\n📋 サマリー');
  if (hasErrors) {
    console.log('❌ エラーが検出されました。修正が必要です。');
    process.exit(1);
  } else {
    console.log('✅ すべてのファイルが正常です。');
  }
}

// スクリプト実行
if (require.main === module) {
  main();
}

module.exports = {
  validateFrontMatter,
  checkWeeklyDistribution,
  checkConsecutiveCategories,
  MASTER_CATEGORIES
}; 