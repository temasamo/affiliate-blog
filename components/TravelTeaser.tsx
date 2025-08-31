import Link from "next/link";

type Props = { posts?: any[] };

export default function TravelTeaser({ posts = [] }: Props) {
  if (!Array.isArray(posts) || posts.length === 0) return null;

  const enableVideo = process.env.NEXT_PUBLIC_TRAVEL_TEASER_BG_VIDEO === "true";

  return (
    <section className="my-10">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">NEW</span>
          🏝 旅行の新着記事
        </h2>
        <Link href="/travel" className="text-sm underline">もっと見る</Link>
      </div>

                   {/* 背景画像ベースのデザイン */}
             <div className="relative overflow-hidden rounded-3xl border shadow-sm
                             min-h-[260px] sm:min-h-[320px] lg:min-h-[380px]">

               {/* BG Image/Video */}
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

                   {/* 可読性を保つ薄い暗幕＋下部グラデ */}
                   <div className="absolute inset-0 bg-black/20" />
                   <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28
                                   bg-gradient-to-t from-black/35 to-transparent" />
                 </div>
               ) : (
                 <div aria-hidden className="absolute inset-0">
                   <img
                     src="/media/travel-teaser.jpg"
                     alt="Travel background"
                     className="h-full w-full object-cover"
                   />
                   {/* 画像用のオーバーレイ */}
                   <div className="absolute inset-0 bg-black/30" />
                   <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32
                                   bg-gradient-to-t from-black/50 to-transparent" />
                 </div>
               )}

        {/* コンテンツ層 */}
        <div className="relative h-full p-4 sm:p-6 lg:p-8">
          <div className="grid h-full content-start gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {posts.slice(0, 3).map((p) => (
          <Link
            key={p.slug}
            href={`/travel/${p.slug}`}
                /* ガラス風カード：背景をぼかしつつ半透明に */
                className="rounded-2xl border
                           border-white/60
                           bg-white/20
                           backdrop-blur-md
                           shadow-md
                           transition
                           hover:bg-white/30 hover:shadow-lg
                           p-4
                           text-white"  // ← 全体の文字色を白に
          >
                <div className="text-xs opacity-90 mb-1 drop-shadow-md">{p.date}</div>
                <h3 className="font-semibold leading-snug drop-shadow-md">{p.title}</h3>
            {p.description && (
                  <p className="mt-2 text-sm opacity-90 line-clamp-2 drop-shadow-md">
                    {p.description}
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