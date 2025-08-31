import Link from "next/link";

type Item = {
  url: string;
  title: string;
  date: string;
  description?: string | null;
};

export default function PostListSimple({ items }: { items: Item[] }) {
  if (!items?.length) return null;

  return (
    <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <li key={p.url} className="rounded-2xl bg-white shadow-sm border border-gray-100">
          <Link href={p.url} className="block p-5 hover:bg-gray-50 transition">
            <time className="text-xs text-gray-500">{p.date}</time>
            <h2 className="mt-1 font-semibold leading-snug line-clamp-2">{p.title}</h2>
            {p.description ? (
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">{p.description}</p>
            ) : null}
            <span className="inline-flex items-center gap-1 text-blue-600 text-sm mt-3">
              続きを読む →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
} 