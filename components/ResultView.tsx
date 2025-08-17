'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';

// 3件刻みに分割
function chunk3<T>(arr: T[]) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += 3) out.push(arr.slice(i, i + 3));
  return out;
}

type Props = {
  products: any[];
  finalTag?: string;
  onFinalAnswer?: (tag: string) => Promise<void>;
  onFinalTagChange?: (tag: string) => void;
};

export default function ResultView({ products, finalTag, onFinalAnswer, onFinalTagChange }: Props) {
  const [finalTagState, setFinalTagState] = useState<string>('none');
  const [addendum, setAddendum] = useState<string>('');

  useEffect(() => {
    // 結果ビュー表示時に必ず質問APIを叩く（Networkに出ているか確認用）
    fetch('/api/pillow-assist-question')
      .then(r => r.json())
      .then(j => console.log('[final_q] question', j))
      .catch(()=>{});
  }, []);

  async function handleFinalAnswer(tag: string) {
    console.log('[final_q] answer=', tag);
    const r = await fetch('/api/pillow-assist-answer', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ finalTag: tag })
    }).then(res => res.json()).catch(()=> ({}));
    setAddendum(r?.addendum ?? '');
    setFinalTagState(tag); // ← これで ProductList の SWRキーが変わるはず
    onFinalTagChange?.(tag); // 親コンポーネントに通知
  }

  // 第一候補（中3）＝ 上2を包含した3枚
  const midFirst = useMemo(() => products.slice(0, 3), [products]);

  // 第二候補は 4枚目以降から（= index 3 以降）最大 9件 → 3グループ
  const secondary = useMemo(() => products.slice(3, 12), [products]);
  const secGroups = useMemo(() => chunk3(secondary), [secondary]); // [G1, G2, G3]
  const [activeIdx, setActiveIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-8">
      {/* 最後の一問（仮） */}
      <div className="mb-3 rounded border p-3">
        <div className="text-sm mb-2">最後の一問（仮）</div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={()=>handleFinalAnswer('heat')} className="px-3 py-1 border rounded">ムレ/暑さ</button>
          <button onClick={()=>handleFinalAnswer('shoulder')} className="px-3 py-1 border rounded">肩・首</button>
          <button onClick={()=>handleFinalAnswer('snore')} className="px-3 py-1 border rounded">いびき</button>
          <button onClick={()=>handleFinalAnswer('none')} className="px-3 py-1 border rounded opacity-70">特になし</button>
        </div>
        {addendum && <p className="mt-2 text-xs text-gray-600">{addendum}</p>}
      </div>

      {/* 第一候補グループ（中3） */}
      {midFirst.length > 0 && (
        <section className="mx-auto max-w-6xl px-4">
          <h4 className="text-center text-lg font-bold mb-4">第一候補グループ（追加）</h4>
          <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {midFirst.map((p: any, i: number) => (
              <ProductCard key={p.id ?? `m${i}`} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* 第二候補グループ（タブ） */}
      {secGroups.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 mt-10">
          <h3 className="text-base font-semibold mb-3">第二候補グループ</h3>

          {/* タブボタン（展開前はグループ1のみ、展開後は2/3も表示） */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              className={`px-3 py-1 rounded-full text-sm border ${activeIdx === 0 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-300'}`}
              onClick={() => setActiveIdx(0)}
            >
              グループ1
            </button>

            {expanded && secGroups[1] && (
              <button
                className={`px-3 py-1 rounded-full text-sm border ${activeIdx === 1 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-300'}`}
                onClick={() => setActiveIdx(1)}
              >
                グループ2
              </button>
            )}

            {expanded && secGroups[2] && (
              <button
                className={`px-3 py-1 rounded-full text-sm border ${activeIdx === 2 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-300'}`}
                onClick={() => setActiveIdx(2)}
              >
                グループ3
              </button>
            )}
          </div>

          {/* グループ本体 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {secGroups[activeIdx]?.map((p: any, i: number) => (
              <ProductCard key={p.id ?? `r${activeIdx}-${i}`} product={p} />
            ))}
          </div>

          {/* 展開ボタン（最大+2グループ） */}
          {!expanded && (secGroups.length > 1) && (
            <div className="text-center mt-6">
              <button
                onClick={() => { setExpanded(true); if (secGroups[1]) setActiveIdx(1); }}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-800 text-white text-sm"
              >
                他の候補もみる（最大+2グループ）
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
} 