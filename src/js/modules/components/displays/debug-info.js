/**
 * DISPLAY DEBUG INFO
 * @module components/displays/debug-info
 */

// Import components
import * as components from "../../components/index.js";

// Import utils
import { allowedCommands, allowedFlags, c, log } from "../../utils/helpers/index.js";

/**
 * Display CLI Debug Info
 *
 * Prints the CLI debug information.
 */
export function displayDebugInfo() {
  log(`${c.headingDebug(" Debug Information ")}`);
  log("");

  // Print available commands
  log(`${c.title("Available Commands:")}`);
  allowedCommands.forEach((cmd) => log(cmd));
  log("");

  // Print available flags
  log(`${c.title("Available Flags:")}`);
  allowedFlags.forEach((flag) => log(flag));
  log("");

  // Print available components
  log(`${c.title("Available Components:")}`);
  log(Object.keys(components));
  log("");
}
