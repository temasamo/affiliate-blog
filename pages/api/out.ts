// pages/api/out.ts
import type { NextApiRequest, NextApiResponse } from "next";

// ---- helpers ---------------------------------------------------------------
type Mall = "rakuten" | "yahoo" | "amazon" | "vc";
const enc = (s: string) => encodeURIComponent(s.trim());

const ALLOWED_HOSTS = new Set([
  // 公式アフィ経由
  "hb.afl.rakuten.co.jp",
  "ck.jp.ap.valuecommerce.com",
  "www.amazon.co.jp",
  "amzn.to",
  // 最終遷移の検索先（検証に使うだけ・直接遷移しない）
  "search.rakuten.co.jp",
  "shopping.yahoo.co.jp",
  // 既存の他ASP（既存リンク温存のため）
  "af.moshimo.com",
  "ad.jp.ap.valuecommerce.com",
]);

// ---- brand から公式アフィURLを生成 ------------------------------------------
function rakutenByBrand(brand: string) {
  const id = process.env.RAKUTEN_AFFILIATE_ID;
  if (!id) throw new Error("RAKUTEN_AFFILIATE_ID is not set");
  const search = `https://search.rakuten.co.jp/search/mall/${enc(brand)}/`;
  return `https://hb.afl.rakuten.co.jp/hgc/${id}/?pc=${enc(search)}`;
}

function yahooByBrand(brand: string) {
  const sid = process.env.YAHOO_VC_SID;
  const pid = process.env.YAHOO_VC_PID;
  if (!sid || !pid) throw new Error("YAHOO_VC_SID / YAHOO_VC_PID is not set");
  const search = `https://shopping.yahoo.co.jp/search?p=${enc(brand)}`;
  return `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${sid}&pid=${pid}&vc_url=${enc(search)}`;
}

function amazonByBrand(brand: string) {
  const tag = process.env.NEXT_PUBLIC_AMAZON_TAG || process.env.AMAZON_TAG;
  if (!tag) throw new Error("AMAZON tag is not set (NEXT_PUBLIC_AMAZON_TAG)");
  return `https://www.amazon.co.jp/s?k=${enc(brand)}&tag=${enc(tag)}`;
}

// ---- url を受け取ったときのラップ（後方互換）--------------------------------
function rakutenByRawUrl(rawUrl: string) {
  // 楽天公式ラッパーで包む
  const id = process.env.RAKUTEN_AFFILIATE_ID;
  if (!id) throw new Error("RAKUTEN_AFFILIATE_ID is not set");
  return `https://hb.afl.rakuten.co.jp/hgc/${id}/?pc=${enc(rawUrl)}`;
}

function yahooByRawUrl(rawUrl: string) {
  const sid = process.env.YAHOO_VC_SID;
  const pid = process.env.YAHOO_VC_PID;
  if (!sid || !pid) throw new Error("YAHOO_VC_SID / YAHOO_VC_PID is not set");
  return `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${sid}&pid=${pid}&vc_url=${enc(rawUrl)}`;
}

function amazonByRawUrl(rawUrl: string) {
  // 最終URLが amazon.co.jp のとき、tag が無ければ付ける
  const tag = process.env.NEXT_PUBLIC_AMAZON_TAG || process.env.AMAZON_TAG;
  if (!tag) throw new Error("AMAZON tag is not set (NEXT_PUBLIC_AMAZON_TAG)");
  try {
    const u = new URL(rawUrl);
    if (u.host === "www.amazon.co.jp") {
      if (!u.searchParams.get("tag")) u.searchParams.set("tag", tag);
      return u.toString();
    }
  } catch { /* rawUrl が完全URLでないケースはそのまま返す */ }
  // それ以外は検索にフォールバック
  return `https://www.amazon.co.jp/s?k=${enc(rawUrl)}&tag=${enc(tag)}`;
}

// ---- 任意：VC汎用（既存案件の互換用／必要に応じて使用） ----------------------
function vcGeneric(rawUrl: string) {
  const sid = process.env.VC_SID;
  const pid = process.env.VC_PID;
  if (!sid || !pid) throw new Error("VC_SID / VC_PID is not set");
  return `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${sid}&pid=${pid}&vc_url=${enc(rawUrl)}`;
}

// ---- main ------------------------------------------------------------------
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const mall = String(req.query.mall || "").toLowerCase() as Mall;
    const brand = (req.query.brand as string | undefined)?.trim();
    const raw   = (req.query.url as string | undefined)?.trim();

    if (!mall)         { res.status(400).send("missing mall"); return; }
    if (!brand && !raw){ res.status(400).send("missing brand or url"); return; }

    let dest = "";

    if (brand) {
      if (mall === "rakuten") dest = rakutenByBrand(brand);
      else if (mall === "yahoo") dest = yahooByBrand(brand);
      else if (mall === "amazon") dest = amazonByBrand(brand);
      else if (mall === "vc") dest = vcGeneric(`https://example.com/?q=${enc(brand)}`); // 互換: 未使用想定
      else { res.status(400).send("unsupported mall"); return; }
    } else if (raw) {
      if (mall === "rakuten") dest = rakutenByRawUrl(raw);
      else if (mall === "yahoo") dest = yahooByRawUrl(raw);
      else if (mall === "amazon") dest = amazonByRawUrl(raw);
      else if (mall === "vc") dest = vcGeneric(raw);
      else { res.status(400).send("unsupported mall"); return; }
    }

    // セーフティ（意図しない外部ホストへのオープンリダイレクト防止）
    try {
      const host = new URL(dest).host;
      if (!ALLOWED_HOSTS.has(host)) { res.status(400).send("blocked destination"); return; }
    } catch { res.status(400).send("bad destination"); return; }

    // キャッシュさせない
    res.setHeader("Cache-Control", "no-store");
    res.writeHead(302, { Location: dest });
    res.end();
  } catch (e: any) {
    console.error("[/api/out] error:", e);
    res.status(500).send(e?.message || "internal error");
  }
}

