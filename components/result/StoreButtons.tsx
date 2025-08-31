import React, { useCallback, useState } from 'react';
import type { Product } from '@/lib/resultLogic';

type StoreButtonsProps = {
  product: {
    title: string;
    category: string;
    image?: string;
  };
  primaryProduct?: Product;
  sessionId?: string;
};

export default function StoreButtons({ product, primaryProduct, sessionId }: StoreButtonsProps) {
  const [sending, setSending] = useState<string | null>(null);

  // 商品のstores情報がある場合はそれを使用、なければデフォルトURL
  const getStoreUrl = (storeName: string) => {
    if (primaryProduct?.stores) {
      const store = primaryProduct.stores[storeName as keyof typeof primaryProduct.stores];
      if (store?.url) {
        return store.url;
      }
    }
    
    // デフォルトURL
    const defaultUrls = {
      rakuten: `https://www.rakuten.co.jp/search?k=${encodeURIComponent(product.title)}`,
      amazon: `https://www.amazon.co.jp/s?k=${encodeURIComponent(product.title)}`,
      yahoo: `https://shopping.yahoo.co.jp/search?p=${encodeURIComponent(product.title)}`
    };
    
    return defaultUrls[storeName as keyof typeof defaultUrls] || defaultUrls.rakuten;
  };

  const stores = [
    {
      name: 'Rakuten',
      label: '楽天で探す',
      color: '#bf0000',
      id: 'rakuten'
    },
    {
      name: 'Yahoo!',
      label: 'Yahoo!で探す',
      color: '#7200a8',
      id: 'yahoo'
    }
  ];

  const handleClick = useCallback(async (store: typeof stores[0]) => {
    const url = getStoreUrl(store.id);
    setSending(store.id);
    try {
      await fetch("/api/log-outbound", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ctaId: `diagnosis-${store.id}`,
          url: url,
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
      setSending(null);
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, [sessionId, product.title, primaryProduct]);

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        🛒 おすすめ枕を探す
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stores.map((store) => (
          <button
            key={store.id}
            onClick={() => handleClick(store)}
            disabled={sending === store.id}
            className="mt-auto h-10 rounded-xl px-4 font-semibold text-white hover:opacity-90 transition flex items-center justify-center"
            style={{ backgroundColor: store.color }}
          >
            {sending === store.id ? "記録中..." : store.label}
          </button>
        ))}
      </div>
      
      <p className="text-sm text-slate-500 mt-4 text-center">
        {product.title} の {product.category} カテゴリで検索します
      </p>
    </div>
  );
} 