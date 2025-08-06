import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import Link from 'next/link';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import AffiliateDisclosure from '../../../../components/AffiliateDisclosure';
import CategoryImage from '../../../../components/CategoryImage';
import CategoryCard from '../../../../components/CategoryCard';
import AffiliateAdCardLark1 from '../../../../components/AffiliateAdCardLark1';
import GlobalHotPicksAffiliate from '../../../../components/GlobalHotPicksAffiliate';


// LARQ記事専用コンポーネント
function LARQArticle({ content }: { content: string }) {
  if (typeof content !== "string") return null;

  // テキスト広告（商品説明直下に挿入）
  const TEXT_AD_HTML = `
    <div style="margin: 12px 0; padding: 10px; background: #E6F2FF; border-radius: 8px; text-align: center;">
      <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fpalmsamerica%2Fayygqlrkr8%2F"
         target="_blank" rel="nofollow"
         style="font-weight: bold; color: #0056b3;">
        LARQ ラーク Bottle PureVis ボトル ピュアビス Monaco Blue 500ml
      </a>
    </div>
  `;

  // 画像広告（記事末尾に挿入）
  const IMAGE_AD_HTML = `
    <div style="margin: 20px 0; text-align: center;">
      <a href="//af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fpalmsamerica%2Fayygqlrkr8%2F"
         target="_blank" rel="nofollow">
        <img src="https://thumbnail.image.rakuten.co.jp/@0_mall/palmsamerica/cabinet/ayygqlrkr8.jpg?_ex=300x300" 
             alt="LARQ Bottle PureVis" 
             style="max-width: 100%; height: auto; border-radius: 8px;" />
      </a>
    </div>
  `;

  // 商品説明直下に広告を挿入する関数
  function insertTextAd(html: string): string {
    // LARQ Bottle PureVis（500ml）の見出し直後に広告を挿入
    const targetPattern = /(LARQ Bottle PureVis（500ml）)/g;
    return html.replace(targetPattern, `$1${TEXT_AD_HTML}`);
  }

  // 記事末尾に広告を追加
  function insertImageAd(html: string): string {
    return html + IMAGE_AD_HTML;
  }

  // 広告を挿入
  let htmlContent = insertTextAd(content);
  htmlContent = insertImageAd(htmlContent);

  return (
    <div>
      {/* 記事本文（HTMLをそのまま表示） */}
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-6">
        <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
          <div 
            className="article-content"
            style={{
              lineHeight: '1.8',
              fontSize: '1rem'
            }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </div>
    </div>
  );
}

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
  type?: string;
  post: string;
}

