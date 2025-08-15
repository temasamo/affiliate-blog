import React, { useCallback, useState } from 'react';
import type { UnifiedProduct } from '@/lib/malls/types';

type ProductCardProps = {
  product: UnifiedProduct;
  sessionId?: string;
};

export default function ProductCard({ product, sessionId }: ProductCardProps) {
  const [sending, setSending] = useState(false);

  const handleClick = useCallback(async () => {
    setSending(true);
    try {
      await fetch("/api/log-outbound", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ctaId: `product-${product.store.key}`,
          url: product.url,
          page: "diagnosis-result",
          sessionId,
          referrer: typeof window !== "undefined" ? window.location.href : undefined,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        }),
        keepalive: true,
      });
    } catch {
      /* ログ失敗は遷移をブロックしない */
    } finally {
      setSending(false);
      window.open(product.url, "_blank", "noopener,noreferrer");
    }
  }, [product, sessionId]);

  // Amazonボタンを環境変数で制御
  if (product.store.key === 'amazon' && process.env.NEXT_PUBLIC_ENABLE_AMAZON !== "1") {
    return null;
  }

  return (
    <article className="flex h-full flex-col rounded-2xl bg-white shadow p-3">
      {/* 画像 */}
      <div className="relative w-full h-40">
        <img 
          src={(product.image || product.images?.[0] || "").replace(/^http:/, "https:")} 
          alt={product.title}
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      </div>

      {/* タイトル */}
      <div className="mt-2 text-sm line-clamp-2">{product.title}</div>

      {/* 価格 or 未取得 */}
      <div className="mt-1 text-indigo-600 font-semibold">
        {product.price ? `¥${product.price.toLocaleString()}` : "価格未取得"}
      </div>

      {/* モールボタン（楽天のみ） */}
      <a 
        href={product.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-auto inline-block text-center rounded-xl bg-[#bf0000] text-white font-semibold h-10 leading-10 hover:opacity-90"
      >
        Rakutenで見る
      </a>
    </article>
  );
} 