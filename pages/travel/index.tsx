import Link from 'next/link';
import { getTravelSlugs, getTravelPostBySlug } from '@/lib/mdx';

export async function getStaticProps() {
  const slugs = getTravelSlugs();
  const posts = slugs.map((s) => {
    const { frontMatter, slug } = getTravelPostBySlug(s);
    return { slug: s, ...frontMatter } as any; // ファイルパス（s）を使用
  });
  posts.sort((a: any, b: any) => (a.date < b.date ? 1 : -1));
  return { props: { posts } };
}

export default function TravelIndex({ posts }: { posts: any[] }) {
  // デバッグ情報を追加
  console.log('All posts:', posts.map(p => ({ slug: p.slug, category: p.category, subcategory: p.subcategory, published: p.published })));
  
  // 温泉地ガイド（category: "旅行" かつ subcategory: "温泉地ガイド"）
  // 一時的にonsen/配下の記事を除外
  const onsenGuidePosts = posts
    .filter(p => p.category === '旅行' && p.subcategory === '温泉地ガイド' && p.published !== false && !p.slug.includes('yamagata-') && !p.slug.includes('hokkaido-') && !p.slug.includes('gero-') && !p.slug.includes('gifu'))
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, 6);
  
  console.log('Onsen guide posts:', onsenGuidePosts.map(p => ({ slug: p.slug, title: p.title })));
  
  // 高級温泉旅館ガイド（slugに"luxury"が含まれるもの）
  const luxuryOnsenPosts = posts.filter((p) => p.slug && p.slug.includes('luxury'));
  
  // おすすめ個別旅館ガイド（category: "旅行" かつ subcategory: "個別旅館"）
  const individualRyokanPosts = posts
    .filter(p => p.category === '旅行' && p.subcategory === '個別旅館' && p.published !== false)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, 6);
  
  // その他の記事（luxuryを含まず、温泉地ガイドでも個別旅館でもないもの）
  const otherPosts = posts.filter((p) => 
    p.slug && 
    !p.slug.includes('luxury') && 
    !(p.category === '旅行' && p.subcategory === '温泉地ガイド') &&
    !(p.category === '旅行' && p.subcategory === '個別旅館')
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="mx-auto max-w-5xl p-6 sm:p-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            旅行カテゴリ
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            厳選された旅行情報とお得な予約方法をご紹介
          </p>
        </div>

        {/* 温泉地ガイドセクション */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            ♨️ 温泉地ガイド
          </h2>
          {onsenGuidePosts.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
              <p className="text-gray-500">温泉地ガイドは準備中です。今後追加予定です。</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {onsenGuidePosts.map((p) => (
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
          )}
        </section>

        {/* 高級温泉旅館ガイドセクション */}
        {luxuryOnsenPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              🏯 高級温泉旅館ガイド
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {luxuryOnsenPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/travel/${p.slug}`}
                  className="group block rounded-2xl bg-white/90 backdrop-blur-sm border border-white/30 p-6 hover:bg-white hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1 no-underline"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs text-blue-600 font-medium">{p.date}</div>
                    <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-red-400 rounded-full group-hover:scale-150 transition-transform"></div>
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

        {/* おすすめ個別旅館ガイドセクション */}
        {individualRyokanPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              🏨 おすすめ個別旅館ガイド
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {individualRyokanPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/travel/${p.slug}`}
                  className="group block rounded-2xl bg-white/90 backdrop-blur-sm border border-white/30 p-6 hover:bg-white hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1 no-underline"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs text-blue-600 font-medium">{p.date}</div>
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full group-hover:scale-150 transition-transform"></div>
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
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              🗾 その他
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/travel/${p.slug}`}
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
              ))}
            </div>
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
