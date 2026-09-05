/**
 * GENERATE
 * @module utils/helpers/generate
 */

// Import node processes
import process from "node:process";

/**
 * Generates a namespace from a string.
 *
 * @param {string} name The string being transformed into a namespace.
 * @returns
 */
export function generateNamespaceFromName(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

/**
 * Generates a project name from the current directory.
 *
 * @returns {string} The formatted name generated from the project directory.
 */
export function generateProjectNameFromDir() {
  const dirProjectName = (process.cwd().split("/").pop() || "") // Get the current directory name.
    .replace(/^[^a-zA-Z0-9]+/, "") // Remove any leading non-alphanumeric characters.
    .replace(/\.ddev\.site$/i, "") // Remove the trailing `.ddev.site` TLD if it has one.
    .replace(/[-_]+/g, " ") // Replace dashes and underscores with spaces
    .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize the first letter of each word.

  return dirProjectName;
}

/**
 * Generates a slug from a string.
 *
 * @param {string} name The string being transformed into a slug.
 * @returns {string} The slug string.
 */
export function generateSlugFromName(name) {
  return name.trim().replace(/\s+/g, "-").toLowerCase();
}

/**
 * Generates a text domain from a string.
 *
 * @param {string} name The string being transformed into a text domain.
 * @returns {string} The text domain string.
 */
export function generateTextDomainFromName(name) {
  return name.trim().replace(/\s+/g, "").toLowerCase();
}
