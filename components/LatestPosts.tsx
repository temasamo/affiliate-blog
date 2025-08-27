import Link from "next/link";

type Item = {
  slug: string;
  title: string;
  category: string | null;
  date: string | null;
};

export default function LatestPosts({ items }: { items: Item[] }) {
  if (!items?.length) return null;

  return (
    <section className="mt-8 md:mt-10">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl md:text-2xl font-semibold">新着記事</h2>
        <Link
          href="/contents"
          className="text-sm md:text-base underline underline-offset-4 hover:opacity-80"
        >
          すべて見る →
        </Link>
      </div>

      <ul
        className="
          grid gap-3 md:gap-4
          grid-cols-1 md:grid-cols-2
        "
        aria-label="新着記事一覧"
      >
        {items.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/articles/${p.slug}`}
              className="
                block rounded-xl border border-gray-200 bg-white/70
                px-4 py-3 md:px-5 md:py-4
                hover:shadow-sm hover:bg-white transition
              "
            >
              <div className="mb-1 flex items-center gap-2">
                {p.category && (
                  <span
                    className="
                      inline-flex items-center rounded-full
                      border border-gray-300 px-2 py-0.5
                      text-xs md:text-[13px] leading-none
                      bg-gray-50
                    "
                  >
                    {p.category}
                  </span>
                )}
                {p.date && (
                  <time
                    className="text-xs text-gray-500"
                    dateTime={p.date}
                    aria-label="公開日"
                  >
                    {p.date}
                  </time>
                )}
              </div>
              <h3 className="line-clamp-2 text-sm md:text-base font-medium">
                {p.title}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
} 