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
    <main className="relative overflow-hidden rounded-3xl border shadow-sm min-h-[60vh] bg-white">
      {/* コンテンツ層（黒文字） */}
      <section className="relative mx-auto max-w-5xl p-6 sm:p-10 text-gray-900">
        <h1 className="text-2xl sm:text-3xl font-bold">旅行カテゴリ</h1>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/travel/${p.slug}`}
                className="block rounded-2xl border border-gray-200 bg-white p-4 hover:bg-gray-50 hover:shadow-lg transition text-gray-900"
              >
                <div className="text-xs text-gray-600">{p.date}</div>
                <div className="mt-1 font-semibold leading-snug text-gray-900">{p.title}</div>
                {p.description && (
                  <p className="mt-2 text-sm text-gray-700 line-clamp-2">{p.description}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
} 