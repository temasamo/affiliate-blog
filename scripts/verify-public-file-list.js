#!/usr/bin/env node
/**
 * Compare list-based thumbnail resolution with existsSync, and optionally
 * inspect Next NFT files after a build.
 */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const ROOT = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const LIST_PATH = path.join(ROOT, "data/generated/public-files.json");
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif", ".ico"]);
const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov", ".m4v"]);

function resolveOld(input) {
  if (!input || typeof input !== "string") return null;
  if (/^https?:\/\//i.test(input)) return input;
  const rel = input.replace(/^\/+/, "");
  const abs = path.join(PUBLIC_DIR, rel);
  return fs.existsSync(abs) ? `/${rel.replace(/\\/g, "/")}` : null;
}

function resolveNew(input, fileSet) {
  if (!input || typeof input !== "string") return null;
  if (/^https?:\/\//i.test(input)) return input;
  const rel = input.replace(/^\/+/, "").replace(/\\/g, "/");
  if (!rel) return "/";
  return fileSet.has(rel) ? `/${rel}` : null;
}

function walkFiles(dir, exts) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...walkFiles(p, exts));
    else if (exts.has(path.extname(p).toLowerCase())) out.push(p);
  }
  return out;
}

function collectThumbnailInputs() {
  const inputs = [];
  const dirs = [
    path.join(ROOT, "content", "blog"),
    path.join(ROOT, "content", "travel"),
    path.join(ROOT, "content", "global-hot-picks"),
    path.join(ROOT, "articles"),
  ];
  for (const dir of dirs) {
    for (const file of walkFiles(dir, new Set([".md", ".mdx"]))) {
      const raw = fs.readFileSync(file, "utf8");
      const { data } = matter(raw);
      if (typeof data?.thumbnail === "string") {
        inputs.push({ file: path.relative(ROOT, file), field: "thumbnail", value: data.thumbnail });
      }
    }
  }
  const jsonDirs = [
    path.join(ROOT, "data", "development", "travel"),
    path.join(ROOT, "data", "production", "travel"),
    path.join(ROOT, "data", "travel"),
    path.join(ROOT, "data", "development", "articles", "global-hot-picks", "trend"),
    path.join(ROOT, "data", "production", "articles", "global-hot-picks", "trend"),
    path.join(ROOT, "data", "articles", "global-hot-picks", "trend"),
  ];
  for (const dir of jsonDirs) {
    for (const file of walkFiles(dir, new Set([".json"]))) {
      let obj;
      try {
        obj = JSON.parse(fs.readFileSync(file, "utf8"));
      } catch {
        continue;
      }
      const value = obj?.thumbnail || obj?.image || obj?.cover || null;
      if (typeof value === "string") {
        inputs.push({ file: path.relative(ROOT, file), field: "json-image", value });
      }
    }
  }
  return inputs;
}

function compareThumbnails() {
  if (!fs.existsSync(LIST_PATH)) {
    throw new Error("public-files.json missing; run node scripts/generate-public-file-list.js first");
  }
  const fileSet = new Set(JSON.parse(fs.readFileSync(LIST_PATH, "utf8")));
  const inputs = collectThumbnailInputs();
  const mismatches = [];
  let httpsCount = 0;
  let localOk = 0;
  let localNull = 0;
  for (const item of inputs) {
    const oldVal = resolveOld(item.value);
    const newVal = resolveNew(item.value, fileSet);
    if (oldVal !== newVal) mismatches.push({ ...item, oldVal, newVal });
    if (/^https?:\/\//i.test(item.value)) httpsCount += 1;
    else if (newVal) localOk += 1;
    else localNull += 1;
  }
  return {
    inputCount: inputs.length,
    httpsCount,
    localOk,
    localNull,
    mismatchCount: mismatches.length,
    mismatches: mismatches.slice(0, 20),
    extraChecks: {
      missingLocal: resolveNew("/images/this-file-should-not-exist-xyz.jpg", fileSet),
      httpsPassthrough: resolveNew("https://example.com/a.jpg", fileSet),
    },
  };
}

function resolveNftFile(rel, nftPath) {
  const cands = [
    path.join(ROOT, rel),
    path.join(path.dirname(nftPath), rel),
    rel,
  ];
  for (const c of cands) {
    if (fs.existsSync(c)) return fs.realpathSync(c);
  }
  return null;
}

function classifyPublic(absPath) {
  const low = absPath.replace(/\\/g, "/").toLowerCase();
  if (!low.includes("/public/")) return null;
  const ext = path.extname(low);
  if (VIDEO_EXTS.has(ext)) return "video";
  if (IMAGE_EXTS.has(ext)) return "image";
  return "other";
}

function inspectNfts() {
  const nextDir = path.join(ROOT, ".next");
  const targets = [
    "server/pages/index.js.nft.json",
    "server/pages/blog.js.nft.json",
    "server/pages/diagnostic-ai.js.nft.json",
    "server/pages/api/debug/latest.js.nft.json",
  ];
  const results = [];
  for (const rel of targets) {
    const nftPath = path.join(nextDir, rel);
    if (!fs.existsSync(nftPath)) {
      results.push({ nft: rel, missing: true });
      continue;
    }
    const data = JSON.parse(fs.readFileSync(nftPath, "utf8"));
    const files = data.files || [];
    let apparent = 0;
    const publicMedia = [];
    let publicImages = 0;
    let publicVideos = 0;
    let publicOther = 0;
    let publicBytes = 0;
    for (const fileRel of files) {
      const abs = resolveNftFile(fileRel, nftPath);
      if (!abs) continue;
      const sz = fs.statSync(abs).size;
      apparent += sz;
      const kind = classifyPublic(abs);
      if (!kind) continue;
      publicBytes += sz;
      if (kind === "image") publicImages += 1;
      else if (kind === "video") publicVideos += 1;
      else publicOther += 1;
      if (kind === "image" || kind === "video") {
        publicMedia.push({
          kind,
          bytes: sz,
          path: path.relative(ROOT, abs),
        });
      }
    }
    results.push({
      nft: rel,
      fileCount: files.length,
      apparentMb: +(apparent / 1024 / 1024).toFixed(2),
      publicImages,
      publicVideos,
      publicOther,
      publicMb: +(publicBytes / 1024 / 1024).toFixed(2),
      publicMedia: publicMedia.slice(0, 10),
    });
  }
  return results;
}

const mode = process.argv[2] || "all";
const report = {};
if (mode === "thumbnails" || mode === "all") {
  report.thumbnails = compareThumbnails();
}
if (mode === "nft" || mode === "all") {
  report.nft = inspectNfts();
}
console.log(JSON.stringify(report, null, 2));
if (report.thumbnails && report.thumbnails.mismatchCount > 0) {
  process.exitCode = 1;
}
if (
  report.nft &&
  report.nft.some((row) => !row.missing && (row.publicImages > 0 || row.publicVideos > 0))
) {
  process.exitCode = 1;
}
