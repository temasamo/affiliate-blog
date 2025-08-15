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

export default function TravelIndex({ posts }: { posts: any[] }) {
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

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/travel/${p.slug}`}
                className="group block rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 p-6 hover:bg-white hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs text-blue-600 font-medium">{p.date}</div>
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full group-hover:scale-150 transition-transform"></div>
                </div>
                <div className="font-bold text-gray-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                  {p.title}
                </div>
                {p.description && (
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
} 