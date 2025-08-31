import { getTravelSlugs } from "./mdx";

/** content/travel 配下の slug を収集（index を親に正規化） */
export async function getAllTravelSlugs(): Promise<string[]> {
  try {
    // 既存のgetTravelSlugsを使用してcontent/travel配下のファイルを取得
    const files = getTravelSlugs();
    
    return files
      .map(s => s.replace(/\/index$/, "")); // index.mdxを親パスに正規化
  } catch (error) {
    console.error("Error getting travel slugs:", error);
    return [];
  }
} 