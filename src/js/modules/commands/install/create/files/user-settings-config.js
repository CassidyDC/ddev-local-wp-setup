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
 * Creates <root>/ddev-local-wp-setup-config.json without the WP admin password.
 */
export async function createConfigFile(userSettingsConfig) {
  log(c.detail("Creating `ddev-local-wp-setup-config.json` file..."));

  const ddevLocalWPSetupConfigFile = path.join(`${rootDirPath}`, "ddev-local-wp-setup-config.json");
  const configToSave = {
    ...userSettingsConfig,
    wordpress: { ...userSettingsConfig.wordpress },
  };
  delete configToSave.wordpress.adminPassword;

  const ddevLocalWPSetupConfigFileContent = JSON.stringify(configToSave, null, 2) + "\n";

  await writeFile(ddevLocalWPSetupConfigFile, ddevLocalWPSetupConfigFileContent, "utf8");
}
