/**
 * CREATE DDEV-LOCAL-WP-SETUP-CONFIG.JSON FILE
 * @module commands/install/create/files/user-settings-config
 */

// Import node modules
import path from "node:path";
import { writeFile } from "node:fs/promises";

// Import helpers
import { c, log, rootDirPath } from "../../../../utils/helpers/index.js";

/**
 * Creates <root>/ddev-local-wp-setup-config.json file.
 */
export async function createConfigFile(userSettingsConfig) {
  log(c.detail("Creating `ddev-local-wp-setup-config.json` file..."));

  const ddevLocalWPSetupConfigFile = path.join(`${rootDirPath}`, "ddev-local-wp-setup-config.json");
  const ddevLocalWPSetupConfigFileContent = userSettingsConfig;

  await writeFile(ddevLocalWPSetupConfigFile, ddevLocalWPSetupConfigFileContent);
}
