import Image from "next/image";
import { mallKeyToStyle } from "@/lib/ui/mallStyles";

export default function FirstPickGallery({ product }: { product: any | null }) {
  if (!product?.url) return null;

  const href = String(product.url).replace(/^http:/, "https:");
  const imgs = (product.images?.length ? product.images : [product.image])
    .filter(Boolean)
    .slice(0, 2)
    .map((u: string) => u.replace(/^http:/, "https:"));

  const mall = mallKeyToStyle(product?.store?.key);

  return (
    <section className="rounded-2xl bg-white shadow p-5">
      <h3 className="text-lg font-bold mb-4">🏆 第一候補</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {imgs.map((src: string, i: number) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="relative block group"
          >
            <div className="relative w-full h-48 sm:h-56">
              <Image
                src={src}
                alt={product.title ?? `primary-${i}`}
                fill
                className="object-cover rounded-xl"
                priority={i === 0}
              />
            </div>

            {/* 角バッジ（クリック奪取しない） */}
            <span
              className={`pointer-events-none absolute right-3 top-3 text-xs px-2 py-1 rounded-md shadow ${mall.pill} opacity-90`}
            >
              {mall.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
} 