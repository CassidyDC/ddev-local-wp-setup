/**
 * PROMPTS
 * @module utils/helpers/prompts
 */

// Import node modules
import readline from "node:readline/promises";
import process, { stdin as input, stdout as output } from "node:process";

// Import packages
import pkg from "enquirer";

// Import components
import { displayHeading } from "../../components/index.js";

// Import configs
import { installationConfig, settingsSchema } from "../../configs/index.js";

// Import helpers
import { c, pkgJSON, log } from "./index.js";

const { prompt } = pkg;

/**
 * The installation execution confirmation prompt when completing the installation wizard.
 */
export async function installationExecPrompt() {
  displayHeading(c.yellow(`Running the ${c.bold(pkgJSON.displayName)} installer...`));
}

/**
 * The initial prompt when running the installation wizard.
 */
export async function installationStartupPrompt() {
  log(`\n${c.headingInfo(" Installation Wizard ")}\n`);
  log(c.warn(`Run this wizard from the directory where you want to install your local DDEV server.`));
  log(c.warn(`Current directory: ${c.detail(process.cwd())}`));
  log(c.warn(`To use a different directory, exit the wizard and restart it there.\n`));

  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(
    `${c.info(`Press ${c.bold("Enter")} to continue, or type ${c.bold("exit")} to quit: `)}`,
  );

  rl.close();

  if (answer.trim().toLowerCase() === "exit") {
    process.exit(0);
  }
}

/**
 * Collect answers sequentially so defaults and conditions can use earlier answers.
 *
 * @returns {Promise<object>} The installation configuration with the user's responses.
 */
export async function settingsPrompts() {
  const headings = {
    ddev: "DDEV Settings",
    wordpress: "WordPress Settings",
    plugin: "Plugin Settings",
    theme: "Theme Settings",
    devConfig: "Development Config Settings",
  };

  for (const section of Object.keys(settingsSchema)) {
    installationConfig[section] = {};
  }

  for (const [section, settings] of Object.entries(settingsSchema)) {
    log(`\n${c.headingInfo(` ${headings[section]} `)}\n`);

    for (const [name, setting] of Object.entries(settings)) {
      const { enabled = true, initial, ...options } = setting;
      const isEnabled = typeof enabled === "function" ? enabled(installationConfig) : enabled;
      if (!isEnabled) continue;

      const resolvedInitial = typeof initial === "function" ? initial(installationConfig) : initial;
      const answer = await prompt({ ...options, name, initial: resolvedInitial });
      installationConfig[section][name] = answer[name];
    }
  }

  return installationConfig;
}
