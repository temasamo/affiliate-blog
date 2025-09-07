import Link from 'next/link';
import { getTravelSlugs, getTravelPostBySlug } from '@/lib/mdx';

export async function getStaticProps() {
  const slugs = getTravelSlugs();
  const posts = slugs.map((s) => {
    const { frontMatter, slug } = getTravelPostBySlug(s);
    return { slug, ...frontMatter } as any;
  });
  posts.sort((a: any, b: any) => (a.date < b.date ? 1 : -1));
  return { props: { posts } };
}

export default function OnsenGuideIndex({ posts }: { posts: any[] }) {
  const onsenGuides = posts
    .filter(p => p.category === '旅行' && p.subcategory === '温泉地ガイド' && p.published !== false)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="mx-auto max-w-5xl p-6 sm:p-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            温泉地ガイド
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            日本各地の温泉地を徹底ガイド
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {onsenGuides.map((p) => (
            <Link
              key={p.slug}
              href={`/travel/${p.slug}`}
              className="group block rounded-2xl bg-white/90 backdrop-blur-sm border border-white/30 p-6 hover:bg-white hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1 no-underline"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-blue-600 font-medium">{p.date}</div>
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full group-hover:scale-150 transition-transform"></div>
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
  );
}
