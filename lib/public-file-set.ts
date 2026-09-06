import fs from "fs";
import path from "path";

const PUBLIC_FILE_LIST_PATH = path.join(
  process.cwd(),
  "data/generated/public-files.json"
);

let cached: Set<string> | null = null;

function loadPublicFileSet(): Set<string> {
  const raw = fs.readFileSync(PUBLIC_FILE_LIST_PATH, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error("data/generated/public-files.json must be a JSON array of paths");
  }
  return new Set(parsed.filter((item): item is string => typeof item === "string"));
}

export function publicFileExists(relativePosixPath: string): boolean {
  if (!cached) {
    cached = loadPublicFileSet();
  }
  return cached.has(relativePosixPath);
}
