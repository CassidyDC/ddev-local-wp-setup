/**
 * DDEV Local WP Setup Installer
 * @module commands/install/installer
 */

// Import file creators
import { createConfigFile } from "./create/files/config.js";

// Import helpers
import {
  checkForExistingConfig,
  installationExecPrompt,
  installationStartupPrompt,
  settingsPrompts,
} from "../../utils/helpers/index.js";

// Import installer initiation modules.
import { initFilesystem, initToolsets, initDDEV, initWordPress } from "./index.js";

/**
 * Installs the local development DDEV WordPress server.
 */
export async function runInstaller() {
  const existingConfig = await checkForExistingConfig();
  if (!existingConfig) {
    await installationStartupPrompt();
  }
  const userSettingsConfig = await settingsPrompts(existingConfig);
  await createConfigFile(userSettingsConfig, existingConfig);
  await installationExecPrompt();
  await initFilesystem(); // CONTINUE HERE
  // await initToolsets();
  // await initDDEV();
  // await initWordPress();
}
