import type { UnifiedProduct } from '@/lib/malls/types';

export function trackOutbound(p: UnifiedProduct) {
  try {
    // GA4 推奨イベント（名称は任意）
    (window as any).gtag?.('event', 'outbound_click', {
      content_type: 'product',
      item_id: p.id,
      store: p.store.key, // 'rakuten' | 'yahoo'
      price: p.price,
      sessionId: getSessionId(),
    });
  } catch {}
}

let __sid: string | null = null;
function getSessionId() {
  if (__sid) return __sid;
  __sid = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now());
  return __sid;
} 