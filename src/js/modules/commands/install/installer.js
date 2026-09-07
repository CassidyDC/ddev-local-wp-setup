/**
 * Installer
 * @module commands/install/installer
 */

// Import helpers
// import { c, setupPrompts, log } from "../../utils/helpers/index.js";

// Import installer initiation modules.
// import { initFilesystem, initToolsets, initDDEV, initWordPress } from "./init/index.js";

/**
 * Installs the local development DDEV WordPress server.
 */
export async function runInstaller() {
  // await installationStartupPrompt();
  // await setupPrompts();
  // log(`\n${c.headingInfo(" Running installer... ")}\n`);
  // await initFilesystem();
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
  // await initToolsets();
  // - Add CassidyDC Toolsets to any custom plugin/theme that includes it
  // - Add CassidyDC Toolset to <root>/wp-content
  // - Init Git with .gitignore
  // await initDDEV();
  // - Add ray connection files:
  //    - Add <root>/.ddev/php/php-ray.ini
  //    - Add <root>/.ddev/web-build/Dockerfile
  //    - Add <root>/ray.php
  // await initWordPress();
}
