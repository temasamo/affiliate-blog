"use client";

import { useState } from "react";

type Key = "budget" | "comfort" | "points" | "package";

const RECS: Record<Key, { label: string; href: string; desc?: string }[]> = {
  budget: [
    { label: "楽天トラベル（クーポン）", href: "/api/go/rakuten-travel", desc: "地域クーポン/SALE時強い" },
    { label: "じゃらん（直前割）", href: "/api/go/jalan", desc: "直前割・タイムセール" },
  ],
  comfort: [
    { label: "一休.com（高級旅館）", href: "/api/go/ikkyu", desc: "特典/レイトアウトなど" },
  ],
  points: [
    { label: "楽天トラベル（SPU活用）", href: "/api/go/rakuten-travel", desc: "買い物×旅行で倍率" },
  ],
  package: [
    { label: "エアトリ（航空券+ホテル）", href: "/api/go/airtrip", desc: "セット最適化" },
  ],
};

export default function TravelStyleMatcher() {
  const [selected, setSelected] = useState<Key | null>(null);

  const cards: { key: Key; title: string; subtitle: string; emoji: string }[] = [
    { key: "budget",  title: "予算重視",   subtitle: "最安値を追求したい方", emoji: "💰" },
    { key: "comfort", title: "快適重視",   subtitle: "サービスやサポートを重視", emoji: "🏨" },
    { key: "points",  title: "ポイント重視", subtitle: "ポイント還元を重視", emoji: "🎯" },
    { key: "package", title: "パッケージ重視", subtitle: "航空券+宿泊のセット", emoji: "📦" },
  ];

  return (
    <section className="rounded-2xl border border-gray-200/60 bg-gradient-to-b from-blue-50/50 to-white p-6">
      <h3 className="text-xl font-bold mb-2">旅行スタイル診断</h3>
      <p className="text-gray-600 mb-6">あなたの旅行スタイルに合わせて最適な予約サイトをおすすめします。</p>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setSelected(c.key)}
            className={`group w-full rounded-2xl border bg-white/70 backdrop-blur p-5 text-left shadow-sm transition
              hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
              ${selected === c.key ? "border-blue-400 ring-1 ring-blue-200" : "border-gray-200"}
            `}
            aria-pressed={selected === c.key}
          >
            <div className="text-2xl">{c.emoji}</div>
            <div className="mt-2 text-lg font-semibold underline decoration-blue-300/70 group-hover:decoration-blue-500">
              {c.title}
            </div>
            <div className="text-gray-600">{c.subtitle}</div>
          </button>
        ))}
      </div>

      {/* おすすめ先 */}
      {selected && (
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
          <div className="mb-2 text-sm font-semibold text-blue-700">おすすめ先</div>
          <div className="flex flex-wrap gap-3">
            {RECS[selected].map((r) => (
              <a
                key={r.label}
                href={r.href}
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-50"
                rel="nofollow"
              >
                <span>{r.label}</span>
                {r.desc && <span className="text-gray-400">・{r.desc}</span>}
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs text-blue-900/70">
            ※ アフィリエイト計測のため <code>/api/go/&lt;id&gt;</code> 経由で遷移します。
          </p>
        </div>
      )}
    </section>
  );
} 