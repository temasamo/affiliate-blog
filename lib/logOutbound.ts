// lib/logOutbound.ts
export type Shop = 'rakuten' | 'amazon' | 'yahoo';

export async function logOutbound(shop: Shop, id: string) {
  try {
    await fetch('/api/log-outbound', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, shop }),
      keepalive: true, // タブ遷移時でもなるべく送れる
    });
  } catch {
    // 失敗時は無視（離脱優先）
  }
} 