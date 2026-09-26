/**
 * CREATE PHP-RAY.INI FILE
 * @module commands/install/create/files/php-ray
 */

// Import node modules
import path from "node:path";
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";

// Import helpers
import { c, log, rootDirPath } from "../../../../utils/helpers/index.js";

/**
 * Create a `<root>/.ddev/php/php-ray.ini` file.
 */
export async function createPhpRayFile() {
  const filename = ".ddev/php/php-ray.ini";
  if (existsSync(path.join(rootDirPath, filename))) {
    log(c.dim(`The ${c.em(`${filename}`)} file already exists. Skipping creation.`));
    return;
  }

  log(c.detail("Creating `.ddev/php/php-ray.ini` file..."));

  const phpRayFile = path.join(`${rootDirPath}/.ddev/php`, "php-ray.ini");
  const phpRayFileContent = `auto_prepend_file = '/usr/local/composer/vendor/spatie/global-ray/src/scripts/global-ray-loader.php'`;

  await writeFile(phpRayFile, phpRayFileContent);
}
