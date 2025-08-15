import Link from "next/link";

export default function TravelTeaser({ posts = [] as any[] }) {
  if (!Array.isArray(posts) || posts.length === 0) return null;

  return (
    <section className="my-10 rounded-2xl border p-5 shadow-sm">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">
            NEW
          </span>
          🏝 旅行の新着記事
        </h2>
        <Link href="/travel" className="text-sm underline">もっと見る</Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((p: any) => (
          <Link
            key={p.slug}
            href={`/travel/${p.slug}`}
            className="rounded-xl border p-4 hover:shadow focus:outline-none focus:ring-2"
          >
            <div className="text-xs opacity-60 mb-1">{p.date}</div>
            <h3 className="font-medium leading-snug">{p.title}</h3>
            {p.description && (
              <p className="mt-2 text-sm opacity-80 line-clamp-2">{p.description}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
} 