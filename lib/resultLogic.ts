// lib/resultLogic.ts
export type Gender = "male" | "female" | "other" | "unspecified";

export type Answers = {
  gender?: Gender;
  age?: number | "";
  sleepPosition: 'back' | 'side' | 'stomach';
  neckPain?: boolean;
  heightPref?: "low" | "medium" | "high";
  shoulderPain: 'yes' | 'no';
  snoring: 'yes' | 'no';
  morningTired: 'often' | 'sometimes' | 'no';
  mattressHardness: 'soft' | 'medium' | 'hard';
  adjustable: 'yes' | 'no';
  budget: 'low' | 'medium' | 'high';
};

// 最小のサンプルロジック（後で磨けばOK）
export function diagnose(answers: Answers) {
  const scores: Record<string, number> = {
    LOW: 0,
    MEDIUM: 0,
    ADJUSTABLE: 0,
    HOTEL: 0,
  };

  // ザックリな配点例
  if (answers.adjustable === 'yes') scores.ADJUSTABLE += 2;
  if (answers.sleepPosition === 'side') scores.MEDIUM += 1;
  if (answers.mattressHardness === 'hard') scores.LOW += 1;
  if (answers.snoring === 'yes') scores.HOTEL += 1;
  if (answers.budget === 'high') scores.HOTEL += 1;
  
  // 新しい項目の配点
  if (answers.neckPain) scores.ADJUSTABLE += 1;
  if (answers.heightPref === 'high') scores.HOTEL += 1;
  if (answers.heightPref === 'low') scores.LOW += 1;

  // 1位決定
  const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primaryCategory = entries[0][0];
  const secondaryCategories = entries.slice(1, 3).map(([k]) => k);

  const maxScore = entries[0][1];
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const confidence = Math.min(0.9, maxScore / total); // 適当な信頼度

  const reasons: string[] = [];
  if (answers.adjustable === 'yes') reasons.push('首高・調整可能な枕を好む傾向');
  if (answers.sleepPosition === 'side') reasons.push('横向き寝が多い');
  if (answers.snoring === 'yes') reasons.push('いびき対策の配慮が必要');
  if (answers.neckPain) reasons.push('首・肩のコリ対策が必要');

  return { scores, primaryCategory, secondaryCategories, confidence, reasons };
} 