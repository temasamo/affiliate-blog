// lib/malls/types.ts
export type StoreKey = 'rakuten' | 'amazon' | 'yahoo';

export type UnifiedProduct = {
  id: string;
  title: string;
  price: number | null;
  currency: string;        // "JPY" など
  image: string | null;
  images?: string[];       // 複数画像があれば
  url: string;             // 最終遷移URL（アフィリエイト付き想定）
  store: { key: StoreKey; name: string }; // name は自由な表示ラベルでOK
  score: number;
  tags: string[];
};
