import Link from 'next/link';
import { getTravelSlugs, getTravelPostBySlug } from '@/lib/mdx';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 旅行記事のリンクを生成する関数（リンク切れを防ぐ）
function getTravelArticleLink(slug: string, subcategory?: string): string {
  // 名月荘の記事の特別処理
  if (slug === "meigetsuso-part1" || slug.includes("meigetsuso-part1")) {
    return `/travel/ryokan/2025-10-15-meigetsuso-part1`;
  }
  if (slug === "meigetsuso-part2" || slug.includes("meigetsuso-part2")) {
    return `/travel/ryokan/2025-10-17-meigetsuso-part2`;
  }
  
  // 古窯の記事の特別処理
  if (slug === "koyo-onsen-part1" || slug.includes("koyo-onsen-part1") || slug === "2025-10-29-koyo-onsen-part1") {
    return `/travel/ryokan/2025-10-29-koyo-onsen-part1`;
  }
  if (slug === "koyo-onsen-part2" || slug.includes("koyo-onsen-part2") || slug === "2025-10-29-koyo-onsen-part2") {
    return `/travel/ryokan/2025-10-29-koyo-onsen-part2`;
  }
  if (slug === "koyo-renewal" || slug.includes("koyo-renewal") || slug === "2025-11-01-koyo-renewal" || slug.includes("2025-11-01-koyo-renewal")) {
    return `/travel/ryokan/2025-11-01-koyo-renewal`;
  }
  
  // ファイルパス形式のslugを処理（例: "ryokan/2025-11-01-koyo-renewal", "onsen/yamagata-mogami-onsen"）
  if (slug.includes('/')) {
    return `/travel/${slug}`;
  }
  
  // 温泉地ガイド記事の場合（ただしonsen/で始まるものは除外）
  if (subcategory === "温泉地ガイド" && !(slug && typeof slug === 'string' && slug.startsWith('onsen/'))) {
    return `/travel/onsen/${slug}`;
  }
  
  // 個別旅館記事の場合
  if (subcategory === "個別旅館" || subcategory === "おすすめ個別旅館ガイド") {
    return `/travel/ryokan/${slug}`;
  }
  
  // その他は一般的なパス
  return `/travel/${slug}`;
}

export async function getStaticProps() {
  const slugs = getTravelSlugs();
  const posts = slugs.map((s) => {
    const { frontMatter, slug } = getTravelPostBySlug(s);
    return { ...frontMatter, slug: s } as any; // ファイルパス（s）を優先して使用
  });
  posts.sort((a: any, b: any) => (a.date < b.date ? 1 : -1));
  return { props: { posts } };
}

