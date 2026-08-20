/**
 * INIT WP SETUP
 * @module commands/install/init-wp-setup
 */

// Import configs
import { installConfig } from "../../configs/index.js";

/**
 * Runs the shell commands to install the local DDEV WordPress development server setup.
 */
export function initWPSetup() {
  const {
    customPluginSlug,
    customThemeSlug,
    includeCustomThemeStarterFiles,
    includeHomepage,
    includePluginAi1m,
    includeThemeWpDefault,
    includeToolsetPluginDev,
    includeToolsetThemeDev,
  } = installConfig.project;
  // const { email, password, username } = installConfig.wpAdmin;
  const { wpCleanState, wpCorePath, wpPostnamePermalinks } = installConfig.wpCore;

  if (wpCorePath) {
    // Install WP in custom directory.
  } else {
    // install WP in root directory.
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
