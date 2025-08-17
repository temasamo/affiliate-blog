import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { buildFinalTagOnce } from "@/lib/finalTag";

type Answers = Record<string, any>;

export default function PillowFinalPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [baseTag, setBaseTag] = useState<string>("");
  const [last, setLast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const a = sessionStorage.getItem("pillow.answers");
      const b = sessionStorage.getItem("pillow.baseTag");
      if (a) setAnswers(JSON.parse(a));
      if (b) setBaseTag(b);
    } catch {}
  }, []);

  const disabled = useMemo(() => last === null, [last]);

  if (!answers || !baseTag) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="text-lg font-semibold">最後の一問</h1>
        <p className="mt-2 text-sm text-gray-600">回答データが見つかりません。質問シートへ戻ってください。</p>
        <button className="mt-4 rounded-xl border px-4 py-2" onClick={() => router.replace("/pillow-questions")}>
          質問シートへ戻る
        </button>
      </div>
    );
  }

  const goResult = async () => {
    const finalTag = buildFinalTagOnce(baseTag, answers!, last ?? undefined);
    const { min, max, mall } = router.query; // 予算等を引き継ぎ
    await router.replace({ pathname: "/pillow-diagnosis", query: { finalTag, min, max, mall } });
  };

  const opts = [
    { k: "hot",   label: "ムレ/暑さ" },
    { k: "neck",  label: "肩・首のこり" },
    { k: "snore", label: "いびき" },
    { k: "none",  label: "特になし" },
    { k: "skip",  label: "スキップ" },
  ];

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-lg font-semibold">最後の一問：今いちばん気になるのは？</h1>

      <div className="mt-4 flex flex-wrap gap-3">
        {opts.map(o => (
          <button
            key={o.k}
            onClick={() => setLast(o.k)}
            className={`rounded-2xl border px-5 py-3 ${last === o.k ? "ring-2 ring-black" : ""}`}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          disabled={disabled}
          onClick={goResult}
          className={`rounded-2xl px-5 py-3 text-white ${disabled ? "bg-gray-300" : "bg-black"}`}
          title={disabled ? "選択してください" : "診断結果へ"}
        >
          診断結果を見る
        </button>
        <button onClick={() => router.back()} className="rounded-2xl border px-5 py-3">
          戻る
        </button>
      </div>
    </div>
  );
} 