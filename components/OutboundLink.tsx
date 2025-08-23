'use client';
import { logOutbound } from '@/lib/logOutbound';

interface OutboundLinkProps {
  partner: 'rakuten' | 'yahoo' | 'amazon';
  sessionId: string;
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  contentId?: string; // GA計測用のコンテンツID
}

export default function OutboundLink({
  partner,
  sessionId,
  href,
  children,
  className = '',
  target = '_blank',
  rel = 'noreferrer',
  contentId
}: OutboundLinkProps) {
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Google Analytics計測
    window.gtag?.('event', 'select_content', {
      content_type: 'cta',
      content_id: contentId || `outbound_${partner}`,
      partner: partner,
      url: href
    });
    
    try {
      await logOutbound(partner, sessionId);
    } catch (error) {
      console.warn('Outbound click logging failed:', error);
    }
    
    // リンクを開く
    window.open(href, target, 'noopener,noreferrer');
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      target={target}
      rel={rel}
      className={className}
    >
      {children}
    </a>
  );
} 