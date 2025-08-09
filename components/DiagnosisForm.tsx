'use client';
import { useState } from 'react';
import type { Answers } from '@/lib/resultLogic';
import { affiliateLinks } from '@/lib/affiliateLinks';
import OutboundButton from '@/components/OutboundButton';

type Props = {
  onSubmit?: (answers: Answers) => Promise<void> | void;
};

type Result = {
  primaryCategory?: string;
  secondaryCategories?: string[];
  confidence?: number;
  reasons?: string[];
};

const defaultAnswers: Answers = {
  sleepPosition: 'back',
  shoulderPain: 'no',
  snoring: 'no',
  morningTired: 'no',
  mattressHardness: 'medium',
  adjustable: 'no',
  budget: 'medium',
};

export default function DiagnosisForm({ onSubmit }: Props) {
  const [answers, setAnswers] = useState<Answers>(defaultAnswers);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [rowId, setRowId] = useState<string | null>(null);

  const handleChange = (key: keyof Answers) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAnswers((prev) => ({ ...prev, [key]: e.target.value as any }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setRowId(null);
    
    try {
      // もしonSubmitが提供されている場合はそれを使用
      if (onSubmit) {
        await onSubmit(answers);
        return;
      }

      // デフォルトのAPI呼び出し
      const response = await fetch('/api/pillow-diagnosis-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          sessionId: crypto.randomUUID(), 
          answers 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
        setRowId(data.id);
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
      { key: 'rakuten' as const, label: '🛒 楽天で探す', color: 'linear-gradient(135deg, #ff5c5c, #e74c3c)' },
      { key: 'amazon' as const, label: '🛒 Amazonで探す', color: 'linear-gradient(135deg, #ff9900, #e67e00)' },
      { key: 'yahoo' as const, label: '🛒 Yahoo!で探す', color: 'linear-gradient(135deg, #720e9e, #5a0b7a)' },
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
          <OutboundButton
            key={button.key}
            partner={button.key}
            url={affiliateLinks[button.key]}
            sessionId={rowId}
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
              minWidth: '140px',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            {button.label}
          </OutboundButton>
        ))}
      </div>
    );
  };

  const questions = [
    {
      key: 'sleepPosition' as keyof Answers,
      label: '🌙 主な寝姿勢',
      options: [
        { value: 'back', label: '仰向け' },
        { value: 'side', label: '横向き' },
        { value: 'stomach', label: 'うつ伏せ' }
      ]
    },
    {
      key: 'shoulderPain' as keyof Answers,
      label: '💪 肩の痛み',
      options: [
        { value: 'no', label: 'ない' },
        { value: 'yes', label: 'ある' }
      ]
    },
    {
      key: 'snoring' as keyof Answers,
      label: '😴 いびき',
      options: [
        { value: 'no', label: 'ない' },
        { value: 'yes', label: 'ある' }
      ]
    },
    {
      key: 'morningTired' as keyof Answers,
      label: '😴 起床時の疲れ',
      options: [
        { value: 'no', label: '感じない' },
        { value: 'sometimes', label: '時々' },
        { value: 'often', label: 'よくある' }
      ]
    },
    {
      key: 'mattressHardness' as keyof Answers,
      label: '🛏️ マットレスの硬さ',
      options: [
        { value: 'soft', label: '柔らかめ' },
        { value: 'medium', label: '普通' },
        { value: 'hard', label: '硬め' }
      ]
    },
    {
      key: 'adjustable' as keyof Answers,
      label: '⚙️ 調整可能枕の希望',
      options: [
        { value: 'no', label: 'こだわらない' },
        { value: 'yes', label: '調整できる枕が良い' }
      ]
    },
    {
      key: 'budget' as keyof Answers,
      label: '💰 予算',
      options: [
        { value: 'low', label: '〜5,000円' },
        { value: 'medium', label: '5,000〜15,000円' },
        { value: 'high', label: '15,000円〜' }
      ]
    }
  ];

  return (
    <div style={{ textAlign: 'center' }}>
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
          {questions.map((question, index) => (
            <div key={question.key} style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
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
                {question.label}
              </label>
              <select 
                value={answers[question.key]} 
                onChange={handleChange(question.key)}
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
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e1e5e9';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                {question.options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}

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
              {result.primaryCategory}
            </div>
          </div>

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
                setAnswers(defaultAnswers);
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
