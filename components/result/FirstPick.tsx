import ProductCard from "@/components/result/ProductCard";

export default function FirstPick({ product, sessionId }: { product: any | null; sessionId?: string }) {
  if (!product) return null;
  return (
    <section className="rounded-2xl bg-white shadow p-5 mb-8">
      <h3 className="text-lg font-bold mb-4">🏆 第一候補</h3>
      <div className="grid grid-cols-1">
        <ProductCard product={product} sessionId={sessionId} />
      </div>
    </section>
  );
} 