// components/AffStoreLinks.tsx
import React from "react";
import { amazonUrl, rakutenUrl, yahooUrl } from "@/utils/aff";

type MaybeBool = boolean | string | undefined;
const flag = (v: MaybeBool) => v === true || v === "true" || v === "";

export default function AffStoreLinks(props: {
  amazon?: MaybeBool; 
  rakuten?: MaybeBool; 
  yahoo?: MaybeBool;
  keyword?: string; 
  asin?: string; 
  amazonUrlOverride?: string;
  className?: string;
}) {
  const { amazon, rakuten, yahoo, keyword, asin, amazonUrlOverride, className } = props;

  const items: { label: string; href?: string }[] = [];
  if (flag(amazon)) items.push({ label: "Amazonで探す", href: amazonUrlOverride || amazonUrl({ keyword, asin }) });
  if (flag(rakuten)) items.push({ label: "楽天市場で探す", href: rakutenUrl({ keyword }) });
  if (flag(yahoo)) items.push({ label: "Yahoo!で探す", href: yahooUrl({ keyword }) });

  const valid = items.filter(i => !!i.href);

  return (
    <div
      className={`mt-3 flex flex-wrap gap-2 ${className ?? ""}`}
      suppressHydrationWarning
    >
      {valid.map(it => (
        <a
          key={it.label}
          href={it.href}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="inline-flex items-center rounded-full border px-3 py-1 text-sm hover:shadow-sm"
        >
          {it.label} →
        </a>
      ))}
      {/* validが0件のときは何も描画しない（同じラッパーは常に出す） */}
    </div>
  );
}
