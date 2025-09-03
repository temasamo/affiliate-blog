import React from "react";

type Mall =
  | "rakuten"
  | "yahoo"
  | "amazon"
  | "lohaco"
  | "yodobashi"
  | "biccamera"
  | "nitori"
  | "muji";

type Item = {
  label: string;
  url: string;
  mall?: Mall;
};

type Props = {
  items: Item[];
  title?: string;
};

const MallLinks: React.FC<Props> = ({ items, title }) => (
  <div className="mt-6 rounded-xl border bg-white p-4 shadow-sm">
    {title && <div className="mb-2 text-sm font-semibold text-gray-600">{title}</div>}
    <div className="flex flex-wrap gap-2">
      {items.map((it, i) => (
        <a
          key={`${it.url}-${i}`}
          href={it.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm text-blue-700 hover:bg-blue-50"
        >
          {it.label}
        </a>
      ))}
    </div>
  </div>
);

export default MallLinks;
