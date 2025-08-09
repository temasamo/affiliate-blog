// components/ResultCard.tsx
import { logOutbound } from '@/lib/logOutbound';

type Props = {
  title: string;
  confidence: number; // 0-100
  sessionId: string;
  urls: {
    rakuten?: string;
    amazon?: string;
    yahoo?: string;
  };
};

// 環境変数からURLを読み込み
const RAKUTEN_URL = process.env.NEXT_PUBLIC_RAKUTEN_URL || "https://www.rakuten.co.jp/";
const AMAZON_URL = process.env.NEXT_PUBLIC_AMAZON_URL || "https://www.amazon.co.jp/";
const YAHOO_URL = process.env.NEXT_PUBLIC_YAHOO_URL || "https://shopping.yahoo.co.jp/";

export default function ResultCard({ title, confidence, sessionId, urls }: Props) {
  // クリック時ロギング + 遷移
  const handleOutbound = async (
    vendor: 'rakuten' | 'amazon' | 'yahoo',
    url: string,
    sessionId?: string
  ) => {
    try {
      if (sessionId) {
        await logOutbound(vendor, sessionId);
      }
    } catch (e) {
      console.warn('log-outbound failed', e);
    } finally {
      // ログに失敗しても遷移は実行
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div style={{
      padding: '16px',
      border: '1px solid #eee',
      borderRadius: '12px',
      background: '#fff',
      marginTop: '16px'
    }}>
      <h3 style={{ fontSize: '18px', margin: '0 0 10px' }}>{title}</h3>

      <div>
        推定適合度: <strong>{confidence}%</strong>
        <div style={{
          width: '100%',
          height: '8px',
          background: '#eee',
          borderRadius: '999px',
          overflow: 'hidden',
          marginTop: '8px'
        }}>
          <div style={{
            height: '100%',
            background: '#2e7d32',
            width: `${confidence}%`
          }} />
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '8px',
        marginTop: '12px',
        flexWrap: 'wrap'
      }}>
        {urls.rakuten && (
          <button
            onClick={() => handleOutbound('rakuten', RAKUTEN_URL, sessionId)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #ff5c5c',
              background: '#ff5c5c',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            楽天で詳しく見る
          </button>
        )}
        {urls.amazon && (
          <button
            onClick={() => handleOutbound('amazon', AMAZON_URL, sessionId)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: '#fff',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Amazonで詳しく見る
          </button>
        )}
        {urls.yahoo && (
          <button
            onClick={() => handleOutbound('yahoo', YAHOO_URL, sessionId)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: '#fff',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Yahoo!で詳しく見る
          </button>
        )}
      </div>
    </div>
  );
} 