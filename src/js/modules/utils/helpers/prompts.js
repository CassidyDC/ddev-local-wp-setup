/**
 * PROMPTS
 * @module utils/helpers/prompts
 */

// Import node modules
import process from "node:process";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";

// Import packages
import pkg from "enquirer";

// Import components
import { displayHeading } from "../../components/index.js";

// Import configs
import { installationConfig, settingsSchema } from "../../configs/index.js";

// Import helpers
import { c, pkgJSON, log, validateExecInstaller } from "./index.js";

const { prompt } = pkg;

/**
 * Offers to reuse the configuration in the current directory, if present.
 */
export async function checkForExistingConfig() {
  const configPath = path.join(process.cwd(), "ddev-local-wp-setup-config.json");

  try {
    if (!(await stat(configPath)).isFile()) return;
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }

  if (!(await configExistsPrompt())) return;

  const config = JSON.parse(await readFile(configPath, "utf8"));
  if (!config || typeof config !== "object" || Array.isArray(config)) {
    throw new Error("The existing configuration must be a JSON object.");
  }

  return config;
}

/**
 * Asks whether to reuse the existing configuration or start from scratch.
 */
export async function configExistsPrompt() {
  const existingConfigFilepath = path.join(process.cwd(), "ddev-local-wp-setup-config.json");

  log(c.warn(`An existing configuration file was found at: ${c.detail(existingConfigFilepath)}\n`));

  const { useExistingConfig } = await prompt({
    type: "select",
    name: "useExistingConfig",
    message: `How would you like to proceed?`,
    choices: [
      {
        name: "continue",
        message: "Continue with the existing config.",
        hint: "(You will be prompted for any missing details.)",
      },
      {
        name: "restart",
        message: "Start the installation wizard from scratch.",
        hint: "(A backup of your existing config will be saved.)",
      },
    ],
  });

  return useExistingConfig === "continue";
}

/**
 * The installation execution confirmation prompt when completing the installation wizard.
 */
export async function installationExecPrompt() {
  log(`\n${c.success("All settings have been collected.")}\n`);

  const { answer } = await prompt({
    type: "input",
    name: "answer",
    message: c.info(`Type ${c.bold("run")} to start the installer, or type ${c.bold("exit")} to quit:`),
    validate: validateExecInstaller,
  });

  if (answer.trim().toLowerCase() === "exit") {
    process.exit(0);
  }

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

  const { answer } = await prompt({
    type: "input",
    name: "answer",
    message: c.info(`Press ${c.bold("Enter")} to continue, or type ${c.bold("exit")} to quit:`),
  });

  if (answer.trim().toLowerCase() === "exit") {
    process.exit(0);
  }
}

/**
 * Collect missing answers sequentially using saved settings and earlier answers.
 *
 * @param {object} existingConfig Previously saved settings to reuse.
 * @returns {Promise<object>} The installation configuration with the user's responses.
 */
export async function settingsPrompts(existingConfig = {}) {
  const headings = {
    ddev: "DDEV Settings",
    wordpress: "WordPress Settings",
    plugin: "Plugin Settings",
    theme: "Theme Settings",
    devConfig: "Development Config Settings",
  };

  for (const section of Object.keys(settingsSchema)) {
    installationConfig[section] = { ...existingConfig[section] };
  }

  for (const [section, settings] of Object.entries(settingsSchema)) {
    let headingShown = false;

    for (const [name, setting] of Object.entries(settings)) {
      const { enabled = true, initial, ...options } = setting;
      const isEnabled = typeof enabled === "function" ? enabled(installationConfig) : enabled;
      if (!isEnabled) continue;
      if (Object.hasOwn(installationConfig[section], name)) continue;

      if (!headingShown) {
        log(`\n${c.headingInfo(` ${headings[section]} `)}\n`);
        headingShown = true;
      }

      const resolvedInitial = typeof initial === "function" ? initial(installationConfig) : initial;
      const answer = await prompt({ ...options, name, initial: resolvedInitial });
      installationConfig[section][name] = answer[name];
    }
  }

  return installationConfig;
}
