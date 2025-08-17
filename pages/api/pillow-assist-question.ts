import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  res.status(200).json({
    question: '最後の一問：今いちばん気になるのは？',
    options: [
      { tag: 'heat', label: 'ムレ/暑さ' },
      { tag: 'shoulder', label: '肩・首のこり' },
      { tag: 'snore', label: 'いびき' },
      { tag: 'none', label: '特になし' },
    ],
  });
}
