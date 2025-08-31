import Link from "next/link";
import Head from "next/head";

const items = [
  { title: "睡眠・健康", href: "/sleep-health", desc: "睡眠と健康を底上げする実践ガイドや最新知見をまとめています。" },
  { title: "日本茶", href: "/japanese-tea", desc: "日本茶の基礎・健康効果・おすすめの飲み方を分かりやすく。" },
  { title: "海外トレンド（Global Hot Picks）", href: "/articles/global-hot-picks/trend", desc: "海外で話題のプロダクトを毎日ピックアップ。" },
  { title: "人気の日本商品", href: "/japan-popular", desc: "国内外で人気の日本発アイテムを厳選。" },
  { title: "診断AI", href: "/diagnostic-ai", desc: "用途別に最適アイテムを提案する診断コンテンツ。" },
  { title: "ガイド一覧", href: "/guides", desc: "枕診断AIシリーズなど、科学的根拠に基づいた診断コンテンツ。" },
  { title: "教育", href: "/education", desc: "読み物・学習向けコンテンツのハブ。" },
  { title: "旅行", href: "/travel", desc: "おすすめ旅行先や体験記、旅を充実させるヒントをまとめています。" },
];

export default function ContentsIndex() {
  return (
    <>
      <Head>
        <title>コンテンツ一覧 | Market Supporter AI</title>
        <meta name="description" content="Market Supporter AI の全コンテンツを一覧で確認できます。睡眠・健康、日本茶、海外トレンド、人気の日本商品、診断AI、教育、旅行など。" />
      </Head>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">コンテンツ一覧</h1>
          <Link href="/" className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            トップへ戻る
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="rounded-2xl border p-5 hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">{it.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{it.desc}</p>
              <span className="inline-flex items-center text-blue-600 font-medium">見る →</span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
} 