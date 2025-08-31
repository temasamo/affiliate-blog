import Image from "next/image";
import { mallKeyToStyle } from "@/lib/ui/mallStyles";

export default function FirstPickHero({ product }: { product: any }) {
  if (!product?.url) return null;
  const href = String(product.url).replace(/^http:/, "https:");
  const img = String(product.image || product.images?.[0] || "").replace(/^http:/, "https:");
  const mall = mallKeyToStyle(product?.store?.key);

  return (
    <section className="rounded-2xl bg-white shadow p-5">
      <h3 className="text-xl font-bold mb-3">🏆 第一候補</h3>

      <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="group block">
        <div className="relative w-full overflow-hidden rounded-2xl aspect-[16/9]">
          <Image
            src={img}
            alt={product.title ?? "first-pick"}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 800px, (min-width: 768px) 700px, 100vw"
          />
        </div>

        <div className="mt-3 line-clamp-2 text-[15px]">{product.title}</div>
        <div className="mt-1 text-indigo-600 font-semibold">
          {product.price ? `¥${Number(product.price).toLocaleString()}` : "価格未取得"}
        </div>

        <span className={`mt-3 inline-flex h-10 items-center rounded-xl px-4 text-white font-semibold ${mall.btn}`}>
          {mall.label}
        </span>
      </a>
    </section>
  );
} 