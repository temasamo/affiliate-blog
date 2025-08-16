// lib/ui/mallStyles.ts
export type MallKey = "rakuten" | "yahoo" | "amazon";

export const MALL = {
  rakuten: {
    label: "Rakutenで見る",
    // 楽天: ブランドカラー
    btn: "bg-[#bf0000] hover:opacity-90 focus:ring-2 focus:ring-[#bf0000]/30",
    pill: "bg-[#bf0000] text-white",
  },
  yahoo: {
    label: "Yahoo!で見る",
    // Yahoo!: ブランドカラー
    btn: "bg-[#5f01a5] hover:opacity-90 focus:ring-2 focus:ring-[#5f01a5]/30",
    pill: "bg-[#5f01a5] text-white",
  },
  amazon: {
    label: "Amazonで見る",
    // Amazon: ブランドカラー（現状は非表示だが一応統一）
    btn: "bg-[#ff9900] hover:opacity-90 focus:ring-2 focus:ring-[#ff9900]/30",
    pill: "bg-[#ff9900] text-white",
  },
} as const;

export function mallKeyToStyle(key?: string) {
  if (key === "yahoo") return MALL.yahoo;
  if (key === "amazon") return MALL.amazon;
  return MALL.rakuten;
} 