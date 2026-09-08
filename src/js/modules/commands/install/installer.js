/**
 * DDEV Local WP Setup Installer
 * @module commands/install/installer
 */

// Import helpers
import { installationExecPrompt, installationStartupPrompt, settingsPrompts } from "../../utils/helpers/index.js";

// Import installer initiation modules.
import { initFilesystem, initToolsets, initDDEV, initWordPress } from "./index.js";

/**
 * Installs the local development DDEV WordPress server.
 */
export async function runInstaller() {
  await installationStartupPrompt();
  await settingsPrompts();
  await installationExecPrompt();
  await initFilesystem();
  // await initToolsets();
  // await initDDEV();
  // await initWordPress();
}
