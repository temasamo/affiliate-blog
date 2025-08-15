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
  const enableVideo = process.env.NEXT_PUBLIC_TRAVEL_TEASER_BG_VIDEO === "true";
  
  return (
    <main className="relative overflow-hidden rounded-3xl border shadow-sm min-h-[60vh]">
      {/* 背景画像/動画 */}
      {enableVideo ? (
        <div aria-hidden className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/media/travel-teaser.jpg"
          >
            <source src="/media/travel-teaser.mp4" type="video/mp4" />
          </video>
          {/* 薄い暗幕＋下グラデで可読性UP */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/45 to-transparent" />
        </div>
      ) : (
        <div aria-hidden className="absolute inset-0">
          <img
            src="/media/travel-teaser.jpg"
            alt="Travel background"
            className="h-full w-full object-cover"
          />
          {/* 画像用のオーバーレイ */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* コンテンツ層（白文字） */}
      <section className="relative mx-auto max-w-5xl p-6 sm:p-10 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold drop-shadow-md">旅行カテゴリ</h1>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/travel/${p.slug}`}
                className="block rounded-2xl border border-white/40 bg-white/10 backdrop-blur-md p-4 hover:bg-white/20 hover:shadow-lg transition text-white"
              >
                <div className="text-xs opacity-90 drop-shadow">{p.date}</div>
                <div className="mt-1 font-semibold leading-snug drop-shadow">{p.title}</div>
                {p.description && (
                  <p className="mt-2 text-sm opacity-90 line-clamp-2 drop-shadow">{p.description}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
} 