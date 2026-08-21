/**
 * RUN INSTALL COMMAND
 * @module commands/install/run-install
 */

// Import node modules
// import { spawn } from "node:child_process";

// Import configs
// import { installConfig } from "../../configs/index.js";

// Import command modules
// import { initWPSetup } from "../index.js";

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

// Import install modules
import { initFileStructure, initDevToolsets, initDDEVSetup, initWPSetup } from "../index.js";

/**
 * Installs the local development server with DDEV and WordPress.
 */
export async function runInstall() {
  console.log("Running runInstall()");

  // const { dns, projectName, spatieRay, uploadDirs } = installConfig.ddev;
  // const { includeToolset, includeVscodeRecommend, includeVscodeWorkspace, initGit } = installConfig.devToolset;

  await initFileStructure();
  // - Add <root>/composer.json with roots/wordpress package and WP Core directory (default: "wordpress")
  // - Install WP Core
  // - Add <root>/index.php file
  // - Add <root>/wp-cli.yml file
  // - Create <root>/wp-content directory
  // - Create <root>/wp-content/plugins directory
  // - Create <root>/wp-content/themes directory
  // - Create any custom theme or plugin directories, such as <root/wp-content/themes/cassidydc-block-theme
  // - Add custom block theme starter files if requested
  // - Create <root>/wp-content/logs directory, unless logs turned off
  // - Create <root/wp-content/docs/dev & reference directories with starting files.
  // - Create <root>/wp-content/README.md & CHANGELOG.md

  await initDevToolsets();
  // - Add CassidyDC Toolsets to any custom plugin/theme that includes it
  // - Add CassidyDC Toolset to <root>/wp-content
  // - Init Git with .gitignore

  await initDDEVSetup();
  // - Add ray connection files:
  //    - Add <root>/.ddev/php/php-ray.ini
  //    - Add <root>/.ddev/web-build/Dockerfile
  //    - Add <root>/ray.php

  await initWPSetup();
}
