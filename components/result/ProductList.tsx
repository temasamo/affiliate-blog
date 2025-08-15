import React from 'react';
import useSWR from 'swr';
import ProductCard from './ProductCard';
import FirstPick from './FirstPick';
import type { UnifiedProduct } from '@/lib/malls/types';

const fetcher = (url: string) => fetch(url).then(r => r.json());

type ProductListProps = {
  category: string;
  height: string;
  firmness: string;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  sessionId?: string;
};

export default function ProductList({ 
  category, 
  height, 
  firmness, 
  material, 
  minPrice, 
  maxPrice, 
  sessionId 
}: ProductListProps) {
  const qs = new URLSearchParams({
    category,
    height,
    firmness,
    material: material ?? "",
    minPrice: minPrice ? String(minPrice) : "",
    maxPrice: maxPrice ? String(maxPrice) : "",
  });

  const { data, error, isLoading } = useSWR(`/api/mall-products?${qs}`, fetcher);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          🛒 おすすめ商品を検索中...
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-slate-200 h-48 rounded-t-xl"></div>
              <div className="bg-white p-4 rounded-b-xl border border-slate-200">
                <div className="bg-slate-200 h-4 rounded mb-2"></div>
                <div className="bg-slate-200 h-6 rounded mb-3"></div>
                <div className="bg-slate-200 h-8 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !data?.ok) {
    return (
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          🛒 おすすめ商品
        </h3>
        <div className="text-center py-8">
          <p className="text-slate-600 mb-4">商品の読み込みに失敗しました</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            再試行
          </button>
        </div>
      </div>
    );
  }

  const products: UnifiedProduct[] = data.items || [];

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          🛒 おすすめ商品
        </h3>
        <div className="text-center py-8">
          <p className="text-slate-600 mb-4">
            検索キーワード: "{data.keyword}"
          </p>
          <p className="text-slate-500">
            条件に合う商品が見つかりませんでした
          </p>
        </div>
      </div>
    );
  }

  // 商品をスコア順でソートし、有効な商品のみをフィルタリング
  const all = products
    .filter(p => p?.url)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  // モール別に分割
  const byStore = {
    rakuten: all.filter((p:any) => p?.store?.key === "rakuten"),
    yahoo:   all.filter((p:any) => p?.store?.key === "yahoo"),
  };

  // ユーティリティ：空画像・http→https などの微整形（必要なら）
  const fix = (p:any) => ({
    ...p,
    image: (p.image || p.images?.[0] || "").replace(/^http:/, "https:"),
  });

  // ---- 第一候補の決め方 ----
  // ルール：
  // 1) 両モールがあるとき → score 最大の1件を firstPick に
  // 2) ただし second 以降は "firstPick と逆モール優先" で交互に詰めて偏り回避
  // 3) 片方しか無いとき → そちらから選ぶ（Yahoo が 0 件なら楽天のみ 等）

  function pickFirstAndSecondary(allItems:any[]) {
    const r = byStore.rakuten, y = byStore.yahoo;
    if (allItems.length === 0) return { first: null, rest: [] };

    // 1) 第一候補（全体で最良）
    const first = fix(allItems[0]);

    // 2) 第二候補（3件）— 交互補正
    //    first と逆モールを先頭にして交互に詰める
    const wantFirstStore = first.store?.key === "rakuten" ? "yahoo" : "rakuten";
    const alt = (a:any[], b:any[]) => {
      const out:any[] = [];
      let i=0,j=0;
      // 交互で最大6件ほど拾っておいて最後に first と重複を除外
      while ((i < a.length || j < b.length) && out.length < 6) {
        if (i < a.length) out.push(fix(a[i++]));
        if (j < b.length) out.push(fix(b[j++]));
      }
      return out;
    };

    const altList =
      wantFirstStore === "yahoo"
        ? alt(byStore.yahoo, byStore.rakuten)
        : alt(byStore.rakuten, byStore.yahoo);

    // first と同一IDを除外しつつ 3 件だけ
    const rest = altList.filter(p => p.id !== first.id).slice(0, 3);

    return { first, rest };
  }

  const { first: firstPick, rest: secondaryTop3 } = pickFirstAndSecondary(all);

  // 予算外フォールバックのバナー
  const meta = data?.meta;
  const budgetNote =
    meta && meta.budgetMatched === false
      ? `ご指定の予算${meta?.budgetRange?.min ? `¥${meta.budgetRange.min.toLocaleString()}` : ""}${meta?.budgetRange?.max ? `〜¥${meta.budgetRange.max.toLocaleString()}` : ""}で条件に合う商品が見つからなかったため、予算外から一致度の高い候補を表示しています。`
      : null;

  return (
    <>
      {/* 第一候補（1つ） */}
      <FirstPick product={firstPick} sessionId={sessionId} />
      
      {/* 予算外フォールバックバナー */}
      {budgetNote && (
        <div className="mb-8 rounded-xl bg-amber-50 text-amber-900 p-3 text-sm">
          {budgetNote}
        </div>
      )}

      {/* 第二候補（下部・3つ） */}
      {secondaryTop3.length > 0 && (
        <section className="rounded-2xl bg-white shadow p-5">
          <h3 className="text-lg font-bold mb-4">🔁 第二候補</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {secondaryTop3.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                sessionId={sessionId}
              />
            ))}
          </div>
        </section>
      )}

      {/* 検索キーワード情報 */}
      <div className="text-center mt-4">
        <p className="text-sm text-slate-500">
          検索キーワード: "{data.keyword}" | 合計 {all.length} 件
        </p>
      </div>
    </>
  );
} 