/**
 * RUN INSTALL COMMAND
 * @module commands/install/run-install
 */

// Import node modules
// import { spawn } from "node:child_process";

// Import configs
// import { installConfig } from "../../configs/index.js";

// Import command modules
import { initWPSetup } from "./index.js";

// import { c } from "../utils/styles.js";
// import { log } from "../utils/helpers.js";

// export function runInstallationWizard() {
//   log(c.headingInfo(` Starting Installation Wizard... `));
//   log("");
//   collectSetupSettings();
//   installSetup();
// }

// async function collectSetupSettings() {
//   const welcomeText =
//     "You will be asked to select several options for your installation, with a final review at the end to confirm.";
// }

// async function installSetup() {}

/**
 * INSTALL LOCAL WP SETUP
 */

export function runInstall() {
  // const { dns, projectName, spatieRay, uploadDirs } = installConfig.ddev;
  // const { includeToolset, includeVscodeRecommend, includeVscodeWorkspace, initGit } = installConfig.devToolset;
  initWPSetup();
}
