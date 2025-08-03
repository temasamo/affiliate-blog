import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* サイト情報 */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Market Supporter AI</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              AIが導く、賢い洞察と信頼できるおすすめ
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              商品比較・ランキング・レビュー情報を発信し、より良い購買選択のサポートを目的としています。
            </p>
          </div>

          {/* カテゴリリンク */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">カテゴリ</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/sleep-health" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  睡眠・健康
                </Link>
              </li>
              <li>
                <Link href="/japanese-tea" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  日本茶
                </Link>
              </li>
              <li>
                <Link href="/overseas-trend" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  海外トレンド
                </Link>
              </li>
              <li>
                <Link href="/japan-popular" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  日本人気商品
                </Link>
              </li>
            </ul>
          </div>

          {/* 運営者情報リンク */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">運営者情報</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  運営者情報
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-100 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2025 Market Supporter AI All Rights Reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-gray-400">
                運営者：TEMOMASA | 所在地：神奈川県川崎市
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 