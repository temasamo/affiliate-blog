'use client';

import { useState } from 'react';
import { logOutbound } from '../lib/logOutbound';

export default function OutboundClickTest() {
  const [sessionId, setSessionId] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const handleClick = async (kind: 'rakuten'|'yahoo'|'amazon') => {
    if (!sessionId) {
      setStatus('セッションIDを入力してください');
      return;
    }

    setStatus(`${kind}クリックをログ中...`);
    
    try {
      await logOutbound(kind, sessionId);
      setStatus(`${kind}クリックをログしました！`);
    } catch (error) {
      setStatus(`エラー: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">アウトバウンドクリックテスト</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">セッションID:</label>
        <input
          type="text"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          placeholder="セッションIDを入力"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <button
          onClick={() => handleClick('rakuten')}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          楽天
        </button>
        <button
          onClick={() => handleClick('yahoo')}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Yahoo!
        </button>
        <button
          onClick={() => handleClick('amazon')}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Amazon
        </button>
      </div>

      {status && (
        <div className={`p-3 rounded ${status.includes('エラー') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          {status}
        </div>
      )}
    </div>
  );
} 