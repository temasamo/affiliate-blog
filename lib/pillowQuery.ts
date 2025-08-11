// /lib/pillowQuery.ts
export function buildSearchQuery(tags: string[]) {
  const expand: Record<string, string[]> = {
    "横向き": ["横向き", "サイド高", "肩口カーブ"],
    "高め": ["高め", "高さ調整"],
    "低め": ["低め", "やわらかめ"],
    "硬め": ["硬め", "高反発"],
    "柔らかめ": ["柔らかめ", "低反発"],
    "通気性": ["通気性", "メッシュ", "パイプ"],
    "頸椎サポート": ["頸椎", "ネックサポート", "首サポート"],
  };
  const words = new Set<string>();
  tags.forEach(t => (expand[t] || [t]).forEach(w => words.add(w)));
  words.add("枕");
  return Array.from(words).join(" ");
}
  