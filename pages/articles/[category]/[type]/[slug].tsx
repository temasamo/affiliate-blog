import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

interface ArticleProps {
  content: string;
  frontMatter: {
    title?: string;
    date?: string;
    category?: string;
    description?: string;
    [key: string]: any;
  };
  category: string;
  type: string;
  slug: string;
}

export default function ArticleDetail({ content, frontMatter, category, type, slug }: ArticleProps) {
  const title = frontMatter.title || '商品比較・ランキング';
  const description = frontMatter.description || `Market Supporter AIが提供する${title}の詳細情報です。`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={`${title} - Market Supporter AI`}
        description={description}
      />

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* パンくずリスト */}
        <nav className="mb-6 sm:mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                ホーム
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href={`/${category}`} className="hover:text-blue-600 transition-colors">
                {getCategoryName(category)}
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <span className="text-gray-900">{title}</span>
            </li>
          </ol>
        </nav>

        {/* 記事ヘッダー */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {getCategoryName(category)}
            </span>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {type === 'recomend' ? 'おすすめ商品' : '知識・情報'}
            </span>
            <span className="text-xs sm:text-sm text-gray-500">
              {frontMatter.date || '2025.07.01'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          {frontMatter.description && (
            <p className="text-sm sm:text-base text-gray-600">
              {frontMatter.description}
            </p>
          )}
        </div>

        {/* 記事本文 */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
          <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </article>
        </div>

        {/* 関連記事 */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mt-6 sm:mt-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">関連記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {getRelatedArticles(category, type).map((article, index) => (
              <Link key={index} href={article.href} className="group">
                <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">
                    {article.excerpt}
                  </p>
                  <span className="text-xs text-gray-500">{article.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* カテゴリ一覧 */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mt-6 sm:mt-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">カテゴリ別商品比較</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/sleep-health" className="group">
              <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-2xl mb-2">😴</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">睡眠・健康</h3>
                <p className="text-xs sm:text-sm text-gray-600">枕・マットレス・睡眠改善</p>
              </div>
            </Link>
            <Link href="/japanese-tea" className="group">
              <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-2xl mb-2">🍵</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">日本茶</h3>
                <p className="text-xs sm:text-sm text-gray-600">緑茶・抹茶・お茶文化</p>
              </div>
            </Link>
            <Link href="/overseas-trend" className="group">
              <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-2xl mb-2">🌍</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">海外トレンド</h3>
                <p className="text-xs sm:text-sm text-gray-600">海外で話題の商品</p>
              </div>
            </Link>
            <Link href="/japan-popular" className="group">
              <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-2xl mb-2">🇯🇵</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">人気の日本商品</h3>
                <p className="text-xs sm:text-sm text-gray-600">国内で注目のアイテム</p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// カテゴリ名を取得する関数
function getCategoryName(category: string): string {
  const categoryNames: { [key: string]: string } = {
    'sleep-health': '睡眠・健康',
    'japanesetea': '日本茶',
    'popularproducts-overseas': '海外トレンド',
    'japaneseproducts-popular-with-foreigners': '人気の日本商品'
  };
  return categoryNames[category] || category;
}

// 関連記事を取得する関数
function getRelatedArticles(category: string, type: string) {
  const relatedArticles: { [key: string]: any[] } = {
    'sleep-health': [
      {
        title: '枕総合ランキング',
        excerpt: '価格・機能・口コミの3軸で徹底比較',
        date: '2025.07.01',
        href: '/articles/sleep-health/recomend/2025-07-01-makura-ranking'
      },

    ],
    'japanesetea': [
      {
        title: '抹茶セットおすすめ',
        excerpt: '本格抹茶の選び方とおすすめ商品',
        date: '2025.07.31',
        href: '/articles/japanesetea/recomend/250731matcha-set-recommend-dm'
      },
      {
        title: '急須ランキング',
        excerpt: '本格的な日本茶を楽しむ急須選び',
        date: '2025.07.31',
        href: '/articles/japanesetea/recomend/250731kyusu-ranking-dm'
      }
    ],
    'japaneseproducts-popular-with-foreigners': [
      {
        title: '人気の日本食品2025',
        excerpt: '外国人に人気の日本食品ランキング',
        date: '2025.07.31',
        href: '/articles/japaneseproducts-popular-with-foreigners/recomend/250731popular-japanese-foods-2025-dm'
      },
      {
        title: 'バズる抹茶スイーツ',
        excerpt: 'SNSで話題の抹茶スイーツ特集',
        date: '2025.08.01',
        href: '/articles/japaneseproducts-popular-with-foreigners/recomend/250801viral-matcha-sweets-dm'
      }
    ]
  };
  
  return relatedArticles[category] || [];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const paths: { params: { category: string; type: string; slug: string } }[] = [];

  const categories = ['sleep-health', 'japanesetea', 'popularproducts-overseas', 'japaneseproducts-popular-with-foreigners'];
  
  for (const category of categories) {
    const categoryPath = path.join(articlesDirectory, category);
    if (fs.existsSync(categoryPath)) {
      const types = ['recomend', 'knowledge'];
      for (const type of types) {
        const typePath = path.join(categoryPath, type);
        if (fs.existsSync(typePath)) {
          const files = fs.readdirSync(typePath);
          files.forEach(file => {
            if (file.endsWith('.md')) {
              const slug = file.replace(/\.md$/, '');
              paths.push({
                params: {
                  category,
                  type,
                  slug,
                },
              });
            }
          });
        }
      }
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ArticleProps> = async ({ params }) => {
  const { category, type, slug } = params as { category: string; type: string; slug: string };
  
  const fullPath = path.join(process.cwd(), 'articles', category, type, `${slug}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontMatter, content } = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      props: {
        content: contentHtml,
        frontMatter,
        category,
        type,
        slug,
      },
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return {
      notFound: true,
    };
  }
}; 