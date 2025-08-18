'use client';

import useSWR from 'swr';

export function usePillowSummary(payload?: any) {
  const key = payload ? ['pillow-summary', payload] : null; // readyまで叩かない
  const fetcher = async ([, body]: [string, any]) => {
    const res = await fetch('/api/pillow-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`summary ${res.status}`);
    return res.json();
  };
  const { data, error, isLoading } = useSWR(key, fetcher, { revalidateOnFocus: false });
  return { summary: data?.summary as string | undefined, error, isLoading };
}

// --- APIが落ちても必ず1行作る保険 ---
export function localSummaryFallback(p: {
  sleepPos?: 'supine' | 'side' | 'prone' | 'mix';
  mattressFirm?: 'soft' | 'medium' | 'hard';
  category: string; height: string; firmness: string;
  lastOne?: { trouble?: string | null; purpose?: string | null };
}) {
  const cat: Record<string, string> = {
    'cervical-support': '頸椎サポート枕', 'side-boost': '横向き強化タイプ',
    'cooling': '通気・放熱重視タイプ', 'adjustable': '調整式タイプ', 'hugging': '包み込みタイプ'
  };
  const segs: string[] = [];
  if (p.sleepPos === 'supine') segs.push('仰向け寝が多く');
  if (p.sleepPos === 'side') segs.push('横向き寝が多く');
  if (p.sleepPos === 'prone') segs.push('うつ伏せ寝が多く');
  if (p.sleepPos === 'mix') segs.push('寝姿勢は日によって変わりがちで');
  if (p.mattressFirm === 'soft') segs.push('マットレスはやや柔らかめ');
  if (p.mattressFirm === 'medium') segs.push('マットレスはふつう寄り');
  if (p.mattressFirm === 'hard') segs.push('マットレスはやや硬め');
  const head = segs.length ? `${segs.join('、')}。` : '';
  const mid = `${(cat[p.category] ?? p.category)}の中でも「高さは${p.height}、かたさは${p.firmness}」`;
  const t = p?.lastOne?.trouble ? `現在のお悩み「${p.lastOne.trouble}」に配慮し、${mid}` : mid;
  return `${head}${t}を中心にご提案します。`;
} 