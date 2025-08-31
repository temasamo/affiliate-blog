import Image from "next/image";

export default function PrimaryGallery({ images = [] as string[] }) {
  const srcs = images.slice(0, 2);
  if (srcs.length === 0) return null;
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {srcs.map((src, i) => (
        <div key={i} className="relative w-full h-56 sm:h-64">
          <Image src={src} alt={`primary-${i}`} fill className="object-cover rounded-xl" />
        </div>
      ))}
    </div>
  );
} 