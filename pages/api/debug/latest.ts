// pages/api/debug/latest.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getLatestPosts } from "@/lib/posts"; // 既に作成済みの関数を利用

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const latest = await getLatestPosts(5);
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ latest });
} 