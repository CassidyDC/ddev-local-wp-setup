/**
 * INIT FILESYSTEM
 * @module commands/install/init/filesystem
 */

// Import filesystem creators
import { createFilesystemDirs, createFilesystemFiles } from "../create/index.js";

// Import helpers
import { c, log } from "../../../utils/helpers/index.js";

/**
 * Initializes the filesystem structure.
 */
export async function initFilesystem() {
  // log(c.headingInfo(" Running initFilesystem() "));

  log(c.headingInfo(" Creating filesystem directories... "));
  createFilesystemDirs();

  log(c.headingInfo(" Creating filesystem files... "));
  createFilesystemFiles();
}
