export function PointsSection({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((t, i) => (
          <li key={i} className="rounded-xl bg-slate-50 p-3 text-slate-700">
            <span className="mr-2 text-indigo-500">•</span>{t}
          </li>
        ))}
      </ul>
    </section>
  );
} 