import { ProductCard } from "@/components/ProductCard";
import type { UnifiedProduct } from "@/lib/malls/types";

export default function PrimaryCandidateGrid({ items }: { items: UnifiedProduct[] }) {
  if (!items?.length) return null;
  const top2 = items.slice(0, 2); // 2つだけ

  return (
    <section className="rounded-2xl bg-white shadow p-5">
      <h3 className="text-lg font-bold mb-4">🏆 第一候補</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {top2.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
} 