/**
 * CREATE DDEV-LOCAL-WP-SETUP-CONFIG.JSON FILE
 * @module commands/install/create/files/config
 */

// Import node modules
import path from "node:path";
import { readdir, rename, writeFile } from "node:fs/promises";
import { isDeepStrictEqual } from "node:util";

// Import helpers
import { c, log, rootDirPath } from "../../../../utils/helpers/index.js";

/**
 * Creates <root>/ddev-local-wp-setup-config.json without the WP admin password.
 */
export async function createConfigFile(userSettingsConfig, existingConfig) {
  const ddevLocalWPSetupConfigFile = path.join(`${rootDirPath}`, "ddev-local-wp-setup-config.json");
  const configToSave = {
    ...userSettingsConfig,
    wordpress: { ...userSettingsConfig.wordpress },
  };
  delete configToSave.wordpress.adminPassword;

  if (existingConfig) {
    const hasNewSettings = Object.entries(configToSave).some(([section, settings]) =>
      Object.entries(settings).some(([name, value]) => !isDeepStrictEqual(value, existingConfig[section]?.[name])),
    );
    if (!hasNewSettings) return;
  } else {
    log(c.detail("Creating `ddev-local-wp-setup-config.json` file..."));
  }

  const ddevLocalWPSetupConfigFileContent = JSON.stringify(configToSave, null, 2) + "\n";

  if (!existingConfig) {
    const filenames = await readdir(rootDirPath);
    let highestBackupNumber = -1;
    for (const filename of filenames) {
      const match = filename.match(/^ddev-local-wp-setup-config(?:_(\d+))?\.bak$/);
      if (match) highestBackupNumber = Math.max(highestBackupNumber, Number(match[1] ?? 0));
    }
    const suffix = `_${String(highestBackupNumber + 1).padStart(2, "0")}`;
    const backupFilename = `ddev-local-wp-setup-config${suffix}.bak`;
    const backupPath = path.join(rootDirPath, backupFilename);
    try {
      await rename(ddevLocalWPSetupConfigFile, backupPath);
      log(c.detail(`Saved existing configuration as \`${backupFilename}\`.`));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }

  await writeFile(ddevLocalWPSetupConfigFile, ddevLocalWPSetupConfigFileContent, "utf8");
  if (existingConfig) {
    log(c.detail("Updated `ddev-local-wp-setup-config.json` file."));
  }
}
