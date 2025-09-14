import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface HeaderProps {
  title?: string;
  description?: string;
}

export default function Header({ title = "Market Supporter AI", description = "AIが導く、賢い洞察と信頼できるおすすめ" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 検索機能の実装（後で追加）
    console.log('Search query:', searchQuery);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com" />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* ロゴ・タイトル */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Market Supporter AI
                </h1>
                <span className="hidden sm:block ml-4 text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                  AIが導く、賢い洞察と信頼できるおすすめ
                </span>
              </Link>
            </div>

            {/* 検索バー */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="記事を検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* デスクトップナビゲーション */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/sleep-health" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                睡眠・健康
              </Link>
              <Link href="https://www.marketsupporter-ai.com/travel" className="text-gray-600 hover:text-blue-600 font-medium transition-colors" target="_blank" rel="noopener noreferrer">
                旅行
              </Link>
              <Link href="/japanese-tea" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                日本茶
              </Link>
              <Link href="/overseas-trend" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                海外トレンド
              </Link>
              <Link href="/japan-popular" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                人気の日本商品
              </Link>
              <div className="border-l border-gray-300 h-6 mx-4"></div>
              <Link href="/diagnostic-ai" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700">
                診断AI
              </Link>
              <Link href="/education" className="text-purple-600 hover:text-purple-700 font-bold transition-colors">
                教育
              </Link>
            </nav>

            {/* モバイルメニューボタン */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* モバイル検索バー */}
          <div className="md:hidden mb-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="記事を検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* モバイルメニュー */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <nav className="flex flex-col space-y-3">
                <Link href="/sleep-health" className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-blue-50">
                  睡眠・健康
                </Link>
                <Link href="https://www.marketsupporter-ai.com/travel" className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-blue-50" target="_blank" rel="noopener noreferrer">
                  旅行
                </Link>
                <Link href="/japanese-tea" className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-blue-50">
                  日本茶
                </Link>
                <Link href="/overseas-trend" className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-blue-50">
                  海外トレンド
                </Link>
                <Link href="/japan-popular" className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-blue-50">
                  旅行
                </Link>
                <div className="border-t border-gray-200 my-2"></div>
                <Link href="/education" className="text-purple-600 hover:text-purple-700 font-bold transition-colors px-2 py-1 rounded-lg hover:bg-purple-50">
                  教育
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
} 