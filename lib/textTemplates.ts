export function finalizeSummary(text: string) {
  // 末尾の句点や「〜ください」を置き換え、AI提案を前面に
  const trimmed = text
    .replace(/(を目安に)?(お)?選んで?ください。?$/, '') // 〜を目安にお選びください を除去
    .replace(/[。．\.]+$/, ''); // 最後の句点を除去
  return `${trimmed}を中心にご提案します。`;
} 