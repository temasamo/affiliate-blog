import Image from "next/image";

type Props = {
  summary: string;
  confidence: number; // 0..1
  // 第一候補の画像はここでは出さない（別セクションで出す）
};

export default function PrimaryHero({ summary, confidence }: Props) {
  const pct = Math.round((confidence ?? 0) * 100);

  return (
    <section className="rounded-2xl bg-white shadow-md p-6 mb-8">
      {/* 見出しを変更 */}
      <h2 className="text-center text-xl font-bold mb-4">🧠 診断結果</h2>

      {/* タイトル・高さ・硬さのバッジは一切出さない */}

      {/* 要約だけ表示 */}
      <p className="mx-auto max-w-3xl rounded-xl bg-indigo-50/70 p-4 text-center text-slate-700">{summary}</p>

      {/* マッチング度（旧：信頼度） */}
      <div className="mt-6">
        <div className="mb-1 text-center text-sm text-slate-600">マッチング度</div>
        <div className="mx-auto h-3 w-full max-w-3xl rounded-full bg-slate-200">
          <div
            className="h-3 rounded-full bg-indigo-600 transition-all"
            style={{ width: `${pct}%` }}
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="mt-1 text-center text-indigo-600 font-semibold">{pct}%</div>
      </div>
    </section>
  );
} 