/**
 * INIT WP SETUP
 * @module commands/install/init/wp-setup
 */

// Import configs
import { installationConfig } from "../../../configs/index.js";

/**
 * Runs the shell commands to install the local DDEV WordPress development server setup.
 */
export async function initWPSetup() {
  console.log("Running initWPSetup()");

  const {
    customPluginSlug,
    customThemeSlug,
    includeCustomThemeStarterFiles,
    includeHomepage,
    includePluginAi1m,
    includeThemeWpDefault,
    includeToolsetPluginDev,
    includeToolsetThemeDev,
  } = installationConfig.project;
  // const { email, password, username } = installationConfig.wpAdmin;
  const { wpCleanState, wpCorePath, wpPostnamePermalinks } = installationConfig.wpCore;

  if (wpCorePath) {
    // Install WP Core in custom directory.
  } else {
    // install WP Core in "wordpress" directory.
  }

  if (wpCleanState) {
    // Hide default WordPress dashboard widgets.
    // Hide the welcome panel.
    // Remove default Hello World post.
    // Remove default Sample Page.
    // Remove default Privacy Policy draft page.
  }

  if (wpPostnamePermalinks) {
    // Update the WP permalinks to use the post name.
  }

  if (includeHomepage) {
    // Create a new page titled 'Homepage' and set it to be the site's front page.
  }

  if (customPluginSlug) {
    // Create custom plugin directory.

    if (includeToolsetPluginDev) {
      // Add dev wp plugin toolset inside custom plugin directory.
    }
  }

  if (customThemeSlug) {
    // Create custom theme directory.

    if (includeCustomThemeStarterFiles) {
      // Add starter theme files inside custom theme directory.
    }

    if (includeToolsetThemeDev) {
      // Add dev wp theme toolset inside custom theme directory.
    }
  }

  if (includeThemeWpDefault) {
    // Install default theme.
  }

  if (includePluginAi1m) {
    // Install All-in-One Migration plugin.
  }
}
