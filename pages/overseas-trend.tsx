// pages/overseas-trend.tsx
import React from 'react';
import Link from 'next/link';

export default function OverseasTrend() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">🌍 海外トレンド</h1>
      <p className="mb-8 text-gray-600">
        海外SNSやAmazon USで話題の商品を、日本で入手できるルートと一緒に紹介します。
      </p>

      <ul className="space-y-3 list-disc list-inside">
        <li>
          <Link href="/articles/overseas-trend-template">
            【テンプレ】海外トレンド記事雛形
          </Link>
        </li>
        <li>
          <Link href="/articles/2025-xx-xx-overseas-trend-example">
            海外で話題の○○が日本上陸！
          </Link>
        </li>
      </ul>
    </div>
  );
}
