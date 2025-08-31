import React from 'react';

type Props = {
  id: string;
  children: React.ReactNode;
  className?: string;
  newTab?: boolean;   // default true
  nofollow?: boolean; // default true
};

export default function AffiliateLink({
  id, children, className, newTab = true, nofollow = true
}: Props) {
  const href = `/api/go/${id}`;
  const rel = [nofollow ? 'nofollow' : null, 'noopener'].filter(Boolean).join(' ');
  return (
    <a href={href} {...(newTab ? { target: '_blank' } : {})} rel={rel} className={className}>
      {children}
    </a>
  );
} 