/**
 * INIT WP SETUP
 * @module commands/install/init/wordpress
 */

// Import configs
import { installationConfig } from "../../../configs/index.js";

/**
 * Runs the shell commands to install the local DDEV WordPress development server setup.
 */
export async function initWordPress() {
  console.log("Running initWordPress()");

  const { adminUsername, adminEmail, adminPassword, siteTitle, siteTagline, cleanState, postnamePermalinks, homepage } =
    installationConfig.wordpress;
  const { ai1wm } = installationConfig.plugins;
  const { defaultTheme } = installationConfig.themes;

  if (cleanState) {
    // Hide default WordPress dashboard widgets.
    // Hide the welcome panel.
    // Remove default Hello World post.
    // Remove default Sample Page.
    // Remove default Privacy Policy draft page.
  }

  if (postnamePermalinks) {
    // Update the WP permalinks to use the post name.
  }

  if (homepage) {
    // Create a new page titled 'Homepage' and set it to be the site's front page.
  }

  if (!defaultTheme) {
    // Remove the default WordPress theme.
  }

  if (ai1wm) {
    // Install All-in-One Migration plugin.
  }
}
