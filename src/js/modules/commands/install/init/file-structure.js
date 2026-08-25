/**
 * INIT FILE STRUCTURE
 * @module commands/install/init/file-structure
 */

// Import file structure creators
import {
  createChangelogFile,
  createComposerFile,
  createDocsDirs,
  createIndexPhpFile,
  createLogsDir,
  createReadmeFile,
  createPackageFile,
  createTodoFile,
  createWPCliFile,
  createWPContentDirs,
} from "../../index.js";

// Import helpers
import { c, log } from "../../../utils/helpers/index.js";

/**
 * Initializes the file structure.
 */
export async function initFileStructure() {
  log(c.headingInfo(" Running initFileStructure() "));
  await createComposerFile();
  await createIndexPhpFile();
  await createWPCliFile();
  await createWPContentDirs();
  await createReadmeFile();
  await createChangelogFile();
  await createLogsDir();
  await createPackageFile();
  await createDocsDirs();
  await createTodoFile();
}
