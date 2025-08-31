'use client';

export function ResultSummaryCard({ summary }: { summary: string }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="text-center text-xl font-bold mb-3">🧠 診断結果</h3>
      <p className="mx-auto max-w-3xl rounded-2xl bg-indigo-50 px-5 py-4 text-center leading-7 text-slate-700">
        {summary}
      </p>
    </section>
  );
} 