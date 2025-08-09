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
}

export default function OutboundLink({
  partner,
  sessionId,
  href,
  children,
  className = '',
  target = '_blank',
  rel = 'noreferrer'
}: OutboundLinkProps) {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      await logOutbound(partner, sessionId);
    } catch (error) {
      console.warn('Outbound click logging failed:', error);
    }
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