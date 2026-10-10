/**
 * CREATE DIRECTORIES
 * @module commands/install/create/directories
 */

// Import node modules
import path from "node:path";
import { access, mkdir } from "node:fs/promises";

// Import configs
import { installationConfig } from "../../../configs/index.js";

// Import helpers
import { c, log, rootDirPath } from "../../../utils/helpers/index.js";

/**
 * Creates the DDEV server filesystem directories.
 */
export async function createFilesystemDirs() {
  const customPluginSlug = installationConfig.plugin.customSlug;
  const customThemeSlug = installationConfig.theme.customSlug;
  const logDirPath = installationConfig.wordpress.debugLogPath.replace(/^\/+/, "");
  const wpCoreDir = installationConfig.wordpress.coreDir.replace(/^\/+/, "");

  const includeDocsDir = installationConfig.devConfig.docs;
  const includeRayWithDDEV = installationConfig.ddev.spatieRay;
  // const includeVscodeDir =
  //   installationConfig.devConfig.vscodeWorkspaceSettings || installationConfig.devConfig.vscodeRecommendations;

  log(`\n${c.headingInfo(" Creating directories ")}\n`);

  // Create the WordPress Core directory, unless it already exists.
  await createDirectory(`${wpCoreDir}`);

  // Create the /wp-content/plugins directory, unless it already exits.
  await createDirectory(`wp-content/plugins`);

  // Create the /wp-content/themes directory, unless it already exists.
  await createDirectory(`wp-content/themes`);

  // If customPluginSlug contains a value, create the /wp-content/plugins/<custom-plugin-slug> directory
  if (customPluginSlug) await createDirectory(`wp-content/plugins/${customPluginSlug}`);

  // If customThemeSlug contains a value, create the /wp-content/themes/<custom-theme-slug> directory.
  if (customThemeSlug) await createDirectory(`wp-content/themes/${customThemeSlug}`);

  // If selected, remove filename and create the <logs> directory.
  if (logDirPath) await createDirectory(`${path.dirname(logDirPath)}`);

  // If selected, create /wp-content/docs directory.
  if (includeDocsDir) await createDirectory(`wp-content/docs`, ["dev", "reference"]);

  // If selected, create /wp-content/.vscode directory.
  // if (includeVscodeDir) await createDirectory(`wp-content/.vscode`);

  // If selected, create /.ddev directory with ray file subdirectories
  if (includeRayWithDDEV) await createDirectory(`.ddev`, ["php", "web-build"]);
}

/**
 * Creates a directory.
 *
 * @param {*} directory
 * @param {*} subdirectories
 */
async function createDirectory(directory, subdirectories = null) {
  const directoryPath = path.join(rootDirPath, directory);

  if (subdirectories && subdirectories.length >= 1) {
    for (const subdirectory of subdirectories) {
      const subdirectoryPath = path.join(directoryPath, subdirectory);
      const subdirectoryRelativePath = `${directory}/${subdirectory}`;

      try {
        await access(subdirectoryPath);
        log(c.dim(`The ${c.em(`${subdirectoryRelativePath}`)} directory already exists. Skipping creation.`));
      } catch {
        log(c.detail(`Creating ${c.em(`${subdirectoryRelativePath}`)} directory...`));
        await mkdir(subdirectoryPath, { recursive: true });
      }
    }
  } else {
    try {
      await access(directoryPath);
      log(c.dim(`The ${c.em(directory)} directory already exists. Skipping creation.`));
    } catch {
      log(c.detail(`Creating ${c.em(directory)} directory...`));
      await mkdir(directoryPath, { recursive: true });
    }
  }
}
