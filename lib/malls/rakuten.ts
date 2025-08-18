import fetch from 'node-fetch';
import type { UnifiedProduct } from './types';

const BASE = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601';

type RakutenItem = {
  itemName: string;
  itemPrice: number;
  itemUrl: string;
  affiliateUrl?: string;
  mediumImageUrls?: { imageUrl: string }[];
  smallImageUrls?: { imageUrl: string }[];
  itemCode: string;
};

export async function searchRakuten({
  keyword,
  minPrice,
  maxPrice,
  hits = 24,
}: {
  keyword: string;
  minPrice?: number;
  maxPrice?: number;
  hits?: number;
}): Promise<UnifiedProduct[]> {               // ←←← 戻り値を明示
  const appId = process.env.RAKUTEN_APP_ID;
  if (!appId) throw new Error('RAKUTEN_APP_ID missing');

  const safeHits = Math.min(Math.max(hits, 1), 30);

  const qs = new URLSearchParams({
    applicationId: appId,
    keyword: keyword || '枕',
    hits: String(safeHits),
    sort: '-reviewCount',
  });
  if (typeof minPrice === 'number') qs.set('minPrice', String(minPrice));
  if (typeof maxPrice === 'number') qs.set('maxPrice', String(maxPrice));

  const url = `${BASE}?${qs.toString()}`;
  const r = await fetch(url);
  const text = await r.text();
  if (!r.ok) throw new Error(`Rakuten API ${r.status}: ${text.slice(0, 200)}`);

  const j = JSON.parse(text);
  const items: RakutenItem[] = (j?.Items ?? []).map((x: any) => x.Item);

  return items.map((it) => {
    const images = [
      it.mediumImageUrls?.[0]?.imageUrl,
      it.mediumImageUrls?.[1]?.imageUrl,
      it.smallImageUrls?.[0]?.imageUrl,
    ]
      .filter(Boolean)
      .map((u: string) => u.replace(/^http:/, 'https:'));

    return {
      id: `rakuten:${it.itemCode}`,
      title: it.itemName,
      price: it.itemPrice ?? null,
      currency: 'JPY',
      image: images[0] || null,
      images,
      url: (it.affiliateUrl || it.itemUrl || '').replace(/^http:/, 'https:'),
      store: { key: 'rakuten' as const, name: 'Rakuten' }, // ←←← as const
      score: 0,
      tags: [] as string[],                                  // ←←← never[]対策
    };
  });
}

