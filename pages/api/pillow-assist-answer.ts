import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: 必要に応じてDBやセッションに保存
  console.log("[last-answer]", req.body?.lastAnswer);
  res.status(200).json({ ok: true });
} 