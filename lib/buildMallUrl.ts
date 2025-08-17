import { MallParams } from "./mallParams";

export function buildMallUrl(p: MallParams) {
  const url = new URL("/api/mall-products", typeof window !== "undefined" ? window.location.origin : "http://localhost");
  const append = (k: string, v?: string | number | null) => {
    if (v === undefined || v === null || v === "") return;
    url.searchParams.append(k, String(v));
  };
  append("finalTag", p.finalTag);
  append("budgetMin", p.budgetMin ?? null);
  append("budgetMax", p.budgetMax ?? null);
  append("mall", p.mall ?? "all");
  append("limit", p.limit ?? 24);
  return url.pathname + "?" + url.searchParams.toString(); // 相対URL返却（SSR/CSR両対応）
} 