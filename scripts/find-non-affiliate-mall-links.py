#!/usr/bin/env python3
"""Find Yahoo/Rakuten/Amazon links that are NOT affiliate-wrapped."""

from __future__ import annotations

import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCAN_DIRS = ["articles", "content", "components", "pages"]
EXTS = {".mdx", ".md", ".tsx", ".ts", ".jsx", ".js"}

HREF_RE = re.compile(
    r"""(?:href\s*=\s*["']([^"']+)["']|\((https?://[^)\s]+)\))""",
    re.I,
)


def classify(url: str):
    clean = url.rstrip(").,;\"'")
    ul = clean.lower()

    mall = None
    if any(
        x in ul
        for x in (
            "shopping.yahoo.co.jp",
            "store.shopping.yahoo.co.jp",
            "paypaymall.yahoo.co.jp",
        )
    ):
        mall = "yahoo"
    elif any(
        x in ul
        for x in (
            "item.rakuten.co.jp",
            "search.rakuten.co.jp",
            "product.rakuten.co.jp",
            "books.rakuten.co.jp",
            "www.rakuten.co.jp",
            "hb.afl.rakuten.co.jp",
            "r10.to/",
        )
    ):
        if "travel.rakuten" in ul:
            return None
        mall = "rakuten"
    elif any(
        x in ul
        for x in (
            "amazon.co.jp",
            "www.amazon.co.jp",
            "amzn.to/",
            "amzn.asia/",
            "a.co/",
        )
    ):
        mall = "amazon"
    else:
        return None

    is_aff = False
    reasons: list[str] = []
    if "af.moshimo.com" in ul or "moshimo.com/af/" in ul:
        is_aff = True
        reasons.append("moshimo")
    if "ck.jp.ap.valuecommerce.com" in ul or "valuecommerce.com" in ul:
        is_aff = True
        reasons.append("valuecommerce")
    if "sc_e=afvc" in ul or "afvc_shp" in ul:
        is_aff = True
        reasons.append("yahoo-vc-param")
    if "hb.afl.rakuten.co.jp" in ul:
        is_aff = True
        reasons.append("rakuten-afl")
    if mall == "amazon" and re.search(r"[?&]tag=", ul):
        is_aff = True
        reasons.append("amazon-tag")
    if "a_id=" in ul and ("p_id=" in ul or "pl_id=" in ul):
        is_aff = True
        reasons.append("moshimo-params")

    return mall, is_aff, clean, reasons


def main() -> None:
    files: list[Path] = []
    for d in SCAN_DIRS:
        p = ROOT / d
        if not p.exists():
            continue
        for f in p.rglob("*"):
            if f.suffix.lower() in EXTS:
                files.append(f)

    results: dict[str, list[dict]] = defaultdict(list)
    aff_count = defaultdict(int)
    seen: set[tuple[str, str]] = set()

    for f in files:
        try:
            text = f.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue

        for m in HREF_RE.finditer(text):
            url = m.group(1) or m.group(2)
            if not url:
                continue

            if url.startswith("/api/out") or "api/out?" in url:
                if "mall=yahoo" in url:
                    aff_count["yahoo"] += 1
                elif "mall=rakuten" in url:
                    aff_count["rakuten"] += 1
                elif "mall=amazon" in url:
                    aff_count["amazon"] += 1
                continue

            if not url.startswith("http"):
                continue

            # moshimo/valuecommerce wrappers that encode mall destinations
            if "af.moshimo.com" in url.lower() or "valuecommerce.com" in url.lower():
                # count as affiliate for whichever mall is encoded if detectable
                decoded = url.lower()
                if "yahoo" in decoded or "shopping.yahoo" in decoded:
                    aff_count["yahoo"] += 1
                elif "rakuten" in decoded:
                    aff_count["rakuten"] += 1
                elif "amazon" in decoded:
                    aff_count["amazon"] += 1
                else:
                    aff_count["other-aff"] += 1
                continue

            cls = classify(url)
            if not cls:
                continue
            mall, is_aff, clean, _reasons = cls
            key = (str(f.relative_to(ROOT)), clean)
            if key in seen:
                continue
            seen.add(key)

            if is_aff:
                aff_count[mall] += 1
                continue

            line_no = text[: m.start()].count("\n") + 1
            results[mall].append(
                {
                    "file": str(f.relative_to(ROOT)),
                    "line": line_no,
                    "url": clean[:220],
                }
            )

    print("=== AFFILIATE-LIKE COUNTS ===")
    for k in sorted(aff_count):
        print(f"  {k}: {aff_count[k]}")

    print("\n=== NON-AFFILIATE DIRECT LINKS ===")
    total = 0
    for mall in ("yahoo", "rakuten", "amazon"):
        items = results[mall]
        total += len(items)
        print(f"\n## {mall.upper()} ({len(items)})")
        by_file: dict[str, list] = defaultdict(list)
        for it in items:
            by_file[it["file"]].append(it)
        for file, rows in sorted(by_file.items()):
            print(f"\n{file} ({len(rows)})")
            for it in rows:
                print(f"  L{it['line']}: {it['url']}")

    print(f"\nTOTAL non-affiliate: {total}")


if __name__ == "__main__":
    main()
