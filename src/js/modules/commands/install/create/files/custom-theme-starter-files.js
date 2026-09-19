/**
 * CREATE CUSTOM THEME STARTER FILES
 * @module commands/install/create/files/custom-theme-starter-files
 */

// Import node modules
// import path from "node:path";
// import { writeFile } from "node:fs/promises";

// Import helpers
import { c, log } from "../../../../utils/helpers/index.js";

/**
 * Creates custom theme starter files.
 */
export async function createCustomThemeStarterFile(customThemeConfig) {
  if (!customThemeConfig) return;

  log(c.detail(`Creating \`wp-content/themes/${customThemeConfig.slug}\` file...`));
}
