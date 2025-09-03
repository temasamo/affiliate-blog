import Head from "next/head";
import Link from "next/link";

export default function PillowDiagnosisComingSoon() {
  const releaseNote =
    "まずは枕の高さ・硬さ・素材・悩み（肩こり/いびき）を入力 → あなたに合う候補を第一/第二グループで提案。購入先の比較リンクも表示します。";

  return (
    <>
      <Head>
        <title>枕診断AI（工事中） | Market Supporter AI</title>
        {/* 工事中はインデックスさせない */}
        <meta name="robots" content="noindex,follow" />
        <meta
          name="description"
          content="数問に答えるだけで、あなたに合う枕の高さ・硬さ・素材をAIが提案。現在準備中のため公開までしばらくお待ちください。"
        />
        <meta property="og:title" content="枕診断AI（工事中）" />
        <meta
          property="og:description"
          content="数問であなたに合う枕がわかる。公開までしばらくお待ちください。"
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* シンプルな内製ヘッダー（既存Headerに依存しない） */}
        <header className="border-b bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold text-gray-900">
              Market Supporter AI
            </Link>
            <nav className="text-sm">
              <Link
                href="/articles/sleep-health/knowledge/pillow-summary"
                className="text-blue-600 hover:underline"
              >
                枕まとめへ戻る
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 py-10">
          <div className="rounded-2xl bg-white p-8 shadow">
            <div className="mb-6 inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
              工事中 / Coming Soon
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              枕診断AI（準備中）
            </h1>
            <p className="text-gray-600 leading-relaxed">
              数問に答えるだけで、あなたに合う
              <strong>高さ・硬さ・素材</strong>をAIが推定し、
              <strong>第一候補 / 第二候補</strong>の形で具体的な枕を提案します。
              診断の根拠（姿勢・頸椎カーブ・寝返りしやすさ 等）も同画面で説明します。
            </p>

            {/* 期待できる体験 */}
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                リリース時の体験（予定）
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>5問前後の簡単な質問で、合う枕タイプを推定</li>
                <li>高さ×硬さ×素材の最適組み合わせを提示</li>
                <li>第一候補 / 第二候補を理由つきで表示（Explainable）</li>
                <li>楽天 / Yahoo / Amazon への比較リンクを同一UIで提示</li>
                <li>診断結果をSNSでシェア（X/LINE/Instagram対応）</li>
              </ul>
              <p className="mt-4 text-sm text-gray-500">{releaseNote}</p>
            </section>

            {/* 代替導線：いま読める記事 */}
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                公開までの間は、下記ガイドをご活用ください
              </h2>
              <ul className="grid gap-2">
                <li>
                  <Link
                    href="/articles/sleep-health/knowledge/pillow-height-how-to-choose"
                    className="text-blue-600 hover:underline"
                  >
                    枕の高さの選び方
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles/sleep-health/knowledge/pillow-hardness-how-to-choose"
                    className="text-blue-600 hover:underline"
                  >
                    枕の硬さで快眠度は変わる？
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles/sleep-health/knowledge/pillow-material-comparison"
                    className="text-blue-600 hover:underline"
                  >
                    枕の素材徹底比較
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles/sleep-health/knowledge/pillow-for-shoulder-pain"
                    className="text-blue-600 hover:underline"
                  >
                    肩こりに効く枕おすすめ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles/sleep-health/knowledge/pillow-for-snoring"
                    className="text-blue-600 hover:underline"
                  >
                    いびき対策に効く枕
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    href="/articles/sleep-health/knowledge/pillow-summary"
                    className="inline-block text-blue-700 hover:underline font-medium"
                  >
                    枕選び完全ガイド（まとめページ）
                  </Link>
                </li>
              </ul>
            </section>


            {/* FAQ（よくある質問） */}
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">FAQ</h2>
              <details className="group border rounded-lg p-4 mb-2 bg-gray-50">
                <summary className="cursor-pointer font-medium text-gray-900">
                  いつ公開されますか？
                </summary>
                <p className="mt-2 text-gray-700">
                  まずは枕記事グループの拡充を優先し、安定次第ベータ公開予定です。公開スケジュールは本ページで告知します。
                </p>
              </details>
              <details className="group border rounded-lg p-4 mb-2 bg-gray-50">
                <summary className="cursor-pointer font-medium text-gray-900">
                  診断の根拠は表示されますか？
                </summary>
                <p className="mt-2 text-gray-700">
                  「高さ・硬さ・素材」など各判断に対して、理由・根拠（Explainable）を明記します。
                </p>
              </details>
              <details className="group border rounded-lg p-4 bg-gray-50">
                <summary className="cursor-pointer font-medium text-gray-900">
                  どのモールに対応しますか？
                </summary>
                <p className="mt-2 text-gray-700">
                  楽天・Yahoo・Amazonに対応予定です。表示不備時はフェイルセーフで「ショップで見る」リンクを出します。
                </p>
              </details>
            </section>
          </div>

          {/* 戻り導線 */}
          <div className="mt-6 text-center">
            <Link
              href="/sleep-health"
              className="text-sm text-blue-600 hover:underline"
            >
              睡眠・健康トップへ戻る
            </Link>
          </div>
        </main>

        {/* シンプルフッター */}
        <footer className="mt-12 border-t bg-white">
          <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-gray-500">
            © {new Date().getFullYear()} Market Supporter AI
          </div>
        </footer>
      </div>
    </>
  );
}
