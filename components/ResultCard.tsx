"use client";
import React from 'react';
import ReasonList from './result/ReasonList';
import StoreButtons from './result/StoreButtons';
import ProductList from './result/ProductList';
import { PointsSection } from './result/Points';
import { buildConcernsFromAnswers, buildReasons } from '@/lib/diagnosisCopy';
import type { Product, Answers } from '@/lib/resultLogic';
import type { BudgetBand } from '@/lib/budget';

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
  concerns?: string[];
  primaryProduct?: Product;
  secondaryProducts?: Product[];
  sessionId?: string;
  priceRange?: {
    minPrice?: number;
    maxPrice?: number;
  };
  budgetBand?: BudgetBand;
};

export default function ResultCard({ result, sessionId, answers }: { result: Result; sessionId?: string; answers?: Partial<Answers> }) {
  // デバッグログ（開発中の見える化）
  console.debug("ResultCard.answers", answers);
  
  // answers からの自動生成（サーバー未設定時の保険）
  const builtFromAnswers = buildConcernsFromAnswers(answers);
  const displayConcerns = (Array.isArray(result?.concerns) && result.concerns.length > 0) ? result.concerns : builtFromAnswers;
  const finalConcerns = displayConcerns.length ? displayConcerns : ["なし"];
  
  // ご提案のポイント（簡易版）
  const proposals: string[] = [];
  if (result?.primaryCategory === 'cervical-support') proposals.push('頸椎の自然なカーブを保ち後頭部を安定させる形状を優先');
  if (result?.height) proposals.push(`高さは「${result.height}」を基準に微調整`);
  if (result?.firmness) proposals.push(`硬さは「${result.firmness}」を中心に選定`);
  
  // 第一候補の状態管理
  const [firstPick, setFirstPick] = React.useState<any>(null);
  


  return (
    <div className="space-y-6">


      {/* 詳細情報セクション */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 mt-6">
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

      {/* お悩みのポイント */}
      <PointsSection title="🧩 お悩みのポイント" items={finalConcerns} />

      {/* ご提案のポイント */}
      <PointsSection title="🔧 ご提案のポイント" items={proposals} />

      {/* 診断のポイント */}
      <ReasonList items={result.reasons || []} />

      {/* 実際の商品検索結果（第一候補・第二候補に分割） */}
      <ProductList
        category={result.primaryCategory || ''}
        height={result.height || ''}
        firmness={result.firmness || ''}
        budgetBand={result.budgetBand}
        sessionId={sessionId}
        answers={answers}
        result={result}
        onFirstPick={setFirstPick}
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
    </div>
  );
} 