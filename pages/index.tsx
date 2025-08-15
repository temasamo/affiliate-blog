import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryImage from '../components/CategoryImage';
import CategoryCard from '../components/CategoryCard';
import TravelTeaser from '../components/TravelTeaser';
import { getTravelSlugs, getTravelPostBySlug } from '@/lib/mdx';


interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  type: string;
}

interface HomeProps {
  latestArticles: Article[];
  travelPosts: any[];
}

export default function Home({ latestArticles, travelPosts }: HomeProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ヒーローセクション */}
        <section className="mb-12 sm:mb-16">
          <div className="relative bg-gradient-hero rounded-3xl p-8 sm:p-12 text-center shadow-lg border border-gray-100 overflow-hidden">
                        {/* 背景の80%を覆う透かし画像 */}
            <div className="absolute top-0 right-0 w-4/5 h-full opacity-65">
              <div className="w-full h-full bg-cover bg-center bg-no-repeat" 
                   style={{
                     backgroundImage: 'url("/images/handshake-robot.jpg")'
                   }}>
              </div>
              {/* グラデーションオーバーレイで自然な融合 */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-blue-50/30"></div>
            </div>
            
            {/* モバイル用の小さな透かし画像 */}
            <div className="absolute top-4 right-4 w-24 h-24 md:hidden opacity-70">
              <div className="w-full h-full bg-cover bg-center bg-no-repeat" 
                   style={{
                     backgroundImage: 'url("/images/handshake-robot.jpg")'
                   }}>
              </div>
            </div>
            
            {/* コンテンツ */}
            <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Market Supporter AI
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              AIが導く、賢い洞察と信頼できるおすすめ
            </p>
            <Link 
              href="/blog" 
              className="inline-flex items-center px-8 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg hover-lift"
            >
              最新の記事を見る
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* 新記事公開リンク */}
        <div className="bg-gray-100 border border-gray-300 text-gray-700 p-4 mb-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <p className="font-semibold mb-1 text-gray-800">新記事公開！</p>
          <a
            href="/diagnostic-ai/makura/01-intro"
            className="text-blue-600 underline font-bold hover:text-blue-800 transition-colors"
          >
            枕診断AI登場！枕の知識を徹底解剖する新時代ツール →
          </a>
        </div>

        {/* 旅行の新着記事（Global Hot Picksの上に固定配置） */}
        <TravelTeaser posts={travelPosts} />

        {/* Global Hot Picks セクション */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Global Hot Picks</h2>
            <span className="ml-3 bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium">TREND</span>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-purple-100">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">海外で急上昇中の商品</h3>
              <p className="text-gray-600">TikTok・Amazon US・Google Trendsで話題の最新アイテム</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-2xl mb-2">⌚</div>
                <h4 className="font-semibold text-gray-900 mb-1">Garmin Venu 3</h4>
                <p className="text-sm text-gray-600">GPSスマートウォッチ</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-2xl mb-2">🦵</div>
                <h4 className="font-semibold text-gray-900 mb-1">Hyperice Normatec 3</h4>
                <p className="text-sm text-gray-600">脚用リカバリーブーツ</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-2xl mb-2">📷</div>
                <h4 className="font-semibold text-gray-900 mb-1">Fujifilm X100VI</h4>
                <p className="text-sm text-gray-600">最強スナップシューター</p>
              </div>
            </div>
            <div className="text-center">
              <Link href="/articles/global-hot-picks/trend/2025-08-14" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors">
                最新トレンドを見る
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* 新着記事セクション */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">新着記事</h2>
            <span className="ml-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">NEW</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {latestArticles.map((article) => (
              <Link key={article.slug} href={`/articles/${article.category}/${article.type}/${article.slug}`} className="group block">
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover">
                  <CategoryImage category={getCategoryDisplayName(article.category)} />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{article.date}</span>
                      <div className="text-blue-600 text-sm font-medium inline-flex items-center transition-all duration-300 group-hover:translate-x-1">
                        詳細を見る
                        <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>



        {/* カテゴリセクション */}
        <section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">カテゴリ別商品比較</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <CategoryCard
              title="睡眠・健康"
              description="枕・マットレス・睡眠改善情報"
              href="/sleep-health"
              bgImage="https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/40"
            />
            <CategoryCard
              title="日本茶関連"
              description="緑茶・抹茶・お茶文化の紹介"
              href="/japanese-tea"
              bgImage="/images/macha-kyusu.jpg"
              overlayColor="bg-black/40"
            />
            <CategoryCard
              title="海外トレンド"
              subtitle="Deep-Dive Overseas Trend"
              description="海外で話題の商品を日本で"
              href="/overseas-trend"
              bgImage="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/40"
            />
            <CategoryCard
              title="人気の日本商品"
              description="国内で注目のアイテム"
              href="/japan-popular"
              bgImage="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/40"
            />
            <CategoryCard
              title="Global Hot Picks"
              description="海外で急上昇中の商品"
              href="/global-hot-picks"
              bgImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center"
              overlayColor="bg-black/40"
            />
          </div>
        </section>

        {/* おすすめランキングセクション */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">おすすめランキング</h2>
            <span className="ml-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">HOT</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover group">
              <CategoryImage category="睡眠・健康" />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">枕</span>
                  <span className="ml-2 text-xs text-gray-500">7商品比較</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">枕総合ランキング</h3>
                <p className="text-sm text-gray-600 mb-4">価格・機能・口コミの3軸で徹底比較</p>
                <Link href="/articles/sleep-health/recommend/2025-07-01-makura-ranking" className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center transition-all duration-300 hover:translate-x-1">
                  詳細を見る
                  <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover group">
              <CategoryImage category="日本商品" />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">日本商品</span>
                  <span className="ml-2 text-xs text-gray-500">2商品比較</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">人気の日本商品</h3>
                <p className="text-sm text-gray-600 mb-4">外国人に人気の日本食品ランキング</p>
                <Link href="/articles/japaneseproducts-popular-with-foreigners/recommend/250731popular-japanese-foods-2025-dm" className="text-red-600 hover:text-red-800 text-sm font-medium inline-flex items-center transition-all duration-300 hover:translate-x-1">
                  詳細を見る
                  <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden hover-lift scale-hover group">
              <CategoryImage category="日本茶" />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">日本茶</span>
                  <span className="ml-2 text-xs text-gray-500">5商品比較</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">日本茶ランキング</h3>
                <p className="text-sm text-gray-600 mb-4">味・香り・価格で厳選</p>
                <Link href="/articles/japanesetea/recommend/250731matcha-set-recommend-dm" className="text-purple-600 hover:text-purple-800 text-sm font-medium inline-flex items-center transition-all duration-300 hover:translate-x-1">
                  詳細を見る
                  <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 今後の機能 - 非表示 */}
        {/* <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">今後の機能実装予定</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 text-sm font-medium">1</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-medium text-gray-900">カテゴリ別ページでの記事一覧表示</h3>
                <p className="text-sm text-gray-600 mt-1">商品カテゴリごとに整理された記事一覧</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 text-sm font-medium">2</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-medium text-gray-900">アフィリエイトリンクと関連商品紹介</h3>
                <p className="text-sm text-gray-600 mt-1">各記事に商品リンクと関連商品を追加</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 text-sm font-medium">3</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-medium text-gray-900">AIお助けボットによる購入相談機能</h3>
                <p className="text-sm text-gray-600 mt-1">ユーザーの悩みに応じた商品推薦</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 text-sm font-medium">4</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-medium text-gray-900">自動データ収集・ランキング生成</h3>
                <p className="text-sm text-gray-600 mt-1">最新の商品情報を自動で更新</p>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
}

// カテゴリ表示名を取得する関数
function getCategoryDisplayName(category: string): string {
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

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const articlesDirectory = path.join(process.cwd(), 'articles');
  const allArticles: Article[] = [];

  // 旅行の新着を取得
  let travelPosts: any[] = [];
  try {
    const slugs = getTravelSlugs();
    travelPosts = slugs.map((s) => {
      const { frontMatter, slug } = getTravelPostBySlug(s);
      return { slug, ...frontMatter };
    });
    travelPosts.sort((a: any, b: any) => (a.date < b.date ? 1 : -1));
  } catch (e) {
    // 旅行カテゴリ未作成時でも壊さない
    console.log('Travel category not found:', e);
  }

  // 全カテゴリの記事を取得（global-hot-picksも含める）
  const categories = ['sleep-health', 'japanesetea', 'popularproducts-overseas', '海外トレンド', 'japaneseproducts-popular-with-foreigners', 'global-hot-picks'];
  
  categories.forEach(category => {
    const categoryPath = path.join(articlesDirectory, category);
    if (fs.existsSync(categoryPath)) {
      // global-hot-picksの場合はtrendディレクトリを確認
      if (category === 'global-hot-picks') {
        const trendPath = path.join(categoryPath, 'trend');
        if (fs.existsSync(trendPath)) {
          const files = fs.readdirSync(trendPath);
          files.forEach(file => {
            if (file.endsWith('.mdx') || file.endsWith('.md')) {
              const filePath = path.join(trendPath, file);
              const fileContents = fs.readFileSync(filePath, 'utf8');
              const { data: frontMatter } = matter(fileContents);
              
              allArticles.push({
                slug: file.replace(/\.(mdx|md)$/, ''),
                title: frontMatter.title || '記事タイトル',
                description: frontMatter.description || '記事の説明',
                date: frontMatter.date || '2025.07.01',
                category: category,
                type: 'trend'
              });
            }
          });
        }
      } else {
        // 他のカテゴリはrecommendとknowledgeディレクトリを確認
        const types = ['recommend', 'knowledge'];
        types.forEach(type => {
          const typePath = path.join(categoryPath, type);
          if (fs.existsSync(typePath)) {
            const files = fs.readdirSync(typePath);
            files.forEach(file => {
              if (file.endsWith('.md')) {
                const filePath = path.join(typePath, file);
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const { data: frontMatter } = matter(fileContents);
                
                allArticles.push({
                  slug: file.replace(/\.md$/, ''),
                  title: frontMatter.title || '記事タイトル',
                  description: frontMatter.description || '記事の説明',
                  date: frontMatter.date || '2025.07.01',
                  category: category,
                  type: type
                });
              }
            });
          }
        });
      }
    }
  });

  // 日付順でソート（新しい順）して最新3件を取得
  allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latestArticles = allArticles.slice(0, 3);

  return {
    props: {
      latestArticles,
      travelPosts,
    },
  };
};

