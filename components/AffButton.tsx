import Link from "next/link";

export default function AffButton({
  rawUrl,
  children,
  className = "",
  ariaLabel,
}: {
  rawUrl: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  if (!rawUrl) throw new Error("AffButton: rawUrl is required");
  const out = process.env.NEXT_PUBLIC_OUT_ENDPOINT || "/api/out";
  const href = `${out}?mall=vc&url=${encodeURIComponent(rawUrl)}`;

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold shadow ring-1 ring-black/10 hover:opacity-90 active:opacity-80 ${className}`}
      target="_blank"
      rel="nofollow sponsored noopener"
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
