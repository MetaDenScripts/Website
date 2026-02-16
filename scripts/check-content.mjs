import fs from "node:fs";
import path from "node:path";

const requiredSections = ["api", "readme", "config-examples", "changelog"];
const rootDir = process.cwd();
const indexPath = path.join(rootDir, "docs", "scripts", "_meta", "scripts-index.json");

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

if (!fs.existsSync(indexPath)) {
  fail(`Missing scripts index: ${indexPath}`);
  process.exit();
}

const data = JSON.parse(fs.readFileSync(indexPath, "utf8"));
const scripts = data.scripts || [];

for (const script of scripts) {
  for (const section of requiredSections) {
    const relativePath = script.sections?.[section];
    if (!relativePath) {
      fail(`Script '${script.id}' is missing section mapping for '${section}'.`);
      continue;
    }

    const absolutePath = path.join(rootDir, "docs", relativePath);
    if (!fs.existsSync(absolutePath)) {
      fail(`Script '${script.id}' section '${section}' points to missing file: ${relativePath}`);
    }
  }
}

if (!process.exitCode) {
  console.log(`Content check passed for ${scripts.length} script(s).`);
}
