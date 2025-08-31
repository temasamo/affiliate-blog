import Link from 'next/link';
import { getTravelSlugs, getTravelPostBySlug } from '@/lib/mdx';

// 温泉記事のみをフィルタリングする関数
function filterOnsenPosts(posts: any[]): any[] {
  return posts.filter(post => 
    post.slug.includes('onsen') || 
    post.slug.includes('温泉') ||
    post.category === '旅行'
  );
}

// 記事のパスを生成する関数
function getArticlePath(slug: string): string {
  return `/travel/onsen/${slug}`;
}

export async function getStaticProps() {
  const slugs = getTravelSlugs();
  const posts = slugs.map((s) => {
    const { frontMatter, slug } = getTravelPostBySlug(s);
    return { slug, ...frontMatter } as any;
  });
  
  // 温泉記事のみをフィルタリング
  const onsenPosts = filterOnsenPosts(posts);
  onsenPosts.sort((a: any, b: any) => (a.date < b.date ? 1 : -1));
  
  return { props: { posts: onsenPosts } };
}

export default function OnsenIndex({ posts }: { posts: any[] }) {
  // 最新記事（最新3件）
  const latestPosts = posts.slice(0, 3);
  
  // その他の記事
  const otherPosts = posts.slice(3);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="mx-auto max-w-5xl p-6 sm:p-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            全国温泉地ガイド
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            日本全国の温泉地を網羅した温泉情報と宿泊予約
          </p>
        </div>

        {/* 新着記事セクション */}
        {latestPosts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                  NEW
                </span>
                ♨️ 温泉の新着記事
              </h2>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={getArticlePath(p.slug)}
                  className="group block rounded-2xl bg-white/90 backdrop-blur-sm border border-white/30 p-6 hover:bg-white hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1 no-underline"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs text-blue-600 font-medium">{p.date}</div>
                    <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  </div>
                  <h3 className="font-bold text-gray-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors no-underline">
                    {p.title}
                  </h3>
                  {p.description && (
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {p.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* その他の記事セクション */}
        {otherPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">その他の温泉記事</h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={getArticlePath(p.slug)}
                    className="group block rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 p-6 hover:bg-white hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1 no-underline"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs text-blue-600 font-medium">{p.date}</div>
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full group-hover:scale-150 transition-transform"></div>
                    </div>
                    <h3 className="font-bold text-gray-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors no-underline">
                      {p.title}
                    </h3>
                    {p.description && (
                      <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {p.description}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* トップへ戻るボタン */}
        <div className="text-center mt-12">
          <Link 
            href="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            トップページへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
} 