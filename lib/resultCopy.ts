// 診断結果の自然な要約文を生成するテンプレート

export function buildSummary({
  pos, mattress, height, firm, neckPain, hotSweaty,
}: {
  pos: "仰向け"|"横向き"|"うつ伏せ";
  mattress: "柔らかめ"|"ふつう"|"硬め";
  height: "低め"|"ふつう"|"高め";
  firm: "やわらかめ"|"ふつう"|"硬め";
  neckPain?: boolean; 
  hotSweaty?: boolean;
}) {
  const head = `あなたは${pos}寝が多く、マットレスの硬さは「${mattress}」。`;
  const core = `頸椎サポート枕の中から、〈高さ：${height}・かたさ：${firm}〉を目安にご提案します。`;
  const notes = [
    neckPain && "首まわりのサポートを重視",
    hotSweaty && "通気性の良い素材を優先",
  ].filter(Boolean).join("／");
  return head + core + (notes ? `（${notes}）` : "");
} 