'use client';

import React from "react";
import type { UnifiedProduct } from "@/lib/malls/types";

export function ProductCard({ product, priorityBadge=false }: { product: any; priorityBadge?: boolean }) {
  // 安全な画像取得
  const imgSrc = product.image || product.images?.[0] || '/placeholder.svg';

  // モールボタン表示：Yahoo! も確実に出す
  const mallKey = product.store?.key; // 'rakuten' | 'yahoo' など
  const mallLabel =
    product.store?.label ||
    product.store?.name ||
    (mallKey === 'rakuten' ? 'Rakuten' : mallKey === 'yahoo' ? 'Yahoo!' : 'ショップで見る');

  const href = product.store?.affiliateUrl || product.url || '#';

  return (
    <article className="group rounded-xl border p-3 bg-white shadow-sm">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className="relative w-full rounded-lg overflow-hidden">
          <div className="h-44 md:h-52 lg:h-56 w-full">
            <img
              src={imgSrc}
              alt={product.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          {priorityBadge && (
            <span className="absolute left-2 top-2 pointer-events-none text-xs px-2 py-1 rounded-full bg-black/70 text-white">
              第一候補
            </span>
          )}
        </div>
        <h4 className="mt-2 line-clamp-2 font-medium">{product.title}</h4>
        {'price' in product && <div className="mt-1 text-sm">{Number(product.price).toLocaleString()}円</div>}
        <div className="mt-2">
          <button
            className={`px-3 py-1 rounded-md text-white text-sm ${
              mallKey === 'rakuten' ? 'bg-[#bf0000]' :
              mallKey === 'yahoo'   ? 'bg-[#5f01a5]' :
                                       'bg-slate-700'
            }`}
          >
            {mallLabel} で見る
          </button>
        </div>
      </a>
    </article>
  );
} 