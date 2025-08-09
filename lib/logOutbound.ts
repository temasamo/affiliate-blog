export async function logOutbound(
  channel: 'rakuten'|'yahoo'|'amazon',
  sessionId: string
) {
  try {
    await fetch('/api/log-outbound', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channel, session_id: sessionId }),
      keepalive: true, // タブ遷移中も送れるように
    });
  } catch (e) {
    // 失敗してもユーザー遷移は邪魔しない
    console.warn('logOutbound failed', e);
  }
} 