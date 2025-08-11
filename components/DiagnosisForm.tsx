import { useState, useEffect } from 'react';
import type { Answers } from '@/lib/resultLogic';
import { logOutbound } from '@/lib/logOutbound';

type Gender = "male" | "female" | "other" | "unspecified";

type FormState = {
  gender: Gender;
  age: number | "";
  sleepPosition: "back" | "side" | "stomach";
  neckPain: boolean;
  heightPref: "low" | "medium" | "high";
  shoulderPain: 'yes' | 'no';
  snoring: 'yes' | 'no';
  morningTired: 'often' | 'sometimes' | 'no';
  mattressHardness: 'soft' | 'medium' | 'hard';
  adjustable: 'yes' | 'no';
  budget: 'low' | 'medium' | 'high';
};

type Props = {
  onSubmit?: (answers: FormState) => Promise<void> | void;
  onResult?: (result: any) => void;
  sessionId?: string;
};

type Result = {
  primaryCategory?: string;
  secondaryCategories?: string[];
  confidence?: number;
  reasons?: string[];
  title?: string;
  summary?: string;
  height?: string;
  firmness?: string;
};

const defaultFormState: FormState = {
  gender: "unspecified",
  age: "",
  sleepPosition: "back",
  neckPain: false,
  heightPref: "medium",
  shoulderPain: 'no',
  snoring: 'no',
  morningTired: 'no',
  mattressHardness: 'medium',
  adjustable: 'no',
  budget: 'medium',
};

