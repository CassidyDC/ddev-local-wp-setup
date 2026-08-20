/**
 * DISPLAY VERSION
 * @module components/displays/version
 */

// Import helpers
import { log, pkgJSON } from "../../utils/helpers/index.js";

/**
 * Display Version
 *
 * Prints the CLI version without the header.
 */
export function displayVersion() {
  return log(`v${pkgJSON.version}`);
}
