import { useRouter } from "next/router";
import { useMemo } from "react";
import { useMallProducts } from "@/hooks/useMallProducts";
import ProductList from "@/components/ProductList";

export default function PillowDiagnosisPage() {
  const { query } = useRouter();
  const params = useMemo(() => ({
    finalTag: String(query.finalTag || ""),
    budgetMin: query.min ? Number(query.min) : undefined,
    budgetMax: query.max ? Number(query.max) : undefined,
    mall: (query.mall as any) || "all",
    limit: 24,
  }), [query.finalTag, query.min, query.max, query.mall]);

  const { data, error, isLoading } = useMallProducts(params);

  return (
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="text-xl font-semibold">診断結果</h1>
      {data?.note && <div className="mt-3 rounded-xl border bg-amber-50 p-3 text-sm text-amber-800">{data.note}</div>}
      <div className="mt-4">
        <ProductList items={data?.items} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
} 