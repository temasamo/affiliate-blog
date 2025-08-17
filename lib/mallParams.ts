export type MallParams = {
  finalTag: string;
  budgetMin?: number;
  budgetMax?: number;
  mall?: "rakuten" | "yahoo" | "amazon" | "all";
  limit?: number;
};

export function normalizeMallParams(p: MallParams) {
  return {
    finalTag: p.finalTag,
    budgetMin: p.budgetMin ?? null,
    budgetMax: p.budgetMax ?? null,
    mall: p.mall ?? "all",
    limit: p.limit ?? 24,
  };
} 