export type UnifiedProduct = {
  id: string;
  title: string;
  price: number | null;
  currency: string;            // "JPY"
  image: string | null;
  images?: string[];           // 複数画像
  url: string;                 // 最終遷移URL（必ずアフィリエイト付き）
  store: { key: string; name: string };
  score: number;               // 診断一致度で後で並べ替え
  tags: string[];              // 形状/素材/高さなど
}; 