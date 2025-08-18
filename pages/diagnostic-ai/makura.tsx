// File: app/diagnostic-ai/makura/page.tsx
// Framework: Next.js 13/14 (App Router)
// Styling: Tailwind CSS（無ければクラスを通常CSSに置き換えてください）
// 目的: A案 = 専用ランディング直置き（Hero/CTA/手順/FAQ/埋め込み/計測）

import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { Suspense, useMemo } from "react";

// =====================
// SEO / メタデータ
// =====================
export const metadata: Metadata = {
  title: "枕の選び方診断｜3分で最適な枕タイプがわかる | Market Supporter AI",
  description:
    "無料の枕診断AI。たった3分の質問で、あなたに合う枕の選び方がわかります。AIが理由付きで丁寧にガイド。楽天・Yahooの商品例も参考にできます。",
  alternates: { canonical: "https://www.marketsupporter-ai.com/diagnostic-ai/makura" },
  openGraph: {
    title: "枕の選び方診断｜3分で最適な枕タイプがわかる",
    description:
      "たった3分で最適な枕タイプがわかる無料診断。AIが理由を添えてやさしくガイドします。",
    type: "website",
    url: "https://www.marketsupporter-ai.com/diagnostic-ai/makura",
    images: [
      {
        url: "/og/makura-diagnosis.png",
        width: 1200,
        height: 630,
        alt: "枕の選び方診断 | Market Supporter AI",
      },
    ],
  },
  robots: { index: true, follow: true },
};

// =====================
// JSON-LD（FAQ構造化データ）
// =====================
const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "診断は本当に無料ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい、無料でご利用いただけます。より詳細なレポートやコンシェルジュ機能は将来的に有料版として提供予定です。",
      },
    },
    {
      "@type": "Question",
      name: "診断時間はどのくらいかかりますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "目安は3分です。質問は6〜8問（任意質問はスキップ可）です。",
      },
    },
    {
      "@type": "Question",
      name: "個人情報の入力は必要ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "メールアドレスなどの個人情報は不要です（任意機能を除く）。診断回答は改善のため匿名で集計されます。",
      },
    },
    {
      "@type": "Question",
      name: "提案される商品は広告ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "中立的な選び方ガイドが基本です。参考例として楽天・Yahooの該当商品ページを表示することがあります（アフィリエイトリンクを含む場合があります）。",
      },
    },
  ],
};

// =====================
// 時間帯あいさつ（SSRでもOK）
// =====================
function getGreetingByHour(date: Date) {
  const h = date.getHours();
  if (h >= 5 && h <= 10) return "おはようございます。今朝の目覚めはいかがでしたか？";
  if (h >= 11 && h <= 15) return "こんにちは。少し眠気を感じる時間帯かもしれませんね。";
  if (h >= 16 && h <= 22) return "こんばんは。今日の疲れをリセットする準備はできていますか？";
  return "遅くまでお疲れさまです。質の良い睡眠が特に大切な時間ですね。";
}

