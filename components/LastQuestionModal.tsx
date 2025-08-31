import { useEffect, useState } from "react";

export default function LastQuestionModal({
  open, answers, onClose, onSubmitted,
}: { open: boolean; answers: any; onClose: ()=>void; onSubmitted: ()=>void }) {
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState<string>("");
  const [a, setA] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("/api/pillow-assist-question", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ answers })})
      .then(r => r.json()).then(d => setQ(d?.question ?? "枕で一番改善したい点は何ですか？"))
      .finally(()=>setLoading(false));
  }, [open]);

  const submit = async () => {
    setLoading(true);
    await fetch("/api/pillow-assist-answer", {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ lastAnswer: a, answers }),
    });
    setLoading(false);
    onSubmitted();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6">
        <div className="text-sm text-slate-500 mb-2">
          回答の精度を上げるために、私から一問だけ質問しますね。
        </div>
        <div className="font-medium mb-2">{loading ? "読み込み中…" : q}</div>
        <textarea className="w-full h-28 rounded-lg border p-3" value={a} onChange={e=>setA(e.target.value)} />
        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="px-3 py-2 rounded-lg bg-slate-100">後で</button>
          <button onClick={submit} disabled={loading} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:opacity-90">送信</button>
        </div>
      </div>
    </div>
  );
} 