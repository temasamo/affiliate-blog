'use client';

import { useMemo, useState, useCallback } from 'react';
import DiagnosisForm from '@/components/DiagnosisForm';
import ProductList from '@/components/result/ProductList';
import TopFirstGrid from '@/components/result/TopFirstGrid';
import { ResultSummaryCard } from '@/components/ResultSummaryCard';
import { toPercent } from '@/utils/toPercent';
import { buildConcernsFromAnswers, buildReasons } from '@/lib/diagnosisCopy';
import type { Answers } from '@/lib/resultLogic';

export default function PillowDiagnosisPage() {
  const [usedAnswers, setUsedAnswers] = useState<Answers | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const sessionId = useMemo(() => (typeof crypto !== "undefined" ? crypto.randomUUID() : ""), []);

  // ✅ フォームから answers を受け取って保持（ここが今ない/届いてない）
  const handleFormSubmit = useCallback((answers: Answers) => {
    setUsedAnswers(answers);
    console.debug('[diag] set usedAnswers', answers);
  }, []);

  // ✅ API 結果を受け取る（既存 onResult をそのまま使う）
  const handleResult = useCallback((r: any) => {
    setResult(r);
    console.debug('[diag] onResult', r);
  }, []);

  // ✅ 表示用「お悩み」：結果に入っていればそれを優先、なければ usedAnswers から組み立て、最後に「なし」
  const displayConcerns = useMemo(() => {
    if (result?.concerns?.length) return result.concerns as string[];
    const built = buildConcernsFromAnswers(usedAnswers ?? undefined);
    return built.length ? built : ['なし'];
  }, [result, usedAnswers]);

  // デバッグ（変更が入ったら毎回見えるように）
  console.debug('[diag] usedAnswers', usedAnswers ?? '(null)');
  console.debug('[diag] finalConcerns', displayConcerns);

  return (
    <>
      {/* フォームに onSubmit / onResult を必ず渡す */}
      <DiagnosisForm onSubmit={handleFormSubmit} onResult={handleResult} />

      {/* ここは既存の診断結果一文（重複させない） */}
      {result?.summary && <ResultSummaryCard summary={result.summary} />}

      {/* 上2をここに表示 */}
      {result && (
        <TopFirstGrid
          category={result.primaryCategory || ''}
          height={result.height || ''}
          firmness={result.firmness || ''}
          material={result.material || ''}
          budgetBand={result.budgetBand}
          sessionId={sessionId}
          matchPercent={toPercent(result.confidence ?? 76)}
          answers={usedAnswers}
        />
      )}

      {/* 結果UIで displayConcerns を使う（result.concerns 直参照はやめる） */}
      {result && (
        <>
          {/* 3) 診断詳細 */}
          <section className="mx-auto max-w-6xl px-4 mt-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">📝 診断詳細</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div><div className="text-sm text-slate-500">おすすめの枕タイプ</div><div className="font-medium">{result.primaryCategory}</div></div>
                <div><div className="text-sm text-slate-500">おすすめの枕サイズ</div><div className="font-medium">{result.sizeLabel ?? '標準（約43×63cm）'}</div></div>
                <div><div className="text-sm text-slate-500">推奨高さ</div><div className="font-medium">{result.height}</div></div>
                <div><div className="text-sm text-slate-500">推奨硬さ</div><div className="font-medium">{result.firmness}</div></div>
              </div>
            </div>
          </section>

          {/* 4) お悩みのポイント / ご提案のポイント */}
          <section className="mx-auto max-w-6xl px-4 mt-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">🧩 お悩みのポイント / ご提案のポイント</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-500 mb-2">お悩み</div>
                  <ul className="space-y-2">
                    {displayConcerns.map((t: string, i: number) => <li key={i} className="rounded-md bg-slate-50 px-3 py-2">・{t}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-2">ご提案</div>
                  <ul className="space-y-2">
                    {(() => {
                      const pts: string[] = [];
                      if (result?.primaryCategory === 'cervical-support') pts.push('頸椎の自然なカーブを保ち後頭部を安定させる形状を優先');
                      if (result?.height)   pts.push(`高さは「${result.height}」を基準に微調整`);
                      if (result?.firmness) pts.push(`硬さは「${result.firmness}」を中心に選定`);
                      return pts;
                    })().map((t: string, i: number) => <li key={i} className="rounded-md bg-slate-50 px-3 py-2">・{t}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 5) 診断のポイント */}
          <section className="mx-auto max-w-6xl px-4 mt-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">💡 診断のポイント</h3>
              <ul className="space-y-2">
                {(result?.reasons?.length ? result.reasons : buildReasons(usedAnswers ?? undefined)).map((t: string, i: number) => <li key={i} className="rounded-md bg-slate-50 px-3 py-2">・{t}</li>)}
              </ul>
            </div>
          </section>
        </>
      )}

      {/* ProductListで商品取得・表示 */}
      {result && (
        <ProductList
          category={result.primaryCategory || ''}
          height={result.height || ''}
          firmness={result.firmness || ''}
          material={result.material || ''}
          budgetBand={result.budgetBand}
          sessionId={sessionId}
          answers={usedAnswers}
          result={result}
        />
      )}
    </>
  );
} 