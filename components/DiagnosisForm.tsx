'use client';

import { useEffect, useId, useState } from 'react';
import DiagnosisResult from './DiagnosisResult';

type Payload = {
  session_id: string;
  answers: Record<string, unknown>;
  scores: Record<string, number>;
  primary_category: string;
  secondary_categories: string[];
  confidence: number;
  reasons: string[];
  outbound_clicks: Record<string, number>;
  purchase_signal: boolean;
  satisfaction_quick: number | null;
};

type FormData = {
  sleepPosition: 'back' | 'side' | 'stomach' | 'mixed';
  shoulderPain: 'yes' | 'no' | 'sometimes';
  neckPain: 'yes' | 'no' | 'sometimes';
  snoring: 'yes' | 'no' | 'sometimes';
  wakeUpTired: 'yes' | 'no' | 'sometimes';
  mattressType: 'hard' | 'medium' | 'soft';
  budget: 'low' | 'medium' | 'high';
  washable: 'yes' | 'no';
  adjustable: 'yes' | 'no';
  hotelFeel: 'yes' | 'no';
};

type DiagnosisData = {
  primaryCategory: string;
  secondaryCategories: string[];
  confidence: number;
  reasons: string[];
  scores: Record<string, number>;
};

type ValidationError = {
  field: string;
  message: string;
};

