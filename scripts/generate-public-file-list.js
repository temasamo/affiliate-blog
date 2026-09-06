#!/usr/bin/env node
/**
 * Walk public/ and write a path list for runtime thumbnail checks.
 * Keep this script out of lib/ so Next file tracing does not follow
 * existsSync/readdir on public/ into serverless functions.
 *
 * Called from next.config.js so it runs for both `npm run build` and
 * a direct `next build` (Vercel's default Next.js command).
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const OUT_DIR = path.join(ROOT, "data", "generated");
const OUT_FILE = path.join(OUT_DIR, "public-files.json");

function walk(dir, relativePosix = "") {
  const out = [];
  if (!fs.existsSync(dir)) return out;

  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    const rel = relativePosix ? `${relativePosix}/${name}` : name;
    let st;
    try {
      st = fs.statSync(abs);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      out.push(...walk(abs, rel));
    } else if (st.isFile()) {
      out.push(rel.replace(/\\/g, "/"));
    }
  }
  return out;
}

function generatePublicFileList() {
  if (process.env.NEXT_PHASE === "phase-production-server") {
    return [];
  }

  const files = walk(PUBLIC_DIR).sort((a, b) => a.localeCompare(b));
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, `${JSON.stringify(files, null, 2)}\n`);
  console.log(
    `[generate-public-file-list] wrote ${files.length} paths to ${path.relative(ROOT, OUT_FILE)}`
  );
  return files;
}

if (require.main === module) {
  generatePublicFileList();
}

module.exports = { generatePublicFileList };
