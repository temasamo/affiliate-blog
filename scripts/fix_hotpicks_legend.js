const fs = require('fs');
const path = require('path');

const DIR = path.join(process.cwd(), 'articles/global-hot-picks/trend');

if (!fs.existsSync(DIR)) {
  console.error('Directory not found:', DIR);
  process.exit(1);
}

const headingRe = /^##\s*商品お取り扱い状況（(\d{4}-\d{2}-\d{2})時点）/m;
const legendVariants = [
  /〇＝あり／△＝一部・在庫薄／×＝未確認/,
  /○＝あり／△＝一部・在庫薄／×＝未確認/,
];
const newLegend = '〇＝検索で複数ヒット／△＝一部ヒット（並行輸入中心）／×＝検索ヒットなし';
const disclaimers = [
  '※価格・取扱い状況は変動します。最新情報は各モールでご確認ください。',
  '※本表示は編集部の目視確認による目安であり、APIベースの在庫情報ではありません。',
];

let changed = 0;
for (const file of fs.readdirSync(DIR)) {
  if (!file.endsWith('.mdx')) continue;
  const fp = path.join(DIR, file);
  let s = fs.readFileSync(fp, 'utf8');
  let orig = s;

  // 1) 見出し「商品お取り扱い状況」→「取扱い目安（同日付）」
  s = s.replace(headingRe, (_, d) => `## 取扱い目安（${d}時点）`);

  // 2) 凡例の置換
  let legendReplaced = false;
  for (const re of legendVariants) {
    if (re.test(s)) {
      s = s.replace(re, newLegend);
      legendReplaced = true;
      break;
    }
  }

  // 3) 凡例直後に断り書きを追加（重複挿入を避ける）
  if (legendReplaced) {
    const lines = s.split('\n');
    const idx = lines.findIndex(l => l.includes(newLegend));
    if (idx !== -1) {
      const alreadyHas = disclaimers.every(d =>
        lines.slice(idx + 1, idx + 6).some(l => l.includes(d))
      );
      if (!alreadyHas) {
        lines.splice(idx + 1, 0, ...disclaimers);
        s = lines.join('\n');
      }
    }
  }

  if (s !== orig) {
    fs.writeFileSync(fp, s);
    changed++;
    console.log('updated:', file);
  }
}
console.log(`done. updated files: ${changed}`);
