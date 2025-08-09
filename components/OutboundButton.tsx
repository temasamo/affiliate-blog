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
}

export default function OutboundButton({
  partner,
  url,
  sessionId,
  children,
  className,
  style
}: OutboundButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    // 計測を投げる（sendBeaconは同期不要）→ すぐに開く
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