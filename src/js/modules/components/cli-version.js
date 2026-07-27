/**
 * CLI VERSION
 * @module components/cli-version
 */

// Internal Modules
import { log, pkgJSON } from "../utils/helpers.js";

export function cliVersion() {
  return log(`v${pkgJSON.version}`);
}
