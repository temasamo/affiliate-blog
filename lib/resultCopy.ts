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
  // マットレス表現：「〜寄り」→「〜のものを使用」に統一
  const mattressPhraseMap: Record<string, string> = {
    "柔らかめ": "柔らかめのものを使用",
    "ふつう": "ふつうのものを使用",
    "普通": "ふつうのものを使用",     // 念のため
    "硬め": "硬めのものを使用",
    "固め": "硬めのものを使用",       // 念のため同義も拾う
  };
  const mattressPhrase = mattressPhraseMap[mattress] ?? `「${mattress}」のものを使用`;

  const head = `あなたは${pos}寝が多く、マットレスは${mattressPhrase}。`;
  const core = `頸椎サポート枕の中から、〈高さ：${height}・かたさ：${firm}〉を目安にご提案します。`;
  const notes = [
    neckPain && "首まわりのサポートを重視",
    hotSweaty && "通気性の良い素材を優先",
  ].filter(Boolean).join("／");
  return head + core + (notes ? `（${notes}）` : "");
} 