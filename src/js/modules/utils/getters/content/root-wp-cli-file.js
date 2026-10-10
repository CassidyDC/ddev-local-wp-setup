/**
 * ROOT WP-CLI FILE CONTENT
 * @module utils/getters/content
 */

// Import helpers
import { getWPCoreDir } from "../../getters/index.js";

/**
 * Gets the root `wp-cli.php` file content.
 */
export function getRootWPCliFileContent() {
  const wpCoreDir = getWPCoreDir();

  return `path: ${wpCoreDir}`;
}
