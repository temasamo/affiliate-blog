type Answers = Record<string, string | number | boolean>;

export function buildFinalTagOnce(baseTag: string, answers: Answers, lastAnswer?: string) {
  const suffix: string[] = [];

  // "最後の一問" の回答
  if (lastAnswer && lastAnswer !== "skip" && lastAnswer !== "none") {
    suffix.push(lastAnswer);
  }

  // 例: 回答マッピング（必要に応じて調整）
  if (answers["sleepSide"] === "side") suffix.push("横向き");
  if (answers["neckPain"] === true)    suffix.push("頚椎サポート");

  return [baseTag, ...suffix].filter(Boolean).join("|");
} 