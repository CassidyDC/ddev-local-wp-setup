/**
 * CREATE WP-CLI.YML FILE
 * @module commands/install/create/files/wp-cli
 */

// Import node modules
import { writeFile } from "node:fs/promises";
import path from "node:path";

// Import helpers
import { c, log } from "../../../../utils/helpers/index.js";

/**
 * Creates the <root>/wp-cli.yml file to tell DDEV where to find the WP Core directory.
 *
 * @param {string} rootDirPath The DDEV server root path.
 * @param {string} wpCoreDir The dirname for the WordPress Core directory.
 */
export async function createWPCliFile(rootDirPath, wpCoreDir) {
  log(c.detail("Creating `wp-cli.yml` file..."));
  await writeFile(path.join(rootDirPath, "wp-cli.yml"), `path: ${wpCoreDir}`);
}
