import type { NextApiRequest, NextApiResponse } from "next";

async function logClickSafely(params: {
  mall: string; url: string; ua?: string; ip?: string;
}) {
  try {
    // 既存のログAPIがある場合だけ"呼ぶ"。無ければ静かに無視。
    // 例: await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/log-outbound?mall=${encodeURIComponent(params.mall)}&url=${encodeURIComponent(params.url)}`, { method: "POST" });
  } catch {}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const mall = String(req.query.mall || "vc");
    const raw = String(req.query.url || "");
    if (!raw) return res.status(400).send("missing url");

    const ua = req.headers["user-agent"] as string | undefined;
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim();

    await logClickSafely({ mall, url: raw, ua, ip });

    let redirectTo = raw;

    if (mall === "vc") {
      const sid = process.env.VC_SID;
      const pid = process.env.VC_PID;
      if (!sid || !pid) return res.status(500).send("VC not configured");
      const vcUrl = encodeURIComponent(raw);
      redirectTo = `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${sid}&pid=${pid}&vc_url=${vcUrl}`;
    }
    // 他モール対応が必要なら分岐を追加

    res.setHeader("Cache-Control", "no-store");
    return res.redirect(302, redirectTo);
  } catch (e) {
    console.error(e);
    return res.status(500).send("internal error");
  }
}
