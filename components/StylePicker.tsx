"use client";
import Link from "next/link";
import { useState } from "react";

type Option = {
  id: string;
  label: string;
  description: string;
  ctas: { id: "airtrip" | "rakuten-travel" | "jalan" | "ikkyu"; text: string }[];
  note?: string;
};

const options: Option[] = [
  {
    id: "weekend-onsen",
    label: "週末温泉（1泊2日）",
    description: "短期でリフレッシュしたい",
    ctas: [
      { id: "jalan", text: "じゃらんで温泉宿を探す" },
      { id: "rakuten-travel", text: "楽天トラベルで温泉宿を探す" },
    ],
    note: "定額クーポンが刺さるとじゃらん有利。5と0のつく日は楽天も強い。",
  },
  {
    id: "family",
    label: "ファミリー旅行",
    description: "子連れ・三世代で安心重視",
    ctas: [
      { id: "rakuten-travel", text: "楽天トラベル（家族向けプラン）" },
      { id: "jalan", text: "じゃらん（口コミで選ぶ）" },
    ],
  },
  {
    id: "overseas-lcc",
    label: "海外LCC（コスパ重視）",
    description: "航空券コスト最優先",
    ctas: [{ id: "airtrip", text: "エアトリで航空券を探す" }],
    note: "底値確認はスカイスキャナー参考→決済はエアトリや航空会社公式で比較。",
  },
  {
    id: "luxury",
    label: "ご褒美・ラグジュアリー",
    description: "記念日や上質ステイ",
    ctas: [{ id: "ikkyu", text: "一休.comで高級宿を探す" }],
  },
];

export default function StylePicker() {
  const [selected, setSelected] = useState<Option | null>(null);

  return (
    <div className="my-4 rounded-2xl border border-white/30 bg-white/10 p-5 text-white backdrop-blur-md">
      <h2 className="mb-3 text-lg font-bold">旅行スタイル別 AI マッチング（ベータ）</h2>
      <p className="mb-4 text-sm opacity-90">近いスタイルを1つ選んでください。Market supputer AI が最短導線を提案します。</p>

      <div className="mb-4 grid gap-2 sm:grid-cols-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt)}
            className={`rounded-xl border px-4 py-3 text-left transition ${
              selected?.id === opt.id
                ? "bg-white/25 border-white shadow"
                : "bg-white/10 border-white/50 hover:bg-white/20"
            }`}
          >
            <div className="font-semibold">{opt.label}</div>
            <div className="text-xs opacity-90">{opt.description}</div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="rounded-xl border border-white/40 bg-white/15 p-4">
          <div className="mb-2 text-sm opacity-90">AIの提案：</div>
          <div className="flex flex-wrap gap-2">
            {selected.ctas.map((c) => (
              <Link
                key={c.id}
                href={`/api/go/${c.id}`}
                className="rounded-full border border-white/70 bg-white/20 px-3 py-1 text-sm hover:bg-white/30"
              >
                {c.text}
              </Link>
            ))}
          </div>
          {selected.note && <p className="mt-3 text-xs opacity-90">{selected.note}</p>}
        </div>
      )}
    </div>
  );
}
