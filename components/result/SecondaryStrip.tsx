import Image from "next/image";

export default function SecondaryStrip({ products = [] }: { products: any[] }) {
  const three = products.slice(0, 3);
  if (!three.length) return null;
  return (
    <section className="mt-8">
      <h3 className="text-lg font-semibold mb-3">🔁 第二候補</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {three.map((p, idx) => (
          <a key={idx} href={p.url} target="_blank" rel="noopener noreferrer"
             className="rounded-2xl bg-white shadow hover:shadow-md transition p-3 flex flex-col">
            <div className="relative w-full h-40">
              <Image src={(p.images?.[0] ?? p.image) || "/noimg.png"} alt={p.title} fill className="object-cover rounded-lg"/>
            </div>
            <div className="mt-2 text-sm line-clamp-2">{p.title}</div>
            {p.price ? <div className="mt-auto font-semibold text-indigo-600">¥{p.price.toLocaleString()}</div> : <div className="mt-auto text-slate-500 text-xs">価格未取得</div>}
          </a>
        ))}
      </div>
    </section>
  );
} 