export default function ArticleDetail({ content, frontMatter, category, type, post }: ArticleProps) {
  const title = frontMatter.title || '商品比較・ランキング';
  const description = frontMatter.description || `Market Supporter AIが提供する${title}の詳細情報です。`;
  const articleType = type || 'trend'; // typeがない場合はデフォルト値を設定

  // クライアントサイドでJavaScriptを実行
  useEffect(() => {
    // MoshimoAffiliateEasyLinkのスクリプトを実行
    const scripts = document.querySelectorAll('script[type="text/javascript"]');
    scripts.forEach(script => {
      if (script.textContent && script.textContent.includes('msmaflink')) {
        const newScript = document.createElement('script');
        newScript.textContent = script.textContent;
        document.head.appendChild(newScript);
      }
    });
  }, [content, post]);

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
              <Link href={getCategoryLink(category)} className="hover:text-blue-600 transition-colors">
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
            <Link 
              href={getCategoryLink(category)}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full hover:bg-blue-200 transition-colors"
            >
              {getCategoryName(category)}
            </Link>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {articleType === 'recommend' ? 'おすすめ商品' : articleType === 'knowledge' ? '知識・情報' : 'トレンド'}
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

        {/* アフィリエイトディスクロージャー */}
        {frontMatter.type !== 'knowledge' && <AffiliateDisclosure />}

        {/* LARQ記事の場合はHTML構造を維持して広告挿入 */}
        {post === '2025-07-20-smart-water-bottle' ? (
          <LARQArticle content={content} />
        ) : (
          /* 通常記事の表示 */
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: content }} 
                className="article-content"
                style={{
                  lineHeight: '1.8',
                  fontSize: '1rem'
                }}
              />
            </article>
          </div>
        )}

        {/* 扇風機記事の場合のみ広告表示 */}
        {post === '2025-07-24-foldable-wireless-fan-rakuten' && (
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🛒 商品詳細情報</h3>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <img
                src="https://thumbnail.image.rakuten.co.jp/@0_mall/yoitas/cabinet/imgrc0180681394.jpg?_ex=300x300"
                alt="Yoitas 折りたたみ扇風機"
                className="mx-auto mb-4 rounded-lg"
                style={{ maxWidth: '300px' }}
              />
              <h4 className="text-lg font-bold mb-4">
                【扇風機1位獲得】Yoitas 折りたたみ 扇風機 Design+ F11
              </h4>
              <a
                href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fyoitas%2Ff11-001%2F&m=https%3A%2F%2Fm.rakuten.co.jp%2Fyoitas%2Fi%2F10000088%2F"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors"
              >
                詳しく見る
              </a>
            </div>
          </div>
        )}
{post === '2025-08-06' && (
  <>
    {/* Galaxy Z Fold 7 */}
    <GlobalHotPicksAffiliate 
      product={{
        name: "Samsung Galaxy Z Fold 7",
        image: "https://thumbnail.image.rakuten.co.jp/@0_mall/samsung-official/cabinet/galaxy-z-fold7.jpg?_ex=300x300",
        amazonUrl: "https://www.amazon.co.jp/dp/B0FGNSPX1P",
        rakutenUrl: "https://item.rakuten.co.jp/samsung-official/galaxy-z-fold7/",
        yahooUrl: "https://store.shopping.yahoo.co.jp/samsung/galaxy-z-fold7.html",
        officialUrl: "https://www.samsung.com/jp/smartphones/galaxy-z-fold7/"
      }}
    />
    
    {/* JisuLife Handheld Fan */}
    <GlobalHotPicksAffiliate 
      product={{
        name: "JisuLife Handheld Fan Ultra 2",
        image: "https://thumbnail.image.rakuten.co.jp/@0_mall/jisulife/cabinet/handheld-fan-ultra2.jpg?_ex=300x300",
        amazonUrl: "https://www.amazon.com/dp/B0F38FFGYT",
        rakutenUrl: "https://item.rakuten.co.jp/jisulife/handheld-fan-ultra2/",
        officialUrl: "https://jisulife.com/products/jisulife-handheld-fan-ultra2"
      }}
    />
    
    {/* COSRX Snail Mucin */}
    <GlobalHotPicksAffiliate 
      product={{
        name: "COSRX アドバンスド スネイル 96 ムチン パワー エッセンス",
        image: "//thumbnail.image.rakuten.co.jp/@0_mall/roseroseshop/cabinet/09833634/imgrc0110390981.jpg?_ex=300x300",
        amazonUrl: "https://www.amazon.co.jp/dp/B00PBX3L7K",
        rakutenUrl: "https://item.rakuten.co.jp/roseroseshop/cosrx_007/",
        yahooUrl: "https://store.shopping.yahoo.co.jp/roseroseshop/cosrx-snail-mucin.html",
        officialUrl: "https://cosrx.com"
      }}
    />
  </>
)}

        {/* 関連記事 */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mt-6 sm:mt-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">関連記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {getRelatedArticles(category, articleType, post).map((article, index) => (
              <Link key={index} href={article.href} className="group block">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <CategoryCard
              title="睡眠・健康"
              description="枕・マットレス・睡眠改善情報"
              href="/sleep-health"
              bgImage="https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/60"
            />
            <CategoryCard
              title="日本茶関連"
              description="緑茶・抹茶・お茶文化の紹介"
              href="/japanese-tea"
              bgImage="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/60"
            />
            <CategoryCard
              title="海外トレンド"
              description="海外で話題の商品を日本で"
              href="/overseas-trend"
              bgImage="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/60"
            />
            <CategoryCard
              title="人気の日本商品"
              description="国内で注目のアイテム"
              href="/japan-popular"
              bgImage="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/60"
            />
            <CategoryCard
              title="Global Hot Picks"
              description="海外で急上昇中の商品"
              href="/articles/global-hot-picks"
              bgImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/60"
            />
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
    '海外トレンド': '海外トレンド',
    'japaneseproducts-popular-with-foreigners': '人気の日本商品',
    'global-hot-picks': 'Global Hot Picks'
  };
  return categoryNames[category] || category;
}

