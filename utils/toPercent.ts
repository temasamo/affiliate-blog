export function toPercent(input: unknown, fallback = 76): number {
  if (input === null || input === undefined) return fallback;

  // 文字列なら % を除去して数値化
  const raw = typeof input === 'string' ? input.replace('%', '').trim() : input;
  let n = Number(raw);

  if (!Number.isFinite(n)) return fallback;

  // 0–1 → 0–100、1–100 → そのまま
  if (n >= 0 && n <= 1) n = n * 100;
  // 負値や100超は丸めてクリップ
  n = Math.round(n);
  if (n < 0) n = 0;
  if (n > 100) n = 100;

  return n;
} 