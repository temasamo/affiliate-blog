import type { NextApiRequest, NextApiResponse } from "next";

type Mall = "rakuten" | "yahoo" | "amazon" | "vc";
const enc = (s: string) => encodeURIComponent(s.trim());

const ALLOWED_HOSTS = new Set([
  "af.moshimo.com",
  "hb.afl.rakuten.co.jp",
  "search.rakuten.co.jp",
  "ck.jp.ap.valuecommerce.com",
  "shopping.yahoo.co.jp",
  "www.amazon.co.jp",
  "amzn.to",
]);

function buildRakutenByBrand(brand: string) {
  const affId = process.env.RAKUTEN_AFFILIATE_ID;
  if (!affId) {
    console.error("RAKUTEN_AFFILIATE_ID is not set");
    throw new Error("RAKUTEN_AFFILIATE_ID is not set");
  }
  const search = `https://search.rakuten.co.jp/search/mall/${enc(brand)}/`;
  return `https://hb.afl.rakuten.co.jp/hgc/${affId}/?pc=${enc(search)}`;
}

function buildYahooByBrand(brand: string) {
  const sid = process.env.YAHOO_VC_SID;
  const pid = process.env.YAHOO_VC_PID;
  if (!sid || !pid) {
    console.error("YAHOO_VC environment variables missing:", { sid: !!sid, pid: !!pid });
    throw new Error("YAHOO_VC_SID / YAHOO_VC_PID is not set");
  }
  const search = `https://shopping.yahoo.co.jp/search?p=${enc(brand)}`;
  return `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${sid}&pid=${pid}&vc_url=${enc(search)}`;
}

function buildAmazonByBrand(brand: string) {
  const tag = process.env.AMAZON_TAG;
  if (!tag) {
    console.error("AMAZON_TAG is not set");
    throw new Error("AMAZON_TAG is not set");
  }
  return `https://www.amazon.co.jp/s?k=${enc(brand)}&tag=${enc(tag)}`;
}

function buildVcGeneric(rawUrl: string) {
  const sid = process.env.VC_SID;
  const pid = process.env.VC_PID;
  if (!(sid && pid)) {
    console.error("VC environment variables missing:", { sid: !!sid, pid: !!pid });
    throw new Error("VC_SID / VC_PID environment variables are not configured");
  }
  const vc = new URL("https://ck.jp.ap.valuecommerce.com/servlet/referral");
  vc.searchParams.set("sid", sid);
  vc.searchParams.set("pid", pid);
  vc.searchParams.set("vc_url", rawUrl);
  return vc.toString();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const mall = String(req.query.mall || "").toLowerCase() as Mall;
    const brand = (req.query.brand as string | undefined)?.trim();
    const raw   = (req.query.url as string | undefined)?.trim();

    if (!mall) { res.status(400).send("missing mall"); return; }
    if (!brand && !raw) { res.status(400).send("missing brand or url"); return; }

    let redirectTo: string;

    if (brand) {
      if (mall === "rakuten") redirectTo = buildRakutenByBrand(brand);
      else if (mall === "yahoo") redirectTo = buildYahooByBrand(brand);
      else if (mall === "amazon") redirectTo = buildAmazonByBrand(brand);
      else if (mall === "vc") redirectTo = buildVcGeneric(`https://search.rakuten.co.jp/search/mall/${enc(brand)}/`);
      else { res.status(400).send("unsupported mall"); return; }
    } else {
      let to = raw!;
      if (mall === "amazon") {
        const entrance = process.env.NEXT_PUBLIC_AMAZON_ENTRANCE_URL;
        if (entrance) to = entrance;
      } else if (mall === "rakuten") {
        const base = process.env.NEXT_PUBLIC_RAKUTEN_ENTRANCE_URL;
        if (base) to = `${base}&url=${encodeURIComponent(raw!)}`;
      } else if (mall === "yahoo") {
        const base = process.env.NEXT_PUBLIC_YAHOO_ENTRANCE_URL;
        if (base) to = `${base}?url=${encodeURIComponent(raw!)}`;
      } else if (mall === "vc") {
        to = buildVcGeneric(raw!);
      }
      redirectTo = to;
    }

    try {
      const host = new URL(redirectTo).host;
      if (!ALLOWED_HOSTS.has(host)) { res.status(400).send("blocked destination"); return; }
    } catch { res.status(400).send("bad destination"); return; }

    res.setHeader("Cache-Control", "no-store");
    res.writeHead(302, { Location: redirectTo });
    res.end();
  } catch (e: any) {
    console.error(e);
    res.status(500).send(e?.message || "internal error");
  }
}
