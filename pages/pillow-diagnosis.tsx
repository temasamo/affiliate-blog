'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import DiagnosisForm from '@/components/DiagnosisForm';
import ProductList from '@/components/result/ProductList';
import TopFirstGrid from '@/components/result/TopFirstGrid';
import { ResultSummaryCard } from '@/components/ResultSummaryCard';
import { toPercent } from '@/utils/toPercent';

export default function PillowDiagnosisPage() {
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  const [answers, setAnswers] = useState<any>(null);
  const sessionId = useMemo(() => (typeof crypto !== "undefined" ? crypto.randomUUID() : ""), []);

  // 再発防止の即席ガード：結果表示に必要なクエリが無ければ質問へ逃がす
  useEffect(() => {
    const hasFinal = typeof router.query.finalTag === "string" && router.query.finalTag.length > 0;
    if (!hasFinal && router.isReady) {
      // 結果表示に必要なクエリが無い場合は質問フォームを表示（リダイレクトしない）
      // このページは質問フォームと結果表示の両方を兼ねているため
    }
  }, [router.query.finalTag, router.isReady]);

  return (
    <>
      {/* フォーム -> result を更新 */}
      <DiagnosisForm
        onResult={(r: any) => { setResult(r); setAnswers(r.answers); }}
      />

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
        />
      )}

      {/* 小ユーティリティ */}
      {(() => {
        const pickFirst = (...vals: any[]) => vals.find(v => Array.isArray(v) ? v.length > 0 : Boolean(v));
        const painList = pickFirst(answers?.painPoints, answers?.concerns, answers?.issues) || [];
        const proposalPoints = (() => {
          const pts: string[] = [];
          if (result?.primaryCategory === 'cervical-support') pts.push('頸椎の自然なカーブを保ち後頭部を安定させる形状を優先');
          if (result?.height)   pts.push(`高さは「${result.height}」を基準に微調整`);
          if (result?.firmness) pts.push(`硬さは「${result.firmness}」を中心に選定`);
          return pts;
        })();

        return (
          <>
            {/* 3) 診断詳細 */}
            {result && (
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
            )}

            {/* 4) お悩みのポイント / ご提案のポイント */}
            {(painList.length > 0 || proposalPoints.length > 0) && (
              <section className="mx-auto max-w-6xl px-4 mt-6">
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold mb-4">🧩 お悩みのポイント / ご提案のポイント</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-slate-500 mb-2">お悩み</div>
                      <ul className="space-y-2">
                        {painList.map((t: string, i: number) => <li key={i} className="rounded-md bg-slate-50 px-3 py-2">・{t}</li>)}
                      </ul>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-2">ご提案</div>
                      <ul className="space-y-2">
                        {proposalPoints.map((t: string, i: number) => <li key={i} className="rounded-md bg-slate-50 px-3 py-2">・{t}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 5) 診断理由 */}
            {result && (
              <section className="mx-auto max-w-6xl px-4 mt-6">
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold mb-4">💡 診断理由</h3>
                  <ul className="space-y-2">
                    {answers?.sleepPos && <li className="rounded-md bg-slate-50 px-3 py-2">・{answers.sleepPos} が多い</li>}
                    {answers?.mattressFirmness && <li className="rounded-md bg-slate-50 px-3 py-2">・マットレスは {answers.mattressFirmness} 寄り</li>}
                    <li className="rounded-md bg-slate-50 px-3 py-2">・高さは {result.height}、硬さは {result.firmness} を中心に選定</li>
                  </ul>
                </div>
              </section>
            )}
          </>
        );
      })()}

      {/* ProductListで商品取得・表示 */}
      {result && (
        <ProductList
          category={result.primaryCategory || ''}
          height={result.height || ''}
          firmness={result.firmness || ''}
          material={result.material || ''}
          budgetBand={result.budgetBand}
          sessionId={sessionId}
          answers={answers}
          result={result}
        />
      )}
    </>
  );
} 