// カテゴリリンクを取得する関数
function getCategoryLink(category: string): string {
  const categoryLinks: { [key: string]: string } = {
    'sleep-health': '/sleep-health',
    'japanesetea': '/japanese-tea',
    'popularproducts-overseas': '/overseas-trend',
    '海外トレンド': '/overseas-trend',
    'japaneseproducts-popular-with-foreigners': '/japan-popular',
    'global-hot-picks': '/articles/global-hot-picks'
  };
  return categoryLinks[category] || '/';
}

// 関連記事を取得する関数
function getRelatedArticles(category: string, type?: string, currentPost?: string) {
  const relatedArticles: { [key: string]: any[] } = {
    'sleep-health': [
      {
        title: '枕総合ランキングTOP10｜前編（1〜5位）',
        excerpt: '2025年8月最新版の枕総合ランキング',
        date: '2025.08.04',
        href: '/articles/sleep-health/recommend/2025-08-04-makura-rankingtop5'
      },
      {
        title: '枕総合ランキング',
        excerpt: '価格・機能・口コミの3軸で徹底比較',
        date: '2025.07.01',
        href: '/articles/sleep-health/recommend/2025-07-01-makura-ranking'
      },
      {
        title: '定番発泡枕vs他メーカー比較',
        excerpt: '人気の定番発泡枕を徹底比較',
        date: '2025.07.02',
        href: '/articles/sleep-health/recommend/2025-07-02-teihannpatsu-vs-others'
      },
      {
        title: '後半発泡枕ランキング',
        excerpt: '後半発泡枕の選び方とおすすめ',
        date: '2025.07.03',
        href: '/articles/sleep-health/recommend/2025-07-03-kouhanpatsu-ranking'
      }
    ],
    'japanesetea': [
      {
        title: '抹茶セットおすすめ',
        excerpt: '本格抹茶の選び方とおすすめ商品',
        date: '2025.07.31',
        href: '/articles/japanesetea/recommend/250731matcha-set-recommend-dm'
      },
      {
        title: '急須ランキング',
        excerpt: '本格的な日本茶を楽しむ急須選び',
        date: '2025.07.31',
        href: '/articles/japanesetea/recommend/250731kyusu-ranking-dm'
      },
      {
        title: '日本茶ライフスタイル',
        excerpt: '日本茶のある暮らしの楽しみ方',
        date: '2025.07.31',
        href: '/articles/japanesetea/knowledge/250731japanesetea-lifestyle-knowledge'
      },
      {
        title: '急須の種類と選び方',
        excerpt: '急須の種類と用途別の選び方',
        date: '2025.07.31',
        href: '/articles/japanesetea/knowledge/250731kyusu-types-knowledge'
      }
    ],
    'japaneseproducts-popular-with-foreigners': [
      {
        title: '人気の日本食品2025',
        excerpt: '外国人に人気の日本食品ランキング',
        date: '2025.07.31',
        href: '/articles/japaneseproducts-popular-with-foreigners/recommend/250731popular-japanese-foods-2025-dm'
      },
      {
        title: 'バズる抹茶スイーツ',
        excerpt: 'SNSで話題の抹茶スイーツ特集',
        date: '2025.08.01',
        href: '/articles/japaneseproducts-popular-with-foreigners/recommend/250801viral-matcha-sweets-dm'
      },
      {
        title: '人気の日本食品2025（教育）',
        excerpt: '外国人に人気の日本食品の知識',
        date: '2025.07.31',
        href: '/articles/japaneseproducts-popular-with-foreigners/knowledge/250731popular-japanese-foods-2025-education'
      },
      {
        title: 'バズる抹茶スイーツ（教育）',
        excerpt: 'SNSで話題の抹茶スイーツの知識',
        date: '2025.08.01',
        href: '/articles/japaneseproducts-popular-with-foreigners/knowledge/250801viral-matcha-sweets-education'
      }
    ],
    'popularproducts-overseas': [
      {
        title: '折りたたみワイヤレス扇風機',
        excerpt: '楽天で人気の折りたたみ扇風機',
        date: '2025.07.24',
        href: '/articles/popularproducts-overseas/recommend/2025-07-24-foldable-wireless-fan-rakuten'
      },
      {
        title: 'TikTokで話題のスマート水ボトル',
        excerpt: '海外で人気爆発中のスマート水ボトル',
        date: '2025.07.20',
        href: '/articles/popularproducts-overseas/recommend/2025-07-20-smart-water-bottle'
      }
    ],
    '海外トレンド': [
      {
        title: '折りたたみワイヤレス扇風機',
        excerpt: '楽天で人気の折りたたみ扇風機',
        date: '2025.07.24',
        href: '/articles/popularproducts-overseas/recommend/2025-07-24-foldable-wireless-fan-rakuten'
      },
      {
        title: 'TikTokで話題のスマート水ボトル',
        excerpt: '海外で人気爆発中のスマート水ボトル',
        date: '2025.07.20',
        href: '/articles/popularproducts-overseas/recommend/2025-07-20-smart-water-bottle'
      }
    ],
    'global-hot-picks': [
      {
        title: 'Global Hot Picks',
        excerpt: '海外で急上昇中の商品',
        date: '2025.08.06',
        href: '/articles/global-hot-picks/2025-08-06'
      }
    ]
  };
  
  // 現在の記事を除外
  const articles = relatedArticles[category] || [];
  if (currentPost) {
    return articles.filter(article => !article.href.includes(currentPost));
  }
  
  return articles;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const paths: { params: { category: string; type?: string; post: string } }[] = [];

  // カテゴリ一覧を動的に取得
  const categories = fs
    .readdirSync(articlesDirectory)
    .filter((f) => fs.statSync(path.join(articlesDirectory, f)).isDirectory());

  categories.forEach((category) => {
    const categoryDir = path.join(articlesDirectory, category);

    // type フォルダがある場合
    const hasTypeFolders = fs
      .readdirSync(categoryDir)
      .some((f) => fs.statSync(path.join(categoryDir, f)).isDirectory());

    if (hasTypeFolders) {
      const types = fs.readdirSync(categoryDir).filter((t) =>
        fs.statSync(path.join(categoryDir, t)).isDirectory()
      );

      types.forEach((type) => {
        const typeDir = path.join(categoryDir, type);
        const files = fs
          .readdirSync(typeDir)
          .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

        files.forEach((file) => {
          const post = file.replace(/\.mdx?$/, "");
          paths.push({
            params: { category, type, post },
          });
        });
      });
    } else {
      // type フォルダがない場合（例: global-hot-picks）
      // ダミーのtypeパラメータを使用してルーティングを維持
      const files = fs
        .readdirSync(categoryDir)
        .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

      files.forEach((file) => {
        const post = file.replace(/\.mdx?$/, "");
        paths.push({
          params: { category, type: 'trend', post },
        });
      });
    }
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ArticleProps> = async ({ params }) => {
  const { category, post } = params as { category: string; type?: string; post: string };
  const type = (params as any).type;
  
  let fullPath: string;
  
  // typeパラメータがある場合（通常のカテゴリ）
  if (type && type !== 'trend') {
    fullPath = path.join(process.cwd(), 'articles', category, type, `${post}.md`);
  } else {
    // typeパラメータがない場合、または'trend'の場合（global-hot-picksなど）
    // まず.mdファイルを試し、なければ.mdxファイルを試す
    const mdPath = path.join(process.cwd(), 'articles', category, `${post}.md`);
    const mdxPath = path.join(process.cwd(), 'articles', category, `${post}.mdx`);
    
    if (fs.existsSync(mdPath)) {
      fullPath = mdPath;
    } else if (fs.existsSync(mdxPath)) {
      fullPath = mdxPath;
    } else {
      return { notFound: true };
    }
  }
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontMatter, content } = matter(fileContents);

    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      props: {
        content: contentHtml,
        frontMatter,
        category,
        type: type || 'trend', // typeがない場合はデフォルト値を設定
        post: post,
      },
    };
  } catch (error) {
    console.error(`Error reading article ${post}:`, error);
    return {
      notFound: true,
    };
  }
};
