/**
 * CREATE INDEX.PHP FILE
 * @module commands/install/create/files/index-php
 */

// Import node modules
import { writeFile } from "node:fs/promises";
import path from "node:path";

// Import helpers
import { c, log } from "../../../../utils/helpers/index.js";

/**
 * Creates the <root>/index.php file.
 *
 * @param {string} rootDirPath The DDEV server root path.
 * @param {string} wpCoreDir The dirname for the WordPress Core directory.
 */
export async function createIndexPhpFile(rootDirPath, wpCoreDir) {
  log(c.detail("Creating `index.php` file..."));
  await writeFile(path.join(rootDirPath, "index.php"), `<?php require_once __DIR__ '/${wpCoreDir}/index.php`);
}
