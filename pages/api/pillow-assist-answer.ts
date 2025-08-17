import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { finalTag } = (req.body ?? {}) as { finalTag?: string };
  const map: Record<string, string> = {
    heat: '通気性の高い素材やメッシュ構造を優先しましょう。',
    shoulder: '肩・首の隙間を埋める高反発×やや高めが合いやすいです。',
    snore: '横向き対応や頭部を安定させる窪み形状を検討。',
    none: '',
    skip: '',
  };
  res.status(200).json({ addendum: map[finalTag ?? 'none'] ?? '' });
}
