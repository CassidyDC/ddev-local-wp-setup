/**
 * PROMPTS
 * @module utils/helpers/prompts
 */

// Import node processes
import process from "node:process";

// Import external dependencies
import pkg from "enquirer";
const { prompt, Confirm } = pkg;

// Import helpers
import { c, log, validateWPEmail, validateWPPassword, validateWPUsername } from "./index.js";

/**
 *
 * @returns {object} The prompt config settings
 */
export async function cliPrompts() {
  const ddevServerSettings = await promptDDEVServerSettings();
  const wpCoreSettings = await promptWPCoreSettings();
  const wpAdminSettings = await promptWPAdminSettings();
  const projectSettings = await promptProjectSettings();
  const devConfigSettings = await promptDevConfigSettings();

  return {
    ddev: ddevServerSettings,
    devToolset: devConfigSettings,
    project: projectSettings,
    wpAdmin: wpAdminSettings,
    wpCore: wpCoreSettings,
  };
}

async function promptDDEVServerSettings() {
  log(`\n${c.headingInfo(" Local DDEV Server Settings ")}\n`);

  const questions = [
    {
      type: "input",
      name: "ddev-project-slug",
      message: `Set your DDEV project name: `,
      hint: `(Leave blank to use the current directory for the name, minus any leading non-alphanumeric characters and trailing ".ddev.site")`,
    },
    {
      type: "confirm",
      name: "ddev-use-localhost",
      message: `Use localhost to resolve your DDEV domain? `,
      initial: true,
      hint: `(If false is set, your project's domain will be resolved via DNS. Using the DNS method doesn't require OS system permissions to set up, but issues can arise when you have no internet connection.)`,
    },
    {
      type: "confirm",
      name: "ddev-ray-connection",
      message: `Add Spatie Ray connection files for DDEV? `,
      initial: true,
      hint: `(Press "n" if you don't use the Spatie Ray app.)`,
    },
  ];

  return await prompt(questions);
}

async function promptWPCoreSettings() {
  log(`\n${c.headingInfo(" WordPress Core Settings ")}\n`);

  const questions = [
    {
      type: "input",
      name: "wp-core-dir",
      message: `Set your WP Core directory: `,
      hint: `(Leave blank to use the "/wordpress" directory. Note: wp-content will be installed outside this directory.)`,
    },
    {
      type: "confirm",
      name: "wp-core-clean",
      message: `Install WP with a clean state? `,
      initial: true,
      hint: "(This will remove all default pages, posts, comments, plugins, and widgets from the WordPress install for a clean starting state.)",
    },
    {
      type: "confirm",
      name: "wp-core-theme-default",
      message: `Include the default WordPress theme? `,
      initial: true,
      hint: `(Recommended as a fallback theme.)`,
    },
    {
      type: "confirm",
      name: "wp-core-permalinks-postname",
      message: `Use %%postname%% for the WP permalinks? `,
      initial: true,
      hint: `(If set to false, permalinks will use the default date format)`,
    },
    {
      type: "confirm",
      name: "wp-core-debug",
      message: `Enable WordPress debugging"? `,
      initial: true,
    },
    {
      type(questions, answers) {
        return answers["wp-core-debug"] ? "confirm" : null;
      },
      name: "wp-core-debug-display",
      message: `Hide the frontend debugging display"? `,
      initial: true,
    },
    {
      type(questions, answers) {
        return answers["wp-core-debug"] ? "confirm" : null;
      },
      name: "wp-core-debug-log",
      message: `Log debugging output to a file? `,
      initial: true,
    },
    {
      type(questions, answers) {
        return answers["wp-core-debug-log"] ? "input" : null;
      },
      name: "wp-core-debug-log-path",
      message: `Where do you want to store the log file? `,
      hint: `(Leave blank to use "/wp-content/logs/wp-errors.log", or enter a path (including the filename), relative to your project's root)`,
    },
    {
      type(questions, answers) {
        return answers["wp-core-debug"] ? "confirm" : null;
      },
      name: "wp-core-debug-script",
      message: `Enable script debugging too? `,
      initial: true,
    },
  ];

  return await prompt(questions);
}

