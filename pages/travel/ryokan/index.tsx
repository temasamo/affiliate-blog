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
  
  // 個別旅館記事の場合
  return `/travel/ryokan/${slug}`;
}

export async function getStaticProps() {
  const slugs = getTravelSlugs();
  const posts = slugs.map((s) => {
    const { frontMatter, slug } = getTravelPostBySlug(s);
    return { slug: s, ...frontMatter } as any;
  });
  posts.sort((a: any, b: any) => (a.date < b.date ? 1 : -1));
  return { props: { posts } };
}

export default function RyokanIndex({ posts }: { posts: any[] }) {
  const ryokanPosts = posts
    .filter(p => {
      // slugがryokan/で始まるファイルを優先的に含める
      const isRyokanPath = p.slug && typeof p.slug === 'string' && p.slug.startsWith('ryokan/');
      
      // slugがonsen/で始まるファイルは温泉地ガイド用なので除外
      const isOnsenPath = p.slug && typeof p.slug === 'string' && p.slug.startsWith('onsen/');
      
      // 個別旅館の条件に一致するもの
      const isRyokanCategory = (p.category === '旅行' || p.category === '旅館・温泉') && 
        (p.subcategory === '個別旅館' || p.subcategory === 'おすすめ個別旅館ガイド');
      
      const isOnsenGuideCategory = p.subcategory === '温泉地ガイド' || p.category === '温泉地ガイド';

      // content/travel/ryokan配下と個別旅館カテゴリのみを表示（温泉地ガイドは除外）
      return (isRyokanPath || isRyokanCategory) && !isOnsenPath && !isOnsenGuideCategory && p.published !== false;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="おすすめ個別旅館ガイド - Market Supporter AI"
        description="厳選された個別旅館の詳しい情報をご紹介。"
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* パンくずリスト */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-blue-600">ホーム</Link></li>
              <li>/</li>
              <li><Link href="/travel" className="hover:text-blue-600">旅行</Link></li>
              <li>/</li>
              <li className="text-gray-900">おすすめ個別旅館ガイド</li>
            </ol>
          </nav>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">🏨 おすすめ個別旅館ガイド</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              厳選された個別旅館の詳しい情報をご紹介します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ryokanPosts.map((p) => (
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

          {/* トップへ戻るボタン */}
          <div className="text-center mt-12">
            <Link 
              href="/travel"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              旅行ページに戻る
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

