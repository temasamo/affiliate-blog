import React from "react";

type Props = {
  title?: string;
  description?: string;
  href: string;
  label: string;
};

const CTA: React.FC<Props> = ({ title, description, href, label }) => (
  <div className="my-8 rounded-2xl bg-blue-50 p-6">
    {title && <h3 className="mb-1 text-lg font-bold text-blue-900">{title}</h3>}
    {description && <p className="mb-3 text-sm text-blue-900/80">{description}</p>}
    <a
      href={href}
      className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      {label}
      <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  </div>
);

export default CTA;
