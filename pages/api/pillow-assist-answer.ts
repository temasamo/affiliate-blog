import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  // 互換: 以前の lastAnswer でも受け取れるようにしておく
  const body = (req.body ?? {}) as { finalTag?: string; lastAnswer?: string };
  const finalTag = body.finalTag ?? body.lastAnswer ?? '';

  const map: Record<string, string> = {
    pain_wakeup:
      '起床時の痛み軽減を優先。首元が安定する形状を中心にご提案します。',
    wake_midnight:
      '寝返りしやすい反発と形状で夜間の中断を減らします。',
    heat:
      '通気性の高い素材や放熱性の高いカバーを優先しましょう。',
  };

  const addendum = map[finalTag] ?? '';
  res.status(200).json({ addendum });
}
