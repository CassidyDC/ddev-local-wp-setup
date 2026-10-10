/**
 * CREATE FILES
 * @module commands/install/create/files
 */

// Import node modules
import path from "node:path";
import { existsSync } from "node:fs";
import fs, { writeFile } from "node:fs/promises";

// Import configs
import { installationConfig } from "../../../configs/index.js";

// Import helpers
import { c, log, rootDirPath, runCommand } from "../../../utils/helpers/index.js";

// Import file creators
import {
  getDdevDockerfileFileContent,
  getDdevPhpRayFileContent,
  getRootComposerFileContent,
  getRootIndexFileContent,
  getRootRayFileContent,
  getRootWPCliFileContent,
} from "../../../utils/getters/index.js";

/**
 * Creates the local server files.
 */
export async function createFilesystemFiles() {
  const wpCoreDir = installationConfig?.wordpress?.coreDir.replace(/^\/+/, "");

  log(`\n${c.headingInfo(" Creating files ")}\n`);

  await createFile("index.php", getRootIndexFileContent); // Tells DDEV where the WordPress Core is installed.
  await createFile("wp-cli.yml", getRootWPCliFileContent); // Tells DDEV where to run the WP CLI command.

  if (installationConfig?.ddev?.spatieRay) {
    await createFile(".ddev/web-build/Dockerfile", getDdevDockerfileFileContent);
    await createFile(".ddev/php/php-ray.ini", getDdevPhpRayFileContent);
    await createFile("ray.php", getRootRayFileContent);
  }

  // Installs WordPress Core via `composer.json`/
  if (existsSync(path.join(rootDirPath, "composer.json"))) {
    log(
      c.dim(
        `The ${c.em(`${"composer.json"}`)} file already exists. Skipping creation and adding the \`roots/wordpress\` composer package to the existing composer.json file.\n`,
      ),
    );
    if (wpCoreDir !== "/wordpress") await updateComposerWPInstallDir(wpCoreDir);
  } else {
    await createFile("composer.json", getRootComposerFileContent);
  }

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

/**
 * Creates a file with content.
 *
 * @param {string} filename The filename being created.
 * @param {*} fileContent The file content being added to the file being created.
 */
async function createFile(filename, fileContent) {
  const filepath = path.join(rootDirPath, filename);

  if (existsSync(filepath)) {
    log(c.dim(`The ${c.em(`${filename}`)} file already exists. Skipping creation.`));
    return;
  }

  log(c.detail(`Creating ${c.em(filename)} file...`));
  await writeFile(filepath, fileContent());
}

/**
 * Updates the "wordpress-install-dir" property in the composer.json file.
 */
async function updateComposerWPInstallDir(wpCoreDir) {
  // log(c.detail("Updating WordPress Core directory path in composer.json..."));
  const installFilePath = path.join(rootDirPath, "composer.json");
  const file = await fs.readFile(installFilePath, "utf8");
  const composerFile = JSON.parse(file);

  composerFile.extra = {
    ...(composerFile.extra || {}),
    "wordpress-install-dir": wpCoreDir,
  };

  await fs.writeFile(installFilePath, JSON.stringify(composerFile, null, 2) + "\n", "utf8");
}
