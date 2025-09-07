import React from "react";

type Item = {
  name: string;
  rakuten?: string;
  jalan?: string;
  ikkyu?: string;
  yahoo?: string;
};

export function BookingLinksGroup({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-10 rounded-xl border border-slate-200 bg-white/70 p-5">
      <h2 className="text-xl font-bold mb-3">予約リンク（まとめ）</h2>
      <p className="text-sm text-slate-500 mb-4">
        本文中に生リンクは散らさず、末尾に集約しています。リンク先で在庫・価格が異なる場合があります。
      </p>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function BookingLinksItem({ name, rakuten, jalan, ikkyu, yahoo }: Item) {
  const links = [
    rakuten && { label: "楽天トラベル", href: rakuten },
    jalan && { label: "じゃらん", href: jalan },
    ikkyu && { label: "一休", href: ikkyu },
    yahoo && { label: "Yahoo!トラベル", href: yahoo },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div className="rounded-lg bg-slate-50/70 px-4 py-3">
      <div className="font-medium">{name}</div>
      {links.length ? (
        <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-blue-600 underline">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} rel="nofollow sponsored noopener" target="_blank">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500">準備中です。</p>
      )}
    </div>
  );
}
