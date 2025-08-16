export function interleave<T>(a: T[], b: T[], wa=1, wb=1): T[] {
  // wa:wb の比率で交互ピック
  const out: T[] = [];
  let i = 0, j = 0, ca = 0, cb = 0;
  while (i < a.length || j < b.length) {
    const pickA = (cb >= wb) || (ca < wa && i < a.length && (j >= b.length));
    const pickB = (ca >= wa) || (cb < wb && j < b.length && (i >= a.length));
    if (pickA && i < a.length) { out.push(a[i++]); ca++; cb = 0; }
    else if (pickB && j < b.length) { out.push(b[j++]); cb++; ca = 0; }
    else if (i < a.length) { out.push(a[i++]); } 
    else if (j < b.length) { out.push(b[j++]); }
  }
  return out;
} 