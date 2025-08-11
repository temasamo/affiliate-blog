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
import AffiliateAdCardAlt from '../../../../components/AffiliateAdCardAlt';
import GlobalHotPicksAffiliate from '../../../../components/GlobalHotPicksAffiliate';
import SmartWaterBottleAffiliate from '../../../../components/SmartWaterBottleAffiliate';




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

    // ValueCommerceのスクリプトを追加
    if (post === '2025-08-07' || post === '2025-08-08') {
      const existingScript = document.querySelector('script[src*="valuecommerce.com"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//mlb.valuecommerce.com/mylinkbox.js';
        script.async = true;
        document.head.appendChild(script);
      }
    }
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            {title}
          </h1>
          {category === 'popularproducts-overseas' && (
            <p className="text-sm text-gray-500 mb-4">
              Deep-Dive Overseas Trend
            </p>
          )}
          {frontMatter.description && (
            <p className="text-sm sm:text-base text-gray-600">
              {frontMatter.description}
            </p>
          )}
        </div>

        {/* アフィリエイトディスクロージャー */}
        {frontMatter.type !== 'knowledge' && <AffiliateDisclosure />}

        {/* 通常記事の表示 */}
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

        {/* 急須ランキング記事専用の広告セクション */}
        {post === '250731kyusu-ranking-top5-with-frontmatter' && (
          <section className="mt-8">
            <hr className="my-8 border-t-2 border-dashed border-gray-300" />
            <h3 className="text-lg font-bold mb-4 text-gray-700">
              🛒 以下、プロモーションリンク（広告）です
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <AffiliateAdCardLark1 />
              <AffiliateAdCardAlt />
            </div>
          </section>
        )}

        {/* スマートウォーターボトル記事の場合の広告表示 */}
        {post === '2025-07-20-smart-water-bottle' && (
          <section className="mt-8">
            <hr className="my-8 border-t-2 border-dashed border-gray-300" />
            <h3 className="text-lg font-bold mb-4 text-gray-700">
              🛒 以下、プロモーションリンク（広告）です
            </h3>

            {/* LARQ Bottle PureVis */}
            <SmartWaterBottleAffiliate 
              product={{
                name: "LARQ ラーク Bottle PureVis ボトル ピュアビスMonaco Blue 500ml",
                image: "//thumbnail.image.rakuten.co.jp/@0_mall/palmsamerica/cabinet/img_20241120/4/ayygqlrkr8_0.jpg?_ex=300x300",
                rakutenUrl: "https://item.rakuten.co.jp/palmsamerica/ayygqlrkr8/",
                officialUrl: "https://www.larq.com/products/larq-bottle-purevis",
                description: "UV除菌機能付き ウォーターボトル 保冷 保温 セルフクリーニング"
              }}
            />

            {/* Owala FreeSip */}
            <SmartWaterBottleAffiliate 
              product={{
                name: "Owala FreeSip Insulated Bottle（24oz相当）",
                image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop&crop=center",
                officialUrl: "https://owalalife.com/",
                description: "保温・保冷／軽量／豊富なカラーバリエーション"
              }}
            />

            {/* HidrateSpark Pro */}
            <SmartWaterBottleAffiliate 
              product={{
                name: "HidrateSpark Pro（スマート水分補給ボトル）",
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center",
                officialUrl: "https://hidratespark.com/",
                description: "Bluetooth連動で水分摂取量をアプリ管理／LED通知機能付き"
              }}
            />
          </section>
        )}

        {/* 扇風機記事の場合のみ広告表示 */}
        {post === '2025-07-24-foldable-wireless-fan-rakuten' && (
          <section className="mt-8">
            <hr className="my-8 border-t-2 border-dashed border-gray-300" />
            <h3 className="text-lg font-bold mb-4 text-gray-700">
              🛒 以下、プロモーションリンク（広告）です
            </h3>

            {/* Yoitas 折りたたみ扇風機 */}
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
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
                <p className="text-sm text-gray-600 mb-4">
                  DCモーター／コンパクト折りたたみ／静音仕様
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <a
                    href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fyoitas%2Ff11-001%2F&m=https%3A%2F%2Fm.rakuten.co.jp%2Fyoitas%2Fi%2F10000088%2F"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    楽天市場
                  </a>
                  <a
                    href="https://www.amazon.co.jp/dp/B0F38FFGYT"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    Amazon
                  </a>
                </div>
              </div>
            </div>


          </section>
        )}
{post === '2025-08-06' && (
  <section className="mt-8">
    <hr className="my-8 border-t-2 border-dashed border-gray-300" />
    <h3 className="text-lg font-bold mb-4 text-gray-700">
      🛒 以下、プロモーションリンク（広告）です
    </h3>

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
  </section>
)}

