// 予算キーから価格範囲への変換機能

export type BudgetKey = "low" | "medium" | "high" | undefined;
export type BudgetBand =
  | 'UNDER_3000' | 'Y3_5' | 'Y5_8' | 'Y8_12' | 'Y12_15' | 'Y15_20' | 'OVER_20000';

export function toPriceRange(b: BudgetKey) {
  switch (b) {
    case "low":    return { min: 0,     max: 5000  };
    case "medium": return { min: 5000,  max: 15000 };
    case "high":   return { min: 15000, max: null  };
    default:       return { min: null,  max: null  };
  }
}

export function bandToRange(band?: BudgetBand): { min?: number; max?: number } {
  switch (band) {
    case 'UNDER_3000': return { max: 2999 };
    case 'Y3_5':      return { min: 3000, max: 4999 };
    case 'Y5_8':      return { min: 5000, max: 7999 };
    case 'Y8_12':     return { min: 8000, max: 11999 };
    case 'Y12_15':    return { min: 12000, max: 14999 };
    case 'Y15_20':    return { min: 15000, max: 19999 };
    case 'OVER_20000':return { min: 20000 };
    default:          return {};
  }
}

// 全角→半角 / 記号正規化しつつ 2 数値を拾う（既存のparseBudget関数）
export function parseBudget(input: string | undefined) {
  if (!input) return {};
  const z2h = (s: string) => s.replace(/[０-９]/g, d => String.fromCharCode(d.charCodeAt(0) - 0xFEE0));
  const norm = z2h(input).replace(/[〜～ー−—]/g, "-"); // 波ダッシュ等をハイフンに
  const nums = norm.match(/\d{1,9}/g)?.map(n => Number(n)) ?? [];
  if (nums.length === 0) return {};
  if (nums.length === 1) return { maxPrice: nums[0] };
  const [a, b] = nums;
  return { minPrice: Math.min(a, b), maxPrice: Math.max(a, b) };
} 