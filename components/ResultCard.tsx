"use client";
import React from 'react';
import PrimaryHero from './result/PrimaryHero';
import FirstPick from './result/FirstPick';

import ReasonList from './result/ReasonList';
import NextCandidates from './result/NextCandidates';
import SecondaryStrip from './result/SecondaryStrip';
import StoreButtons from './result/StoreButtons';
import ProductList from './result/ProductList';
import { PointsSection } from './result/Points';
import { buildInsights } from '@/lib/insights';
import type { Product } from '@/lib/resultLogic';

type Result = {
  title: string;
  summary: string;
  height?: string;
  firmness?: string;
  sizeLabel?: string;
  sizeTag?: string;
  problems?: string[];
  approaches?: string[];
  avoided?: string[];
  changePoints?: string[];
  primaryCategory?: string;
  secondaryCandidates?: Array<{
    key: string;
    label: string;
    tags: string[];
    score: number;
  }>;
  confidence?: number;
  reasons?: string[];
  primaryProduct?: Product;
  secondaryProducts?: Product[];
  sessionId?: string;
};

export default function ResultCard({ result, sessionId, answers }: { result: Result; sessionId?: string; answers?: any }) {
  // インサイトを構築（meta情報は後でProductListから取得）
  const { concerns, proposals } = buildInsights(answers || {}, result);

  return (
    <div className="space-y-6">
      {/* 上部ヒーロー（タイトル/高さ/硬さは出さない） */}
      <PrimaryHero
        summary={result.summary}
        confidence={result.confidence || 0.8}
      />

      {/* お悩みのポイント */}
      <PointsSection title="🧩 お悩みのポイント" items={concerns} />

      {/* ご提案のポイント */}
      <PointsSection title="🔧 ご提案のポイント" items={proposals} />

      {/* 診断理由 */}
      <ReasonList items={result.reasons || []} />

      {/* 実際の商品検索結果（第一候補・第二候補に分割） */}
      <ProductList
        category={result.primaryCategory || ''}
        height={result.height || ''}
        firmness={result.firmness || ''}
        sessionId={sessionId}
      />

      {/* 次点候補 */}
      <NextCandidates 
        groups={result.secondaryCandidates?.map(candidate => ({
          title: candidate.label,
          products: []
        })) || []} 
        maxGroups={3} 
      />

      {/* 第二候補の画像ストリップ */}
      <SecondaryStrip 
        products={result.secondaryProducts || []} 
      />

      {/* モールボタン */}
      <StoreButtons 
        product={{
          title: result.title || 'おすすめ枕',
          category: result.primaryCategory || '枕'
        }}
        primaryProduct={result.primaryProduct}
        sessionId={sessionId} 
      />

      {/* 詳細情報セクション */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          📋 診断詳細
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* おすすめの枕タイプ */}
          <div>
            <h4 className="font-medium text-slate-700 mb-2">おすすめの枕タイプ</h4>
            <p className="text-slate-600">{result.primaryCategory || '標準タイプ'}</p>
          </div>

          {/* おすすめの枕サイズ */}
          <div>
            <h4 className="font-medium text-slate-700 mb-2">おすすめの枕サイズ</h4>
            <p className="text-slate-600">{result.sizeLabel || '標準サイズ'}</p>
          </div>

          {/* 高さ */}
          {result.height && (
            <div>
              <h4 className="font-medium text-slate-700 mb-2">推奨高さ</h4>
              <p className="text-slate-600">{result.height}</p>
            </div>
          )}

          {/* 硬さ */}
          {result.firmness && (
            <div>
              <h4 className="font-medium text-slate-700 mb-2">推奨硬さ</h4>
              <p className="text-slate-600">{result.firmness}</p>
            </div>
          )}
        </div>

        {/* 問題点とアプローチ */}
        {result.problems && result.problems.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium text-slate-700 mb-2">今のあなたのお悩み</h4>
            <ul className="space-y-1">
              {result.problems.map((problem, index) => (
                <li key={index} className="text-slate-600 text-sm">• {problem}</li>
              ))}
            </ul>
          </div>
        )}

        {result.approaches && result.approaches.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-slate-700 mb-2">アプローチ</h4>
            <ul className="space-y-1">
              {result.approaches.map((approach, index) => (
                <li key={index} className="text-slate-600 text-sm">• {approach}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 