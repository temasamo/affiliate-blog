import React from 'react';
import useSWR from 'swr';
import ProductCard from '../ProductCard';
import FirstPick from './FirstPick';
import FirstPickGallery from './FirstPickGallery';
import PrimaryCandidateGrid from './PrimaryCandidateGrid';
import NextCandidates from './NextCandidates';
import type { UnifiedProduct } from '@/lib/malls/types';
import { bandToRange, BudgetBand } from '@/lib/budget';

const fetcher = (url: string) => fetch(url).then(r => r.json());

type ProductListProps = {
  category: string;
  height: string;
  firmness: string;
  material?: string;
  budgetBand?: BudgetBand;
  sessionId?: string;
};

export default function ProductList({ 
  category, 
  height, 
  firmness, 
  material, 
  budgetBand, 
  sessionId,
  onFirstPick
}: ProductListProps & { onFirstPick?: (product: any) => void }) {
  const { min, max } = bandToRange(budgetBand);
  
  const qs = new URLSearchParams({
    category,
    height,
    firmness,
    material: material ?? "",
    hits: "40",
  });
  
  // 予算情報を追加
  if (min != null) qs.set("minPrice", String(min));
  if (max != null) qs.set("maxPrice", String(max));

  const { data, error, isLoading } = useSWR(`/api/mall-products?${qs}`, fetcher);

  // 第一候補を親コンポーネントに通知 - Hooksは常に最初に呼び出す
  React.useEffect(() => {
    if (data?.ok && data?.items?.length > 0 && onFirstPick) {
      const products = data.items.filter((p: any) => p?.url);
      if (products.length > 0) {
        const firstPick = {
          ...products[0],
          image: (products[0].image || products[0].images?.[0] || "").replace(/^http:/, "https:"),
        };
        onFirstPick(firstPick);
      }
    }
  }, [data, onFirstPick]);

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

  // エラー状態の処理
  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          🛒 おすすめ商品
        </h3>
        <div className="text-center py-8">
          <p className="text-slate-600 mb-4">商品の読み込みに失敗しました</p>
          <p className="text-slate-500 text-sm mb-4">{error.message || "通信エラー"}</p>
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

  // データが正常に取得できた場合
  const products: UnifiedProduct[] = data?.items || [];
  const meta = data?.meta || null;

  // 0件の場合
  if (products.length === 0) {
    return (
      <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-amber-900">
        <p className="font-medium">ご希望の価格帯では候補が少ないようです。</p>
        <p className="text-sm mt-1">一致度の高い候補を予算外からもご提案するか、外部検索もご利用ください。</p>
        <div className="mt-3 flex gap-2">
          <a 
            className="px-3 py-1 rounded-md bg-black text-white text-sm" 
            href="https://search.rakuten.co.jp/search/mall/枕/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            楽天で探す
          </a>
          <a 
            className="px-3 py-1 rounded-md bg-black text-white text-sm" 
            href="https://shopping.yahoo.co.jp/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Yahoo!で探す
          </a>
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

  // 第二候補を3件ずつグループ化
  function chunk<T>(arr: T[], n: number): T[][] {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
    return out;
  }
  const secondaryGroups = chunk(secondaryTop3, 3).map((c, i) => ({
    title: `候補グループ ${i + 1}`,
    products: c,
  }));

  return (
    <>
      {/* 第一候補（2つ） - ProductCard形式 */}
      <PrimaryCandidateGrid items={products} />
      
      {/* 予算外フォールバックバナー */}
      {data?.meta?.budgetMatched === false && (
        <div className="mb-8 rounded-xl bg-amber-50 text-amber-900 p-3 text-sm">
          ご指定の予算{data.meta.budgetRange?.min ? `¥${data.meta.budgetRange.min.toLocaleString()}` : ""}{data.meta.budgetRange?.max ? `〜¥${data.meta.budgetRange.max.toLocaleString()}` : ""}では該当が少なかったため、条件一致度の高い候補を予算外から表示しています。
        </div>
      )}

      {/* 第二候補（3件ずつグループ化） */}
      {secondaryGroups.length > 0 && (
        <NextCandidates 
          groups={secondaryGroups} 
          initial={1} 
          extraMax={2} 
        />
      )}

      {/* 検索キーワード情報（デバッグ用） */}
      {false && (
        <div className="text-center mt-4">
          <p className="text-sm text-slate-500">
            検索キーワード: "{data.keyword}" | 合計 {all.length} 件
          </p>
        </div>
      )}
    </>
  );
} 