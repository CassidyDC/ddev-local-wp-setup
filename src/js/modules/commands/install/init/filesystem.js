/**
 * INIT FILESYSTEM
 * @module commands/install/init/filesystem
 */

// Import filesystem creators
import { createFilesystemDirs, createFilesystemFiles } from "../create/index.js";

/**
 * Initializes the filesystem structure.
 */
export async function initFilesystem() {
  createFilesystemDirs();
  // createFilesystemFiles();
}
