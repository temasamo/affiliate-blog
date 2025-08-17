// 末尾の「を目安にご提案します。」が既に付いていれば剥がす
const stripTail = (s: string) =>
  s.replace(/(を)?目安にご提案します。?$/, "").trim();

export function finalizeSummary(text: string) {
  // 末尾の句点や「〜ください」を置き換え、AI提案を前面に
  const trimmed = text
    .replace(/(を目安に)?(お)?選んで?ください。?$/, '') // 〜を目安にお選びください を除去
    .replace(/[。．\.]+$/, ''); // 最後の句点を除去
  
  // 生成元にそのまま「を目安にご提案します。」が含まれていても二重にならないよう正規化
  const base = stripTail(trimmed);
  return `${base}を目安にご提案します。`;
} 