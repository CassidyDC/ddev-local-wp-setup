/**
 * CREATE README.MD FILE
 * @module commands/install/create/files/readme
 */

// Import node modules
import path from "node:path";
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";

// Import helpers
import { c, log, rootDirPath } from "../../../../utils/helpers/index.js";

/**
 * Creates <root>/wp-content/README.md file.
 */
export async function createReadmeFile() {
  const filename = "wp-content/README.md";

  if (existsSync(path.join(rootDirPath, filename))) {
    log(c.dim(`The ${c.em(`${filename}`)} file already exists. Skipping creation.`));
    return;
  }

  const readmeFile = path.join(`${rootDirPath}/wp-content`, "README.md");
  const readmeFileContent = `# Readme`;

  log(c.detail(`Creating ${c.em(filename)} file...`));
  await writeFile(readmeFile, readmeFileContent);
}
