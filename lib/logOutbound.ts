// lib/logOutbound.ts
export type Shop = 'rakuten' | 'amazon' | 'yahoo';

export function logOutbound(partner: 'rakuten'|'yahoo'|'amazon', sessionId: string) {
  const body = JSON.stringify({ partner, sessionId });

  // 送信が失敗してもユーザー遷移は邪魔しない方針
  try {
    const ok = navigator.sendBeacon('/api/log-outbound', new Blob([body], { type: 'application/json' }));
    if (ok) return Promise.resolve();
  } catch (_) {}

  // sendBeaconが使えない環境向けフォールバック
  return fetch('/api/log-outbound', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body
  }).catch(() => {});
} 