import type { NextApiRequest, NextApiResponse } from 'next';
import { diagnose, type Answers } from '@/lib/resultLogic';
import { buildSummary, getCategoryLabel } from '@/lib/summary';
import { finalizeSummary } from '@/lib/textTemplates';

// LLM用のOpenAIクライアント（オプション）
let openai: any = null;
if (process.env.OPENAI_API_KEY) {
  try {
    const OpenAI = require('openai');
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  } catch (e) {
    console.log('OpenAI not available, using rule-based summary');
  }
}

function jp(list: string[]) { 
  return list.filter(Boolean).join("、"); 
}

// ルールベースのsummary生成（LLMが使えない場合のフォールバック）
function generateRuleBasedSummary(answers: Answers, height: string, firmness: string, material?: string): string {
  const bullets: string[] = [];
  
  if (answers.sleepPosition === "side") bullets.push("横向き寝が多い");
  if (answers.sleepPosition === "back") bullets.push("仰向け寝が多い");
  if (answers.sleepPosition === "stomach") bullets.push("うつ伏せ寝が多い");
  if (answers.rollOver === "many") bullets.push("寝返りが多い");
  if (answers.rollOver === "few") bullets.push("寝返りが少ない");
  if (answers.hotSweaty) bullets.push("暑がり・蒸れが気になる");
  if (answers.mattressHardness) bullets.push(`マットレスは${answers.mattressHardness === 'soft' ? '柔らかめ' : answers.mattressHardness === 'hard' ? '硬め' : 'ふつう'}寄り`);
  if (answers.currentPillow?.issues?.tooHigh) bullets.push("現枕は高すぎると感じる");
  if (answers.currentPillow?.issues?.tooLow) bullets.push("現枕は低すぎると感じる");
  if (answers.snoring === "yes") bullets.push("いびき対策も考慮したい");
  if (answers.neckPain || answers.neckIssue !== "none") bullets.push("首や肩の痛みがある");

  const materialText = material ? `、${material}素材` : "";
  
  if (bullets.length > 0) {
    return `あなたの特徴（${jp(bullets)}）を考慮し、「${height}・${firmness}」の枕${materialText}を推奨します。`;
  } else {
    return `あなたには「${height}・${firmness}」の枕${materialText}が適しています。`;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const answers: Answers = req.body;
    
    // 基本的なバリデーション
    if (!answers || !answers.sleepPosition) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // 診断実行
    const result = diagnose(answers);

    // ルールで「要点」を抽出（LLMの前処理）
    const bullets: string[] = [];
    if (answers.sleepPosition === "side") bullets.push("横向き寝が多い");
    if (answers.sleepPosition === "back") bullets.push("仰向け寝が多い");
    if (answers.sleepPosition === "stomach") bullets.push("うつ伏せ寝が多い");
    if (answers.rollOver === "many") bullets.push("寝返りが多い");
    if (answers.rollOver === "few") bullets.push("寝返りが少ない");
    if (answers.hotSweaty) bullets.push("暑がり・蒸れが気になる");
    if (answers.mattressHardness) bullets.push(`マットレスは${answers.mattressHardness === 'soft' ? '柔らかめ' : answers.mattressHardness === 'hard' ? '硬め' : 'ふつう'}寄り`);
    if (answers.currentPillow?.issues?.tooHigh) bullets.push("現枕は高すぎると感じる");
    if (answers.currentPillow?.issues?.tooLow) bullets.push("現枕は低すぎると感じる");
    if (answers.snoring === "yes") bullets.push("いびき対策も考慮したい");
    if (answers.neckPain || answers.neckIssue !== "none") bullets.push("首や肩の痛みがある");

    // 新しい要約システムを使用
    const categoryLabel = getCategoryLabel(result.primaryCategory);
    const summaryInput = {
      categoryLabel,
      sleepPosition: answers.sleepPosition,
      mattress: answers.mattressHardness || "medium",
      height: result.height as any,
      firmness: result.firmness as any,
      shoulderWidth: answers.shoulderWidth,
      rollOver: answers.rollOver,
      hotSweaty: answers.hotSweaty,
      currentPillowIssues: answers.currentPillow?.issues,
    };
    
    let summary = buildSummary(summaryInput);

    // LLMが利用可能な場合は、さらに自然な文に改善
    if (openai) {
      try {
        const sys = `あなたは日本語の睡眠・枕アドバイザー。入力の特徴を自然な1〜2文に要約し、具体的に「高さ/硬さ/形状や素材の方向性」が伝わる文にしてください。専門用語は平易に。句読点は日本語。最大140文字程度。`;
        const usr = `ユーザーの特徴: ${jp(bullets)}\n推奨: 高さ=${result.height} / 硬さ=${result.firmness}`;
        
        const r = await openai.chat.completions.create({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          messages: [{ role: "system", content: sys }, { role: "user", content: usr }],
          temperature: 0.4,
          max_tokens: 140,
        });
        summary = r.choices?.[0]?.message?.content?.trim() || summary;
      } catch(_e) {
        console.log('LLM generation failed, using rule-based summary');
      }
    }

    // 診断結果の締めを統一
    summary = finalizeSummary(summary);

    // 予算情報を抽出
    const priceRange = (answers as any).priceRange || {};
    const budgetBand = (answers as any).budgetBand;
    
    // 結果を更新
    const enhancedResult = {
      ...result,
      summary,
      reasons: bullets,
      priceRange,
      budgetBand
    };

    return res.status(200).json({
      id: `diagnosis-${Date.now()}`,
      ...enhancedResult
    });
  } catch (error) {
    console.error('Diagnosis error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 