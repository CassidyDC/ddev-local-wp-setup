/**
 * CLI DEBUG INFO
 * @module components/cli-debug-info
 */

// Internal Modules
import { c } from "../utils/styles.js";
import { allowedCommands, allowedFlags, allowedLongFlags, allowedShortFlags, log } from "../utils/helpers.js";
import * as components from "./index.js";
import * as displays from "../utils/displays.js";
// import * as flags from "../utils/flags.js";

export function cliDebugInfo() {
  log(`${c.heading(" Debug Information ")}`);
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

  // Print available displays
  log(`${c.title("Available Displays:")}`);
  log(Object.keys(displays));
}