export default function DiagnosisForm({
  serverIssuedAtISO,
}: { serverIssuedAtISO: string }) {
  // SSR で決まっている値は props でもらう（表示するならこれを使う）
  const [clientNow, setClientNow] = useState<string>(serverIssuedAtISO);
  const [sessionId, setSessionId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<'idle' | 'success' | 'error'>('idle');
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const formId = useId(); // 安定ID（key/for/id用）

  // フォームデータ
  const [formData, setFormData] = useState<FormData>({
    sleepPosition: 'back',
    shoulderPain: 'no',
    neckPain: 'no',
    snoring: 'no',
    wakeUpTired: 'no',
    mattressType: 'medium',
    budget: 'medium',
    washable: 'no',
    adjustable: 'no',
    hotelFeel: 'no',
  });

  // SSR とクライアントでズレる値は hydration 後に設定
  useEffect(() => {
    setClientNow(new Date().toISOString());
    // localStorage から sessionId を取得、なければ新規生成
    const saved = localStorage.getItem('pillow_diagnosis_sid');
    const sid = saved ?? crypto.randomUUID();
    localStorage.setItem('pillow_diagnosis_sid', sid);
    setSessionId(sid);
  }, []);

  // バリデーション関数
  const validateForm = (): ValidationError[] => {
    const errors: ValidationError[] = [];

    // 必須項目チェック（実際には全てselectなので空になることはないが、念のため）
    if (!formData.sleepPosition) {
      errors.push({ field: 'sleepPosition', message: '寝姿勢を選択してください' });
    }

    if (!formData.shoulderPain) {
      errors.push({ field: 'shoulderPain', message: '肩の痛みについて回答してください' });
    }

    if (!formData.neckPain) {
      errors.push({ field: 'neckPain', message: '首の痛みについて回答してください' });
    }

    if (!formData.snoring) {
      errors.push({ field: 'snoring', message: 'いびきについて回答してください' });
    }

    if (!formData.wakeUpTired) {
      errors.push({ field: 'wakeUpTired', message: '疲労感について回答してください' });
    }

    if (!formData.mattressType) {
      errors.push({ field: 'mattressType', message: 'マットレスの硬さを選択してください' });
    }

    if (!formData.budget) {
      errors.push({ field: 'budget', message: '予算を選択してください' });
    }

    if (!formData.washable) {
      errors.push({ field: 'washable', message: '洗濯可能について回答してください' });
    }

    if (!formData.adjustable) {
      errors.push({ field: 'adjustable', message: '調整可能について回答してください' });
    }

    if (!formData.hotelFeel) {
      errors.push({ field: 'hotelFeel', message: 'ホテル感について回答してください' });
    }

    // セッションIDチェック
    if (!sessionId) {
      errors.push({ field: 'session', message: 'セッションIDが生成されていません。ページを再読み込みしてください。' });
    }

    return errors;
  };

  // スコア計算ロジック
  const calculateScores = (data: FormData) => {
    const scores: Record<string, number> = {
      adjustable: 0,
      side_sleep: 0,
      breathable: 0,
      washable: 0,
      hotel: 0,
      low_rebound: 0,
    };

    // 寝姿勢によるスコア
    if (data.sleepPosition === 'side') {
      scores.side_sleep += 5;
      scores.adjustable += 3;
    } else if (data.sleepPosition === 'back') {
      scores.low_rebound += 4;
      scores.breathable += 3;
    } else if (data.sleepPosition === 'stomach') {
      scores.low_rebound += 5;
      scores.breathable += 4;
    }

    // 痛みによるスコア
    if (data.shoulderPain === 'yes' || data.neckPain === 'yes') {
      scores.adjustable += 4;
      scores.side_sleep += 2;
    }

    // いびきによるスコア
    if (data.snoring === 'yes') {
      scores.breathable += 4;
      scores.adjustable += 2;
    }

    // 疲労感によるスコア
    if (data.wakeUpTired === 'yes') {
      scores.hotel += 3;
      scores.adjustable += 2;
    }

    // マットレスタイプによるスコア
    if (data.mattressType === 'soft') {
      scores.low_rebound += 3;
    } else if (data.mattressType === 'hard') {
      scores.adjustable += 3;
    }

    // 洗濯可能
    if (data.washable === 'yes') {
      scores.washable += 5;
    }

    // 調整可能
    if (data.adjustable === 'yes') {
      scores.adjustable += 5;
    }

    // ホテル感
    if (data.hotelFeel === 'yes') {
      scores.hotel += 5;
    }

    return scores;
  };

  // カテゴリ決定ロジック
  const determineCategories = (scores: Record<string, number>) => {
    const sorted = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .filter(([,score]) => score > 0);

    const primary = sorted[0]?.[0] || 'adjustable';
    const secondary = sorted.slice(1, 3).map(([category]) => category);

    return { primary, secondary };
  };

  // 信頼度計算
  const calculateConfidence = (scores: Record<string, number>) => {
    const maxScore = Math.max(...Object.values(scores));
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const scoreRatio = maxScore / totalScore;
    return Math.min(0.95, Math.max(0.6, scoreRatio));
  };

  // 理由生成
  const generateReasons = (data: FormData, scores: Record<string, number>) => {
    const reasons: string[] = [];

    if (data.sleepPosition === 'side') {
      reasons.push('横向き寝に最適化');
    }
    if (data.shoulderPain === 'yes' || data.neckPain === 'yes') {
      reasons.push('肩・首の痛み対策');
    }
    if (data.snoring === 'yes') {
      reasons.push('いびき軽減効果');
    }
    if (data.wakeUpTired === 'yes') {
      reasons.push('疲労回復サポート');
    }
    if (data.washable === 'yes') {
      reasons.push('洗濯可能で清潔');
    }
    if (data.adjustable === 'yes') {
      reasons.push('高さ調整可能');
    }
    if (data.hotelFeel === 'yes') {
      reasons.push('ホテル級の快適さ');
    }

    return reasons.length > 0 ? reasons : ['一般的な枕の特徴'];
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 入力時にエラーをクリア
    setValidationErrors(prev => prev.filter(error => error.field !== field));
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // バリデーション実行
    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      setErrorMessage('入力内容に問題があります。以下を確認してください。');
      return;
    }

    setIsSubmitting(true);
    setSubmitResult('idle');
    setValidationErrors([]);
    setErrorMessage('');

    try {
      const scores = calculateScores(formData);
      const { primary, secondary } = determineCategories(scores);
      const confidence = calculateConfidence(scores);
      const reasons = generateReasons(formData, scores);

      const payload: Payload = {
        session_id: sessionId,
        answers: formData,
        scores,
        primary_category: primary,
        secondary_categories: secondary,
        confidence,
        reasons,
        outbound_clicks: { rakuten: 0, yahoo: 0, amazon: 0 },
        purchase_signal: false,
        satisfaction_quick: null,
      };

      const res = await fetch('/api/pillow-diagnosis-log', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error:', {
          status: res.status,
          statusText: res.statusText,
          response: errorText,
          payload
        });
        
        let errorMsg = '診断の保存に失敗しました。';
        if (res.status === 400) {
          errorMsg = '入力データに問題があります。';
        } else if (res.status === 500) {
          errorMsg = 'サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。';
        } else if (res.status === 503) {
          errorMsg = 'サービスが一時的に利用できません。しばらく時間をおいて再度お試しください。';
        }
        
        setErrorMessage(errorMsg);
        setSubmitResult('error');
        return;
      }

      setSubmitResult('success');
      setDiagnosisData({
        primaryCategory: primary,
        secondaryCategories: secondary,
        confidence,
        reasons,
        scores
      });
      
      console.log('診断結果:', { primary, secondary, confidence, reasons });
    } catch (error) {
      console.error('Submit error:', error);
      
      let errorMsg = '予期しないエラーが発生しました。';
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMsg = 'ネットワークエラーが発生しました。インターネット接続を確認してください。';
      } else if (error instanceof Error) {
        errorMsg = `エラーが発生しました: ${error.message}`;
      }
      
      setErrorMessage(errorMsg);
      setSubmitResult('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 診断結果が表示されている場合は結果コンポーネントを表示
  if (diagnosisData) {
    return (
      <DiagnosisResult
        sessionId={sessionId}
        primaryCategory={diagnosisData.primaryCategory}
        secondaryCategories={diagnosisData.secondaryCategories}
        confidence={diagnosisData.confidence}
        reasons={diagnosisData.reasons}
        scores={diagnosisData.scores}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">枕診断フォーム</h1>
      
      {/* エラーメッセージ */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded">
          <p className="text-red-700 font-medium">{errorMessage}</p>
          {validationErrors.length > 0 && (
            <ul className="mt-2 text-sm text-red-600">
              {validationErrors.map((error, index) => (
                <li key={index}>• {error.message}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      
      <form id={formId} onSubmit={handleSubmit} className="space-y-6">
        {/* 寝姿勢 */}
        <div>
          <label className="block text-sm font-medium mb-2">
            主な寝姿勢を教えてください
          </label>
          <select
            value={formData.sleepPosition}
            onChange={(e) => handleInputChange('sleepPosition', e.target.value)}
            className={`w-full p-2 border rounded ${
              validationErrors.some(e => e.field === 'sleepPosition') ? 'border-red-500' : ''
            }`}
          >
            <option value="back">仰向け</option>
            <option value="side">横向き</option>
            <option value="stomach">うつ伏せ</option>
            <option value="mixed">様々</option>
          </select>
        </div>

        {/* 痛み */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              肩の痛みはありますか？
            </label>
            <select
              value={formData.shoulderPain}
              onChange={(e) => handleInputChange('shoulderPain', e.target.value)}
              className={`w-full p-2 border rounded ${
                validationErrors.some(e => e.field === 'shoulderPain') ? 'border-red-500' : ''
              }`}
            >
              <option value="no">ない</option>
              <option value="sometimes">時々ある</option>
              <option value="yes">よくある</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              首の痛みはありますか？
            </label>
            <select
              value={formData.neckPain}
              onChange={(e) => handleInputChange('neckPain', e.target.value)}
              className={`w-full p-2 border rounded ${
                validationErrors.some(e => e.field === 'neckPain') ? 'border-red-500' : ''
              }`}
            >
              <option value="no">ない</option>
              <option value="sometimes">時々ある</option>
              <option value="yes">よくある</option>
            </select>
          </div>
        </div>

        {/* 睡眠の質 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              いびきをかきますか？
            </label>
            <select
              value={formData.snoring}
              onChange={(e) => handleInputChange('snoring', e.target.value)}
              className={`w-full p-2 border rounded ${
                validationErrors.some(e => e.field === 'snoring') ? 'border-red-500' : ''
              }`}
            >
              <option value="no">かかない</option>
              <option value="sometimes">時々かく</option>
              <option value="yes">よくかく</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              朝起きた時に疲れを感じますか？
            </label>
            <select
              value={formData.wakeUpTired}
              onChange={(e) => handleInputChange('wakeUpTired', e.target.value)}
              className={`w-full p-2 border rounded ${
                validationErrors.some(e => e.field === 'wakeUpTired') ? 'border-red-500' : ''
              }`}
            >
              <option value="no">感じない</option>
              <option value="sometimes">時々感じる</option>
              <option value="yes">よく感じる</option>
            </select>
          </div>
        </div>

        {/* マットレス */}
        <div>
          <label className="block text-sm font-medium mb-2">
            現在のマットレスの硬さは？
          </label>
          <select
            value={formData.mattressType}
            onChange={(e) => handleInputChange('mattressType', e.target.value)}
            className={`w-full p-2 border rounded ${
              validationErrors.some(e => e.field === 'mattressType') ? 'border-red-500' : ''
            }`}
          >
            <option value="soft">柔らかい</option>
            <option value="medium">普通</option>
            <option value="hard">硬い</option>
          </select>
        </div>

        {/* 希望 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              洗濯可能な枕が良いですか？
            </label>
            <select
              value={formData.washable}
              onChange={(e) => handleInputChange('washable', e.target.value)}
              className={`w-full p-2 border rounded ${
                validationErrors.some(e => e.field === 'washable') ? 'border-red-500' : ''
              }`}
            >
              <option value="no">こだわらない</option>
              <option value="yes">洗濯可能が良い</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              高さ調整可能な枕が良いですか？
            </label>
            <select
              value={formData.adjustable}
              onChange={(e) => handleInputChange('adjustable', e.target.value)}
              className={`w-full p-2 border rounded ${
                validationErrors.some(e => e.field === 'adjustable') ? 'border-red-500' : ''
              }`}
            >
              <option value="no">こだわらない</option>
              <option value="yes">調整可能が良い</option>
            </select>
          </div>
        </div>

        {/* 予算 */}
        <div>
          <label className="block text-sm font-medium mb-2">
            予算はどのくらいですか？
          </label>
          <select
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className={`w-full p-2 border rounded ${
              validationErrors.some(e => e.field === 'budget') ? 'border-red-500' : ''
            }`}
          >
            <option value="low">5,000円以下</option>
            <option value="medium">5,000円〜15,000円</option>
            <option value="high">15,000円以上</option>
          </select>
        </div>

        {/* ホテル感 */}
        <div>
          <label className="block text-sm font-medium mb-2">
            ホテル級の快適さを求めますか？
          </label>
          <select
            value={formData.hotelFeel}
            onChange={(e) => handleInputChange('hotelFeel', e.target.value)}
            className={`w-full p-2 border rounded ${
              validationErrors.some(e => e.field === 'hotelFeel') ? 'border-red-500' : ''
            }`}
          >
            <option value="no">こだわらない</option>
            <option value="yes">ホテル級が良い</option>
          </select>
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded transition-colors"
        >
          {isSubmitting ? '診断中...' : '診断を実行'}
        </button>

        {/* 結果表示 */}
        {submitResult === 'success' && (
          <div className="p-4 bg-green-100 border border-green-400 rounded">
            <p className="text-green-700">診断が完了しました！結果を確認してください。</p>
          </div>
        )}

        {/* デバッグ情報 */}
        <div className="text-xs text-gray-500 space-y-1">
          <div>serverIssuedAt: {serverIssuedAtISO}</div>
          <div>clientNow: {clientNow}</div>
          <div>sessionId: {sessionId}</div>
        </div>
      </form>
    </div>
  );
}
