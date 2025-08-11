// pages/api/log-outbound.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}) as any;

  const ctaId = body.ctaId ?? "primary";
  const url = body.url ?? "";
  const page = body.page ?? "";
  const referrer = body.referrer ?? (req.headers.referer as string | null) ?? null;
  const userAgent = body.userAgent ?? (req.headers["user-agent"] as string | null) ?? null;
  const sessionId = body.sessionId ?? null;

  try {
    await supabaseAdmin.from("log_outbound").insert({
      cta_id: ctaId,
      url,
      page,
      referrer,
      user_agent: userAgent,
      session_id: sessionId,
    });
  } catch (e) {
    console.error("[supabase insert log_outbound]", e);
  }

  return res.status(200).json({ ok: true });
} 