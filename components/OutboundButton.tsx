// components/OutboundButton.tsx
import { logOutbound } from '@/lib/logOutbound';
import { useState } from 'react';

interface OutboundButtonProps {
  partner: 'rakuten' | 'yahoo' | 'amazon';
  url: string;
  sessionId: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  contentId?: string; // GA計測用のコンテンツID
}

export default function OutboundButton({
  partner,
  url,
  sessionId,
  children,
  className,
  style,
  contentId
}: OutboundButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Google Analytics計測
    window.gtag?.('event', 'select_content', {
      content_type: 'cta',
      content_id: contentId || `outbound_${partner}`,
      partner: partner,
      url: url
    });
    
    // 既存の計測を投げる（sendBeaconは同期不要）→ すぐに開く
    logOutbound(partner, sessionId);
    window.open(url, '_blank', 'noopener'); // ここで新規タブ
  };

  const hoverStyle = isHovered ? {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
  } : {};

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      className={className}
      style={{
        ...style,
        ...hoverStyle,
        transition: 'all 0.3s ease',
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  );
} 