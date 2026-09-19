/**
 * CREATE PHP-RAY.INI FILE
 * @module commands/install/create/files/php-ray
 */

// Import node modules
import path from "node:path";
import { writeFile } from "node:fs/promises";

// Import helpers
import { c, log, rootDirPath } from "../../../../utils/helpers/index.js";

/**
 * Create a `<root>/.ddev/php/php-ray.php` file.
 */
export async function createPhpRayFile() {
  log(c.detail("Creating `.ddev/php/php-ray.php` file..."));

  const phpRayFile = path.join(`${rootDirPath}/.ddev/php`, "php-ray.php");
  const phpRayFileContent = `auto_prepend_file = '/usr/local/composer/vendor/spatie/global-ray/src/scripts/global-ray-loader.php'`;

  await writeFile(phpRayFile, phpRayFileContent);
}
