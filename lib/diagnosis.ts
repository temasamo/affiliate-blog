export type Answers = {
  sleepPosition: 'back'|'side'|'stomach',
  shoulderPain: 'yes'|'no',
  neckPain: 'yes'|'no',
  snoring: 'yes'|'no',
  mattressFirmness: 'soft'|'medium'|'hard',
  adjustableOk: 'ok'|'ng',
  budget: 'low'|'medium'|'high',
  hotelComfort: 'want'|'dontcare',
}

export type Category = 'low'|'medium'|'high'|'adjustable'

const BASE: Record<Category, number> = { low: 0, medium: 0, high: 0, adjustable: 0 }

const RULES: Array<{
  if: (a: Answers) => boolean
  add: Partial<Record<Category, number>>
  reason: string
}> = [
  { if: a => a.sleepPosition==='side',    add: { high:2,  medium:1 }, reason:'横向きは首の隙間を埋める高さが必要' },
  { if: a => a.sleepPosition==='back',    add: { medium:2, low:1 },   reason:'仰向けは中〜低めが安定' },
  { if: a => a.sleepPosition==='stomach', add: { low:3 },             reason:'うつ伏せは低めで気道確保' },

  { if: a => a.shoulderPain==='yes', add: { high:2, adjustable:1 },  reason:'肩の圧迫回避に高さ/調整幅が有効' },
  { if: a => a.neckPain==='yes',     add: { adjustable:2, medium:1 }, reason:'首の痛みは微調整のしやすさが重要' },

  { if: a => a.snoring==='yes', add: { high:1, adjustable:1 }, reason:'気道確保でやや高め/調整可が有利' },

  { if: a => a.mattressFirmness==='soft', add: { high:1 }, reason:'沈みが大きい＝相対的に高めが必要' },
  { if: a => a.mattressFirmness==='hard', add: { low:1 },  reason:'反発が強い＝相対的に低めでOK' },

  { if: a => a.adjustableOk==='ok', add: { adjustable:2 }, reason:'微調整を許容→可変枕の満足度↑' },

  { if: a => a.hotelComfort==='want', add: { adjustable:1, medium:1 }, reason:'質感/安定性を重視' },
]

function purchaseSignal(a: Answers) {
  return a.budget !== 'low' || a.neckPain==='yes' || a.shoulderPain==='yes'
}

export function computeDiagnosis(a: Answers) {
  const scores: Record<Category, number> = { ...BASE }
  const reasons: string[] = []

  for (const r of RULES) {
    if (r.if(a)) {
      for (const [k,v] of Object.entries(r.add)) scores[k as Category] += v ?? 0
      reasons.push(r.reason)
    }
  }

  const max = Math.max(...Object.values(scores))
  const normalized = Object.fromEntries(
    Object.entries(scores).map(([k,v]) => [k, max? +(v/max).toFixed(2):0])
  ) as Record<Category, number>

  let primary = (Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0]) as Category
  if (a.adjustableOk==='ok' && scores.adjustable >= max - 0.5) primary = 'adjustable'

  const secondary = Object
    .entries(scores)
    .filter(([k])=>k!==primary)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,2)
    .map(([k])=>k as Category)

  const sorted = Object.values(scores).sort((a,b)=>b-a)
  const diff = (sorted[0] - (sorted[1] ?? 0))
  const confidence = Math.max(0.4, Math.min(0.95, +(diff / (sorted[0] || 1)).toFixed(2)))

  return {
    primary_category: primary,
    secondary_categories: secondary,
    scores: normalized,
    confidence,
    reasons: Array.from(new Set(reasons)).slice(0,5),
    purchase_signal: purchaseSignal(a),
  }
} 