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
    .replace(/[^a-zA-Z0-9_]+/g, "") // Remove any non-letter, non-number, or non-underscore characters.
    .replace(/^[^a-zA-Z_]+/, "") // Ensure the name starts with a letter or underscore.
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
  return name
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with a dash.
    .toLowerCase() // Make all letters lowercase.
    .replace(/[^a-z0-9-]+/g, ""); // Remove any non-letter, non-number, or non-dash characters.
}
