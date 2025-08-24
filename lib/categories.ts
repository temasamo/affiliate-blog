import type { Post } from './content';

export const GLOBAL_HOT_PICKS_SLUG = 'global-hot-picks';

export function isGlobalHotPicks(p: Post) {
  const byCategory = (p.category ?? '').toLowerCase() === GLOBAL_HOT_PICKS_SLUG;
  const byTag = p.tags.map(t=>t.toLowerCase()).includes(GLOBAL_HOT_PICKS_SLUG);
  const byPath = p.filePath.includes('/articles/global-hot-picks/');
  return byCategory || byTag || byPath;
} 