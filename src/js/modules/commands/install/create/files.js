/**
 * CREATE FILES
 * @module commands/install/create/files
 */

// Import configs
import { installationConfig } from "../../../configs/index.js";

// Import helpers
import { c, log } from "../../../utils/helpers/index.js";

// Import file creators
import {
  createChangelogFile,
  createComposerFile,
  createCustomPluginStarterFile,
  createCustomThemeStarterFile,
  createDockerfileFile,
  createGitignoreFile,
  createIndexFile,
  createPhpRayFile,
  createRayFile,
  createReadmeFile,
  createTodoFile,
  createWPCliFile,
} from "./index.js";

/**
 * Creates the local server files.
 */
export async function createFilesystemFiles() {
  const wpCoreDir = installationConfig.wordpress.coreDir;

  log(c.headingInfo(" Creating files... "));
  await createComposerFile(wpCoreDir); // composer.json - Installs WordPress Core.
  await createIndexFile(wpCoreDir); // index.php - tells DDEV where WP Core is installed.
  await createWPCliFile(wpCoreDir); // wp-cli.yml - tells DDEV where to run WP CLI.
  await createReadmeFile(); // README.md - Repo readme file.
  await createChangelogFile(); // CHANGELOG.md - Repo changelog file.
  if (installationConfig.devConfig.docs) await createTodoFile(); // docs/TODO.md - Development Todos.
  if (installationConfig.plugins.customStarterFiles) await createCustomPluginStarterFile();
  if (installationConfig.themes.customStarterFiles) await createCustomThemeStarterFile();
  if (installationConfig.devConfig.git) await createGitignoreFile();
  if (installationConfig.ddev.ray) {
    await createPhpRayFile();
    await createRayFile();
    await createDockerfileFile();
  }
}
