// scripts/validate-ghp.js
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const DIR = path.join(process.cwd(), "articles", "global-hot-picks");
const allowed = new Set([
  "gadget","home-kitchen","beauty","fitness",
  "toy-collectible","food-bev","outdoor-travel","fashion"
]);

// 日付降順で直近7本を抽出
const files = fs.readdirSync(DIR)
  .filter(f => f.match(/^\d{4}-\d{2}-\d{2}\.(mdx?|MDX?)$/))
  .sort((a,b)=> b.localeCompare(a));

let errors = 0;
const recent = files.slice(0, 7);
let weeklyCats = [];

for (const file of files) {
  const fp = path.join(DIR, file);
  const { data } = matter.read(fp);

  // cats 存在&妥当性
  if (!Array.isArray(data.cats) || data.cats.length < 2) {
    console.error(`✗ ${file}: front-matter "cats" は2つ以上のカテゴリが必要`);
    errors++;
    continue;
  }
  const uniq = [...new Set(data.cats)];
  if (uniq.length !== data.cats.length) {
    console.error(`✗ ${file}: "cats" に重複があります`);
    errors++;
  }
  for (const c of uniq) {
    if (!allowed.has(c)) {
      console.error(`✗ ${file}: 不正なカテゴリ "${c}"`);
      errors++;
    }
  }

  // 直近7本の集計対象
  if (recent.includes(file)) weeklyCats.push({file, cats: uniq});
}

// 週次チェック（直近7本あれば）
if (weeklyCats.length === 7) {
  // 1) gadget は3回まで
  const count = {};
  let uniquePerWeek = new Set();
  for (const d of weeklyCats) {
    for (const c of d.cats) {
      count[c] = (count[c]||0)+1;
      uniquePerWeek.add(c);
    }
  }
  if ((count["gadget"]||0) > 3) {
    console.error(`✗ 直近7本で "gadget" が ${(count["gadget"]||0)} 回（最大3回まで）`);
    errors++;
  }
  if (uniquePerWeek.size < 6) {
    console.error(`✗ 直近7本で登場カテゴリが ${uniquePerWeek.size} 種（最低6種）`);
    errors++;
  }
  // 2) 同一カテゴリの連続は最大2日
  const dayCats = weeklyCats.map(d=>d.cats);
  const catStreak = {};
  for (let i=0;i<dayCats.length;i++){
    for (const c of allowed) {
      const has = dayCats[i].includes(c);
      if (has) catStreak[c] = (catStreak[c]||0)+1;
      else catStreak[c] = 0;
      if (catStreak[c] > 2) {
        console.error(`✗ 同一カテゴリ "${c}" が3日以上連続で登場`);
        errors++;
      }
    }
  }
}

if (errors) {
  console.error(`\n=== 検出 ${errors} 件。修正してください ===`);
  process.exit(1);
} else {
  console.log("✓ Global Hot Picks: ルール検証 OK");
} 