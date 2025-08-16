'use client';

import useSWR from 'swr';
import { useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { bandToRange, BudgetBand } from '@/lib/budget';
import { toPercent } from '@/utils/toPercent';

const fetcher = (url: string) => fetch(url).then(r => r.json());

// モール交互ピッカー（Rakuten ↔ Yahoo 交互 → その他）
function interleaveByStore(items: any[]) {
  const rak: any[] = [];
  const yah: any[] = [];
  const other: any[] = [];
  for (const it of items || []) {
    const k = it?.store?.key;
    if (k === 'rakuten') rak.push(it);
    else if (k === 'yahoo') yah.push(it);
    else other.push(it);
  }
  const out: any[] = [];
  let i = 0;
  while (rak[i] || yah[i]) {
    if (rak[i]) out.push(rak[i]);
    if (yah[i]) out.push(yah[i]);
    i++;
  }
  return out.concat(other);
}

export default function TopFirstGrid(props: {
  category: string; height: string; firmness: string;
  material?: string; budgetBand?: BudgetBand; sessionId?: string;
  matchPercent?: number;
}) {
  const { min, max } = bandToRange(props.budgetBand);
  const qs = new URLSearchParams();
  if (props.category) qs.set('category', props.category);
  if (props.height)   qs.set('height', props.height);
  if (props.firmness) qs.set('firmness', props.firmness);
  if (props.material) qs.set('material', props.material);
  if (min != null) qs.set('minPrice', String(min));
  if (max != null) qs.set('maxPrice', String(max));
  qs.set('hits', '40');
  if (props.sessionId) qs.set('sid', props.sessionId);

  const { data, isLoading, error } = useSWR(`/api/mall-products?${qs.toString()}`, fetcher, {
    revalidateOnFocus: false, keepPreviousData: true, dedupingInterval: 1500,
  });

  const raw = data?.items ?? [];
  const items = useMemo(() => interleaveByStore(raw), [raw]);
  const topFirst = useMemo(() => items.slice(0, 2), [items]);
  const match = toPercent(props.matchPercent ?? 76);

  return (
    <section className="mx-auto max-w-6xl px-4 mt-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-center text-xl font-bold mb-3">マッチング度</h3>
        <div className="mx-auto max-w-3xl">
          <div className="h-3 rounded-full bg-slate-200">
            <div className="h-3 rounded-full bg-indigo-600 transition-all" style={{ width: `${match}%` }} />
          </div>
          <div className="mt-1 text-center text-indigo-600 font-semibold">{match}%</div>
        </div>

        <h4 className="text-center text-lg font-bold mt-6 mb-2">第一候補グループ</h4>
        {error && <p className="text-center text-sm text-red-600">候補の読み込みに失敗しました。</p>}
        {isLoading && items.length === 0 && <p className="text-center text-sm text-slate-500">検索中…</p>}

        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {topFirst.map((p: any, i: number) => (
            <ProductCard key={p.id ?? `t${i}`} product={p} priorityBadge />
          ))}
        </div>
      </div>
    </section>
  );
} 