export default function DiagnosisForm({ onSubmit, onResult, sessionId: propSessionId }: Props) {
  const [form, setForm] = useState<FormState>(defaultFormState);
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

  const update = <K extends keyof FormState, V extends FormState[K]>(k: K, v: V) =>
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
    
    try {
      // もしonSubmitが提供されている場合はそれを使用
      if (onSubmit) {
        await onSubmit(form);
        return;
      }

      // デフォルトのAPI呼び出し
      const currentSessionId = sessionId || (typeof window !== 'undefined' && window.crypto 
        ? crypto.randomUUID() 
        : `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
      
      const payload = {
        ...form,
        age: typeof form.age === "string" ? Number(form.age) || null : form.age ?? null,
        sessionId: currentSessionId,
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

  const CTAButtons = () => {
    if (!result || !rowId) return null;

    const buttons = [
      { key: 'rakuten' as const, label: '🛒 楽天で探す', color: 'linear-gradient(135deg, #ff5c5c, #e74c3c)', url: urls.rakuten },
      { key: 'amazon' as const, label: '🛒 Amazonで探す', color: 'linear-gradient(135deg, #ff9900, #e67e00)', url: urls.amazon },
      { key: 'yahoo' as const, label: '🛒 Yahoo!で探す', color: 'linear-gradient(135deg, #720e9e, #5a0b7a)', url: urls.yahoo },
    ];

    return (
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '20px'
      }}>
        {buttons.map(button => (
          <button
            key={button.key}
            onClick={() => handleOutbound(button.key, button.url, rowId)}
            style={{
              padding: '12px 20px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: 'white',
              background: button.color,
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              minWidth: '140px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }}
          >
            {button.label}
          </button>
        ))}
      </div>
    );
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
                  value={form.age}
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

              {/* 首・肩のコリ */}
              <div style={{
                animation: 'fadeInUp 0.6s ease-out 0.4s both',
                opacity: 0,
                transform: 'translateY(20px)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '15px 20px',
                background: 'rgba(102, 126, 234, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(102, 126, 234, 0.1)'
              }}>
                <input
                  id="neckPain"
                  type="checkbox"
                  checked={form.neckPain}
                  onChange={(e) => update("neckPain", e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer'
                  }}
                />
                <label htmlFor="neckPain" style={{
                  fontSize: '1rem',
                  color: '#333',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}>
                  💪 首・肩のコリが気になる
                </label>
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
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}>
                  {(["low", "medium", "high"] as const).map((h) => (
                    <label key={h} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="radio"
                        name="height"
                        checked={form.heightPref === h}
                        onChange={() => update("heightPref", h)}
                        style={{
                          cursor: 'pointer'
                        }}
                      />
                      <span style={{
                        fontSize: '1rem',
                        color: '#333'
                      }}>
                        {h === "low" ? "低め" : h === "medium" ? "ふつう" : "高め"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 既存の質問項目 */}
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
                  <option value="no">感じない</option>
                  <option value="sometimes">時々</option>
                  <option value="often">よくある</option>
                </select>
              </div>

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
                  ⚙️ 調整可能枕の希望
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
                  <option value="low">〜5,000円</option>
                  <option value="medium">5,000〜15,000円</option>
                  <option value="high">15,000円〜</option>
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
          ) : (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {/* Primary Result */}
              <div style={{
                textAlign: 'center',
                marginBottom: '30px'
              }}>
                <h2 style={{
                  margin: '0 0 10px 0',
                  fontSize: '2rem',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  🎯 あなたへのおすすめ
                </h2>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '15px 30px',
                  borderRadius: '50px',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  display: 'inline-block',
                  boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)'
                }}>
                  {result.title || result.primaryCategory}
                </div>
              </div>

              {/* Summary */}
              {result.summary && (
                <div style={{
                  background: 'linear-gradient(135deg, #f8f9ff, #f0f2ff)',
                  padding: '20px',
                  borderRadius: '15px',
                  border: '1px solid rgba(102, 126, 234, 0.1)',
                  marginBottom: '30px',
                  textAlign: 'left'
                }}>
                  <p style={{
                    margin: '0',
                    fontSize: '1.1rem',
                    color: '#333',
                    lineHeight: '1.6'
                  }}>
                    {result.summary}
                  </p>
                </div>
              )}

              {/* Confidence Bar */}
              {result.confidence && (
                <div style={{
                  marginBottom: '30px',
                  textAlign: 'center'
                }}>
                  <p style={{
                    margin: '0 0 10px 0',
                    fontSize: '1.1rem',
                    color: '#666',
                    fontWeight: '500'
                  }}>
                    信頼度: <span style={{ fontWeight: '700', color: '#667eea' }}>{Math.round(result.confidence * 100)}%</span>
                  </p>
                  <div style={{
                    width: '100%',
                    height: '12px',
                    background: '#f0f0f0',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #667eea, #764ba2)',
                      width: `${result.confidence * 100}%`,
                      borderRadius: '6px',
                      transition: 'width 1s ease-in-out'
                    }} />
                  </div>
                </div>
              )}

              {/* Reasons */}
              {result.reasons && result.reasons.length > 0 && (
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{
                    margin: '0 0 15px 0',
                    fontSize: '1.3rem',
                    color: '#333',
                    fontWeight: '600'
                  }}>
                    💡 診断理由
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: '0',
                    margin: '0'
                  }}>
                    {result.reasons.map((reason, i) => (
                      <li key={i} style={{
                        background: 'linear-gradient(135deg, #f8f9ff, #f0f2ff)',
                        padding: '15px 20px',
                        marginBottom: '10px',
                        borderRadius: '12px',
                        border: '1px solid rgba(102, 126, 234, 0.1)',
                        fontSize: '1rem',
                        color: '#555',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: '15px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '8px',
                          height: '8px',
                          background: '#667eea',
                          borderRadius: '50%'
                        }} />
                        <span style={{ marginLeft: '20px' }}>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Secondary Categories */}
              {result.secondaryCategories && result.secondaryCategories.length > 0 && (
                <div style={{
                  background: 'linear-gradient(135deg, #f8f9ff, #f0f2ff)',
                  padding: '20px',
                  borderRadius: '15px',
                  border: '1px solid rgba(102, 126, 234, 0.1)',
                  marginBottom: '30px'
                }}>
                  <h3 style={{
                    margin: '0 0 10px 0',
                    fontSize: '1.2rem',
                    color: '#333',
                    fontWeight: '600'
                  }}>
                    🔄 次点候補
                  </h3>
                  <p style={{
                    margin: '0',
                    fontSize: '1.1rem',
                    color: '#667eea',
                    fontWeight: '500'
                  }}>
                    {result.secondaryCategories.join(' / ')}
                  </p>
                </div>
              )}

              {/* CTA Buttons */}
              <CTAButtons />

              {/* Reset Button */}
              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <button
                  onClick={() => {
                    setResult(null);
                    setRowId(null);
                    setForm(defaultFormState);
                  }}
                  style={{
                    padding: '12px 24px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#667eea',
                    background: 'white',
                    border: '2px solid #667eea',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#667eea';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#667eea';
                  }}
                >
                  🔄 再診断する
                </button>
              </div>
            </div>
          )}
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
