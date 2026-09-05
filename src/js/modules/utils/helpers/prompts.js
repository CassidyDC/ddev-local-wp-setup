/**
 * PROMPTS
 * @module utils/helpers/prompts
 */

// Import external dependencies
import pkg from "enquirer";
const { prompt } = pkg;

// Import configs
import { installationConfig } from "../../configs/index.js";

// Import helpers
import {
  c,
  generateProjectNameFromDir,
  log,
  validateDirSlug,
  validateLogPath,
  validateWPCoreDir,
  validateWPAdminEmail,
  validateWPAdminPassword,
  validateWPAdminUsername,
} from "./index.js";

/**
 * Prompts the user for configuration settings for the DDEV Local WP Setup.
 *
 * @returns {object} The installationConfig object with the user's responses.
 */
export async function cliPrompts() {
  Object.assign(installationConfig.ddev, await promptDDEVSettings());
  Object.assign(installationConfig.wordpress, await promptWordPressSettings());
  Object.assign(installationConfig.plugin, await promptPluginSettings());
  Object.assign(installationConfig.theme, await promptThemeSettings());
  Object.assign(installationConfig.devConfig, await promptDevConfigSettings());

  return installationConfig;
}

/**
 * Prompts the user for DDEV server settings.
 *
 * @returns {Promise<object>} An object with the user's responses.
 */
async function promptDDEVSettings() {
  log(`\n${c.headingInfo(" DDEV Settings ")}\n`);

  const questions = [
    {
      type: "input",
      name: "projectName",
      message: `DDEV project name: `,
      initial: generateProjectNameFromDir(),
      hint: `(This is the name of your DDEV project, which will be used to generate your DDEV domain.)`,
    },
    {
      type: "confirm",
      name: "localhost",
      message: `Use localhost to resolve your DDEV domain? `,
      initial: true,
      hint: `(If "n" is selected, your project's domain will be resolved via DNS. Using the DNS method doesn't require OS system permissions to set up, but issues can arise when you have no internet connection.)`,
    },
    {
      type: "confirm",
      name: "spatieRay",
      message: `Add Spatie Ray connection files for DDEV? `,
      initial: true,
      hint: `(Press "n" if you don't use the Spatie Ray app.)`,
    },
  ];

  return await prompt(questions);
}

/**
 * Prompts the user for WordPress settings.
 *
 * @returns {Promise<object>} An object with the user's responses.
 */
async function promptWordPressSettings() {
  log(`\n${c.headingInfo(" WordPress Settings ")}\n`);

  const questions = [
    {
      type: "select",
      name: "projectType",
      message: `What are you developing for this project? `,
      choices: ["Theme", "Plugin", "Both"],
    },
    {
      type: "input",
      name: "adminUsername",
      message: `WP Admin username: `,
      validate: validateWPAdminUsername,
    },
    {
      type: "password",
      name: "adminPassword",
      message: `WP Admin user password: `,
      validate: validateWPAdminPassword,
    },
    {
      type: "input",
      name: "adminEmail",
      message: `WP Admin user email: `,
      validate: validateWPAdminEmail,
    },
    {
      type: "input",
      name: "siteTitle",
      message: `Site title: `,
      initial: installationConfig.ddev.projectName,
    },
    {
      type: "input",
      name: "siteTagname",
      message: `Site tagname: `,
      hint: `(Leave blank if a tagname is not desired.)`,
    },
    {
      type: "input",
      name: "coreDir",
      message: `WP Core directory: `,
      initial: "/wordpress",
      hint: `(Note: /wp-content will be installed outside the WP Core directory.)`,
      validate: validateWPCoreDir,
    },
    {
      type: "confirm",
      name: "cleanState",
      message: `Install WP with a clean state? `,
      initial: true,
      hint: "(This will remove the default pages, posts, comments, plugins, and widgets from the WordPress install for a clean starting state.)",
    },
    {
      type: "confirm",
      name: "postnamePermalinks",
      message: `${c.bold(`Use ${c.yellow("%%postname%%")} for the WP permalinks? `)}`,
      initial: true,
      hint: `(If "n" is selected, permalinks will use the default date format.)`,
    },
    {
      type: "confirm",
      name: "debug",
      message: `Enable WordPress debugging"? `,
      initial: true,
    },
    {
      type(questions, answers) {
        return answers["debug"] ? "confirm" : null;
      },
      name: "debugScript",
      message: `Enable script debugging? `,
      initial: true,
      hint: `(This will include JavaScript in the debugging, instead of just PHP.)`,
    },
    {
      type(questions, answers) {
        return answers["debug"] ? "confirm" : null;
      },
      name: "debugDisplayHidden",
      message: `Hide the frontend debugging display"? `,
      initial: true,
    },
    {
      type(questions, answers) {
        return answers["debug"] ? "confirm" : null;
      },
      name: "debugLog",
      message: `Log debugging output to a file? `,
      initial: true,
    },
    {
      type(questions, answers) {
        return answers["debugLog"] ? "input" : null;
      },
      name: "debugLogPath",
      message: `Debug log file path: `,
      initial: "/wp-content/logs/wp-errors.log",
      hint: `(Enter a path, including the filename, relative to your project's root.)`,
      validate: validateLogPath,
    },
    {
      type: "select",
      name: "wpEnvType",
      message: `WP_ENVIRONMENT_TYPE: `,
      choices: ["Local", "Development", "Staging", "Production"],
      hint: "Use 'Local' unless you have a specific need for another type.",
    },
    {
      type: "select",
      name: "wpDevMode",
      message: `WP_DEVELOPMENT_MODE: `,
      choices: ["Theme", "Plugin", "Core", "All"],
    },
    {
      type: "confirm",
      name: "homepage",
      message: `Add a non-blog homepage? `,
      initial: true,
      hint: `(This creates a new blank page named "Homepage" and sets it as the WordPress front page.)`,
    },
  ];

  return await prompt(questions);
}

