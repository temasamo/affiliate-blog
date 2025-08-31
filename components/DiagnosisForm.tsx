"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { Answers } from '@/lib/resultLogic';
import { logOutbound } from '@/lib/logOutbound';
import { toPriceRange, BudgetBand } from '@/lib/budget';

// 予算の正規化関数（文字列入力用）
function parseBudgetText(input: string) {
  const n = (input || "").match(/\d+/g)?.map(Number) ?? [];
  if (n.length === 0) return {};
  if (n.length === 1) return { minPrice: n[0] };
  return { minPrice: Math.min(n[0], n[1]), maxPrice: Math.max(n[0], n[1]) };
}

type Props = {
  onSubmit?: (answers: Answers) => Promise<void> | void;
  onResult?: (result: any) => void;
  sessionId?: string;
};

type Result = {
  title?: string;
  summary?: string;
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
};

const defaultFormState: Answers = {
  // 基本情報
  gender: "unspecified",
  age: null,
  
  // 睡眠スタイル
  sleepPosition: "back",
  neckPain: false,
  neckIssue: "none",
  heightPref: "medium",
  shoulderWidth: "normal",
  rollOver: "normal",
  
  // 健康・快適性
  snoring: "no",
  morningTired: "no",
  hotSweaty: false,
  
  // 環境・好み
  mattressHardness: "medium",
  adjustable: "no",
  materialPref: "none",
  
  // 購入情報
  budget: "Y5_8",
  reason: "first_time",
  pillowSize: "standard",
  
  // 現在の枕情報（ギフト以外の場合）
  currentPillow: undefined
};

