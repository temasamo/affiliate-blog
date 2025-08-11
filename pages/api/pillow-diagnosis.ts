import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "../../lib/supabaseAdmin"; // ここ、エイリアス無ければ相対パスに

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API /pillow-diagnosis called", req.method);           // ←①呼び出しログ
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
  console.log("[API recv]", body);                                    // ←②受信データ

  // 最小INSERT（今のテーブル構成に合わせる：session_id, answers）
  const { data, error } = await supabaseAdmin
    .from("pillow_diagnosis_logs")
    .insert([{ session_id: body.sessionId ?? "debug-session", answers: body }])
    .select();

  console.log("[Insert result]", { data, error });                    // ←③結果ログ
  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({
    id: data?.[0]?.id,
    title: "あなたに合う枕タイプ（仮診断）",
    summary: "テスト応答。DB保存も実施。",
    ctaLabel: "おすすめ商品をチェック",
    ctaUrl: process.env.NEXT_PUBLIC_CTA_URL || "https://example.com",
    ctaId: "diagnosis-primary",
  });
} 