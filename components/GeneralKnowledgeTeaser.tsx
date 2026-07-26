import Link from "next/link";
import type { SimplePost } from "@/lib/posts";

type Props = { posts?: SimplePost[] };

export default function GeneralKnowledgeTeaser({ posts = [] }: Props) {
  const generalKnowledgePosts = posts.filter((post) => {
    return (
      post.category === "一般教養" ||
      post.href?.startsWith("/articles/general-knowledge/knowledge")
    );
  });

  if (generalKnowledgePosts.length === 0) return null;

  return (
    <section className="my-10">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">NEW</span>
          📚 一般教養の新着記事
        </h2>
        <Link href="/articles/general-knowledge/knowledge" className="text-sm underline">もっと見る</Link>
      </div>

      <div className="relative overflow-hidden rounded-3xl border shadow-sm min-h-[260px] sm:min-h-[320px] lg:min-h-[380px]">
        <div aria-hidden className="absolute inset-0">
          <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-700 to-emerald-900" />
          <img
            src="/images/handshake-robot.svg"
            alt=""
            className="absolute right-0 top-0 h-full w-3/4 object-contain opacity-20"
          />
          <div className="absolute inset-0 bg-black/25" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="relative h-full p-4 sm:p-6 lg:p-8">
          <div className="grid h-full content-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {generalKnowledgePosts.slice(0, 3).map((post) => (
              <Link
                key={`${post.href}-${post.slug}`}
                href={post.href}
                className="rounded-2xl border border-white/60 bg-white/20 backdrop-blur-md shadow-md transition hover:bg-white/30 hover:shadow-lg p-4 text-white"
              >
                <div className="text-xs opacity-90 mb-1 drop-shadow-md">{post.date}</div>
                <h3 className="font-semibold leading-snug drop-shadow-md">{post.title}</h3>
                {post.description && (
                  <p className="mt-2 text-sm opacity-90 line-clamp-2 drop-shadow-md">
                    {post.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
