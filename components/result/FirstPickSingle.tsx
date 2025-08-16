import ProductCard from "@/components/result/ProductCard";

export default function FirstPickSingle({ product }: { product: any | null }) {
  if (!product) return null;
  return (
    <section className="rounded-2xl bg-white shadow p-5 mb-8">
      <h3 className="text-lg font-bold mb-4">🏆 第一候補</h3>
      <ProductCard product={product} />
    </section>
  );
} 