/**
 * Prompts the user for Plugin settings.
 *
 * @returns {Promise<object>} An object with the user's responses.
 */
async function promptPluginSettings() {
  log(`\n${c.headingInfo(" Plugin Settings ")}\n`);

  const questions = [
    {
      type: ["Plugin", "Both"].includes(installationConfig.wordpress.projectType) ? "confirm" : null,
      name: "custom",
      message: `Create a new custom plugin directory? `,
    },
    {
      type(questions, answers) {
        return answers["custom"] ? "input" : null;
      },
      name: "customSlug",
      message: `Set your custom plugin directory slug: `,
      hint: "(Use only lowercase letter, digits, and dashes, such as `cassidydc-core-plugin`)",
      validate: validateDirSlug,
    },
    {
      type: "confirm",
      name: "ai1wm",
      message: `Install the All-in-One WP Migration plugin? `,
      initial: true,
      hint: `(Press "n" if you don't use this plugin.)`,
    },
  ];

  return await prompt(questions);
}

/**
 * Prompts the user for Theme settings.
 *
 * @returns {Promise<object>} An object with the user's responses.
 */
async function promptThemeSettings() {
  log(`\n${c.headingInfo(" Theme Settings ")}\n`);

  const questions = [
    {
      type: ["Theme", "Both"].includes(installationConfig.wordpress.projectType) ? "confirm" : null,
      name: "custom",
      message: `Create a new custom theme directory? `,
    },
    {
      type(questions, answers) {
        return answers["custom"] ? "input" : null;
      },
      name: "customSlug",
      message: `Set your custom theme directory slug: `,
      hint: "(Use only lowercase letter, digits, and dashes, such as `cassidydc-block-theme`)",
      validate: validateDirSlug,
    },
    {
      type(questions, answers) {
        return answers["custom"] ? "confirm" : null;
      },
      name: "customStarterFiles",
      message: `Use the CassidyDC Starter Block Theme files for your new theme? `,
      initial: true,
    },
    {
      type: "confirm",
      name: "default",
      message: `Include the default WordPress theme? `,
      initial: true,
      hint: `(Recommended as a fallback theme.)`,
    },
  ];

  return await prompt(questions);
}

/**
 * Prompts the user for development config settings.
 *
 * @returns {Promise<object>} An object with the user's responses.
 */
async function promptDevConfigSettings() {
  log(`\n${c.headingInfo(" Development Config Settings ")}\n`);

  const questions = [
    {
      type: "confirm",
      name: "toolsetWPContent",
      message: `Add the CassidyDC Toolset to /wp-content? `,
      initial: true,
    },
    {
      type: installationConfig.plugin.custom ? "confirm" : null,
      name: "toolsetCustomPlugin",
      message: `Add the CassidyDC WP Dev Plugin Toolset to your custom plugin? `,
      initial: true,
    },
    {
      type: installationConfig.theme.custom ? "confirm" : null,
      name: "toolsetCustomTheme",
      message: `Add the CassidyDC WP Dev Toolset to your custom theme? `,
      initial: true,
    },
    {
      type: "confirm",
      name: "git",
      message: `${c.bold(`Initialize a local Git repo and ${c.yellow(".gitignore")} file for /wp-content? `)}`,
      initial: true,
    },
    {
      type: "confirm",
      name: "vscodeWorkspaceSettings",
      message: `Add the CassidyDC VSCode Workspace Settings file? `,
      initial: true,
    },
    {
      type: "confirm",
      name: "vscodeRecommendations",
      message: `Add the CassidyDC VSCode Extensions Recommendations file? `,
      initial: true,
    },
  ];

  return await prompt(questions);
}
