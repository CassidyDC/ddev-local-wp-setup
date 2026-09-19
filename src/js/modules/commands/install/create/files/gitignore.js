/**
 * CREATE .GITIGNORE FILE
 * @module commands/install/create/files/gitignore
 */

// Import node modules
import path from "node:path";
import { writeFile } from "node:fs/promises";

// Import helpers
import { c, log, rootDirPath } from "../../../../utils/helpers/index.js";

/**
 * Creates a `wp-content/.gitignore` file.
 */
export async function createGitignoreFile(customPluginConfig, customThemeConfig) {
  log(c.detail("Creating `wp-content/.gitignore` file..."));

  const gitignoreFile = path.join(`${rootDirPath}/wp-content`, ".gitignore");
  const gitignoreFileContent = `# Ignore dev files
logs
node_modules
vendor
composer.lock
package-lock.json

# Ignore build/dist files
**/build
**/dist

# Ignore all mu-plugins, except those included below
/mu-plugins/*

# Ignore all plugins, except those included below
/plugins/*
${customPluginConfig ? `/plugins/${customPluginConfig.slug}` : ""}

# Ignore all themes, except those included below
/themes/*
${customThemeConfig ? `/themes/${customThemeConfig.slug}` : ""}

# Ignore other WP files
languages
/uploads
/upgrade*
index.php

# Ignore all nested vendor files, except those included below
**/vendor/*

# Ignore third-party files
ai1wm-backups
breeze-config
breeze-minification
cache
wflogs
advanced-cache.php
object-cache.php
`;

  await writeFile(gitignoreFile, gitignoreFileContent);
}
