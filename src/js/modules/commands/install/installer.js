/**
 * DDEV Local WP Setup Installer
 * @module commands/install/installer
 */

// Import file creators
import { createConfigFile } from "./create/files/user-settings-config.js";

// Import helpers
import { installationExecPrompt, installationStartupPrompt, settingsPrompts } from "../../utils/helpers/index.js";

// Import installer initiation modules.
import { initFilesystem, initToolsets, initDDEV, initWordPress } from "./index.js";

/**
 * Installs the local development DDEV WordPress server.
 */
export async function runInstaller() {
  await installationStartupPrompt();

  const userSettingsConfig = await settingsPrompts();

  await createConfigFile(userSettingsConfig);
  await installationExecPrompt();
  await initFilesystem(); // CONTINUE HERE
  // await initToolsets();
  // await initDDEV();
  // await initWordPress();
}
