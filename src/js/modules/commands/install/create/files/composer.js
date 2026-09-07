/**
 * CREATE COMPOSER.JSON FILE
 * @module commands/install/create/files/composer
 */

// Import node modules
import fs from "node:fs/promises";
import path from "node:path";

// Import helpers
import { c, log, runCommand } from "../../../../utils/helpers/index.js";

// - Add <root>/composer.json with roots/wordpress package and WP Core directory (default: "wordpress"), then run to install WP Core.

/**
 * Creates the <root>/composer.json file.
 *
 * @param {string} rootDirPath The DDEV server root path.
 * @param {string} wpCoreDir The dirname for the WordPress Core directory.
 */
export async function createComposerFile(rootDirPath, wpCoreDir) {
  log(c.detail("Creating `composer.json` file..."));

  const composerSource = new URL("./templates/root/composer.json", import.meta.url);
  const composerTarget = path.join(rootDirPath, "composer.json");

  try {
    await fs.access(composerTarget);
    // composer.json file already exists...
    log(
      c.info(
        "The composer.json file already exists. Skipping creation and adding the `roots/wordpress` composer package to the existing composer.json file...",
      ),
    );
  } catch {
    // composer.json file does not exist...
    await fs.copyFile(composerSource, composerTarget);
  }

  if (wpCoreDir !== "/wordpress") await updateComposerWPInstallDir(rootDirPath, wpCoreDir);

  await runCommand("composer", [
    "config",
    "--no-interaction",
    "allow-plugins.roots/wordpress-core-installer",
    "true",
  ]);

  await runCommand("composer", [
    "require",
    "--dev",
    "roots/wordpress",
  ]);
}

async function updateComposerWPInstallDir(rootDirPath, customWPCoreDir) {
  log(c.detail("Updating WordPress Core directory path in composer.json..."));
  customWPCoreDir = customWPCoreDir.replace(/^\//, "");
  const installFilePath = path.join(rootDirPath, "composer.json");
  const file = await fs.readFile(installFilePath, "utf8");
  const composerFile = JSON.parse(file);

  composerFile.extra = {
    ...(composerFile.extra || {}),
    "wordpress-install-dir": customWPCoreDir,
  };

  await fs.writeFile(installFilePath, JSON.stringify(composerFile, null, 2) + "\n", "utf8");
}
