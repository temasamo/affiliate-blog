#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 記事カードのテンプレート
const articleCardTemplate = (article) => `    {
      slug: '${article.slug}',
      title: '${article.title}',
      description: '${article.description}',
      date: '${article.date}',
      category: '${article.category}',
      emoji: '${article.emoji}',
      color: '${article.color}'
    },`;

// カテゴリ別ページの記事カードテンプレート
const categoryCardTemplate = (article) => `              <Link href="/articles/${article.slug}" className="group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    ${article.title}
                  </h3>
                  <p className="text-sm text-gray-600">${article.description}</p>
                  <div className="mt-3 flex items-center text-xs text-blue-600">
                    <span>詳細を見る</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>`;

// 新着記事セクションの記事カードテンプレート
const latestArticleCardTemplate = (article) => `            <Link href="/articles/${article.slug}" className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover">
                <CategoryImage category="${article.category}" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    ${article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">${article.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>${article.date}</span>
                  </div>
                </div>
              </div>
            </Link>`;

// カテゴリ設定
const categoryConfig = {
  'sleep-health': {
    emoji: '😴',
    color: 'from-indigo-100 to-indigo-200',
    pageFile: 'pages/sleep-health.tsx'
  },
  'japanese-tea': {
    emoji: '🍵',
    color: 'from-green-100 to-green-200',
    pageFile: 'pages/japanese-tea.tsx'
  },
  'overseas-trend': {
    emoji: '🌍',
    color: 'from-blue-100 to-blue-200',
    pageFile: 'pages/overseas-trend.tsx'
  },
  '海外トレンド': {
    emoji: '🌍',
    color: 'from-blue-100 to-blue-200',
    pageFile: 'pages/overseas-trend.tsx'
  },
  'popularproducts-overseas': {
    emoji: '🌍',
    color: 'from-blue-100 to-blue-200',
    pageFile: 'pages/overseas-trend.tsx'
  },
  'japan-popular': {
    emoji: '🇯🇵',
    color: 'from-red-100 to-red-200',
    pageFile: 'pages/japan-popular.tsx'
  }
};

function addArticleCard(article) {
  console.log('📝 記事カードを追加中...');
  
  // 1. ブログ一覧ページに追加
  const blogPagePath = 'pages/blog.tsx';
  let blogContent = fs.readFileSync(blogPagePath, 'utf8');
  
  // articles配列の最初の位置に新しい記事を追加
  const articlesStart = blogContent.indexOf('  const articles = [');
  const firstArticleStart = blogContent.indexOf('    {', articlesStart);
  
  const newArticleCard = articleCardTemplate(article);
  const updatedBlogContent = 
    blogContent.slice(0, firstArticleStart) + 
    newArticleCard + '\n' +
    blogContent.slice(firstArticleStart);
  
  fs.writeFileSync(blogPagePath, updatedBlogContent);
  console.log('✅ ブログ一覧ページに記事カードを追加しました');
  
  // 2. カテゴリ別ページに追加
  const category = article.slug.split('/')[0];
  const categoryConfig = getCategoryConfig(category);
  
  if (categoryConfig && fs.existsSync(categoryConfig.pageFile)) {
    let categoryContent = fs.readFileSync(categoryConfig.pageFile, 'utf8');
    
    // おすすめ商品セクションの最初に追加
    const gridStart = categoryContent.indexOf('            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">');
    const firstCardStart = categoryContent.indexOf('              <Link href="/articles/', gridStart);
    
    const newCategoryCard = categoryCardTemplate(article);
    const updatedCategoryContent = 
      categoryContent.slice(0, firstCardStart) + 
      newCategoryCard + '\n              ' +
      categoryContent.slice(firstCardStart);
    
    fs.writeFileSync(categoryConfig.pageFile, updatedCategoryContent);
    console.log(`✅ ${categoryConfig.pageFile}に記事カードを追加しました`);
  }
  
  // 3. 新着記事セクションに追加（ホームページ）
  const homePagePath = 'pages/index.tsx';
  if (fs.existsSync(homePagePath)) {
    let homeContent = fs.readFileSync(homePagePath, 'utf8');
    
    // 新着記事セクションの最初に追加
    const latestSectionStart = homeContent.indexOf('          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">');
    const firstLatestCardStart = homeContent.indexOf('            <Link href="/articles/', latestSectionStart);
    
    const newLatestArticleCard = latestArticleCardTemplate(article);
    const updatedHomeContent = 
      homeContent.slice(0, firstLatestCardStart) + 
      newLatestArticleCard + '\n            ' +
      homeContent.slice(firstLatestCardStart);
    
    fs.writeFileSync(homePagePath, updatedHomeContent);
    console.log('✅ ホームページの新着記事セクションに記事カードを追加しました');
  }
}

function getCategoryConfig(category) {
  return categoryConfig[category] || null;
}

function validateArticle(article) {
  const required = ['slug', 'title', 'description', 'date', 'category'];
  const missing = required.filter(field => !article[field]);
  
  if (missing.length > 0) {
    throw new Error(`必須フィールドが不足しています: ${missing.join(', ')}`);
  }
  
  const category = article.slug.split('/')[0];
  if (!categoryConfig[category]) {
    throw new Error(`不明なカテゴリ: ${category}`);
  }
  
  // カテゴリ設定を適用
  article.emoji = categoryConfig[category].emoji;
  article.color = categoryConfig[category].color;
}

// コマンドライン引数から記事情報を取得
function parseArguments() {
  const args = process.argv.slice(2);
  
  if (args.length < 4) {
    console.log('使用方法: node create-article.js <slug> <title> <description> <date>');
    console.log('例: node create-article.js "sleep-health/recomend/2025-08-05-new-article" "新しい記事タイトル" "記事の説明文" "2025.08.05"');
    process.exit(1);
  }
  
  const [slug, title, description, date] = args;
  const category = slug.split('/')[0];
  
  return {
    slug,
    title,
    description,
    date,
    category
  };
}

// メイン実行
try {
  const article = parseArguments();
  validateArticle(article);
  addArticleCard(article);
  
  console.log('\n🎉 記事カードの追加が完了しました！');
  console.log('\n次の手順:');
  console.log('1. npm run build');
  console.log('2. vercel --prod');
  console.log('3. サイトで記事が表示されることを確認');
  
} catch (error) {
  console.error('❌ エラー:', error.message);
  process.exit(1);
} 