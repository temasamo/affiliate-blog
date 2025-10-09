import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { freeText, answers } = req.body;

    // ここでGPT APIを呼び出すロジックを実装
    // 例: const gptSuggestions = await callGptApi(freeText, answers);

    // 今回はモックデータを返す
    const mockSuggestions = [
      { name: "実用的なマッサージグッズ", keywords: ["マッサージ", "実用", "健康"], priceRange: "¥5,000〜¥15,000" },
      { name: "お父さんの趣味応援グッズ", keywords: ["趣味", "応援", "実用"], priceRange: "¥4,000〜¥12,000" },
      { name: "健康サポートアイテム", keywords: ["健康", "サポート", "実用"], priceRange: "¥3,000〜¥10,000" },
    ];

    try {
      // 実際のGPT API呼び出しをシミュレート
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒の遅延

      if (freeText.includes("健康") || freeText.includes("疲れ")) {
        res.status(200).json({
          suggestions: [
            { name: "疲労回復サプリセット", keywords: ["疲労回復", "サプリ", "健康"], priceRange: "¥4,000〜¥10,000" },
            { name: "マッサージチェア", keywords: ["マッサージチェア", "疲労回復", "健康"], priceRange: "¥50,000〜¥150,000" },
            { name: "温活グッズ", keywords: ["温活", "健康", "血行促進"], priceRange: "¥3,000〜¥8,000" },
          ]
        });
      } else if (freeText.includes("趣味") || freeText.includes("釣り") || freeText.includes("ゴルフ")) {
        res.status(200).json({
          suggestions: [
            { name: "高級釣り竿セット", keywords: ["釣り竿", "釣り", "趣味"], priceRange: "¥15,000〜¥50,000" },
            { name: "ゴルフ用品セット", keywords: ["ゴルフ", "趣味", "スポーツ"], priceRange: "¥10,000〜¥30,000" },
            { name: "趣味応援グッズ", keywords: ["趣味", "応援", "実用"], priceRange: "¥5,000〜¥20,000" },
          ]
        });
      } else if (freeText.includes("お酒") || freeText.includes("ウイスキー") || freeText.includes("日本酒")) {
        res.status(200).json({
          suggestions: [
            { name: "高級ウイスキーセット", keywords: ["ウイスキー", "高級", "お酒"], priceRange: "¥8,000〜¥25,000" },
            { name: "地酒飲み比べセット", keywords: ["地酒", "飲み比べ", "お酒"], priceRange: "¥6,000〜¥18,000" },
            { name: "お酒ギフトセット", keywords: ["お酒", "ギフト", "高級"], priceRange: "¥5,000〜¥20,000" },
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
