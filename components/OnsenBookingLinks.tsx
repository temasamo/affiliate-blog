import React from "react";

type Props = Partial<{
  jalan: string;
  rakuten: string;
  ikyu: string;
  yahoo: string;
}>;

export default function OnsenBookingLinks({ jalan, rakuten, ikyu, yahoo }: Props) {
  const items = [
    { label: "じゃらん", href: jalan },
    { label: "楽天トラベル", href: rakuten },
    { label: "一休", href: ikyu },
    { label: "Yahoo!トラベル", href: yahoo },
  ].filter((x): x is { label: string; href: string } => Boolean(x.href));

  if (items.length === 0) {
    return (
      <div className="mt-8 rounded-lg border p-4 text-sm opacity-70">
        予約リンクは準備中です。
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-xl border p-5">
      <div className="mb-3 font-semibold">公式/予約サイト</div>
      <ul className="flex flex-wrap gap-3">
        {items.map((x) => (
          <li key={x.label}>
            <a
              className="rounded-lg border px-3 py-2 hover:bg-gray-50"
              href={x.href}
              target="_blank"
              rel="nofollow noopener"
            >
              {x.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-gray-500">※ アフィリエイトリンクを含む場合があります</p>
    </div>
  );
}
