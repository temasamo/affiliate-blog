import React from 'react';

export default function ReasonList({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-3">💡 診断のポイント</h3>
      <ul className="space-y-3">
        {items.map((t, i) => (
          <li key={i} className="rounded-xl bg-indigo-50/70 p-4 text-slate-700">
            <span className="mr-2 text-indigo-500">•</span>{t}
          </li>
        ))}
      </ul>
    </section>
  );
} 