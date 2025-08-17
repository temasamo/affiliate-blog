import useSWR from "swr";
import { swrKeys } from "@/lib/keys";
import { buildMallUrl } from "@/lib/buildMallUrl";
import { MallParams } from "@/lib/mallParams";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  // ヒットゼロ時はレンジを広げて暫定候補（フラッシュ防止）
  if (!data?.items || data.items.length === 0) {
    const u = new URL(url, typeof window !== "undefined" ? window.location.origin : "http://localhost");
    u.searchParams.delete("budgetMin");
    u.searchParams.delete("budgetMax");
    u.searchParams.set("fallback", "true");
    const backup = await fetch(u.toString());
    if (backup.ok) {
      const b = await backup.json();
      return { ...b, note: "条件が厳しすぎたため一時的に候補を広げて表示しています。" };
    }
  }
  return data;
};

export function useMallProducts(params: MallParams) {
  return useSWR(swrKeys.mallProducts(params), () => fetcher(buildMallUrl(params)), {
    revalidateOnFocus: false,
    dedupingInterval: 10000,
    keepPreviousData: true,
  });
} 