{post === '2025-08-07' && (
  <section className="mt-8">
    <hr className="my-8 border-t-2 border-dashed border-gray-300" />
    <h3 className="text-lg font-bold mb-4 text-gray-700">
      🛒 以下、プロモーションリンク（広告）です
    </h3>

    {/* Insta360 Ace Pro - 購入はこちら */}
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <img
            src="https://thumbnail.image.rakuten.co.jp/@0_mall/insta360-shop2/cabinet/12177189/12177192/imgrc0095754257.jpg?_ex=300x300"
            alt="Insta360 Ace Pro"
            className="w-48 h-48 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Insta360 Ace Pro</h4>
          <p className="text-sm text-gray-600 mb-4">AI搭載アクションカメラ、4K/120fps撮影対応</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 楽天市場: △ なので表示 */}
            <a 
              href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Finsta360-shop2%2Finsta360-acepro%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Finsta360-shop2%2Fi%2F10000410%2F" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              楽天市場で探す
            </a>
            {/* Yahoo!ショッピング: △ なので表示 */}
            <a 
              href="https://shopping.yahoo.co.jp/search?p=Insta360+Ace+Pro" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Yahoo!ショッピングで探す
            </a>
            <a 
              href="https://www.amazon.co.jp/s?k=Insta360+Ace+Pro" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Amazonで探す
            </a>
          </div>
        </div>
      </div>
    </div>
    
    {/* Alpha Space 商品 - 購入はこちら */}
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <img
            src="https://thumbnail.image.rakuten.co.jp/@0_mall/alphaespace-usa/cabinet/img31/3025055-03.jpg?_ex=300x300"
            alt="Alpha Space 商品"
            className="w-48 h-48 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Alpha Space 商品</h4>
          <p className="text-sm text-gray-600 mb-4">高品質な生活用品</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a 
              href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Falphaespace-usa%2F3025055%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Falphaespace-usa%2Fi%2F10016986%2F" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              楽天市場で探す
            </a>
            <a 
              href="https://shopping.yahoo.co.jp/search?p=Alpha+Space" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Yahoo!ショッピングで探す
            </a>
            <a 
              href="https://www.amazon.co.jp/s?k=Alpha+Space" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Amazonで探す
            </a>
          </div>
        </div>
      </div>
    </div>
    
        {/* Yinai 商品 - 購入はこちら */}
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <img
            src="https://thumbnail.image.rakuten.co.jp/@0_mall/yinai/cabinet/free_1751347535839.jpg?_ex=300x300"
            alt="Yinai 商品"
            className="w-48 h-48 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Yinai 商品</h4>
          <p className="text-sm text-gray-600 mb-4">人気の商品</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a 
              href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fyinai%2F1000000932%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fyinai%2Fi%2F10000329%2F" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              楽天市場で探す
            </a>
            <a 
              href="https://shopping.yahoo.co.jp/search?p=Yinai" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Yahoo!ショッピングで探す
            </a>
            <a 
              href="https://www.amazon.co.jp/s?k=Yinai" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Amazonで探す
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
)}

