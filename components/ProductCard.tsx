import React from "react";
import type { UnifiedProduct } from "@/lib/malls/types";
import { mallKeyToStyle } from "@/lib/ui/mallStyles";
import { trackOutbound } from "@/lib/analytics/track";

type ProductCardProps = {
  product: UnifiedProduct;
  sessionId?: string;
};

export default function ProductCard({ product }: ProductCardProps) {
  const href = (product?.url || "").replace(/^http:/, "https:");
  if (!href) return null;

  const mall = mallKeyToStyle(product?.store?.key);

  return (
    <article className="flex h-full flex-col rounded-2xl bg-white shadow p-3">
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer nofollow" 
        className="block"
        onClick={() => trackOutbound(product)}
      >
        <div className="relative w-full h-40">
          <img
            src={(product.image || product.images?.[0] || "").replace(/^http:/, "https:")}
            alt={product.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </a>

      <div className="mt-2 text-sm line-clamp-2">{product.title}</div>
      <div className="mt-1 text-indigo-600 font-semibold">
        {product.price ? `¥${Number(product.price).toLocaleString()}` : "価格未取得"}
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className={`mt-auto inline-block text-center rounded-xl text-white font-semibold h-10 leading-10 ${mall.btn}`}
        onClick={() => trackOutbound(product)}
      >
        {mall.label}
      </a>
    </article>
  );
} 