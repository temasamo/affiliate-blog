import React from "react";

type Status = "◯" | "△" | "×";

type Props = {
  amazon?: Status;
  rakuten?: Status;
  yahoo?: Status;
  className?: string;
};

const ENTRANCE = {
  amazon: process.env.NEXT_PUBLIC_AMAZON_ENTRANCE_URL ?? "#",
  rakuten: process.env.NEXT_PUBLIC_RAKUTEN_ENTRANCE_URL ?? "#",
  yahoo: process.env.NEXT_PUBLIC_YAHOO_ENTRANCE_URL ?? "#",
};

const LABEL = {
  amazon: "Amazon.co.jp",
  rakuten: "楽天市場",
  yahoo: "Yahoo!ショッピング",
};

export default function AffStoreLinks({
  amazon,
  rakuten,
  yahoo,
  className = "",
}: Props) {
  const items: Array<{ key: "amazon" | "rakuten" | "yahoo"; status?: Status }> =
    [
      { key: "amazon", status: amazon },
      { key: "rakuten", status: rakuten },
      { key: "yahoo", status: yahoo },
    ];

  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map(({ key, status }) => {
        if (!status) return null;
        const href = ENTRANCE[key];
        const isUnavailable = status === "×";
        const content = (
          <span>
            {LABEL[key]}：{status}
          </span>
        );

        return (
          <li key={key}>
            {isUnavailable ? (
              <span className="text-gray-400">{content}</span>
            ) : (
              <a
                href={href}
                className="text-blue-600 underline hover:opacity-80 transition"
                rel="nofollow"
                referrerPolicy="no-referrer-when-downgrade"
                target="_blank"
              >
                {content}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
} 