/**
 * CREATE CUSTOM PLUGIN STARTER FILES
 * @module commands/install/create/files/custom-plugin-starter-files
 */

// Import node modules
// import path from "node:path";
// import { writeFile } from "node:fs/promises";

// Import helpers
import { c, log } from "../../../../utils/helpers/index.js";

/**
 * Creates custom plugin starter files.
 */
export async function createCustomPluginStarterFile(customPluginConfig) {
  if (!customPluginConfig) return;

  log(c.detail(`Creating \`wp-content/plugins/${customPluginConfig.slug}\` file...`));
}
