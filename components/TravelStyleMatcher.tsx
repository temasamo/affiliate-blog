import * as React from "react";

type Option = { label: string; href: string };
type Props = {
  options?: Option[];
  title?: string;
  className?: string;
};

export default function TravelStyleMatcher({
  options,
  title = "旅スタイル別おすすめ",
  className = "",
}: Props) {
  const presets: Option[] =
    options && options.length
      ? options
      : [
          { label: "とにかく安く", href: "/travel/jalan-vs-rakuten-2025#coupon" },
          { label: "ポイント重視", href: "/travel/airtrip-vs-rakuten-jalan-2025#point" },
          { label: "高級宿に泊まりたい", href: "/travel/ikkyu-luxury-ryokan-2025" },
        ];

  return (
    <div className={`rounded-2xl border p-4 md:p-6 bg-white ${className}`}>
      <p className="text-lg font-semibold mb-3">{title}</p>
      <ul className="grid gap-3 md:grid-cols-3">
        {presets.map((o, i) => (
          <li key={i}>
            <a
              href={o.href}
              className="block rounded-xl border px-4 py-3 hover:shadow-sm hover:bg-slate-50 transition"
            >
              {o.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
