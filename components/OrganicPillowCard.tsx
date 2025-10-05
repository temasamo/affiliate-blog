import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const OrganicPillowCard = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🌿</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              新着
            </span>
            <span className="text-sm text-gray-500">2025-10-06</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            <Link href="/articles/sleep-health/pillow/group4/organic-pillow" className="hover:text-green-600 transition-colors">
              オーガニック素材の枕（自然派志向）
            </Link>
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            自然のやさしさに包まれる、オーガニック素材の枕。化学物質を避けたい方や敏感肌の方におすすめの理由を詳しく解説します。
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">
              オーガニック枕
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              自然素材
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200">
              エコ枕
            </span>
          </div>
          <div className="flex items-center justify-between">
            <Link 
              href="/articles/sleep-health/pillow/group4/organic-pillow"
              className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
            >
              詳細を見る
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <div className="text-xs text-gray-500">
              睡眠・健康
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganicPillowCard;
