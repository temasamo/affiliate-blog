import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const a = req.body?.answers || {};
  let q = "枕で一番改善したい点は何ですか？";
  if (a.sleepPosition === "side") q = "横向き時、寝返りは多い方ですか？";
  else if (a.heightPref === "high") q = "高めが合うと感じた理由を教えてください。";
  else if (a.neckPain) q = "首・肩のこりは朝に強いですか？日中も続きますか？";
  res.status(200).json({ question: q });
} 