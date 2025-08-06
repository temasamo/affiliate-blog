import Link from 'next/link';
import Image from 'next/image';

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  bgImage: string;
  textColor?: string;
  overlayColor?: string;
}

export default function CategoryCard({
  title,
  description,
  href,
  bgImage,
  textColor = 'text-white',
  overlayColor = 'bg-black/40'
}: CategoryCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-48">
        {/* 背景画像 */}
        <div className="absolute inset-0">
          <Image
            src={bgImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        
        {/* オーバーレイ */}
        <div className={`absolute inset-0 ${overlayColor} transition-opacity duration-300 group-hover:opacity-70`}></div>
        
        {/* コンテンツ */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-center">
          <h3 className={`text-lg font-semibold mb-2 ${textColor} group-hover:text-blue-200 transition-colors drop-shadow-lg`}>
            {title}
          </h3>
          <p className={`text-sm ${textColor} opacity-90 drop-shadow-md`}>
            {description}
          </p>
          <div className="mt-4 text-blue-200 text-sm font-medium inline-flex items-center transition-all duration-300 group-hover:translate-x-1 drop-shadow-md">
            詳細を見る
            <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
} 