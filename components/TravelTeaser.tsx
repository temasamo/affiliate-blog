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
                     <source src="/media/travel-autumn.mp4" type="video/mp4" />
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

            {posts.slice(0, 3).map((p) => {
              // 旅行記事のリンクを生成する関数
              const getTravelLink = (slug: string, subcategory?: string) => {
                // 名月荘の記事の特別処理（複数のslug形式に対応）
                if (slug === "meigetsuso-part1" || slug.includes("meigetsuso-part1")) {
                  return `/travel/ryokan/2025-10-15-meigetsuso-part1`;
                }
                if (slug === "meigetsuso-part2" || slug.includes("meigetsuso-part2")) {
                  return `/travel/ryokan/2025-10-17-meigetsuso-part2`;
                }
                
                // 古窯の記事の特別処理（複数のslug形式に対応）
                if (slug === "koyo-onsen-part1" || slug.includes("koyo-onsen-part1") || slug === "2025-10-29-koyo-onsen-part1") {
                  return `/travel/ryokan/2025-10-29-koyo-onsen-part1`;
                }
                if (slug === "koyo-onsen-part2" || slug.includes("koyo-onsen-part2") || slug === "2025-10-29-koyo-onsen-part2") {
                  return `/travel/ryokan/2025-10-29-koyo-onsen-part2`;
                }
                if (slug === "koyo-renewal" || slug.includes("koyo-renewal") || slug === "2025-11-01-koyo-renewal" || slug.includes("2025-11-01-koyo-renewal")) {
                  return `/travel/ryokan/2025-11-01-koyo-renewal`;
                }
                
                // ファイルパス形式のslugを処理（例: "ryokan/2025-10-29-koyo-onsen-part1", "ryokan/2025-11-01-koyo-renewal"）
                if (slug.includes('/')) {
                  return `/travel/${slug}`;
                }
                
                // 温泉地ガイド記事の場合
                if (subcategory === "温泉地ガイド") {
                  return `/travel/onsen/${slug}`;
                }
                
                // 個別旅館記事の場合
                if (subcategory === "個別旅館" || subcategory === "おすすめ個別旅館ガイド") {
                  return `/travel/ryokan/${slug}`;
                }
                
                return `/travel/${slug}`;
              };
              
              return (
          <Link
            key={p.slug}
            href={getTravelLink(p.slug, p.subcategory)}
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
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
} 