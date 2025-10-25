import { supabase } from "@/lib/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    // ai_embeddings テーブルに対して単純なSELECT（件数取得）
    const { count, error } = await supabase
      .from("ai_embeddings")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("❌ Supabase接続エラー:", error.message);
      return res.status(500).json({ ok: false, error: error.message });
    }

    return res.status(200).json({ ok: true, count });
  } catch (err: any) {
    console.error("❌ 例外:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
