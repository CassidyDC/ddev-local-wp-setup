/**
 * CREATE CHANGELOG.MD FILE
 * @module commands/install/create/files/changelog
 */

// Import node modules
import path from "node:path";
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";

// Import helpers
import { c, log, rootDirPath } from "../../../../utils/helpers/index.js";

/**
 * Creates <root>/wp-content/CHANGELOG.md file.
 */
export async function createChangelogFile() {
  const filename = "wp-content/CHANGELOG.md";
  const filepath = path.join(rootDirPath, filename);

  if (existsSync(filepath)) {
    log(c.dim(`The ${c.em(`${filename}`)} file already exists. Skipping creation.`));
    return;
  }

  log(c.detail(`Creating ${c.em(filename)} file...`));
  await writeFile(filepath, changelogFileContent());
}

/**
 * Provides the CHANGELOG.md file content.
 */
function changelogFileContent() {
  return `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).`;
}
