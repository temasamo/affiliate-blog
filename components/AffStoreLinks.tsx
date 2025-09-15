// components/AffStoreLinks.tsx
import React from "react";

type MaybeBool = boolean | string | undefined;
const flag = (v: MaybeBool) => v === true || v === "true" || v === "";

// ★ 追加：/api/out 用のヘルパ
const out = (mall: string, brand: string) =>
  `/api/out?mall=${encodeURIComponent(mall)}&brand=${encodeURIComponent(brand.trim())}`;

export default function AffStoreLinks(props: {
  amazon?: MaybeBool;
  rakuten?: MaybeBool;
  yahoo?: MaybeBool;
  keyword?: string;
  asin?: string;               // 使っていればそのまま
  amazonUrlOverride?: string;  // 使っていればそのまま
  className?: string;
}) {
  const { amazon, rakuten, yahoo, keyword = "", asin, amazonUrlOverride, className } = props;

  const norm = keyword.replace(/\s+/g, " ").trim(); // 余分な空白を正規化（検索ブレ防止）

  // ここを “直URL” ではなく “/api/out” に統一
  const items: { label: string; href: string }[] = [];

  if (flag(rakuten)) {
    items.push({ label: "楽天市場で探す", href: out("rakuten", norm) });
  }

  if (flag(yahoo)) {
    items.push({ label: "Yahoo!で探す", href: out("yahoo", norm) });
  }

  if (flag(amazon)) {
    if (amazonUrlOverride) {
      items.push({ label: "Amazonで探す", href: `/api/out?mall=amazon&url=${encodeURIComponent(amazonUrlOverride)}` });
    } else if (asin) {
      // 必要なら /api/out 側に “asin対応” を足してもOK。今は検索にフォールバック。
      items.push({ label: "Amazonで探す", href: out("amazon", norm) });
    } else {
      items.push({ label: "Amazonで探す", href: out("amazon", norm) });
    }
  }

  const valid = items.filter(i => !!i.href);

  return (
    <div className={`mt-3 flex flex-wrap gap-2 ${className ?? ""}`} suppressHydrationWarning>
      {valid.map(it => (
        <a
          key={it.label}
          href={it.href}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="inline-flex items-center rounded-full border px-3 py-1 text-sm hover:opacity-90"
        >
          {it.label} →
        </a>
      ))}
    </div>
  );
}

