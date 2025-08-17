type Product = { id: string; title: string; price: number; image: string; url: string };
type Props = { items?: Product[]; isLoading?: boolean; error?: unknown };

export default function ProductList({ items, isLoading, error }: Props) {
  const safe = items ?? [];
  if (isLoading) return <div className="p-6 text-sm text-gray-500">読み込み中…</div>;
  if (error)    return <EmptyState title="読み込みに失敗しました" description="時間をおいて再実行してください。" />;
  if (safe.length === 0) return <EmptyState title="候補が見つかりません" description="条件を少し広げて再検索してみましょう。" />;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {safe.map(p => (
        <li key={p.id} className="rounded-2xl border p-4">
          <a href={p.url} target="_blank" rel="noreferrer" className="block">
            <img src={p.image || "/pillow_inline_default.jpg"} alt={p.title} className="h-48 w-full object-cover rounded-xl" />
            <div className="mt-3 font-medium">{p.title}</div>
            <div className="text-sm text-gray-500">¥{Number(p.price ?? 0).toLocaleString()}</div>
          </a>
        </li>
      ))}
    </ul>
  );
}

function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-2xl border p-8 text-center">
      <div className="text-base font-semibold">{title}</div>
      {description && <div className="mt-1 text-sm text-gray-500">{description}</div>}
    </div>
  );
} 