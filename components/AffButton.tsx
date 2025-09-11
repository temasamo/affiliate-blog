import Link from "next/link";

export default function AffButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold shadow hover:opacity-90 ring-1 ring-black/10"
      target="_blank"
      rel="nofollow sponsored noopener"
    >
      {children}
    </Link>
  );
}
