export type Answers = any;     // 既存の回答型を使ってOK
export type Result = any;      // 既存の診断結果型を使ってOK

export function buildInsights(a: Answers, r: Result, meta?: any) {
  const concerns: string[] = [];
  const proposals: string[] = [];

  // --- お悩みのポイント（入力から推定） ---
  if (a.sleepPosition === "side") concerns.push("横向き時の肩スペース確保が課題");
  if (a.sleepPosition === "back") concerns.push("仰向け時に首の自然なカーブ保持が課題");
  if (a.snoring === "yes") concerns.push("いびき・気道確保が気になる");
  if (a.hotSweaty) concerns.push("熱こもり・蒸れが気になる");
  if (a.morningTired !== "no") concerns.push("起床時の疲労感がある");
  if (a.currentPillow?.issues?.tooHigh) concerns.push("現枕が高すぎる");
  if (a.currentPillow?.issues?.tooLow) concerns.push("現枕が低すぎる");
  if (a.currentPillow?.issues?.sink) concerns.push("沈み込み過多で角度が崩れる");
  if (a.currentPillow?.issues?.hot) concerns.push("通気性が不足");
  if (a.currentPillow?.issues?.stiffNeck) concerns.push("首・肩のこりが出やすい");

  // --- ご提案のポイント（診断結果から要約） ---
  if (meta?.budgetMatched === false) {
    proposals.unshift("ご予算内に該当が無かったため、条件一致度を優先して予算外から提案しています。");
  }
  if (r?.height) proposals.push(`高さは「${r.height}」がベース`);
  if (r?.firmness) proposals.push(`反発は「${r.firmness}」寄りで角度を保持`);
  if (r?.material) proposals.push(`素材は「${r.material}」を優先`);
  if (r?.sizeLabel) proposals.push(`サイズは「${r.sizeLabel}」を推奨`);
  if (a.adjustable === "yes") proposals.push("微調整可能モデルで好みに合わせやすく");
  if (a.hotSweaty) proposals.push("通気性の良い中材・メッシュを選定");
  if (a.snoring === "yes") proposals.push("中央くぼみ/サイド高で横向き維持も選択肢");
  if (a.mattressHardness === "soft") proposals.push("柔らかいマットレスには枕はやや硬めで相殺");
  if (a.mattressHardness === "hard") proposals.push("硬めマットレスには枕はやや柔らかめで緩衝");

  return {
    concerns: uniq(concerns).slice(0, 5),
    proposals: uniq(proposals).slice(0, 5),
  };
}

function uniq(arr: string[]) {
  return Array.from(new Set(arr)).filter(Boolean);
} 