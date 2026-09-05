/**
 * NAME GETTERS
 * @module utils/getters/names
 */

// Import node processes
import process from "node:process";

/**
 * Gets the project name from the current directory.
 *
 * @returns {string} The formatted name extracted from the project directory
 */
export function getProjectNameFromDir() {
  const dirProjectName = (process.cwd().split("/").pop() || "") // Get the current directory name.
    .replace(/^[^a-zA-Z0-9]+/, "") // Remove any leading non-alphanumeric characters.
    .replace(/\.ddev\.site$/i, "") // Remove the trailing `.ddev.site` TLD if it has one.
    .replace(/[-_]+/g, " ") // Replace dashes and underscores with spaces
    .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize the first letter of each word.

  return dirProjectName;
}
