export type MallParams = {
  category: string;
  height?: string | null;
  firmness?: string | null;
  material?: string | null;
  min?: number | null;
  max?: number | null;
  hits?: number | null;
  finalTag?: string | null;
  sessionId?: string | null;
};

export function buildMallUrl(p: MallParams) {
  const qs = new URLSearchParams();
  qs.set('category', p.category);
  if (p.height) qs.set('height', p.height);
  if (p.firmness) qs.set('firmness', p.firmness);
  if (p.material) qs.set('material', p.material);
  if (typeof p.min === 'number' && Number.isFinite(p.min)) qs.set('minPrice', String(p.min));
  if (typeof p.max === 'number' && Number.isFinite(p.max)) qs.set('maxPrice', String(p.max));
  if (typeof p.hits === 'number') qs.set('hits', String(p.hits));
  // 最後に必ず finalTag を付ける（未選択は 'none' で統一）
  console.log('[buildMallUrl] finalTag param =', p.finalTag);
  qs.set('finalTag', p.finalTag ?? 'none');
  if (p.sessionId) qs.set('sid', p.sessionId);
  return `/api/mall-products?${qs.toString()}`;
} 