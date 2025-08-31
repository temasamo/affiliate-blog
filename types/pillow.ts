// /types/pillow.ts
export type OutboundClicks = {
  rakuten?: number; // クリック数
  yahoo?: number;
  amazon?: number;
};

export type PillowDiagnosisPayload = {
  session_id: string;
  answers: Record<string, string | number | boolean>; // 問ごとの回答
  scores: Record<string, number>;                     // カテゴリごとのスコア
  primary_category: string;                           // 例: "高反発"
  secondary_categories: string[];                     // 例: ["横向き", "寝返り多い"]
  confidence: number;                                 // 0-1 or 0-100 (決めた方に統一)
  reasons: string[];                                  // テキスト理由
  outbound_clicks: OutboundClicks;                    // クリックログ
  purchase_signal: boolean;                           // 今すぐ買う気
  satisfaction_quick?: number;                        // 0-10 の自己満足度
}; 