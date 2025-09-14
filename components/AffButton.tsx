import Link from "next/link";

export default function AffButton({
  mall = "vc",
  brand,          // こっちが推奨（銘柄名や検索語）
  rawUrl,         // 既存互換（直接URL）
  children,
  className = "",
  ariaLabel,
}: {
  mall?: string;
  brand?: string;
  rawUrl?: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const out = process.env.NEXT_PUBLIC_OUT_ENDPOINT || "/api/out";

  let href: string | null = null;
  if (brand && brand.trim()) {
    href = `${out}?mall=${encodeURIComponent(mall)}&brand=${encodeURIComponent(brand.trim())}`;
  } else if (rawUrl && rawUrl.trim()) {
    href = `${out}?mall=${encodeURIComponent(mall)}&url=${encodeURIComponent(rawUrl)}`;
  }

  if (!href) throw new Error("AffButton: either brand or rawUrl is required");

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold shadow ring-1 ring-black/10 hover:opacity-90 active:opacity-80 ${className}`}
      target="_blank"
      rel="nofollow sponsored noopener"
      aria-label={ariaLabel}
      prefetch={false}
    >
      {children}
    </Link>
  );
}
