#!/usr/bin/env node

// create-staraligner
// Scaffolds a new StarAligner agent directory into your project.
// Usage:
//   npx create-staraligner              → creates .staraligner/ with blank template
//   npx create-staraligner my-agent     → creates my-agent/ with blank template
//   npx create-staraligner --meta       → also copies the StarAligner meta-agent

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const includeMeta = args.includes("--meta");
const nameArg = args.find((a) => !a.startsWith("--"));
const targetName = nameArg || ".staraligner";
const targetDir = path.resolve(process.cwd(), targetName);

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Guard against overwriting
if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
  console.error(`\n  ${targetName}/ already exists and is not empty.\n`);
  process.exit(1);
}

// Copy template
const templateDir = path.join(root, "agent-template");
copyDir(templateDir, targetDir);
console.log(`\n  Created ${targetName}/`);

// Copy constitution into the agent directory for reference
const constitution = path.join(root, "CONSTITUTION.md");
if (fs.existsSync(constitution)) {
  fs.copyFileSync(constitution, path.join(targetDir, "CONSTITUTION.md"));
  console.log(`  Added CONSTITUTION.md`);
}

// Optionally copy meta-agent
if (includeMeta) {
  const metaDir = path.join(root, "staraligner-agent");
  const metaDest = path.join(targetDir, "staraligner-agent");
  copyDir(metaDir, metaDest);
  console.log(`  Added staraligner-agent/`);
}

console.log(`
  Next steps:
    1. Edit PRINCIPLES.md — answer the three identity questions
    2. Add skills in skills/
    3. Add domain maps in domain/
    4. Edit manifest.yaml with your output targets
    5. Run: node compile.mjs
`);

if (!includeMeta) {
  console.log(`  Tip: run with --meta to include the StarAligner meta-agent,`);
  console.log(`  which can help you build and maintain your agent.\n`);
}
