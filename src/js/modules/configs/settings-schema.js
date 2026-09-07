/**
 * SETTINGS SCHEMA
 * @module configs/settings-schema
 */

// Import helpers
import {
  generateProjectNameFromDir,
  generateNamespaceFromName,
  generateSlugFromName,
  generateTextDomainFromName,
} from "../utils/helpers/generate.js";

import { c } from "../utils/helpers/styles.js";

import {
  validateDirSlug,
  validateLogPath,
  validateNamespace,
  validateWPCoreDir,
  validateWPAdminEmail,
  validateWPAdminPassword,
  validateWPAdminUsername,
} from "../utils/helpers/validate.js";

export const settingsSchema = {
  ddev: {
    projectName: {
      type: "input",
      message: "DDEV project name:",
      initial: generateProjectNameFromDir,
      hint: `(This is the name of your DDEV project, which will be used to generate your DDEV domain.)`,
    },

    localhost: {
      type: "confirm",
      message: "Use localhost to resolve your DDEV domain?",
      initial: true,
      hint: `(If "n" is selected, your project's domain will be resolved via DNS. Using the DNS method doesn't require OS system permissions to set up, but issues can arise when you have no internet connection.)`,
    },

    spatieRay: {
      type: "confirm",
      message: "Add Spatie Ray connection files for DDEV?",
      initial: true,
      hint: `(Press "n" if you don't use the Spatie Ray app.)`,
    },
  },

  wordpress: {
    adminUsername: {
      type: "input",
      message: "WP Admin Username:",
      validate: validateWPAdminUsername,
    },

    adminPassword: {
      type: "password",
      message: "WP Admin Password:",
      secret: true,
      validate: validateWPAdminPassword,
    },

    adminEmail: {
      type: "input",
      message: "WP Admin Email:",
      validate: validateWPAdminEmail,
    },

    siteTitle: {
      type: "input",
      message: "Site Title:",
      initial: ({ ddev }) => ddev.projectName,
    },

    siteTagname: {
      type: "input",
      message: "Site Tagline:",
      hint: `(Leave blank if a tagname is not desired.)`,
    },

    coreDir: {
      type: "input",
      message: "WordPress Core Directory:",
      initial: "/wordpress",
      hint: `(Note: /wp-content will be installed outside the WordPress Core directory.)`,
      validate: validateWPCoreDir,
    },

    cleanState: {
      type: "confirm",
      message: "Install WordPress with a clean state?",
      initial: true,
      hint: "(This will remove the default pages, posts, comments, plugins, and widgets from the WordPress install for a clean starting state.)",
    },

    postnamePermalinks: {
      type: "confirm",
      message: c.bold(`Use ${c.yellow("%%postname%%")} for the WP permalinks?`),
      initial: true,
      hint: `(If "n" is selected, permalinks will use the default date format.)`,
    },

    homepage: {
      type: "confirm",
      message: `Add a non-blog homepage?`,
      initial: true,
      hint: `(This creates a new blank page named "Homepage" and sets it as the WordPress front page.)`,
    },

    debug: {
      type: "confirm",
      message: "Enable WordPress debugging?",
      initial: true,
    },

    debugScript: {
      type: "confirm",
      message: `Enable script debugging? `,
      initial: true,
      hint: `(This will include JavaScript in the debugging, instead of just PHP.)`,
      enabled: ({ wordpress }) => wordpress.debug,
    },

    debugDisplayHidden: {
      type: "confirm",
      message: `Hide the frontend debugging display"? `,
      initial: true,
      enabled: ({ wordpress }) => wordpress.debug,
    },

    debugLog: {
      type: "confirm",
      message: `Enable debug logging? `,
      initial: true,
      enabled: ({ wordpress }) => wordpress.debug,
    },

    debugLogPath: {
      type: "input",
      message: "Debug Log Path:",
      initial: "/wp-content/logs/wp-errors.log",
      hint: `(Enter a path, including the filename, relative to your project's root.)`,
      validate: validateLogPath,
      enabled: ({ wordpress }) => wordpress.debugLog,
    },

    projectType: {
      type: "select",
      message: "What are you developing for this project?",
      choices: ["Theme", "Plugin", "Both"],
    },

    wpDevMode: {
      type: "select",
      message: `WP_DEVELOPMENT_MODE:`,
      choices: ["Theme", "Plugin", "Core", "All"],
    },

    wpEnvType: {
      type: "select",
      message: "WP_ENVIRONMENT_TYPE:",
      choices: ["Local", "Development", "Staging", "Production"],
      hint: "Use 'Local' unless you have a specific need for another type.",
    },
  },

  plugin: {
    custom: {
      type: "confirm",
      message: `Create a new custom plugin directory? `,
      enabled: ({ wordpress }) => ["Plugin", "Both"].includes(wordpress.projectType),
    },

    customName: {
      type: "input",
      message: "Custom plugin name:",
      enabled: ({ plugin }) => plugin.custom,
    },

    customSlug: {
      type: "input",
      message: `Custom plugin directory slug:`,
      initial: ({ plugin } = {}) => generateSlugFromName(plugin?.customName),
      hint: "(Use only lowercase letter, digits, and dashes, such as `cassidydc-core-plugin`)",
      validate: validateDirSlug,
      enabled: ({ plugin }) => plugin.custom,
    },

    customNamespace: {
      type: "input",
      message: "Custom plugin namespace:",
      initial: ({ plugin }) => `CassidyDC\\${generateNamespaceFromName(plugin.customName)}`,
      hint: "(Use only lowercase letter, digits, and dashes, such as `cassidydc-core-plugin`)",
      validate: validateNamespace,
      enabled: ({ plugin }) => plugin.custom,
    },

    customTextDomain: {
      type: "input",
      message: "Custom plugin text domain:",
      initial: ({ plugin }) => generateTextDomainFromName(plugin.customName),
      enabled: ({ plugin }) => plugin.custom,
    },

    ai1wm: {
      type: "confirm",
      message: `Install the All-in-One WP Migration plugin?`,
      initial: true,
      hint: `(Press "n" if you don't use this plugin.)`,
    },
  },

  theme: {
    custom: {
      type: "confirm",
      message: `Create a new custom theme directory? `,
      enabled: ({ wordpress }) => ["Theme", "Both"].includes(wordpress.projectType),
    },

    customName: {
      type: "input",
      message: "Custom theme name:",
      enabled: ({ theme }) => theme.custom,
    },

    customSlug: {
      type: "input",
      message: `Custom theme directory slug:`,
      initial: ({ theme }) => generateSlugFromName(theme.customName),
      hint: "(Use only lowercase letter, digits, and dashes, such as `cassidydc-block-theme`)",
      validate: validateDirSlug,
      enabled: ({ theme }) => theme.custom,
    },

    customNamespace: {
      type: "input",
      message: "Custom theme namespace:",
      initial: ({ theme }) => `CassidyDC\\${generateNamespaceFromName(theme.customName)}`,
      hint: "(Use only lowercase letter, digits, and dashes, such as `cassidydc-block-theme`)",
      validate: validateNamespace,
      enabled: ({ theme }) => theme.custom,
    },

    customTextDomain: {
      type: "input",
      message: "Custom theme text domain:",
      initial: ({ theme }) => generateTextDomainFromName(theme.customName),
      enabled: ({ theme }) => theme.custom,
    },

    customStarterFiles: {
      type: "confirm",
      message: `Use the CassidyDC Starter Block Theme files for your new theme?`,
      initial: true,
      enabled: ({ theme }) => theme.custom,
    },

    default: {
      type: "confirm",
      message: `Include the default WordPress theme? `,
      initial: true,
      hint: `(Recommended as a fallback theme.)`,
    },
  },

  devConfig: {
    git: {
      type: "confirm",
      message: "Initialize a local Git repository and .gitignore file for this project?",
      initial: true,
    },

    toolsetWPContent: {
      type: "confirm",
      message: `Add the CassidyDC WP Dev Toolset to /wp-content? `,
      initial: true,
    },

    toolsetCustomPlugin: {
      type: "confirm",
      message: `Add the CassidyDC Plugin Dev Toolset to your custom plugin? `,
      initial: true,
      enabled: ({ plugin, devConfig }) => plugin.custom && devConfig.toolsetWPContent,
    },

    toolsetCustomTheme: {
      type: "confirm",
      message: `Add the CassidyDC Theme Dev Toolset to your custom theme? `,
      initial: true,
      enabled: ({ theme, devConfig }) => theme.custom && devConfig.toolsetWPContent,
    },

    vscodeRecommendations: {
      type: "confirm",
      message: `Add the CassidyDC VSCode Extensions Recommendations file? `,
      initial: true,
    },

    vscodeWorkspaceSettings: {
      type: "confirm",
      message: `Add the CassidyDC VSCode Workspace Settings file? `,
      initial: true,
    },
  },
};
