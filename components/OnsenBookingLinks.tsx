import React from "react";
import AffStoreLinks from "./AffStoreLinks";

interface OnsenBookingLinksProps {
  keyword: string;
  title?: string;
}

export default function OnsenBookingLinks({ keyword, title }: OnsenBookingLinksProps) {
  const rakutenUrl = `https://travel.rakuten.co.jp/search?kw=${encodeURIComponent(keyword)}`;
  const jalanUrl = `https://www.jalan.net/kankou/cty_${encodeURIComponent(keyword)}/`;
  const ikyuUrl = `https://www.ikyu.com/search/?kw=${encodeURIComponent(keyword)}`;
  
  const label = title || `宿泊予約（${keyword}）`;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{label}</h3>
      <AffStoreLinks
        items={[
          {
            store: "Rakuten",
            status: "ok",
            href: rakutenUrl,
            title: `楽天トラベルで${keyword}の宿を探す`
          },
          {
            store: "Yahoo",
            status: "ok",
            href: jalanUrl,
            title: `じゃらんで${keyword}の宿を探す`
          },
          {
            store: "Amazon",
            status: "ok",
            href: ikyuUrl,
            title: `一休.comで${keyword}の宿を探す`
          }
        ]}
      />
    </div>
  );
} 