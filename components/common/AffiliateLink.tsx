import React from 'react';

type Props = {
  id: string;
  children: React.ReactNode;
  className?: string;
  newTab?: boolean;   // default true
  nofollow?: boolean; // default true
  showDisclosure?: boolean; // default false
};

export default function AffiliateLink({
  id, 
  children, 
  className = '', 
  newTab = true, 
  nofollow = true,
  showDisclosure = false
}: Props) {
  const href = `/api/go/${id}`;
  const rel = [nofollow ? 'nofollow' : null, 'noopener'].filter(Boolean).join(' ');
  
  return (
    <>
      <a 
        href={href} 
        {...(newTab ? { target: '_blank' } : {})} 
        rel={rel} 
        className={`inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline ${className}`}
      >
        {children}
        {newTab && (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </a>
      {showDisclosure && (
        <span className="ml-1 text-xs text-gray-500">(アフィリエイト)</span>
      )}
    </>
  );
} 