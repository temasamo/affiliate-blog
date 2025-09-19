// pages/api/out.ts
import type { NextApiRequest, NextApiResponse } from "next";

type RakutenProvider = "moshimo" | "official";
const RAKUTEN_PROVIDER = (process.env.RAKUTEN_PROVIDER as RakutenProvider) || "moshimo";

type Mall =
  | "rakuten"
  | "rakuten_moshimo"
  | "rakuten_official"
  | "yahoo"
  | "amazon"
  | "vc"
  | "asoview";

const enc = (s: string) => encodeURIComponent(s.trim());

const ALLOWED_HOSTS = new Set([
  "hb.afl.rakuten.co.jp",
  "search.rakuten.co.jp",
  "af.moshimo.com",
  "ck.jp.ap.valuecommerce.com",
  "shopping.yahoo.co.jp",
  "www.amazon.co.jp",
  "amzn.to",
  "www.asoview.com",
  "asoview.com",
  "ad.jp.ap.valuecommerce.com",
]);

function rakutenOfficialByBrand(brand: string) {
  const id = process.env.RAKUTEN_AFFILIATE_ID;
  if (!id) throw new Error("RAKUTEN_AFFILIATE_ID is not set");
  const search = `https://search.rakuten.co.jp/search/mall/${enc(brand)}/`;
  return `https://hb.afl.rakuten.co.jp/hgc/${id}/?pc=${enc(search)}`;
}
function rakutenOfficialByRawUrl(rawUrl: string) {
  const id = process.env.RAKUTEN_AFFILIATE_ID;
  if (!id) throw new Error("RAKUTEN_AFFILIATE_ID is not set");
  return `https://hb.afl.rakuten.co.jp/hgc/${id}/?pc=${enc(rawUrl)}`;
}

function rakutenMoshimoByBrand(brand: string) {
  const a = process.env.MOSHIMO_A_ID;
  const p = process.env.MOSHIMO_P_ID;
  const pc = process.env.MOSHIMO_PC_ID;
  const pl = process.env.MOSHIMO_PL_ID;
  if (!(a && p && pc && pl)) throw new Error("もしも環境変数(MOSHIMO_*)が未設定");
  const search = `https://search.rakuten.co.jp/search/mall/${enc(brand)}/`;
  return `https://af.moshimo.com/af/c/click?a_id=${a}&p_id=${p}&pc_id=${pc}&pl_id=${pl}&url=${enc(search)}`;
}
function rakutenMoshimoByRawUrl(rawUrl: string) {
  const a = process.env.MOSHIMO_A_ID;
  const p = process.env.MOSHIMO_P_ID;
  const pc = process.env.MOSHIMO_PC_ID;
  const pl = process.env.MOSHIMO_PL_ID;
  if (!(a && p && pc && pl)) throw new Error("もしも環境変数(MOSHIMO_*)が未設定");
  return `https://af.moshimo.com/af/c/click?a_id=${a}&p_id=${p}&pc_id=${pc}&pl_id=${pl}&url=${enc(rawUrl)}`;
}

function yahooByBrand(brand: string) {
  const sid = process.env.YAHOO_VC_SID;
  const pid = process.env.YAHOO_VC_PID;
  if (!sid || !pid) throw new Error("YAHOO_VC_SID / YAHOO_VC_PID is not set");
  const search = `https://shopping.yahoo.co.jp/search?p=${enc(brand)}`;
  return `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${sid}&pid=${pid}&vc_url=${enc(search)}`;
}
function yahooByRawUrl(rawUrl: string) {
  const sid = process.env.YAHOO_VC_SID;
  const pid = process.env.YAHOO_VC_PID;
  if (!sid || !pid) throw new Error("YAHOO_VC_SID / YAHOO_VC_PID is not set");
  return `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${sid}&pid=${pid}&vc_url=${enc(rawUrl)}`;
}

