/**
 * FLAGS CONFIG
 * @module configs/flags
 */

// Import components
import { displayDebugInfo, displayHelpInfo, displayVersion } from "../components/index.js";

/**
 * Flags Config
 */
export const flagsConfig = {
  debug: {
    alias: "d",
    description: "Displays debug information for development",
    exec: displayDebugInfo,
  },
  help: {
    alias: "h",
    description: "Displays the help information",
    exec: displayHelpInfo,
  },
  "no-clear": {
    alias: "nc",
    description: "Skips clearing the console when running a command",
    exec: null,
  },
  "no-header": {
    alias: "nh",
    description: "Skips displaying the header when running a command",
    exec: null,
  },
  version: {
    alias: "v",
    description: "Displays the version",
    exec: displayVersion,
  },
};
