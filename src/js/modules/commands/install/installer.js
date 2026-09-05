/**
 * Installer
 * @module commands/install/installer
 */

// Import node modules
import readline from "node:readline/promises";
import process, { stdin as input, stdout as output } from "node:process";

// Import helpers
import { c, cliPrompts, log } from "../../utils/helpers/index.js";

// import { spawn } from "node:child_process";

// Import configs
// import { installationConfig } from "../../configs/index.js";

// Import command modules
// import { initWPSetup } from "../index.js";

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
// import { initFileStructure, initDevToolsets, initDDEVSetup, initWPSetup } from "../index.js";

/**
 * Installs the local development server with DDEV and WordPress.
 */
export async function runInstaller() {
  await displayStartupPrompt();
  const promptResults = await cliPrompts();
  log(`\n`, "promptResults:", promptResults);

  // console.log(JSON.stringify(promptResults, (key, value) => (key === "adminPassword" ? "[REDACTED]" : value)));

  // const { dns, projectName, spatieRay, uploadDirs } = installationConfig.ddev;
  // const { includeToolset, includeVscodeRecommend, includeVscodeWorkspace, initGit } = installationConfig.devToolset;

  // await initFileStructure();
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

  // await initDevToolsets();
  // - Add CassidyDC Toolsets to any custom plugin/theme that includes it
  // - Add CassidyDC Toolset to <root>/wp-content
  // - Init Git with .gitignore

  // await initDDEVSetup();
  // - Add ray connection files:
  //    - Add <root>/.ddev/php/php-ray.ini
  //    - Add <root>/.ddev/web-build/Dockerfile
  //    - Add <root>/ray.php

  // await initWPSetup();
}

async function displayStartupPrompt() {
  log(`${c.headingInfo(" Installation Wizard ")}\n`);
  log(
    c.warn(
      `${c.em(">")} Make sure you are running this wizard from the directory you want to install your local DDEV server in.`,
    ),
  );
  log(`${c.em("> Your current directory is: ")}${c.detail(process.cwd())}`);
  log(
    `${c.em("> If that is not where you want your installation, exit the wizard and restart it from the correct directory.")}\n`,
  );

  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(
    `${c.info(`Press ${c.bold("Enter")} to continue, or type ${c.bold("exit")} to quit: `)}`,
  );

  rl.close();

  if (answer.trim().toLowerCase() === "exit") {
    process.exit(0);
  }
}
