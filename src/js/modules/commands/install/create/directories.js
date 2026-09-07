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
  const customThemeSlug = installationConfig.wordpress.customThemeSlug;
  const customPluginSlug = installationConfig.wordpress.customPluginSlug;
  const wpContentPath = path.join(rootDirPath, "wp-content");
  const logDirPath = installationConfig.wordpress.debugLogPath;
  const includeDocsDir = installationConfig.devConfig.docs;
  const includeRayWithDDEV = installationConfig.ddev.spatieRay;
  const includeVscodeDir =
    installationConfig.devConfig.vscodeWorkspaceSettings || installationConfig.devConfig.vscodeRecommendations;

  log(`\n${c.headingInfo(" Creating directories... ")}\n`);

  // Create WordPress Core directory
  const wpCoreDir = installationConfig.wordpress.coreDir;
  const wpCoreDirPath = path.join(rootDirPath, wpCoreDir);

  // Create the WordPress Core directory, unless it already exists.
  try {
    await access(wpCoreDirPath);
    log(c.dim(`The ${c.em(`${wpCoreDir}`)} directory already exists. Skipping creation.`));
  } catch {
    log(c.detail(`Creating the ${c.em(`${wpCoreDir}`)} directory...`));
    await mkdir(wpCoreDirPath, { recursive: true });
    log(c.green(`${c.bold("Success:")} ${wpCoreDir} created.`));
  }

  // Create the /wp-content/plugins directory, unless it already exits.
  const pluginsPath = path.join(wpContentPath, "plugins");
  try {
    await access(pluginsPath);
    log(c.dim(`The ${c.em("/wp-content/plugins")} directory already exists. Skipping creation.`));
  } catch {
    log(c.detail(`Creating the ${c.em("/wp-content/plugins")} directory...`));
    await mkdir(pluginsPath, { recursive: true });
    log(c.green(`${c.bold("Success:")} /wp-content/plugins created.`));
  }

  // Create the /wp-content/themes directory, unless it already exists.
  const themesPath = path.join(wpContentPath, "themes");
  try {
    await access(themesPath);
    log(c.dim(`The ${c.em("/wp-content/themes")} directory already exists. Skipping creation.`));
  } catch {
    log(c.detail(`Creating the ${c.em("/wp-content/themes")} directory...`));
    await mkdir(themesPath, { recursive: true });
    log(c.green(`${c.bold("Success:")} /wp-content/themes created.`));
  }

  // If customPluginSlug contains a value, create the /wp-content/plugins/<custom-plugin-slug> directory
  if (customPluginSlug) {
    const customPluginPath = path.join(pluginsPath, customPluginSlug);
    try {
      await access(customPluginPath);
      log(c.dim(`The ${c.em(`/wp-content/plugins/${customPluginSlug}`)} directory already exists. Skipping creation.`));
    } catch {
      log(c.detail(`Creating the ${c.em(`/wp-content/plugins/${customPluginSlug}`)} directory.`));
      await mkdir(customPluginPath, { recursive: true });
      log(c.green(`${c.bold("Success:")} /wp-content/plugins/${customPluginSlug} created.`));
    }
  }

  // If customThemeSlug contains a value, create the /wp-content/themes/<custom-theme-slug> directory.
  if (customThemeSlug) {
    const customThemePath = path.join(themesPath, customThemeSlug);
    try {
      await access(customThemePath);
      log(c.dim(`The ${c.em(`/wp-content/themes/${customThemeSlug}`)} directory already exists. Skipping creation.`));
    } catch {
      log(c.detail(`Creating the ${c.em(`/wp-content/themes/${customThemeSlug}`)} directory.`));
      await mkdir(customThemePath, { recursive: true });
      log(c.green(`${c.bold("Success:")} /wp-content/themes/${customThemeSlug} created.`));
    }
  }

  // If selected, create the <logs> directory.
  if (logDirPath) {
    const logDirnamePath = path.dirname(logDirPath);
    const logDirectoryPath = path.join(rootDirPath, logDirnamePath);

    try {
      await access(logDirectoryPath);
      log(c.dim(`The ${c.em(logDirnamePath)} directory already exists. Skipping creation.`));
    } catch {
      log(c.detail(`Creating the ${c.em(logDirnamePath)} directory...`));
      await mkdir(logDirectoryPath, { recursive: true });
      log(c.green(`${c.bold("Success:")} ${logDirnamePath} created.`));
    }
  }

  // If selected, create /wp-content/docs directory.
  if (includeDocsDir) {
    const docsPath = path.join(wpContentPath, "docs");
    const docsDirectories = ["dev", "references"];

    for (const docsDirectory of docsDirectories) {
      const docsDirectoryPath = path.join(docsPath, docsDirectory);

      try {
        await access(docsDirectoryPath);
        log(c.dim(`The ${c.em(`/wp-content/docs/${docsDirectory}`)} directory already exists. Skipping creation.`));
      } catch {
        log(c.detail(`Creating the ${c.em(`/wp-content/docs/${docsDirectory}`)} directory...`));
        await mkdir(docsDirectoryPath, { recursive: true });
        log(c.green(`${c.bold("Success:")} /wp-content/docs/${docsDirectory} created.`));
      }
    }
  }

  // If selected, create /wp-content/.vscode directory.
  if (includeVscodeDir) {
    const vscodeDirPath = path.join(rootDirPath, ".vscode");

    try {
      await access(vscodeDirPath);
      log(c.dim(`The ${c.em("/wp-content/.vscode")} directory already exists. Skipping creation.`));
    } catch {
      log(c.detail(`Creating the ${c.em("/wp-content/.vscode")} directory...`));
      await mkdir(vscodeDirPath, { recursive: true });
      log(c.green(`${c.bold("Success:")} /wp-content/.vscode created.`));
    }
  }

  // If selected, create /.ddev directory with ray file subdirectories
  if (includeRayWithDDEV) {
    const ddevPath = path.join(rootDirPath, ".ddev");
    const ddevDirectories = ["php", "web-build"];

    for (const ddevDirectory of ddevDirectories) {
      const ddevDirectoryPath = path.join(ddevPath, ddevDirectory);

      try {
        await access(ddevDirectoryPath);
        log(c.dim(`The ${c.em(`/.ddev/${ddevDirectory}`)} directory already exists. Skipping creation.`));
      } catch {
        log(c.detail(`Creating the ${c.em(`/.ddev/${ddevDirectory}`)} directory...`));
        await mkdir(ddevDirectoryPath, { recursive: true });
        log(c.green(`${c.bold("Success:")} /.ddev/${ddevDirectory} created.`));
      }
    }
  }
}
