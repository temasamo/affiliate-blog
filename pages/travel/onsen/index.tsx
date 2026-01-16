import Link from 'next/link';
import { getTravelSlugs, getTravelPostBySlug } from '@/lib/mdx';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 旅行記事のリンクを生成する関数（リンク切れを防ぐ）
function getTravelArticleLink(slug: string, subcategory?: string): string {
  // ファイルパス形式のslugを処理（例: "onsen/yamagata-mogami-onsen"）
  if (slug.includes('/')) {
    return `/travel/${slug}`;
  }
  
  // 温泉地ガイド記事の場合
  if (subcategory === "温泉地ガイド") {
    return `/travel/onsen/${slug}`;
  }
  
  // その他は一般的なパス
  return `/travel/${slug}`;
}

export async function getStaticProps() {
  const slugs = getTravelSlugs();
  const posts = slugs.map((s) => {
    const { frontMatter, slug } = getTravelPostBySlug(s);
    return { slug: s, ...frontMatter } as any; // ファイルパス（s）を使用
  });
  posts.sort((a: any, b: any) => (a.date < b.date ? 1 : -1));
  return { props: { posts } };
}

export default function OnsenGuideIndex({ posts }: { posts: any[] }) {
  const onsenGuides = posts
    .filter(p => {
      // content/travel/onsenにある記事（onsen/で始まるslug）を優先的に含める
      const isOnsenPath = p.slug && typeof p.slug === 'string' && p.slug.startsWith('onsen/');
      
      // 温泉地ガイド記事（category: "旅行" && subcategory: "温泉地ガイド"）
      // ただし、onsen/で始まるものは既に含まれているため、onsen/で始まらないもののみ
      const isOnsenGuide = !isOnsenPath && 
        (p.category === '旅行') && 
        p.subcategory === '温泉地ガイド';
      
      // category が温泉地ガイドの記事も対象にする
      const isOnsenCategory = !isOnsenPath && p.category === '温泉地ガイド';
      
      // onsen/で始まる記事または温泉地ガイド記事を含める
      const matches = isOnsenPath || isOnsenGuide || isOnsenCategory;
      
      // publishedがfalseでないものを含める
      return matches && p.published !== false;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="温泉地ガイド - Market Supporter AI"
        description="日本各地の温泉地を徹底ガイド"
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
              <li className="text-gray-900">温泉地ガイド</li>
            </ol>
          </nav>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">♨️ 温泉地ガイド</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              日本各地の温泉地を徹底ガイド
            </p>
          </div>

          {onsenGuides.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <p className="text-gray-500">温泉地ガイドは準備中です。今後追加予定です。</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {onsenGuides.map((p) => (
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
