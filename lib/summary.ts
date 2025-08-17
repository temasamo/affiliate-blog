// 診断結果の自然な要約文を生成するシステム

// 末尾の「を目安にご提案します。」が既に付いていれば剥がす
const stripTail = (s: string) =>
  s.replace(/(を)?目安にご提案します。?$/, "").trim();

export type SummaryInput = {
  categoryLabel: string;
  sleepPosition: "back" | "side" | "stomach";
  mattress: "soft" | "medium" | "hard";
  height: "低め" | "ふつう" | "高め" | "やや高め" | "やや低め";
  firmness: "やわらかめ" | "ふつう" | "やや硬め" | "硬め";
  shoulderWidth?: "narrow" | "normal" | "wide";
  rollOver?: "few" | "normal" | "many";
  hotSweaty?: boolean;
  currentPillowIssues?: {
    tooHigh?: boolean;
    tooLow?: boolean;
    tooSoft?: boolean;
    tooHard?: boolean;
  };
};

export function buildSummary(rec: SummaryInput): string {
  const pos = rec.sleepPosition === "side" ? "横向き寝" :
              rec.sleepPosition === "back" ? "仰向け寝" : "うつ伏せ寝";
  
  const matt = rec.mattress === "soft" ? "やわらかめ" :
               rec.mattress === "hard" ? "硬め" : "「ふつう」";

  // 基本文の構築
  let summary = `あなたは${pos}が多く、マットレスは${matt}寄り。`;

  // 肩幅の情報を追加
  if (rec.shoulderWidth === "wide") {
    summary += "肩幅が広いため、";
  } else if (rec.shoulderWidth === "narrow") {
    summary += "肩幅が狭いため、";
  }

  // 寝返りの情報を追加
  if (rec.rollOver === "many") {
    summary += "寝返りが多いので、";
  } else if (rec.rollOver === "few") {
    summary += "寝返りが少ないので、";
  }

  // 暑がりの情報を追加
  if (rec.hotSweaty) {
    summary += "暑がりなので通気性の良い、";
  }

  // 現在の枕の不満を反映
  if (rec.currentPillowIssues) {
    const issues = [];
    if (rec.currentPillowIssues.tooHigh) issues.push("高すぎる");
    if (rec.currentPillowIssues.tooLow) issues.push("低すぎる");
    if (rec.currentPillowIssues.tooSoft) issues.push("やわらかすぎる");
    if (rec.currentPillowIssues.tooHard) issues.push("硬すぎる");
    
    if (issues.length > 0) {
      summary += `現在の枕は${issues.join("・")}と感じているため、`;
    }
  }

  // カテゴリと推奨仕様（末尾は一元管理）
  summary += `${rec.categoryLabel}の中から、〈高さ：${rec.height}・かたさ：${rec.firmness}〉を目安にご提案します。`;

  return summary;
}

// カテゴリラベルの取得
export function getCategoryLabel(categoryKey: string): string {
  const categoryMap: Record<string, string> = {
    'cervical-support': '頸椎サポート枕',
    'side-sleep': '横向き強化枕',
    'back-stable': '仰向け安定枕',
    'breathable': '通気性重視枕',
    'adjustable': '調整式枕',
    'wrapping': '包み込み枕'
  };
  
  return categoryMap[categoryKey] || '快適枕';
} 