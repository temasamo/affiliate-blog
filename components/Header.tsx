import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface HeaderProps {
  title?: string;
  description?: string;
}

export default function Header({ title = "Market Supporter AI", description = "AIが導く、賢い洞察と信頼できるおすすめ" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAlcoholMenuOpen, setIsAlcoholMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const alcoholMenuRef = useRef<HTMLDivElement>(null);

  // メニュー外をクリックした時にメニューを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (alcoholMenuRef.current && !alcoholMenuRef.current.contains(event.target as Node)) {
        setIsAlcoholMenuOpen(false);
      }
    };

    if (isAlcoholMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAlcoholMenuOpen]);

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
              <Link href="/travel" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                旅行
              </Link>
              <Link href="/japanese-tea" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                日本茶
              </Link>
              {/* お酒ドロップダウンメニュー */}
              <div className="relative" ref={alcoholMenuRef}>
                <button
                  onClick={() => setIsAlcoholMenuOpen(!isAlcoholMenuOpen)}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-blue-50 flex items-center"
                >
                  お酒
                  <svg className={`ml-1 w-4 h-4 transition-transform ${isAlcoholMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* ドロップダウンメニュー */}
                {isAlcoholMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link 
                      href="/japanese-sake" 
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsAlcoholMenuOpen(false)}
                    >
                      🍶 日本酒
                    </Link>
                    <Link 
                      href="/whisky" 
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsAlcoholMenuOpen(false)}
                    >
                      🥃 ウイスキー
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link 
                      href="/alcohol" 
                      className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                      onClick={() => setIsAlcoholMenuOpen(false)}
                    >
                      お酒一覧を見る
                    </Link>
                  </div>
                )}
              </div>
              <Link href="/ai-apps" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                AIアプリ情報
              </Link>
              <Link href="/articles/general-knowledge/knowledge" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                一般教養
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
                <Link href="/travel" className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-blue-50">
                  旅行
                </Link>
                <Link href="/japanese-tea" className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-blue-50">
                  日本茶
                </Link>
                {/* お酒セクション */}
                <div className="px-2 py-1">
                  <div className="text-gray-600 font-medium mb-2">お酒</div>
                  <div className="ml-4 space-y-2">
                    <Link href="/japanese-sake" className="block text-gray-600 hover:text-blue-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-blue-50">
                      🍶 日本酒
                    </Link>
                    <Link href="/whisky" className="block text-gray-600 hover:text-blue-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-blue-50">
                      🥃 ウイスキー
                    </Link>
                  </div>
                </div>
                <Link href="/ai-apps" className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-blue-50">
                  AIアプリ情報
                </Link>
                <Link href="/articles/general-knowledge/knowledge" className="text-gray-600 hover:text-blue-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-blue-50">
                  一般教養
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
