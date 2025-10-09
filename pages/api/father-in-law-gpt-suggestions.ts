import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { freeText, answers } = req.body;

    // ここでGPT APIを呼び出すロジックを実装
    // 例: const gptSuggestions = await callGptApi(freeText, answers);

    // 今回はモックデータを返す
    const mockSuggestions = [
      { name: "上品なギフトセット", keywords: ["上品", "ギフト", "印象"], priceRange: "¥5,000〜¥20,000" },
      { name: "印象の良いプレゼント", keywords: ["印象", "プレゼント", "上質"], priceRange: "¥4,000〜¥18,000" },
      { name: "外さない定番ギフト", keywords: ["定番", "ギフト", "安全"], priceRange: "¥6,000〜¥22,000" },
    ];

    try {
      // 実際のGPT API呼び出しをシミュレート
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒の遅延

      if (freeText.includes("健康") || freeText.includes("リラックス")) {
        res.status(200).json({
          suggestions: [
            { name: "上質なアロマディフューザー", keywords: ["アロマ", "上品", "癒し"], priceRange: "¥5,000〜¥10,000" },
            { name: "高級オーガニックタオルセット", keywords: ["タオル", "オーガニック", "上質"], priceRange: "¥4,000〜¥8,000" },
            { name: "季節のプリザーブドフラワー", keywords: ["プリザーブドフラワー", "季節", "華やか"], priceRange: "¥6,000〜¥12,000" },
          ]
        });
      } else if (freeText.includes("グルメ") || freeText.includes("食べ物")) {
        res.status(200).json({
          suggestions: [
            { name: "黒毛和牛ギフト", keywords: ["黒毛和牛", "高級", "ギフト"], priceRange: "¥8,000〜¥25,000" },
            { name: "高級和菓子セット", keywords: ["和菓子", "高級", "上品"], priceRange: "¥4,000〜¥12,000" },
            { name: "季節の味覚セット", keywords: ["季節", "味覚", "特別"], priceRange: "¥5,000〜¥15,000" },
          ]
        });
      } else if (freeText.includes("お酒") || freeText.includes("ウイスキー") || freeText.includes("日本酒")) {
        res.status(200).json({
          suggestions: [
            { name: "木箱入りウイスキー", keywords: ["ウイスキー", "木箱", "高級"], priceRange: "¥8,000〜¥25,000" },
            { name: "地酒飲み比べセット", keywords: ["地酒", "飲み比べ", "高級"], priceRange: "¥6,000〜¥18,000" },
            { name: "高級ワインギフト", keywords: ["ワイン", "ギフト", "上品"], priceRange: "¥5,000〜¥20,000" },
          ]
        });
      } else if (freeText.includes("ブランド") || freeText.includes("小物")) {
        res.status(200).json({
          suggestions: [
            { name: "ブランドネクタイ", keywords: ["ネクタイ", "ブランド", "上品"], priceRange: "¥5,000〜¥20,000" },
            { name: "高級ハンカチセット", keywords: ["ハンカチ", "高級", "上品"], priceRange: "¥3,000〜¥8,000" },
            { name: "ブランドポーチ", keywords: ["ポーチ", "ブランド", "実用"], priceRange: "¥4,000〜¥12,000" },
          ]
        });
      } else {
        res.status(200).json({ suggestions: mockSuggestions });
      }

    } catch (error) {
      console.error('GPT API Error:', error);
      res.status(500).json({ error: 'GPT API error', suggestions: mockSuggestions });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