async function promptWPAdminSettings() {
  log(`\n${c.headingInfo(" WordPress Admin Settings ")}\n`);

  const questions = [
    {
      type: "input",
      name: "wp-admin-username",
      message: `Set your WP Admin username: `,
      validate: validateWPUsername,
    },
    {
      type: "password",
      name: "wp-admin-password",
      message: `Set your WP Admin user password: `,
      validate: validateWPPassword,
    },
    {
      type: "input",
      name: "wp-admin-email",
      message: `Set your WP Admin user email: `,
      validate: validateWPEmail,
    },
    {
      type: "input",
      name: "wp-site-title",
      message: `Set your WP site title: `,
      hint: `(Leave blank to use the DDEV project name.)`,
    },
    {
      type: "input",
      name: "wp-site-tagname",
      message: `Set your WP site tagname: `,
      hint: `(Leave blank if a tagname is not desired.)`,
    },
  ];

  return await prompt(questions);
}

async function promptProjectSettings() {
  log(`\n${c.headingInfo(" Project Settings ")}\n`);

  const questions = [
    {
      type: "select",
      name: "project-type",
      message: `Are you developing a WordPress Theme, Plugin, or both? `,
      choices: ["Theme", "Plugin", "Both"],
    },

    // Theme follow-up questions
    {
      type(question, answers) {
        return ["Theme", "Both"].includes(answers["project-type"]) ? "confirm" : null;
      },
      name: "project-custom-theme",
      message: `Create a new custom theme directory? `,
    },
    {
      type(questions, answers) {
        return answers["project-custom-theme"] ? "input" : null;
      },
      name: "project-custom-theme-slug",
      message: `Set your custom theme directory slug: `,
      hint: "(Use only lowercase letter, digits, and dashes, such as `cassidydc-block-theme`)",
    },
    {
      type(questions, answers) {
        return answers["project-custom-theme"] ? "confirm" : null;
      },
      name: "project-custom-theme-stater-files",
      message: `Use the CassidyDC Starter Block Theme files for your new theme? `,
      initial: true,
    },

    // Plugin follow-up questions
    {
      type(question, answers) {
        return ["Plugin", "Both"].includes(answers["project-type"]) ? "confirm" : null;
      },
      name: "project-custom-plugin",
      message: `Create a new custom plugin directory? `,
    },
    {
      type(questions, answers) {
        return answers["project-custom-plugin"] ? "input" : null;
      },
      name: "project-custom-plugin-slug",
      message: `Set your custom plugin directory slug: `,
      hint: "(Use only lowercase letter, digits, and dashes, such as `cassidydc-core-plugin`)",
    },

    {
      type: "confirm",
      name: "project-plugin-ai1m",
      message: `Install the All-in-One WP Migration plugin? `,
      initial: true,
      hint: `(Press "n" if you don't use this plugin.)`,
    },
    {
      type: "select",
      name: "project-wp-env-type",
      message: `Set your WP_ENVIRONMENT_TYPE: `,
      choices: ["Local", "Development", "Staging", "Production"],
      hint: "If you're not sure, use 'Local'.",
    },
    {
      type: "select",
      name: "project-wp-dev-mode",
      message: `Set your WP_DEVELOPMENT_MODE: `,
      choices: ["Theme", "Plugin", "Core", "All"],
    },
    {
      type: "confirm",
      name: "project-add-homepage",
      message: `Add a non-blog homepage? `,
      initial: true,
      hint: `(This creates a new blank page named "Homepage" and sets it as the WordPress front page.)`,
    },
  ];

  return await prompt(questions);
}

async function promptDevConfigSettings() {
  log(`\n${c.headingInfo(" Development Config Settings ")}\n`);

  const questions = [
    {
      type: "confirm",
      name: "dev-config-git",
      message: `Initialize a local git repo and .gitignore file for '/wp-content'? `,
      initial: true,
    },
    {
      type: "confirm",
      name: "dev-config-cassidydc-toolset",
      message: `Add the CassidyDC Dev WP Toolset to '/wp-content'? `,
      initial: true,
    },
    {
      type: "confirm",
      name: "dev-config-vscode-workspace",
      message: `Add the CassidyDC VSCode workspace settings file? `,
      initial: true,
    },
    {
      type: "confirm",
      name: "dev-config-vscode-recommendations",
      message: `Add the CassidyDC VSCode recommended extensions file? `,
      initial: true,
    },
    {
      type(questions, answers) {
        return answers["project-custom-theme"] ? "confirm" : null;
      },
      name: "dev-config-custom-theme-toolset",
      message: `Add the CassidyDC Dev WP Theme Toolset to your custom theme? `,
      initial: true,
    },
    {
      type(questions, answers) {
        return answers["project-custom-plugin"] ? "confirm" : null;
      },
      name: "dev-config-custom-plugin-toolset",
      message: `Add the CassidyDC Dev WP Plugin Toolset to your custom plugin? `,
      initial: true,
    },
  ];

  return await prompt(questions);
}
