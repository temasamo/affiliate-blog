// components/ResultCard.tsx
import { logOutbound } from '@/lib/logOutbound';
import { affiliateLinks } from '@/lib/affiliateLinks';

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

export default function ResultCard({ title, confidence, sessionId, urls }: Props) {
  const handleAffiliateClick = async (shop: 'rakuten' | 'amazon' | 'yahoo') => {
    if (sessionId) {
      await logOutbound(shop, sessionId);
    }
    window.open(affiliateLinks[shop], '_blank', 'noopener,noreferrer');
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
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #ff5c5c',
              background: '#ff5c5c',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onClick={() => handleAffiliateClick('rakuten')}
          >
            楽天で詳しく見る
          </button>
        )}
        {urls.amazon && (
          <button
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: '#fff',
              cursor: 'pointer'
            }}
            onClick={() => handleAffiliateClick('amazon')}
          >
            Amazonで詳しく見る
          </button>
        )}
        {urls.yahoo && (
          <button
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: '#fff',
              cursor: 'pointer'
            }}
            onClick={() => handleAffiliateClick('yahoo')}
          >
            Yahoo!で詳しく見る
          </button>
        )}
      </div>
    </div>
  );
} 