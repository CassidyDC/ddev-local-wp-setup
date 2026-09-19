/**
 * CREATE INDEX.PHP FILE
 * @module commands/install/create/files/index-php
 */

// Import node modules
import path from "node:path";
import { writeFile } from "node:fs/promises";

// Import helpers
import { c, log, rootDirPath } from "../../../../utils/helpers/index.js";

/**
 * Creates the <root>/index.php file.
 *
 * @param {string} wpCoreDir The dirname for the WordPress Core directory.
 */
export async function createIndexFile(wpCoreDir) {
  log(c.detail("Creating `index.php` file..."));

  const indexPhpFile = path.join(`${rootDirPath}`, "index.php");
  const indexPhpFileContent = `<?php

  require_once __DIR__ '/${wpCoreDir}/index.php';`;

  await writeFile(indexPhpFile, indexPhpFileContent);
}
