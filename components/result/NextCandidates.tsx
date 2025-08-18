import { useState } from "react";
import ProductCard from "./ProductCard";

type Group = { title: string; products: any[] };

export default function NextCandidates({
  groups,
  initial = 2,          // 最初に見せるグループ数
  extraMax = 2,         // 追加で表示できる最大グループ数（合計初期+2グループ）
}: { groups: Group[]; initial?: number; extraMax?: number; }) {
  if (!groups?.length) return null;

  const [showExtra, setShowExtra] = useState(false);

  const base = groups.slice(0, initial);
  const extras = groups.slice(initial, initial + extraMax);
  const visible = showExtra ? [...base, ...extras] : base;

  return (
    <section className="mt-8">
      <h3 className="text-lg font-semibold mb-3">🔁 第二候補</h3>

      {visible.map((g, idx) => (
        <div key={idx} className="rounded-2xl bg-white shadow p-4 mb-6">
          <div className="font-semibold mb-3">{g.title}</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {g.products.slice(0, 3).map((p, i) => (
              <ProductCard key={`${g.title}-${i}`} product={p} />
            ))}
          </div>
        </div>
      ))}

      {/* 2グループ以上ある時だけ、ボタン表示 */}
      {groups.length > initial && !showExtra && (
        <div className="text-center">
          <button
            className="rounded-xl px-4 py-2 bg-slate-100 hover:bg-slate-200"
            onClick={() => setShowExtra(true)}
          >
            他の候補もみる
          </button>
        </div>
      )}
    </section>
  );
} 