{post === '2025-08-08' && (
  <section className="mt-8">
    <hr className="my-8 border-t-2 border-dashed border-gray-300" />
    <h3 className="text-lg font-bold mb-4 text-gray-700">
      🛒 以下、プロモーションリンク（広告）です
    </h3>

    {/* Anker SOLIX C1000 - 購入はこちら */}
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <img
            src="https://thumbnail.image.rakuten.co.jp/@0_mall/anker/cabinet/a1761_03.jpg?_ex=300x300"
            alt="Anker SOLIX C1000 ポータブル電源"
            className="w-48 h-48 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Anker SOLIX C1000 ポータブル電源</h4>
          <p className="text-sm text-gray-600 mb-4">58分でフル充電できる急速チャージ対応、1,024Wh/1,000W のLFPポータブル電源</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 楽天市場: △ なので表示 */}
            <a 
              href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fanker%2Fa1761521%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fanker%2Fi%2F10001663%2F" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              楽天市場で探す
            </a>
            {/* Yahoo!ショッピング: × なので非表示 */}
            <a 
              href="https://www.amazon.co.jp/s?k=Anker+SOLIX+C1000" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Amazonで探す
            </a>
          </div>
        </div>
      </div>
    </div>
    
    {/* Theragun Relief - 購入はこちら */}
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <img
            src="https://thumbnail.image.rakuten.co.jp/@0_mall/usbonline/cabinet/pic-2/tb-relief_nv-01_1_b.jpg?_ex=300x300"
            alt="Theragun Relief パーカッシブガン"
            className="w-48 h-48 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Theragun Relief パーカッシブガン</h4>
          <p className="text-sm text-gray-600 mb-4">肩・首・腰のコリを狙って叩打でほぐす、軽量タイプのマッサージガン</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 楽天市場: ◯ なので表示 */}
            <a 
              href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fusbonline%2Ftg000396%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fusbonline%2Fi%2F10001198%2F" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              楽天市場で探す
            </a>
            {/* Yahoo!ショッピング: △ なので表示 */}
            <a 
              href="https://shopping.yahoo.co.jp/search?p=Theragun+Relief" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Yahoo!ショッピングで探す
            </a>
            {/* Amazon: ◯ なので表示 */}
            <a 
              href="https://www.amazon.co.jp/s?k=Theragun+Relief" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Amazonで探す
            </a>
          </div>
        </div>
      </div>
    </div>
    
    {/* Etude Glow Fixing Tint - 購入はこちら */}
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <img
            src="https://thumbnail.image.rakuten.co.jp/@0_mall/turuya783/cabinet/ws/2025/cos250624/c00234_1.jpg?_ex=300x300"
            alt="Etude Glow Fixing Tint"
            className="w-48 h-48 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Etude Glow Fixing Tint</h4>
          <p className="text-sm text-gray-600 mb-4">水膜のようなツヤと色持ちを両立したリップティント。軽やかなつけ心地で約6時間キープ</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 楽天市場: ◯ なので表示 */}
            <a 
              href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fturuya783%2Fc00234%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fturuya783%2Fi%2F10460655%2F" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              楽天市場で探す
            </a>
            {/* Yahoo!ショッピング: ◯ なので表示 */}
            <a 
              href="https://shopping.yahoo.co.jp/search?p=Etude+Glow+Fixing+Tint" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Yahoo!ショッピングで探す
            </a>
            {/* Amazon: △ なので非表示 */}
          </div>
        </div>
      </div>
    </div>
  </section>
)}

