"use client";
import { useCallback, useState } from "react";

type Result = {
  title: string;
  summary: string;
  ctaLabel?: string;
  ctaUrl?: string;
  ctaId?: string;
  sessionId?: string;
};

export default function ResultCard({ result, sessionId }: { result: Result; sessionId?: string }) {
  const [sending, setSending] = useState(false);
  const fallbackUrl = process.env.NEXT_PUBLIC_CTA_URL;
  const ctaTarget = result.ctaUrl || fallbackUrl;

  const onClickCta = useCallback(async () => {
    if (!ctaTarget) return;
    setSending(true);
    try {
      await fetch("/api/log-outbound", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ctaId: result.ctaId || "diagnosis-primary",
          url: ctaTarget,
          page: "top",
          sessionId,
          referrer: typeof window !== "undefined" ? window.location.href : undefined,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        }),
        keepalive: true,
      });
    } catch {
      /* ログ失敗は遷移をブロックしない */
    } finally {
      setSending(false);
      window.open(ctaTarget, "_blank", "noopener,noreferrer");
    }
  }, [ctaTarget, result.ctaId, sessionId]);

  return (
    <div className="grid gap-3 p-4 rounded-2xl border shadow bg-white">
      <h3 className="text-lg font-bold">{result.title}</h3>
      <p className="text-sm leading-relaxed">{result.summary}</p>

      {/* CTAボタン（URLがあれば必ず表示） */}
      <button
        onClick={onClickCta}
        disabled={sending || !ctaTarget}
        className="px-4 py-2 rounded-2xl shadow font-semibold border"
      >
        {sending ? "記録中..." : result.ctaLabel || "おすすめを見る"}
      </button>
    </div>
  );
} 