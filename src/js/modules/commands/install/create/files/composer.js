/**
 * CREATE COMPOSER.JSON FILE
 * @module commands/install/create/files/composer
 */

// Import node modules
import path from "node:path";
import fs from "node:fs/promises";

// Import helpers
import { c, log, rootDirPath, runCommand } from "../../../../utils/helpers/index.js";

/**
 * Creates the <root>/composer.json file.
 *
 * @param {string} wpCoreDir The dirname for the WordPress Core directory.
 */
export async function createComposerFile(wpCoreDir) {
  log(c.detail("Creating `composer.json` file..."));

  const composerTarget = path.join(rootDirPath, "composer.json");

  const composerFileContent = `{
  "name": "cassidydc/ddev-local-wp-setup",
  "description": "CassidyDC default local development WordPress server setup with DDEV.",
  "version": "1.0.0",
  "keywords": [
    "ddev",
    "docker",
    "local development",
    "wordpress",
    "wp"
  ],
  "homepage": "https://github.com/CassidyDC/ddev-local-wp-setup/blob/main/README.md",
  "license": "MIT",
  "authors": [
    {
      "name": "CassidyDC",
      "email": "info@cassidydc.com",
      "homepage": "https://cassidydc.com"
    }
  ],
  "require": {
    "php": ">=8.4"
  },
  "support": {
    "issues": "https://github.com/CassidyDC/ddev-local-wp-setup/issues"
  },
  "extra": {
    "wordpress-install-dir": "wordpress"
  }
}`;

  const updateComposerWPInstallDir = async () => {
    log(c.detail("Updating WordPress Core directory path in composer.json..."));
    wpCoreDir = wpCoreDir.replace(/^\//, "");
    const installFilePath = path.join(rootDirPath, "composer.json");
    const file = await fs.readFile(installFilePath, "utf8");
    const composerFile = JSON.parse(file);

    composerFile.extra = {
      ...(composerFile.extra || {}),
      "wordpress-install-dir": wpCoreDir,
    };

    await fs.writeFile(installFilePath, JSON.stringify(composerFile, null, 2) + "\n", "utf8");
  };

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
    await fs.writeFile(composerTarget, composerFileContent, "utf8");
  }

  if (wpCoreDir !== "/wordpress") await updateComposerWPInstallDir();

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
