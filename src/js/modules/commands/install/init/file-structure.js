/**
 * INIT FILE STRUCTURE
 * @module commands/install/init/file-structure
 */

// Import node modules
import path from "node:path";
import { fileURLToPath } from "node:url";

// Import command helpers
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

  const filePath = fileURLToPath(import.meta.url);
  const dirPath = path.dirname(filePath);

  await createComposerFile(dirPath);
  await createIndexPhpFile(dirPath);
  await createWPCliFile(dirPath);
  await createWPContentDirs(dirPath);
  await createReadmeFile(dirPath);
  await createChangelogFile(dirPath);
  await createLogsDir(dirPath);
  await createPackageFile(dirPath);
  await createDocsDirs(dirPath);
  await createTodoFile(dirPath);
}
