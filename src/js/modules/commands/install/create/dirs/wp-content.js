/**
 * CREATE WP-CONTENT DIRECTORIES
 * @module commands/install/create/dirs/wp-content
 */

// Import node modules
import { access, mkdir } from "node:fs/promises";
import path from "node:path";

// Import helpers
import { c, log } from "../../../../utils/helpers/index.js";

/**
 * Creates the <root>/wp-content directory and inner themes and plugins directories.
 *
 * @param {string} rootDirPath The DDEV server root path.
 */
export async function createWPContentDirs(rootDirPath, installationConfig) {
  log(c.headingInfo("\n Creating wp-content directories \n"));

  const customThemeSlug = installationConfig.wordpress.customThemeSlug;
  const customPluginSlug = installationConfig.wordpress.customPluginSlug;

  // Create the /wp-content directory, unless it already exists.
  const wpContentPath = path.join(rootDirPath, "wp-content");
  try {
    await access(wpContentPath);
    log(c.dim(`The ${c.bold("/wp-content")} directory already exists. Skipping creation.`));
  } catch {
    log(c.detail(`Creating the ${c.bold("/wp-content")} directory...`));
    await mkdir(wpContentPath, { recursive: true });
  }

  // Create the /wp-content/themes directory, unless it already exists.
  const themesPath = path.join(wpContentPath, "themes");
  try {
    await access(themesPath);
    log(c.dim(`The ${c.bold("/wp-content/themes")} directory already exists. Skipping creation.`));
  } catch {
    log(c.detail(`Creating the ${c.bold("/wp-content/themes")} directory...`));
    await mkdir(themesPath, { recursive: true });
  }

  // Create the /wp-content/plugins directory, unless it already exits.
  const pluginsPath = path.join(wpContentPath, "plugins");
  try {
    await access(pluginsPath);
    log(c.dim(`The ${c.bold("/wp-content/plugins")} directory already exists. Skipping creation.`));
  } catch {
    log(c.detail(`Creating the ${c.bold("/wp-content/plugins")} directory...`));
    await mkdir(pluginsPath, { recursive: true });
  }

  // If customThemeSlug contains a value, create the /wp-content/themes/<custom-theme-slug> directory.
  if (customThemeSlug) {
    const customThemePath = path.join(themesPath, customThemeSlug);
    try {
      await access(customThemePath);
      log(c.detail(`/wp-content/themes/${customThemeSlug} already exists. Skipping creation.`));
    } catch {
      log(c.detail(`Creating the /wp-content/themes/${customThemeSlug} directory.`));
      await mkdir(customThemePath, { recursive: true });
    }
  }

  // If customPluginSlug contains a value, create the /wp-content/plugins/<custom-plugin-slug> directory
  if (customPluginSlug) {
    const customPluginPath = path.join(pluginsPath, customPluginSlug);
    try {
      await access(customPluginPath);
      log(c.detail(`/wp-content/plugins/${customPluginSlug} already exists. Skipping creation.`));
    } catch {
      log(c.detail(`Creating the /wp-content/plugins/${customPluginSlug} directory.`));
      await mkdir(customPluginPath, { recursive: true });
    }
  }
}
