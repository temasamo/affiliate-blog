const fs = require('fs');
const path = require('path');

const articlesDir = path.join(process.cwd(), 'articles', 'global-hot-picks', 'trend');

function fixCategoryInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // category: "trend" を category: "global-hot-picks" に置換
  const fixedContent = content.replace(
    /category:\s*"trend"/g,
    'category: "global-hot-picks"'
  );
  
  if (content !== fixedContent) {
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    console.log(`Fixed: ${path.basename(filePath)}`);
    return true;
  }
  
  return false;
}

function main() {
  if (!fs.existsSync(articlesDir)) {
    console.log('Articles directory not found');
    return;
  }
  
  const files = fs.readdirSync(articlesDir)
    .filter(file => file.endsWith('.mdx'))
    .filter(file => file !== 'template.mdx');
  
  let fixedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(articlesDir, file);
    if (fixCategoryInFile(filePath)) {
      fixedCount++;
    }
  }
  
  console.log(`\nFixed ${fixedCount} files`);
}

main(); 