'use client';

import React, { useMemo, useState, useEffect } from 'react';
import useSWR from 'swr';
import ResultView from '../ResultView';
import type { UnifiedProduct } from '@/lib/malls/types';
import { bandToRange, BudgetBand } from '@/lib/budget';
import { buildMallUrl } from '@/lib/buildMallUrl';

const fetcher = (url: string) => fetch(url).then(r => r.json());
const DEBUG_OVERLAY = false;

// 交互ピッカー
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

type ProductListProps = {
  category: string; height: string; firmness: string;
  material?: string; budgetBand?: BudgetBand; sessionId?: string;
  answers?: any; result?: any; onFirstPick?: (product: any) => void;
  finalTag?: string; // 追加
};

export default function ProductList({
  category, height, firmness, material, budgetBand, sessionId, answers, result, onFirstPick, finalTag: propsFinalTag,
}: ProductListProps) {
  const { min, max } = bandToRange(budgetBand);
  const [finalTag, setFinalTag] = useState<string>('none');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<Array<{tag:string;label:string}>>([]);
  const [addendum, setAddendum] = useState<string>('');

  // 結果ビュー表示時に質問を必ず取得
  useEffect(() => {
    fetch('/api/pillow-assist-question')
      .then(r => r.json())
      .then(j => { setQuestion(j?.question ?? '最後の一問'); setOptions(j?.options ?? []); })
      .catch(() => {});
  }, []);

  async function handleFinalAnswer(tag: string) {
    const r = await fetch('/api/pillow-assist-answer', { 
      method:'POST', 
      headers:{'Content-Type':'application/json'}, 
      body: JSON.stringify({ finalTag: tag })
    }).then(res=>res.json()).catch(() => ({}));
    setAddendum(r?.addendum ?? '');
    setFinalTag(tag); // ← これでSWRキーが変わり再取得
    // event?.('final_q', { finalTag: tag, sessionId });
  }
  
  const url = useMemo(() => {
    const u = buildMallUrl({
      category, height, firmness, material,
      min, max, hits: 40,
      finalTag: finalTag, // ← 必ず含める
      sessionId,
    });
    console.log('[mall key]', u); // 一時ログ：&finalTag=... が見えるはず
    return u;
  }, [category, height, firmness, material, min, max, finalTag, sessionId]);

  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false, keepPreviousData: true, dedupingInterval: 1500,
  });

  const raw: UnifiedProduct[] = data?.items ?? [];
  const products: UnifiedProduct[] = interleaveByStore(raw);
  const meta = data?.meta ?? null;

  React.useEffect(() => {
    if (!onFirstPick) return;
    const first = products.find((p: any) => p?.url);
    if (first) onFirstPick({ ...first, image: (first.image || first.images?.[0] || '').replace(/^http:/, 'https:') });
  }, [products, onFirstPick]);

  const Debug = () => DEBUG_OVERLAY ? (
    <div className="fixed left-2 bottom-2 z-[9999] rounded bg-black/70 text-white text-xs px-2 py-1">all:{products.length}</div>
  ) : null;

  if (isLoading && !data) return <div className="text-center text-sm text-slate-500 py-6">候補を検索中…</div>;
  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-red-900">
        <p className="font-medium">商品の読み込みに失敗しました。</p>
        <p className="text-sm mt-1">しばらく時間をおいてから再試行してください。</p>
      </div>
    );
  }
  if (!data?.ok) {
    return (
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-amber-900">
        <p className="font-medium">0件でした。</p>
        <p className="text-sm mt-1">条件を少し広げてお試しください。</p>
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-amber-900">
        <p className="font-medium">ご希望の条件では候補が見つかりませんでした。</p>
        {meta?.budgetMatched === false && (
          <p className="text-sm mt-1">
            ご指定の価格帯（
            {meta?.budgetRange?.min ? `¥${meta.budgetRange.min.toLocaleString()}` : '—'}
            {meta?.budgetRange?.max ? `〜¥${meta.budgetRange.max.toLocaleString()}` : ''}
            ）では少ないため、条件一致度の高い候補を予算外からも表示しています。
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <Debug />
      
      {/* 結果カードの直上に簡易UI（デザインは後で整える） */}
      <div className="mb-3 rounded-xl border p-3 bg-white/70">
        <p className="text-sm font-medium">{question}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(options.length ? options : [
            {tag:'heat',label:'ムレ/暑さ'},
            {tag:'shoulder',label:'肩・首のこり'},
            {tag:'snore',label:'いびき'},
            {tag:'none',label:'特になし'}
          ]).map(o => (
            <button
              key={o.tag}
              onClick={() => handleFinalAnswer(o.tag)}
              className="px-3 py-1 rounded-lg border"
            >
              {o.label}
            </button>
          ))}
          <button onClick={() => handleFinalAnswer('skip')} className="px-3 py-1 rounded-lg border opacity-70">
            スキップ
          </button>
        </div>
        {addendum && <p className="mt-2 text-xs text-gray-600">{addendum}</p>}
      </div>

      {/* 中3＋第二候補（タブ） */}
      <ResultView products={products} finalTag={finalTag} onFinalAnswer={handleFinalAnswer} />
    </>
  );
}
