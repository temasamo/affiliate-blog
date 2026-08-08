#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path
from urllib.parse import quote

ROOT = Path("content/travel")
AMAZON_TAG = "temasamo1220d-22"
YAHOO_SC = "sc_e=afvc_shp_3751180"
MOSHIMO_PREFIX = (
    "https://af.moshimo.com/af/c/click?"
    "a_id=5122395&p_id=54&pc_id=54&pl_id=616&url="
)

HREF_RE = re.compile(r'href=(["\'])(https?://[^"\']+)\1')


def fix_rakuten(url: str) -> str | None:
    if "rakuten.co.jp" not in url:
        return None
    if "travel.rakuten" in url:
        return None
    if "af.moshimo.com" in url or "hb.afl.rakuten.co.jp" in url:
        return None

    u = re.sub(r"[?&]scid=[^&]*", "", url)
    u = re.sub(r"[?&]sc2id=[^&]*", "", u)
    u = u.replace("?&", "?").rstrip("?&")
    if u.startswith("//"):
        u = "https:" + u

    encoded = quote(u, safe="")
    m_param = ""
    m = re.search(r"/search/mall/([^/?#]+)/?", u)
    if m:
        kw = m.group(1)
        mobile = f"http://m.rakuten.co.jp/search/mall/{kw}/"
        m_param = f"&m={quote(mobile, safe='')}"
    return f"{MOSHIMO_PREFIX}{encoded}{m_param}"


def fix_yahoo(url: str) -> str | None:
    if "shopping.yahoo.co.jp" not in url and "store.shopping.yahoo.co.jp" not in url:
        return None
    if "sc_e=afvc" in url or "afvc_shp" in url or "valuecommerce.com" in url:
        return None
    if "sc_e=" in url:
        return None
    sep = "&" if "?" in url else "?"
    return url + sep + YAHOO_SC


def fix_amazon(url: str) -> str | None:
    if "amazon.co.jp" not in url:
        return None
    if re.search(r"[?&]tag=", url):
        return None
    sep = "&" if "?" in url else "?"
    return url + sep + f"tag={AMAZON_TAG}"


def main() -> None:
    files = list(ROOT.rglob("*.mdx")) + list(ROOT.rglob("*.md"))
    changed_files: list[tuple[str, dict[str, int]]] = []
    totals = {"rakuten": 0, "yahoo": 0, "amazon": 0}

    for f in files:
        text = f.read_text(encoding="utf-8")
        original = text
        file_stats = {"rakuten": 0, "yahoo": 0, "amazon": 0}

        def repl(m: re.Match[str]) -> str:
            q, url = m.group(1), m.group(2)
            new = None
            kind = None
            if (
                "rakuten.co.jp" in url
                and "travel.rakuten" not in url
                and "af.moshimo.com" not in url
            ):
                new = fix_rakuten(url)
                kind = "rakuten"
            elif "shopping.yahoo.co.jp" in url:
                new = fix_yahoo(url)
                kind = "yahoo"
            elif "amazon.co.jp" in url:
                new = fix_amazon(url)
                kind = "amazon"
            if new and new != url and kind:
                file_stats[kind] += 1
                return f"href={q}{new}{q}"
            return m.group(0)

        text2 = HREF_RE.sub(repl, text)
        if text2 != original:
            f.write_text(text2, encoding="utf-8")
            changed_files.append((str(f), dict(file_stats)))
            for k, v in file_stats.items():
                totals[k] += v

    print("Changed files:")
    for path, st in changed_files:
        print(f"  {path}: {st}")
    print("Totals:", totals)
    print("files changed:", len(changed_files))


if __name__ == "__main__":
    main()
