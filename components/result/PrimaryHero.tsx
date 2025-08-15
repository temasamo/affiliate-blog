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
      <h2 className="text-xl font-bold mb-4">🧠 診断結果</h2>

      {/* タイトル・高さ・硬さのバッジは一切出さない */}

      {/* 要約だけ表示 */}
      <p className="rounded-xl bg-indigo-50/70 p-4 text-slate-700">{summary}</p>

      {/* マッチング度（旧：信頼度） */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-sm text-slate-600 mb-1">
          <span>マッチング度</span>
          <span className="font-semibold text-indigo-600">{pct}%</span>
        </div>
        <div className="relative h-2 rounded-full bg-slate-200 overflow-hidden">
          <div className="absolute left-0 top-0 h-2 bg-indigo-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </section>
  );
} 