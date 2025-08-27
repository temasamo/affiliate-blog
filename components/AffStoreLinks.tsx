import React from "react";
import { AFF_DEFAULT } from "./aff/aff-config";

type Store = "Amazon" | "Rakuten" | "Yahoo";
type Status = "ok" | "limited" | "none";

interface AffStoreItem {
  store: Store;
  status: Status;
  href?: string;
  impressionImg?: string;
  title?: string;
}

interface AffStoreLinksProps {
  items: AffStoreItem[];
}

export default function AffStoreLinks({ items }: AffStoreLinksProps) {
  const labelOf = (store: Store) =>
    store === "Amazon" ? AFF_DEFAULT.Amazon.label :
    store === "Rakuten" ? AFF_DEFAULT.Rakuten.label :
    AFF_DEFAULT.Yahoo.label;

  const symbolOf = (status: Status) =>
    status === "ok" ? "◯" :
    status === "limited" ? "△" :
    "×";

  return (
    <ul className="space-y-2">
      {items.map(({ store, status, href, impressionImg, title }) => {
        const label = labelOf(store);
        const symbol = symbolOf(status);

        // 既定の入口リンク（href未指定の場合に利用）
        const def =
          store === "Amazon" ? AFF_DEFAULT.Amazon :
          store === "Rakuten" ? AFF_DEFAULT.Rakuten :
          AFF_DEFAULT.Yahoo;
        const finalHref = href ?? def.href;
        const finalImg  = impressionImg ?? def.img;
        const finalTitle = title ?? def.title;

        // × の場合はリンクにしない
        if (status === "none") {
          return (
            <li key={store}>
              <span className="text-gray-500">
                <strong>{label}</strong>: {symbol}
              </span>
            </li>
          );
        }

        // ◯/△ はリンク化（href未指定でも入口リンクに飛ぶ）
        return (
          <li key={store}>
            <a
              href={finalHref}
              target="_blank"
              rel="nofollow noopener sponsored"
              aria-label={finalTitle ?? `${label}：${symbol}`}
              className="text-blue-600 hover:underline"
            >
              <strong>{label}</strong>: {symbol}
            </a>
            {finalImg ? (
              <img
                src={finalImg}
                width={1}
                height={1}
                style={{ border: "none" }}
                loading="lazy"
                alt=""
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
} 