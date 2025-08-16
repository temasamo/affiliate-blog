import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface CategoryImageProps {
  category: string;
  className?: string;
}

export default function CategoryImage({ category, className = "" }: CategoryImageProps) {
  const getCategoryImage = (category: string) => {
    switch (category) {
      case '睡眠・健康':
        return 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop&crop=center';
      case '日本茶':
        return '/images/macha-kyusu.jpg';
      case '海外トレンド':
        return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop';
      case '日本商品':
        return 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop&crop=center';
      default:
        return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop';
    }
  };

  const getCategoryOverlay = (category: string) => {
    switch (category) {
      case '睡眠・健康':
        return 'from-blue-500/70 to-indigo-600/70';
      case '日本茶':
        return 'from-emerald-500/70 to-teal-600/70';
      case '海外トレンド':
        return 'from-blue-500/80 to-cyan-600/80';
      case '日本商品':
        return 'from-red-500/80 to-pink-600/80';
      default:
        return 'from-gray-500/80 to-gray-600/80';
    }
  };

  const getCategoryLink = (category: string) => {
    switch (category) {
      case '睡眠・健康':
        return '/sleep-health';
      case '日本茶':
        return '/japanese-tea';
      case '海外トレンド':
        return '/overseas-trend';
      case '日本商品':
        return '/japan-popular';
      default:
        return '/';
    }
  };

  return (
    <div className={`relative h-48 overflow-hidden ${className}`}>
      {/* 背景画像 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
        <Image
          src={getCategoryImage(category)}
          alt={category}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      {/* オーバーレイ */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryOverlay(category)}`}></div>
      
      {/* カテゴリラベル */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-2xl font-bold mb-2">
            {category}
          </div>
          <button 
            className="inline-block text-white/90 text-sm font-medium bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-black/50 transition-all duration-300 hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = getCategoryLink(category);
            }}
          >
            {category}
          </button>
        </div>
      </div>
    </div>
  );
} 