// =====================
// ページ本体
// =====================
export default function Page() {
  const greeting = getGreetingByHour(new Date());

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* JSON-LD（FAQ） */}
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500">無料診断AI</p>
            <h1 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">
              枕の選び方診断 <span className="whitespace-nowrap">— 3分で分かる</span>
            </h1>
            <p className="mt-4 text-neutral-700 leading-relaxed">
              {greeting}
              <br />
              では、早速ですが、あなたのより良い枕を探す、お手伝いをさせていただきます。まずは次の質問項目にお答えください。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#diagnosis-widget" className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-white shadow hover:opacity-90">
                今すぐ診断を始める
              </a>
              <a href="#how-it-works" className="inline-flex items-center justify-center rounded-xl border px-5 py-3 text-neutral-800 hover:bg-white">
                診断の流れを見る
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600">
              <li>所要3分</li>
              <li>メール登録不要</li>
              <li>AIが理由も説明</li>
            </ul>
          </div>
          <div className="relative h-[280px] md:h-[360px] rounded-2xl bg-white/60 border shadow-sm">
            {/* Heroイメージ（差し替え自由） */}
            <Image src="/images/hero-pillow.jpg" alt="枕診断のイメージ" fill className="object-cover rounded-2xl" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold">診断の流れ</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { step: "01", title: "簡単な質問に回答", desc: "睡眠姿勢・お悩み・好みなど、最大8問。任意の質問はスキップできます。" },
            { step: "02", title: "AIが要点を整理", desc: "あなたの回答から“選び方の基準”を導出。理由もあわせて表示します。" },
            { step: "03", title: "参考商品もチェック", desc: "楽天・Yahooの該当商品例を一緒に表示（アフィリエイトリンクを含む場合があります）。" },
          ].map((card) => (
            <div key={card.step} className="rounded-2xl bg-white p-6 border shadow-sm">
              <div className="text-xs text-neutral-500">{card.step}</div>
              <div className="mt-2 text-lg font-semibold">{card.title}</div>
              <p className="mt-2 text-neutral-700 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 診断ウィジェット（iframe埋め込み） */}
      <section id="diagnosis-widget" className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold">無料診断をはじめる</h2>
        <p className="mt-2 text-neutral-700">以下のウィジェットはステージング環境を指しています。問題なければ本番URLに切り替えてください。</p>

        {/* 埋め込みコンテナ */}
        <div id="ms-diagnosis" data-category="pillow" data-mode="free" className="mt-6" />

        {/* ステージングのローダー（本番切替時は URL を置換） */}
        <Script src="https://widget-stg.marketsupporter-ai.com/embed/loader.js" strategy="afterInteractive" />

        {/* noscript フォールバック */}
        <noscript>
          <div className="mt-4 rounded-xl bg-yellow-50 p-4 text-sm text-yellow-800">
            診断を利用するにはJavaScriptを有効にしてください。
          </div>
        </noscript>

        {/* ウィジェット→親ページのイベント受信（gtag/dataLayer 連携用） */}
        <Script id="ms-widget-events" strategy="afterInteractive">{`
          (function(){
            window.addEventListener('message', function(e){
              var d = e && e.data; if(!d || !d.type) return;
              if(d.type === 'ms:event'){
                // gtag (GA4)
                if(window.gtag){
                  try { window.gtag('event', d.name || 'ms_event', Object.assign({ source: 'ms-widget' }, d.payload || {})); } catch(e){}
                }
                // dataLayer (GTM)
                if(window.dataLayer){
                  try { window.dataLayer.push({ event: d.name || 'ms_event', payload: d.payload || {}, source: 'ms-widget' }); } catch(e){}
                }
              }
            });
          })();
        `}</Script>

        {/* 高さ調整は loader.js 側で実装済み（postMessage: ms:resize） */}
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold">よくある質問</h2>
        <div className="mt-6 divide-y rounded-2xl border bg-white">
          {[
            {
              q: "診断は本当に無料ですか？",
              a: "はい、無料でご利用いただけます。より詳細なレポートやコンシェルジュ機能は将来的に有料版として提供予定です。",
            },
            {
              q: "どれくらい時間がかかりますか？",
              a: "3分ほどで完了します。必須質問は6問、任意の質問はスキップ可能です。",
            },
            {
              q: "メール登録は必要ですか？",
              a: "不要です（任意機能を除く）。診断データは改善のため匿名で集計されます。",
            },
            {
              q: "提案される商品は広告ですか？",
              a: "中立的な選び方ガイドが基本です。参考として楽天・Yahooの関連商品を表示する場合があります（アフィリエイトリンクを含むことがあります）。",
            },
          ].map((item, i) => (
            <details key={i} className="group p-5 open:bg-neutral-50">
              <summary className="cursor-pointer list-none font-medium flex items-center justify-between">
                <span>{item.q}</span>
                <span className="ml-4 text-neutral-400 transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-2 text-neutral-700 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* フッターCTA */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="rounded-2xl bg-black text-white p-6 md:p-10 text-center">
          <h3 className="text-xl md:text-2xl font-semibold">今すぐ診断をはじめましょう</h3>
          <p className="mt-2 text-white/80">AIがあなたの“選び方”を分かりやすくガイドします。</p>
          <a href="#diagnosis-widget" className="mt-4 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-black shadow hover:opacity-90">
            枕の選び方診断を始める
          </a>
        </div>
      </section>
    </main>
  );
}