{post === '2025-08-09' && (
  <section className="mt-8">
    <hr className="my-8 border-t-2 border-dashed border-gray-300" />
    <h3 className="text-lg font-bold mb-4 text-gray-700">
      🛒 以下、プロモーションリンク（広告）です
    </h3>

    {/* Insta360 X4 - 購入はこちら */}
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <img
            src="https://thumbnail.image.rakuten.co.jp/@0_mall/insta360-shop2/cabinet/biiino/item/main-image/20240416180341_4.jpg?_ex=300x300"
            alt="Insta360 X4"
            className="w-48 h-48 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Insta360 X4</h4>
          <p className="text-sm text-gray-600 mb-4">8K/30fps撮影対応、AI搭載アクションカメラ</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a 
              href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Finsta360-shop2%2Finsta360-x4%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Finsta360-shop2%2Fi%2F10000445%2F" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              楽天市場で探す
            </a>
            <a 
              href="https://shopping.yahoo.co.jp/search?p=Insta360+X4" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Yahoo!ショッピングで探す
            </a>
            <a 
              href="https://www.amazon.co.jp/s?k=Insta360+X4" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Amazonで探す
            </a>
          </div>
        </div>
      </div>
    </div>
    
    {/* Alpha Space 商品 - 購入はこちら */}
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <img
            src="https://thumbnail.image.rakuten.co.jp/@0_mall/alphaespace-usa/cabinet/img40/3013338-01.jpg?_ex=300x300"
            alt="Alpha Space 商品"
            className="w-48 h-48 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Alpha Space 商品</h4>
          <p className="text-sm text-gray-600 mb-4">高品質な生活用品</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a 
              href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Falphaespace-usa%2F3013338%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Falphaespace-usa%2Fi%2F10022410%2F" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              楽天市場で探す
            </a>
            <a 
              href="https://shopping.yahoo.co.jp/search?p=Alpha+Space" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Yahoo!ショッピングで探す
            </a>
            <a 
              href="https://www.amazon.co.jp/s?k=Alpha+Space" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Amazonで探す
            </a>
          </div>
        </div>
      </div>
    </div>
    
    {/* LANEIGE Glaze Craze Tinted Lip Serum - 購入はこちら */}
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <img
            src="https://thumbnail.image.rakuten.co.jp/@0_mall/thebeautyclub/cabinet/img_1748574870/img_360971_1.jpg?_ex=300x300"
            alt="LANEIGE Glaze Craze Tinted Lip Serum Peach Glaze"
            className="w-48 h-48 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">LANEIGE Glaze Craze Tinted Lip Serum Peach Glaze</h4>
          <p className="text-sm text-gray-600 mb-4">水膜のようなツヤと色持ちを両立したリップティント</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a 
              href="https://af.moshimo.com/af/c/click?a_id=5122395&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fthebeautyclub%2F360971%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fthebeautyclub%2Fi%2F10506216%2F" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              楽天市場で探す
            </a>
            <a 
              href="https://shopping.yahoo.co.jp/search?p=The+Beauty+Club" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Yahoo!ショッピングで探す
            </a>
            <a 
              href="https://www.amazon.co.jp/s?k=The+Beauty+Club" 
              target="_blank" 
              rel="nofollow noopener noreferrer"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Amazonで探す
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
)}



        {/* 関連記事 */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mt-6 sm:mt-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">関連記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* 過去記事カード（最新3つ） */}
            {getRelatedArticles(category, articleType, post).slice(0, 3).map((article, index) => (
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
            
            {/* 過去の記事一覧カード（4つ目） */}
            <Link href={getCategoryLink(category)} className="group block">
              <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    過去の記事一覧
                  </h3>
                  <svg className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  {getCategoryName(category)}の全記事を見る
                </p>
                <span className="text-xs text-gray-500">一覧ページへ</span>
              </div>
            </Link>
          </div>
        </div>

        {/* 免責事項 */}
        {frontMatter.type !== 'knowledge' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 sm:p-8 mt-6 sm:mt-8">
            <h2 className="text-lg sm:text-xl font-bold text-yellow-800 mb-4 sm:mb-6">⚠️ 免責事項</h2>
            <div className="text-sm sm:text-base text-yellow-700 space-y-2">
              <p>• 本記事の商品情報は執筆時点のものです</p>
              <p>• 価格や在庫状況は変動する可能性があります</p>
              <p>• 購入前に各販売店で最新情報をご確認ください</p>
              <p>• 本記事はアフィリエイトプログラムを通じて収益を得ています</p>
              <p>• 商品画像は各販売店・メーカーのものを使用しています</p>
            </div>
          </div>
        )}

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
    'global-hot-picks': '/global-hot-picks'
  };
  return categoryLinks[category] || '/';
}

// 関連記事を取得する関数
// 商品の在庫状況を管理する関数
function getProductAvailability(post: string, productName: string) {
  const availabilityMap: { [key: string]: { [key: string]: { rakuten: string, yahoo: string, amazon: string } } } = {
    '2025-08-07': {
      'Insta360 Ace Pro': { rakuten: '△', yahoo: '△', amazon: '◯' },
      'Alpha Space 商品': { rakuten: '△', yahoo: '△', amazon: '◯' },
      'Yinai 商品': { rakuten: '△', yahoo: '△', amazon: '◯' }
    },
    '2025-08-08': {
      'Anker SOLIX C1000': { rakuten: '△', yahoo: '×', amazon: '◯' },
      'Theragun Relief': { rakuten: '◯', yahoo: '△', amazon: '◯' },
      'Etude Glow Fixing Tint': { rakuten: '◯', yahoo: '◯', amazon: '△' }
    },
    '2025-08-09': {
      'Insta360 X4': { rakuten: '△', yahoo: '△', amazon: '◯' },
      'Alpha Space 商品': { rakuten: '△', yahoo: '△', amazon: '◯' },
      'LANEIGE Glaze Craze Tinted Lip Serum Peach Glaze': { rakuten: '◯', yahoo: '◯', amazon: '◯' }
    }
  };
  
  return availabilityMap[post]?.[productName] || { rakuten: '◯', yahoo: '◯', amazon: '◯' };
}

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
        title: 'Global Hot Picks｜2025-08-08',
        excerpt: '暑さ対策＆おうちリカバリーがキーワードの3アイテム！',
        date: '2025.08.08',
        href: '/articles/global-hot-picks/trend/2025-08-08'
      },
      {
        title: 'Global Hot Picks｜2025-08-07',
        excerpt: '海外で急上昇中のガジェット＆トイを3分でチェック！',
        date: '2025.08.07',
        href: '/articles/global-hot-picks/trend/2025-08-07'
      },
      {
        title: 'Global Hot Picks｜2025-08-06',
        excerpt: '海外で急上昇中の商品',
        date: '2025.08.06',
        href: '/articles/global-hot-picks/trend/2025-08-06'
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
    // trendディレクトリ内のファイルを探す
    const mdPath = path.join(process.cwd(), 'articles', category, 'trend', `${post}.md`);
    const mdxPath = path.join(process.cwd(), 'articles', category, 'trend', `${post}.mdx`);
    
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