export default function TravelIndex({ posts }: { posts: any[] }) {
  // 温泉地ガイド（category: "旅行" かつ subcategory: "温泉地ガイド"、category: "温泉地ガイド"、またはonsen/で始まる記事）
  const onsenGuidePosts = posts
    .filter(p => {
      // content/travel/onsenにある記事（onsen/で始まるslug）を含める
      const isOnsenPath = p.slug && typeof p.slug === 'string' && p.slug.startsWith('onsen/');
      
      // 温泉地ガイド記事（category: "旅行" && subcategory: "温泉地ガイド"）
      // ただし、onsen/で始まるものは既に含まれているため、onsen/で始まらないもののみ
      const isOnsenGuide = !isOnsenPath && 
        p.category === '旅行' && 
        p.subcategory === '温泉地ガイド';

      // 直接 category が温泉地ガイドの記事も対象にする
      const isOnsenCategory = !isOnsenPath && p.category === '温泉地ガイド';
      
      // onsen/で始まる記事または温泉地ガイド記事を含める
      return (isOnsenPath || isOnsenGuide || isOnsenCategory) && p.published !== false;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  
  // 高級温泉旅館ガイド（slugに"luxury"が含まれるもの、またはcategory: "旅行ガイド"）
  const luxuryOnsenPosts = posts
    .filter((p) => (p.slug && p.slug.includes('luxury')) || p.category === '旅行ガイド')
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  
  // おすすめ個別旅館ガイド（category: "旅行" かつ subcategory: "個別旅館"、またはslugがryokan/で始まるもの。onsen/で始まるものは除外）
  const individualRyokanPosts = posts
    .filter(p => {
      const isRyokanPath = p.slug && typeof p.slug === 'string' && p.slug.startsWith('ryokan/');
      const isOnsenPath = p.slug && typeof p.slug === 'string' && p.slug.startsWith('onsen/');
      const isRyokanCategory = (p.category === '旅行' || p.category === '旅館・温泉') && (p.subcategory === '個別旅館' || p.subcategory === 'おすすめ個別旅館ガイド');
      // onsen/で始まる記事は除外（温泉地ガイドセクションに表示されるため）
      return (isRyokanPath || isRyokanCategory) && !isOnsenPath && p.published !== false;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  
  // その他の記事（luxuryを含まず、温泉地ガイドでも個別旅館でもないもの、ryokan/で始まるものもonsen/で始まるものも除外）
  const otherPosts = posts.filter((p) => 
    p.slug && 
    !p.slug.includes('luxury') && 
    !p.slug.startsWith('ryokan/') &&
    !p.slug.startsWith('onsen/') &&
    !(p.category === '旅行' && p.subcategory === '温泉地ガイド') &&
    p.category !== '温泉地ガイド' &&
    !(p.category === '旅行' && p.subcategory === '個別旅館') &&
    !(p.category === '旅行' && p.subcategory === 'おすすめ個別旅館ガイド') &&
    !(p.category === '旅館・温泉' && (p.subcategory === '個別旅館' || p.subcategory === 'おすすめ個別旅館ガイド')) &&
    p.category !== '旅行ガイド' &&
    p.published !== false
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="旅行 - Market Supporter AI"
        description="厳選された旅行情報とお得な予約方法をご紹介。温泉地ガイド、高級温泉旅館、個別旅館情報を網羅。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* パンくずリスト */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-blue-600">ホーム</Link></li>
              <li>/</li>
              <li className="text-gray-900">旅行</li>
            </ol>
          </nav>
          
          <div className="text-center mb-8">
            <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-purple-600/80"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  ✈️
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-3xl font-bold mb-2">
                    旅行
                  </div>
                  <div className="text-white/90 text-lg bg-black/30 px-6 py-2 rounded-full backdrop-blur-sm">
                    温泉地ガイド・高級旅館・個別旅館情報
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              厳選された旅行情報とお得な予約方法をご紹介。温泉地ガイド、高級温泉旅館ランキング、個別旅館の詳しい情報まで、あなたの理想の旅を見つけるお手伝いをします。
            </p>
          </div>

          {/* おすすめ観光地セクション */}
          {otherPosts.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">🗾 おすすめ観光地</h2>
                {otherPosts.length > 3 && (
                  <Link 
                    href="/travel/others" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    すべて見る →
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherPosts.slice(0, 3).map((p) => (
                  <Link
                    key={p.slug}
                    href={getTravelArticleLink(p.slug, p.subcategory)}
                    className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {p.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {p.description}
                      </p>
                      <div className="text-xs text-gray-500">
                        {p.date}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 温泉地ガイドセクション */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">♨️ 温泉地ガイド</h2>
              {onsenGuidePosts.length > 3 && (
                <Link 
                  href="/travel/onsen" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  すべて見る →
                </Link>
              )}
            </div>
            {onsenGuidePosts.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <p className="text-gray-500">温泉地ガイドは準備中です。今後追加予定です。</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {onsenGuidePosts.slice(0, 3).map((p) => (
                  <Link
                    key={p.slug}
                    href={getTravelArticleLink(p.slug, p.subcategory)}
                    className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {p.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {p.description}
                      </p>
                      <div className="text-xs text-gray-500">
                        {p.date}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* おすすめ個別旅館ガイドセクション */}
          {individualRyokanPosts.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">🏨 おすすめ個別旅館ガイド</h2>
                {individualRyokanPosts.length > 3 && (
                  <Link 
                    href="/travel/ryokan" 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    すべて見る →
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {individualRyokanPosts.slice(0, 3).map((p) => (
                  <Link
                    key={p.slug}
                    href={getTravelArticleLink(p.slug, p.subcategory)}
                    className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {p.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {p.description}
                      </p>
                      <div className="text-xs text-gray-500">
                        {p.date}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 高級温泉旅館ガイドセクション */}
          {luxuryOnsenPosts.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">🏯 高級温泉旅館ガイド</h2>
              {luxuryOnsenPosts.length > 3 && (
                <Link 
                  href="/travel/luxury" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  すべて見る →
                </Link>
              )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {luxuryOnsenPosts.slice(0, 3).map((p) => (
                  <Link
                    key={p.slug}
                    href={getTravelArticleLink(p.slug, p.subcategory)}
                    className="group block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                  >
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {p.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {p.description}
                      </p>
                      <div className="text-xs text-gray-500">
                        {p.date}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
