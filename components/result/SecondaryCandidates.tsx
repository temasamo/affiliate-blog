import React, { useState } from 'react';
import { ProductCard } from "@/components/ProductCard";
import type { UnifiedProduct } from '@/lib/malls/types';

const GROUP_SIZE = 3;
const EXTRA_GROUP_MAX = 2;

export function SecondaryCandidates({ products }: { products: UnifiedProduct[] }) {
  const all = products.slice(2); // 第一候補の2件を除外
  const groups: UnifiedProduct[][] = [];
  for (let i = 0; i < all.length; i += GROUP_SIZE) groups.push(all.slice(i, i + GROUP_SIZE));

  const [visible, setVisible] = useState(1);
  const canShowMore = visible < Math.min(groups.length, 1 + EXTRA_GROUP_MAX);

  return (
    <section className="mt-8">
      <h3 className="text-base font-semibold mb-3">第二候補</h3>
      {groups.slice(0, visible).map((g, idx) => (
        <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {g.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ))}
      {canShowMore && (
        <button 
          className="mx-auto block text-sm underline" 
          onClick={() => setVisible(v => v + 1)}
        >
          他の候補もみる
        </button>
      )}
    </section>
  );
} 