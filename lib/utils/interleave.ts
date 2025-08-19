// 2配列を a:b = aCount:bCount の比率で交互に並べる（型を保ったまま）
export function interleave<T>(
  a: T[],
  b: T[],
  aCount = 1,
  bCount = 1
): T[] {
  const out: T[] = [];
  let i = 0,
    j = 0;
  while (i < a.length || j < b.length) {
    for (let k = 0; k < aCount && i < a.length; k++) out.push(a[i++]);
    for (let k = 0; k < bCount && j < b.length; k++) out.push(b[j++]);
  }
  return out;
}