export default function DiagnosisForm({ onSubmit, onResult, sessionId: propSessionId }: Props) {
  const [form, setForm] = useState<Answers>(defaultFormState);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [rowId, setRowId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  // 環境変数からURLを読み込み（クライアントサイドでのみ）
  const [urls, setUrls] = useState({
    rakuten: "https://www.rakuten.co.jp/",
    amazon: "https://www.amazon.co.jp/",
    yahoo: "https://shopping.yahoo.co.jp/"
  });

  // クライアント側でのみsessionIdを生成と環境変数の読み込み
  useEffect(() => {
    setMounted(true);
    if (propSessionId) {
      setSessionId(propSessionId);
    } else if (!sessionId) {
      // ブラウザ環境でのみcrypto.randomUUID()を使用
      if (typeof window !== 'undefined' && window.crypto) {
        setSessionId(crypto.randomUUID());
      } else {
        // フォールバック用のUUID生成
        setSessionId(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
      }
    }
    
    // 環境変数の読み込み
    setUrls({
      rakuten: process.env.NEXT_PUBLIC_RAKUTEN_URL || "https://www.rakuten.co.jp/",
      amazon: process.env.NEXT_PUBLIC_AMAZON_URL || "https://www.amazon.co.jp/",
      yahoo: process.env.NEXT_PUBLIC_YAHOO_URL || "https://shopping.yahoo.co.jp/"
    });
  }, [sessionId]);

  const update = <K extends keyof Answers, V extends Answers[K]>(k: K, v: V) =>
    setForm((s) => ({ ...s, [k]: v }));

  // クリック時ロギング + 遷移
  const handleOutbound = async (
    vendor: 'rakuten' | 'amazon' | 'yahoo',
    url: string,
    sessionId?: string
  ) => {
    try {
      if (sessionId) {
        await fetch("/api/log-outbound", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ctaId: "diagnosis-primary",
            url,
            page: "pillow-diagnosis",
            sessionId,
            referrer: typeof window !== "undefined" ? window.location.href : undefined,
            userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
          }),
          keepalive: true,
        });
      }
    } catch (e) {
      console.warn('log-outbound failed', e);
    } finally {
      // ログに失敗しても遷移は実行
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setRowId(null);
    
    // デバッグログ（送信直前）
    console.debug('[form] submit payload preview', form);
    
    // ✅ まず answers をページへ渡す
    onSubmit?.(form);
    
    try {

      // 予算の正規化
      const priceRange = parseBudgetText(form.budgetText ?? "");
      
      // 予算バンドの変換
      const budgetBand: BudgetBand | undefined = form.budget as BudgetBand | undefined;
      
      // デフォルトのAPI呼び出し
      const currentSessionId = sessionId || (typeof window !== 'undefined' && window.crypto 
        ? crypto.randomUUID() 
        : `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
      
      const payload = {
        ...form,
        age: typeof form.age === "string" ? Number(form.age) || null : form.age ?? null,
        sessionId: currentSessionId,
        priceRange, // 正規化された価格範囲を追加
        budgetBand, // 予算バンドを追加
        referrer: typeof window !== "undefined" ? window.location.href : undefined,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      };

      const response = await fetch('/api/pillow-diagnosis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        setRowId(data.id);
        if (onResult) {
          onResult(data);
        }
      } else {
        console.error('診断に失敗しました');
      }
    } catch (error) {
      console.error('診断エラー:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div style={{ textAlign: 'center' }}>
      {!mounted ? (
        <div>読み込み中...</div>
      ) : (
        <>
          <h2 style={{
            margin: '0 0 30px 0',
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#333',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            📋 診断フォーム
          </h2>
          
          {!result ? (
            <form onSubmit={handleSubmit} style={{ 
              display: 'grid', 
              gap: '25px', 
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              {/* 性別 */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 0.1s both',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  🌸 性別（任意）
                </label>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}>
                  {(["unspecified", "male", "female", "other"] as const).map((g) => (
                    <label key={g} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="radio"
                        name="gender"
                        checked={form.gender === g}
                        onChange={() => update("gender", g)}
                        style={{
                          cursor: 'pointer'
                        }}
                      />
                      <span style={{
                        fontSize: '1rem',
                        color: '#333'
                      }}>
                        {{
                          unspecified: "未指定",
                          male: "男性",
                          female: "女性",
                          other: "その他",
                        }[g]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 年齢 */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 0.2s both',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  📅 年齢（任意）
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min={10}
                  max={100}
                  placeholder="例：35"
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    fontSize: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '12px',
                    background: 'white',
                    color: '#333',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  value={form.age || ''}
                  onChange={(e) => update("age", e.target.value as any)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                />
                <p style={{
                  fontSize: '0.8rem',
                  color: '#666',
                  marginTop: '4px',
                  textAlign: 'left'
                }}>
                  10〜100の範囲で入力（空欄可）
                </p>
              </div>

              {/* 購入理由 */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 0.3s both',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  🎯 購入理由
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    fontSize: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '12px',
                    background: 'white',
                    color: '#333',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  value={form.reason}
                  onChange={(e) => update("reason", e.target.value as any)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <option value="first_time">初めて購入</option>
                  <option value="doesnt_fit">今の枕が合わない</option>
                  <option value="upgrade">より良い枕に買い替え</option>
                  <option value="gift">ギフト</option>
                </select>
              </div>

              {/* 現在の枕ヒアリング */}
              {(form.reason === "doesnt_fit" || form.reason === "upgrade") && (
                <div style={{
                  animation: 'fadeInUp 0.6s ease-out 0.4s both',
                  opacity: 0,
                  transform: 'translateY(20px)'
                }}>
                  <fieldset style={{
                    border: '2px solid #e1e5e9',
                    borderRadius: '16px',
                    padding: '20px',
                    background: 'rgba(102, 126, 234, 0.05)'
                  }}>
                    <legend style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#333',
                      padding: '0 8px'
                    }}>
                      今お使いの枕（診断精度UPのため任意）
                    </legend>

                    <div style={{
                      display: 'grid',
                      gap: '16px',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
                    }}>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '0.9rem',
                          marginBottom: '4px',
                          color: '#333'
                        }}>
                          ブランド/商品名
                        </label>
                        <input
                          style={{
                            width: '100%',
                            padding: '12px',
                            fontSize: '0.9rem',
                            border: '1px solid #e1e5e9',
                            borderRadius: '8px',
                            background: 'white'
                          }}
                          value={form.currentPillow?.brand ?? ""}
                          onChange={(e) => update("currentPillow", { ...(form.currentPillow || {}), brand: e.target.value })}
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '0.9rem',
                          marginBottom: '4px',
                          color: '#333'
                        }}>
                          使用年数
                        </label>
                        <select
                          style={{
                            width: '100%',
                            padding: '12px',
                            fontSize: '0.9rem',
                            border: '1px solid #e1e5e9',
                            borderRadius: '8px',
                            background: 'white'
                          }}
                          value={form.currentPillow?.yearsUsed ?? ""}
                          onChange={(e) => update("currentPillow", { ...(form.currentPillow || {}), yearsUsed: e.target.value })}
                        >
                          <option value="">未回答</option>
                          <option value="~6months">〜半年</option>
                          <option value="~1year">〜1年</option>
                          <option value="1-2years">1〜2年</option>
                          <option value="2-3years">2〜3年</option>
                          <option value="3+years">3年以上</option>
                        </select>
                      </div>

                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '0.9rem',
                          marginBottom: '4px',
                          color: '#333'
                        }}>
                          感じる高さ
                        </label>
                        <select
                          style={{
                            width: '100%',
                            padding: '12px',
                            fontSize: '0.9rem',
                            border: '1px solid #e1e5e9',
                            borderRadius: '8px',
                            background: 'white'
                          }}
                          value={form.currentPillow?.height ?? ""}
                          onChange={(e) => update("currentPillow", { ...(form.currentPillow || {}), height: e.target.value })}
                        >
                          <option value="">未回答</option>
                          <option value="low">低い</option>
                          <option value="medium">ちょうどよい</option>
                          <option value="high">高い</option>
                        </select>
                      </div>

                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '0.9rem',
                          marginBottom: '4px',
                          color: '#333'
                        }}>
                          感じる硬さ
                        </label>
                        <select
                          style={{
                            width: '100%',
                            padding: '12px',
                            fontSize: '0.9rem',
                            border: '1px solid #e1e5e9',
                            borderRadius: '8px',
                            background: 'white'
                          }}
                          value={form.currentPillow?.firmness ?? ""}
                          onChange={(e) => update("currentPillow", { ...(form.currentPillow || {}), firmness: e.target.value })}
                        >
                          <option value="">未回答</option>
                          <option value="soft">やわらかい</option>
                          <option value="medium">ふつう</option>
                          <option value="hard">硬い</option>
                        </select>
                      </div>

                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '0.9rem',
                          marginBottom: '4px',
                          color: '#333'
                        }}>
                          サイズ
                        </label>
                        <select
                          style={{
                            width: '100%',
                            padding: '12px',
                            fontSize: '0.9rem',
                            border: '1px solid #e1e5e9',
                            borderRadius: '8px',
                            background: 'white'
                          }}
                          value={form.currentPillow?.size ?? ""}
                          onChange={(e) => update("currentPillow", { ...(form.currentPillow || {}), size: e.target.value })}
                        >
                          <option value="">未回答</option>
                          <option value="small">小さめ（約35×50）</option>
                          <option value="standard">標準（約43×63）</option>
                          <option value="large">大きめ（約50×70）</option>
                        </select>
                      </div>

                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '0.9rem',
                          marginBottom: '4px',
                          color: '#333'
                        }}>
                          中材/素材
                        </label>
                        <select
                          style={{
                            width: '100%',
                            padding: '12px',
                            fontSize: '0.9rem',
                            border: '1px solid #e1e5e9',
                            borderRadius: '8px',
                            background: 'white'
                          }}
                          value={form.currentPillow?.material ?? ""}
                          onChange={(e) => update("currentPillow", { ...(form.currentPillow || {}), material: e.target.value })}
                        >
                          <option value="">未回答</option>
                          <option value="pipe">パイプ</option>
                          <option value="beads">ビーズ</option>
                          <option value="memory">低反発</option>
                          <option value="latex">高反発/ラテックス</option>
                          <option value="feather">羽根/フェザー</option>
                          <option value="fiber">ファイバー</option>
                          <option value="buckwheat">そば殻</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ marginTop: '16px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.9rem',
                        marginBottom: '8px',
                        color: '#333'
                      }}>
                        気になる点（複数可）
                      </label>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '8px'
                      }}>
                        {[
                          ["tooHigh","高すぎる"],["tooLow","低すぎる"],["sink","沈み込みすぎる"],
                          ["hot","熱がこもる"],["noise","音が気になる"],["smell","匂いが気になる"],
                          ["hardEdge","縁が当たる"],["stiffNeck","首が痛い/こる"],["others","その他"]
                        ].map(([key,label]) => (
                          <label key={key} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.8rem'
                          }}>
                            <input
                              type="checkbox"
                              checked={!!form.currentPillow?.issues?.[key]}
                              onChange={(e) => update("currentPillow", {
                                ...(form.currentPillow || {}),
                                issues: { ...(form.currentPillow?.issues || {}), [key]: e.target.checked }
                              })}
                            />
                            {label}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginTop: '16px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.9rem',
                        marginBottom: '4px',
                        color: '#333'
                      }}>
                        改善したい点（自由記述）
                      </label>
                      <textarea
                        style={{
                          width: '100%',
                          padding: '12px',
                          fontSize: '0.9rem',
                          border: '1px solid #e1e5e9',
                          borderRadius: '8px',
                          background: 'white',
                          minHeight: '80px',
                          resize: 'vertical'
                        }}
                        value={form.currentPillow?.wish ?? ""}
                        onChange={(e) => update("currentPillow", { ...(form.currentPillow || {}), wish: e.target.value })}
                        placeholder="例：首の痛みを改善したい、寝返りをしやすくしたいなど"
                      />
                    </div>
                  </fieldset>
                </div>
              )}

              {/* 睡眠姿勢 */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 0.3s both',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  🌙 主な寝姿勢
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    fontSize: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '12px',
                    background: 'white',
                    color: '#333',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  value={form.sleepPosition}
                  onChange={(e) => update("sleepPosition", e.target.value as any)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <option value="back">仰向け</option>
                  <option value="side">横向き</option>
                  <option value="stomach">うつ伏せ</option>
                </select>
              </div>

              {/* 首・肩の問題 */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 0.4s both',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  💆‍♀️ 首・肩の問題
                </label>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={form.neckPain}
                      onChange={(e) => update("neckPain", e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '1rem', color: '#333' }}>
                      首・肩に痛みや違和感がある
                    </span>
                  </label>
                  
                  {form.neckPain && (
                    <select
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        fontSize: '0.9rem',
                        border: '2px solid #e1e5e9',
                        borderRadius: '8px',
                        background: 'white',
                        color: '#333',
                        cursor: 'pointer',
                        marginLeft: '24px'
                      }}
                      value={form.neckIssue}
                      onChange={(e) => update("neckIssue", e.target.value as any)}
                    >
                      <option value="none">痛みや違和感の種類を選択</option>
                      <option value="stiff">肩こり・首のこり</option>
                      <option value="cervical">頸椎症・首の痛み</option>
                    </select>
                  )}
                </div>
              </div>

              {/* 好みの高さ */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 0.5s both',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  📏 好みの高さ
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    fontSize: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '12px',
                    background: 'white',
                    color: '#333',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  value={form.heightPref}
                  onChange={(e) => update("heightPref", e.target.value as any)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <option value="low">低め</option>
                  <option value="medium">普通</option>
                  <option value="high">高め</option>
                </select>
              </div>

              {/* 肩幅 */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 0.6s both',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  👤 肩幅（体格）
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    fontSize: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '12px',
                    background: 'white',
                    color: '#333',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  value={form.shoulderWidth}
                  onChange={(e) => update("shoulderWidth", e.target.value as any)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <option value="narrow">狭い</option>
                  <option value="normal">普通</option>
                  <option value="wide">広い</option>
                </select>
              </div>

              {/* 寝返り頻度 */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 0.7s both',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  🔄 寝返り頻度
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    fontSize: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '12px',
                    background: 'white',
                    color: '#333',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  value={form.rollOver}
                  onChange={(e) => update("rollOver", e.target.value as any)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <option value="few">少ない</option>
                  <option value="normal">普通</option>
                  <option value="many">多い</option>
                </select>
              </div>

              {/* いびき */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 0.8s both',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  😴 いびき
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    fontSize: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '12px',
                    background: 'white',
                    color: '#333',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  value={form.snoring}
                  onChange={(e) => update("snoring", e.target.value as any)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <option value="no">ない</option>
                  <option value="yes">ある</option>
                </select>
              </div>

              {/* 起床時の疲れ */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 0.9s both',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  😴 起床時の疲れ
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    fontSize: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '12px',
                    background: 'white',
                    color: '#333',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  value={form.morningTired}
                  onChange={(e) => update("morningTired", e.target.value as any)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <option value="no">ない</option>
                  <option value="sometimes">時々ある</option>
                  <option value="often">よくある</option>
                </select>
              </div>

              {/* 暑がり/汗かき */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 1.0s both',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  🌡️ 暑がり/汗かき
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '15px 20px',
                  background: 'rgba(102, 126, 234, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(102, 126, 234, 0.1)'
                }}>
                  <input
                    id="hotSweaty"
                    type="checkbox"
                    checked={form.hotSweaty}
                    onChange={(e) => update("hotSweaty", e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer'
                    }}
                  />
                  <label htmlFor="hotSweaty" style={{
                    fontSize: '1rem',
                    color: '#333',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}>
                    暑がりで汗をかきやすい
                  </label>
                </div>
              </div>

              {/* マットレスの硬さ */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 1.1s both',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  🛏️ マットレスの硬さ
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    fontSize: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '12px',
                    background: 'white',
                    color: '#333',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  value={form.mattressHardness}
                  onChange={(e) => update("mattressHardness", e.target.value as any)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <option value="soft">柔らかめ</option>
                  <option value="medium">普通</option>
                  <option value="hard">硬め</option>
                </select>
              </div>

              {/* 調整可能希望 */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 1.2s both',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  ⚙️ 調整可能希望
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    fontSize: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '12px',
                    background: 'white',
                    color: '#333',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  value={form.adjustable}
                  onChange={(e) => update("adjustable", e.target.value as any)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <option value="no">こだわらない</option>
                  <option value="yes">調整できる枕が良い</option>
                </select>
              </div>

              {/* 素材の好み */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 1.3s both',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  🧶 素材の好み
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    fontSize: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '12px',
                    background: 'white',
                    color: '#333',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  value={form.materialPref}
                  onChange={(e) => update("materialPref", e.target.value as any)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <option value="none">こだわらない</option>
                  <option value="buckwheat">そばがら</option>
                  <option value="pipe">パイプ</option>
                  <option value="memory">メモリーフォーム</option>
                  <option value="latex">ラテックス</option>
                  <option value="fiber">ファイバー</option>
                  <option value="feather">羽毛</option>
                </select>
              </div>



              {/* 想定サイズ */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 1.5s both',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  📦 想定サイズ
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    fontSize: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '12px',
                    background: 'white',
                    color: '#333',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  value={form.pillowSize}
                  onChange={(e) => update("pillowSize", e.target.value as any)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <option value="small">小さめ</option>
                  <option value="standard">標準</option>
                  <option value="large">大きめ</option>
                </select>
              </div>

              {/* 予算 */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 1.6s both',
                opacity: 0,
                transform: 'translateY(20px)'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333',
                  textAlign: 'left'
                }}>
                  💰 予算
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    fontSize: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '12px',
                    background: 'white',
                    color: '#333',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                  value={form.budget}
                  onChange={(e) => update("budget", e.target.value as any)}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <option value="UNDER_3000">〜¥3,000</option>
                  <option value="Y3_5">¥3,000〜¥5,000</option>
                  <option value="Y5_8">¥5,000〜¥8,000</option>
                  <option value="Y8_12">¥8,000〜¥12,000</option>
                  <option value="Y12_15">¥12,000〜¥15,000</option>
                  <option value="Y15_20">¥15,000〜¥20,000</option>
                  <option value="OVER_20000">¥20,000〜</option>
                </select>
              </div>


              <button 
                type="submit" 
                disabled={loading}
                style={{
                  marginTop: '20px',
                  padding: '18px 40px',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: 'white',
                  background: loading 
                    ? 'linear-gradient(135deg, #ccc, #999)' 
                    : 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: loading 
                    ? '0 4px 12px rgba(0,0,0,0.1)' 
                    : '0 8px 25px rgba(102, 126, 234, 0.3)',
                  transform: loading ? 'scale(0.98)' : 'scale(1)',
                  minWidth: '200px'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                  }
                }}
              >
                {loading ? (
                  <span>
                    <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span> 診断中…
                  </span>
                ) : (
                  <span>🔍 診断を実行</span>
                )}
              </button>
            </form>
          ) : null}
        </>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
