'use client';

import useSWR from 'swr';
import { useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { bandToRange, BudgetBand } from '@/lib/budget';
import { toPercent } from '@/utils/toPercent';
import { buildMallUrl } from '@/lib/buildMallUrl';

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
  finalTag?: string;
}) {
  const { min, max } = bandToRange(props.budgetBand);
  
  const url = buildMallUrl({
    category: props.category,
    height: props.height,
    firmness: props.firmness,
    material: props.material,
    min,
    max,
    hits: 40,
    finalTag: props.finalTag ?? 'none',
    sessionId: props.sessionId,
  });

  const { data, isLoading, error } = useSWR(url, fetcher, {
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
        {error && (
          <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-red-900 mb-4">
            <p className="font-medium">候補の読み込みに失敗しました。</p>
            <p className="text-sm mt-1">しばらく時間をおいてから再試行してください。</p>
          </div>
        )}
        {!data?.ok && (
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-amber-900 mb-4">
            <p className="font-medium">0件でした。</p>
            <p className="text-sm mt-1">条件を少し広げてお試しください。</p>
          </div>
        )}
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