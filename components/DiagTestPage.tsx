'use client';
import { useState, useEffect } from 'react';

export default function DiagTestPage() {
  const [status, setStatus] = useState<'idle'|'ok'|'ng'>('idle');
  const [now, setNow] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    setNow(new Date().toISOString());
    setSessionId(crypto?.randomUUID?.() ?? `sess_${Date.now()}`);
  }, []);

  const onSend = async () => {
    try {
      const payload = {
        session_id: sessionId,
        answers: { Q1: 'no' },
        scores: { adjustable: 5, side_sleep: 3, breathable: 2, washable: 2, hotel: 0, low_rebound: 0 },
        primary_category: 'adjustable',
        secondary_categories: ['side_sleep','breathable','washable'],
        confidence: 0.8,
        reasons: ['テスト送信'],
        outbound_clicks: { rakuten: 0, yahoo: 0, amazon: 0 },
        purchase_signal: false,
        satisfaction_quick: null
      };

      const res = await fetch('/api/pillow-diagnosis-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('ok');
      } else {
        setStatus('ng');
      }
    } catch (e) {
      setStatus('ng');
    }
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Diag Test</h1>
      <p>枕診断テスト送信</p>
      <button onClick={onSend}>テストデータを送信</button>
      <div style={{ marginTop: 12 }}>
        {status === 'ok' && '保存成功！'}
        {status === 'ng' && '保存失敗…'}
      </div>
      <small>now: {now}</small><br/>
      <small>sessionId: {sessionId}</small>
    </main>
  );
} 