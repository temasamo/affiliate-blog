// lib/diagnosisCopy.ts
import type { Answers } from "@/lib/resultLogic";

export function buildConcernsFromAnswers(a?: Partial<Answers>): string[] {
  if (!a) return [];
  const out: string[] = [];

  if (a.neckPain) {
    out.push('首・肩の痛み／こり');
    if (a.neckIssue && a.neckIssue !== 'none') {
      out.push(
        a.neckIssue === 'stiff'
          ? '肩こり・首のこり'
          : a.neckIssue === 'cervical'
          ? '頸椎症・首の痛み'
          : ''
      );
    }
  }
  if (a.hotSweaty) out.push('ムレ・暑さ');
  if (a.snoring === 'yes') out.push('いびき');
  if (a.morningTired && a.morningTired !== 'no') out.push('起床時の疲れ');

  return Array.from(new Set(out.filter(Boolean)));
}

export function buildReasons(a?: Partial<Answers> | null): string[] {
  const r: string[] = [];

  // 姿勢ベースの方針
  if (a?.sleepPosition === "back") {
    r.push("頸椎の自然なカーブを保ち後頭部を安定させる形状を優先");
  } else if (a?.sleepPosition === "side") {
    r.push("横向き時に肩のクリアランスを確保できる高さ設定を重視");
  } else if (a?.sleepPosition === "stomach") {
    r.push("うつ伏せ時に首への反り負担を抑えやすい低め設定を検討");
  }

  // 高さ・硬さの根拠
  const heightPref = a?.heightPref ?? "medium";
  const heightLabel = heightPref === "low" ? "低め" : heightPref === "high" ? "高め" : "ふつう";
  r.push(`高さは「${heightLabel}」を基準に微調整`);

  const firmMap: Record<string, string> = { soft: "やわらかめ", medium: "ふつう", hard: "やや硬め" };
  const firmLabel = firmMap[a?.mattressHardness ?? "medium"];
  r.push(`硬さは「${firmLabel}」を中心に選定`);

  // マットレス表現も追加
  if (a?.mattressHardness) {
    const m = { soft: "柔らかめ", medium: "ふつう", hard: "硬め" }[a.mattressHardness];
    if (m) r.push(`マットレスの硬さは「${m}」`);
  }

  // 体格・動き
  if (a?.shoulderWidth === "wide") r.push("肩幅が広めのため横向き時に沈み込み過ぎない高さを確保");
  if (a?.rollOver === "many") r.push("寝返りが多い傾向のため復元性と形状保持の良い素材を優先");

  // 体調・快適性
  if (a?.neckPain) r.push("首まわりの支持力を確保しやすい構造（頸椎サポート）を選定");
  if (a?.hotSweaty) r.push("通気性の高い中材（メッシュ／パイプ等）を優先");
  if (a?.adjustable === "yes") r.push("中材の出し入れ等で高さ調整できるタイプを推奨");

  // 素材嗜好
  const mp = a?.materialPref;
  if (mp && mp !== "none") {
    const matJP: Record<string, string> = {
      buckwheat: "そばがら", pipe: "パイプ", memory: "メモリーフォーム",
      latex: "ラテックス", fiber: "ファイバー", feather: "羽毛",
    };
    r.push(`素材の希望（${matJP[mp] ?? mp}）を考慮`);
  }

  return r;
} 