import type { NextApiRequest, NextApiResponse } from "next";

async function logClickSafely(_params: {
  mall: string; url: string; ua?: string; ip?: string;
}) {
  // 既存のログAPIを呼びたい場合だけここで fetch する。無ければ何もしない。
  try {
    // await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/log-outbound`, { method: "POST", body: JSON.stringify(_params) });
  } catch {}
}

// pages/api は (void | Promise<void>) を返すのが正解
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const mall = String(req.query.mall || "vc");
    const raw  = String(req.query.url  || "");

    if (!raw) {
      res.status(400).send("missing url");
      return; // ← NextApiResponse を return しない
    }

    const ua = req.headers["user-agent"] as string | undefined;
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim();
    await logClickSafely({ mall, url: raw, ua, ip });

    let redirectTo = raw;

    if (mall === "vc") {
      const sid = process.env.VC_SID;
      const pid = process.env.VC_PID;
      if (!sid || !pid) {
        res.status(500).send("VC not configured");
        return;
      }
      const vcUrl = encodeURIComponent(raw);
      redirectTo = `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${sid}&pid=${pid}&vc_url=${vcUrl}`;
    }

    res.setHeader("Cache-Control", "no-store");
    // res.redirect(...) を return しない。writeHead + end で完了させる。
    res.writeHead(302, { Location: redirectTo });
    res.end();
    return;
  } catch (e) {
    console.error(e);
    res.status(500).send("internal error");
    return;
  }
}
