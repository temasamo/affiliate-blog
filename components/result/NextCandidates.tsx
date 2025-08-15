import { useState } from "react";
import ProductCard from "./ProductCard";

type Group = { title: string; products: any[] };

export default function NextCandidates({ groups, maxGroups = 3 }: { groups: Group[]; maxGroups?: number; }) {
  if (!groups?.length) return null;
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? groups : groups.slice(0, maxGroups);
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-3">🔁 次点候補</h3>
      <div className="space-y-6">
        {visible.map((g, idx) => (
          <div key={idx} className="rounded-2xl bg-white shadow p-4">
            <div className="font-semibold mb-3">{g.title}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {g.products.map((p, i) => (
                <ProductCard key={`${g.title}-${i}`} product={p} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {groups.length > maxGroups && (
        <div className="mt-4">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="rounded-xl px-4 py-2 bg-slate-100 hover:bg-slate-200"
          >
            {expanded ? "閉じる" : "その他の候補を見る"}
          </button>
        </div>
      )}
    </section>
  );
} 