function amazonByBrand(brand: string) {
  const tag = process.env.NEXT_PUBLIC_AMAZON_TAG || process.env.AMAZON_TAG;
  if (!tag) throw new Error("AMAZON tag is not set (NEXT_PUBLIC_AMAZON_TAG | AMAZON_TAG)");
  return `https://www.amazon.co.jp/s?k=${enc(brand)}&tag=${enc(tag)}`;
}
function amazonByRawUrl(rawUrl: string) {
  const tag = process.env.NEXT_PUBLIC_AMAZON_TAG || process.env.AMAZON_TAG;
  if (!tag) throw new Error("AMAZON tag is not set (NEXT_PUBLIC_AMAZON_TAG | AMAZON_TAG)");
  try {
    const u = new URL(rawUrl);
    if (u.host === "www.amazon.co.jp") {
      if (!u.searchParams.get("tag")) u.searchParams.set("tag", tag);
      return u.toString();
    }
  } catch {}
  return `https://www.amazon.co.jp/s?k=${enc(rawUrl)}&tag=${enc(tag)}`;
}

function vcGeneric(rawUrl: string) {
  const sid = process.env.VC_SID;
  const pid = process.env.VC_PID;
  if (!sid || !pid) throw new Error("VC_SID / VC_PID is not set");
  return `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${sid}&pid=${pid}&vc_url=${enc(rawUrl)}`;
}

function asoviewByBrand(brand: string) {
  const search = `https://www.asoview.com/search/?q=${enc(brand)}`;
  return asoviewByRawUrl(search);
}
function asoviewByRawUrl(rawUrl: string) {
  const sid = process.env.VC_SID;
  const pid = process.env.VC_PID_ASOVIEW;
  if (!sid || !pid) throw new Error("VC_SID / VC_PID_ASOVIEW is not set");
  return `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${sid}&pid=${pid}&vc_url=${enc(rawUrl.trim())}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const mall = String(req.query.mall || "").toLowerCase() as Mall;
    const brand = (req.query.brand as string | undefined)?.trim();
    const raw   = (req.query.url   as string | undefined)?.trim();

    if (!mall) { res.status(400).send("missing mall"); return; }
    if (!brand && !raw) { res.status(400).send("missing brand or url"); return; }

    const useRakutenMoshimo =
      mall === "rakuten_moshimo" ||
      (mall === "rakuten" && RAKUTEN_PROVIDER === "moshimo");
    const useRakutenOfficial =
      mall === "rakuten_official" ||
      (mall === "rakuten" && RAKUTEN_PROVIDER === "official");

    let dest = "";

    if (brand) {
      if (useRakutenMoshimo)        dest = rakutenMoshimoByBrand(brand);
      else if (useRakutenOfficial)  dest = rakutenOfficialByBrand(brand);
      else if (mall === "yahoo")    dest = yahooByBrand(brand);
      else if (mall === "amazon")   dest = amazonByBrand(brand);
      else if (mall === "asoview")  dest = asoviewByBrand(brand);
      else if (mall === "vc")       dest = vcGeneric(`https://example.com/?q=${enc(brand)}`);
      else { res.status(400).send("unsupported mall"); return; }
    } else {
      if (useRakutenMoshimo)        dest = rakutenMoshimoByRawUrl(raw!);
      else if (useRakutenOfficial)  dest = rakutenOfficialByRawUrl(raw!);
      else if (mall === "yahoo")    dest = yahooByRawUrl(raw!);
      else if (mall === "amazon")   dest = amazonByRawUrl(raw!);
      else if (mall === "asoview")  dest = asoviewByRawUrl(raw!);
      else if (mall === "vc")       dest = vcGeneric(raw!);
      else { res.status(400).send("unsupported mall"); return; }
    }

    dest = dest.replace(/[\r\n]/g, "");
    try {
      const host = new URL(dest).host;
      if (!ALLOWED_HOSTS.has(host)) { res.status(400).send("blocked destination"); return; }
    } catch { res.status(400).send("bad destination"); return; }

    res.setHeader("Cache-Control", "no-store");
    res.writeHead(302, { Location: dest });
    res.end();
  } catch (e: any) {
    console.error("[/api/out] error:", e);
    res.status(500).send(e?.message || "internal error");
  }
}
